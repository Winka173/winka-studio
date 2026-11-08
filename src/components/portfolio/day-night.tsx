"use client";
import { useState } from "react";
import { MoveHorizontal } from "lucide-react";
import type { Locale } from "@/content/studio";
export function DayNightCompare({ locale }: { locale: Locale }) {
  const [split, setSplit] = useState(50);
  const vi = locale === "vi";
  return (
    <div className="day-night-compare">
      <img
        src="/products/runavelle/runtime-day.webp"
        width={1920}
        height={1080}
        alt={vi ? "Runavelle ban ngày" : "Runavelle by day"}
      />
      <div
        className="compare-night"
        style={{ clipPath: `inset(0 0 0 ${split}%)` }}
      >
        <img
          src="/products/runavelle/runtime-night.webp"
          width={1920}
          height={1080}
          alt={vi ? "Runavelle ban đêm" : "Runavelle by night"}
        />
      </div>
      <span className="compare-divider" style={{ left: `${split}%` }}>
        <MoveHorizontal size={23} />
      </span>
      <span className="compare-day-label">
        DAY / {vi ? "Xây dựng" : "Build"}
      </span>
      <span className="compare-night-label">
        NIGHT / {vi ? "Phòng thủ" : "Defend"}
      </span>
      <label className="sr-only" htmlFor="day-night-range">
        {vi ? "So sánh ảnh ngày và đêm" : "Compare day and night captures"}
      </label>
      <input
        id="day-night-range"
        type="range"
        min="5"
        max="95"
        value={split}
        aria-valuetext={`${vi ? "Ban ngày" : "Day"} ${split}%`}
        onChange={(e) => setSplit(Number(e.target.value))}
      />
    </div>
  );
}
