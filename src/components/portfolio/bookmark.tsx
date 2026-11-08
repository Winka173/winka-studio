import type { Product } from "@/content/products";
import type { Locale } from "@/content/studio";
import { mediaFor } from "@/content/portfolio-media";
import { bookmarkScreen, kitClip, websiteKits } from "@/content/website-kits";
import { PortfolioProduct, ProductAction, Screen } from "./shared";
import { RevealWords } from "../worlds/motion";
import { ProductFilm } from "./product-film";
import { MediaGallery } from "./gallery";
import { ProductGuide } from "./product-guide";
import { KitDetails } from "./kit-details";
import { KitFilmShelf } from "./kit-film-shelf";

export function BookmarkPortfolio({
  product,
  locale,
}: {
  product: Product;
  locale: Locale;
}) {
  const vi = locale === "vi",
    kit = websiteKits[product.slug];
  const highlight = (name: string) =>
    kit.assets[`highlights/${name}-${locale}.png`];
  const share = kitClip(product.slug, "share-sheet-" + locale);
  const features = [
    {
      title: vi ? "Chia sẻ là lưu." : "Share it. It’s saved.",
      body: vi
        ? "Bấm Chia sẻ trong app đang xem, chọn Handy Bookmark. Link được lưu ngay, kèm hình và tiêu đề. Chạm một bộ sưu tập để xếp, rồi tiếp tục việc đang làm."
        : "Tap Share in the app you’re using, then Handy Bookmark. The link is saved immediately, with its picture and title. Tap a collection to file it, then carry on.",
      image: "01b-share-sheet-saved",
      clip: "share-sheet",
    },
    {
      title: vi ? "Có hình. Có chỗ riêng." : "Pictures, not bare addresses.",
      body: vi
        ? "Reel, video, bài đăng, bài báo, ảnh chụp màn hình và ảnh ở cùng một nơi. Thư viện trông giống những thứ bạn đã lưu, không phải một danh sách địa chỉ."
        : "Reels, videos, posts, articles, screenshots and photos live together. Your library looks like the things you saved, rather than a list of addresses.",
      image: "02-home",
    },
    {
      title: vi ? "Bộ sưu tập, theo cách bạn." : "Collections with character.",
      body: vi
        ? "Biểu tượng, màu, ảnh bìa và bộ sưu tập lồng nhau. Mục mới chờ ở Chưa xếp; một chạm là về đúng chỗ."
        : "Icons, colors, picture covers and nested collections. New saves wait in Not sorted; one tap gives them a home.",
      image: "03-collection",
      clip: "file",
    },
    {
      title: vi ? "Vài chữ. Tìm ra rồi." : "A few letters. There it is.",
      body: vi
        ? "Tìm theo tiêu đề, tên trang, thẻ và ghi chú. Không cần gõ dấu: “banh xeo” vẫn tìm thấy “Bánh xèo”."
        : "Search titles, sites, tags and notes. Accents are optional: “banh xeo” still finds “Bánh xèo”.",
      image: "04-search",
      clip: "search",
    },
    {
      title: vi ? "Lưu rồi. Xem lại thật." : "Saved. And actually revisited.",
      body: vi
        ? "Tập trung đưa ra từng mục chưa mở: vuốt phải khi xong, trái để sau. Trình đọc có bản offline đã lưu. Nhắc mỗi tuần chỉ hiện số mục đang chờ, không hiện tiêu đề."
        : "Focus brings back one unopened item at a time: right when done, left for later. Read saved offline copies. The optional weekly nudge shows a count, never titles.",
      image: "05-focus",
      clip: "focus",
    },
    {
      title: vi ? "Của bạn. Trên máy bạn." : "Yours. On your device.",
      body: vi
        ? "Không tài khoản, không quảng cáo, không theo dõi. Sao lưu ra tệp, tự sao lưu vào thư mục đã chọn, mật khẩu tùy chọn và khóa app. Nhập từ Pocket, Raindrop hay dấu trang trình duyệt."
        : "No account, ads or tracking. File backups, automatic folder backups, an optional password and app lock. Bring saves from Pocket, Raindrop or your browser.",
      image: "08-backup",
    },
  ];
  return (
    <PortfolioProduct product={product} locale={locale} theme="bookmark">
      <section className="bookmark-kit-hero portfolio-wrap" data-scene>
        <div className="reading-brand">
          <img src={kit.assets.icon} width={40} height={40} alt="" />
          <span>Handy Bookmark</span>
          <span>THE WARM MODERN LIBRARY</span>
        </div>
        <div className="bookmark-kit-title">
          <span className="folio-kicker">
            ANDROID / {vi ? "THƯ VIỆN CỦA RIÊNG BẠN" : "YOUR PERSONAL LIBRARY"}
          </span>
          <h1>
            <RevealWords>
              {vi ? "Lưu từ mọi app." : "Save it from any app."}
            </RevealWords>
            <em>
              <RevealWords>
                {vi ? "Tìm lại dễ dàng." : "Find it again."}
              </RevealWords>
            </em>
          </h1>
          <p>
            {vi
              ? "Chia sẻ một reel, video, bài đăng hay trang web sang Handy Bookmark là lưu ngay, kèm hình. Một chạm để xếp, vài chữ để tìm lại."
              : "Share a reel, video, post or web page to Handy Bookmark and it’s saved, picture included. One tap to file it, a few letters to find it."}
          </p>
          <ProductAction product={product} locale={locale} />
        </div>
        <div className="bookmark-kit-stage">
          <Screen
            src={bookmarkScreen("02-home-item-open", locale, "desktop")}
            alt={
              vi
                ? "Thư viện và trang nội dung trong bố cục màn hình lớn"
                : "Library with an item open in the wide-screen layout"
            }
            className="bookmark-kit-desktop"
            eager
          />
          <div className="bookmark-kit-share">
            <ProductFilm
              {...share}
              locale={locale}
              label={
                vi
                  ? "Chia sẻ → Lưu → Xếp"
                  : "Share → Save → File"
              }
              className="portrait-film"
            />
          </div>
        </div>
      </section>
      <section
        className="bookmark-kit-story portfolio-wrap"
        id="experience"
        data-scene
      >
        <span className="folio-kicker">
          {vi ? "LƯU RỒI. RỒI QUÊN MẤT." : "SAVED IT. THEN FORGOT IT."}
        </span>
        <h2>
          {vi ? "Một chỗ cho tất cả." : "One place for all of it."}
          <em>{vi ? "Một lý do để quay lại." : "A reason to come back."}</em>
        </h2>
        <p>
          {vi
            ? "Link không chỉ để cất đi. Chúng là món muốn nấu, nơi muốn đến, điều muốn học — và những thứ bạn thật sự muốn xem lại."
            : "Links are recipes to try, places to go, things to learn — and things you actually want to return to."}
        </p>
      </section>
      <div className="bookmark-feature-chapters">
        {features.map((f, i) => {
          const clip = f.clip
            ? kitClip(product.slug, f.clip + "-" + locale)
            : null;
          return (
            <section
              className={`bookmark-feature portfolio-wrap chapter-${i + 1}`}
              key={f.image}
              data-scene
            >
              <div className="bookmark-feature-copy">
                <span className="folio-kicker">0{i + 1} / HANDY BOOKMARK</span>
                <h2>{f.title}</h2>
                <p>{f.body}</p>
              </div>
              <div className="bookmark-feature-media">
                {clip ? (
                  <ProductFilm
                    {...clip}
                    locale={locale}
                    label={f.title}
                    className="portrait-film"
                  />
                ) : (
                  <img
                    src={highlight(f.image)}
                    alt={f.title}
                    width={1108}
                    height={2156}
                    loading="lazy"
                  />
                )}
                {i === 4 && (
                  <img
                    className="bookmark-reader-companion"
                    src={highlight("06-reader")}
                    alt={vi ? "Trình đọc bài viết" : "Article reader"}
                    width={1108}
                    height={2156}
                    loading="lazy"
                  />
                )}
              </div>
            </section>
          );
        })}
      </div>
      <section className="bookmark-pro-exhibit portfolio-wrap" data-scene>
        <div>
          <span className="kit-pro-label">HANDY BOOKMARK PRO</span>
          <h2>
            {vi ? "Biến thư viện" : "Make the library"}
            <em>{vi ? "thành của bạn." : "your own."}</em>
          </h2>
          <p>
            {vi
              ? "10 giao diện. 8 kiểu bày bộ sưu tập. 4 kiểu Tập trung. Đánh dấu kèm ghi chú, bộ sưu tập thông minh, tìm sâu và bản xuất có thiết kế."
              : "10 themes. 8 collection layouts. 4 Focus skins. Highlights with notes, smart collections, deep search and designed exports."}
          </p>
        </div>
        <img
          src={highlight("09-pro-layouts")}
          alt={
            vi
              ? "Các kiểu bố cục thuộc Pro"
              : "Collection layouts included in Pro"
          }
          width={1108}
          height={2156}
          loading="lazy"
        />
        <img
          src={highlight("10-pro-highlights")}
          alt={
            vi
              ? "Đánh dấu và ghi chú thuộc Pro"
              : "Reader highlights and notes included in Pro"
          }
          width={1108}
          height={2156}
          loading="lazy"
        />
      </section>
      <ProductGuide product={product} locale={locale} />
      <KitFilmShelf slug={product.slug} locale={locale} />
      <MediaGallery
        items={mediaFor(product.slug, locale)}
        locale={locale}
        name={product.name}
        creditsHref={`/${locale}/apps/handy-bookmark/credits/`}
      />
      <KitDetails product={product} locale={locale} />
    </PortfolioProduct>
  );
}
