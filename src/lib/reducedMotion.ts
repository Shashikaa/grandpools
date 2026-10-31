/**
 * Reduced-motion handling for JS-driven animation.
 *
 * The existing `prefers-reduced-motion` block in globals.css only neutralises
 * CSS transitions and animations. Every animation on this site is driven by
 * requestAnimationFrame writing inline transforms, plus Lenis smooth-scrolling,
 * so the CSS query alone left those users with the full experience.
 *
 * This module is the JS half: components check `prefersReducedMotion()` and skip
 * their rAF loops, and SmoothScroll skips Lenis entirely.
 */

/** True when the user has asked the OS to reduce motion. SSR-safe (false). */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Subscribes to reduced-motion preference changes so a mid-session OS toggle
 * is honoured without a reload. Returns an unsubscribe function.
 */
export function onReducedMotionChange(
  handler: (reduced: boolean) => void
): () => void {
  if (typeof window === "undefined" || !window.matchMedia) return () => {};

  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  const listener = (e: MediaQueryListEvent) => handler(e.matches);

  if (typeof mq.addEventListener === "function") {
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }

  mq.addListener(listener);
  return () => mq.removeListener(listener);
}

/**
 * Forces every scroll-driven inline transform on `scope` to its settled state
 * and cancels pinning. Called on the reduced-motion path so content that would
 * normally be parked at translate3d(0, 100%, 0) or hidden becomes visible
 * instead of being left off-screen by an rAF loop that never runs.
 */
export function settleReducedMotion(scope: HTMLElement | null) {
  if (!scope) return;

  scope.querySelectorAll<HTMLElement>(".gs-line-inner, .custom-line-inner").forEach((el) => {
    el.style.transition = "none";
    el.style.transform = "translate3d(0, 0, 0)";
    el.style.opacity = "1";
  });

  // Un-hide wrappers that animation code hides before revealing.
  scope.querySelectorAll<HTMLElement>(".reveal-text").forEach((el) => {
    el.style.visibility = "visible";
    el.style.opacity = "1";
    el.style.transform = "none";
  });

  // Restore anything the splitter parked off-screen.
  scope.querySelectorAll<HTMLElement>(".gs-line-outer, .gs-word-wrapper").forEach((el) => {
    el.style.transform = "none";
  });
}