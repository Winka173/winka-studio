import React from "react";
import { AbsoluteFill, OffthreadVideo, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { C, EndCard, Grade, useFonts } from "./Look";

/** Uncut gameplay with its own sound: a short title over the opening seconds, small captions at the moments that matter, the logo at the end. */
export type Chapter = { at: number; text: string };
export type GameplayProps = { src: string; start: number; seconds: number; title: string; subtitle: string; chapters: Chapter[]; endLines: string[]; width?: number; height?: number };
const END = 3.2;
export const gameplayFrames = (p: GameplayProps, fps: number) => Math.round((p.seconds + END) * fps);

const Caption: React.FC<{ text: string; frames: number }> = ({ text, frames }) => {
  useFonts();
  const f = useCurrentFrame();
  const p = interpolate(f, [0, 10], [0, 1], { extrapolateRight: "clamp" });
  const out = interpolate(f, [frames - 10, frames], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ position: "absolute", left: 80, bottom: 120, opacity: Math.min(p, out), transform: `translateY(${(1 - p) * 16}px)`,
      fontFamily: "Fraunces", fontSize: 40, color: C.parchment, padding: "12px 30px 14px", borderRadius: 10,
      background: "linear-gradient(90deg, rgba(74,16,16,0.92), rgba(13,20,48,0.78))", borderLeft: `5px solid ${C.gold}`, boxShadow: "0 6px 24px rgba(0,0,0,0.5)", letterSpacing: 1 }}>{text}</div>
  );
};

const Title: React.FC<{ title: string; subtitle: string; frames: number }> = ({ title, subtitle, frames }) => {
  useFonts();
  const f = useCurrentFrame();
  const p = interpolate(f, [0, 14], [0, 1], { extrapolateRight: "clamp" });
  const out = interpolate(f, [frames - 12, frames], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ opacity: Math.min(p, out) }}>
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(4,6,15,0.0) 55%, rgba(4,6,15,0.85) 100%)" }} />
      <div style={{ position: "absolute", left: 90, bottom: 90 }}>
        <div style={{ fontFamily: "Young Serif", fontSize: 72, color: C.gold, textShadow: "0 0 20px rgba(255,154,46,0.5), 0 3px 0 #4a1a04, 0 6px 16px #000" }}>{title}</div>
        <div style={{ fontFamily: "Be Vietnam Pro", fontSize: 30, color: C.parchment, marginTop: 6, letterSpacing: 1.5, textShadow: "0 2px 10px #000" }}>{subtitle}</div>
      </div>
    </AbsoluteFill>
  );
};

export const Gameplay: React.FC<GameplayProps> = (p) => {
  const fps = 30;
  const body = Math.round(p.seconds * fps);
  const total = gameplayFrames(p, fps);
  return (
    <AbsoluteFill style={{ background: C.navy }}>
      <Sequence durationInFrames={body}>
        <OffthreadVideo src={staticFile(p.src)} trimBefore={Math.round(p.start * fps)}
          volume={(f) => Math.min(1, f / 15, (body - f) / 20)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <Grade strength={0.6} />
      </Sequence>
      <Sequence durationInFrames={Math.round(4.5 * fps)}><Title title={p.title} subtitle={p.subtitle} frames={Math.round(4.5 * fps)} /></Sequence>
      {p.chapters.map((c, i) => (
        <Sequence key={i} from={Math.round(c.at * fps)} durationInFrames={Math.round(3.4 * fps)}><Caption text={c.text} frames={Math.round(3.4 * fps)} /></Sequence>
      ))}
      <Sequence from={body - 10} durationInFrames={total - body + 10}><EndCard frames={total - body + 10} lines={p.endLines} /></Sequence>
    </AbsoluteFill>
  );
};
