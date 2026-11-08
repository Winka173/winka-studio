import type { Product } from "@/content/products";
import type { Locale } from "@/content/studio";
import { mediaFor, mediaImage } from "@/content/portfolio-media";
import { kitClip, websiteKits } from "@/content/website-kits";
import { PortfolioProduct, ProductAction, Screen } from "./shared";
import { ProductFilm } from "./product-film";
import { MediaGallery } from "./gallery";
import { ProductGuide } from "./product-guide";
import { KitDetails } from "./kit-details";
import { KitFilmShelf } from "./kit-film-shelf";
import { ArcaneActs } from "../worlds/interactions";
import { KitTrailer } from "./kit-trailer";

export function ArcanePortfolio({
  product,
  locale,
}: {
  product: Product;
  locale: Locale;
}) {
  const vi = locale === "vi",
    kit = websiteKits[product.slug];
  const shot = (id: string) => mediaImage(product.slug, id, locale)!;
  const trailer = kitClip(product.slug, "trailer-40s-muted-loop-720p");
  const ambient = kitClip(product.slug, "clip-03-fight-wave-18", "pc");
  const heroes = Object.entries(kit.assets).filter(([key]) =>
    key.startsWith("07_Art/heroes/"),
  );
  const places = [
    ["waiting-room", "Phòng Chờ", "Waiting Room"],
    ["post-office", "Bưu điện", "Post Office"],
    ["glasshouse", "Nhà kính", "Glasshouse"],
    ["lamp-hall", "Sảnh Đèn", "Lamp Hall"],
    ["theatre", "Nhà hát bị lãng quên", "Forgotten Theatre"],
    ["archive-vault", "Kho lưu trữ", "Archive Vault"],
  ];
  return (
    <PortfolioProduct product={product} locale={locale} theme="arcane">
      <section className="arcane-cinema-intro arcane-kit-intro" data-scene>
        <div className="arcane-cinema-film">
          <ProductFilm
            {...ambient}
            poster={shot("fight-03-late-night-a")}
            locale={locale}
            label={
              vi
                ? "Gameplay thực tế · Build Windows · Tắt tiếng"
                : "Actual gameplay · Windows build · Muted"
            }
          />
        </div>
        <div className="arcane-cinema-scrim" />
        <div className="arcane-cinema-title portfolio-wrap">
          <span className="folio-kicker">
            WINKA STUDIO / A STORYBOOK AUTO-BATTLER
          </span>
          <h1>
            <span className="sr-only">Arcane Brigade</span>
            <img
              src={kit.assets["01_Brand/logo.png"]}
              width={1200}
              height={420}
              alt=""
            />
          </h1>
          <p>
            {vi
              ? "Dẫn một đội bạn nhỏ kỳ lạ qua hai mươi đêm như bước ra từ truyện tranh. Bạn di chuyển. Anh hùng và đồng đội tự chiến đấu."
              : "Lead a brigade of odd little friends through twenty storybook nights. You move. Your hero and companions fight automatically."}
          </p>
          <ProductAction product={product} locale={locale} />
          <a className="folio-text-link" href="#trailer">
            {vi ? "Xem trailer có âm thanh" : "Watch the trailer with sound"} ↗
          </a>
        </div>
        <div className="arcane-cinema-bottom portfolio-wrap">
          <span>20 NIGHTS / 36 HEROES / ONE STRANGE DREAM</span>
          <span>
            {vi ? "Ảnh và video từ trò chơi" : "Images & footage from the game"}
          </span>
        </div>
        <div className="cinema-embers" aria-hidden="true">
          {Array.from({ length: 14 }, (_, i) => (
            <i key={i} style={{ "--i": i } as React.CSSProperties} />
          ))}
        </div>
      </section>
      <section
        id="experience"
        className="arcane-opening-night portfolio-wrap"
        data-scene
      >
        <div className="arcane-chapter-number" aria-hidden="true">
          I.
        </div>
        <div>
          <span className="folio-kicker">
            {vi
              ? "GIẤC MƠ KÉO DÀI QUÁ LÂU"
              : "A DREAM THAT HAS LASTED TOO LONG"}
          </span>
          <h2>
            {vi ? "Bạn bước trước." : "You lead."}
            <em>{vi ? "Cả đội cùng đi." : "The brigade follows."}</em>
          </h2>
          <p>
            {vi
              ? "Mỗi đêm là một trận tìm vị trí đứng và đường chạy. Giữa các đêm, cửa tiệm trải thảm: tuyển bạn, mua di vật, gộp bản sao thành sao và thắp sáng liên kết. Cứ bốn đêm, một boss chờ bạn."
              : "Every night is a fight about where you stand and when you run. Between nights, the shop rolls out its rug: recruit friends, buy relics, merge stars and kindle bonds. Every fourth night, a boss awaits."}
          </p>
        </div>
      </section>
      <div className="arcane-kit-stats portfolio-wrap">
        {[
          ["Heroes", vi ? "anh hùng" : "heroes"],
          ["Friends", vi ? "bạn đồng hành" : "recruitable friends"],
          ["Weapons", vi ? "vũ khí" : "weapons"],
          ["Relics", vi ? "di vật" : "relics"],
          ["Duets", vi ? "song tấu" : "duets"],
        ].map(([key, label]) => (
          <div key={key}>
            <strong>{kit.facts![key]}</strong>
            <span>{label}</span>
          </div>
        ))}
        <div>
          <strong>23</strong>
          <span>{vi ? "combo chung" : "joint combos"}</span>
        </div>
      </div>
      <div className="arcane-actual-acts portfolio-wrap">
        <ArcaneActs locale={locale} />
      </div>
      <section className="arcane-kit-friends portfolio-wrap" data-scene>
        <span className="folio-kicker">
          {vi ? "KHÔNG AI GIỐNG AI" : "NO TWO QUITE ALIKE"}
        </span>
        <h2>
          {vi ? "36 anh hùng." : "36 heroes."}
          <em>{vi ? "36 cách bước vào đêm." : "36 ways into the night."}</em>
        </h2>
        <p>
          {vi
            ? "Mỗi anh hùng có kỹ năng đặc trưng, ba cách dùng và một lần biến hình. Hiệp Sĩ Đèn Lồng, Trưởng Bưu Cục, Tiên Tri Ngái Ngủ — mỗi người mang một nhịp chơi riêng."
            : "Every hero has a signature skill, three approaches and a transformation. Lantern Knight, Postmaster, Drowsy Seer — each brings a different rhythm to the night."}
        </p>
        <div className="arcane-hero-procession">
          {heroes.slice(0, 8).map(([key, src], i) => (
            <figure key={key} style={{ "--hero-i": i } as React.CSSProperties}>
              <img
                src={src}
                width={450}
                height={450}
                alt={key
                  .split("/")
                  .pop()!
                  .replace(".png", "")
                  .replaceAll("-", " ")}
                loading="lazy"
              />
            </figure>
          ))}
        </div>
        <details className="arcane-hero-catalogue">
          <summary>
            {vi ? "Gặp đủ 36 anh hùng" : "Meet all 36 heroes"} <span>+</span>
          </summary>
          <div>
            {heroes.map(([key, src]) => (
              <figure key={key}>
                <img src={src} width={250} height={250} alt="" loading="lazy" />
                <figcaption>
                  {key
                    .split("/")
                    .pop()!
                    .replace(".png", "")
                    .replaceAll("-", " ")}
                </figcaption>
              </figure>
            ))}
          </div>
        </details>
      </section>
      <section className="arcane-boss-chapter" data-scene>
        <div className="portfolio-wrap">
          <div>
            <span className="folio-kicker">II / EVERY FOURTH NIGHT</span>
            <h2>
              {vi ? "Nhìn vạch đỏ." : "Watch the red line."}
              <em>{vi ? "Đừng đứng lại quá lâu." : "Don’t stay too long."}</em>
            </h2>
            <p>
              {vi
                ? "The Coin Widow, The Chair Porter, The Door That Stayed Shut, The Marquee Maw và The Last Customer chặn đường qua hai mươi đêm. Đọc cảnh báo dưới chân và dẫn cả đội qua cơn hỗn loạn."
                : "The Coin Widow, The Chair Porter, The Door That Stayed Shut, The Marquee Maw and The Last Customer stand between you and dawn. Read the warnings on the floor and lead the brigade through."}
            </p>
          </div>
          <Screen
            src={shot("boss-night-16-b")}
            alt={
              vi
                ? "Trận boss The Marquee Maw ở đêm 16"
                : "The Marquee Maw boss on night 16"
            }
          />
        </div>
      </section>
      <section className="arcane-dream-places portfolio-wrap">
        <div className="kit-section-heading">
          <span className="folio-kicker">
            {vi ? "SÁU NƠI CHỐN TRONG GIẤC MƠ" : "SIX PLACES IN THE DREAM"}
          </span>
          <h2>
            {vi ? "Mỗi nơi, một điều kỳ lạ." : "A different kind of strange."}
          </h2>
        </div>
        <div>
          {places.map(([id, v, e]) => (
            <figure key={id}>
              <img
                src={shot("place-" + id)}
                alt={vi ? v : e}
                width={1920}
                height={1080}
                loading="lazy"
              />
              <figcaption>
                <span>{vi ? v : e}</span>
                <i aria-hidden="true">✦</i>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
      <section className="arcane-hub-story portfolio-wrap" data-scene>
        <Screen
          src={shot("hub-00-waiting-room")}
          alt={
            vi
              ? "Phòng Chờ giữa những lượt chơi"
              : "The Waiting Room between runs"
          }
        />
        <div>
          <span className="folio-kicker">
            {vi ? "TRỞ VỀ PHÒNG CHỜ" : "BACK TO THE WAITING ROOM"}
          </span>
          <h2>
            {vi ? "Rồi lại thắp một ngọn đèn." : "And light another lamp."}
          </h2>
          <p>
            {vi
              ? "Dầu Đèn và Kỷ vật thắp Cây Đèn cho lượt sau. Đọc thư, lấp Bảo tàng, ký Hiệp Ước Đêm, thử Giấc mơ hàng ngày và rung Chuông của Người Canh Giữ. Kỷ lục giữ lại đội hình và biểu đồ sát thương của từng lượt."
              : "Spend Lamp Oil and Keepsakes at the Lamp Tree. Read milestone letters, fill the Museum, sign the Night Pact, try the Daily Dream and ring the Keeper’s Bell. Records keep each run’s brigade and damage chart."}
          </p>
        </div>
      </section>
      <ProductGuide product={product} locale={locale} />
      <section className="arcane-full-trailer portfolio-wrap" id="trailer">
        <h2>
          {vi
            ? "Hai mươi đêm, trong bốn mươi giây."
            : "Twenty nights in forty seconds."}
        </h2>
        <KitTrailer
          poster={trailer.poster}
          src="/products/arcane-brigade/kit/03_Clips/trailer-with-sound.mp4"
          locale={locale}
        />
      </section>
      <KitFilmShelf slug={product.slug} locale={locale} />
      <MediaGallery
        items={mediaFor(product.slug, locale)}
        locale={locale}
        name={product.name}
      />
      <KitDetails product={product} locale={locale} />
    </PortfolioProduct>
  );
}
