import type { MetadataRoute } from "next";
import { studio } from "@/content/studio";
export const dynamic = "force-static";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: studio.publicReleaseApproved
        ? ["/review/", "/en/directions/", "/vi/directions/"]
        : "/",
    },
    ...(studio.domain ? { sitemap: `${studio.domain}/sitemap.xml` } : {}),
  };
}
