import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import type { Product } from "@/content/products";
import type { Locale } from "@/content/studio";
import { productPath } from "@/content/products";
import { LandingNav, ProductOutro } from "../worlds/common";
import { LiquidBackdrop } from "./liquid-backdrop";

export function PortfolioProduct({
  product,
  locale,
  theme,
  children,
}: {
  product: Product;
  locale: Locale;
  theme: string;
  children: React.ReactNode;
}) {
  return (
    <main
      id="main"
      className={`portfolio product-portfolio portfolio-${theme}`}
    >
      <div className="portfolio-ambient">
        <LiquidBackdrop palette={theme} />
      </div>
      <LandingNav product={product} locale={locale} />
      {children}
      <ProductOutro product={product} locale={locale} />
    </main>
  );
}
export function ProductAction({
  product,
  locale,
}: {
  product: Product;
  locale: Locale;
}) {
  const vi = locale === "vi";
  const store = product.storeLinks.find((link) => link.verified);
  const testing = ['handy-bookmark','sticky-wall','arcane-brigade'].includes(product.slug);
  return (
    <div className="product-actions">
      <a href={store?.url || "#gallery"} className="folio-button">
        {store?.label || (vi ? "Khám phá giao diện" : "Explore the product")}
        {store ? <ArrowUpRight size={20} /> : <ArrowDown size={20} />}
      </a>
      <span>
        {testing ? (vi?'Android · Thử nghiệm kín trên Google Play · Chưa mở tải đại trà':'Android · Google Play closed testing · Public release to follow') : product.completion === "complete"
          ? vi
            ? "Đã hoàn thiện · Chưa mở tải công khai"
            : "Completed · Public download not yet available"
          : vi
            ? "Đang phát triển · Chưa công bố ngày phát hành"
            : "In development · No release date announced"}
      </span>
    </div>
  );
}
export function Screen({
  src,
  alt,
  phone = false,
  className = "",
  eager = false,
}: {
  src: string;
  alt: string;
  phone?: boolean;
  className?: string;
  eager?: boolean;
}) {
  return (
    <div className={`${phone ? "real-phone" : "real-screen"} ${className}`}>
      <img
        src={src}
        alt={alt}
        width={phone ? 780 : 1920}
        height={phone ? 1688 : 1200}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : undefined}
      />
    </div>
  );
}
export function FeatureLink({
  product,
  locale,
}: {
  product: Product;
  locale: Locale;
}) {
  return (
    <Link
      className="folio-text-link"
      href={`${productPath(product, locale)}privacy/`}
    >
      {locale === "vi"
        ? "Quyền riêng tư & lựa chọn dữ liệu"
        : "Privacy & your data choices"}
      <ArrowUpRight size={17} />
    </Link>
  );
}
