# Handy Boards — every feature (English)

Checked against the app's code on 2026-11-09 (`apps/handy_boards`, branch `ui-rebuild`, after commit `ac4858ff`; Play has 1.0.0 (3), see "Newer than the store" at the end).
Everything below exists in the Android app today unless a line says otherwise.
**Pro** marks the parts of the one-time Pro purchase; everything else is free.
Screenshot names refer to `screenshots/` (use the `-en-` files on the English site).

---

## 1. Boards, columns, cards

**One board for one piece of life.** A semester, a trip, the house, a launch, a sprint. Each board has columns that say where work is (To do, Doing, Done, or your own names) and cards, one per piece of work.
Screens: `mobile-en-01-home.png`, `…-02-board.png`, `…-02-board-trip.png`, `…-02-board-home.png`, desktop and tablet versions.

- On a phone each column nearly fills the screen; swipe to the next. On a tablet or computer the columns sit side by side.
- Drag a card to another column or another place. Rather not drag? **Move to…** lists the columns with "Top" and "End" (`…-11-move-to.png`). Everything can be undone.
- Rename, add, reorder and delete columns; mark which one means finished.
- Show compact cards, or show subtasks right on the cards.
- Home lists your boards with their covers, how many cards are open and what is due today (`…-01-home.png`).

**A card holds the whole job.** Title, column, category, due date, the day you plan to do it, a reminder, repeat, a cover, subtasks, notes and fields (`…-05-card.png`).
- Subtasks: break a card into steps, tick them off, reorder them; the card shows 2/5.
- Notes: links, details, whatever you need to remember.
- Card history: what changed and when.

**Covers.** Every board and card can wear a cover drawn for it: study, work, home, travel, events, shopping, wellness, goals, creative and abstract families, or a photo of your own. 30 covers free, all 60 with Pro (`…-06-cover-picker.png`).

## 2. Categories that follow the card

Maths, Literature, Kitchen, Design… Each category has its colour and stays with the card in every column.
- The strip above the board shows each category's done/total with a bar.
- **Tap categories to see only their cards.** Pick one, or several at once; tap again to drop one. The others are only hidden, never changed (`…-03-categories-two.png`, clip `categories-en`).
- Add, rename, recolour, reorder and remove categories in one sheet (`…-11-categories-edit.png`).

## 3. Plan by day, week or month (the timeline)

New in this version. Any board can be laid out over time, and the setting is one chip on the board: **Time** (`…-04-timeline-sheet.png`).

- Choose **By day**, **By week** or **By month**. Each card sits in the period of the day you plan to do it (or the day it was made). Work still open from before comes to the current period, with Undo.
- **‹ and ›** move between periods. Add a card in next week and it is planned for next week (`…-04-week-next.png`).
- **A period gone by is read-only**: no new cards, no dragging. Cards still open there carry a red "Not finished" strip and a **Bring to this week** button; "Bring them all" sits at the top (`…-04-week-past.png`). Opening a past card shows it to read, with "Mark as done" and "Bring to this week" (`…-04-past-card.png`). Clip `timeline-en`.
- A board can move to a longer period (day → week → month), never back to a shorter one, so nothing lands in the wrong place.
- Turning the timeline off changes no card: the board becomes a plain Kanban again, with an option to archive cards already done. Turned on again, every card is back in its period.
- Templates that live by time start with it on; six (Semester Planner, Exam Revision, Language Learning, Product Launch, 90-Day Goals, Social Campaign) ask "Lay it out by: By week / By month / Not by time" when you make the board.
- **Due date vs planned day.** The due date is the deadline; the planned day is when you mean to do it. Moving work never changes a due date.
- **Key dates**: a semester end, a launch, a moving day: up to 8 per board, shown under the title with "65 days left" (`…-14-key-dates.png`).

## 4. Reminders and notifications

- A reminder on any card, at the time you choose. Asked for permission only the first time.
- Notifications you switch on in Settings › Notifications (`…-31-notifications.png`): today's work, due soon (same day, a day or three days before), left behind, and quiet hours. "Hide card names" keeps titles off the lock screen. They ring on time where Android allows exact alarms.
- **Board digest** (Pro): one morning note, daily or once a week, one line per board with work; empty boards skipped.
- **Monday review** (Pro): a Monday-morning note of what was left behind last week.

## 5. Templates: a board ready in a minute

30 templates in five groups (Study, Work, Personal & home, Creative, Plans & occasions), 14 free and 16 Pro, plus a blank three-column board (`…-08-templates.png`, `…-08-templates-study.png`, `…-10-blank.png`). The gallery has a search box ("moving", "trip").

Free: **Semester Planner, Group Assignment, Exam Revision, Personal Course, Project Kanban, Weekly Work Plan, Idea Pipeline, Personal Tasks, Shopping Planner, Content Planner, Inspiration Board, Trip Preparation, Monthly Planner, Daily Focus**.
Pro: **Thesis / Capstone, Language Learning, Development Sprint, Product Launch, Meeting Actions, Home Improvement, Event Planning, 90-Day Goals, Home Organization, Photography Workflow, Writing Project, Game Development, Social Campaign, Workshop Preparation, Moving Home, Holiday Planner**.

