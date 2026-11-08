import type { Product } from "@/content/products";
import type { Locale } from "@/content/studio";
import { productGuides } from "@/content/product-guides";

export function ProductGuide({
  product,
  locale,
}: {
  product: Product;
  locale: Locale;
}) {
  const guide = productGuides[product.slug];
  if (!guide) return null;
  const vi = locale === "vi",
    game = product.kind === "game";
  return (
    <section
      id="how-it-works"
      className="product-guide portfolio-wrap"
      aria-labelledby={`guide-${product.slug}`}
    >
      <div className="guide-intro">
        <span className="folio-kicker">
          {game
            ? vi
              ? "LEARN / CÁCH CHƠI"
              : "LEARN / HOW IT PLAYS"
            : vi
              ? "EXPLORE / CÁCH SỬ DỤNG"
              : "EXPLORE / HOW IT WORKS"}
        </span>
        <div>
          <h2 id={`guide-${product.slug}`}>
            {game
              ? vi
                ? "Bạn chơi như thế nào?"
                : "How do you play?"
              : vi
                ? "Sản phẩm giúp bạn làm gì?"
                : "What can you do with it?"}
          </h2>
          <p>{guide.purpose[locale]}</p>
        </div>
      </div>
      <ol className="guide-steps">
        {guide.steps.map((step, i) => (
          <li key={i}>
            <span aria-hidden="true">0{i + 1}</span>
            <h3>{step.title[locale]}</h3>
            <p>{step.body[locale]}</p>
          </li>
        ))}
      </ol>
      {guide.controls && (
        <div className="guide-controls">
          <span className="folio-kicker">
            {vi ? "THAO TÁC CƠ BẢN" : "THE BASIC CONTROLS"}
          </span>
          <dl>
            {guide.controls.map((item) => (
              <div key={item.input}>
                <dt>{item.action[locale]}</dt>
                <dd>
                  <kbd>{item.input}</kbd>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      )}
      {guide.note && <p className="guide-note">{guide.note[locale]}</p>}
    </section>
  );
}
