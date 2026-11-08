import raw from "./website-kits.json";
import type { Locale } from "./studio";
type KitLocale = {
  features: string;
  credits: string;
  press?: string;
  changelog?: string;
  comparison?: string;
};
export type KitClip = {
  id: string;
  src: string;
  poster: string;
  source: string;
};
export type WebsiteKit = {
  source: string;
  assets: Record<string, string>;
  clips: KitClip[];
  pages: Record<Locale, KitLocale>;
  legal: Record<Locale, { privacy: string; terms: string }>;
  faq: Record<Locale, { question: string; answer: string }[]>;
  pricing: Record<Locale, string>;
  facts?: Record<string, number>;
  highlights?: Record<Locale, {
    title: string;
    body: string;
    image: string;
    clipId?: string | null;
    newInNextUpdate?: boolean;
  }[]>;
};
export const websiteKits = raw as unknown as Record<string, WebsiteKit>;
export const kitPages = ["features", "credits", "press", "changelog"] as const;
export type KitPage = (typeof kitPages)[number];
export const kitPageTitles = {
  features: { en: "All features", vi: "Toàn bộ tính năng" },
  credits: { en: "Credits & image licenses", vi: "Nguồn ảnh & giấy phép" },
  press: { en: "Press kit", vi: "Thông tin báo chí" },
  changelog: { en: "Changelog", vi: "Nhật ký thay đổi" },
};
export function kitClip(slug: string, id: string, form?: string) {
  const found = websiteKits[slug]?.clips.find(
    (c) => c.id === id && (!form || c.src.includes("/" + form + "/")),
  );
  if (!found)
    throw new Error(`Missing owner kit clip: ${slug}/${form || ""}/${id}`);
  return found;
}
export const bookmarkScreen = (
  scene: string,
  locale: Locale,
  form = "mobile",
  dark = false,
) =>
  `/products/handy-bookmark/kit/screenshots/${dark ? "dark" : form}/${form}${dark ? "-dark" : ""}-${locale}-${scene}.webp`;
export const stickyScreen = (scene: string, locale: Locale, form = "phone") =>
  `/products/sticky-wall/kit/screenshots/${form}/${locale}/${scene}.webp`;
