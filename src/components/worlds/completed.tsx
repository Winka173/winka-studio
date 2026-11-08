import Link from "next/link";
import {
  ArrowUpRight,
  Bookmark,
  Cloud,
  ScanLine,
  FolderOpen,
  MoveUpRight,
} from "lucide-react";
import type { Locale } from "@/content/studio";
import type { Product } from "@/content/products";
import { LandingNav, LandingCTA, ProductOutro, FactRail } from "./common";
import {
  BookmarkShelf,
  StickyBoard,
  ForgeTurntable,
  ArcaneActs,
} from "./interactions";
import { RevealWords } from "./motion";

type Props = { product: Product; locale: Locale };

export function BookmarkLanding({ product, locale }: Props) {
  const vi = locale === "vi";
  return (
    <main id="main" className="world-page bookmark-world">
      <LandingNav product={product} locale={locale} />
      <section className="bookmark-opening wrap" data-scene>
        <div className="library-masthead">
          <img src={product.icon!} width={36} height={36} alt="" />
          <span>Handy Bookmark</span>
          <span>
            {vi ? "Thư viện của riêng bạn" : "Your own little library"}
          </span>
        </div>
        <div className="bookmark-headline">
          <div>
            <span className="chapter-kicker">
              {vi
                ? "Dành cho những điều đáng đọc lại"
                : "For the things worth returning to"}
            </span>
            <h1>
              <RevealWords>
                {vi ? "Đọc điều hay. Giữ lại lâu." : "Good reads. Kept close."}
              </RevealWords>
            </h1>
            <p>
              {vi
                ? "Một đường link hôm nay có thể là ý tưởng của ngày mai. Giữ bài viết, xếp bộ sưu tập và tìm lại những điều bạn muốn đọc."
                : "Today’s link can become tomorrow’s idea. Save an article, give it a place, and find your way back to what you wanted to read."}
            </p>
            <LandingCTA product={product} locale={locale} />
          </div>
          <div className="book-object" aria-hidden="true">
            <div className="book-spine">HANDY / BOOKMARK</div>
            <div className="book-cover">
              <Bookmark size={58} strokeWidth={1} />
              <span>
                The personal
                <br />
                library.
              </span>
              <small>Links. Collections. A little focus.</small>
              <i />
            </div>
            <span className="book-pages" />
          </div>
        </div>
        <div className="library-window" data-reveal>
          <div className="library-window-title">
            <span>
              <i />
              <i />
              <i />
            </span>
            <span>Handy Bookmark / {vi ? "Thư viện" : "The library"}</span>
            <FolderOpen size={15} />
          </div>
          <img
            src={product.image!}
            width={1800}
            height={1125}
            alt={
              vi
                ? "Ảnh thật thư viện Handy Bookmark"
                : "Actual Handy Bookmark library screenshot"
            }
            fetchPriority="high"
          />
        </div>
      </section>
      <section id="experience" className="bookmark-chapters wrap">
        <div className="bookmark-chapter-intro" data-reveal>
          <span className="chapter-kicker">
            01 / {vi ? "Một nơi để quay lại" : "A place to return to"}
          </span>
          <h2>
            {vi
              ? "Từ “để đọc sau” đến một thư viện riêng."
              : "From “read later” to a library of your own."}
          </h2>
        </div>
        <div className="bookmark-reading-layout">
          <div className="reading-chapter-list">
            {[
              [
                vi ? "Lưu trước." : "Save it first.",
                vi
                  ? "Link và bài viết được giữ trong thư viện, sẵn sàng để bạn sắp xếp."
                  : "Links and articles stay in your library, ready to find their place.",
              ],
              [
                vi ? "Xếp theo cách bạn nghĩ." : "File it your way.",
                vi
                  ? "Bộ sưu tập và thẻ đưa những nội dung liên quan về cùng một chỗ."
                  : "Collections and tags bring related reading together.",
              ],
              [
                vi ? "Để việc đọc được trọn vẹn." : "Give reading its moment.",
                vi
                  ? "Bản đọc ngoại tuyến và chế độ Tập trung dành chỗ cho nội dung."
                  : "Offline copies and Focus make room for the article itself.",
              ],
            ].map(([title, description], i) => (
              <article data-reveal key={title}>
                <span>0{i + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </article>
            ))}
          </div>
          <BookmarkShelf locale={locale} />
        </div>
      </section>
      <section className="bookmark-library-band" data-scene>
        <div className="wrap">
          <span className="chapter-kicker">
            02 /{" "}
            {vi
              ? "Một thư viện, tùy bạn mang theo"
              : "Your library, your choice"}
          </span>
          <h2 data-reveal>
            {vi
              ? "Ở trên máy. Theo bạn khi cần."
              : "On your device. Along for the ride."}
          </h2>
          <div className="bookmark-sync-line">
            <Bookmark size={36} />
            <span className="sync-path" aria-hidden="true">
              <i />
            </span>
            <Cloud size={42} />
          </div>
          <p>
            {vi
              ? "Sao lưu cục bộ và đồng bộ Google Drive tùy chọn. Bạn chọn khi nào kết nối; bản sao trên thiết bị và trên Drive được quản lý riêng."
              : "Local backups and optional Google Drive sync. You choose when to connect; copies on your device and in Drive are managed separately."}
          </p>
          <Link href={`/${locale}/apps/handy-bookmark/data-deletion/`}>
            {vi
              ? "Tìm hiểu các lựa chọn dữ liệu"
              : "Understand your data choices"}
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
      <ProductOutro product={product} locale={locale} />
    </main>
  );
}

export function StickyLanding({ product, locale }: Props) {
  const vi = locale === "vi";
  return (
    <main id="main" className="world-page sticky-world">
      <LandingNav product={product} locale={locale} />
      <section className="sticky-opening wrap">
        <div className="sticky-opening-copy">
          <span className="sticky-label">
            <img src={product.icon!} width={32} height={32} alt="" />
            Sticky Wall
          </span>
          <h1>
            <RevealWords>
              {vi
                ? "Ghim chút nghĩ suy. Giữ chút riêng mình."
                : "Pin a little thought. Keep a little you."}
            </RevealWords>
          </h1>
          <p>
            {vi
              ? "Ghi chú, ảnh, hình vẽ và những điều vụn vặt bạn không muốn quên. Một bức tường để bày ra theo cách của riêng mình."
              : "Notes, photos, drawings, and the little things you don’t want to forget. A wall you can put together your own way."}
          </p>
          <LandingCTA product={product} locale={locale} />
        </div>
        <StickyBoard locale={locale} />
      </section>
      <section id="experience" className="sticky-memory-section">
        <div className="wrap">
          <div className="sticky-section-title" data-reveal>
            <span className="handwritten-note">
              {vi ? "thử ghim điều gì đó nhé" : "a place for the little things"}
            </span>
            <h2>
              {vi
                ? "Ý tưởng không cần nằm thẳng hàng."
                : "Ideas don’t have to stay in a line."}
            </h2>
          </div>
          <div className="sticky-memory-grid">
            <article className="memory-note" data-reveal>
              <span className="washi-tape" />
              <h3>{vi ? "Kéo. Xoay. Nối." : "Drag. Turn. Connect."}</h3>
              <p>
                {vi
                  ? "Sắp ghi chú trên bảng, nối chúng bằng đường chỉ và thay đổi bố cục khi ý tưởng lớn lên."
                  : "Arrange notes on a board, tie them together with threads, and let the layout change as an idea grows."}
              </p>
              <img
                src="/products/sticky-wall/guitar.webp"
                width={160}
                height={160}
                alt=""
              />
            </article>
            <div className="sticky-editor-paper" data-reveal>
              <img
                src="/products/sticky-wall/editor.webp"
                alt={
                  vi
                    ? "Trình sửa ghi chú Sticky Wall"
                    : "Sticky Wall note editor"
                }
                width={924}
                height={1800}
              />
            </div>
            <article className="memory-note memory-note-blue" data-reveal>
              <span className="paper-pin" />
              <h3>
                {vi ? "Còn nhiều hơn chữ viết." : "More than a written note."}
              </h3>
              <p>
                {vi
                  ? "Ghim ảnh, vẽ tay và lưu ghi âm. Đặt chúng cạnh những điều cần làm, trên cùng một bức tường."
                  : "Pin a photo, draw something, or keep a voice note. Give them a place beside your to-dos on the same wall."}
              </p>
              <div className="note-soundwave" aria-hidden="true">
                {Array.from({ length: 18 }, (_, i) => (
                  <i key={i} style={{ "--bar": i } as React.CSSProperties} />
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>
      <section className="sticky-night-section" data-scene>
        <div className="wrap">
          <div data-reveal>
            <span className="handwritten-note">
              {vi ? "bật một chế độ khác" : "a different kind of evening"}
            </span>
            <h2>
              {vi
                ? "Bức tường cũng có giờ nghỉ."
                : "Even a wall has its evening."}
            </h2>
            <p>
              {vi
                ? "Đổi giao diện, giấy và cách xem. Một bảng có thể là kế hoạch hôm nay, hoặc nơi giữ những kỷ niệm."
                : "Change the wall, the papers and the view. A board can hold today’s plan or a collection of memories."}
            </p>
            <FactRail
              items={
                vi
                  ? [
                      "Tường · Lưới · Danh sách",
                      "Ghi chú · Ảnh · Ghi âm",
                      "Sao lưu · Drive tùy chọn",
                    ]
                  : [
                      "Wall · Grid · List",
                      "Notes · Photos · Voice",
                      "Backups · Optional Drive",
                    ]
              }
            />
          </div>
          <div className="night-phone" data-reveal>
            <img
              src="/products/sticky-wall/night.webp"
              alt="Sticky Wall night mode"
              width={924}
              height={1800}
            />
          </div>
        </div>
      </section>
      <ProductOutro product={product} locale={locale} />
    </main>
  );
}

export function ForgeLanding({ product, locale }: Props) {
  const vi = locale === "vi";
  return (
    <main id="main" className="world-page forge-world">
      <LandingNav product={product} locale={locale} />
      <section className="forge-opening wrap" data-scene>
        <div className="forge-system-line">
          <span>
            <i />
            ASSET FORGE STUDIO
          </span>
          <span>LOCAL / WINDOWS / 3D</span>
        </div>
        <div className="forge-opening-copy">
          <h1>
            <RevealWords>
              {vi
                ? "Ý tưởng có hình. Tài sản có chiều sâu."
                : "Give an idea its dimensions."}
            </RevealWords>
          </h1>
          <div>
            <p>
              {vi
                ? "Xưởng 3D trên Windows cho quy trình từ mô tả hoặc ảnh tham chiếu đến tạo model, kiểm tra và xuất tài sản. Với công cụ AI cục bộ và Blender."
                : "A Windows 3D workbench for the journey from prompt or reference to generation, inspection and export. With local AI tools and Blender."}
            </p>
            <LandingCTA product={product} locale={locale} />
          </div>
        </div>
        <ForgeTurntable locale={locale} />
      </section>
      <section id="experience" className="forge-pipeline wrap">
        <div className="forge-section-heading" data-reveal>
          <span className="chapter-kicker">01 / PRODUCTION PIPELINE</span>
          <h2>
            {vi
              ? "Từ một hướng đi đến một tài sản."
              : "From a reference to an asset."}
          </h2>
        </div>
        <div className="pipeline-track">
          {[
            [
              vi ? "Tham chiếu" : "Reference",
              vi
                ? "Bắt đầu từ mô tả hoặc hình ảnh."
                : "Begin with a prompt or image.",
              FolderOpen,
            ],
            [
              vi ? "Tạo model" : "Generate",
              vi
                ? "Chạy các công cụ tạo hình cục bộ."
                : "Run the local generation tools.",
              ScanLine,
            ],
            [
              vi ? "Kiểm tra" : "Inspect",
              vi
                ? "Xem hình học, vật liệu và phiên bản."
                : "Review geometry, materials and versions.",
              Bookmark,
            ],
            [
              vi ? "Xuất tài sản" : "Export",
              vi
                ? "Đưa tài sản qua quy trình Blender."
                : "Deliver through the Blender pipeline.",
              MoveUpRight,
            ],
          ].map(([title, description, Icon], i) => {
            const Glyph = Icon as typeof FolderOpen;
            return (
              <article data-reveal key={String(title)}>
                <span className="pipeline-node">
                  <Glyph size={26} />
                </span>
                <span className="pipeline-number">0{i + 1}</span>
                <h3>{String(title)}</h3>
                <p>{String(description)}</p>
              </article>
            );
          })}
        </div>
      </section>
      <section className="forge-workspace-section">
        <div className="wrap">
          <div className="forge-workspace-heading" data-reveal>
            <h2>
              {vi
                ? "Một bàn làm việc. Cả quy trình."
                : "One workbench. The whole process."}
            </h2>
            <p>
              {vi
                ? "Production và Library giữ quá trình tạo, kiểm tra và quản lý phiên bản cùng một chỗ. Công cụ và trọng số model bên ngoài được cấu hình riêng."
                : "Production and Library keep generation, inspection and version management together. External tools and model weights are configured separately."}
            </p>
          </div>
          <div className="forge-workspace-image" data-reveal>
            <div className="forge-window-label">
              <span>PRODUCTION WORKSPACE</span>
              <span>Asset Forge Studio ↗</span>
            </div>
            <img
              src={product.image!}
              alt={
                vi
                  ? "Workspace thật của Asset Forge Studio"
                  : "Actual Asset Forge Studio workspace"
              }
              width={1800}
              height={1225}
            />
          </div>
          <div className="forge-license-note">
            <span>BEFORE YOU BUILD</span>
            <p>
              {vi
                ? "Giấy phép model, công cụ và quyền sử dụng đầu ra cần được kiểm tra theo từng thành phần."
                : "Model licenses, tool licenses and output rights need to be checked for each component."}
            </p>
            <Link href={`/${locale}/apps/asset-forge-studio/terms/`}>
              <ArrowUpRight size={20} />
              <span className="sr-only">{vi ? "Điều khoản" : "Terms"}</span>
            </Link>
          </div>
        </div>
      </section>
      <ProductOutro product={product} locale={locale} />
    </main>
  );
}

export function ArcaneLanding({ product, locale }: Props) {
  const vi = locale === "vi";
  return (
    <main id="main" className="world-page arcane-world">
      <LandingNav product={product} locale={locale} />
      <section className="arcane-opening" data-scene>
        <div className="arcane-artwork">
          <img
            src="/products/arcane-brigade/icon.webp"
            alt={
              vi
                ? "Artwork gốc Arcane Brigade từ repo trò chơi"
                : "Original Arcane Brigade game artwork from the repository"
            }
            width={1024}
            height={1024}
            fetchPriority="high"
          />
        </div>
        <div className="arcane-curtain curtain-left" aria-hidden="true" />
        <div className="arcane-curtain curtain-right" aria-hidden="true" />
        <div className="arcane-embers" aria-hidden="true">
          {Array.from({ length: 16 }, (_, i) => (
            <i key={i} style={{ "--ember": i } as React.CSSProperties} />
          ))}
        </div>
        <div className="arcane-title wrap">
          <span>
            {vi ? "Một trò chơi của Winka Studio" : "A game by Winka Studio"}
          </span>
          <h1>
            Arcane
            <br />
            <em>Brigade</em>
          </h1>
          <p>
            {vi
              ? "Một tổ đội kỳ lạ. Những đấu trường nối tiếp. Chọn đồng minh và tìm lối chơi của bạn."
              : "A curious squad. A succession of combat halls. Choose your allies and find your own way through."}
          </p>
          <LandingCTA product={product} locale={locale} />
        </div>
      </section>
      <section id="experience" className="arcane-invitation wrap">
        <div data-reveal>
          <span className="chapter-kicker">
            I / {vi ? "Tập hợp tổ đội" : "Gather the brigade"}
          </span>
          <h2>
            {vi
              ? "Bạn dẫn đường. Đồng minh lo phần còn lại."
              : "You lead the way. Your allies join the fight."}
          </h2>
        </div>
        <p data-reveal>
          {vi
            ? "Di chuyển tướng qua đấu trường trong khi đồng minh tự tấn công. Chiêu mộ, kết hợp vũ khí và ghé quầy hàng giữa những lượt chiến đấu."
            : "Move your champion through the arena while allies attack automatically. Recruit, combine weapons and visit the shops between combat halls."}
        </p>
      </section>
      <section className="arcane-play-section wrap">
        <ArcaneActs locale={locale} />
      </section>
      <section className="arcane-billboard" data-scene>
        <div className="wrap">
          <span className="chapter-kicker">
            II / {vi ? "Theo cách của bạn" : "Make your choices"}
          </span>
          <h2 data-reveal>
            {vi
              ? "Mỗi đồng minh, một hướng đi."
              : "Every ally, another possibility."}
          </h2>
          <div className="arcane-billboard-body">
            <img
              src="/products/arcane-brigade/icon.webp"
              width={400}
              height={400}
              alt="Arcane Brigade champion artwork"
            />
            <div data-reveal>
              <p>
                {vi
                  ? "Đội hình và vũ khí cùng tạo nên lối chơi. Những lựa chọn giữa các đấu trường trở thành một phần của cuộc hành trình."
                  : "The squad and its weapons shape the run. Choices between the halls become part of the journey."}
              </p>
              <FactRail
                items={
                  vi
                    ? [
                        "Chiêu mộ & kết hợp",
                        "Quầy hàng giữa trận",
                        "Giao diện EN / VI",
                      ]
                    : [
                        "Recruit & combine",
                        "Shops between battles",
                        "EN / VI interface",
                      ]
                }
              />
              <Link href={`/${locale}/support/arcane-brigade/`}>
                {vi ? "Tìm hiểu trò chơi" : "Explore game guidance"}
                <ArrowUpRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <ProductOutro product={product} locale={locale} />
    </main>
  );
}
