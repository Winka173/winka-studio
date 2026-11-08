# Public catalog

Owner selection, 9 November 2026:

Handy Boards is now owner-confirmed complete and uses its supplied website kit. It is featured with the other completed apps and no longer appears in the development Lab. Android closed testing and next-update captures remain distinguished from a public release. See [the integration record](BOARDS_KIT_INTEGRATION.md).

- Apps: Handy Bookmark, Sticky Wall and Handy Boards.
- Games: every registered game remains visible (Arcane Brigade, Aetherward, Forgebound, Machine Brigade and Runavelle).
- Every visible product is marked `coming-soon`; completion remains separate from release status.
- App Store, Google Play and Microsoft Store are shown for every visible product. Games also show Steam. Every store control says **Coming soon**, is disabled and has no placeholder URL.

Visibility is assigned in the product registry. Hidden apps are excluded from the catalog, support/legal directories, Lab, featured products, static routes and sitemap. `getProduct` does not resolve them. The homepage and Studio stories use Handy Boards in place of Forge. Original source and media are retained; the old reel and archived design directions are no longer exposed because they feature hidden apps. `/review/` now uses the current homepage.

Checks:

```powershell
npm run validate:public
npm run build
npm run validate
npm run qa:public
```

`validate:public` checks the registry and hidden lookups. `qa:public` checks all exported HTML for hidden product links/routes, verifies all eight product landings in EN/VI, checks the exact store labels and disabled state, checks the app/game catalog contents, and exercises 320/390/768/1440px with axe and runtime/resource error collection. It also checks that a hidden product URL returns 404 and coming-soon landings do not retain the old Arcane release claim. Local screenshots and results are saved under `.review/public-products-qa/`.

Historical QA scripts that visit every original app or the archived design directions describe the earlier full-catalog scope. They are retained; use `qa:public` for the current publication contract.
