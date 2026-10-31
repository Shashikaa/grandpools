"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  MutableRefObject,
} from "react";

export const PAGES_WITH_OWN_PRELOADER: string[] = [];

interface SiteContextProps {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  preloaderDone: boolean;
  setPreloaderDone: (done: boolean) => void;
  hasSeenBrandPreloader: boolean;
  markBrandPreloaderSeen: () => void;
  smootherRef: MutableRefObject<any> | null;
}

const SiteContext = createContext<SiteContextProps | undefined>(undefined);

export function SiteProvider({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [hasSeenBrandPreloader, setHasSeenBrandPreloader] = useState<boolean>(false);
  const smootherRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      setHasSeenBrandPreloader(
        sessionStorage.getItem("hasSeenBrandPreloader") === "true"
      );
    }

    const clearPreloaderClasses = () => {
      document.body.classList.remove("preloading", "scroll-locked");
      document.documentElement.classList.remove("preloading", "scroll-locked");
    };

    const handlePopState = () => {
      setPreloaderDone(true);
      clearPreloaderClasses();
      if (smootherRef.current) {
        smootherRef.current.resize();
        smootherRef.current.start();
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Recalculate smooth scroll dimension limits whenever the preloader finishes
  useEffect(() => {
    if (preloaderDone) {
      document.body.classList.remove("preloading", "scroll-locked");
      document.documentElement.classList.remove("preloading", "scroll-locked");

      if (smootherRef.current) {
        smootherRef.current.resize();
        smootherRef.current.start();
      }
    }
  }, [preloaderDone]);

  const markBrandPreloaderSeen = () => {
    try {
      sessionStorage.setItem("hasSeenBrandPreloader", "true");
    } catch (e) {}
    setHasSeenBrandPreloader(true);
  };

  return (
    <SiteContext.Provider
      value={{
        menuOpen,
        setMenuOpen,
        preloaderDone,
        setPreloaderDone,
        hasSeenBrandPreloader,
        markBrandPreloaderSeen,
        smootherRef,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
}

export function useSite() {
  const context = useContext(SiteContext);
  if (!context) throw new Error("useSite must be used within a SiteProvider");
  return context;
}