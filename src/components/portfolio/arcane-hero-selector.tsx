"use client";
import { startTransition, useState, ViewTransition } from "react";
import type { Locale } from "@/content/studio";
import { ImagePreview } from "./image-preview";

export type HeroPortrait = {
  name: string;
  skill: string;
  art: string;
  scene: string;
  description: string;
};
const descriptionsVi: Record<string, string> = {
  "Lantern Knight":
    "Ở gần đồng đội để những đòn đánh thắp sáng đèn. Khi đủ tia sáng, tối đa bốn người bạn cùng tiến dưới ánh đèn.",
  Postmaster:
    "Đánh dấu kẻ địch bằng đòn đánh thường. Mỗi đòn thứ ba tự gửi bưu kiện đến những địa chỉ đã đánh dấu.",
  "Drowsy Seer":
    "Đi lại và tấn công để tích tia mơ. Một bản thể giấc mơ ở lại chiến đấu trong khi bạn tiếp tục di chuyển.",
  "The Root Oracle":
    "Đứng yên trong trận chiến với ba rễ cây quanh mình. Chọn che chở, gai nhọn hoặc hồi phục; trong tiệm vẫn đi lại bình thường.",
  "The Lone Jelly":
    "Không mang đồng đội trong đội hình. Hấp thụ đặc tính của bạn đã mua và thể hiện ký ức qua ba cơ quan xoay vòng.",
  "Lady Loaded Dice":
    "Nhặt đủ sáu vàng để chơi mặt xúc xắc kế tiếp. Sáu mặt đi theo chuỗi nhìn thấy được; trong tiệm có thể đổi mặt bắt đầu.",
};
export function ArcaneHeroSelector({
  heroes,
  locale,
}: {
  heroes: HeroPortrait[];
  locale: Locale;
}) {
  const [selected, setSelected] = useState(0);
  const hero = heroes[selected];
  const vi = locale === "vi";
  return (
    <div className="arcane-hero-selector">
      <div className="hero-selection-stage">
        <div className="hero-portrait-plate">
          <span aria-hidden="true">✦</span>
          <img src={hero.art} width={500} height={500} alt={hero.name} />
          <small>{String(selected + 1).padStart(2, "0")} / {heroes.length}</small>
        </div>
        <div className="hero-skill-copy" aria-live="polite">
          <span className="folio-kicker">
            {vi ? "CHỌN MỘT ANH HÙNG" : "CHOOSE YOUR HERO"}
          </span>
          <h3>{hero.name}</h3>
          <strong>{hero.skill}</strong>
          <p lang={vi && !descriptionsVi[hero.name] ? "en" : locale}>
            {vi
              ? descriptionsVi[hero.name] || hero.description
              : hero.description}
          </p>
          {vi && !descriptionsVi[hero.name] && (
            <small>{"Mô tả gốc từ bộ giới thiệu trò chơi (tiếng Anh)."}</small>
          )}
        </div>
      </div>
      <ViewTransition name="hero-skill-scene" default="hero-switch">
        <div className="hero-skill-scene">
          <ImagePreview src={hero.scene} alt={`${hero.name} — ${hero.skill}`}>
            <img
              src={hero.scene}
              alt={`${hero.name} — ${hero.skill}`}
              width={1920}
              height={1080}
              loading="lazy"
            />
          </ImagePreview>
          <span>
            {vi
              ? "ẢNH KỸ NĂNG TỪ BUILD TRÒ CHƠI / KHÔNG PHẢI MÔ PHỎNG"
              : "ACTUAL SKILL CAPTURE / NOT A SIMULATION"}
          </span>
        </div>
      </ViewTransition>
      <div
        className="hero-selection-roster"
        role="group"
        aria-label={vi ? `${heroes.length} anh hùng` : `${heroes.length} heroes`}
      >
        {heroes.map((h, i) => (
          <button
            key={h.name}
            aria-pressed={i === selected}
            onClick={() => startTransition(() => setSelected(i))}
          >
            <img src={h.art} width={90} height={90} alt="" loading="lazy" />
            <span>{h.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
