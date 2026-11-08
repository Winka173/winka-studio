"use client";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Layers,
  MoveUpRight,
} from "lucide-react";
import type { Locale } from "@/content/studio";

export function BookmarkShelf({ locale }: { locale: Locale }) {
  const vi = locale === "vi";
  const [selected, setSelected] = useState(0);
  const screens = [
    ["/products/handy-bookmark/phone.webp", vi ? "Thư viện" : "Library"],
    [
      "/products/handy-bookmark/collection.webp",
      vi ? "Bộ sưu tập" : "Collections",
    ],
    ["/products/handy-bookmark/focus.webp", vi ? "Tập trung" : "Focus"],
  ];
  return (
    <div className="bookmark-shelf">
      <div
        role="tablist"
        aria-label={
          vi ? "Khám phá giao diện Bookmark" : "Explore Bookmark screens"
        }
      >
        {screens.map(([, label], i) => (
          <button
            key={label}
            id={`bookmark-tab-${i}`}
            role="tab"
            tabIndex={selected === i ? 0 : -1}
            aria-selected={selected === i}
            aria-controls="bookmark-screen"
            onClick={() => setSelected(i)}
            onKeyDown={(event) => {
              if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
                const n = (i + (event.key === "ArrowRight" ? 1 : 2)) % 3;
                setSelected(n);
                document.getElementById(`bookmark-tab-${n}`)?.focus();
              }
            }}
          >
            {label}
          </button>
        ))}
      </div>
      <div
        id="bookmark-screen"
        role="tabpanel"
        aria-labelledby={`bookmark-tab-${selected}`}
        className="bookmark-shelf-screen"
      >
        <img
          key={selected}
          src={screens[selected][0]}
          alt={screens[selected][1]}
          width={780}
          height={1688}
        />
      </div>
      <span className="shelf-index">0{selected + 1} / 03</span>
    </div>
  );
}

export function StickyBoard({ locale }: { locale: Locale }) {
  const [arrangement, setArrangement] = useState(0);
  const vi = locale === "vi";
  return (
    <div className={`sticky-interactive arrangement-${arrangement}`} data-scene>
      <div className="board-thread" aria-hidden="true">
        <svg viewBox="0 0 600 500" preserveAspectRatio="none">
          <path d="M100 140 C270 -20 250 450 470 270" />
        </svg>
      </div>
      <div className="scrap-paper scrap-one">
        <span className="paper-pin" />
        <small>Sticky Wall</small>
        <p>
          {vi ? "Ý tưởng thường đến bất chợt." : "Ideas arrive unannounced."}
        </p>
        <span className="paper-doodle" aria-hidden="true">
          ↳
        </span>
      </div>
      <div className="scrap-screen">
        <span className="washi-tape" />
        <img
          src="/products/sticky-wall/wall.webp"
          width={924}
          height={1800}
          alt={
            vi
              ? "Ảnh chụp bảng Sticky Wall"
              : "Actual Sticky Wall board screenshot"
          }
        />
      </div>
      <img
        className="scrap-sticker sticker-bear"
        src="/products/sticky-wall/bear.webp"
        width={160}
        height={160}
        alt=""
      />
      <img
        className="scrap-sticker sticker-leaf"
        src="/products/sticky-wall/leaf.webp"
        width={120}
        height={120}
        alt=""
      />
      <div className="scrap-paper scrap-two">
        <span className="paper-pin" />
        <p>{vi ? "Một góc thật riêng." : "Make a little room for you."}</p>
      </div>
      <button
        className="shuffle-board"
        onClick={() => setArrangement((arrangement + 1) % 3)}
      >
        <RotateCcw size={16} />
        {vi ? "Đổi cách sắp xếp" : "Rearrange the board"}
      </button>
    </div>
  );
}

export function ForgeTurntable({ locale }: { locale: Locale }) {
  const vi = locale === "vi";
  const [view, setView] = useState(0);
  const [inspect, setInspect] = useState(false);
  const labels = vi
    ? ["Mặt trước", "Mặt bên", "Mặt sau"]
    : ["Front", "Side", "Back"];
  return (
    <div
      className={`forge-turntable ${inspect ? "inspection-on" : ""}`}
      data-scene
    >
      <div className="forge-viewer-top">
        <span>
          <span className="live-pip" />
          ASSET INSPECTION
        </span>
        <button aria-pressed={inspect} onClick={() => setInspect(!inspect)}>
          <Layers size={14} />
          {vi ? "Khung kiểm tra" : "Inspection frame"}
        </button>
      </div>
      <div className="forge-model-display">
        <img
          key={view}
          src={`/products/asset-forge-studio/tower-${["front", "side", "back"][view]}.webp`}
          alt={`${vi ? "Ảnh chụp model thật trong Asset Forge Studio" : "Actual model screenshot in Asset Forge Studio"} — ${labels[view]}`}
          width={1200}
          height={800}
        />
        <div className="scan-line" aria-hidden="true" />
        {inspect && (
          <div className="inspection-reticle" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </div>
        )}
      </div>
      <div className="forge-viewer-bottom">
        <button
          aria-label={vi ? "Góc trước" : "Previous view"}
          onClick={() => setView((view + 2) % 3)}
        >
          <ArrowLeft size={18} />
        </button>
        <div
          role="group"
          aria-label={vi ? "Chọn góc nhìn" : "Choose model view"}
        >
          {labels.map((label, i) => (
            <button
              key={label}
              aria-pressed={i === view}
              onClick={() => setView(i)}
            >
              {label}
            </button>
          ))}
        </div>
        <button
          aria-label={vi ? "Góc tiếp" : "Next view"}
          onClick={() => setView((view + 1) % 3)}
        >
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}

export function ArcaneActs({ locale }: { locale: Locale }) {
  const vi = locale === "vi";
  const [act, setAct] = useState(0);
  const scenes = [
    [
      `kit/02_Screenshots/${vi?'vietnamese':'pc'}/fight-03-late-night-a.webp`,
      vi ? "Dẫn tổ đội" : "Lead the squad",
      vi
        ? "Di chuyển tướng. Đồng minh tự chiến đấu."
        : "Move your champion. Your allies take the fight.",
    ],
    [
      `kit/02_Screenshots/${vi?'vietnamese':'pc'}/shop-01-overview.webp`,
      vi ? "Dừng chân giữa trận" : "Between the halls",
      vi
        ? "Ghé quầy hàng và chuẩn bị cho lượt tiếp theo."
        : "Visit the shops and prepare for the next hall.",
    ],
  ];
  return (
    <div className="arcane-acts">
      <div
        className="act-tabs"
        role="group"
        aria-label={vi ? "Khám phá trò chơi" : "Explore the game"}
      >
        {scenes.map(([, title], i) => (
          <button
            key={title}
            aria-pressed={act === i}
            onClick={() => setAct(i)}
          >
            <span>0{i + 1}</span>
            {title}
            <MoveUpRight size={18} />
          </button>
        ))}
      </div>
      <div className="act-screen">
        <img
          key={act}
          src={`/products/arcane-brigade/${scenes[act][0]}`}
          alt={scenes[act][1]}
          width={1920}
          height={1080}
        />
        <p>{scenes[act][2]}</p>
      </div>
    </div>
  );
}
