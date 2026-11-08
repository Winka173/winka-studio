# Internal legal audit matrix

**Latest owner update:** Handy Bookmark, Sticky Wall and Arcane Brigade now render the complete dated privacy/terms supplied in their website kits, in both languages. Those documents replace the previous outline previews without rewriting their legal meaning. The remaining products still carry individually marked drafts. The matrix below records earlier audit concerns and is not a statement that the newly supplied policy text was independently legally certified. See `docs/WEBSITE_KIT_INTEGRATION.md`.

| Product | Confirmed evidence | Specific unresolved items |
| --- | --- | --- |
| Handy Bookmark | Local library/offline storage; Android INTERNET/USE_BIOMETRIC/POST_NOTIFICATIONS/RECEIVE_BOOT_COMPLETED; optional Google sign-in/Drive appdata; shared monetization/store package; recently deleted/retained article copies | Audit actual shipping ads/billing adapters and provider flags, payloads, complete retention/deletion UX, publisher/contact, full permissions across platforms, audience and final terms |
| Sticky Wall | `PRIVACY.md` dated 2026-11-06; source uses local persistence, auto-backup, microphone/photo picker/notifications/local auth; `in_app_purchase`, `http`, `google_sign_in`; Drive backend requests `drive.appdata` | Existing policy opens with absolute offline/no-collection wording then describes optional sync: reconcile before final publication; verify full payload/backup/trash retention, device backup choices, contact, age audience and final terms |
| Asset Forge Studio | Local project/asset storage, packaged local backend, external inference environments/weights and Blender | Packaged network/update/telemetry audit, external model and output rights, operator/contact, optional integration disclosures, retention/deletion and terms |
| Arcane Brigade | `PRIVACY.md` dated 2026-11-07 documents local progress, optional Drive and store Deluxe; documented email is `apps.winka.studio@gmail.com`; README distinguishes functional build vs production/device gates | Shipping-code verification of Drive/Deluxe and SDKs not completed here; reconcile blanket collection claims, device/platform acceptance, age audience, full terms and legal operator |
| Other 13 Handy apps | Suite README descriptions and owner says not complete | Per-app permissions/SDK/data/storage/billing audit; do not copy Bookmark's policy to the rest |
| Aetherward, Forgebound, Machine Brigade, Runavelle | Source descriptions and owner says in development | Final platforms/features, data practices, SDKs and policies before release |
| Autonomous Creative Studio (`mmo`) | README identifies local creative/marketing workspace and optional publishing/integrations | Provider/auth/publishing permissions, storage/token handling, content rights, policies. Do not classify it as an MMO game |

The policy-writing infrastructure exists, but this is not a complete forensic or legal audit. The UI-review stage deliberately leaves final policies unapproved. Existing repository text is evidence to verify, not automatic truth about a future binary.

Release gate: completed products cannot pass `validate --release` without reviewed policies, and products flagged `released` fail normal validation without reviewed legal content plus a verified store link. Domain, operator and global support values are also mandatory for release validation.
