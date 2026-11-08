"use client";

import { useEffect, useRef } from "react";

const palettes: Record<string, number[][]> = {
  studio: [
    [0.66, 0.27, 0.48],
    [0.23, 0.65, 0.59],
    [0.49, 0.42, 0.76],
  ],
  bookmark: [
    [0.17, 0.56, 0.43],
    [0.48, 0.68, 0.47],
    [0.83, 0.57, 0.36],
  ],
  sticky: [
    [0.91, 0.35, 0.39],
    [0.85, 0.58, 0.25],
    [0.61, 0.39, 0.69],
  ],
  forge: [
    [0.4, 0.53, 0.77],
    [0.81, 0.48, 0.24],
    [0.31, 0.6, 0.54],
  ],
  arcane: [
    [0.9, 0.34, 0.15],
    [0.64, 0.23, 0.42],
    [0.72, 0.55, 0.18],
  ],
  aetherward: [
    [0.15, 0.64, 0.54],
    [0.36, 0.49, 0.76],
    [0.58, 0.72, 0.39],
  ],
  forgebound: [
    [0.87, 0.4, 0.15],
    [0.64, 0.3, 0.2],
    [0.77, 0.62, 0.3],
  ],
  runavelle: [
    [0.36, 0.7, 0.3],
    [0.2, 0.5, 0.55],
    [0.6, 0.43, 0.67],
  ],
  machine: [
    [0.44, 0.62, 0.24],
    [0.2, 0.45, 0.4],
    [0.59, 0.45, 0.23],
  ],
};

// Original fluid interference field: warped noise, spectral contours and soft light.
const fragment = `precision mediump float;
uniform vec2 u_size,u_pointer;
uniform float u_time,u_scroll,u_light;
uniform vec3 u_a,u_b,u_c;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1)),f.x),f.y);}
float field(vec2 p){float v=0.;v+=.55*noise(p);p=mat2(1.6,1.2,-1.2,1.6)*p;v+=.27*noise(p);p*=2.;v+=.14*noise(p);return v;}
void main(){
 vec2 uv=gl_FragCoord.xy/u_size;vec2 p=(uv-.5)*vec2(u_size.x/u_size.y,1.);
 float t=u_time*.075;vec2 mouse=(u_pointer-.5)*vec2(1.1,.7);
 p+=mouse*.14;p.y+=u_scroll*.38;
 float ripple=sin(length(p-mouse)*14.-u_time*1.5)*exp(-length(p-mouse)*3.);
 p+=normalize(p-mouse+vec2(.001))*ripple*.055;
 vec2 q=vec2(field(p*1.8+vec2(t,-t)),field(p*2.+vec2(3.2,-t*.7)));
 vec2 r=vec2(field(p*2.1+q*2.+vec2(1.7,t)),field(p*2.3+q*1.7+vec2(t,5.9)));
 float f=field(p*2.+r*2.5+q);
 float band=pow(.5+.5*sin(f*17.+p.x*2.-t*2.),5.);
 vec3 col=mix(u_a,u_b,smoothstep(.23,.7,f));col=mix(col,u_c,smoothstep(.38,.85,r.x)*.7);
 float halo=exp(-length(p-vec2(.3+sin(t)*.15,.08))*.8);
 float rim=pow(max(0.,1.-abs(f-.5)*2.),8.);
 col*=.16+halo*.57+band*.25;col+=rim*vec3(.1,.08,.09);
 float grain=(hash(gl_FragCoord.xy+floor(u_time*8.))-.5)*.035;
 col=mix(vec3(.025,.025,.035),col,.9)+grain;
 col=mix(col,mix(vec3(.97,.97,.93),col,.10),u_light);
 gl_FragColor=vec4(col,1.);
}`;

const ribbonFragment = `precision mediump float;
uniform vec2 u_size,u_pointer;uniform float u_time,u_scroll,u_light;
uniform vec3 u_a,u_b,u_c;
float hash(vec2 p){return fract(sin(dot(p,vec2(113.1,271.9)))*43758.5453);}
void main(){
 vec2 uv=gl_FragCoord.xy/u_size;
 vec2 p=(uv-.5)*vec2(u_size.x/u_size.y,1.);
 vec2 mouse=(u_pointer-.5)*vec2(1.2,.7);
 p+=mouse*.065;p=mat2(.92,-.39,.39,.92)*p;
 float t=u_time*.13;vec3 light=vec3(0.);
 for(int i=0;i<3;i++){
  float n=float(i);float path=.17*sin(p.x*1.55+t+n*.42)+.13*cos(p.x*.8-t*.4)+n*.085-.06;
  float d=p.y-path;float distance=abs(d);
  float haze=exp(-distance*distance*32.);
  float edge=exp(-distance*105.);
  float satin=smoothstep(0.,.085,d)*exp(-max(d,0.)*8.);
  float glint=.5+.5*sin(p.x*1.8-t*.6+n);
  vec3 tint=i==0?u_a:(i==1?u_b:u_c);
  light+=tint*(haze*.042+edge*(.12+glint*.1)+satin*.23);
 }
 float vignette=1.-smoothstep(.1,1.35,length(p));
 vec3 color=vec3(.035,.037,.044)+light*vignette;
 color+=(hash(gl_FragCoord.xy)-.5)*.012;
 color=mix(color,vec3(.965,.96,.94)-light*.22,u_light);
 gl_FragColor=vec4(color,1.);
}`;

