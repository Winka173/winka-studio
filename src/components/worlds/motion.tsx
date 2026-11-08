"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { usePathname } from "next/navigation";
import type { Locale } from "@/content/studio";

/** One observer and one coalesced frame for all authored page choreography. */
export function WorldMotion({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const ref = useRef<HTMLButtonElement>(null);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const root = ref.current?.closest(".site") as HTMLElement | null;
    if (!root) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    root.dataset.saveData = String(
      Boolean(
        (navigator as Navigator & { connection?: { saveData?: boolean } })
          .connection?.saveData,
      ),
    );
    let frame = 0;
    let pendingX = 0,
      pendingY = 0;
    const visible = new Set<HTMLElement>();
    const reveals = [...root.querySelectorAll<HTMLElement>("[data-reveal]")];
    const scenes = [...root.querySelectorAll<HTMLElement>("[data-scene]")];
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (el.hasAttribute("data-reveal") && entry.isIntersecting) {
            el.dataset.seen = "true";
            observer.unobserve(el);
          }
          if (el.hasAttribute("data-scene")) {
            el.dataset.visible = String(entry.isIntersecting);
            if (entry.isIntersecting) visible.add(el);
            else visible.delete(el);
          }
        }),
      { threshold: 0.06 },
    );
    [...reveals, ...scenes].forEach((el) => observer.observe(el));
    root.dataset.motionReady = "true";
    const update = () => {
      frame = 0;
      if (
        reduced.matches ||
        root.dataset.animationPaused === "true" ||
        root.dataset.saveData === "true"
      )
        return;
      for (const el of visible) {
        const r = el.getBoundingClientRect();
        const p = Math.max(
          -1,
          Math.min(1, (r.top + r.height / 2 - innerHeight / 2) / innerHeight),
        );
        el.style.setProperty("--scene-y", `${p * -48}px`);
        el.style.setProperty(
          "--scene-progress",
          String(
            Math.max(
              0,
              Math.min(1, (innerHeight - r.top) / (innerHeight + r.height)),
            ),
          ),
        );
      }
      root.style.setProperty("--pointer-x", `${pendingX}px`);
      root.style.setProperty("--pointer-y", `${pendingY}px`);
    };
    const request = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const pointer = (event: PointerEvent) => {
      pendingX = (event.clientX / innerWidth - 0.5) * 16;
      pendingY = (event.clientY / innerHeight - 0.5) * 12;
      request();
    };
    const visibility = () => {
      root.dataset.background = String(document.hidden);
    };
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("pointermove", pointer, { passive: true });
    reduced.addEventListener("change", request);
    document.addEventListener("visibilitychange", visibility);
    request();
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", request);
      window.removeEventListener("pointermove", pointer);
      reduced.removeEventListener("change", request);
      document.removeEventListener("visibilitychange", visibility);
      delete root.dataset.motionReady;
    };
  }, [pathname]);
  return (
    <button
      ref={ref}
      className="motion-control"
      aria-pressed={paused}
      aria-label={
        locale === "vi"
          ? paused
            ? "Tiếp tục chuyển động"
            : "Tạm dừng chuyển động"
          : paused
            ? "Resume animations"
            : "Pause animations"
      }
      onClick={() => {
        const next = !paused;
        setPaused(next);
        const root = ref.current?.closest(".site") as HTMLElement | null;
        if (root) root.dataset.animationPaused = String(next);
      }}
    >
      {paused ? <Play size={14} /> : <Pause size={14} />}
      <span>{locale === "vi" ? "Chuyển động" : "Motion"}</span>
    </button>
  );
}

export function RevealWords({ children }: { children: string }) {
  return (
    <span className="reveal-words">
      <span className="sr-only">{children}</span>
      {children.split(" ").map((word, i) => (
        <span className="word-mask" key={i} aria-hidden="true">
          <span style={{ "--word": i } as React.CSSProperties}>
            {word}&nbsp;
          </span>
        </span>
      ))}
    </span>
  );
}
