# Platforms, availability and links · Nền tảng, tình trạng và đường dẫn

Status on 2026-11-09 (from `docs/HANDY_BOARDS_RELEASE.md`). Keep the site honest: only Android is available, and only to testers.

| Platform | Status (EN) | Tình trạng (VI) | Show on the site as |
|---|---|---|---|
| Android | Google Play **closed testing**, version 1.0.0 build 3 rolled out 8 Nov 2026. Production needs ≥ 12 testers for 14 days first. | Google Play **kiểm thử kín**, bản 1.0.0 (3) phát hành 08/11/2026. Lên production cần ≥ 12 tester trong 14 ngày. | "Get it on Google Play" button with a small "Early access / Thử nghiệm sớm" note until production |
| iPhone / iPad | Code exists, never built or published (needs macOS/Xcode/Apple account) | Có mã, chưa build, chưa phát hành | "Coming later / Sắp có", or leave out |
| Windows | Builds locally, not published | Build được, chưa phát hành | "Coming later / Sắp có", or leave out |
| Web (PWA) | Builds locally, not hosted | Build được, chưa đưa lên mạng | Leave out |

## Links

- Play listing (works for testers now, public after production): `https://play.google.com/store/apps/details?id=com.apps.winka.handyboards`
- Closed-test opt-in (standard Play pattern; the exact link is in Play Console › Closed testing): `https://play.google.com/apps/testing/com.apps.winka.handyboards`
- Privacy policy (published, linked from the app, Play and the Google sign-in screen): `https://github.com/Winka173/Handy-Suite/blob/ui-rebuild/apps/handy_boards/PRIVACY.md`
- Terms: `https://github.com/Winka173/Handy-Suite/blob/ui-rebuild/apps/handy_boards/TERMS.md`
  - If the website hosts `/privacy` and `/terms`, the owner must also update the URL in Play Console, the Google Cloud OAuth branding of the "Handy Boards" project and `apps/handy_boards/lib/settings/help_links.dart` (the app opens these links). Until then keep the GitHub address as the canonical one, or redirect.
- Contact / support: `apps.winka.studio@gmail.com` (also Settings › Send feedback). Issues: `https://github.com/Winka173/Handy-Suite/issues`.
- Use Google's official "Get it on Google Play" badge (https://play.google.com/intl/en_us/badges/) in both languages; it is not included because Google's badge terms require downloading it from Google.
- Sibling app: Handy Bookmark (`com.apps.winka.handybookmark`), its own kit next to this folder. The apps share no data.

## Device notes worth stating

- Android: share text from any app to make a card, reminders that ring on time where exact alarms are allowed, five home-screen widgets, optional Google Drive sync between Android devices.
- Reminders need the notification permission, asked the first time you set one.
- Google Drive sync uses only the app's hidden `drive.appdata` folder; tested on two Android emulators with a real account, not yet on physical phones.
