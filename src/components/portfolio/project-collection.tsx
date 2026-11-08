import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import type { Locale } from "@/content/studio";
import { ProductFilm } from "./product-film";
import { bookmarkScreen, stickyScreen, kitClip } from "@/content/website-kits";
import { mediaImage } from "@/content/portfolio-media";
import { ViewTransition } from "react";
import { caseStudies } from "@/content/case-studies";

const projects = [
  {
    slug: "handy-bookmark",
    name: "Handy Bookmark",
    kind: "apps",
    category: "A PERSONAL READING LIBRARY",
    image: "/products/handy-bookmark/library.webp",
    detail: "/products/handy-bookmark/phone.webp",
    en: "Save a link. Make room for a good read.",
    vi: "Lưu một link. Dành chỗ cho điều hay.",
    description: {
      en: "Collect links, sort them into collections and tags, and return to your unread queue in Focus. Save reading copies for offline access.",
      vi: "Gom link vào bộ sưu tập và thẻ, rồi trở lại hàng đợi chưa đọc trong Focus. Lưu bản đọc để đọc lại ngoại tuyến.",
    },
  },
  {
    slug: "sticky-wall",
    name: "Sticky Wall",
    kind: "apps",
    category: "A WALL FOR YOUR THOUGHTS",
    image: "/products/sticky-wall/runtime-wall.webp",
    detail: "/products/sticky-wall/wall.webp",
    en: "A little wall. A lot of possibilities.",
    vi: "Một bức tường. Nhiều điều để giữ.",
    description: {
      en: "Pin notes, photographs, drawings and voice notes onto movable boards. Connect ideas with threads, change the layout, or export a memory wall.",
      vi: "Ghim ghi chú, ảnh, nét vẽ và ghi âm lên bảng có thể sắp xếp. Nối ý tưởng bằng dây, đổi góc nhìn hoặc xuất một bảng kỷ niệm.",
    },
  },
  {
    slug: "asset-forge-studio",
    name: "Asset Forge Studio",
    kind: "apps",
    category: "LOCAL AI / 3D WORKBENCH",
    image: "/products/asset-forge-studio/workspace.webp",
    detail: null,
    en: "From a reference to another dimension.",
    vi: "Từ tham chiếu đến một hình hài.",
    description: {
      en: "Bring a prompt or image into a project, follow generation in Production, inspect asset versions, and export checked model files using your configured local tools.",
      vi: "Đưa prompt hoặc ảnh vào dự án, theo dõi tạo model trong Production, kiểm tra các phiên bản và xuất tài sản bằng bộ công cụ cục bộ đã cấu hình.",
    },
  },
  {
    slug: "arcane-brigade",
    name: "Arcane Brigade",
    kind: "games",
    category: "MOVE / DODGE / BUILD YOUR BRIGADE",
    image: "/products/arcane-brigade/runtime-combat.webp",
    detail: null,
    en: "You move. The brigade brings the fight.",
    vi: "Bạn dẫn lối. Tổ đội mang theo trận chiến.",
    description: {
      en: "Move your champion while weapons and companions attack automatically. Between halls, walk up to the stalls to recruit, buy and reshape your run.",
      vi: "Di chuyển tướng trong khi vũ khí và đồng minh tự tấn công. Giữa các đấu trường, ghé tận quầy để chiêu mộ, mua và thay đổi lối chơi.",
    },
  },
];

