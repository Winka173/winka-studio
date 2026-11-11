import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products, getProduct, productPath } from "@/content/products";
import { directions, type DirectionId } from "@/content/directions";
import { legalTitles, type LegalKind } from "@/content/legal";
import { locales, studio, type Locale } from "@/content/studio";
import { Shell } from "@/components/shell";
import { AddyHome } from "@/components/directions/addy";
import { TasteHome } from "@/components/directions/taste";
import { UIProHome } from "@/components/directions/uipro";
import { GstackHome } from "@/components/directions/gstack";
import { StudioHome } from "@/components/worlds/home";
import { ProductLanding } from "@/components/worlds/product";
import { productTheme } from "@/content/product-themes";
import {
  websiteKits,
  kitPages,
  kitPageTitles,
  type KitPage,
} from "@/content/website-kits";
import { KitArticle } from "@/components/kit-pages";
import { LabPage } from "@/components/portfolio/lab";
import { MediaLibrary } from "@/components/portfolio/media-library";
import {
  AboutPage,
  CatalogPage,
  ContactPage,
  LegalIndex,
  LegalPage,
  SupportPage,
} from "@/components/pages";

const paths: string[][] = [
  [],
  ["apps"],
  ["games"],
  ["about"],
  ["support"],
  ["legal"],
  ["contact"],
  ["lab"],
  ...products
    .filter((p) => p.status !== "hidden")
    .flatMap((p) => {
      const category = p.kind === "game" ? "games" : "apps";
      return [
        [category, p.slug],
        [category, p.slug, "media"],
        ["support", p.slug],
        ...kitPages
          .filter((key) => websiteKits[p.slug]?.pages.en[key])
          .map((key) => [category, p.slug, key]),
        ...(["privacy", "terms", "data-deletion"] as const).map((kind) => [
          category,
          p.slug,
          kind,
        ]),
      ];
    }),
];
export const dynamicParams = false;
export function generateStaticParams() {
  return locales.flatMap((locale) => paths.map((path) => ({ locale, path })));
}
type Params = { locale: string; path?: string[] };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale: raw, path = [] } = await params;
  const locale = raw as Locale;
  const vi = locale === "vi";
  const p = path.length > 1 ? getProduct(path[1]) : undefined;
  const direction =
    path[0] === "directions"
      ? directions.find((d) => d.id === path[1])
      : undefined;
  let title =
    path.length === 0
      ? vi
        ? "Ứng dụng hữu ích & trò chơi độc lập"
        : "Useful apps & independent games"
      : p
        ? `${p.name} — ${path[0] === "support" ? (vi ? "Hỗ trợ" : "Support") : p.category[locale]}`
        : direction
          ? `${direction.letter} — ${direction.title} — ${vi ? "Hướng thiết kế" : "Design direction"}`
          : {
              apps: vi ? "Ứng dụng" : "Apps",
              games: vi ? "Trò chơi" : "Games",
              about: vi ? "Về studio" : "About",
              support: vi ? "Hỗ trợ" : "Support",
              legal: vi ? "Thông tin pháp lý" : "Legal center",
              contact: vi ? "Liên hệ" : "Contact",
              lab: vi
                ? "Workbench & Lab — Bàn thử nghiệm"
                : "Workbench & Lab — In progress",
            }[path[0]] || "Winka Studio";
  if (path[2])
    title = `${p?.name} — ${path[2] === "media" ? (vi ? "Thư viện hình ảnh" : "Media library") : legalTitles[path[2] as LegalKind]?.[locale] || kitPageTitles[path[2] as KitPage]?.[locale]}`;
  const kitSeo =
    p && path.length === 2 && path[0] !== "support"
      ? websiteKits[p.slug]?.seo?.[locale]
      : undefined;
  if (kitSeo) title = kitSeo.title;
  const description =
    kitSeo?.description ||
    (p
      ? p.description[locale]
      : vi
        ? "Khám phá ứng dụng thiết thực và những thế giới game đang được Winka Studio tạo nên."
        : "Explore practical apps and game worlds being made at Winka Studio.");
  const route = path.join("/");
  return {
    title,
    description,
    ...(studio.domain ? { metadataBase: new URL(studio.domain) } : {}),
    alternates: {
      ...(studio.domain
        ? {
            canonical: `${studio.domain}/${locale}/${route}${route ? "/" : ""}`,
          }
        : {}),
      languages: {
        en: `/en/${route}${route ? "/" : ""}`,
        vi: `/vi/${route}${route ? "/" : ""}`,
      },
    },
    openGraph: {
      title: `${title} · Winka Studio`,
      description,
      locale: vi ? "vi_VN" : "en_US",
      type: "website",
      ...(studio.domain
        ? {
            images: [
              {
                url:
                  (p && websiteKits[p.slug]?.assets["og-" + locale]) ||
                  "/brand/share.png",
                width: 1200,
                height: 630,
                alt: "Winka Studio — apps and games",
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(studio.domain
        ? {
            images: [
              (p && websiteKits[p.slug]?.assets["og-" + locale]) ||
                "/brand/share.png",
            ],
          }
        : {}),
    },
  };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { locale: raw, path = [] } = await params;
  if (raw !== "en" && raw !== "vi") notFound();
  const locale = raw as Locale;
  const key = path.join("/");
  let content: React.ReactNode;
  let direction: DirectionId | "studio" = "studio";
  let theme: string | undefined;
  let review = false;
  if (key === "") content = <StudioHome locale={locale} />;
  else if (key === "apps" || key === "games")
    content = (
      <CatalogPage locale={locale} kind={key === "apps" ? "app" : "game"} />
    );
  else if (key === "about") content = <AboutPage locale={locale} />;
  else if (key === "lab") content = <LabPage locale={locale} />;
  else if (key === "contact") content = <ContactPage locale={locale} />;
  else if (key === "legal") content = <LegalIndex locale={locale} />;
  else if (key === "support") content = <SupportPage locale={locale} />;
  else if (path[0] === "directions" && path.length === 2) {
    const match = directions.find((d) => d.id === path[1]);
    if (!match) notFound();
    direction = match.id;
    review = true;
    const Home = {
      addy: AddyHome,
      taste: TasteHome,
      uipro: UIProHome,
      gstack: GstackHome,
    }[direction];
    content = <Home locale={locale} />;
  } else {
    const p = getProduct(path[1] || "");
    if (!p) notFound();
    theme = productTheme(p);
    if (path[0] === "support" && path.length === 2)
      content = <SupportPage product={p} locale={locale} />;
    else if (`/${locale}/${path[0]}/${p.slug}/` === productPath(p, locale)) {
      if (path.length === 2)
        content = <ProductLanding product={p} locale={locale} />;
      else if (path.length === 3 && path[2] === "media")
        content = <MediaLibrary product={p} locale={locale} />;
      else if (
        path.length === 3 &&
        kitPages.includes(path[2] as KitPage) &&
        websiteKits[p.slug]?.pages[locale][path[2] as KitPage]
      )
        content = (
          <KitArticle product={p} locale={locale} page={path[2] as KitPage} />
        );
      else if (path.length === 3 && path[2] in legalTitles)
        content = (
          <LegalPage product={p} locale={locale} kind={path[2] as LegalKind} />
        );
      else notFound();
    } else notFound();
  }
  return (
    <Shell locale={locale} direction={direction} theme={theme} review={review}>
      {content}
    </Shell>
  );
}
