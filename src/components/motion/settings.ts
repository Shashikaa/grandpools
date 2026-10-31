export const scrollSettings = {
  duration: 1.55,
  wheelMultiplier: 0.85,
  touchMultiplier: 1,
  syncTouch: false,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
};
export function collectionIndex(progress: number, count: number) {
  if (count <= 0) return 0;
  return Math.min(count - 1, Math.max(0, Math.floor(progress * count)));
}
export function storyDistance(kind: string, mobile: boolean, steps: number) {
  if (kind === 'standard') return 0;
  if (kind === 'invitation') return mobile ? 0 : 1.35;
  if (kind === 'about-hero') return 1.8;
  if (kind === 'harmony') return 0;
  if (kind === 'process') return mobile ? 3 : 3.4;
  if (kind === 'service-story') return 4.6;
  if (kind === 'home-hero') return mobile ? 1.25 : 1.6;
  if (kind === 'quality') return mobile ? 1.6 : 2;
  if (kind === 'sequence') return Math.max(1, steps - 1) * (mobile ? 0.9 : 1.05);
  return mobile ? 1.25 : 1.6;
}
export function pinsStory(kind: string, mobile: boolean) {
  return kind !== 'standard' && kind !== 'harmony' && !(mobile && ['contact-story','invitation','harmony'].includes(kind));
}

/** Open the scene before finishing its line reveals; all values are entry progress. */
export const maskRevealEnd = 1;
export function entryTextAt(localTop: number, viewport: number, order = 0) {
  const frontReachesCopy = maskRevealEnd * (1 - localTop / Math.max(1, viewport));
  return Math.min(0.8, Math.max(0.1, frontReachesCopy - 0.025) + Math.min(order * 0.012, 0.035));
}

/** Sticky geometry shares the same start/end distances as the story trigger. */
export function sceneLayout(viewport: number, content: number, story: number, handoff: number) {
  const hold = viewport * (story + handoff);
  return { height: content + hold, top: Math.min(0, viewport - content), hold };
}

/** The opening photo must settle before any inner image wipe or prose journey. */
export const processTiming = {
  fadeStart: 0.08, fadeDuration: 0.75,
  settleStart: 0.2, settleDuration: 1.45,
  innerStart: 1.75, textDuration: 3.8,
  swapStart: 2.7, swapDuration: 1.2,
  secondSwapStart: 4.25, secondSwapDuration: 1.15,
};

/** Keep the next Quality paragraph just below the viewport instead of a full
 * extra translation below it. Its resting position varies with text height. */
export function qualityEntryOffset(viewport: number, restingTop: number) {
  return Math.max(0, viewport + 16 - restingTop);
}
