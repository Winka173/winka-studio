# Handy Bookmark — every feature (English)

Checked against the app's code on 2026-11-08 (`apps/handy_bookmark`, branch `ui-rebuild`, build 1.0.0 (5)).
Everything below exists in the Android app today unless a line says otherwise.
**Pro** marks the parts of the one-time Pro purchase; everything else is free.
Screenshot names refer to `screenshots/` (use the `-en-` files on the English site).

---

## 1. Save from any app

**Share it, it's saved.** In Facebook, TikTok, Instagram, YouTube, X, Threads, Reddit or your browser, tap Share and choose Handy Bookmark. The link is saved at that moment, before anything else happens.

- A small sheet slides up over the app you were in, with the page's picture and title. Tap a collection and it goes there ("Saved to Recipes"), name a new collection on the spot, or just close it: it waits in **Not sorted**. "Don't save" takes it back.
- Your collections also sit in the top row of Android's share menu, so one tap saves straight into one.
- The sheet lists every collection, the one you added to most recently first.
- You stay in the app you were watching.
- Screens: `mobile-en-13-share-sheet.png`, `…-13-share-sheet-saved.png`, clip `share-sheet-en`.

**Paste or add in the app.** Paste a link into the field at the top of Home and tap Save (Undo takes it back). The + button adds a picture or several links at once. On a computer, Ctrl+V saves what you copied (Windows app, not released yet).
Screens: `…-14-save-sheet.png`, `…-14-save-sheet-paste.png`, `…-15-quick-saved.png`.

**Screenshots and photos, kept like links.** Save a screenshot or photo from the + button or by sharing it from your gallery. Open it to see it whole.
Screens: `…-17-picture.png`, `…-17-picture-full.png`.

