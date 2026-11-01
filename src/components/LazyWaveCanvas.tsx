"use client";

import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { usePathname } from "next/navigation";
import { prefersReducedMotion } from "@/src/lib/reducedMotion";

// The import factory runs only when the desktop-only branch is rendered.
const WaveCanvas = lazy(() => import("./WaveCanvas"));

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
    const desktopMedia = matchMedia("(min-width:1025px) and (pointer:fine)");
    const stopOnMobile = () => { if (!desktopMedia.matches) { setShouldRender(false); observer.disconnect(); } };
    desktopMedia.addEventListener("change", stopOnMobile);
    return () => { observer.disconnect(); desktopMedia.removeEventListener("change", stopOnMobile); };
  }, [pathname, preloaderDone]);

  return (
    <div ref={containerRef} className="relative w-full h-full">
      <img src={imageSrc} alt="" aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
      {shouldRender && <div className="absolute inset-0">
        <Suspense fallback={null}><WaveCanvas imageSrc={imageSrc} preloaderDone={preloaderDone} /></Suspense>
      </div>}
    </div>
  );
}
