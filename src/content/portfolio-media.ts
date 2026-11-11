import items from "./portfolio-media.json";
import kitItems from "./kit-media.json";
import type { Locale } from "./studio";
export type PortfolioMedia = {
  slug: string;
  id: string;
  src: string;
  device: string;
  width: number;
  height: number;
  title: Record<Locale, string>;
  kind: string;
  source: string;
  locale?: Locale | "shared";
  pro?: boolean;
  theme?: string;
  newInNextUpdate?: boolean;
};
const kitSlugs = new Set([
  "handy-bookmark",
  "handy-boards",
  "handy-habit",
  "sticky-wall",
  "arcane-brigade",
]);
export const portfolioMedia = [
  ...items.filter((item) => !kitSlugs.has(item.slug)),
  ...kitItems,
] as PortfolioMedia[];
export const mediaFor = (slug: string, locale: Locale = "en") => {
  const all = portfolioMedia.filter((item) => item.slug === slug);
  return all.filter(
    (item) =>
      (!item.locale || item.locale === "shared" || item.locale === locale) &&
      !(
        item.locale === "shared" &&
        all.some(
          (other) =>
            other.locale === locale &&
            other.id === item.id &&
            other.device === item.device,
        )
      ),
  );
};
export const mediaImage = (
  slug: string,
  id?: string,
  locale: Locale = "en",
) => {
  const matching = mediaFor(slug, locale).filter(
    (item) => !id || item.id === id,
  );
  return (
    matching.find(
      (item) => item.locale === locale && item.device === "desktop",
    ) ||
    matching.find((item) => item.device === "desktop") ||
    matching[0]
  )?.src;
};
