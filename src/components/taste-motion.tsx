"use client";
import { useEffect } from "react";

type MomentModule = {
  mountAll: (root: Element) => Promise<unknown>;
  unmountAll: (root: Element) => void;
};
export function TasteMotion() {
  useEffect(() => {
    const root = document.querySelector(".home-taste");
    if (!root) return;
    const moduleUrl = "/taste/moments/moments.js";
    const motionUrl = "/taste/motion/motion.js";
    let momentModule: MomentModule | undefined;
    let active = true;
    import(/* webpackIgnore: true */ moduleUrl)
      .then((loaded: MomentModule) => {
        momentModule = loaded;
        if (active) return loaded.mountAll(root);
      })
      .catch(() => {
        /* Authored content remains readable if enhancement cannot load. */
      });
    import(/* webpackIgnore: true */ motionUrl).catch(() => {
      /* Native CSS keeps all content readable. */
    });
    return () => {
      active = false;
      momentModule?.unmountAll(root);
    };
  }, []);
  return null;
}
