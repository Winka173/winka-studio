import type { Locale } from "@/content/studio";
import type { DirectionId } from "@/content/directions";
import { Experience, SiteHeader } from "./controls";
import { SiteFooter } from "./shared";
import { ReviewDock } from "./review";
import { WorldMotion } from "./worlds/motion";

export function Shell({
  children,
  locale,
  direction = "studio",
  theme,
  review = false,
}: {
  children: React.ReactNode;
  locale: Locale;
  direction?: DirectionId | "studio";
  theme?: string;
  review?: boolean;
}) {
  return (
    <Experience direction={theme || (direction === 'studio' ? 'atelier' : direction)}>
      <SiteHeader locale={locale} direction={direction} />
      {children}
      <SiteFooter locale={locale} direction={direction} />
      {!review && <WorldMotion locale={locale} />}
      {review && direction !== "studio" && (
        <ReviewDock direction={direction} locale={locale} />
      )}
    </Experience>
  );
}
