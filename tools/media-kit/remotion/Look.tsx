import React from "react";
import { AbsoluteFill, Easing, Img, cancelRender, continueRender, delayRender, interpolate, random, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

// The game's own type and palette: Young Serif titles, Fraunces for names, Be Vietnam Pro for small print;
// midnight navy, lamp gold, crimson and parchment (from the logo and the app icon).
export const C = { navy: "#0D1430", gold: "#F0C060", goldDeep: "#D8A848", crimson: "#7A1E1E", flame: "#FF9A2E", parchment: "#F4E6C8" };

const faces: [string, string, string][] = [
  ["Young Serif", "fonts/YoungSerif-Regular.ttf", "400"],
  ["Fraunces", "fonts/Fraunces-Display.ttf", "700"],
  ["Be Vietnam Pro", "fonts/BeVietnamPro-SemiBold.ttf", "600"],
];
let fontsRequested = false;
export const useFonts = () => {
  if (fontsRequested || typeof FontFace === "undefined") return;
  fontsRequested = true;
  for (const [family, file, weight] of faces) {
    const handle = delayRender("font " + family);
    const face = new FontFace(family, `url(${staticFile(file)})`, { weight });
    face.load().then(() => { document.fonts.add(face); continueRender(handle); }).catch((e) => cancelRender(e));
  }
};

const ease = Easing.bezier(0.16, 1, 0.3, 1);

/** Warm grade, a soft vignette and floating embers over the footage. */
export const Grade: React.FC<{ strength?: number }> = ({ strength = 1 }) => (
  <>
    <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 46%, transparent 55%, rgba(6,6,18,0.62) 100%)", opacity: strength }} />
    <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(255,170,70,0.05), rgba(13,20,48,0.10))", mixBlendMode: "soft-light" }} />
  </>
);

export const Embers: React.FC<{ count?: number; seed?: string; opacity?: number }> = ({ count = 34, seed = "e", opacity = 1 }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  return (
    <AbsoluteFill style={{ pointerEvents: "none", opacity }}>
      {new Array(count).fill(0).map((_, i) => {
        const speed = 0.6 + random(seed + "s" + i) * 1.4;
        const x = random(seed + "x" + i) * width + Math.sin((frame + i * 40) / 37) * 24;
        const y = height - (((frame * speed + random(seed + "y" + i) * height) % (height + 80)));
        const size = 2 + random(seed + "z" + i) * 5;
        const flicker = 0.35 + 0.65 * Math.abs(Math.sin(frame / (9 + i % 7) + i));
        return <div key={i} style={{ position: "absolute", left: x, top: y, width: size, height: size, borderRadius: "50%", background: i % 3 ? C.gold : C.flame, opacity: flicker * 0.8, boxShadow: `0 0 ${size * 3}px ${C.flame}` }} />;
      })}
    </AbsoluteFill>
  );
};

/** A gold flash on a cut. */
export const Flash: React.FC<{ frames?: number; color?: string }> = ({ frames = 6, color = "#FFE7B0" }) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [0, frames], [0.6, 0], { extrapolateRight: "clamp" });
  return <AbsoluteFill style={{ background: color, opacity: o, mixBlendMode: "screen" }} />;
};

