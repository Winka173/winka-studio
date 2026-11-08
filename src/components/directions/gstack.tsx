import Link from "next/link";
import type { Locale } from "@/content/studio";
import { featuredProducts, productPath } from "@/content/products";
import { Action, ArrowLink, ArrowUpRight, Status } from "../shared";

export function GstackHome({ locale }: { locale: Locale }) {
  const vi = locale === "vi";
  return (
    <main id="main" className="home-gstack">
      <section className="play-hero">
        <div className="wrap">
          <div className="play-hero-grid">
            <div>
              <h1>
                {vi ? (
                  <>
                    Một chút hữu ích.
                    <br />
                    Một chút vui.
                    <br />
                    <span>Rất Winka.</span>
                  </>
                ) : (
                  <>
                    A little useful.
                    <br />A little playful.
                    <br />
                    <span>Very Winka.</span>
                  </>
                )}
              </h1>
              <p>
                {vi
                  ? "Ứng dụng để giữ ý tưởng, công cụ để tạo ra thứ mới và trò chơi cho những lúc muốn khám phá."
                  : "Apps to keep your ideas, tools to make new things, and games for when curiosity takes over."}
              </p>
              <Action href={`/${locale}/apps/`}>
                {vi ? "Khám phá sản phẩm" : "Find your next favorite"}
              </Action>
            </div>
            <div className="play-hero-art">
              <div className="play-art-label">
                <span>
                  Winka / {vi ? "Trên bàn làm việc" : "On the workbench"}
                </span>
                <ArrowUpRight size={20} />
              </div>
              <div className="play-window">
                <img
                  src="/products/handy-bookmark/library.webp"
                  alt={
                    vi ? "Thư viện Handy Bookmark" : "Handy Bookmark library"
                  }
                  width={1800}
                  height={1125}
                  fetchPriority="high"
                />
              </div>
              <div className="play-note-preview">
                <img
                  src="/products/sticky-wall/cover.webp"
                  alt="Sticky Wall"
                  width={1024}
                  height={500}
                />
              </div>
              <div className="play-caption">
                <span>
                  {vi ? "Công cụ cho ngày thường" : "Tools for everyday"}
                </span>
                <span>
                  ↳{" "}
                  {vi
                    ? "thế giới cho những lúc khác."
                    : "worlds for everything else."}
                </span>
              </div>
            </div>
          </div>
          <div className="play-hero-foot">
            <span>
              {vi
                ? "Ứng dụng. Trò chơi. Ý tưởng tiếp theo."
                : "Apps. Games. The next idea."}
            </span>
            <span>Independent by Winka ↙</span>
          </div>
        </div>
      </section>
      <section className="play-work wrap">
        <div className="play-section-heading">
          <h2>{vi ? "Những thứ chúng tôi làm." : "Things we make."}</h2>
          <span>{vi ? "Dùng. Tạo. Chơi." : "Use. Create. Play."}</span>
        </div>
        <div className="play-projects">
          {featuredProducts.map((p, i) => (
            <Link
              href={productPath(p, locale)}
              key={p.slug}
              className={`play-project play-project-${i}`}
            >
              <div className="play-project-head">
                <span>{p.category[locale]}</span>
                <ArrowUpRight size={24} />
              </div>
              <div className="play-project-image">
                <img
                  src={
                    p.slug === "sticky-wall"
                      ? "/products/sticky-wall/cover.webp"
                      : p.image!
                  }
                  alt={`${p.name} ${vi ? "giao diện thật" : "actual interface"}`}
                  width={1200}
                  height={750}
                  loading="lazy"
                />
              </div>
              <div className="play-project-title">
                <h3>{p.name}</h3>
                <Status locale={locale} product={p} />
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="play-handy">
        <div className="wrap">
          <div className="play-handy-title">
            <h2>
              {vi ? (
                <>
                  Một gia đình
                  <br />
                  mang tên Handy.
                </>
              ) : (
                <>
                  A family
                  <br />
                  called Handy.
                </>
              )}
            </h2>
            <p>
              {vi
                ? "Mỗi app giải quyết một việc. Bookmark đã hoàn thiện, các thành viên khác đang trên đường đến."
                : "Each app takes on a different job. Bookmark is complete. The rest of the family is on the way."}
            </p>
          </div>
          <div className="play-handy-links">
            {["Bookmark", "Boards", "Habit", "Spend", "Recall", "Trip"].map(
              (name) => (
                <Link
                  href={`/${locale}/apps/handy-${name.toLowerCase()}/`}
                  key={name}
                >
                  Handy {name}
                  <ArrowUpRight size={21} />
                </Link>
              ),
            )}
          </div>
          <ArrowLink href={`/${locale}/apps/`}>
            {vi ? "Xem cả gia đình" : "Meet the whole family"}
          </ArrowLink>
        </div>
      </section>
      <section className="play-about wrap">
        <div className="play-about-mark" aria-hidden="true">
          w.
        </div>
        <div>
          <h2>
            {vi
              ? "Nhỏ thôi, nhưng là của chúng tôi."
              : "A small studio with its own ideas."}
          </h2>
          <p>
            {vi
              ? "Winka là nơi ứng dụng thiết thực và ý tưởng game cùng có chỗ trên bàn làm việc. Chúng tôi xây dựng từng sản phẩm, bắt đầu từ những điều mình tò mò."
              : "At Winka, practical apps and game ideas share the same workbench. We build one project at a time, starting with the things that make us curious."}
          </p>
          <ArrowLink href={`/${locale}/about/`}>
            {vi ? "Đằng sau Winka" : "Behind Winka"}
          </ArrowLink>
        </div>
      </section>
    </main>
  );
}
