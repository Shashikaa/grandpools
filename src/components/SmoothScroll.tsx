"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSite } from "../app/context/SiteContext";
import CustomScrollBar from "./CustomScrollBar";


import { refreshMotionLayout } from "./motion/refresh";
import { scrollSettings } from "./motion/settings";
import { prefersReducedMotion } from "../lib/reducedMotion";

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollProps {
  children: React.ReactNode;
  onScrollReady?: () => void;
}

export default function SmoothScroll({ children, onScrollReady }: SmoothScrollProps) {
  const { preloaderDone, menuOpen, smootherRef } = useSite();
  const pathname = usePathname();
  const readyCallback = useRef(onScrollReady);
  readyCallback.current = onScrollReady;

  // Ready before route effects subscribe. No asynchronous import/scroll-lock race.
  useLayoutEffect(() => {
    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    if (prefersReducedMotion()) {
      readyCallback.current?.();
      return () => { window.history.scrollRestoration = previousRestoration; };
    }
    const lenis = new Lenis({
      ...scrollSettings,
      smoothWheel: true,
      anchors: true,
      autoResize: true,
      allowNestedScroll: true,
      prevent: node => !!node.closest('[data-lenis-prevent], [role="dialog"], textarea, select'),
    });
    if (smootherRef) smootherRef.current = lenis;
    lenis.stop();
    lenis.on("scroll", ScrollTrigger.update);
    // Input first, then scene transforms, then ScrollTrigger, on the same clock.
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick, false, true);
    gsap.ticker.lagSmoothing(0);
    readyCallback.current?.();
    return () => {
      gsap.ticker.remove(tick);
      lenis.off("scroll", ScrollTrigger.update);
      lenis.destroy();
      if (smootherRef?.current === lenis) smootherRef.current = null;
      window.history.scrollRestoration = previousRestoration;
    };
  }, [smootherRef]);

  useEffect(() => {
    const lenis = smootherRef?.current as Lenis | null;
    if (!preloaderDone || menuOpen) lenis?.stop();
    else lenis?.start();
  }, [preloaderDone, menuOpen, smootherRef]);

  useLayoutEffect(() => {
    smootherRef?.current?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
  }, [pathname, smootherRef]);

  useEffect(() => {
    if (!preloaderDone) return;
    let cancelled = false;
    const refresh = () => {
      if (cancelled) return;
      smootherRef?.current?.resize();
      refreshMotionLayout();
    };
    document.fonts.ready.then(refresh);
    // Section-local observers handle real content size changes. Body observation
    // previously refreshed every story while their layout was being initialized.
    return () => { cancelled = true; };
  }, [pathname, preloaderDone, smootherRef]);

  return (
    <div className="flex flex-col min-h-[100dvh] w-full relative">
      <CustomScrollBar />
      {children}

    </div>
  );
}