- **See the whole board before using it**: columns, categories, covers and example cards (`…-09-template-preview.png`). Pro templates can be previewed for free.
- **Smart Setup** asks a few questions (the board's name, your subjects, the semester's end, how to lay it out) and shows the board it will make before making it (`…-09-template-setup.png`, `…-09-template-plan.png`). Clip `template-en`.
- **Fields that come with the template.** About 20 templates suggest fields for their cards, ticked and ready: a trip gets Cost, Booking link, Booked and Address; shopping gets Price and Where to buy; a sprint gets Points and Owner (`…-09-template-trip-fields.png`). Untick any you don't want. **Template fields are free to fill.**
- A template only shapes a new board; changing your board never changes the template.
- Save any board as your own template (board menu).

## 6. Fields on cards

Every card has a **Fields** section, with "Add a field" or "Edit fields" right on it (`…-05-card-fields.png`).
- Types: text, number, date, yes/no, one choice, link. A field can also show on the card's front.
- Fields that came with a template are free to fill. **Making your own fields is Pro** (`…-24-fields.png`); values you saved stay readable without Pro.

## 7. Find anything

- **Search every board** from Home: card titles and notes (`…-12-search.png`).
- Search inside one board from its toolbar.
- Filters on a board: by category, "Due in 3 days", and **saved filters** (Pro) such as "Maths, due soon" (`…-22-saved-filters.png`).

## 8. Get things back

- **Trash** keeps deleted cards until you empty it; restore any of them (`…-13-trash.png`).
- **Archive** finished cards and whole boards; they come back from Settings › Data.
- **Undo** after every move, delete and change.
- **Back up** to one file you keep, **restore** from it (with a preview), and **back up automatically**: the last seven copies on the device.
- **Delete all data** when you want a clean start.

## 9. Bring work in, send it out

- **Share text to Handy Boards** from any app and it becomes a card.
- Import: a **Trello** export (reviewed before anything is added), a **CSV** with your own column mapping, a plain **task list**, a board **template** file, or a backup.
- Export: the board as a **picture or PDF** (plain style free), **CSV**, **Markdown**, an **ICS** calendar of the dates, or a full backup (`…-28-export-plain.png`).

## 10. On the home screen

Five widgets (Settings › Home-screen widgets, `…-32-widgets.png`):
- Free: **Today**, **Board progress**, **Left behind & coming up**.
- Pro: **My Work** and **Week**.
- 3 widget styles free, all 9 with Pro. "Show card names" can be turned off so a widget shows only counts.

## 11. Make it yours

- Light, dark or follow the system; English or Vietnamese.
- **Board looks**: 5 free grounds, 15 with Pro (paper, sage, blueprint, blush…), each made for light and dark (`…-25-looks.png`).
- A short **welcome** that lets you practise on a pretend board (add, drag, focus a category, tick a subtask) before you start; nothing is saved (`…-50-welcome-1.png` … `-7.png`, clip `welcome-en`).
- **How to use**: a built-in guide, topic by topic, with small moving examples (`…-33-how-to*.png`).

## 12. Sync between your Android devices (optional)

Off unless you switch it on in Settings › Data › Sync. Your boards are kept in a hidden folder of **your own** Google Drive (`drive.appdata`): the app can't see your other files and the developer receives nothing. Other Android devices on the same Google account get the same boards. Turning it off deletes nothing.
(Shipped in 1.0.0 (3). Tested on two Android emulators with a real Google account on 2026-11-08; not yet on phones. Android only.)

---

## Handy Boards Pro (one payment)

"Pay once. Keep it." No subscription, no ads, no account. Screens: `…-29-pro.png`, clip `pro-en`.

**Plan**
- **My Work across boards**: today, left behind and coming up from every board in one list; a tap opens the card where it lives (`…-20-my-work.png`).
- **Smart carry-over**: when a new day or week starts, review what was left behind or let it move to today by itself. Only the planned day changes, never a due date. Moving by hand is free.
- **Repeating cards**: rent, reports, a Monday scrum come back on their rhythm: every few days, chosen weekdays, or a day of the month (`…-05-card-repeat.png`). On a timeline board the next one lands in the next period. Taking a repeat off is free.
- **Board digest** and **Monday review** notifications.

**Automate**
- **Automation rules** written as sentences: "when the last subtask is ticked, move the card to Done"; "when a card reaches Review, add its checklist"; archive finished cards after a while. Each rule logs what it did; Undo works (`…-21-rules.png`, `…-21-rules-editor.png`).
- **Card templates**: a card you make again and again, made fresh in one tap (`…-23-card-templates.png`).
- **Saved filters** and **custom fields** (above).

**Look**
- 16 more board templates, every cover (60), every board look (15), every widget style (9).

**Share and look back**
- **Designed exports**: poster and printable styles, and a **report** (open and done, eight weeks of finished cards, progress by category) (`…-28-export-poster.png`, `-print`, `-report`).
- **Board insights**: done, late and finished this week, per category (`…-26-insights.png`).
- **Board history**: what happened, day by day (`…-27-history.png`).

**Always free:** boards, cards, categories, subtasks, drag and drop, due dates, reminders, the timeline, search, backup and plain export. If Pro ever goes away nothing you made is deleted; Pro looks fall back to the defaults and return with Pro.

---

## Newer than the store

The timeline (§3), choosing several categories (§2), template fields and the Fields section on every card (§5–6) were finished on 2026-11-09 and are **not in Play build 1.0.0 (3)** yet. The next upload carries them. Until then, either hold those sections back or mark them "coming in the next update".
