/**
 * Single source of truth for viewport breakpoints.
 *
 * Why this exists: the JS render gate, the Lenis physics gate and the CSS
 * media queries had drifted apart. Pages render the Mobile tree below 1025px
 * while Lenis only applied mobile physics below 768px, so tablets in the
 * 768-1024px band got the mobile React tree with desktop scroll physics.
 *
 * Breakpoint contract:
 *   MOBILE_MAX_WIDTH  1024  -> layouts render the *Mobile component tree
 *   PHONE_MAX_WIDTH    767  -> narrow phone tweaks inside those components
 *
 * CSS must mirror this exactly (see globals.css):
 *   max-width: 1024px  == MOBILE_MAX_WIDTH
 *   max-width:  767px  == PHONE_MAX_WIDTH
 *   min-width: 1025px  == MOBILE_MAX_WIDTH + 1
 */

/** Widest viewport that still renders the Mobile component tree. */
export const MOBILE_MAX_WIDTH = 1024;

/** Narrowest viewport for phone-only refinements within the mobile tree. */
export const PHONE_MAX_WIDTH = 767;

/** Exclusive lower bound of the desktop component tree. */
export const DESKTOP_MIN_WIDTH = MOBILE_MAX_WIDTH + 1;

/**
 * True when the viewport should render the Mobile component tree.
 * Mirrors `window.innerWidth < 1025` used across the route components.
 */
export function isMobileViewport(width: number = window.innerWidth): boolean {
  return width <= MOBILE_MAX_WIDTH;
}

/** True on phone-sized viewports (the 767px CSS tier). */
export function isPhoneViewport(width: number = window.innerWidth): boolean {
  return width <= PHONE_MAX_WIDTH;
}

/**
 * Live media query strings for JS-side listeners. Shared so a change here
 * updates every consumer instead of one hand-written literal.
 */
export const MQ_MOBILE = `(max-width: ${MOBILE_MAX_WIDTH}px)`;
export const MQ_PHONE = `(max-width: ${PHONE_MAX_WIDTH}px)`;
export const MQ_DESKTOP = `(min-width: ${DESKTOP_MIN_WIDTH}px)`;

/**
 * Subscribes to the mobile/desktop breakpoint crossing. Returns an unsubscribe
 * function. Used instead of per-component `resize` listeners so the ~20
 * call sites share one listener.
 */
export function onBreakpointChange(
  handler: (isMobile: boolean) => void,
  { immediate = false }: { immediate?: boolean } = {}
): () => void {
  if (typeof window === "undefined") return () => {};

  const mq = window.matchMedia(MQ_MOBILE);
  const listener = (e: MediaQueryListEvent) => handler(e.matches);

  if (immediate) handler(mq.matches);

  // Safari <14 only supports the deprecated addListener/removeListener.
  if (typeof mq.addEventListener === "function") {
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }

  mq.addListener(listener);
  return () => mq.removeListener(listener);
}