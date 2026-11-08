"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ArrowLeft, ArrowRight, Plus, X } from "lucide-react";
import type { PortfolioMedia } from "@/content/portfolio-media";
import type { Locale } from "@/content/studio";

const devices: Record<string, [string, string]> = {
  all: ["All views", "Tất cả"],
  desktop: ["Desktop", "Màn hình lớn"],
  mobile: ["Mobile", "Điện thoại"],
  tablet: ["Tablet / landscape", "Tablet / ngang"],
  gameplay: ["Gameplay", "Gameplay"],
};
export function MediaGallery({
  items,
  locale,
  name,
  creditsHref,
  initialLimit = 6,
}: {
  items: PortfolioMedia[];
  locale: Locale;
  name: string;
  creditsHref?: string;
  initialLimit?: number;
}) {
  const vi = locale === "vi";
  const [filter, setFilter] = useState("all");
  const [limit, setLimit] = useState(initialLimit);
  const expanded = limit > initialLimit;
  const [selected, setSelected] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  // The edited landing previews both screen sizes immediately; the full library retains source order.
  const firstOfEach =
    initialLimit === 3
      ? ["desktop", "mobile", "gameplay", "tablet"].flatMap(
          (device) => items.find((item) => item.device === device) || [],
        )
      : [];
  const firstSources = new Set(firstOfEach.map((item) => item.src));
  const ordered = firstOfEach.length
    ? [...firstOfEach, ...items.filter((item) => !firstSources.has(item.src))]
    : items;
  const shown = ordered.filter(
    (item) => filter === "all" || item.device === filter,
  );
  const visible = shown.slice(0, limit);
  const active = selected === null ? null : shown[selected];
  const step = (n: number) =>
    setSelected((value) =>
      value === null ? null : (value + n + shown.length) % shown.length,
    );
  useEffect(() => {
    if (selected !== null && !dialog.current?.open) dialog.current?.showModal();
    if (selected === null && dialog.current?.open) dialog.current?.close();
  }, [selected]);
  return (
    <section id="gallery" className="capture-gallery portfolio-wrap">
      <div className="gallery-heading">
        <div>
          <span className="folio-kicker">
            {vi ? "NHÌN GẦN HƠN" : "A CLOSER LOOK"} / {name}
          </span>
          <h2>
            {vi ? "Có thật. Đến từng màn hình." : "Real, down to the pixels."}
          </h2>
        </div>
        <p>
          {vi
            ? "Giao diện từ chính sản phẩm. Nội dung trong ứng dụng được dùng để minh họa."
            : "Views from the product itself. In-app content is shown for demonstration."}
          {creditsHref && (
            <>
              {" "}
              <a className="gallery-credits" href={creditsHref}>
                {vi ? "Nguồn ảnh & giấy phép" : "Photo credits & licenses"} ↗
              </a>
            </>
          )}
        </p>
      </div>
      <div
        className="gallery-filters"
        role="group"
        aria-label={vi ? "Lọc ảnh theo màn hình" : "Filter product captures"}
      >
        {["all", ...new Set(items.map((item) => item.device))].map((device) => (
          <button
            key={device}
            aria-pressed={filter === device}
            onClick={() => {
              setFilter(device);
              setLimit(initialLimit);
            }}
          >
            {(devices[device] || devices.all)[vi ? 1 : 0]}
            <span>
              {device === "all"
                ? items.length
                : items.filter((item) => item.device === device).length}
            </span>
          </button>
        ))}
      </div>
      <div className={`capture-grid filter-${filter}`}>
        {visible.map((item, i) => (
          <button
            key={item.id}
            className={`capture-card capture-${item.device} ${item.width > item.height ? "capture-landscape" : "capture-portrait"}`}
            onClick={() => setSelected(i)}
            aria-label={`${vi ? "Phóng to" : "Enlarge"}: ${item.title[locale]}`}
          >
            <div className="capture-image">
              <img
                src={item.src}
                width={item.width}
                height={item.height}
                alt={item.title[locale]}
                loading="lazy"
              />
              <span className="capture-zoom">
                <Plus size={20} />
              </span>
            </div>
            <span className="capture-caption">
              <span>{item.title[locale]}</span>
              <ArrowUpRight size={15} />
            </span>
            {(item.pro ||
              item.theme === "dark" ||
              (locale === "vi" && item.locale === "shared")) && (
              <span className="capture-badges">
                {item.pro && <span>PRO</span>}
                {item.theme === "dark" && (
                  <span>{vi ? "GIAO DIỆN TỐI" : "DARK"}</span>
                )}
                {locale === "vi" && item.locale === "shared" && (
                  <span>EN UI</span>
                )}
              </span>
            )}
          </button>
        ))}
      </div>
      {shown.length > limit && (
        <button
          className="folio-more"
          aria-expanded={expanded}
          onClick={() => setLimit(Math.min(shown.length, limit + 18))}
        >
          {vi
            ? `Xem thêm màn hình · ${visible.length}/${shown.length}`
            : `Show more views · ${visible.length}/${shown.length}`}
          <Plus size={18} />
        </button>
      )}
      {expanded && (
        <button className="folio-more" onClick={() => setLimit(initialLimit)}>
          {vi ? "Thu gọn gallery" : "Show fewer views"}
        </button>
      )}
      <dialog
        ref={dialog}
        className="capture-lightbox"
        onClose={() => setSelected(null)}
        onClick={(e) => {
          if (e.target === dialog.current) setSelected(null);
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            step(1);
          }
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            step(-1);
          }
        }}
        aria-label={vi ? "Ảnh sản phẩm phóng to" : "Full-size product capture"}
      >
        <button
          className="lightbox-close"
          aria-label={vi ? "Đóng ảnh" : "Close image"}
          onClick={() => setSelected(null)}
        >
          <X size={23} />
        </button>
        {active && (
          <>
            <img
              src={active.src}
              width={active.width}
              height={active.height}
              alt={active.title[locale]}
            />
            <div className="lightbox-caption">
              <button
                onClick={() => step(-1)}
                aria-label={vi ? "Ảnh trước" : "Previous image"}
              >
                <ArrowLeft size={22} />
              </button>
              <span>
                {active.title[locale]}
                <small>
                  {selected! + 1} / {shown.length}
                </small>
              </span>
              <button
                onClick={() => step(1)}
                aria-label={vi ? "Ảnh tiếp" : "Next image"}
              >
                <ArrowRight size={22} />
              </button>
            </div>
          </>
        )}
      </dialog>
    </section>
  );
}
