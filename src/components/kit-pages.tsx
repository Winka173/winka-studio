import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Product } from "@/content/products";
import { productPath } from "@/content/products";
import type { Locale } from "@/content/studio";
import {
  websiteKits,
  kitPageTitles,
  type KitPage,
} from "@/content/website-kits";
import { legalTitles, type LegalKind } from "@/content/legal";
import { KitMarkdown } from "./kit-markdown";
import { HabitDeletion } from "./portfolio/habit-deletion";

function DocumentLinks({
  product,
  locale,
}: {
  product: Product;
  locale: Locale;
}) {
  return (
    <nav
      className="kit-document-links"
      aria-label={locale === "vi" ? "Tài liệu sản phẩm" : "Product documents"}
    >
      {(["features", "credits", "press", "changelog"] as KitPage[])
        .filter((k) => websiteKits[product.slug].pages[locale][k])
        .map((k) => (
          <Link key={k} href={`${productPath(product, locale)}${k}/`}>
            {kitPageTitles[k][locale]}
          </Link>
        ))}
      <Link href={`${productPath(product, locale)}privacy/`}>
        {legalTitles.privacy[locale]}
      </Link>
      <Link href={`${productPath(product, locale)}terms/`}>
        {legalTitles.terms[locale]}
      </Link>
      <Link href={`/${locale}/support/${product.slug}/`}>
        {locale === "vi" ? "Hỗ trợ" : "Support"}
      </Link>
      <Link href={`${productPath(product, locale)}media/`}>
        {locale === "vi" ? "Thư viện ảnh & video" : "Images & films"}
      </Link>
    </nav>
  );
}
export function KitArticle({
  product,
  locale,
  page,
}: {
  product: Product;
  locale: Locale;
  page: KitPage;
}) {
  const text = websiteKits[product.slug].pages[locale][page] || "";
  return (
    <main id="main" className="kit-document portfolio-wrap">
      <Link className="back-link" href={productPath(product, locale)}>
        <ArrowLeft size={16} />
        {product.name}
      </Link>
      <div className="kit-document-header">
        <span className="folio-kicker">
          {product.name} / {locale.toUpperCase()}
        </span>
        <h1>{kitPageTitles[page][locale]}</h1>
      </div>
      <DocumentLinks product={product} locale={locale} />
      {page === "credits" && product.slug === "handy-bookmark" && (
        <p className="kit-credit-changes">
          {locale === "vi"
            ? "Ảnh chụp giao diện đã được giảm kích thước và chuyển sang WebP. Một số clip giao diện được cắt, thêm tiêu đề và ghép vào showreel 24 giây của studio. Các ảnh có giấy phép CC BY-SA bên trong được cung cấp theo giấy phép tương ứng ghi bên dưới."
            : "UI captures have been resized and converted to WebP. Selected UI clips have been trimmed, titled and included in the studio’s 24-second showreel. Embedded CC BY-SA photographs remain available under the corresponding licenses listed below."}
        </p>
      )}
      <KitMarkdown locale={locale} product={product}>
        {text}
      </KitMarkdown>
    </main>
  );
}
export function KitLegal({
  product,
  locale,
  kind,
}: {
  product: Product;
  locale: Locale;
  kind: LegalKind;
}) {
  const kit = websiteKits[product.slug];
  // Data deletion links to the complete supplied privacy policy, including retained copies and cloud data.
  const raw = kit.legal[locale][kind === "terms" ? "terms" : "privacy"];
  return (
    <main id="main" className="kit-document kit-legal portfolio-wrap">
      <Link className="back-link" href={productPath(product, locale)}>
        <ArrowLeft size={16} />
        {product.name}
      </Link>
      <div className="kit-document-header">
        <span className="folio-kicker">
          {product.name} / {locale.toUpperCase()}
        </span>
        <h1>{legalTitles[kind][locale]}</h1>
      </div>
      <DocumentLinks product={product} locale={locale} />
      {kind === "data-deletion" && (
        <p>
          {locale === "vi"
            ? "Toàn bộ chính sách dưới đây trình bày dữ liệu trên máy, bản sao lưu và cách xóa bản trên Google Drive nếu bạn đã bật tính năng đó."
            : "The complete policy below covers local data, retained backups and deletion of Google Drive copies if you have enabled that feature."}
        </p>
      )}
      {kind === "data-deletion" && product.slug === "handy-habit" && (
        <HabitDeletion locale={locale} />
      )}
      <KitMarkdown locale={locale} product={product}>
        {raw}
      </KitMarkdown>
    </main>
  );
}
