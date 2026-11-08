import Link from "next/link";
import { ArrowDown, ArrowUpRight, MoveUpRight, Asterisk } from "lucide-react";
import type { Locale } from "@/content/studio";
import { products, productPath } from "@/content/products";
import { LiquidBackdrop } from "./liquid-backdrop";
import { ProjectCollection } from "./project-collection";
import { RevealWords } from "../worlds/motion";
import {bookmarkScreen,stickyScreen} from '@/content/website-kits';
import {mediaImage} from '@/content/portfolio-media';

export function PortfolioHome({ locale }: { locale: Locale }) {
  const vi = locale === "vi";
  return (
    <main id="main" className="portfolio portfolio-home">
      <section className="atelier-hero" data-scene>
        <div className="portfolio-ambient hero-ambient">
          <LiquidBackdrop appearance="ribbons" />
        </div>
        <div className="atelier-overline portfolio-wrap">
          <span>
            WINKA STUDIO <i aria-hidden="true">✳</i>
          </span>
          <span>
            {vi
              ? "ỨNG DỤNG, GAME & NHỮNG Ý TƯỞNG KHÁC"
              : "APPS, GAMES & OTHER CURIOSITIES"}
          </span>
        </div>
        <div className="atelier-hero-type portfolio-wrap">
          <span className="atelier-small">
            {vi
              ? "Một studio độc lập. Không chỉ một thế giới."
              : "An independent studio. More than one world."}
          </span>
          <h1>
            <RevealWords>
              {vi ? "Từ một ý tưởng." : "From a little idea."}
            </RevealWords>
            <em>
              <RevealWords>
                {vi ? "Đến một thế giới." : "To a whole world."}
              </RevealWords>
            </em>
          </h1>
          <div className="atelier-hero-note">
            <Asterisk size={27} />
            <p>
              {vi
                ? "Những công cụ muốn mở mỗi ngày. Những trò chơi muốn ở lại thêm một chút. Được làm từng chi tiết, bởi Winka."
                : "Tools you want to open every day. Games you want to stay in a little longer. Made one detail at a time, by Winka."}
            </p>
          </div>
        </div>
        <div className="hero-orbit">
          <Link
            href={`/${locale}/apps/handy-bookmark/`}
            className="orbit-capture orbit-desktop"
            aria-label="Handy Bookmark"
          >
            <div className="media-browser-bar">
              <i />
              <i />
              <i />
              <span>HANDY BOOKMARK / DESKTOP</span>
            </div>
            <img
              src={bookmarkScreen('02-home-item-open',locale,'desktop')}
              width={1800}
              height={1125}
              alt={
                vi
                  ? "Thư viện Handy Bookmark trên màn hình lớn"
                  : "Handy Bookmark desktop library"
              }
              fetchPriority="high"
            />
          </Link>
          <Link
            href={`/${locale}/apps/sticky-wall/`}
            className="orbit-capture orbit-mobile"
            aria-label="Sticky Wall"
          >
            <img
              src={stickyScreen('01_wall_home',locale)}
              width={924}
              height={1800}
              alt={vi ? "Sticky Wall trên điện thoại" : "Sticky Wall on mobile"}
            />
          </Link>
          <Link
            href={`/${locale}/games/arcane-brigade/`}
            className="orbit-capture orbit-game"
            aria-label="Arcane Brigade"
          >
            <img
              src={mediaImage('arcane-brigade','fight-03-late-night-a',locale)}
              width={1920}
              height={1080}
              alt="Arcane Brigade gameplay"
            />
            <span>ARCADE / AR C A N E</span>
          </Link>
          <span className="orbit-coordinate" aria-hidden="true">
            W / EXPERIMENTS IN EVERYDAY WONDER
          </span>
        </div>
        <div className="atelier-hero-bottom portfolio-wrap">
          <a href="#selected-work" className="explore-disc">
            <ArrowDown size={23} />
            <span>{vi ? "Cuộn để khám phá" : "Scroll to discover"}</span>
          </a>
          <span>
            {vi
              ? "Làm việc hữu ích. Dành chỗ cho niềm vui."
              : "MAKE IT USEFUL. LEAVE ROOM FOR PLAY."}
          </span>
          <span className="atelier-cross" aria-hidden="true">
            ✳
          </span>
        </div>
      </section>
      <section className="atelier-manifesto portfolio-wrap" data-scene>
        <span className="folio-kicker">
          01 / {vi ? "TINH THẦN WINKA" : "THE WINKA WAY"}
        </span>
        <h2>
          {vi
            ? "Một chiếc bookmark. Một bức tường ký ức. Một tổ đội kỳ lạ."
            : "A bookmark. A wall of memories. A curious brigade."}
          <em>
            {vi ? "Cùng bắt đầu từ sự tò mò." : "All start with curiosity."}
          </em>
        </h2>
        <div className="manifesto-foot">
          <span className="folio-orb" aria-hidden="true" />
          <p>
            {vi
              ? "Winka là nơi ứng dụng cho ngày thường và những thế giới game được xây cạnh nhau. Mỗi sản phẩm có cá tính riêng. Từng màn hình, từng tương tác đều có một lý do để tồn tại."
              : "Winka is where everyday tools and game worlds grow side by side. Each product gets a personality of its own. Every screen, every interaction has a reason to be there."}
          </p>
        </div>
      </section>
      <ProjectCollection locale={locale} />
      <section className="atelier-index portfolio-wrap">
        <div className="folio-section-heading">
          <span className="folio-kicker">
            02 / {vi ? "TỪ STUDIO" : "FROM THE STUDIO"}
          </span>
          <h2>
            {vi ? "Chọn một lối vào." : "Find your way in."}
            <MoveUpRight size={42} />
          </h2>
        </div>
        <div className="atelier-project-list">
          {products
            .filter(
              (p) =>
                p.featured ||
                p.kind === "game" ||
                p.slug === "autonomous-creative-studio",
            )
            .map((p, i) => (
              <Link
                key={p.slug}
                href={productPath(p, locale)}
                className="atelier-project-row"
                data-scene
              >
                <span className="project-row-number">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="project-row-title">
                  {p.name}
                  <small>{p.category[locale]}</small>
                </span>
                <span className="project-row-state">
                  {p.completion === "complete"
                    ? vi
                      ? "Đã hoàn thiện"
                      : "Completed"
                    : vi
                      ? "Đang phát triển"
                      : "In development"}
                </span>
                {p.image && (
                  <img
                    src={p.image}
                    width={320}
                    height={200}
                    alt=""
                    loading="lazy"
                  />
                )}
                <ArrowUpRight size={29} />
              </Link>
            ))}
        </div>
        <div className="handy-family-callout">
          <span>HANDY SUITE</span>
          <p>
            {vi
              ? "Những công cụ nhỏ. Một ngày nhẹ hơn."
              : "Little tools. A lighter day."}
          </p>
          <Link href={`/${locale}/apps/`}>
            {vi ? "Khám phá gia đình Handy" : "Explore the Handy family"}
            <ArrowUpRight size={20} />
          </Link>
        </div>
      </section>
      <section className="atelier-closing" data-scene>
        <div className="atelier-marquee" aria-hidden="true">
          <span>SMALL STUDIO. MANY WORLDS. ✳ </span>
          <span>SMALL STUDIO. MANY WORLDS. ✳ </span>
        </div>
        <div className="portfolio-wrap">
          <p>
            {vi
              ? "Còn nhiều điều để làm. Và nhiều thế giới để mở."
              : "More things to make. More worlds to open."}
          </p>
          <Link href={`/${locale}/about/`}>
            {vi ? "Gặp Winka" : "Meet Winka"}
            <ArrowUpRight size={56} />
          </Link>
        </div>
      </section>
    </main>
  );
}
