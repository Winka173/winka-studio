"use client";

import { useEffect, useRef, useState } from "react";
import { Box, RotateCcw, RotateCw, Minus, Plus } from "lucide-react";
import type * as Three from "three";
import type { Locale } from "@/content/studio";

type Mode = "texture" | "clay" | "wireframe";
type Inspector = {
  mode: (value: Mode) => void;
  turn: (amount: number) => void;
  zoom: (amount: number) => void;
  reset: () => void;
};

function disposeObject(object: Three.Object3D) {
  const textures = new Set<Three.Texture>();
  const materials = new Set<Three.Material>();
  object.traverse((node) => {
    const mesh = node as Three.Mesh;
    mesh.geometry?.dispose();
    if (mesh.material)
      (Array.isArray(mesh.material) ? mesh.material : [mesh.material]).forEach(
        (material) => materials.add(material),
      );
  });
  materials.forEach((material) => {
    Object.values(material).forEach((value) => {
      if (value?.isTexture) textures.add(value);
    });
    material.dispose();
  });
  textures.forEach((texture) => {
    texture.dispose();
    if (
      typeof ImageBitmap !== "undefined" &&
      texture.image instanceof ImageBitmap
    )
      texture.image.close();
  });
}

export function ForgeViewer({ locale }: { locale: Locale }) {
  const vi = locale === "vi";
  const host = useRef<HTMLDivElement>(null);
  const inspector = useRef<Inspector | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [status, setStatus] = useState<"idle" | "ready" | "error">("idle");
  const [mode, setMode] = useState<Mode>("texture");
  useEffect(() => {
    const node = host.current;
    if (!node) return;
    const saveData = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection?.saveData;
    if (saveData || matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEnabled(true);
          observer.disconnect();
        }
      },
      { rootMargin: "120px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const node = host.current;
    if (!enabled || !node) return;
    let cancelled = false;
    let release: (() => void) | undefined;
    const build = async () => {
      const [T, { GLTFLoader }, { OrbitControls }] = await Promise.all([
        import("three"),
        import("three/addons/loaders/GLTFLoader.js"),
        import("three/addons/controls/OrbitControls.js"),
      ]);
      if (cancelled) return;
      const renderer = new T.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "low-power",
      });
      renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
      renderer.outputColorSpace = T.SRGBColorSpace;
      renderer.toneMapping = T.ACESFilmicToneMapping;
      renderer.domElement.setAttribute(
        "aria-label",
        vi
          ? "Model tháp canh 3D thật từ repo Asset Forge"
          : "Real 3D watchtower model from the Asset Forge repository",
      );
      renderer.domElement.setAttribute("role", "img");
      node.appendChild(renderer.domElement);
      const scene = new T.Scene();
      const camera = new T.PerspectiveCamera(36, 1, 0.01, 200);
      camera.position.set(4.3, 2.8, 5.3);
      scene.add(new T.HemisphereLight(0xc4eaff, 0x504536, 3));
      const key = new T.DirectionalLight(0xffffff, 4);
      key.position.set(3, 6, 4);
      scene.add(key);
      const rim = new T.DirectionalLight(0x9dd6e5, 3);
      rim.position.set(-4, 2, -2);
      scene.add(rim);
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableZoom = false; // Page scrolling stays native, including over the inspector.
      controls.enablePan = false;
      controls.enableDamping = false; // Render on demand, with no background animation loop.
      controls.target.set(0, 1.3, 0);
      controls.update();
      let visible = true;
      const draw = () => {
        if (!cancelled && visible && !document.hidden)
          renderer.render(scene, camera);
      };
      const resize = new ResizeObserver(() => {
        const width = node.clientWidth,
          height = node.clientHeight;
        renderer.setSize(width, height, false);
        camera.aspect = width / Math.max(height, 1);
        camera.updateProjectionMatrix();
        draw();
      });
      resize.observe(node);
      const visibility = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible) draw();
      });
      visibility.observe(node);
      controls.addEventListener("change", draw);
      document.addEventListener("visibilitychange", draw);
      const contextLost = (event: Event) => {
        event.preventDefault();
        setStatus("error");
      };
      renderer.domElement.addEventListener("webglcontextlost", contextLost);
      const clay = new T.MeshStandardMaterial({
        color: 0xc5d2cd,
        roughness: 0.7,
        metalness: 0.12,
      });
      const wire = new T.MeshBasicMaterial({
        color: 0xa5e5c2,
        wireframe: true,
      });
      const originals = new Map<
        Three.Mesh,
        Three.Material | Three.Material[]
      >();
      release = () => {
        inspector.current = null;
        resize.disconnect();
        visibility.disconnect();
        controls.dispose();
        document.removeEventListener("visibilitychange", draw);
        renderer.domElement.removeEventListener(
          "webglcontextlost",
          contextLost,
        );
        originals.forEach((material, mesh) => {
          mesh.material = material;
        });
        disposeObject(scene);
        clay.dispose();
        wire.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
      const gltf = await new GLTFLoader().loadAsync(
        "/products/asset-forge-studio/models/watchtower.glb",
      );
      if (cancelled) {
        disposeObject(gltf.scene);
        return;
      }
      const model = gltf.scene;
      const bounds = new T.Box3().setFromObject(model),
        size = bounds.getSize(new T.Vector3()),
        center = bounds.getCenter(new T.Vector3());
      const scale = 3 / Math.max(size.x, size.y, size.z);
      model.scale.multiplyScalar(scale);
      model.position.set(
        -center.x * scale,
        -bounds.min.y * scale,
        -center.z * scale,
      );
      const pivot = new T.Group();
      pivot.add(model);
      scene.add(pivot);
      model.traverse((object) => {
        if ((object as Three.Mesh).isMesh) {
          const mesh = object as Three.Mesh;
          originals.set(mesh, mesh.material);
        }
      });
      inspector.current = {
        mode: (value) => {
          originals.forEach((material, mesh) => {
            mesh.material =
              value === "texture" ? material : value === "clay" ? clay : wire;
          });
          draw();
        },
        turn: (amount) => {
          pivot.rotation.y += amount;
          draw();
        },
        zoom: (amount) => {
          camera.position
            .sub(controls.target)
            .multiplyScalar(amount)
            .add(controls.target);
          const distance = camera.position.distanceTo(controls.target);
          if (distance < 2 || distance > 14)
            camera.position
              .sub(controls.target)
              .normalize()
              .multiplyScalar(Math.max(2, Math.min(14, distance)))
              .add(controls.target);
          controls.update();
          draw();
        },
        reset: () => {
          pivot.rotation.y = 0;
          camera.position.set(4.3, 2.8, 5.3);
          controls.target.set(0, 1.3, 0);
          controls.update();
          draw();
        },
      };
      renderer.domElement.dataset.modelLoaded = "true";
      setStatus("ready");
      draw();
    };
    void build().catch(() => {
      release?.();
      release = undefined;
      if (!cancelled) setStatus("error");
    });
    return () => {
      cancelled = true;
      release?.();
    };
  }, [enabled, vi]);
  return (
    <div className="forge-model-inspector">
      <div className="model-inspector-hud">
        <span>AFS / WATCHTOWER.glb</span>
        <span>
          {vi ? "MODEL THẬT / WEB VIEWER" : "REAL MODEL / WEB VIEWER"}
        </span>
      </div>
      <div className="model-canvas" ref={host}>
        {status !== "ready" && (
          <div className="model-loading">
            <Box size={70} strokeWidth={1} />
            <p role="status">
              {status === "error"
                ? vi
                  ? "Không mở được WebGL. Bạn vẫn có thể xem ảnh Inspector bên dưới."
                  : "WebGL is unavailable. Inspector screenshots remain available below."
                : enabled
                  ? vi
                    ? "Đang mở model thật…"
                    : "Opening the real model…"
                  : vi
                    ? "Khám phá model trong không gian 3D."
                    : "Explore a real model in 3D."}
            </p>
            {!enabled && (
              <button className="folio-button" onClick={() => setEnabled(true)}>
                {vi ? "Mở model 3D · 1,2 MB" : "Open 3D model · 1.2 MB"}
              </button>
            )}
          </div>
        )}
      </div>
      <div className="model-controls">
        <div
          role="group"
          aria-label={vi ? "Hiển thị vật liệu" : "Material display"}
        >
          {(["texture", "clay", "wireframe"] as Mode[]).map((value) => (
            <button
              key={value}
              disabled={status !== "ready"}
              aria-pressed={mode === value}
              onClick={() => {
                setMode(value);
                inspector.current?.mode(value);
              }}
            >
              {value === "texture"
                ? vi
                  ? "Vật liệu"
                  : "Texture"
                : value === "clay"
                  ? vi
                    ? "Đất sét"
                    : "Clay"
                  : "Wireframe"}
            </button>
          ))}
        </div>
        <div>
          <button
            disabled={status !== "ready"}
            aria-label={vi ? "Xoay trái" : "Rotate left"}
            onClick={() => inspector.current?.turn(-Math.PI / 6)}
          >
            <RotateCcw size={18} />
          </button>
          <button
            disabled={status !== "ready"}
            aria-label={vi ? "Xoay phải" : "Rotate right"}
            onClick={() => inspector.current?.turn(Math.PI / 6)}
          >
            <RotateCw size={18} />
          </button>
          <button
            disabled={status !== "ready"}
            aria-label={vi ? "Thu nhỏ" : "Zoom out"}
            onClick={() => inspector.current?.zoom(1.2)}
          >
            <Minus size={18} />
          </button>
          <button
            disabled={status !== "ready"}
            aria-label={vi ? "Phóng to" : "Zoom in"}
            onClick={() => inspector.current?.zoom(0.8)}
          >
            <Plus size={18} />
          </button>
          <button
            disabled={status !== "ready"}
            onClick={() => inspector.current?.reset()}
          >
            {vi ? "Đặt lại" : "Reset"}
          </button>
        </div>
      </div>
      <p className="demo-status">
        {vi
          ? "Kéo để đổi góc; dùng các nút để xoay và zoom. Model tháp canh từ bộ Size & scale của Asset Forge, đã giảm lưới và texture. Trình xem được làm riêng cho website; không chạy AI trên trình duyệt."
          : "Drag to orbit; use the buttons to rotate and zoom. This watchtower is the reduced mesh and texture from Asset Forge’s Size & scale pack. This viewer is built for the website; it does not run AI in your browser."}
      </p>
    </div>
  );
}
