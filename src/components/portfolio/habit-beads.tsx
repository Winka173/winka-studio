"use client";

import { useState } from "react";
import { Check, Plus, Undo2 } from "lucide-react";
import type { Locale } from "@/content/studio";

export function HabitBeads({ locale }: { locale: Locale }) {
  const [kept, setKept] = useState(false);
  const vi = locale === "vi";
  return (
    <div className="habit-bead-demo">
      <span className="habit-eyebrow">
        {vi
          ? "THỬ MỘT HẠT / MINH HỌA TRÊN WEB"
          : "TRY A BEAD / WEB DEMONSTRATION"}
      </span>
      <div className="habit-bead-string">
        <div aria-hidden="true" className="habit-past-beads">
          {[true, true, false, true, false, true].map((filled, i) => (
            <span key={i} data-filled={filled} />
          ))}
        </div>
        <button
          className="habit-today-bead"
          aria-pressed={kept}
          aria-label={
            vi
              ? "Ghi nhận hạt hôm nay trong bản minh họa"
              : "Check in today's demonstration bead"
          }
          onClick={() => setKept(!kept)}
        >
          {kept ? <Check size={26} /> : <Plus size={26} />}
        </button>
      </div>
      <div className="habit-bead-feedback">
        <p role="status">
          {kept
            ? vi
              ? "Một việc nhỏ, đã giữ hôm nay."
              : "One small thing, kept today."
            : vi
              ? "Hạt hôm nay chỉ cách một chạm."
              : "Today's bead is one tap away."}
        </p>
        {kept && (
          <button onClick={() => setKept(false)}>
            <Undo2 size={14} />
            {vi ? "Hoàn tác" : "Undo"}
          </button>
        )}
      </div>
      <p className="habit-demo-note">
        {vi
          ? "Không lưu dữ liệu. Trong app, ngày chưa ghi là hạt rỗng — không phải dấu đỏ."
          : "No data is saved. In the app, an unrecorded day is a hollow bead, never a red mark."}
      </p>
    </div>
  );
}
