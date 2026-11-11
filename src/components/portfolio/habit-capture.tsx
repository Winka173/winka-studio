"use client";

import type { Locale } from "@/content/studio";
import type { PortfolioMedia } from "@/content/portfolio-media";
import { useState } from "react";
import { useThemePreference } from "../controls";
import { ImagePreview } from "./image-preview";
import { MediaGallery } from "./gallery";

export function HabitCapture({
  light,
  dark,
  alt,
  form = "highlight",
  eager = false,
  className = "",
}: {
  light: string;
  dark: string;
  alt: string;
  form?: "highlight" | "desktop" | "mobile";
  eager?: boolean;
  className?: string;
}) {
  const preference = useThemePreference();
  const src = preference === "dark" ? dark : light;
  return (
    <div className={`habit-picture habit-picture-${form} ${className}`}>
      <ImagePreview src={src} alt={alt}>
        <img
          src={src}
          alt={alt}
          width={form === "desktop" ? 1800 : form === "mobile" ? 1170 : 590}
          height={form === "desktop" ? 1125 : form === "mobile" ? 2532 : 1236}
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : undefined}
        />
      </ImagePreview>
    </div>
  );
}

export function HabitGallery({
  items,
  locale,
  initialLimit = 3,
}: {
  items: PortfolioMedia[];
  locale: Locale;
  initialLimit?: number;
}) {
  const preference = useThemePreference();
  const [allThemes, setAllThemes] = useState(false);
  const theme = preference === "dark" ? "dark" : "light";
  const visible = allThemes
    ? items
    : items.filter((item) => item.theme === theme);
  return (
    <>
      <div className="habit-gallery-preference portfolio-wrap">
        <span>
          {locale === "vi"
            ? "Ảnh theo giao diện website"
            : "Captures follow the website theme"}
        </span>
        <button
          aria-pressed={allThemes}
          onClick={() => setAllThemes(!allThemes)}
        >
          {allThemes
            ? locale === "vi"
              ? "Chỉ giao diện đang dùng"
              : "Follow current theme"
            : locale === "vi"
              ? "Xem cả sáng & tối"
              : "Show light & dark"}
        </button>
      </div>
      <MediaGallery
        key={`${theme}-${allThemes}`}
        items={visible}
        locale={locale}
        name="Handy Habit"
        initialLimit={initialLimit}
        creditsHref={`/${locale}/apps/handy-habit/credits/`}
      />
    </>
  );
}
