import type { MetadataRoute } from "next";
import { products, productPath } from "@/content/products";
import { studio, locales } from "@/content/studio";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  if (!studio.domain || !studio.publicReleaseApproved) return [];
  return locales.flatMap((locale) =>
    ["/", "/apps/", "/games/", "/about/", "/support/", "/legal/", "/contact/"]
      .map((path) => ({ url: `${studio.domain}/${locale}${path}` }))
      .concat(
        products
          .filter((p) => p.status !== "hidden")
          .flatMap((p) =>
            ["", "privacy/", "terms/", "data-deletion/"].map((suffix) => ({
              url: `${studio.domain}${productPath(p, locale)}${suffix}`,
            })),
          ),
      ),
  );
}
