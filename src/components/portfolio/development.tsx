import type { Product } from "@/content/products";
import type { Locale } from "@/content/studio";
import { mediaFor } from "@/content/portfolio-media";
import { PortfolioProduct, ProductAction, Screen } from "./shared";
import { MediaGallery } from "./gallery";
import { ProductFilm } from "./product-film";
import { DayNightCompare } from "./day-night";
import { ArrowUpRight, Asterisk } from "lucide-react";
import Link from "next/link";
import {ProductGuide} from './product-guide';

export function DevelopmentPortfolio({
  product: p,
  locale,
}: {
  product: Product;
  locale: Locale;
}) {
  const vi = locale === "vi";
  const items = mediaFor(p.slug);
  const game = p.kind === "game";
  const theme =
    p.slug === "machine-brigade"
      ? "machine"
      : p.slug === "autonomous-creative-studio"
        ? "acs"
        : p.family === "handy"
          ? "handy"
          : p.slug;
  const aether = p.slug === "aetherward",
    runa = p.slug === "runavelle",
    forge = p.slug === "forgebound",
    acs = p.slug === "autonomous-creative-studio";
  const lead =
    items.find((m) => m.device === "desktop" || m.device === "gameplay") ||
    items[0];
  return (
    <PortfolioProduct product={p} locale={locale} theme={theme}>
      <section
        className={`development-opening dev-${p.slug} portfolio-wrap`}
        data-scene
      >
        <span className="development-flag">
          <i />
          {vi ? "TRÊN BÀN LÀM VIỆC" : "ON THE WORKBENCH"} /{" "}
          {vi ? "Đang phát triển" : "In development"}
        </span>
        <div className="development-name">
          <span className="folio-kicker">{p.category[locale]}</span>
          <h1>{p.name}</h1>
          <div>
            <p>{p.description[locale]}</p>
            <ProductAction product={p} locale={locale} />
          </div>
        </div>
        {aether ? (
          <div className="aether-film">
            <ProductFilm
              src="/products/aetherward/gameplay-film.mp4"
              poster="/products/aetherward/runtime-battle.webp"
              locale={locale}
              label={
                vi
                  ? "Build Windows · Trận chiến thực tế"
                  : "Windows build · Actual battle"
              }
            />
            <div className="aether-crystal-orbit" aria-hidden="true">
              <i />
              <i />
            </div>
          </div>
        ) : runa ? (
          <DayNightCompare locale={locale} />
        ) : lead ? (
          <div
            className={`development-evidence ${forge ? "development-forge-evidence" : ""}`}
          >
            <Screen src={lead.src} alt={lead.title[locale]} eager />
            {p.family === "handy" &&
              items.find((m) => m.device === "mobile") && (
                <Screen
                  src={items.find((m) => m.device === "mobile")!.src}
                  alt={`${p.name} mobile`}
                  phone
                  className="development-mobile-evidence"
                />
              )}
          </div>
        ) : (
          <div className="development-source-art">
            <span>{p.name}</span>
            <p>
              {vi
                ? "Đang chuẩn bị hình ảnh gameplay."
                : "Gameplay previews are being prepared."}
            </p>
          </div>
        )}
      </section>
      <section
        id="experience"
        className={`development-story portfolio-wrap ${runa ? "development-runavelle-story" : ""}`}
        data-scene
      >
        <span className="folio-kicker">
          {game ? "A WORLD IN THE MAKING" : "A PRODUCT IN THE MAKING"}
        </span>
        <div>
          <h2>
            {runa
              ? vi
                ? "Một ngày để xây. Một đêm để giữ."
                : "A day to build. A night to hold."
              : forge
                ? vi
                  ? "Từng mảnh ghép, một cách chiến đấu."
                  : "Piece by piece, find your build."
                : aether
                  ? vi
                    ? "Giữ pha lê. Chọn đội hình."
                    : "Guard the crystal. Choose the formation."
                  : acs
                    ? vi
                      ? "Một nơi cho quy trình sáng tạo."
                      : "A place for the creative process."
                    : vi
                      ? "Đang thành hình. Có thể nhìn gần hơn."
                      : "Still taking shape. Already worth a closer look."}
          </h2>
          <p>
            {vi
              ? "Dự án đang được phát triển. Những góc nhìn này cho thấy giao diện và build hiện tại; tính năng và hình ảnh cuối có thể thay đổi. Studio chưa công bố ngày phát hành hoặc đường dẫn tải công khai."
              : "This project is in development. These views show the current interface and build; features and final visuals may change. The studio has not announced a release date or a public download."}
          </p>
          {p.family === "handy" && (
            <Link
              className="folio-text-link"
              href={`/${locale}/apps/handy-bookmark/`}
            >
              {vi
                ? "Khám phá Handy Bookmark đã hoàn thiện"
                : "Explore the completed Handy Bookmark"}
              <ArrowUpRight size={18} />
            </Link>
          )}
        </div>
        <Asterisk className="development-asterisk" size={66} strokeWidth={1} />
      </section>
      <ProductGuide product={p} locale={locale}/>
      {items.length > 0 ? (
        <MediaGallery items={items} locale={locale} name={p.name} />
      ) : (
        <section
          id="gallery"
          className="development-gallery-note portfolio-wrap"
        >
          <h2>
            {vi
              ? "Thế giới này vẫn đang mở ra."
              : "This world is still opening up."}
          </h2>
          <p>
            {vi
              ? "Hình ảnh sản phẩm sẽ được bổ sung khi sẵn sàng."
              : "Product captures will be added when available."}
          </p>
        </section>
      )}
    </PortfolioProduct>
  );
}
