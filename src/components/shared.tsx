import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Box,
  Bookmark,
  Gamepad2,
  Layers,
  Sparkles,
} from "lucide-react";
import type { Locale } from "@/content/studio";
import { studio } from "@/content/studio";
import {
  featuredProducts,
  productPath,
  type Product,
} from "@/content/products";

export function ArrowLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={`arrow-link ${className}`}>
      {children}
      <ArrowUpRight size={19} />
    </Link>
  );
}
export function Action({
  href,
  children,
  secondary = false,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  secondary?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`button ${secondary ? "button-secondary" : "button-primary"} ${className}`}
    >
      {children}
      <ArrowUpRight size={18} />
    </Link>
  );
}
export function ProductGlyph({
  product,
  size = 28,
}: {
  product: Product;
  size?: number;
}) {
  if (product.icon)
    return (
      <img
        className="product-icon"
        src={product.icon}
        alt=""
        width={size}
        height={size}
      />
    );
  const Icon =
    product.kind === "game"
      ? Gamepad2
      : product.family === "creative"
        ? Box
        : product.slug === "handy-bookmark"
          ? Bookmark
          : Layers;
  return <Icon size={size} aria-hidden="true" />;
}
export function Status({
  product,
  locale,
}: {
  product: Product;
  locale: Locale;
}) {
  const label =
    product.status === "released"
      ? locale === "vi"
        ? "Đã phát hành"
        : "Released"
      : product.status === "beta"
        ? "Beta"
        : product.completion === "complete"
          ? locale === "vi"
            ? "Đã hoàn thiện"
            : "Completed"
          : locale === "vi"
            ? "Đang phát triển"
            : "In development";
  return (
    <span
      className={`status ${product.completion === "complete" ? "status-complete" : ""}`}
    >
      <span aria-hidden="true" />
      {label}
    </span>
  );
}
export function ProductCard({
  product,
  locale,
  large = false,
}: {
  product: Product;
  locale: Locale;
  large?: boolean;
}) {
  return (
    <Link
      className={`product-card ${large ? "product-card-large" : ""} product-${product.slug}`}
      href={productPath(product, locale)}
    >
      <div className={`product-card-art art-${product.family}`}>
        {product.image ? (
          <img
            src={
              product.slug === "sticky-wall"
                ? "/products/sticky-wall/cover.webp"
                : product.image
            }
            width={1200}
            height={750}
            alt={`${product.name} — ${product.mediaKind === "composite" ? (locale === "vi" ? "ảnh dựng từ mô phỏng" : "simulation composite") : locale === "vi" ? "giao diện sản phẩm" : "product interface"}`}
            loading="lazy"
          />
        ) : (
          <div className="unreleased-art">
            <ProductGlyph product={product} size={44} />
            <span>{product.name}</span>
            <span className="unreleased-line" />
          </div>
        )}
        {product.mediaKind === "composite" && (
          <span className="media-type-label">
            {locale === "vi" ? "Ảnh dựng từ mô phỏng" : "Simulation composite"}
          </span>
        )}
        <span className="card-open">
          <ArrowUpRight size={22} />
        </span>
      </div>
      <div className="product-card-title">
        <h3>{product.name}</h3>
        <Status product={product} locale={locale} />
      </div>
      <p>{product.category[locale]}</p>
    </Link>
  );
}
export function SiteFooter({
  locale,
  direction,
}: {
  locale: Locale;
  direction?: string;
}) {
  return (
    <footer className="site-footer closing">
      <div className="wrap">
        <div className="footer-top">
          <div>
            <Link href={`/${locale}/`} className="footer-brand">
              winka studio<span>↗</span>
            </Link>
            <p>
              {locale === "vi"
                ? "Ứng dụng hữu ích. Trò chơi mang dấu ấn riêng."
                : "Useful apps. Games with a point of view."}
            </p>
          </div>
          <div className="footer-links">
            <div>
              <span>{locale === "vi" ? "Khám phá" : "Explore"}</span>
              <Link href={`/${locale}/apps/`}>
                {locale === "vi" ? "Ứng dụng" : "Apps"}
              </Link>
              <Link href={`/${locale}/games/`}>
                {locale === "vi" ? "Trò chơi" : "Games"}
              </Link>
              <Link href={`/${locale}/about/`}>Studio</Link>
            </div>
            <div>
              <span>{locale === "vi" ? "Thông tin" : "Information"}</span>
              <Link href={`/${locale}/support/`}>
                {locale === "vi" ? "Hỗ trợ" : "Support"}
              </Link>
              <Link href={`/${locale}/legal/`}>
                {locale === "vi" ? "Pháp lý" : "Legal center"}
              </Link>
              <Link href={`/${locale}/contact/`}>
                {locale === "vi" ? "Liên hệ" : "Contact"}
              </Link>
            </div>
          </div>
        </div>
        {direction === "taste" && (
          <nav
            className="footer-product-directory"
            aria-label={
              locale === "vi" ? "Sản phẩm đã hoàn thiện" : "Completed products"
            }
          >
            {featuredProducts.map((p) => (
              <Link href={productPath(p, locale)} key={p.slug}>
                {p.name}
                <ArrowUpRight size={20} />
              </Link>
            ))}
          </nav>
        )}
        <div className="footer-bottom">
          <span>
            © {studio.year} {studio.name}
          </span>
          <span>
            {locale === "vi"
              ? "Apps, games & những ý tưởng tiếp theo."
              : "Apps, games & whatever comes next."}
          </span>
          <Link href="/review/">
            {locale === "vi" ? "Review thiết kế" : "Design review"}
            <ArrowUpRight size={14} />
          </Link>
        </div>
        <div className="footer-photo-credits">
          {locale==='vi'?'Nguồn ảnh trong giao diện: ':'Photos inside product UI: '}
          <Link href={`/${locale}/apps/handy-bookmark/credits/`}>Handy Bookmark · CC BY / CC BY-SA / CC0</Link>
          <span aria-hidden="true"> · </span><Link href={`/${locale}/apps/sticky-wall/credits/`}>Sticky Wall · CC0 / public domain</Link>
        </div>
      </div>
    </footer>
  );
}
export function SectionNumber({ children }: { children: React.ReactNode }) {
  return <span className="section-number">{children}</span>;
}
export { ArrowDown, ArrowRight, ArrowUpRight, Sparkles };
