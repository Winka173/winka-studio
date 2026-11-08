import Link from "next/link";
import type { Locale } from "@/content/studio";
import { featuredProducts, productPath, getProduct } from "@/content/products";
import { Action, ArrowDown, ArrowLink, ArrowUpRight, Status } from "../shared";

export function UIProHome({ locale }: { locale: Locale }) {
  const vi = locale === "vi";
  const arcane = getProduct("arcane-brigade")!;
  return (
    <main id="main" className="home-uipro">
      <section className="cinema-hero wrap">
        <div className="cinema-topline">
          <span>
            Winka Studio / {vi ? "Ứng dụng & trò chơi" : "Apps & games"}
          </span>
          <span>
            {vi ? "Góc nhìn độc lập" : "An independent point of view"}
          </span>
        </div>
        <h1>
          {vi ? (
            <>
              Làm theo
              <br />
              <span>cách của Winka.</span>
            </>
          ) : (
            <>
              Independent
              <br />
              <span>by design.</span>
            </>
          )}
        </h1>
        <div className="cinema-hero-bottom">
          <p>
            {vi
              ? "Ứng dụng cho ngày thường. Game cho trí tò mò. Một tập hợp những điều chúng tôi đang làm."
              : "Apps for the everyday. Games for the curious. A collection of things we are making."}
          </p>
          <Action href="#work">
            {vi ? "Xem sản phẩm" : "Discover the work"}
          </Action>
          <span className="cinema-scroll">
            <ArrowDown size={20} />
            {vi ? "Cuộn để khám phá" : "Scroll to explore"}
          </span>
        </div>
        <div className="cinema-filmstrip">
          <Link href={productPath(arcane, locale)} className="filmstrip-main">
            <img
              src="/products/arcane-brigade/combat.webp"
              alt={vi ? "Gameplay Arcane Brigade" : "Arcane Brigade gameplay"}
              width={960}
              height={540}
              fetchPriority="high"
            />
            <div>
              <span>Arcane Brigade</span>
              <ArrowUpRight size={25} />
            </div>
          </Link>
          <Link
            className="filmstrip-side"
            href={`/${locale}/apps/asset-forge-studio/`}
          >
            <img
              src="/products/asset-forge-studio/workspace.webp"
              alt="Asset Forge Studio"
              width={1800}
              height={1225}
            />
            <div>
              <span>Asset Forge Studio</span>
              <ArrowUpRight size={25} />
            </div>
          </Link>
        </div>
      </section>
      <section id="work" className="cinema-work wrap">
        <div className="cinema-section-title">
          <span>01—04</span>
          <h2>{vi ? "Tuyển chọn từ studio" : "The studio collection"}</h2>
        </div>
        {featuredProducts.map((p, i) => (
          <Link
            className={`cinema-work-row cinema-row-${i}`}
            href={productPath(p, locale)}
            key={p.slug}
          >
            <span className="cinema-row-number">0{i + 1}</span>
            <div className="cinema-row-copy">
              <span>{p.category[locale]}</span>
              <h3>{p.name}</h3>
              <Status product={p} locale={locale} />
            </div>
            <div className="cinema-row-preview">
              <img
                src={
                  p.slug === "sticky-wall"
                    ? "/products/sticky-wall/cover.webp"
                    : p.image!
                }
                alt={`${p.name} ${vi ? "giao diện" : "interface"}`}
                width={720}
                height={450}
                loading="lazy"
              />
            </div>
            <ArrowUpRight className="cinema-row-arrow" size={30} />
          </Link>
        ))}
      </section>
      <section className="cinema-games">
        <div className="wrap">
          <div className="cinema-games-copy">
            <h2>
              {vi ? "Thế giới đang thành hình." : "Worlds in the making."}
            </h2>
            <p>
              {vi
                ? "Thủ thành pha lê. Rèn vũ khí. Chỉ huy tổ đội. Những hướng đi khác nhau, chung một studio."
                : "Crystal defense. Weapon engineering. Squad tactics. Different ideas, one studio."}
            </p>
            <ArrowLink href={`/${locale}/games/`}>
              {vi ? "Ghé xưởng game" : "Visit the game workshop"}
            </ArrowLink>
          </div>
          <div className="cinema-game-grid">
            <Link href={`/${locale}/games/forgebound/`}>
              <img
                src="/products/forgebound/forge.webp"
                alt="Forgebound Forge Board"
                width={1800}
                height={1013}
                loading="lazy"
              />
              <span>
                Forgebound
                <ArrowUpRight size={20} />
              </span>
            </Link>
            <div className="game-name-poster">
              <span>{vi ? "Đang phát triển" : "In development"}</span>
              <Link href={`/${locale}/games/aetherward/`}>Aetherward ↗</Link>
              <Link href={`/${locale}/games/runavelle/`}>Runavelle ↗</Link>
              <Link href={`/${locale}/games/machine-brigade/`}>
                Machine Brigade ↗
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="cinema-close wrap">
        <span>{vi ? "Đằng sau sản phẩm" : "Behind the work"}</span>
        <h2>{vi ? "Tò mò dẫn lối." : "Curiosity leads."}</h2>
        <ArrowLink href={`/${locale}/about/`}>
          {vi ? "Về studio" : "Meet the studio"}
        </ArrowLink>
      </section>
    </main>
  );
}