/** The big centred line between shots: letters settle in from wide spacing and a soft blur, with a gilded rule under them. */
export const TitleLine: React.FC<{ text: string; sub?: string; frames: number; size?: number; top?: boolean }> = ({ text, sub, frames, size = 104, top = false }) => {
  useFonts();
  const frame = useCurrentFrame();
  const inP = interpolate(frame, [0, 16], [0, 1], { extrapolateRight: "clamp", easing: ease });
  const outP = interpolate(frame, [frames - 8, frames], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const rule = interpolate(frame, [6, 26], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
  return (
    <AbsoluteFill style={{ justifyContent: top ? "flex-start" : "center", paddingTop: top ? 110 : 0, alignItems: "center", opacity: outP }}>
      <AbsoluteFill style={{ background: top ? "linear-gradient(180deg, rgba(8,10,28,0.75), transparent 38%)" : "radial-gradient(ellipse at center, rgba(8,10,28,0.72) 0%, rgba(8,10,28,0.25) 45%, transparent 70%)", opacity: inP }} />
      <div style={{ fontFamily: "Young Serif", fontSize: size, color: C.gold, letterSpacing: interpolate(inP, [0, 1], [26, 2]), filter: `blur(${(1 - inP) * 10}px)`, opacity: inP,
        textShadow: `0 0 28px rgba(255,154,46,0.55), 0 4px 0 #5a2a08`, textAlign: "center", lineHeight: 1.05, padding: "0 120px" }}>{text}</div>
      <div style={{ width: 560 * rule, height: 3, marginTop: 26, background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)`, boxShadow: `0 0 18px ${C.flame}` }} />
      {sub ? <div style={{ fontFamily: "Fraunces", fontSize: size * 0.36, color: C.parchment, marginTop: 22, opacity: interpolate(frame, [10, 24], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }), letterSpacing: 3, textShadow: "0 2px 10px #000" }}>{sub}</div> : null}
    </AbsoluteFill>
  );
};

/** A hero's name and skill, low on the left, slid in under a crimson ribbon. */
export const NameCard: React.FC<{ name: string; skill: string; frames: number }> = ({ name, skill, frames }) => {
  useFonts();
  const frame = useCurrentFrame();
  const p = interpolate(frame, [0, 14], [0, 1], { extrapolateRight: "clamp", easing: ease });
  const out = interpolate(frame, [frames - 8, frames], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ opacity: out }}>
      <div style={{ position: "absolute", left: 96, bottom: 150, transform: `translateX(${(1 - p) * -80}px)`, opacity: p }}>
        <div style={{ height: 6, width: 120 + 380 * p, background: `linear-gradient(90deg, ${C.crimson}, ${C.flame} 70%, transparent)`, marginBottom: 14, boxShadow: `0 0 16px ${C.flame}` }} />
        <div style={{ fontFamily: "Young Serif", fontSize: 76, color: C.gold, textShadow: "0 0 22px rgba(255,154,46,0.6), 0 3px 0 #4a1a04, 0 6px 18px #000" }}>{name}</div>
        <div style={{ fontFamily: "Fraunces", fontSize: 34, color: C.parchment, letterSpacing: 4, marginTop: 4, textShadow: "0 2px 10px #000" }}>{skill}</div>
      </div>
    </AbsoluteFill>
  );
};

/** The end: the logo kindles, then the lines under it. */
export const EndCard: React.FC<{ frames: number; lines: string[] }> = ({ frames, lines }) => {
  useFonts();
  const frame = useCurrentFrame();
  const p = interpolate(frame, [0, 26], [0, 1], { extrapolateRight: "clamp", easing: ease });
  const glow = 0.6 + 0.4 * Math.sin(frame / 9);
  const fade = interpolate(frame, [frames - 14, frames], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 42%, #1c2550 0%, ${C.navy} 46%, #04060f 100%)`, justifyContent: "center", alignItems: "center", opacity: fade }}>
      <Embers count={46} seed="end" />
      <Img src={staticFile("logo.png")} style={{ width: 1000, transform: `scale(${0.86 + 0.14 * p})`, opacity: p, filter: `drop-shadow(0 0 ${30 * glow}px rgba(255,170,60,0.55))` }} />
      {lines.map((l, i) => (
        <div key={i} style={{ fontFamily: i === 0 ? "Fraunces" : "Be Vietnam Pro", fontSize: i === 0 ? 54 : 36, color: i === 0 ? C.gold : C.parchment, marginTop: i === 0 ? 34 : 12, letterSpacing: i === 0 ? 3 : 1.5,
          opacity: interpolate(frame, [22 + i * 8, 36 + i * 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }), textShadow: "0 2px 12px #000" }}>{l}</div>
      ))}
    </AbsoluteFill>
  );
};
