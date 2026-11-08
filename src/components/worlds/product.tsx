import type { Product } from "@/content/products";
import type { Locale } from "@/content/studio";
import { BookmarkPortfolio as BookmarkLanding } from "../portfolio/bookmark";
import { StickyPortfolio as StickyLanding } from "../portfolio/sticky";
import { ForgePortfolio as ForgeLanding } from "../portfolio/forge";
import { ArcanePortfolio as ArcaneLanding } from "../portfolio/arcane";
import { DevelopmentPortfolio as DevelopmentLanding } from "../portfolio/development";
import { BoardsPortfolio } from "../portfolio/boards";
export function ProductLanding({
  product,
  locale,
}: {
  product: Product;
  locale: Locale;
}) {
  const Landing = {
    "handy-bookmark": BookmarkLanding,
    "handy-boards": BoardsPortfolio,
    "sticky-wall": StickyLanding,
    "asset-forge-studio": ForgeLanding,
    "arcane-brigade": ArcaneLanding,
  }[product.slug];
  return Landing ? (
    <Landing product={product} locale={locale} />
  ) : (
    <DevelopmentLanding product={product} locale={locale} />
  );
}
