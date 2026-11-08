import type { Product } from "@/content/products";
import type { Locale } from "@/content/studio";
import { mediaFor } from "@/content/portfolio-media";
import { stickyScreen, kitClip, websiteKits } from "@/content/website-kits";
import { PortfolioProduct, ProductAction, Screen } from "./shared";
import { ProductFilm } from "./product-film";
import { MediaGallery } from "./gallery";
import { ProductGuide } from "./product-guide";
import { KitDetails } from "./kit-details";
import { KitFilmShelf } from "./kit-film-shelf";

export function StickyPortfolio({
  product,
  locale,
}: {
  product: Product;
  locale: Locale;
}) {
  const vi = locale === "vi",
    kit = websiteKits[product.slug];
  const scenes = [
    "01_wall_home",
    "02_wall_memory_trip",
    "03_wall_work_board",
    "09_editor_drawing",
    "17_lights_off",
  ];
  const chapters = [
    {
      title: vi ? "Kéo, xoay. Như giấy thật." : "Move them like paper.",
      body: vi
        ? "Đặt ghi chú ở bất cứ đâu, xoay bằng góc thẻ, chụm để đổi cỡ. Khóa tại chỗ, xếp gọn hoặc gom theo màu. Đường căn giúp thẳng hàng; Hoàn tác giữ lại 40 bước."
        : "Move a note anywhere, turn it by the corner and pinch to resize. Lock it, tidy the wall or arrange by color. Alignment guides and 40 steps of Undo keep it easy.",
      scene: "01_wall_home",
      clip: "drag_and_turn",
    },
    {
      title: vi ? "Nối ý tưởng bằng dây len." : "Tie ideas together.",
      body: vi
        ? "Kéo từ ghim này sang ghim kia, viết chữ lên dây và thêm mũi tên. Tích việc ngay trên tường. Bức tường trở thành tấm bản đồ của những điều liên quan."
        : "Drag from one pin to another, label the yarn and add an arrow. Tick tasks right on the wall. Your board becomes a map of connected things.",
      scene: "06_editor_checklist",
      clip: "tick_and_thread",
    },
    {
      title: vi
        ? "Tường của những ngày đã qua."
        : "A wall of days to remember.",
      body: vi
        ? "Chọn tối đa 20 ảnh, thử năm bố cục, thêm khung và chú thích. Kéo, xoay, chọn ảnh chính và nối kỷ niệm bằng dây như mọi tờ ghi chú."
        : "Choose up to 20 photos, try five layouts, add frames and captions. Move, turn, pick a hero photo and tie memories together just like notes.",
      scene: "02_wall_memory_trip",
      clip: "switch_boards",
    },
    {
      title: vi
        ? "45 điểm bắt đầu. 43 cách đổi góc nhìn."
        : "45 starting points. 43 new moods.",
      body: vi
        ? "Mẫu bảng sửa được cho kế hoạch tuần, Kanban, ôn thi, thực đơn và bảng ước mơ. Xem trước chủ đề ngay trên bảng của bạn, áp dụng một chạm, hoặc Hoàn tác."
        : "Editable boards for weekly plans, Kanban, exams, menus and vision boards. Preview a theme on your actual wall, apply with one tap, or Undo.",
      scene: "13_templates",
      clip: "apply_theme",
    },
  ];
  return (
    <PortfolioProduct product={product} locale={locale} theme="sticky">
      <section className="sticky-canvas-intro sticky-kit-hero" data-scene>
        <div className="sticky-intro-copy portfolio-wrap">
          <span className="folio-kicker">
            STICKY WALL /{" "}
            {vi ? "MỘT BỨC TƯỜNG CỦA RIÊNG BẠN" : "A LITTLE WALL OF YOUR OWN"}
          </span>
          <h1>
            {vi ? "Ghi chú của bạn," : "Your notes,"}
            <em>{vi ? "ghim lên tường." : "pinned to a wall."}</em>
          </h1>
          <p>
            {vi
              ? "Giấy note màu pastel trên bức tường như thật. Kéo, xoay, nối dây len, thêm ảnh và ghi âm. Không tài khoản, không quảng cáo."
              : "Pastel paper notes on a wall that feels real. Drag, turn, tie with yarn, add photos and voice notes. No account, no ads."}
          </p>
          <ProductAction product={product} locale={locale} />
        </div>
        <div className="sticky-screen-fan">
          {scenes.map((scene, i) => (
            <Screen
              key={scene}
              src={stickyScreen(scene, locale)}
              alt={
                vi
                  ? [
                      "Bảng ghi chú hằng ngày",
                      "Tường kỷ niệm chuyến đi",
                      "Bảng công việc Kanban",
                      "Vẽ tay trên giấy",
                      "Tắt đèn",
                    ][i]
                  : [
                      "Everyday notes",
                      "Trip memory wall",
                      "Work Kanban board",
                      "Drawing on paper",
                      "Lights off",
                    ][i]
              }
              phone
              className={
                ["fan-one", "fan-two", "fan-main", "fan-four", "fan-five"][i]
              }
              eager={i < 3}
            />
          ))}
        </div>
        <span className="sticky-scrawl" aria-hidden="true">
          {vi ? "ghim một chút đời thường." : "pin a little everyday life."} ↝
        </span>
      </section>
      <section className="sticky-panorama" id="experience" data-scene>
        <div className="portfolio-wrap">
          <span className="folio-kicker">
            {vi
              ? "GIẤY, GHIM, DÂY VÀ MỘT CHÚT BẠN"
              : "PAPER, PINS, YARN AND A LITTLE YOU"}
          </span>
          <h2>
            {vi ? "Một tường cho việc cần làm." : "A wall for things to do."}
            <em>
              {vi
                ? "Một tường cho điều muốn giữ."
                : "A wall for things to keep."}
            </em>
          </h2>
        </div>
        <Screen
          src={stickyScreen("01_wall_home", locale, "desktop")}
          alt={
            vi
              ? "Sticky Wall: bố cục màn hình lớn trên Android"
              : "Sticky Wall large-screen Android layout"
          }
          className="sticky-landscape"
        />
        <div className="sticky-panorama-foot portfolio-wrap">
          <span>ANDROID / LARGE-SCREEN LAYOUT</span>
          <p>
            {vi
              ? "Bảy loại ghi chú và sticker. Văn bản, checklist, link, nét vẽ, ảnh in, nhãn băng dính và ghi âm cassette cùng ở trên tường."
              : "Seven kinds of note, plus stickers. Text, checklists, links, drawings, photo prints, tape labels and cassette voice notes share the wall."}
          </p>
        </div>
      </section>
      <div className="sticky-kit-chapters">
        {chapters.map((c, i) => (
          <section
            className={`sticky-kit-chapter portfolio-wrap sticky-chapter-${i + 1}`}
            key={c.clip}
            data-scene
          >
            <div className="sticky-paper-copy">
              <span className="folio-kicker">0{i + 1} / STICKY WALL</span>
              <h2>{c.title}</h2>
              <p>{c.body}</p>
            </div>
            <div className="sticky-kit-film">
              <ProductFilm
                {...kitClip(product.slug, c.clip)}
                locale={locale}
                label={c.title + " · EN UI"}
                className="portrait-film"
              />
            </div>
            <img
              className="sticky-chapter-print"
              src={stickyScreen(c.scene, locale)}
              alt={c.title}
              width={1080}
              height={2160}
              loading="lazy"
            />
          </section>
        ))}
      </div>
      <section className="sticky-materials portfolio-wrap">
        <div>
          <span className="folio-kicker">
            {vi ? "THEO CÁCH CỦA BẠN" : "MAKE IT YOURS"}
          </span>
          <h2>
            {vi ? "Không phải nền trống." : "More than a blank background."}
          </h2>
          <p>
            {vi
              ? "31 chất liệu tường, 16 phông chữ viết tay đủ dấu tiếng Việt. 234 sticker, băng washi, con dấu và hình vẽ. Trong đó có các lựa chọn Pro — xem bảng quyền lợi bên dưới."
              : "31 wall surfaces, 16 handwriting fonts with Vietnamese accents. 234 stickers, washi tapes, stamps and doodles. Some choices are Pro — see the inclusions below."}
          </p>
        </div>
        <div className="sticky-material-swatches">
          {["cork", "wood", "linen", "brick", "denim", "kraft"].map((wall) => (
            <figure key={wall}>
              <img
                src={kit.assets[`media/walls/wall_${wall}.jpg`]}
                alt={wall}
                width={300}
                height={300}
                loading="lazy"
              />
              <figcaption>{wall}</figcaption>
            </figure>
          ))}
        </div>
      </section>
      <section className="sticky-night-film portfolio-wrap" data-scene>
        <div>
          <span className="folio-kicker">
            {vi ? "TẮT ĐÈN. GIỮ HƠI ẤM." : "LIGHTS OFF. STILL WARM."}
          </span>
          <h2>
            {vi ? "Buổi tối cũng có" : "Evenings have"}
            <em>{vi ? "một bức tường riêng." : "a wall of their own."}</em>
          </h2>
          <p>
            {vi
              ? "Tường, giấy và ảnh dịu lại như dưới đèn bàn. Theo hệ thống hoặc hẹn giờ. Khi cần nhìn gọn hơn, chuyển sang lưới hay danh sách; tìm không dấu trên mọi bảng."
              : "The wall, paper and prints settle into warm lamplight. Follow the system or a schedule. Switch to grid or list when you need a tidier view, and search across boards without accents."}
          </p>
          <Screen
            src={stickyScreen("17_lights_off", locale, "desktop")}
            alt={
              vi
                ? "Bảng ghi chú dưới ánh đèn ấm"
                : "The board in warm night light"
            }
          />
        </div>
        <ProductFilm
          {...kitClip(product.slug, "lights_off")}
          locale={locale}
          label={vi ? "Tắt đèn · EN UI" : "Lights off · EN UI"}
          className="portrait-film"
        />
      </section>
      <ProductGuide product={product} locale={locale} />
      <KitFilmShelf slug={product.slug} locale={locale} />
      <MediaGallery
        items={mediaFor(product.slug, locale)}
        locale={locale}
        name={product.name}
        creditsHref={`/${locale}/apps/sticky-wall/credits/`}
      />
      <KitDetails product={product} locale={locale} />
    </PortfolioProduct>
  );
}
