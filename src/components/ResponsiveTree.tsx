"use client";

import { useEffect, useState, type ReactNode } from "react";

import { onBreakpointChange } from "../lib/breakpoints";

interface ResponsiveTreeProps {
  /** Rendered on the server and shown on desktop viewports. */
  desktop: ReactNode;
  /** Swapped in after mount on mobile viewports. */
  mobile: ReactNode;
  /**
   * Class applied to the pre-hydration wrapper. The desktop tree is what the
   * server sends, so on a phone it must be hidden by CSS until the swap
   * happens, otherwise a mobile user sees the desktop layout flash.
   */
  className?: string;
}

/**
 * Renders real content in the initial HTML instead of `null`.
 *
 * Previously every route did `if (isMobile === null) return null`, which made
 * the server emit an empty `<main>`: crawlers received only the preloader and
 * no headings, copy or images. Both trees were already bundled on every route,
 * so rendering the desktop tree server-side adds no JavaScript.
 *
 * Sequence:
 *   server  -> desktop markup, hidden by CSS below MOBILE_MAX_WIDTH
 *   mount   -> if the viewport is mobile, swap to the mobile tree
 *
 * Desktop animation effects are gated behind `preloaderDone`/`introDone`, which
 * resolve after the preloader, so the desktop tree never starts its rAF loops
 * during the brief pre-hydration window on a phone.
 */
export default function ResponsiveTree({
  desktop,
  mobile,
  className,
}: ResponsiveTreeProps) {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    return onBreakpointChange(setIsMobile, { immediate: true });
  }, []);

  // Pre-hydration and desktop: server HTML, no swap needed.
  if (isMobile === false) {
    return <div className={className}>{desktop}</div>;
  }

  // Mobile: the desktop markup was hidden by CSS, so replace it outright.
  if (isMobile === true) {
    return <div className={className}>{mobile}</div>;
  }

  // Unknown width (first client render, before the effect runs). Emit the
  // server tree so hydration markup matches, and let CSS decide visibility.
  return (
    <div className={`${className ?? ""} rs-tree-unresolved`} data-rs="pending">
      {desktop}
    </div>
  );
}