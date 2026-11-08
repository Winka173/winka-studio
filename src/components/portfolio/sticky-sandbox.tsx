"use client";
import { useRef, useState } from "react";
import {
  Grip,
  RotateCcw,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import type { Locale } from "@/content/studio";

const initial = [
  { x: 7, y: 15 },
  { x: 39, y: 42 },
  { x: 69, y: 12 },
];
export function StickySandbox({
  locale,
  texture,
}: {
  locale: Locale;
  texture: string;
}) {
  const [positions, setPositions] = useState(initial);
  const [connected, setConnected] = useState(true);
  const [activeNote, setActiveNote] = useState(0);
  const board = useRef<HTMLDivElement>(null);
  const drag = useRef<{
    i: number;
    pointer: number;
    x: number;
    y: number;
    left: number;
    top: number;
  } | null>(null);
  const vi = locale === "vi";
  const move = (i: number, x: number, y: number) => {
    const surface = board.current;
    const paper = surface?.querySelectorAll<HTMLElement>(".sandbox-paper")[i];
    const maxX =
      surface && paper
        ? 98 - (paper.offsetWidth / surface.clientWidth) * 100
        : 73;
    const maxY =
      surface && paper
        ? 96 - (paper.offsetHeight / surface.clientHeight) * 100
        : 60;
    setPositions((points) =>
      points.map((p, index) =>
        index === i
          ? {
              x: Math.max(2, Math.min(maxX, x)),
              y: Math.max(4, Math.min(maxY, y)),
            }
          : p,
      ),
    );
  };
  const notes = vi
    ? [
        "Một ý tưởng nhỏ.\nMột nơi để bắt đầu.",
        "Làm cho nó hữu ích.\nRồi thêm một chút vui.",
        "Những điều liên quan,\ncứ nối lại với nhau.",
      ]
    : [
        "A little idea.\nSomewhere to start.",
        "Make it useful.\nLeave room for play.",
        "Things that belong together,\ntied with a little thread.",
      ];
  return (
    <div className="sticky-playground">
      <div className="sandbox-toolbar">
        <span className="demo-label">
          {vi
            ? "BÀN THỬ TRÊN WEB / KHÔNG PHẢI APP"
            : "WEB PLAYGROUND / NOT THE APP"}
        </span>
        <button
          aria-pressed={connected}
          onClick={() => setConnected(!connected)}
        >
          {vi ? "Dây nối" : "Threads"} {connected ? "✓" : "+"}
        </button>
        <button
          aria-label={vi ? "Đặt lại ghi chú" : "Reset notes"}
          onClick={() => setPositions(initial)}
        >
          <RotateCcw size={17} />
        </button>
      </div>
      <div
        className="sandbox-board"
        ref={board}
        style={{ backgroundImage: `url(${texture})` }}
      >
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {connected &&
            positions
              .slice(0, -1)
              .map((p, i) => (
                <path
                  key={i}
                  d={`M ${p.x + 11} ${p.y + 5} Q 50 50 ${positions[i + 1].x + 11} ${positions[i + 1].y + 5}`}
                />
              ))}
        </svg>
        {positions.map((p, i) => (
          <div
            key={i}
            className={`sandbox-paper paper-${i}`}
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
          >
            <button
              className="paper-grip"
              aria-label={`${vi ? "Di chuyển ghi chú" : "Move note"} ${i + 1}`}
              onFocus={() => setActiveNote(i)}
              onPointerDown={(e) => {
                setActiveNote(i);
                e.currentTarget.setPointerCapture(e.pointerId);
                drag.current = {
                  i,
                  pointer: e.pointerId,
                  x: e.clientX,
                  y: e.clientY,
                  left: p.x,
                  top: p.y,
                };
              }}
              onPointerMove={(e) => {
                const active = drag.current;
                const rect = board.current?.getBoundingClientRect();
                if (!active || active.pointer !== e.pointerId || !rect) return;
                move(
                  i,
                  active.left + ((e.clientX - active.x) / rect.width) * 100,
                  active.top + ((e.clientY - active.y) / rect.height) * 100,
                );
              }}
              onPointerUp={() => {
                drag.current = null;
              }}
              onPointerCancel={() => {
                drag.current = null;
              }}
              onLostPointerCapture={() => {
                drag.current = null;
              }}
              onKeyDown={(e) => {
                const offsets: Record<string, [number, number]> = {
                  ArrowLeft: [-3, 0],
                  ArrowRight: [3, 0],
                  ArrowUp: [0, -3],
                  ArrowDown: [0, 3],
                };
                const offset = offsets[e.key];
                if (offset) {
                  e.preventDefault();
                  move(i, p.x + offset[0], p.y + offset[1]);
                }
              }}
            >
              <i />
              <Grip size={17} />
            </button>
            <p>{notes[i]}</p>
            <span aria-hidden="true">0{i + 1} / WINKA</span>
          </div>
        ))}
      </div>
      <div className="sandbox-nudge">
        <label>
          {vi ? "Chọn giấy" : "Choose paper"}{" "}
          <select
            value={activeNote}
            onChange={(e) => setActiveNote(Number(e.target.value))}
          >
            {initial.map((_, i) => (
              <option key={i} value={i}>
                0{i + 1}
              </option>
            ))}
          </select>
        </label>
        {[
          [-4, 0, ArrowLeft],
          [4, 0, ArrowRight],
          [0, -4, ArrowUp],
          [0, 4, ArrowDown],
        ].map(([x, y, Icon], i) => {
          const Glyph = Icon as typeof ArrowLeft;
          return (
            <button
              key={i}
              aria-label={
                (vi
                  ? ["Sang trái", "Sang phải", "Lên trên", "Xuống dưới"]
                  : ["Move left", "Move right", "Move up", "Move down"])[i]
              }
              onClick={() =>
                move(
                  activeNote,
                  positions[activeNote].x + Number(x),
                  positions[activeNote].y + Number(y),
                )
              }
            >
              <Glyph size={18} />
            </button>
          );
        })}
      </div>
      <p className="demo-status">
        {vi
          ? "Kéo tay nắm trên giấy; hoặc Tab đến tay nắm rồi dùng phím mũi tên. Cuộn trang ở ngoài tay nắm. Đây là mô phỏng web, không lưu dữ liệu."
          : "Drag a paper handle, or focus it and use the arrow keys. Scroll anywhere outside a handle. This web demo does not save data."}
      </p>
    </div>
  );
}
