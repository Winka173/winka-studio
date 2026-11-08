import type { Product } from "./products";
export function productTheme(product: Product): string {
  return (
    (
      {
        "handy-bookmark": "folio-bookmark",
        "sticky-wall": "folio-sticky",
        "asset-forge-studio": "folio-forge",
        "arcane-brigade": "folio-arcane",
        "autonomous-creative-studio": "folio-acs",
        aetherward: "folio-aetherward",
        forgebound: "folio-forgebound",
        runavelle: "folio-runavelle",
        "machine-brigade": "folio-machine",
      } as Record<string, string>
    )[product.slug] || "folio-handy"
  );
}
