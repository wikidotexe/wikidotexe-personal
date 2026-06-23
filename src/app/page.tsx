"use client";

import { Portfolio } from "@/components/portfolio";
import { CustomCursor } from "@/components/custom-cursor";
import { ScrollProgress } from "@/components/motion-primitives";
import { useLenis } from "@/hooks/use-lenis";

export default function Home() {
  useLenis();
  return (
    <>
      <ScrollProgress />
      <CustomCursor />
      <Portfolio />
    </>
  );
}
