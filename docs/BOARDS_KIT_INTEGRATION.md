# Handy Boards owner-kit integration

Updated 9 November 2026 from `Handy-Website-Kit/handy-boards`, supplied by the owner. The source folder is unchanged.

Handy Boards is complete, featured and removed from the development Lab. Completion is separate from release: Android is in Google Play closed testing, version 1.0.0 (3). All three store controls remain disabled and say Coming soon under the current publication contract.

The dedicated EN/VI landing uses the supplied stone/magenta palette, Plus Jakarta Sans, app icon, desktop board capture and six feature chapters. The full media library contains 226 attributed captures and 14 localized clips (113 captures and seven clips per language), with Pro, dark-mode and next-update distinctions. These are renders of real Flutter UI with demonstration data, not native device recordings. Desktop captures do not imply a public Windows release.

The kit's UI source is newer than the current Play build. The new timeline, multiple-category selection and suggested template fields are labelled as next-update previews on the landing, media library, support page and relevant assets. The owner confirmation that the app is complete does not confirm those changes have reached Play.

Full features, free/Pro comparison, 23 FAQ answers per language, press facts, changelog and source legal documents are available through existing product routes. Privacy and terms preserve the supplied text verbatim. Source Markdown/JSON and import hashes are archived under `docs/website-kits/handy-boards/` and `import-manifest.json`.

Re-import only this kit with:

```powershell
python scripts/import-website-kits.py --only handy-boards
npm run validate:boards
npm run typecheck
npm run lint -- --ignore-pattern 'out-locked-audit*/**'
npm run build
npm run validate
npm run validate:public
# With npm start running in a separate terminal:
npm run qa:public
npm run qa:kits
```

The targeted importer preserves other kits. Their generated JSON entries were compared against HEAD and remained identical during this integration. `validate:boards` checks completion/release boundaries, exact legal text, media counts, localized chapters, FAQ and preview/Pro metadata. Browser checks cover 120 public responsive cases, 16 rendered legal documents, localized film decoding/play/pause and complete FAQ/media availability. A focused local check additionally exercised both Boards palettes at 390/1440px in EN/VI, all 113 images per language, next-update badges and gallery dialog/Escape behavior; no runtime or tested WCAG axe violations were reported. Evidence is under `.review/public-products-qa/` and `.review/website-kit-qa/`.

Use [the app handoff guide](../GOOGLE_PLAY_POLICY_TERMS_GUIDE.md) to update `apps/handy_boards/lib/settings/help_links.dart`, Play Console and OAuth branding after checking the deployed production policy/terms URLs. This integration changes the website only.
