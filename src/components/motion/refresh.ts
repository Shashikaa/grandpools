import { ScrollTrigger } from 'gsap/ScrollTrigger';
let pending = 0;
/** Coalesce layout changes; scrolling itself never schedules a refresh. */
export function refreshMotionLayout() {
  if (pending) return;
  pending = requestAnimationFrame(() => { pending = 0; ScrollTrigger.refresh(); });
}
