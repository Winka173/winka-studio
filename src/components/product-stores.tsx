import type { Product } from "@/content/products";
import type { Locale } from "@/content/studio";

export function ProductStores({ product, locale }: { product: Product; locale: Locale }) {
  const stores = ["App Store", "Google Play", "Microsoft Store", ...(product.kind === "game" ? ["Steam"] : [])];
  return (
    <div className="product-store-list" role="group" aria-label={locale === "vi" ? "Cửa hàng phát hành" : "Release stores"}>
      {stores.map((store) => (
        <button key={store} type="button" disabled aria-label={`${store} — Coming soon`}>
          <span>{store}</span>
          <small>Coming soon</small>
        </button>
      ))}
    </div>
  );
}
