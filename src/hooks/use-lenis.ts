import { useEffect } from "react";
import Lenis from "lenis";
import { frame, cancelFrame } from "framer-motion";

export function useLenis() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true });

    // Run Lenis inside Framer Motion's frame scheduler so useScroll
    // always reads the scroll position that Lenis already committed this frame.
    const update = ({ timestamp }: { timestamp: number }) => {
      lenis.raf(timestamp);
    };
    frame.update(update, true);

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const a = target?.closest("a") as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href || !href.startsWith("#") || href.length < 2) return;
      const el = document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -80, duration: 1.4 });
      history.pushState(null, "", href);
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelFrame(update);
      lenis.destroy();
    };
  }, []);
}