/** Ordinary document flow: wheel, touch, keyboard and anchor links all stay native. */
export function ProjectCollection({ locale }: { locale: Locale }) {
  const vi = locale === "vi";
  return (
    <section id="selected-work" className="project-collection">
      <div className="collection-heading portfolio-wrap">
        <span className="folio-kicker">
          01 / {vi ? "NHỮNG THẾ GIỚI ĐÃ THÀNH HÌNH" : "SELECTED WORLDS"}
        </span>
        <h2>
          {vi ? "Mỗi sản phẩm," : "Each product,"}
          <em>{vi ? "một cách nhìn." : "a point of view."}</em>
        </h2>
        <nav
          className="project-jump"
          aria-label={vi ? "Đến dự án" : "Jump to a project"}
        >
          {projects.map((p, i) => (
            <a key={p.slug} href={`#work-${p.slug}`}>
              <span>0{i + 1}</span>
              {p.name}
              <ArrowDown size={14} />
            </a>
          ))}
        </nav>
      </div>
      <div className="project-case-list">
        {projects.map((p, i) => {
          const image =
            p.slug === "handy-bookmark"
              ? bookmarkScreen("02-home-item-open", locale, "desktop")
              : p.slug === "sticky-wall"
                ? stickyScreen("01_wall_home", locale, "desktop")
                : p.slug === "arcane-brigade"
                  ? mediaImage(p.slug, "fight-03-late-night-a", locale)!
                  : p.image;
          const detail =
            p.slug === "handy-bookmark"
              ? bookmarkScreen("01-home", locale)
              : p.slug === "sticky-wall"
                ? stickyScreen("01_wall_home", locale)
                : null;
          return (
            <article
              id={`work-${p.slug}`}
              className={`project-case case-${p.slug}`}
              data-scene
              key={p.slug}
            >
              <div className="project-case-top portfolio-wrap">
                <span className="folio-kicker">
                  0{i + 1} / {p.category}
                </span>
                <span className="project-case-status">
                  {vi ? "ĐÃ HOÀN THIỆN" : "COMPLETED"}
                </span>
              </div>
              <div className="project-case-layout portfolio-wrap">
                <div className="project-case-media">
                  <ViewTransition
                    name={`product-${p.slug}`}
                    share="product-morph"
                    default="none"
                  >
                    {p.slug === "arcane-brigade" ? (
                      <ProductFilm
                        {...kitClip(
                          "arcane-brigade",
                          "clip-03-fight-wave-18",
                          "pc",
                        )}
                        poster={image}
                        locale={locale}
                        label={
                          vi
                            ? "Gameplay thực tế · Tắt tiếng"
                            : "Actual gameplay · Muted"
                        }
                      />
                    ) : (
                      <Link
                        href={`/${locale}/${p.kind}/${p.slug}/`}
                        aria-label={`${vi ? "Khám phá" : "Explore"} ${p.name}`}
                      >
                        <img
                          src={image}
                          width={1800}
                          height={1125}
                          alt={p.name}
                          loading="lazy"
                        />
                      </Link>
                    )}
                  </ViewTransition>
                  {detail && (
                    <img
                      className="project-case-phone"
                      src={detail}
                      width={780}
                      height={1688}
                      alt={`${p.name} — ${vi ? "điện thoại" : "mobile"}`}
                      loading="lazy"
                    />
                  )}
                  <span className="project-case-corner" aria-hidden="true">
                    ↗
                  </span>
                </div>
                <div className="project-case-copy">
                  <h3>{p.name}</h3>
                  <p className="case-standfirst">{vi ? p.vi : p.en}</p>
                  <p>{p.description[locale]}</p>
                  <dl className="case-reasoning">
                    {caseStudies[p.slug].map((point, index) => (
                      <div key={index}>
                        <dt>
                          {
                            (vi
                              ? ["Bài toán", "Lựa chọn", "Trong sản phẩm"]
                              : [
                                  "The problem",
                                  "The decision",
                                  "In the product",
                                ])[index]
                          }
                        </dt>
                        <dd>{point[locale]}</dd>
                      </div>
                    ))}
                  </dl>
                  <Link
                    className="case-enter"
                    href={`/${locale}/${p.kind}/${p.slug}/`}
                  >
                    {vi ? "Khám phá sản phẩm" : "Explore the product"}
                    <ArrowUpRight size={25} />
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
