import Link from "next/link";
import { featuredProducts, getProduct, productPath } from "@/content/products";
import type { Locale } from "@/content/studio";
import {
  Action,
  ArrowLink,
  ArrowDown,
  ArrowUpRight,
  ProductCard,
  SectionNumber,
} from "../shared";

export function AddyHome({ locale }: { locale: Locale }) {
  const vi = locale === "vi";
  const bookmark = getProduct("handy-bookmark")!;
  return (
    <main id="main" className="home-addy">
      <section className="addy-hero wrap">
        <div className="addy-hero-top">
          <span className="studio-label">
            <i />
            {vi
              ? "Studio ứng dụng & trò chơi độc lập"
              : "An independent app & game studio"}
          </span>
          <span className="hero-index">W / 01</span>
        </div>
        <h1>
          {vi ? "Ứng dụng hữu ích." : "Useful apps."}
          <br />
          <em>{vi ? "Thế giới khác lạ." : "Unusual worlds."}</em>
          <span className="hero-asterisk" aria-hidden="true">
            ✳
          </span>
        </h1>
        <div className="addy-hero-bottom">
          <p>
            {vi
              ? "Winka tạo công cụ cho những việc nhỏ hằng ngày và những trò chơi từ trí tưởng tượng riêng."
              : "We make tools for the small things in your day, and games that start somewhere unexpected."}
          </p>
          <Action href={`/${locale}/apps/`}>
            {vi ? "Khám phá sản phẩm" : "Explore our work"}
          </Action>
          <a
            href="#selected-work"
            className="scroll-cue"
            aria-label={
              vi ? "Xem sản phẩm tiêu biểu" : "Scroll to selected work"
            }
          >
            <ArrowDown size={22} />
          </a>
        </div>
        <div className="addy-product-stage">
          <Link className="stage-bookmark" href={productPath(bookmark, locale)}>
            <div className="stage-window-bar">
              <span>
                <img
                  src="/products/handy-bookmark/icon.webp"
                  alt=""
                  width={22}
                  height={22}
                />
                Handy Bookmark
              </span>
              <ArrowUpRight size={18} />
            </div>
            <img
              src="/products/handy-bookmark/library.webp"
              alt={
                vi
                  ? "Thư viện Handy Bookmark — ảnh chụp ứng dụng thật"
                  : "Handy Bookmark library — actual app screenshot"
              }
              width={1800}
              height={1125}
              fetchPriority="high"
            />
          </Link>
          <Link
            className="stage-sticky"
            href={`/${locale}/apps/sticky-wall/`}
            aria-label="Sticky Wall"
          >
            <img
              src="/products/sticky-wall/wall.webp"
              alt={vi ? "Bảng ghi chú Sticky Wall" : "Sticky Wall pin board"}
              width={924}
              height={1800}
            />
          </Link>
          <div className="stage-note">
            <span>Made by Winka</span>
            <span>
              {vi ? "Giữ điều hữu ích." : "Keep what matters."}
              <br />
              {vi ? "Dành chỗ cho tò mò." : "Leave room for play."}
            </span>
            <span aria-hidden="true">↗</span>
          </div>
        </div>
      </section>
      <section id="selected-work" className="work-section wrap">
        <div className="section-heading">
          <div>
            <SectionNumber>
              01 / {vi ? "Sản phẩm" : "Selected work"}
            </SectionNumber>
            <h2>{vi ? "Từ studio của chúng tôi." : "From our studio."}</h2>
          </div>
          <ArrowLink href={`/${locale}/apps/`}>
            {vi ? "Tất cả ứng dụng" : "All apps"}
          </ArrowLink>
        </div>
        <div className="editorial-product-grid">
          {featuredProducts.map((p, i) => (
            <ProductCard
              key={p.slug}
              product={p}
              locale={locale}
              large={i === 0}
            />
          ))}
        </div>
      </section>
      <section className="handy-section">
        <div className="wrap handy-inner">
          <div>
            <SectionNumber>02 / Handy Suite</SectionNumber>
            <h2>
              {vi ? (
                <>
                  Bớt tìm kiếm.
                  <br />
                  Thêm thời gian.
                </>
              ) : (
                <>
                  A little more order.
                  <br />A little more time.
                </>
              )}
            </h2>
            <p>
              {vi
                ? "Bộ ứng dụng thiết thực cho đọc, ghi nhớ, lên kế hoạch và những công việc hằng ngày. Handy Bookmark đã hoàn thiện; những thành viên khác đang được phát triển."
                : "A family of practical apps for reading, remembering, planning and everyday tasks. Handy Bookmark is complete; the rest of the family is in development."}
            </p>
            <ArrowLink href={`/${locale}/apps/`}>
              {vi ? "Gặp Handy Suite" : "Meet Handy Suite"}
            </ArrowLink>
          </div>
          <div className="handy-type-list">
            {[
              ["Bookmark", "handy-bookmark"],
              ["Boards", "handy-boards"],
              ["Habit", "handy-habit"],
              ["Spend", "handy-spend"],
            ].map(([name, slug], i) => (
              <Link href={`/${locale}/apps/${slug}/`} key={slug}>
                <span>0{i + 1}</span>
                <span>Handy {name}</span>
                <ArrowUpRight size={23} />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="studio-note wrap">
        <SectionNumber>
          03 / {vi ? "Cách chúng tôi làm" : "The way we make"}
        </SectionNumber>
        <h2>
          {vi ? (
            <>
              Một studio nhỏ.
              <br />
              Nhiều điều muốn thử.
            </>
          ) : (
            <>
              Small studio.
              <br />
              Plenty of curiosity.
            </>
          )}
        </h2>
        <div>
          <p>
            {vi
              ? "Từ một nơi để lưu bài viết đến một thế giới để khám phá, mỗi sản phẩm bắt đầu bằng một điều chúng tôi muốn làm tốt."
              : "From a place to save an article to a world worth exploring, each project starts with something we want to make well."}
          </p>
          <ArrowLink href={`/${locale}/about/`}>
            {vi ? "Về Winka Studio" : "About Winka Studio"}
          </ArrowLink>
        </div>
      </section>
    </main>
  );
}
