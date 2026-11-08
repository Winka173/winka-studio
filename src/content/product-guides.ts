import { text as t, type Translation } from "./studio";

type Step = { title: Translation; body: Translation };
type Control = { action: Translation; input: string };
export type ProductGuide = {
  purpose: Translation;
  steps: Step[];
  controls?: Control[];
  note?: Translation;
  sources: string[];
};
const step = (
  en: string,
  vi: string,
  bodyEn: string,
  bodyVi: string,
): Step => ({ title: t(en, vi), body: t(bodyEn, bodyVi) });
const control = (en: string, vi: string, input: string): Control => ({
  action: t(en, vi),
  input,
});

/** Public copy is grounded in the named docs AND implementation paths. Sources stay editorial metadata. */
export const productGuides: Record<string, ProductGuide> = {
  "handy-bookmark": {
    purpose: t(
      "A personal library for links and pictures you want to keep: collect them, organize them, and return to saved reading.",
      "Thư viện cá nhân cho link và ảnh muốn giữ: lưu vào, sắp xếp và quay lại phần nội dung đã dành để đọc.",
    ),
    steps: [
      step(
        "Save the link",
        "Lưu đường link",
        "Share from the app you are using, then choose Handy Bookmark. The link is saved before you pick a collection; paste links or add pictures with + inside the app.",
        "Bấm Chia sẻ trong app đang xem rồi chọn Handy Bookmark. Link được lưu trước khi chọn bộ sưu tập; trong app có thể dán link hoặc thêm ảnh bằng nút +.",
      ),
      step(
        "Give it a place",
        "Xếp vào nơi dễ tìm",
        "Use collections, nested collections and tags. Search and filter the library when you need something again.",
        "Dùng bộ sưu tập, bộ sưu tập con và thẻ. Tìm và lọc thư viện khi cần quay lại nội dung.",
      ),
      step(
        "Return to the reading",
        "Trở lại việc đọc",
        "Open the original page, use the unread queue in Focus, or read an offline copy that you have saved.",
        "Mở trang gốc, xem hàng đợi chưa đọc trong Focus hoặc đọc bản ngoại tuyến đã lưu.",
      ),
    ],
    note: t(
      "Offline reading uses a previously saved article copy; social and sign-in pages may not be readable. The current store build does not include Drive sync: use backups to move the library.",
      "Đọc ngoại tuyến dùng bản bài viết đã lưu; trang mạng xã hội hoặc cần đăng nhập có thể không có bản đọc. Bản store hiện chưa có đồng bộ Drive: dùng sao lưu để chuyển thư viện.",
    ),
    sources: [
      "Handy-Website-Kit/handy-bookmark/copy/en/features.md",
      "Handy-Website-Kit/handy-bookmark/copy/vi/faq.md",
      "Handy-Website-Kit/handy-bookmark/copy/platforms-and-links.md",
    ],
  },
  "sticky-wall": {
    purpose: t(
      "A movable pinboard for written notes, checklists, photographs, drawings and voice notes, organized across your own boards.",
      "Bảng ghim có thể sắp xếp cho ghi chú, danh sách, ảnh, nét vẽ và ghi âm, chia theo những bảng riêng của bạn.",
    ),
    steps: [
      step(
        "Start with a board",
        "Bắt đầu từ một bảng",
        "Choose a blank board, an editable template or a photo memory wall, then pick its paper and background.",
        "Chọn bảng trống, mẫu có thể sửa hoặc bảng ảnh kỷ niệm, rồi chọn giấy và nền.",
      ),
      step(
        "Pin and connect",
        "Ghim và kết nối",
        "Add notes, photos or recordings; move, resize and rotate them, and link related ideas with threads.",
        "Thêm ghi chú, ảnh hoặc ghi âm; kéo, đổi kích thước, xoay và nối những ý liên quan bằng dây.",
      ),
      step(
        "Change the view or take it along",
        "Đổi góc nhìn hoặc mang theo",
        "Switch between wall, grid and list. Export a board as an image or PDF, or keep a backup of your boards.",
        "Chuyển giữa tường, lưới và danh sách. Xuất bảng thành ảnh hoặc PDF, hoặc sao lưu các bảng của bạn.",
      ),
    ],
    sources: [
      "Sticky-Wall/README.md",
      "Sticky-Wall/lib/models/note.dart",
      "Sticky-Wall/lib/screens/home_screen_actions.dart",
    ],
  },
  "asset-forge-studio": {
    purpose: t(
      "A Windows workbench for creating and managing 3D assets with configured local AI engines and Blender. It keeps generation, technical inspection, versions and delivery together.",
      "Workspace Windows để tạo và quản lý tài sản 3D bằng các engine AI cục bộ và Blender đã cấu hình. Tạo model, kiểm tra kỹ thuật, phiên bản và file đầu ra nằm trong cùng quy trình.",
    ),
    steps: [
      step(
        "Give the project a direction",
        "Đặt hướng cho dự án",
        "Create a project, describe the asset or bring a reference image, then choose the configured generation route.",
        "Tạo dự án, mô tả tài sản hoặc đưa ảnh tham chiếu vào, rồi chọn luồng tạo đã cấu hình.",
      ),
      step(
        "Follow the asset through Production",
        "Theo dõi trong Production",
        "Inspect queue stages, logs and available model versions. Technical completion and artistic approval are tracked separately.",
        "Xem các giai đoạn, log và phiên bản model. Hoàn tất kỹ thuật và duyệt mỹ thuật được theo dõi riêng.",
      ),
      step(
        "Inspect, refine and export",
        "Kiểm tra, tinh chỉnh và xuất",
        "Compare the available asset versions, keep the chosen result in the library, and export the delivery files supported by that route.",
        "So sánh các phiên bản, giữ kết quả chọn trong thư viện và xuất các file đầu ra mà luồng đó hỗ trợ.",
      ),
    ],
    note: t(
      "AI environments, model weights and Blender are set up separately. Output rights depend on the engines, components and assets you use.",
      "Môi trường AI, model weights và Blender được thiết lập riêng. Quyền dùng đầu ra phụ thuộc engine, thành phần và tài sản bạn sử dụng.",
    ),
    sources: [
      "Asset-Forge-Studio/README.md",
      "Asset-Forge-Studio/docs/PRODUCTION_WORKSPACE.md",
      "Asset-Forge-Studio/apps/web/src/batch-studio.tsx",
    ],
  },
  "autonomous-creative-studio": {
    purpose: t(
      "A local-AI creative and marketing workspace for turning a repository and a working app demo into a reviewable video production.",
      "Workspace sáng tạo và marketing dùng AI cục bộ, đưa repo và bản demo ứng dụng đang chạy vào một quy trình sản xuất video có thể xem và duyệt.",
    ),
    steps: [
      step(
        "Bring a repository and a demo",
        "Đưa repo và demo vào",
        "Register the local repository, product facts and allowed scope. Connect a localhost web demo or a prepared Android device.",
        "Thêm repo cục bộ, thông tin sản phẩm và phạm vi cho phép. Kết nối demo web localhost hoặc thiết bị Android đã chuẩn bị.",
      ),
      step(
        "Build the production",
        "Tạo bản dựng",
        "The configured pipeline plans a script, captures the real interface, and assembles local speech, music and captions into an editable timeline.",
        "Pipeline đã cấu hình lên kịch bản, quay giao diện thật và ghép giọng đọc, nhạc, phụ đề thành timeline có thể sửa.",
      ),
      step(
        "Review before delivery",
        "Duyệt trước khi chuyển giao",
        "Inspect and edit the result in Production, Editor and Library. Publishing remains subject to the configured account, rights and approval policy.",
        "Xem và sửa kết quả trong Production, Editor và Library. Việc đăng vẫn đi qua cấu hình tài khoản, quyền sử dụng và chính sách duyệt.",
      ),
    ],
    note: t(
      "The project is in development. Models and tools are configured locally; the documented repo capture adapters cover localhost web and Android, not arbitrary native desktop windows.",
      "Dự án đang phát triển. Model và công cụ được cấu hình cục bộ; adapter quay từ repo hiện có cho web localhost và Android, chưa bao phủ mọi cửa sổ desktop native.",
    ),
    sources: [
      "mmo/README.md",
      "mmo/docs/LOCAL_REPO_ADS.md",
      "mmo/packages/automation/src/repo-ad-types.ts",
    ],
  },
  "arcane-brigade": {
    purpose: t(
      "A squad-action roguelite: move one champion, dodge through the arena and assemble a build while weapons and companions fight automatically.",
      "Roguelite hành động theo tổ đội: điều khiển một tướng, né đòn trong đấu trường và ghép lối chơi trong khi vũ khí cùng đồng minh tự chiến đấu.",
    ),
    steps: [
      step(
        "Move the champion",
        "Điều khiển tướng",
        "Use movement to avoid danger and collect what the fight leaves behind. Weapons and recruited companions handle their own attacks.",
        "Di chuyển để tránh nguy hiểm và nhặt phần thưởng trên sân. Vũ khí và đồng minh đã chiêu mộ tự thực hiện đòn đánh.",
      ),
      step(
        "Walk up to the stalls",
        "Ghé tận quầy hàng",
        "Between halls, approach a stall and use its interaction to buy, recruit or reroll. The next hall also has an interaction in the courtyard.",
        "Giữa các đấu trường, đi đến quầy và tương tác để mua, chiêu mộ hoặc đổi lượt hàng. Lối sang đấu trường tiếp theo cũng được tương tác tại sân.",
      ),
      step(
        "Reshape the run",
        "Thay đổi lối chơi qua từng trận",
        "Combine weapons, companions and item effects as you progress through halls and bosses. Your decisions between fights shape the brigade.",
        "Kết hợp vũ khí, đồng minh và hiệu ứng vật phẩm khi đi qua các đấu trường, boss. Những lựa chọn giữa trận định hình tổ đội.",
      ),
    ],
    controls: [
      control("Move on PC", "Di chuyển trên PC", "WASD / ↑ ↓ ← →"),
      control("Interact with a stall", "Tương tác với quầy", "Space / E / USE"),
      control("Pause", "Tạm dừng", "Esc"),
    ],
    sources: [
      "Arcane-Brigade/README.md#chơi-bản-mới",
      "Arcane-Brigade/Assets/ArcaneBrigade/Runtime/Input/MovementInput.cs",
      "Arcane-Brigade/Assets/ArcaneBrigade/Runtime/Core/ArenaController.cs",
      "Arcane-Brigade/Docs/World_Shop_Implementation.md",
    ],
  },
  aetherward: {
    purpose: t(
      "A crystal-defense auto-battler where preparation is the strategy: choose heroes, formations and elemental combinations, then let the team defend the crystal.",
      "Auto-battler bảo vệ pha lê, với chiến thuật nằm ở khâu chuẩn bị: chọn anh hùng, đội hình và phối hợp nguyên tố, rồi để cả đội tự bảo vệ pha lê.",
    ),
    steps: [
      step(
        "Read the next wave",
        "Xem trước đợt đánh",
        "Review incoming enemies and choose the party stance and formation before starting the wave.",
        "Xem kẻ địch sắp tới, chọn thế trận và đội hình trước khi bắt đầu đợt.",
      ),
      step(
        "Let the formation fight",
        "Để đội hình tự chiến đấu",
        "Heroes select targets and use their abilities automatically. Watch the crystal, lanes and elemental reactions as the fight unfolds.",
        "Anh hùng tự chọn mục tiêu và dùng kỹ năng. Theo dõi pha lê, các hướng địch tiến vào và phản ứng nguyên tố trong trận.",
      ),
      step(
        "Build between waves",
        "Xây đội giữa các đợt",
        "Use rewards to recruit, choose upgrades and relics, or prepare the team for the next wave. The run ends if the crystal falls.",
        "Dùng phần thưởng để chiêu mộ, chọn nâng cấp, di vật hoặc chuẩn bị cho đợt sau. Pha lê bị phá hủy sẽ kết thúc lượt chơi.",
      ),
    ],
    controls: [
      control("Start a prepared wave", "Bắt đầu đợt đã chuẩn bị", "Space"),
      control("Switch battle speed", "Đổi tốc độ trận đấu", "F · 1× / 2×"),
      control("Pause", "Tạm dừng", "Esc"),
    ],
    sources: [
      "Aetherward/README.md",
      "Aetherward/Docs/GDD.md",
      "Aetherward/Assets/_Aetherward/Scripts/Simulation/Run/RunController.cs",
      "Aetherward/Assets/_Aetherward/Scripts/Unity/Battle/BattleController.Ui.cs",
    ],
  },
  forgebound: {
    purpose: t(
      "A weapon-engineering roguelike. Assemble weapons, arrange their connections on a Forge Board and test the resulting build in side-view automatic battles.",
      "Roguelike chế tạo vũ khí. Lắp các thành phần, bố trí liên kết trên Forge Board rồi thử lối lắp trong những trận tự động góc nhìn ngang.",
    ),
    steps: [
      step(
        "Assemble the weapon",
        "Lắp vũ khí",
        "Choose a Frame and Core, then fit compatible Modifiers and Runes to change how the weapon works.",
        "Chọn Frame và Core, rồi lắp Modifier cùng Rune phù hợp để thay đổi cách vũ khí hoạt động.",
      ),
      step(
        "Make the board work together",
        "Kết nối trên Forge Board",
        "Place and rotate weapons, relays and supports. Their valid board connections affect what happens in combat.",
        "Đặt và xoay vũ khí, relay, bộ hỗ trợ. Liên kết hợp lệ trên bảng ảnh hưởng đến cách chúng hoạt động trong trận.",
      ),
      step(
        "Observe, adjust, try again",
        "Xem trận, chỉnh lại, thử tiếp",
        "Battles run automatically. Use encounter results and new components to refine the build; keep blueprints in the Collection Workshop.",
        "Trận đấu diễn ra tự động. Dùng kết quả và thành phần mới để chỉnh lối lắp; lưu blueprint trong Collection Workshop.",
      ),
    ],
    sources: [
      "Forgebound/README.md",
      "Forgebound/docs/COMBAT_RULES.md",
      "Forgebound/Assets/Forgebound/Presentation/Screens/ForgeScreen.cs",
      "Forgebound/Assets/Forgebound/Core/Run/RunController.cs",
    ],
  },
  runavelle: {
    purpose: t(
      "A kingdom-building and castle-defense roguelite. Prepare the kingdom by day, then directly control one general at night while allies and towers fight automatically.",
      "Roguelite xây vương quốc và phòng thủ lâu đài. Chuẩn bị ban ngày, rồi trực tiếp điều khiển một tướng ban đêm trong khi đồng minh và tháp tự chiến đấu.",
    ),
    steps: [
      step(
        "Build by day",
        "Xây dựng ban ngày",
        "Spend Gold and Mana on the kingdom, place buildings and walls, and review the coming night before you begin.",
        "Dùng Vàng và Mana cho vương quốc, bố trí công trình, tường và xem đêm sắp tới trước khi bắt đầu.",
      ),
      step(
        "Fight with one general",
        "Chiến đấu bằng một tướng",
        "Move the controlled general, dash and use the ultimate. Soldiers, allied generals and towers act on their own.",
        "Di chuyển tướng đang điều khiển, lướt và dùng tối thượng. Lính, tướng đồng minh và tháp tự chiến đấu.",
      ),
      step(
        "Keep the castle standing",
        "Giữ lâu đài đứng vững",
        "Survive the night, review what happened and choose how to develop the kingdom for the next defense.",
        "Sống sót qua đêm, xem kết quả rồi chọn cách phát triển vương quốc cho lần phòng thủ tiếp theo.",
      ),
    ],
    controls: [
      control(
        "Move the general on PC",
        "Di chuyển tướng trên PC",
        "WASD / ↑ ↓ ← →",
      ),
      control("Ultimate", "Tối thượng", "Space / Q"),
      control("Dash", "Lướt", "Shift / E"),
      control("Begin the night", "Bắt đầu đêm", "Enter / N"),
    ],
    sources: [
      "Runavelle/README.md",
      "Runavelle/Docs/CONTROLS.md",
      "Runavelle/Assets/Runavelle/Scripts/Game/InputAdapter.cs",
      "Runavelle/Assets/Runavelle/Scripts/Core/Session/GameSession.cs",
    ],
  },
  "machine-brigade": {
    purpose: t(
      "Real-time vehicle tactics against AI. Choose a loadout, deploy military vehicles with Command Points and direct the battle around its objectives.",
      "Chiến thuật phương tiện thời gian thực đối đầu AI. Chọn bộ thẻ, dùng điểm chỉ huy để triển khai xe quân sự và điều phối trận đánh quanh các mục tiêu.",
    ),
    steps: [
      step(
        "Prepare the loadout",
        "Chuẩn bị bộ thẻ",
        "Choose the mode and available vehicle/support cards before deploying into a match.",
        "Chọn chế độ và các thẻ phương tiện, hỗ trợ có sẵn trước khi triển khai vào trận.",
      ),
      step(
        "Deploy and direct",
        "Triển khai và điều phối",
        "Use Command Points to bring in vehicles and support. Units attack automatically; use battlefield objectives and the command controls to direct them.",
        "Dùng điểm chỉ huy để gọi phương tiện và hỗ trợ. Đơn vị tự tấn công; dùng các mục tiêu trên bản đồ cùng thao tác chỉ huy để điều phối.",
      ),
      step(
        "Play the objective",
        "Hoàn thành mục tiêu chế độ",
        "Push for control points or the selected mode’s objective. The HUD shows the current battle state and available deployment cards.",
        "Tranh chấp cứ điểm hoặc mục tiêu của chế độ đã chọn. HUD cho biết diễn biến trận và các thẻ có thể triển khai.",
      ),
    ],
    sources: [
      "MachineBrigade/README.md",
      "MachineBrigade/Docs/GAME_PLAN.md",
      "MachineBrigade/Assets/MachineBrigade/Scripts/Game/Match/ModeSessions.cs",
      "MachineBrigade/Assets/MachineBrigade/Scripts/Game/Hud/BattleHud.Tactics.cs",
    ],
  },
};

