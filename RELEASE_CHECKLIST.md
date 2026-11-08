# Release checklist — not approved

This checklist covers public website deployment, separately from committing and pushing the repository. The three owner-kit products use their complete supplied privacy/terms; other products retain individually marked drafts. Product store readiness and website release approval remain separate checks.

- [ ] Owner reviews the current bespoke product worlds and studio homepage. The original A/B/C/D prototypes are archived; remove their review routes/links before public delivery if no longer needed.
- [ ] Confirm the actual studio domain and publisher/operator legal identity.
- [ ] Confirm studio and per-product support contacts; Arcane's repository email alone does not verify other products' channels.
- [ ] Reconcile owner completion statements with remaining source checkpoint gates. Confirm exact shipping versions and supported platforms.
- [ ] Open and verify actual store/download URLs. Never infer them from package names.
- [ ] Owner approves current screenshots, game art, logo/wordmark and rights. Review fixture content in screenshots.
- [ ] Audit shipping SDKs and settings: auth, ads, analytics/crash reports, purchases, HTTP requests, permissions and providers.
- [ ] Verify optional Drive payload/scope, local/cloud backup retention, Trash behavior and disconnect/deletion flows in actual builds.
- [ ] If product account creation exists, verify actual account-deletion mechanism and applicable current store requirements. A static page does not perform a deletion.
- [ ] Approve privacy, terms, deletion text in EN and VI, effective dates, operator/contact information, audience/age decisions and appropriate purchase/jurisdiction terms. No final license, refund or governing-law terms have been invented.
- [ ] Replace review outlines and set legal flags only after signoff. `npm run validate -- --release` must pass.
- [ ] Add website/hosting privacy information for the actual deployed provider and any subsequently enabled integration. Do not claim hosting logs do not exist.
- [ ] Confirm canonical/hreflang/Open Graph absolute URLs and a nonempty sitemap with the real origin.
- [ ] Remove preview noindex from metadata/headers/robots only after approval. Retain noindex on any remaining design review pages.
- [ ] Run typecheck, lint, build, registry/link validation and real-browser checks after final changes.
- [ ] Verify mobile/tablet/desktop, keyboard, visible focus, theme, reduced motion and Vietnamese wrapping on the chosen direction.
- [ ] Deploy `out/` to Cloudflare Pages, configure custom domain/HTTPS, and verify public legal pages worldwide without login. Confirm the Windows postbuild segment copies are included.

No automatic deployment or publication is part of the current review stage.
