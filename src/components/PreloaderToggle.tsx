"use client";

import { useEffect, useState, useCallback, useRef, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { useSite } from "../app/context/SiteContext";
import Preloader from "./Preloader";
import FadePreloader from "./FadePreloader";

// SSR-safe layout effect fallback
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function PreloaderToggle() {
  const pathname = usePathname();
  const { setPreloaderDone, markBrandPreloaderSeen, smootherRef } = useSite();

  const [mounted, setMounted] = useState(false);
  const [loaderType, setLoaderType] = useState<"brand" | "fade" | "none">("none");

  const isPopStateNav = useRef(false);

  const forceScrollTop = useCallback(() => {
    if (typeof window === "undefined") return;

    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    const lenis = smootherRef?.current;
    if (lenis && typeof lenis.scrollTo === "function") {
      lenis.scrollTo(0, { immediate: true });
    }
  }, [smootherRef]);

  // Lock classes synchronously before paint to prevent flashing
  useIsomorphicLayoutEffect(() => {
    if (pathname === "/terms-of-use" || pathname === "/privacy-policy" || pathname === "/not-found") {
      return;
    }

    document.documentElement.classList.add("preloading");
    document.body.classList.add("preloading");
  }, [pathname]);

  const handleRouteLoader = useCallback(
    (currentPath: string) => {
      if (isPopStateNav.current) {
        window.history.scrollRestoration = "auto";
      } else {
        window.history.scrollRestoration = "manual";
        forceScrollTop();
      }

      if (
        currentPath === "/terms-of-use" ||
        currentPath === "/privacy-policy" ||
        currentPath === "/not-found"
      ) {
        setLoaderType("none");
        document.documentElement.classList.remove(
          "show-brand-preloader",
          "show-fade-preloader",
          "preloading"
        );
        document.body.classList.remove("preloading");
        setPreloaderDone(true);
        return;
      }

      const isSeen = sessionStorage.getItem("hasSeenBrandPreloader") === "true";

      if (currentPath === "/" && !isSeen && !isPopStateNav.current) {
        setPreloaderDone(false);
        setLoaderType("brand");
        document.documentElement.classList.add("show-brand-preloader", "preloading");
        document.body.classList.add("preloading");
        return;
      }

      setPreloaderDone(false);
      setLoaderType("fade");
      document.documentElement.classList.add("show-fade-preloader", "preloading");
      document.body.classList.add("preloading");
    },
    [setPreloaderDone, forceScrollTop]
  );

  useEffect(() => {
    const handlePopState = () => {
      isPopStateNav.current = true;
      window.history.scrollRestoration = "auto";
      handleRouteLoader(window.location.pathname);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [handleRouteLoader]);

  useIsomorphicLayoutEffect(() => {
    setMounted(true);
    handleRouteLoader(pathname);
  }, [pathname, handleRouteLoader]);

  const handleBrandComplete = useCallback(() => {
    markBrandPreloaderSeen();
    sessionStorage.setItem("hasSeenBrandPreloader", "true");

    forceScrollTop();

    setPreloaderDone(true);
    setLoaderType("none");

    document.documentElement.classList.remove(
      "show-brand-preloader",
      "show-fade-preloader",
      "preloading"
    );
    document.body.classList.remove("preloading");
  }, [markBrandPreloaderSeen, setPreloaderDone, forceScrollTop]);

  const handleFadeExitStart = useCallback(() => {
    forceScrollTop();

    setPreloaderDone(true);

    document.documentElement.classList.remove("preloading");
    document.body.classList.remove("preloading");
  }, [setPreloaderDone, forceScrollTop]);

  const handleFadeComplete = useCallback(() => {
    document.documentElement.classList.remove("show-fade-preloader");

    if (!isPopStateNav.current) {
      forceScrollTop();
    }

    setLoaderType("none");

    if (isPopStateNav.current) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          isPopStateNav.current = false;
        });
      });
    }
  }, [forceScrollTop]);

  return (
    <>
      <div id="brand-preloader-root">
        {(!mounted || loaderType === "brand") && (
          <Preloader key="brand-preloader" onComplete={handleBrandComplete} />
        )}
      </div>

      <div id="fade-preloader-root">
        {(!mounted || loaderType === "fade") && (
          <FadePreloader
            key={`fade-loader-${pathname}`}
            onExitStart={handleFadeExitStart}
            onComplete={handleFadeComplete}
          />
        )}
      </div>
    </>
  );
}