"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const ok = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    setEnabled(ok);
    if (!ok) return;

    let rx = 0,
      ry = 0,
      dx = 0,
      dy = 0;
    const onMove = (e: MouseEvent) => {
      dx = e.clientX;
      dy = e.clientY;
      if (dot.current) dot.current.style.transform = `translate3d(${dx - 4}px, ${dy - 4}px, 0)`;
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHover(!!t.closest("a, button, [data-cursor='hover']"));
    };
    let raf = 0;
    const tick = () => {
      rx += (dx - rx) * 0.15;
      ry += (dy - ry) * 0.15;
      if (ring.current) ring.current.style.transform = `translate3d(${rx - 16}px, ${ry - 16}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, []);

  if (!enabled) return null;
  return (
    <>
      <style>{`@media (hover: hover) and (pointer: fine) { html, body, a, button { cursor: none !important; } }`}</style>
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 z-[200] h-2 w-2 rounded-full bg-foreground"
      />
      <div
        ref={ring}
        className="pointer-events-none fixed left-0 top-0 z-[200] h-8 w-8 rounded-full border-2 border-foreground transition-[width,height,margin] duration-200"
        style={
          hover
            ? {
                width: 56,
                height: 56,
                marginLeft: -12,
                marginTop: -12,
                mixBlendMode: "difference",
                borderColor: "white",
              }
            : { mixBlendMode: "difference", borderColor: "white" }
        }
      />
    </>
  );
}
