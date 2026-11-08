import type { Locale } from "@/content/studio";
import { websiteKits } from "@/content/website-kits";
import { ProductFilm } from "./product-film";
const titles: Record<string, [string, string]> = {
  "share-sheet": ["Share, save, filed", "Chia sẻ, lưu, xếp xong"],
  welcome: ["A place for every save", "Một chỗ cho tất cả"],
  file: ["One tap to file it", "Một chạm để xếp"],
  collection: ["Your collections", "Bộ sưu tập của bạn"],
  focus: ["Come back to the good stuff", "Xem lại từng điều hay"],
  search: ["Find it without accents", "Tìm lại, không cần dấu"],
  "dark-mode": ["The library after dark", "Thư viện khi tối trời"],
  layouts: ["Eight layouts · Pro", "Tám kiểu bày · Pro"],
  tick_and_thread: ["Tick and tie", "Tích việc, nối dây"],
  drag_and_turn: ["Move it like paper", "Kéo, xoay như giấy thật"],
  tidy_up: ["A little tidying", "Xếp gọn một chút"],
  apply_theme: ["Try a different wall", "Thử một chủ đề mới"],
  switch_boards: ["Every board, its own life", "Mỗi bảng, một góc riêng"],
  draw_on_wall: ["Draw beyond the paper", "Vẽ cả lên tường"],
  lights_off: ["Turn the lights down", "Tắt đèn, giữ hơi ấm"],
  "clip-01-buy-and-star-up": ["Recruit and merge", "Tuyển bạn, gộp sao"],
  "clip-02-fight-wave-14": ["Night fourteen", "Đêm thứ mười bốn"],
  "clip-03-fight-wave-18": ["Night eighteen", "Đêm thứ mười tám"],
  "clip-04-boss-night-4": ["The Coin Widow", "The Coin Widow"],
  "clip-05-boss-night-16": ["The Marquee Maw", "The Marquee Maw"],
  "clip-06-transformation": ["A hero transformed", "Khoảnh khắc biến hình"],
};
export function KitFilmShelf({
  slug,
  locale,
}: {
  slug: string;
  locale: Locale;
}) {
  const vi = locale === "vi";
  const clips = websiteKits[slug].clips.filter((c) =>
    slug === "handy-bookmark"
      ? c.id.endsWith("-" + locale)
      : !c.id.startsWith("trailer-"),
  );
  return (
    <section
      className={`kit-film-shelf portfolio-wrap shelf-${slug}`}
      id="films"
    >
      <div className="kit-section-heading">
        <span className="folio-kicker">
          {vi ? "XEM THAO TÁC THẬT" : "SEE IT IN MOTION"}
        </span>
        <h2>
          {vi
            ? "Từng chuyển động, từ sản phẩm."
            : "Every move, from the product."}
        </h2>
        <p>
          {vi
            ? "Chọn một đoạn để xem. Video tắt tiếng; bạn có thể tạm dừng bất cứ lúc nào."
            : "Choose a moment to watch. Videos are muted; pause whenever you like."}
          {slug === "sticky-wall" &&
            (vi
              ? " Các clip dùng giao diện tiếng Anh."
              : " Clips use the English interface.")}
        </p>
      </div>
      <div className="kit-film-grid">
        {clips.map((c) => {
          const key = slug === "handy-bookmark" ? c.id.slice(0, -3) : c.id;
          const name =
            titles[key]?.[vi ? 1 : 0] ||
            key.replace("clip-place-", "").replaceAll("-", " ");
          const mobile = c.src.includes("/mobile/");
          return (
            <details name={`clips-${slug}`} className="kit-clip" key={c.src}>
              <summary>
                <img
                  src={c.poster}
                  alt=""
                  loading="lazy"
                  width={640}
                  height={360}
                />
                <span>
                  <i aria-hidden="true">▷</i>
                  {name}
                  {slug === "arcane-brigade" && (
                    <small>{mobile ? "MOBILE LAYOUT" : "PC LAYOUT"}</small>
                  )}
                </span>
              </summary>
              <ProductFilm
                src={c.src}
                poster={c.poster}
                locale={locale}
                label={name + (slug === "sticky-wall" ? " · EN UI" : "")}
                className={slug === "arcane-brigade" ? "" : "portrait-film"}
              />
            </details>
          );
        })}
      </div>
    </section>
  );
}
