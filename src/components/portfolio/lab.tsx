import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { products, productPath } from "@/content/products";
import type { Locale } from "@/content/studio";
import { ProductGlyph } from "../shared";
import { LabIndex } from "./lab-index";

export function LabPage({ locale }: { locale: Locale }) {
  const vi = locale === "vi";
  const projects = products.filter(
    (p) =>
      p.completion !== "complete" &&
      p.family !== "handy" &&
      p.status !== "hidden",
  );
  const handy = products.filter(
    (p) =>
      p.family === "handy" &&
      p.completion !== "complete" &&
      p.status !== "hidden",
  );
  return (
    <main id="main" className="portfolio workbench-lab-page portfolio-wrap">
      <header className="lab-page-intro" data-scene>
        <span className="folio-kicker">WINKA / WORKBENCH & LAB</span>
        <h1>
          {vi ? "Chưa xong." : "Not finished."}
          <em>{vi ? "Vẫn đáng tò mò." : "Still worth a look."}</em>
        </h1>
        <p>
          {vi
            ? "Những thế giới đang xây và công cụ đang thử. Mỗi trang có hình ảnh từ build hoặc giao diện hiện tại; nội dung có thể thay đổi và chưa có lịch phát hành."
            : "Worlds under construction and tools taking shape. Each page shows the current build or interface; things can change and no release schedule has been announced."}
        </p>
        <Link className="folio-text-link" href={`/${locale}/#selected-work`}>
          {vi
            ? "Xem những sản phẩm đã hoàn thiện"
            : "See the completed products"}
          <ArrowUpRight size={18} />
        </Link>
      </header>
      <LabIndex
        locale={locale}
        items={projects.map((p) => ({
          slug: p.slug,
          name: p.name,
          kind: p.kind,
          category: p.category[locale],
          summary: p.description[locale],
          image: p.image,
          href: productPath(p, locale),
        }))}
      />
      <section className="lab-handy-family" id="handy">
        <div>
          <span className="folio-kicker">ONE FAMILY / MANY LITTLE TOOLS</span>
          <h2>Handy Suite</h2>
          <p>
            {vi
              ? "Handy Bookmark đã hoàn thiện. Handy Boards đang phát triển, dành cho công việc và kế hoạch hằng ngày."
              : "Handy Bookmark is complete. Handy Boards is in development for everyday tasks and planning."}
          </p>
          <Link
            className="folio-text-link"
            href={`/${locale}/apps/handy-bookmark/`}
          >
            {vi ? "Vào thư viện Handy Bookmark" : "Open Handy Bookmark"}
            <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="lab-handy-modules">
          {handy.map((p, i) => (
            <Link href={productPath(p, locale)} key={p.slug}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <ProductGlyph product={p} size={30} />
              <div>
                <h3>{p.name}</h3>
                <p>{p.description[locale]}</p>
              </div>
              <ArrowUpRight size={18} />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
