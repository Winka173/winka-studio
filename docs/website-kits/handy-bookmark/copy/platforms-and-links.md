# Platforms, availability and links · Nền tảng, tình trạng và đường dẫn

Status on 2026-11-08 (from `docs/HANDY_BOOKMARK_HANDOFF.md`, `HANDY_BOOKMARK_RELEASE.md`, `HANDY_BOOKMARK_PLATFORM_SUPPORT.md`). Keep the site honest: only Android is available, and only to testers.

| Platform | Status (EN) | Tình trạng (VI) | Show on the site as |
|---|---|---|---|
| Android | Google Play **closed testing** (version 1.0.0 build 5, released 7 Nov 2026). Production needs ≥ 12 testers for 14 days first. | Google Play **kiểm thử kín** (1.0.0 bản 5, 07/11/2026). Lên production cần ≥ 12 tester trong 14 ngày. | "Get it on Google Play" (button), with a small "Early access / Thử nghiệm sớm" note until production |
| iPhone / iPad | Code exists, never built or published (needs macOS/Xcode/Apple account) | Có mã, chưa build, chưa phát hành | "Coming later / Sắp có" — or leave out |
| Windows | Builds locally, not published (no Microsoft Store listing) | Build được, chưa phát hành | "Coming later / Sắp có" — or leave out |
| Web (PWA) | Builds locally, not hosted | Build được, chưa đưa lên mạng | Leave out |

## Links

- Play listing (works for testers now, public after production): `https://play.google.com/store/apps/details?id=com.apps.winka.handybookmark`
- Closed-test opt-in (standard Play pattern; the owner has the exact link in Play Console › Closed testing): `https://play.google.com/apps/testing/com.apps.winka.handybookmark`
- Privacy policy (currently published, linked from the app and Play): `https://github.com/Winka173/Handy-Suite/blob/ui-rebuild/apps/handy_bookmark/PRIVACY.md`
- Terms: `https://github.com/Winka173/Handy-Suite/blob/ui-rebuild/apps/handy_bookmark/TERMS.md`
  - If the website hosts `/privacy` and `/terms`, the owner must also update the URL in Play Console, the OAuth consent screen and `lib/settings/help_links.dart` (the app opens these links). Until then keep the GitHub address as the canonical one, or redirect.
- Contact / support: `apps.winka.studio@gmail.com` (also Settings › Send feedback). Issues: `https://github.com/Winka173/Handy-Suite/issues`.
- Use Google's official "Get it on Google Play" badge (https://play.google.com/intl/en_us/badges/) in both languages; it is not included here because Google's badge terms require downloading it from Google.

## Device notes worth stating

- Android: saving from other apps through the share menu, collections in the share menu's top row, notifications for the weekly nudge, fingerprint/face app lock, folder backups through Android's folder picker.
- The share sheet starts its own engine, so it appears about a second after you tap Handy Bookmark.
- Facebook sometimes hides Handy Bookmark under "More" in its own share menu.
