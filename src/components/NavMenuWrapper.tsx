"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSite } from "../app/context/SiteContext";
import NavMenu from "./NavMenu";

export default function NavMenuWrapper() {
  const pathname = usePathname();
  const { menuOpen, setMenuOpen } = useSite();

  // Safety close for route changes caused by browser navigation
  // or navigation from somewhere outside the menu.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname, setMenuOpen]);

  // Browser Back / Forward + bfcache cleanup.
  useEffect(() => {
    const unlockPage = () => {
      setMenuOpen(false);
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };

    window.addEventListener("popstate", unlockPage);
    window.addEventListener("pageshow", unlockPage);

    return () => {
      window.removeEventListener("popstate", unlockPage);
      window.removeEventListener("pageshow", unlockPage);
    };
  }, [setMenuOpen]);

  return (
    <NavMenu
      open={menuOpen}
      onClose={() => setMenuOpen(false)}
    />
  );
}