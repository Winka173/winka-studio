"use client";
import { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";
import type { Locale } from "@/content/studio";

export function ProductFilm({
  src,
  poster,
  locale,
  label,
  className = "",
}: {
  src: string;
  poster: string;
  locale: Locale;
  label: string;
  className?: string;
}) {
  const video = useRef<HTMLVideoElement>(null);
  const [manualPaused, setManualPaused] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [optIn, setOptIn] = useState(false);
  useEffect(() => {
    const el = video.current;
    if (!el) return;
    const root = el.closest(".site") as HTMLElement;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    let visible = false;
    const sync = () => {
      const active =
        visible &&
        !document.hidden &&
        root.dataset.animationPaused !== "true" &&
        !manualPaused &&
        (optIn || (!reduced.matches && !connection?.saveData));
      if (active) {
        if (!el.getAttribute("src")) {
          el.src = src;
          el.load();
        }
        void el.play().catch(() => {});
      } else el.pause();
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { threshold: 0.12 },
    );
    observer.observe(el);
    const mutation = new MutationObserver(sync);
    mutation.observe(root, {
      attributes: true,
      attributeFilter: ["data-animation-paused"],
    });
    document.addEventListener("visibilitychange", sync);
    reduced.addEventListener("change", sync);
    return () => {
      observer.disconnect();
      mutation.disconnect();
      document.removeEventListener("visibilitychange", sync);
      reduced.removeEventListener("change", sync);
      el.pause();
    };
  }, [src, manualPaused, optIn]);
  return (
    <figure className={`product-film ${className}`}>
      <video
        ref={video}
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        aria-label={label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <figcaption>
        <span>
          <i />
          {label}
        </span>
        <button
          aria-label={
            locale === "vi"
              ? playing
                ? "Tạm dừng video"
                : "Phát video"
              : playing
                ? "Pause video"
                : "Play video"
          }
          onClick={() => {
            setOptIn(true);
            setManualPaused(playing);
          }}
        >
          {playing ? <Pause size={15} /> : <Play size={15} />}
        </button>
      </figcaption>
    </figure>
  );
}
