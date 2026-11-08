import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/content/products";
import { productPath } from "@/content/products";
import type { Locale } from "@/content/studio";
import { mediaFor } from "@/content/portfolio-media";
import { websiteKits } from "@/content/website-kits";
import { MediaGallery } from "./gallery";
import { KitFilmShelf } from "./kit-film-shelf";
import { BoardsUpdateNote } from "../boards-update-note";

export function MediaLibrary({
  product,
  locale,
}: {
  product: Product;
  locale: Locale;
}) {
  const vi = locale === "vi";
  return (
    <main id="main" className="portfolio product-media-library">
      <header className="portfolio-wrap library-intro">
        <span className="folio-kicker">
          {product.name} / {vi ? "THƯ VIỆN HÌNH ẢNH" : "MEDIA LIBRARY"}
        </span>
        <h1>{vi ? "Mở từng góc nhìn." : "Open every view."}</h1>
        <p>
          {vi
            ? "Toàn bộ ảnh và clip đã nhập từ sản phẩm. Lọc theo màn hình, mở ảnh lớn hoặc chọn clip để xem thao tác."
            : "The complete imported product captures. Filter by screen, enlarge a picture or choose a clip to see the interaction."}
        </p>
        {product.slug === "handy-boards" && <BoardsUpdateNote locale={locale} />}
        <Link href={productPath(product, locale)} className="folio-text-link">
          {vi ? "Về trang giới thiệu" : "Back to the product"}
          <ArrowUpRight size={18} />
        </Link>
      </header>
      {websiteKits[product.slug] && (
        <KitFilmShelf slug={product.slug} locale={locale} />
      )}
      <MediaGallery
        items={mediaFor(product.slug, locale)}
        locale={locale}
        name={product.name}
        creditsHref={
          websiteKits[product.slug]
            ? `${productPath(product, locale)}credits/`
            : undefined
        }
      />
    </main>
  );
}

export function MediaLibraryLink({
  product,
  locale,
}: {
  product: Product;
  locale: Locale;
}) {
  return (
    <Link
      className="media-library-link portfolio-wrap"
      href={`${productPath(product, locale)}media/`}
    >
      <span>
        <small>
          {locale === "vi"
            ? "ẢNH PC, ĐIỆN THOẠI & CLIP"
            : "PC, PHONE CAPTURES & FILMS"}
        </small>
        <strong>
          {locale === "vi"
            ? "Mở thư viện sản phẩm đầy đủ"
            : "Open the complete product library"}
        </strong>
      </span>
      <ArrowUpRight size={29} />
    </Link>
  );
}
