"use client";
import { useState } from "react";
import { Bookmark, Check, Folder, ArrowRight } from "lucide-react";
import type { Locale } from "@/content/studio";

export function BookmarkFiling({ locale }: { locale: Locale }) {
  const vi = locale === "vi";
  const [collection, setCollection] = useState<number | null>(null);
  const collections = vi
    ? ["Công thức nấu ăn", "Du lịch", "Đọc sau"]
    : ["Recipes", "Travel", "Read later"];
  return (
    <div className="filing-demo">
      <span className="demo-label">
        {vi
          ? "THỬ TRÊN WEB / MÔ PHỎNG THAO TÁC XẾP LINK"
          : "WEB DEMO / A FILING INTERACTION"}
      </span>
      <div className="filing-path" data-filed={collection !== null}>
        <div className="filing-slip" key={collection}>
          <Bookmark size={24} />
          <span>
            {vi ? "Một điều hay vừa tìm thấy" : "Something worth keeping"}
          </span>
        </div>
        <ArrowRight className="filing-arrow" size={30} />
        <div className="filing-destination">
          <Folder size={48} />
          <span>
            {collection === null
              ? vi
                ? "Chọn một chỗ để giữ"
                : "Give it a home"
              : collections[collection]}
          </span>
        </div>
      </div>
      <div
        className="filing-collections"
        role="group"
        aria-label={
          vi ? "Chọn bộ sưu tập minh họa" : "Choose a demonstration collection"
        }
      >
        {collections.map((name, i) => (
          <button
            key={name}
            aria-pressed={collection === i}
            onClick={() => setCollection(i)}
          >
            <Folder size={17} />
            {name}
            {collection === i && <Check size={16} />}
          </button>
        ))}
      </div>
      <p className="demo-status" role="status">
        {collection === null
          ? vi
            ? "Chọn một bộ sưu tập. Xem link về đúng chỗ."
            : "Pick a collection. Watch the link find its place."
          : vi
            ? `Đã xếp vào ${collections[collection]}. Clip bên cạnh cho thấy thao tác trong app thật.`
            : `Filed in ${collections[collection]}. The adjacent film shows the real app interaction.`}
      </p>
      {collection !== null && (
        <button className="demo-reset" onClick={() => setCollection(null)}>
          {vi ? "Thử lại" : "Try again"} ↺
        </button>
      )}
    </div>
  );
}