export function LiquidBackdrop({
  palette = "studio",
  appearance = "fluid",
}: {
  palette?: string;
  appearance?: "fluid" | "ribbons";
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const host = ref.current,
      canvas = host?.querySelector("canvas");
    if (!host || !canvas) return;
    if (
      (navigator as Navigator & { connection?: { saveData?: boolean } })
        .connection?.saveData
    ) {
      host.dataset.shader = "fallback";
      return;
    }
    const root = host.closest(".site") as HTMLElement;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      powerPreference: "low-power",
    });
    if (!gl) return;
    let frame = 0,
      last = 0,
      elapsed = 0,
      visible = true,
      lost = false,
      paused = false;
    let pointer = [0.5, 0.5],
      scroll = 0,
      light = 0;
    let program: WebGLProgram | null = null;
    const uniforms: Record<string, WebGLUniformLocation | null> = {};
    let buffer: WebGLBuffer | null = null;
    const shaders: WebGLShader[] = [];
    const compile = (kind: number, source: string) => {
      const s = gl.createShader(kind);
      if (!s) return null;
      gl.shaderSource(s, source);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        gl.deleteShader(s);
        return null;
      }
      shaders.push(s);
      return s;
    };
    const resize = () => {
      const ratio = Math.min(devicePixelRatio, 1.25);
      canvas.width = Math.min(1500, Math.round(host.clientWidth * ratio));
      canvas.height = Math.min(1100, Math.round(host.clientHeight * ratio));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    const init = () => {
      const vs = compile(
        gl.VERTEX_SHADER,
        "attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}",
      );
      const fs = compile(
        gl.FRAGMENT_SHADER,
        appearance === "ribbons" ? ribbonFragment : fragment,
      );
      if (!vs || !fs) return false;
      program = gl.createProgram();
      if (!program) return false;
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return false;
      gl.useProgram(program);
      buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
        gl.STATIC_DRAW,
      );
      const position = gl.getAttribLocation(program, "a");
      gl.enableVertexAttribArray(position);
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
      for (const name of [
        "u_size",
        "u_pointer",
        "u_time",
        "u_scroll",
        "u_light",
        "u_a",
        "u_b",
        "u_c",
      ])
        uniforms[name] = gl.getUniformLocation(program, name);
      const colors =
        appearance === "ribbons"
          ? [
              [0.85, 0.89, 0.87],
              [0.45, 0.68, 0.63],
              [0.72, 0.59, 0.68],
            ]
          : palettes[palette] || palettes.studio;
      ["u_a", "u_b", "u_c"].forEach((key, i) =>
        gl.uniform3fv(uniforms[key], colors[i]),
      );
      resize();
      host.dataset.shader = "ready";
      return true;
    };
    const draw = () => {
      if (lost || !program) return;
      gl.uniform2f(uniforms.u_size, canvas.width, canvas.height);
      gl.uniform2f(uniforms.u_pointer, pointer[0], pointer[1]);
      gl.uniform1f(uniforms.u_time, elapsed);
      gl.uniform1f(uniforms.u_scroll, scroll);
      gl.uniform1f(uniforms.u_light, light);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      canvas.dataset.frame = String(Number(canvas.dataset.frame || 0) + 1);
    };
    const onResize = () => {
      resize();
      draw();
    };
    const tick = (now: number) => {
      frame = 0;
      if (!visible || document.hidden || paused || motion.matches || lost)
        return;
      if (now - last > 33) {
        elapsed += Math.min((now - last) / 1000, 0.06);
        last = now;
        draw();
      }
      frame = requestAnimationFrame(tick);
    };
    const sync = () => {
      paused = root.dataset.animationPaused === "true";
      light =
        getComputedStyle(root).getPropertyValue("--scheme").trim() === "light"
          ? 1
          : 0;
      cancelAnimationFrame(frame);
      draw();
      if (!paused && !motion.matches && !document.hidden && visible && !lost) {
        last = performance.now();
        frame = requestAnimationFrame(tick);
      }
    };
    const mouse = (e: PointerEvent) => {
      pointer = [e.clientX / innerWidth, 1 - e.clientY / innerHeight];
    };
    const onScroll = () => {
      scroll =
        scrollY /
        Math.max(1, document.documentElement.scrollHeight - innerHeight);
    };
    const loss = (e: Event) => {
      e.preventDefault();
      lost = true;
      cancelAnimationFrame(frame);
      host.dataset.shader = "fallback";
    };
    const restore = () => {
      lost = false;
      if (init()) sync();
    };
    if (!init()) return;
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    observer.observe(host);
    const mutation = new MutationObserver(sync);
    mutation.observe(root, {
      attributes: true,
      attributeFilter: ["data-preference", "data-animation-paused"],
    });
    window.addEventListener("pointermove", mouse, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", sync);
    motion.addEventListener("change", sync);
    canvas.addEventListener("webglcontextlost", loss);
    canvas.addEventListener("webglcontextrestored", restore);
    sync();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      mutation.disconnect();
      window.removeEventListener("pointermove", mouse);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", sync);
      motion.removeEventListener("change", sync);
      canvas.removeEventListener("webglcontextlost", loss);
      canvas.removeEventListener("webglcontextrestored", restore);
      if (!lost) {
        if (buffer) gl.deleteBuffer(buffer);
        if (program) gl.deleteProgram(program);
        shaders.forEach((s) => gl.deleteShader(s));
      }
    };
  }, [palette, appearance]);
  return (
    <div
      ref={ref}
      className={`liquid-backdrop liquid-${palette} liquid-${appearance}`}
      data-appearance={appearance}
      aria-hidden="true"
    >
      <div className="liquid-fallback">
        <i />
        <i />
        <i />
      </div>
      <canvas />
      <div className="liquid-grain" />
    </div>
  );
}
