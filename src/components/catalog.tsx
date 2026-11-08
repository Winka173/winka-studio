"use client";
import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import type { Product } from "@/content/products";
import type { Locale } from "@/content/studio";
import { ProductCard } from "./shared";
import Link from "next/link";

export function Catalog({
  products,
  locale,
  kind,
}: {
  products: Product[];
  locale: Locale;
  kind: "app" | "game";
}) {
  const [query, setQuery] = useState("");
  const [family, setFamily] = useState("all");
  const [status, setStatus] = useState("all");
  const vi = locale === "vi";
  const filtered = useMemo(
    () =>
      products.filter(
        (p) =>
          (family === "all" || p.family === family) &&
          (status === "all" ||
            (status === "complete") === (p.completion === "complete")) &&
          `${p.name} ${p.description[locale]} ${p.category[locale]}`
            .toLocaleLowerCase(locale)
            .includes(query.toLocaleLowerCase(locale)),
      ),
    [products, query, family, status, locale],
  );
  const filters = [
    ["all", vi ? "Tất cả" : "All"],
    ["handy", "Handy Suite"],
    ["sticky", "Sticky Wall"],
    ["creative", vi ? "Công cụ sáng tạo" : "Creative tools"],
  ];
  return (
    <>
      <div className="catalog-controls">
        <div className="catalog-search">
          <Search size={19} />
          <label className="sr-only" htmlFor="product-search">
            {vi ? "Tìm sản phẩm" : "Search products"}
          </label>
          <input
            id="product-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={vi ? "Tìm sản phẩm..." : "Search products..."}
          />
          {query && (
            <button
              aria-label={vi ? "Xóa tìm kiếm" : "Clear search"}
              onClick={() => setQuery("")}
            >
              <X size={17} />
            </button>
          )}
        </div>
        <label className="catalog-status">
          <span>{vi ? "Trạng thái" : "Status"}</span>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="all">
              {vi ? "Tất cả trạng thái" : "All statuses"}
            </option>
            <option value="complete">
              {vi ? "Đã hoàn thiện" : "Completed"}
            </option>
            <option value="development">
              {vi ? "Đang phát triển" : "In development"}
            </option>
          </select>
        </label>
      </div>
      {kind === "app" && (
        <div
          className="family-filters"
          aria-label={vi ? "Lọc nhóm sản phẩm" : "Filter product families"}
        >
          {filters.map(([value, label]) => (
            <button
              aria-pressed={family === value}
              className={family === value ? "active" : ""}
              key={value}
              onClick={() => setFamily(value)}
            >
              {label}
            </button>
          ))}
        </div>
      )}
      <p className="catalog-count" aria-live="polite">
        {filtered.length} {vi ? "sản phẩm" : "products"}
      </p>
      {(["complete", "in-progress"] as const).map((completion) => {
        const group = filtered.filter((p) => p.completion === completion);
        if (!group.length) return null;
        return (
          <section className="catalog-completion-group" key={completion}>
            <div className="catalog-group-heading">
              <h2>
                {completion === "complete"
                  ? vi
                    ? "Selected Work / Đã hoàn thiện"
                    : "Selected Work / Completed"
                  : "Workbench & Lab"}
              </h2>
              <p>
                {completion === "complete"
                  ? vi
                    ? "Tình trạng tải và phát hành được ghi riêng tại trang sản phẩm."
                    : "Download and release status are stated separately on each product page."
                  : vi
                    ? "Các dự án đang phát triển; hình ảnh từ build và giao diện hiện tại."
                    : "Projects in development, with captures from their current builds and interfaces."}
              </p>
              {completion !== "complete" && (
                <Link href={`/${locale}/lab/`}>
                  {vi ? "Vào Workbench & Lab" : "Open Workbench & Lab"} ↗
                </Link>
              )}
            </div>
            <div className="catalog-grid">
              {group.map((p) => (
                <ProductCard key={p.slug} product={p} locale={locale} />
              ))}
            </div>
          </section>
        );
      })}
      {filtered.length === 0 && (
        <div className="empty-catalog">
          <Search size={32} />
          <h2>{vi ? "Không tìm thấy sản phẩm" : "No products found"}</h2>
          <p>
            {vi
              ? "Thử từ khóa khác hoặc bỏ bộ lọc."
              : "Try another search or clear the filters."}
          </p>
          <button
            className="button button-secondary"
            onClick={() => {
              setQuery("");
              setFamily("all");
              setStatus("all");
            }}
          >
            {vi ? "Bỏ bộ lọc" : "Clear filters"}
          </button>
        </div>
      )}
    </>
  );
}
