"use client";

import { useRef } from "react";
import { Expand, X } from "lucide-react";

/** A real capture stays readable on touch screens as well as on a large display. */
export function ImagePreview({
  src,
  alt,
  children,
}: {
  src: string;
  alt: string;
  children: React.ReactNode;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  return (
    <>
      <button
        type="button"
        className="image-preview-trigger"
        aria-label={`${alt} — zoom`}
        onClick={() => dialog.current?.showModal()}
      >
        {children}
        <span className="image-preview-hint" aria-hidden="true">
          <Expand size={15} />
        </span>
      </button>
      <dialog
        className="image-preview-dialog"
        aria-label={alt}
        ref={dialog}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
      >
        <button
          type="button"
          className="preview-close"
          aria-label="Close / Đóng"
          onClick={() => dialog.current?.close()}
        >
          <X />
        </button>
        <img src={src} alt={alt} loading="lazy" />
        <p>{alt}</p>
      </dialog>
    </>
  );
}
