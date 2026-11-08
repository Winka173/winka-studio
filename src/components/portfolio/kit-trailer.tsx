"use client";
import { useEffect, useRef } from "react";
import type { Locale } from "@/content/studio";
export function KitTrailer({
  src,
  poster,
  locale,
}: {
  src: string;
  poster: string;
  locale: Locale;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const el = ref.current,
      root = el?.closest(".site");
    if (!el || !root) return;
    const sync = () => {
      if (
        root.getAttribute("data-animation-paused") === "true" ||
        document.hidden
      )
        el.pause();
    };
    const observer = new MutationObserver(sync);
    observer.observe(root, {
      attributes: true,
      attributeFilter: ["data-animation-paused"],
    });
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      el.pause();
    };
  }, []);
  return (
    <video
      ref={ref}
      controls
      playsInline
      preload="none"
      src={src}
      poster={poster}
      aria-label={
        locale === "vi"
          ? "Trailer Arcane Brigade có âm thanh"
          : "Arcane Brigade trailer with sound"
      }
    />
  );
}
