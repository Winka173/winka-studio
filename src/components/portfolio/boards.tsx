import type { Product } from "@/content/products";
import { mediaFor } from "@/content/portfolio-media";
import { kitClip, websiteKits } from "@/content/website-kits";
import type { Locale } from "@/content/studio";
import { PortfolioProduct, ProductAction, Screen } from "./shared";
import { ProductFilm } from "./product-film";
import { MediaGallery } from "./gallery";
import { MediaLibraryLink } from "./media-library";
import { KitDetails } from "./kit-details";
import { ProductGuide } from "./product-guide";
import { BoardsUpdateNote } from "../boards-update-note";

export function BoardsPortfolio({ product, locale }: { product: Product; locale: Locale }) {
  const vi = locale === "vi";
  const kit = websiteKits[product.slug];
  return (
    <PortfolioProduct product={product} locale={locale} theme="boards">
      <section className="boards-hero portfolio-wrap" data-scene>
        <div className="boards-wordmark">
          <img src={kit.assets.icon} width={52} height={52} alt="" />
          <span>Handy Boards</span>
        </div>
        <div className="boards-hero-layout">
          <div>
            <span className="folio-kicker">ANDROID / KANBAN</span>
            <h1>{vi ? "Mọi việc cần làm," : "Everything to do,"}<em>{vi ? "trên một bảng." : "on one board."}</em></h1>
            <p>{vi
              ? "Cho việc học, việc nhà và dự án. Cột cho biết việc đang ở đâu, màu đi theo từng nhóm; có việc con, nhắc nhở và mẫu bảng. Không tài khoản, không quảng cáo."
              : "For school, home and projects. Columns show where the work is; colours follow each category. Subtasks, reminders and ready-made boards. No account, no ads."}</p>
            <ProductAction product={product} locale={locale} />
          </div>
          <div className="boards-hero-capture">
            <Screen src={kit.assets[`highlights/02-board-desktop-${locale}.jpg`]} alt={vi ? "Bảng học kỳ Handy Boards" : "Handy Boards semester board"} eager />
            <img className="boards-hero-phone" src={kit.assets[`highlights/07-card-${locale}.png`]} width={780} height={1688} alt={vi ? "Thẻ công việc và các việc con" : "A task card with subtasks"} />
          </div>
        </div>
        <BoardsUpdateNote locale={locale} />
      </section>
      <section className="boards-chapters portfolio-wrap" id="experience">
        {kit.highlights![locale].map((chapter, index) => (
          <article className="boards-chapter" key={chapter.title} data-scene>
            <div className="boards-chapter-copy">
              <span className="folio-kicker">0{index + 1} / HANDY BOARDS</span>
              <h2>{chapter.title}</h2>
              {chapter.newInNextUpdate && <span className="boards-update-label">{vi ? "Bản cập nhật tới" : "Next update"}</span>}
              <p>{chapter.body}</p>
            </div>
            <div className="boards-chapter-media">
              {chapter.clipId ? (
                <ProductFilm {...kitClip(product.slug, chapter.clipId)} locale={locale} label={chapter.title} className="portrait-film" />
              ) : (
                <Screen src={chapter.image} alt={vi ? "Các cột Kanban và thẻ công việc trên màn hình lớn" : "Desktop Kanban columns and task cards"} />
              )}
            </div>
          </article>
        ))}
      </section>
      <ProductGuide product={product} locale={locale} />
      <MediaGallery items={mediaFor(product.slug, locale)} locale={locale} name={product.name} initialLimit={3} creditsHref={`/${locale}/apps/handy-boards/credits/`} />
      <MediaLibraryLink product={product} locale={locale} />
      <KitDetails product={product} locale={locale} />
    </PortfolioProduct>
  );
}
