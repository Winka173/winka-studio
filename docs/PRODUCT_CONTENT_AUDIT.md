# Product content source audit

Audited 8 November 2026 against all nine owner-supplied local repositories. Read the product documentation, then checked relevant implementation paths for the advertised workflows and game controls. This is an editorial/capability audit, not certification of every source function or target platform.

The public EN/VI guide registry is `src/content/product-guides.ts`. All 22 products now explain their purpose and a three-stage usage/gameplay loop; verified PC controls are included where applicable. Each guide records internal source references. A local path audit resolved all 58 cited files/directories successfully. Source paths stay editorial metadata, outside the visitor-facing product flow.

## Nine repository findings

| Repository | Accurate product explanation | Primary docs and implementation checked |
| --- | --- | --- |
| Handy-Suite | Fourteen separate apps. Bookmark is the owner-confirmed completed app; the remaining thirteen are in development. Bookmark keeps links and pictures, collections/subcollections/tags, an unread Focus queue, explicitly saved offline article copies, backups and optional Drive sync. | README; `docs/FUNCTIONS.md`; `docs/HANDY_BOOKMARK_FEATURE_MATRIX.md`; Bookmark `lib/controller.dart`; app entrypoints/controllers and feature-specific implementation searches. |
| Sticky-Wall | Movable pinboards for notes, checklists, photos, drawings and recordings; resize/rotate/thread, wall/grid/list, image/PDF output and backups. | README; `lib/models/note.dart`; `lib/screens/home_screen_actions.dart`. The current note enum has eight types; older documentation's seven-type count was not copied. |
| Asset-Forge-Studio | Windows local-AI/Blender 3D workbench: project → prompt/reference → generation/Production → inspect versions and technical QA → delivery/refinement. | README; `docs/PRODUCTION_WORKSPACE.md`; `apps/web/src/batch-studio.tsx`. Technical completion and artistic approval are distinct. External models/tools require separate setup. |
| mmo | Autonomous Creative Studio, a local creative/marketing video workspace. Repository facts and a working web/Android demo feed scripts, captures, local media generation, an editable production and review. | README; `docs/LOCAL_REPO_ADS.md`; `packages/automation/src/repo-ad-types.ts`. The directory name does not make it an MMO game. Arbitrary native desktop window capture is not advertised. |
| Aetherward | Crystal-defense auto-battler. Choose heroes, stance and formation between waves; heroes choose targets and use abilities automatically. Recruit, upgrade and choose relics; protect the crystal. | README; `Docs/GDD.md`; `Simulation/Run/RunController.cs`; `Unity/Battle/BattleController.cs` and `.Ui.cs`. Current stance/formation presets take precedence over older drag-grid design descriptions. Space starts a wave, F changes speed, Esc pauses. |
| Forgebound | Weapon-engineering roguelike: assemble Frame/Core/Modifier/Rune, arrange weapons/relays/supports and valid links on the Forge Board, then observe automatic side-view combat and refine the build. Blueprints live in the Collection Workshop. | README; `docs/COMBAT_RULES.md`; `Presentation/Screens/ForgeScreen.cs`; `Core/Run/RunController.cs`. No direct-action combat controls are invented. |
| Runavelle | Kingdom/castle-defense roguelite. Spend Gold and Mana to build by day; directly control one general at night. Soldiers, allied generals and towers fight automatically. | README; `Docs/CONTROLS.md`; `Game/InputAdapter.cs`; `Core/Session/GameSession.cs`. PC: WASD/arrows, Space/Q ultimate, Shift/E dash, Enter/N begin night. No unsupported troop-order mechanic is promised. |
| MachineBrigade | Real-time vehicle tactics versus AI. Prepare loadout, spend Command Points to deploy vehicles/support, direct automatic attacks and pursue the selected mode's objectives. | README; current `Docs/GAME_PLAN.md`; `Game/Match/ModeSessions.cs`; `Game/Hud/BattleHud.Tactics.cs`. Older RTS planning is not treated as the current implementation. No unverified mode counts or frame-rate guarantees. |
| Arcane-Brigade | Move a champion and evade danger while weapons and recruited companions attack automatically. Walk to physical shop stalls between halls to buy, recruit or reroll, then reshape the build through halls/bosses. | README's current play instructions; `Runtime/Input/MovementInput.cs`; `Runtime/Core/ArenaController.cs`; `Docs/World_Shop_Implementation.md`. WASD/arrows move, Space/E/onscreen USE interact, Esc pauses. No manual attack or active-skill input is invented. |

Paths in the guide registry include each repository's full source prefix. Most Unity table paths above are abbreviated for readability.

## Remaining Handy apps

Read all fourteen feature sections in `docs/FUNCTIONS.md`, with app source entrypoint/controller spot checks. The developing apps receive individual explanations rather than a repeated generic productivity pitch.

| App | What its page now explains | Boundaries retained |
| --- | --- | --- |
| Boards | Category-based tasks with status/tags, Kanban, Today and calendar views of the same work. | No invented team-cloud system. |
| Habit | Scheduled habits, check-ins and personal multi-step routines. | No medical outcome claims. |
| Spend | Manual accounts/entries, spending, budgets and review. | No bank connection or live financial feed promised. |
| Keep | Belongings, photos, locations, receipts, collections and lending. | Photo measurement has moved to Tools. |
| Recall | Create/import flashcards, review due cards, rate recall for spaced repetition. | Note parsing is not advertised as an AI tutor. |
| Tools | Calculations, unit conversion, text, passwords and QR utilities. | Removed exchange-rate functionality is not advertised; subtitles belong here rather than Media. |
| Docs | Markdown, scanning/PDF workspaces and reading. | No blanket cross-platform OCR guarantee. |
| Media | Image capture/edit/annotation and step-by-step visual guides. | No generic full video-editor or subtitle-suite promise. |
| Dev | Structured-data inspection/conversion/validation and HTTPS requests. | JWT decoding is not signature verification. |
| Trip | Offline itineraries, places, explicitly confirmed visits, journals/albums/passport memories. | No inferred visit/location tracking claim. |
| Forms | Local form design, immutable schema versions, offline responses and reports. | No hosted public form backend promised. |
| Card | Editable card/profile/invitation and print/social layouts. | This is not a payment-card application. |
| Widget | Theme library, layered photo/clock/calendar/text design studio, editable projects/export. | No blanket native widget installation claim for every OS. |

## Conflicts, evidence and release status

Implementation and current explicit feature documentation take precedence over old plans. Where evidence conflicts, copy stays within their supported intersection: no stale version numbers, fixed content counts, hardware guarantees, unsupported platform availability or rig/motion delivery claims. Old 2D descriptions were not copied over actual newer 3D build captures.

Owner-confirmed completion remains separate from public distribution. Bookmark, Sticky Wall, Asset Forge and Arcane are marked complete with no invented download links. Other products remain in development. Screenshots/films show actual product UI and can include demonstration data; they are not presented as customer activity. No source product code was changed for this audit.

Legal documents remain non-effective review previews. This content audit does not convert them into approved policies or infer universal privacy promises from a feature list.
