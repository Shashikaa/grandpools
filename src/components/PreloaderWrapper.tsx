"use client";

import { useSite } from "../app/context/SiteContext";
import Preloader from "./Preloader";

export default function PreloaderWrapper() {
  const { setPreloaderDone, markBrandPreloaderSeen } = useSite();

  const handleComplete = () => {
    document.body.classList.remove("preloading");
    markBrandPreloaderSeen();
    setPreloaderDone(true);
  };

  return <Preloader onComplete={handleComplete} />;
}