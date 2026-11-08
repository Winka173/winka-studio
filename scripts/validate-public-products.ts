import assert from "node:assert/strict";
import { products, featuredProducts, getProduct } from "../src/content/products";

const expected = ["handy-bookmark", "sticky-wall", "handy-boards", ...products.filter((p) => p.kind === "game").map((p) => p.slug)].sort();
const visible = products.filter((product) => product.status !== "hidden");
assert.deepEqual(visible.map((product) => product.slug).sort(), expected);
for (const product of products) {
  assert.equal(Boolean(getProduct(product.slug)), expected.includes(product.slug));
  if (expected.includes(product.slug)) assert.equal(product.status, "coming-soon");
}
assert(featuredProducts.every((product) => product.status !== "hidden"));
console.log("PASS: only Bookmark, Sticky Wall, Boards and every game are public; all are coming soon; hidden products cannot resolve.");
