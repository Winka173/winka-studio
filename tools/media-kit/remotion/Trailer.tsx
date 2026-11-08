import React from "react";
import { AbsoluteFill, Audio, OffthreadVideo, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { C, EndCard, Embers, Flash, Grade, NameCard, TitleLine, useFonts } from "./Look";

/** One shot of game footage. Its length in seconds is worked out from the music's beats when the props are written, so every cut
 * lands on a beat even where the music changes tempo. */
export type Shot = { src: string; start: number; seconds: number; sfx?: number; flash?: boolean; push?: number; speed?: number };
/** title: a centred line; name: a hero's name and skill; story: a line of the story, quiet, in the middle of the dark. */
export type Card = { kind: "title" | "name" | "story"; at: number; seconds: number; text: string; sub?: string; top?: boolean; size?: number };
export type TrailerProps = { music: string; shots: Shot[]; cards: Card[]; endSeconds: number; endLines: string[]; width?: number; height?: number };

const total = (p: TrailerProps) => p.shots.reduce((n, s) => n + s.seconds, 0) + p.endSeconds;
export const trailerFrames = (p: TrailerProps, fps: number) => Math.round(total(p) * fps);

const ShotView: React.FC<{ shot: Shot; frames: number }> = ({ shot, frames }) => {
  const frame = useCurrentFrame();
  if (shot.src === "black") return <AbsoluteFill style={{ background: "#03040b" }}><Embers count={22} seed="cold" opacity={0.7} /></AbsoluteFill>;
  const push = shot.push ?? 0.05;
  const scale = interpolate(frame, [0, frames], [1, 1 + push]);
  const ramp = 3; // short fades on the game sound so cuts never click
  const sfx = shot.sfx ?? 0.5;
  return (
    <AbsoluteFill style={{ background: "#03040b" }}>
      <OffthreadVideo
        src={staticFile(shot.src)}
        trimBefore={Math.round(shot.start * 30)}
        playbackRate={shot.speed ?? 1}
        volume={(f) => sfx * Math.min(1, f / ramp, (frames - f) / ramp)}
        style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${scale})`, filter: "contrast(1.06) saturate(1.12) brightness(1.02)" }}
      />
      <Grade />
      {shot.flash ? <Flash /> : null}
    </AbsoluteFill>
  );
};

/** A story line: parchment-coloured italic serif fading up in the dark, one line at a time. */
const StoryLine: React.FC<{ text: string; frames: number }> = ({ text, frames }) => {
  useFonts();
  const f = useCurrentFrame();
  const o = Math.min(interpolate(f, [0, 18], [0, 1], { extrapolateRight: "clamp" }), interpolate(f, [frames - 14, frames], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: o }}>
      <AbsoluteFill style={{ background: "radial-gradient(ellipse 60% 34% at center, rgba(4,6,15,0.82) 0%, rgba(4,6,15,0.55) 55%, transparent 100%)" }} />
      <div style={{ fontFamily: "Fraunces", fontStyle: "italic", fontSize: 62, color: C.parchment, letterSpacing: 1.5, textAlign: "center", padding: "0 200px", lineHeight: 1.25,
        transform: `translateY(${(1 - o) * 10}px)`, textShadow: "0 0 30px rgba(255,170,60,0.35), 0 3px 14px #000" }}>{text}</div>
    </AbsoluteFill>
  );
};

export const Trailer: React.FC<TrailerProps> = (p) => {
  const fps = 30;
  let at = 0;
  const all = trailerFrames(p, fps);
  const endFrom = Math.round(p.shots.reduce((n, s) => n + s.seconds, 0) * fps);
  return (
    <AbsoluteFill style={{ background: C.navy }}>
      {p.shots.map((s, i) => {
        const from = Math.round(at * fps);
        at += s.seconds;
        const to = Math.round(at * fps);
        return (
          <Sequence key={"s" + i} from={from} durationInFrames={to - from}>
            <ShotView shot={s} frames={to - from} />
          </Sequence>
        );
      })}
      {p.cards.map((c, i) => {
        const from = Math.round(c.at * fps);
        const frames = Math.round(c.seconds * fps);
        return (
          <Sequence key={"c" + i} from={from} durationInFrames={frames}>
            {c.kind === "title" ? <TitleLine text={c.text} sub={c.sub} frames={frames} top={c.top} size={c.size} />
              : c.kind === "story" ? <StoryLine text={c.text} frames={frames} />
              : <NameCard name={c.text} skill={c.sub ?? ""} frames={frames} />}
          </Sequence>
        );
      })}
      <Sequence from={endFrom} durationInFrames={all - endFrom}>
        <EndCard frames={all - endFrom} lines={p.endLines} />
      </Sequence>
      {p.music ? <Audio src={staticFile(p.music)} volume={0.9} /> : null}
    </AbsoluteFill>
  );
};
