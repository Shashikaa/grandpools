"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { prefersReducedMotion } from "@/src/lib/reducedMotion";

const WaveCanvas = dynamic(() => import("./WaveCanvas"), { ssr: false, loading: () => null });

type LazyWaveCanvasProps = { imageSrc: string; preloaderDone?: boolean };

export default function LazyWaveCanvas({ imageSrc, preloaderDone }: LazyWaveCanvasProps) {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (pathname !== "/" || !preloaderDone || prefersReducedMotion() ||
      !window.matchMedia("(min-width: 1025px) and (pointer: fine)").matches) return;
    const container = containerRef.current;
    if (!container) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || getComputedStyle(container).visibility === "hidden") return;
      setShouldRender(true);
      observer.disconnect();
    }, { rootMargin: "180px" });
    observer.observe(container);
    return () => observer.disconnect();
  }, [pathname, preloaderDone]);

  return (
    <div ref={containerRef} className="relative w-full h-full">
      <img src={imageSrc} alt="" aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
      {shouldRender && <div className="absolute inset-0">
        <WaveCanvas imageSrc={imageSrc} preloaderDone={preloaderDone} />
      </div>}
    </div>
  );
}
