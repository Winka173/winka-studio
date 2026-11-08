import Link from "next/link";
import {
  ArrowUpRight,
  ArrowDown,
  Shield,
  FileText,
  Trash2,
} from "lucide-react";
import type { Product } from "@/content/products";
import { productPath } from "@/content/products";
import type { Locale } from "@/content/studio";
import { legalTitles, type LegalKind } from "@/content/legal";
import { ProductStores } from "../product-stores";

export function LandingNav({
  product: p,
  locale,
}: {
  product: Product;
  locale: Locale;
}) {
  const vi = locale === "vi";
  return (
    <nav
      className="landing-nav wrap"
      aria-label={vi ? "Điều hướng sản phẩm" : "Product navigation"}
    >
      <Link
        href={`/${locale}/${p.kind === "game" ? "games" : "apps"}/`}
        className="landing-breadcrumb"
      >
        Winka <span>/</span>{" "}
        {vi
          ? p.kind === "game"
            ? "Trò chơi"
            : "Ứng dụng"
          : p.kind === "game"
            ? "Games"
            : "Apps"}
      </Link>
      <div>
        <a href="#how-it-works">
          {p.kind === "game"
            ? vi ? "Cách chơi" : "How to play"
            : vi ? "Cách dùng" : "How it works"}
        </a>
        <Link href={`/${locale}/support/${p.slug}/`}>
          {vi ? "Hỗ trợ" : "Support"}
          <ArrowUpRight size={14} />
        </Link>
      </div>
    </nav>
  );
}
export function LandingCTA({
  product: p,
  locale,
  href = "#experience",
}: {
  product: Product;
  locale: Locale;
  href?: string;
}) {
  const stores = p.storeLinks.filter((s) => s.verified);
  return (
    <div className="landing-cta">
      {stores.length ? (
        stores.map((s) => (
          <a
            href={s.url}
            rel="noopener noreferrer"
            className="world-button"
            key={s.url}
          >
            {s.label}
            <ArrowUpRight size={18} />
          </a>
        ))
      ) : (
        <a href={href} className="world-button">
          {locale === "vi" ? "Khám phá sản phẩm" : "Explore the product"}
          <ArrowDown size={18} />
        </a>
      )}
      <span className="availability">
        <i />
        {p.completion === "complete"
          ? locale === "vi"
            ? "Đã hoàn thiện · Chưa có link tải công khai"
            : "Completed · Public download to follow"
          : locale === "vi"
            ? "Đang phát triển"
            : "In development"}
      </span>
    </div>
  );
}
export function ProductOutro({
  product: p,
  locale,
}: {
  product: Product;
  locale: Locale;
}) {
  const vi = locale === "vi";
  return (
    <section className="world-outro">
      <div className="wrap">
        <div className="outro-title" data-reveal>
          <span>
            {vi ? "Một sản phẩm của Winka Studio" : "A Winka Studio creation"}
          </span>
          <h2>
            {vi ? "Giữ kết nối với sản phẩm." : "Keep the product close."}
          </h2>
          <ProductStores product={p} locale={locale} />
          <Link className="world-button" href={`/${locale}/support/${p.slug}/`}>
            {vi ? "Hướng dẫn & hỗ trợ" : "Guidance & support"}
            <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="world-legal-links">
          {(["privacy", "terms", "data-deletion"] as LegalKind[]).map(
            (kind, i) => {
              const Icon = [Shield, FileText, Trash2][i];
              return (
                <Link href={`${productPath(p, locale)}${kind}/`} key={kind}>
                  <Icon size={17} />
                  <span>{legalTitles[kind][locale]}</span>
                  <ArrowUpRight size={17} />
                </Link>
              );
            },
          )}
        </div>
      </div>
    </section>
  );
}
export function FactRail({ items }: { items: string[] }) {
  return (
    <div className="fact-rail">
      {items.map((item, i) => (
        <span key={item}>
          <i>0{i + 1}</i>
          {item}
        </span>
      ))}
    </div>
  );
}
