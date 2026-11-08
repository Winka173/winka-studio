import Link from "next/link";
import { ArrowDown, ArrowUpRight, Asterisk } from "lucide-react";
import type { Locale } from "@/content/studio";
import { products, productPath } from "@/content/products";
import { LiquidBackdrop } from "./liquid-backdrop";
import { ProjectCollection } from "./project-collection";
import { RevealWords } from "../worlds/motion";
import { bookmarkScreen, stickyScreen } from "@/content/website-kits";
import { mediaImage } from "@/content/portfolio-media";
import { StudioReel } from "./studio-reel";
import { ImagePreview } from "./image-preview";

export function PortfolioHome({ locale }: { locale: Locale }) {
  const vi = locale === "vi";
  const objects = [
    {
      slug: "handy-bookmark",
      name: "Handy Bookmark",
      type: vi ? "Lưu những điều hay." : "Keep the good stuff.",
      image: bookmarkScreen("02-home-item-open", locale, "desktop"),
      kind: "apps",
      label: "01 / LIBRARY",
    },
    {
      slug: "sticky-wall",
      name: "Sticky Wall",
      type: vi ? "Ghim một chút đời thường." : "Pin a little everyday life.",
      image: stickyScreen("01_wall_home", locale, "desktop"),
      kind: "apps",
      label: "02 / PAPER",
    },
    {
      slug: "asset-forge-studio",
      name: "Asset Forge Studio",
      type: vi
        ? "Cho ý tưởng một hình hài."
        : "Give an idea another dimension.",
      image: "/products/asset-forge-studio/workspace.webp",
      kind: "apps",
      label: "03 / 3D",
    },
    {
      slug: "arcane-brigade",
      name: "Arcane Brigade",
      type: vi ? "Dẫn cả đội qua đêm." : "Lead the brigade through the night.",
      image: mediaImage("arcane-brigade", "fight-03-late-night-a", locale)!,
      kind: "games",
      label: "04 / ARCADE",
    },
  ];
  return (
    <main id="main" className="portfolio portfolio-home workbench-home">
      <section className="workbench-opening" data-scene>
        <div className="portfolio-ambient workbench-ambient" aria-hidden="true">
          <LiquidBackdrop palette="bookmark" appearance="ribbons" />
        </div>
        <div className="workbench-registration portfolio-wrap">
          <span>
            <i /> INDEPENDENT / WINKA STUDIO
          </span>
          <span>
            {vi
              ? "ỨNG DỤNG & GAME, LÀM TỪ SỰ TÒ MÒ."
              : "APPS & GAMES, MADE FROM CURIOSITY."}
          </span>
        </div>
        <div className="workbench-heading portfolio-wrap">
          <div>
            <span className="folio-kicker">
              {vi
                ? "MỜI GHÉ BÀN LÀM VIỆC CỦA WINKA."
                : "WELCOME TO WINKA’S WORKBENCH."}
            </span>
            <h1>
              <RevealWords>
                {vi ? "Việc thường ngày." : "Everyday things."}
              </RevealWords>
              <em>
                <RevealWords>
                  {vi ? "Thế giới khác thường." : "Extraordinary worlds."}
                </RevealWords>
              </em>
            </h1>
          </div>
          <p>
            {vi
              ? "Một thư viện link. Một bức tường ký ức. Một xưởng 3D. Và những đêm không muốn kết thúc. Ứng dụng và game độc lập, mỗi thứ một cá tính."
              : "A link library. A wall of memories. A 3D workshop. And nights you don’t want to end. Independent apps and games, each with a mind of its own."}
          </p>
        </div>
        <div className="workbench-objects portfolio-wrap">
          {objects.map((object, i) => (
            <article
              className={`desk-object desk-${object.slug}`}
              key={object.slug}
              style={{ "--object-i": i } as React.CSSProperties}
            >
              <div className="desk-object-label">
                <span>{object.label}</span>
                <Asterisk size={15} />
              </div>
              <ImagePreview src={object.image} alt={object.name}>
                <img
                  src={object.image}
                  alt={object.name}
                  width={1200}
                  height={750}
                  fetchPriority={i === 0 ? "high" : undefined}
                />
              </ImagePreview>
              <Link href={`/${locale}/${object.kind}/${object.slug}/`}>
                <div>
                  <strong>{object.name}</strong>
                  <span>{object.type}</span>
                </div>
                <ArrowUpRight size={22} />
              </Link>
            </article>
          ))}
        </div>
        <div className="workbench-foot portfolio-wrap">
          <a href="#selected-work">
            <ArrowDown size={18} />
            {vi ? "Khám phá những gì đã làm" : "Explore the finished work"}
          </a>
          <StudioReel locale={locale} />
          <span className="workbench-stamp" aria-hidden="true">
            SMALL STUDIO
            <br />
            MANY WORLDS
          </span>
        </div>
      </section>
      <ProjectCollection locale={locale} />
      <section className="workbench-lab portfolio-wrap" data-scene>
        <div className="workbench-section-heading">
          <span className="folio-kicker">02 / WORKBENCH & LAB</span>
          <h2>
            {vi ? "Còn trên bàn." : "Still on the desk."}
            <em>{vi ? "Đã có thứ để xem." : "Already something to see."}</em>
          </h2>
          <p>
            {vi
              ? "Build đang chạy, hình ảnh từ repo và những hướng đang thử. Đây là khu dự án đang phát triển, chưa phải sản phẩm phát hành."
              : "Running builds, repository captures and directions in progress. These are developing projects, not released products."}
          </p>
        </div>
        <div className="lab-teasers">
          {["runavelle", "forgebound", "autonomous-creative-studio"].map(
            (slug) => {
              const p = products.find((p) => p.slug === slug)!;
              return (
                <Link
                  className={`lab-teaser lab-${slug}`}
                  key={slug}
                  href={productPath(p, locale)}
                >
                  <span className="folio-kicker">{p.category[locale]}</span>
                  {p.image && (
                    <img
                      src={p.image}
                      alt={p.name}
                      width={960}
                      height={600}
                      loading="lazy"
                    />
                  )}
                  <h3>
                    {p.name}
                    <ArrowUpRight size={23} />
                  </h3>
                  <p>{p.description[locale]}</p>
                </Link>
              );
            },
          )}
        </div>
        <Link href={`/${locale}/lab/`} className="folio-button">
          {vi ? "Mở toàn bộ Workbench & Lab" : "Open the whole Workbench & Lab"}
          <ArrowUpRight size={20} />
        </Link>
      </section>
      <section className="workbench-invitation portfolio-wrap" data-scene>
        <Asterisk className="invitation-star" size={80} strokeWidth={1} />
        <span className="folio-kicker">03 / THE PERSON BEHIND THE PIXELS</span>
        <h2>
          {vi ? "Làm một thứ hữu ích." : "Make something useful."}
          <em>
            {vi ? "Để lại một chút vui." : "Leave a little room for play."}
          </em>
        </h2>
        <div>
          <p>
            {vi
              ? "Từ thao tác lưu một link đến cách tổ đội bước qua trận chiến: những điều nhỏ quyết định cảm giác của cả sản phẩm."
              : "From saving a link to leading a brigade through a fight: small decisions shape how the whole product feels."}
          </p>
          <Link href={`/${locale}/about/`}>
            {vi ? "Vào trong studio" : "Step inside the studio"}
            <ArrowUpRight size={30} />
          </Link>
          <Link href={`/${locale}/contact/`}>
            {vi ? "Gửi Winka một lời nhắn" : "Send Winka a note"}
            <ArrowUpRight size={24} />
          </Link>
        </div>
      </section>
    </main>
  );
}