const handy: Record<string, [string, string, Step[]]> = {
  boards: [
    "An offline workspace for category-based tasks, Kanban, a daily view and a calendar.",
    "Workspace ngoại tuyến cho công việc theo danh mục, Kanban, việc hôm nay và lịch.",
    [
      step(
        "Make a board",
        "Tạo bảng",
        "Choose categories and statuses for the work you want to organize.",
        "Chọn danh mục và trạng thái phù hợp với công việc.",
      ),
      step(
        "Capture the task",
        "Ghi lại công việc",
        "Add tasks with notes, priorities, dates, checklists and attachments.",
        "Thêm việc cùng ghi chú, ưu tiên, hạn, checklist và tệp đính kèm.",
      ),
      step(
        "Work through your views",
        "Theo dõi qua các góc nhìn",
        "Use the category board, Kanban, Today or calendar to revisit the same tasks.",
        "Xem cùng các công việc qua bảng danh mục, Kanban, Hôm nay hoặc lịch.",
      ),
    ],
  ],
  habit: [
    "Track repeating habits and run personal routines made of several steps.",
    "Theo dõi thói quen lặp lại và thực hiện quy trình cá nhân nhiều bước.",
    [
      step(
        "Set the rhythm",
        "Đặt nhịp thói quen",
        "Choose a habit, its goal and scheduled days.",
        "Chọn thói quen, mục tiêu và những ngày cần làm.",
      ),
      step(
        "Check in or run a routine",
        "Ghi nhận hoặc chạy quy trình",
        "Record progress for a due habit or follow the steps of a saved routine.",
        "Ghi tiến độ cho thói quen đến hạn hoặc làm các bước của quy trình đã lưu.",
      ),
      step(
        "Look back",
        "Nhìn lại",
        "Review history, streaks and weekly trends based on your recorded check-ins.",
        "Xem lịch sử, chuỗi và xu hướng tuần từ những lần bạn đã ghi nhận.",
      ),
    ],
  ],
  spend: [
    "A personal finance ledger for accounts, transactions, budgets and plans based on the data you enter.",
    "Sổ tài chính cá nhân cho tài khoản, giao dịch, ngân sách và kế hoạch từ dữ liệu bạn cung cấp.",
    [
      step(
        "Set up the accounts",
        "Thiết lập tài khoản",
        "Add your accounts and starting balances.",
        "Thêm các tài khoản và số dư ban đầu.",
      ),
      step(
        "Record the money",
        "Ghi thu chi",
        "Enter income, expenses and transfers; attach receipts or organize entries into categories.",
        "Ghi thu, chi, chuyển khoản; đính kèm hóa đơn hoặc phân loại giao dịch.",
      ),
      step(
        "Review the plan",
        "Xem lại kế hoạch",
        "Review budgets, balances and forecasts calculated from the recorded ledger.",
        "Xem ngân sách, số dư và dự báo được tính từ sổ đã ghi.",
      ),
    ],
  ],
  keep: [
    "An inventory for everyday belongings, collections, receipts, storage locations and loans.",
    "Sổ quản lý đồ dùng, bộ sưu tập, hóa đơn, chỗ cất và đồ cho mượn.",
    [
      step(
        "Save the item",
        "Lưu món đồ",
        "Create a record with photos, purchase information and its location.",
        "Tạo hồ sơ cùng ảnh, thông tin mua và chỗ để.",
      ),
      step(
        "Keep its story together",
        "Giữ thông tin cùng nhau",
        "Attach receipts, organize collections and record who borrowed an item.",
        "Gắn hóa đơn, xếp bộ sưu tập và ghi người đang mượn món đồ.",
      ),
      step(
        "Find it again",
        "Tìm lại khi cần",
        "Search your inventory and review items or dates that need attention.",
        "Tìm trong kho đồ và xem các món hoặc mốc thời gian cần chú ý.",
      ),
    ],
  ],
  recall: [
    "Flashcards with spaced repetition for reviewing what you have learned.",
    "Thẻ ghi nhớ với lịch ôn ngắt quãng để xem lại điều đã học.",
    [
      step(
        "Make the deck",
        "Tạo bộ thẻ",
        "Create question/answer cards or import prepared study material.",
        "Tạo thẻ hỏi đáp hoặc nhập tài liệu học đã chuẩn bị.",
      ),
      step(
        "Try the answer",
        "Thử nhớ đáp án",
        "Review due cards and reveal the answer after trying to recall it.",
        "Ôn những thẻ đến hạn và mở đáp án sau khi thử nhớ.",
      ),
      step(
        "Grade the recall",
        "Chấm mức độ nhớ",
        "Choose Forgot, Hard, Good or Easy so the scheduler can place the next review.",
        "Chọn Quên, Khó, Nhớ hoặc Dễ để bộ lập lịch xếp lần ôn tiếp theo.",
      ),
    ],
  ],
  tools: [
    "An everyday workbench for calculations, unit conversions, text utilities, passwords and QR tools.",
    "Bàn tiện ích hằng ngày cho tính toán, đổi đơn vị, xử lý văn bản, mật khẩu và QR.",
    [
      step(
        "Bring the task",
        "Đưa việc cần làm vào",
        "Enter a calculation or text, or open a tool from the collection.",
        "Nhập phép tính, văn bản hoặc mở công cụ từ danh mục.",
      ),
      step(
        "Adjust the inputs",
        "Chỉnh đầu vào",
        "Set the values and options for the selected utility.",
        "Đặt giá trị và lựa chọn cho tiện ích đã chọn.",
      ),
      step(
        "Use the result",
        "Dùng kết quả",
        "Review and copy or export the result supported by that tool.",
        "Xem, sao chép hoặc xuất kết quả mà công cụ đó hỗ trợ.",
      ),
    ],
  ],
  docs: [
    "A document desk for Markdown, scans, PDFs and reading tools.",
    "Bàn làm việc cho Markdown, tài liệu quét, PDF và công cụ đọc.",
    [
      step(
        "Start with a document",
        "Bắt đầu từ tài liệu",
        "Create a note or open a document in the supported format.",
        "Tạo ghi chú hoặc mở tài liệu thuộc định dạng được hỗ trợ.",
      ),
      step(
        "Work on the page",
        "Làm việc trên trang",
        "Use the Markdown editor, scan/PDF workspace or reader suited to the document.",
        "Dùng trình Markdown, không gian quét/PDF hoặc trình đọc phù hợp với tài liệu.",
      ),
      step(
        "Keep or export",
        "Lưu hoặc xuất",
        "Save your work and use the export options available for that document.",
        "Lưu công việc và dùng lựa chọn xuất có sẵn cho tài liệu đó.",
      ),
    ],
  ],
  media: [
    "A workshop for screenshots, image edits, annotations and step-by-step visual guides.",
    "Xưởng cho ảnh chụp màn hình, chỉnh ảnh, chú thích và hướng dẫn từng bước bằng hình.",
    [
      step(
        "Capture or bring an image",
        "Chụp hoặc đưa ảnh vào",
        "Open an image or use supported screen-capture tools.",
        "Mở ảnh hoặc dùng công cụ chụp màn hình được hỗ trợ.",
      ),
      step(
        "Explain visually",
        "Diễn giải bằng hình",
        "Crop, annotate or arrange captures into the steps of a guide.",
        "Cắt, chú thích hoặc xếp ảnh chụp thành các bước hướng dẫn.",
      ),
      step(
        "Share the output",
        "Xuất kết quả",
        "Export the edited images or the guide using its available output options.",
        "Xuất ảnh đã sửa hoặc hướng dẫn theo những định dạng có sẵn.",
      ),
    ],
  ],
  dev: [
    "A developer workbench for structured data, transformations, validation and HTTPS requests.",
    "Bàn công cụ cho dữ liệu có cấu trúc, chuyển đổi, kiểm tra và yêu cầu HTTPS.",
    [
      step(
        "Bring the data",
        "Đưa dữ liệu vào",
        "Paste structured data or choose an existing tool/request.",
        "Dán dữ liệu có cấu trúc hoặc chọn công cụ, request đã có.",
      ),
      step(
        "Inspect or transform",
        "Kiểm tra hoặc chuyển đổi",
        "Explore JSON, compare or convert data, or configure an HTTPS request.",
        "Xem cây JSON, so sánh, đổi dữ liệu hoặc cấu hình yêu cầu HTTPS.",
      ),
      step(
        "Review the result",
        "Xem kết quả",
        "Inspect validation errors, transformed output or the received response before copying/exporting.",
        "Xem lỗi kiểm tra, dữ liệu đầu ra hoặc phản hồi nhận được trước khi chép, xuất.",
      ),
    ],
  ],
  trip: [
    "An offline travel organizer for itineraries, places, confirmed visits and trip memories.",
    "Sổ du lịch ngoại tuyến cho lịch trình, địa điểm, lượt ghé đã xác nhận và kỷ niệm chuyến đi.",
    [
      step(
        "Plan the trip",
        "Lên chuyến đi",
        "Add dates, places, bookings and a day-by-day itinerary.",
        "Thêm ngày, địa điểm, đặt chỗ và lịch từng ngày.",
      ),
      step(
        "Record the visit",
        "Ghi nhận lượt ghé",
        "Confirm that you visited a place, then add a journal entry, photographs or expenses.",
        "Xác nhận đã ghé địa điểm rồi thêm nhật ký, ảnh hoặc chi tiêu.",
      ),
      step(
        "Keep the memories",
        "Giữ kỷ niệm",
        "Revisit the passport and albums, make personal stamps or export supported trip documents.",
        "Xem hộ chiếu, album, làm tem cá nhân hoặc xuất tài liệu chuyến đi được hỗ trợ.",
      ),
    ],
  ],
  forms: [
    "An offline form studio for designing forms, collecting versioned responses and producing reports.",
    "Studio biểu mẫu ngoại tuyến để thiết kế form, thu hồ sơ theo phiên bản và tạo báo cáo.",
    [
      step(
        "Design the form",
        "Thiết kế biểu mẫu",
        "Build pages and fields or start with an editable template.",
        "Tạo trang, trường hoặc bắt đầu từ mẫu có thể sửa.",
      ),
      step(
        "Publish a form version",
        "Tạo phiên bản biểu mẫu",
        "Create a form snapshot and collect responses against that version, including offline drafts.",
        "Tạo bản chụp cấu trúc form và thu hồ sơ theo phiên bản đó, kể cả bản nháp ngoại tuyến.",
      ),
      step(
        "Review and report",
        "Xem hồ sơ và báo cáo",
        "Filter the records and export the available PDF or data reports.",
        "Lọc hồ sơ rồi xuất PDF hoặc báo cáo dữ liệu được hỗ trợ.",
      ),
    ],
  ],
  card: [
    "A visual design studio for cards, profile layouts, invitations and other editable print/social formats.",
    "Studio thiết kế trực quan cho thẻ, bố cục hồ sơ, thiệp mời và định dạng in, mạng xã hội có thể sửa.",
    [
      step(
        "Choose a starting point",
        "Chọn điểm bắt đầu",
        "Open an editable template or create a design project.",
        "Mở mẫu có thể sửa hoặc tạo dự án thiết kế.",
      ),
      step(
        "Make the layout yours",
        "Chỉnh bố cục của bạn",
        "Edit text, colors, images and shapes; use the profile fields where the template supports them.",
        "Sửa chữ, màu, ảnh, hình; dùng trường hồ sơ khi mẫu có hỗ trợ.",
      ),
      step(
        "Export and keep the project",
        "Xuất và giữ dự án",
        "Review the design, export a supported result or save a portable project.",
        "Xem lại thiết kế, xuất kết quả được hỗ trợ hoặc lưu dự án có thể chuyển đi.",
      ),
    ],
  ],
  widget: [
    "A theme library and visual studio for photo, clock, calendar and text-based widget designs.",
    "Thư viện theme và studio trực quan cho thiết kế widget ảnh, đồng hồ, lịch và chữ.",
    [
      step(
        "Find a theme",
        "Chọn theme",
        "Explore the theme library and choose a design to customize.",
        "Khám phá thư viện theme và chọn thiết kế để chỉnh.",
      ),
      step(
        "Work in the studio",
        "Chỉnh trong Studio",
        "Adjust the palette, typography, photos and supported layout layers.",
        "Đổi bảng màu, chữ, ảnh và các lớp bố cục được hỗ trợ.",
      ),
      step(
        "Save or export the design",
        "Lưu hoặc xuất thiết kế",
        "Keep editable projects and export the images or backups available for that design.",
        "Giữ dự án có thể sửa và xuất ảnh hoặc bản sao lưu có sẵn cho thiết kế.",
      ),
    ],
  ],
};
for (const [slug, [en, vi, steps]] of Object.entries(handy))
  productGuides[`handy-${slug}`] = {
    purpose: t(en, vi),
    steps,
    sources: [
      `Handy-Suite/docs/FUNCTIONS.md#handy-${slug}`,
      `Handy-Suite/apps/handy_${slug}/lib`,
    ],
  };