**Titles and pictures by themselves.** Each link gets its own page's title and picture: reels, videos, posts and articles. No more lists of bare addresses. To do this the app asks that page's own site, with no cookies and no sign-in; it can be switched off in Settings.
(Live checks on 2026-11-07 worked for Facebook posts and reels, Instagram, YouTube and Shorts, X and Threads, TikTok and ordinary websites. Reddit gives a title but no picture. Private or age-restricted posts can't be read.)

**A practice run on first launch.** The welcome guide lets you rehearse sharing a video on a pretend phone before you do it for real. Nothing is saved.
Screens: `mobile-en-50-welcome-1.png` … `-8-find.png`, clip `welcome-en`.

## 2. Keep it in order

**Not sorted, then sorted.** Everything new waits in Not sorted at the top of Home. One tap on the folder under a card files it.
Screens: `mobile-en-01-home.png`, clip `file-en`.

**Collections that look like yours.** Give each collection an icon and one of eight colours, start from a ready template (Recipes, Trips, To buy, Read later, Watch later, Work, Ideas, Gifts), keep smaller collections inside bigger ones, and pick its cover from its own pictures.
Screens: `…-03-collection.png`, `…-03-collection-cards.png`, `…-04-collection-trips.png`, `…-09-new-collection.png`, `…-10-cover-chooser.png`.

**Tags, notes, favourites.** Add tags and a private note right on an item's page; mark it a favourite, archive it, rename it.
Screen: `…-05-item-detail.png`.

**Rows or cards, filters, your own order.** Show a collection as rows or picture cards, filter to links or pictures, and rearrange by hand.
Screens: `…-03-collection-cards.png`, `…-11-filters.png`.

**Many at once.** Press and hold to select, then move, archive or delete them together, add or remove a tag, mark read or not read, favourite, copy the addresses, export them, save offline copies or check the links. (Pro adds "Organize with rules" and "Clean up titles" here.)
Screen: `…-12-select-move.png`.

**The Library page.** Every place in one view: all items, collections as a tree, tags, and (Pro) smart collections and saved searches.
Screens: `…-06-library.png`, `…-06-library-smart-and-saved.png`, `…-08-everything.png`.

## 3. Find it again

**Search in a moment.** Search titles, sites, tags, notes and collections. Accents are optional: "banh xeo" finds "Bánh xèo". Before typing, the search page offers your numbers and tags to tap.
Screens: `…-18-search-start.png`, `…-18-search-results.png`, clip `search-en`.

**Focus.** One thing you haven't opened yet, full screen, at a time. Swipe right when you're done, left for later. It's how saved things actually get looked at.
Screens: `…-20-focus.png`, clip `focus-en`.

**Remind me, only when you ask.** On any item, or right under "Saved" in the share sheet, pick Tonight, Tomorrow, This weekend or your own day and time. Off is the default; only that item is reminded. The notification has Mark as read and Remind in 1 hour, and the app never nudges you on its own.
Screen: `…-26-remind-me.png`.

**Widgets on the home screen.** Quick save (one tap to paste a link), your reading queue and a favourite collection, free. With Pro, Reading picks (four lines that change each day) and a Gallery of your recent pictures, plus six widget styles. Widgets never send notifications.

## 4. Read

**A clean reader.** Open an article and tap Read for clean text without the clutter. Save an offline copy for when there's no internet. Find in the text, a night tone, and it remembers where you stopped.
Screens: `…-22-reader.png`, `…-22-reader-night-tone.png`, `…-24-reader-find.png`.
(Many social-app pages and pages behind a sign-in or paywall have no readable text; the app says so and opens the original instead. Offline copies are not available in the web version.)

## 5. Share with others

- **One item:** the link goes out without tracking bits (`utm_`, `fbclid` and the like). A picture is shared without camera, place or time data.
- **A whole collection as a page:** a single page with its pictures, titles and links, optionally with your notes.
Screens: `…-34-share-collection-menu.png`, `…-34-share-collection.png`.

## 6. Tidy up

- **Duplicates:** finds the same link saved twice (even with different tracking bits) and merges them.
- **Links that stopped working:** checks every link and sorts them into gone, moved and couldn't-tell; a moved link can take its new address, with Undo. It never changes anything by itself.
- **Recently deleted:** Undo right after deleting, or bring things back from Recently deleted for 30 days.
- **Storage:** see what takes space and clear the picture cache.
Screens: `…-28-duplicates.png`, `desktop-en-29-broken-links.png`, `…-27-trash.png`, `…-32-library-tools.png`, `…-32-library-tools-storage.png`.

## 7. Keep it safe, keep it yours

- **No account, no sign-in, no ads, no tracking.** The library lives on your phone. The developer has no server and receives nothing.
- **Back up to one file** and keep it anywhere. Restore shows what the file holds before anything changes, adds only what's new, and Undo takes it back.
- **Automatic backups:** a copy each day something changed, the last seven kept, in a folder you choose; they can be locked with a password that is never stored.
- **Bring your links:** browser bookmarks (HTML), Pocket (CSV or HTML export), Raindrop, and JSON, CSV, Markdown, TXT or ZIP files. Pocket keeps read state, dates and tags.
- **App lock** with your fingerprint, face or screen lock.
Screens: `…-31-backup-and-data.png`, `…-33-pocket-import.png`, `…-30-settings*.png`.

## 8. Feels like a library, in two languages

- Warm "modern library" design: ivory paper by day, warm charcoal by night (dark mode designed on its own, not inverted).
- English and Vietnamese throughout; light, dark or follow the system.
- Built-in **How to use** guide with step-by-step topics.
- Phone, tablet and desktop layouts (on wide screens an item opens beside the list).
Screens: `screenshots/dark/`, `…-35-how-to.png`, `desktop-en-02-home-item-open.png`, `tablet-en-01-home.png`.

---

## Pro (one-time purchase, no subscription)

"Make your library yours. One payment, yours for good."

**Personalisation studio**
- 10 themes (Ink & Paper, Midnight Gallery, Forest Archive, Sakura Notes, Ocean Glass, Terracotta Studio, Monochrome, Retro Film, Lavender Haze, Solar Citrus). Try them on your own library before buying.
- 8 ways to lay out a collection: Magazine, Masonry, Film strip, Scrapbook, Lookbook, Research board, Timeline journal, Moodboard.
- 4 Focus skins: Minimal, Film, Editorial, Nocturne.
Screens: `…-41-themes*.png`, `…-42-layouts-*.png`, `…-21-focus-skins.png`, clip `layouts-en`.

**Smart organisation**
- Auto organize files new saves where they belong by their source.
- Batch tools clean titles and file many items at once, with a dry run and Undo.
- Smart collections fill themselves from rules (a site, a tag, unread, videos…); saved searches keep a search one tap away.
Screens: `…-43-auto-organize.png`, `…-07-smart-collection.png`, `…-06-library-smart-and-saved.png`.

**Reading and search**
- Highlight passages in the reader in five colours and add notes; they travel with the item in backups.
- Copy the text in a picture, read on the device (Android).
- Deep search also looks inside offline articles, highlights and pictures, and says where it found each one.
Screens: `…-23-reader-highlights.png`, `…-23-reader-highlights-list.png`, `…-19-deep-search.png`.

**Designed exports**
- Turn a collection into a PDF or web page in one of 8 designs: Collection catalog, Travel journal, Recipe book, Research bibliography, Reading list magazine, Wishlist, Moodboard, Minimal print list.
Screen: `…-44-export-studio.png`.

**Always free:** saving links and pictures, search, collections, Focus, the reader, backups, Recently deleted.
