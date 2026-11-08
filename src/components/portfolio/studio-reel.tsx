"use client";

import { useEffect, useRef } from "react";
import { Play, X } from "lucide-react";
import type { Locale } from "@/content/studio";

export function StudioReel({ locale }: { locale: Locale }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const vi = locale === "vi";
  useEffect(() => {
    const root = document.querySelector(".site");
    const stop = () => {
      if (
        document.hidden ||
        root?.getAttribute("data-animation-paused") === "true"
      )
        video.current?.pause();
    };
    const observer = new MutationObserver(stop);
    if (root)
      observer.observe(root, {
        attributes: true,
        attributeFilter: ["data-animation-paused"],
      });
    document.addEventListener("visibilitychange", stop);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", stop);
    };
  }, []);
  const open = () => {
    const player = video.current;
    if (!player) return;
    if (!player.getAttribute("src")) player.src = "/studio/showreel.mp4";
    dialog.current?.showModal();
    void player.play().catch(() => {
      /* Native controls remain available. */
    });
  };
  return (
    <>
      <button className="studio-reel-trigger" onClick={open} type="button">
        <span>
          <Play size={17} fill="currentColor" />
        </span>
        {vi ? "Xem studio trong 24 giây" : "24 seconds inside the studio"}
        <small>SHOWREEL / 2026</small>
      </button>
      <dialog
        className="studio-reel-dialog"
        aria-label="Winka Studio showreel"
        ref={dialog}
        onClose={() => video.current?.pause()}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
      >
        <button
          className="preview-close"
          aria-label={vi ? "Đóng showreel" : "Close showreel"}
          onClick={() => dialog.current?.close()}
        >
          <X />
        </button>
        <video
          ref={video}
          controls
          playsInline
          preload="none"
          poster="/studio/showreel-poster.webp"
          aria-label="Winka Studio showreel"
        />
        <p>
          {vi
            ? "Ảnh và clip từ sản phẩm thật · Âm thanh từ trailer Arcane Brigade. Xem nguồn ảnh tại từng trang sản phẩm."
            : "Real product screens and footage · Audio from the Arcane Brigade trailer. Image credits are linked on each product page."}
        </p>
        <p className="reel-credits">
          <a href={`/${locale}/apps/handy-bookmark/credits/`}>
            Handy Bookmark · CC BY / CC BY-SA / CC0 ↗
          </a>
          <a href={`/${locale}/apps/sticky-wall/credits/`}>
            Sticky Wall · CC0 ↗
          </a>
        </p>
      </dialog>
    </>
  );
}
