export const studio = {
  name: "Winka Studio",
  year: 2026,
  // Owner configuration; intentionally absent until confirmed.
  domain: null as string | null,
  supportEmail: "apps.winka.studio@gmail.com" as string | null,
  publisher: null as string | null,
  publicReleaseApproved: false,
};
export type Locale = "en" | "vi";
export const locales: Locale[] = ["en", "vi"];
export type Translation = Record<Locale, string>;
export const text = (en: string, vi: string): Translation => ({ en, vi });
