"use client";

import { useLayoutEffect, useRef, useSyncExternalStore, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import { refreshMotionLayout } from "./refresh";
import { SplitText } from "gsap/SplitText";
import { storyDistance, pinsStory, maskRevealEnd, entryTextAt, sceneLayout, processTiming, qualityEntryOffset } from "./settings";
import { useSite } from "@/src/app/context/SiteContext";

gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);
CustomEase.create("luxury-copy", "0.25,0.74,0.22,0.99");
export type StageKind = "standard" | "home-hero" | "process" | "quality" | "service-hero" | "service-story" | "editorial-hero" | "sequence" | "contact-story" | "invitation" | "about-hero" | "harmony";
export type SceneTransition = "wipe" | "curtain" | "slide" | "flow";
type Props = { transition?: SceneTransition; children: ReactNode; kind?: StageKind; flow?: boolean; className?: string; steps?: number; skipText?: boolean; onProgress?: (progress: number) => void; onActive?: (active: boolean) => void; onReady?: (trigger: ScrollTrigger) => void };

// Rebuild measured line masks on width changes. Ignore mobile browser chrome
// height changes so touch scrolling never tears down an active pin.
const subscribeViewport = (callback: () => void) => {
  let timer: ReturnType<typeof setTimeout>;
  const resize = () => { clearTimeout(timer); timer = setTimeout(callback, 150); };
  window.addEventListener('resize', resize);
  return () => { clearTimeout(timer); window.removeEventListener('resize', resize); };
};
const viewportSnapshot = () => window.innerWidth;
const serverSnapshot = () => 0;

/** Stationary masked entries, followed by the authored inner story and outgoing hold. */
export default function LuxuryStage({ children, kind = "standard", flow = false, className = "", steps = 2, skipText = false, transition = "wipe", onProgress, onActive, onReady }: Props) {
  const root = useRef<HTMLElement>(null);
  const viewportWidth = useSyncExternalStore(subscribeViewport, viewportSnapshot, serverSnapshot);
  const mobile = viewportWidth > 0 && viewportWidth <= 1024;
  const { preloaderDone, smootherRef } = useSite();
  const callbacks = useRef({ onProgress, onReady, onActive });
  callbacks.current = { onProgress, onReady, onActive };

  useLayoutEffect(() => {
    const scope = root.current;
    if (!scope || !preloaderDone) return;
    let disposed = false;
    let context: gsap.Context | undefined;
    const splits: SplitText[] = [];
    const initialSplits: SplitText[] = [];
    const phaseSplits = new Map<HTMLElement, SplitText>();
    let layoutObserver: ResizeObserver | undefined;
    const revealTweens: gsap.core.Tween[] = [];
    const shown = new Set<SplitText>();
    const initialize = () => {
      if (disposed) return;
      context = gsap.context(() => {
        const view = scope.querySelector<HTMLElement>(".luxury-stage-view")!;
        const surface = scope.querySelector<HTMLElement>(".luxury-stage-surface")!;
        const curtain = scope.querySelector<HTMLElement>(".luxury-stage-reveal")!;
        const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
        const q = (selector: string) => Array.from(surface.querySelectorAll<HTMLElement>(selector));
        const commitReady = () => {
          scope.dataset.motionReady = 'true';
          const page = scope.parentElement;
          if (page && [...page.children].filter(el => el.hasAttribute('data-luxury-stage')).every(el => (el as HTMLElement).dataset.motionReady === 'true')) page.dataset.layoutReady = 'true';
        };
        const isTitle = (el: HTMLElement) => el.matches('h1,h2,h3,.h1,.h2') && !el.matches('.hero-desc-target');
        const playCopy = (split: SplitText, title = isTitle(split.elements[0] as HTMLElement)) => {
          if (shown.has(split) || disposed) return;
          shown.add(split);
          const targets = title ? split.chars : split.lines;
          revealTweens.push(gsap.to(targets, { yPercent: 0, opacity: 1, rotationX: 0,
            duration: title ? 1.3 : 1.4, ease: 'luxury-copy',
            stagger: title ? { amount: Math.min(0.42, split.chars.length * 0.012) } : 0.095,
            overwrite: 'auto',
          }));
        };
        const textElements = (skipText ? q("[data-luxury-title]") : q("h1,h2,h3,p,.h1,.h2,.hero-desc-target,.reveal-text")).filter(el => {
          if (!el.offsetWidth || !el.textContent?.trim()) return false;
          if (kind === 'invitation' && el.matches('h2,.h2')) return false;
          if (el.closest('[data-luxury-skip],button,a.btn-underline,[role="dialog"],.s9-global-flight-container,.s9-target-wrapper,.s2-scroll-content,.s2-mob-scroll-wrapper,.s10-seq-container,.s10-content-wrap')) return false;
          if (el.querySelector('h1,h2,h3,p,button,input,svg')) return false;
          return !el.parentElement?.closest('h1,h2,h3,p,.reveal-text');
        });
        let revealed = reduced;
        if (!reduced && !mobile) textElements.forEach(el => {
          const split = SplitText.create(el, {
            type: isTitle(el) ? "lines,words,chars" : "lines", mask: "lines", linesClass: "luxury-line", wordsClass: "luxury-word", charsClass: "luxury-char", aria: "auto", autoSplit: false,
            onSplit: self => {
              self.lines.forEach(line => line.parentElement?.classList.add("luxury-line-mask"));
              gsap.set(isTitle(el) ? self.chars : self.lines, { yPercent: 105, opacity: 0, rotationX: isTitle(el) ? -12 : 0, force3D: true });
            },
          });
          splits.push(split);
          if (el.closest('.hero-right-text-wrap,.hero-secondary-text-wrap,.s10-content-wrap,.scroll-para-1,.scroll-para-2,.s9-para-desktop,.about-hero-underlay')) phaseSplits.set(el, split);
          else {
            initialSplits.push(split);
          }
          el.dataset.luxuryText = "prepared";
        });
        const reveal = () => {
          if (revealed || disposed) return;
          revealed = true;
          initialSplits.forEach(split => playCopy(split));
          scope.dataset.revealed = "true";
        };
        if (reduced) {
          scope.dataset.revealed = "true";
          gsap.set(q('.scroll-para-1,.scroll-para-2,.hero-right-text,.hero-secondary-text-wrap,.s9-para-desktop,.about-hero-underlay,.s2-scroll-content,.s2-mob-scroll-wrapper,.s10-seq-container,.s10-content-wrap'), { autoAlpha: 1, clearProps: 'transform' });
          commitReady();
          return;
        }
        // Prose travelling through the viewport stays fully readable: no line masks
        // or delayed intersection reveals on Process and service story tracks.
        scope.dataset.textMotion = mobile ? 'static' : 'desktop';
        const next = scope.nextElementSibling as HTMLElement | null;
        const hasNext = (next?.hasAttribute('data-luxury-stage') ?? false) && next?.dataset.transition !== 'flow';
        const story = pinsStory(kind, mobile) ? storyDistance(kind, mobile, steps) : 0;
        const handoff = hasNext ? 1 : 0;
        const pinned = story > 0 || handoff > 0;
        const measure = () => {
          if (!pinned) return false;
          const height = view.offsetHeight;
          const geometry = sceneLayout(innerHeight, height, story, handoff);
          const total = geometry.height;
          const changed = Math.abs(scope.offsetHeight - total) > 1;
          scope.style.height = `${total}px`;
          scope.style.setProperty('--scene-top', `${geometry.top}px`);
          scope.dataset.hold = 'sticky';
          return changed;
        };
        measure();
        layoutObserver = new ResizeObserver(() => { if (measure()) refreshMotionLayout(); });
        layoutObserver.observe(view);
        const hasPrevious = scope.previousElementSibling?.hasAttribute('data-luxury-stage') ?? false;
        const splitEntry = kind === 'invitation' && !mobile;
        scope.dataset.entry = hasPrevious ? (splitEntry ? 'split' : transition) : 'intro';
        if (hasPrevious) {
          // The section's normal flow rises by one viewport during entry. Exactly
          // counter that movement so the image stays still behind its opening mask.
          // The outer view remains CSS-sticky throughout; no fixed-pin state swap.
          const copyCues: { split: SplitText; at: number }[] = [];
          const enter = gsap.timeline({ scrollTrigger: {
            trigger: scope, start: 'top bottom', end: 'top top', scrub: true,
            invalidateOnRefresh: true,
            onUpdate: self => {
              scope.dataset.entryProgress = self.progress.toFixed(3);
              copyCues.forEach(cue => { if (self.progress >= cue.at) playCopy(cue.split); });
            },
          } });
          if (transition === 'slide' || transition === 'flow') enter.to({}, { duration: 1 }, 0);
          else enter.fromTo(curtain, { y: () => -innerHeight }, { y: 0, force3D: true, duration: 1, ease: 'none' }, 0);
          if (!splitEntry && transition !== 'slide' && transition !== 'flow') {
            const closedMask = () => transition === 'curtain'
              ? 'inset(0px 100% 0px 0px)' : `inset(${innerHeight}px 0px 0px 0px)`;
            enter.fromTo(curtain, { clipPath: closedMask }, { clipPath: 'inset(0px 0px 0px 0px)', duration: maskRevealEnd, ease: 'none' }, 0);
          }
          if (kind === 'harmony') {
            enter.fromTo(q('.s8-bg-img,.s8-mob-bg img'), { scale: 1 }, { scale: 1.12, duration: 1, ease: 'none' }, 0);
          }
          const entryCopy: SplitText[] = [];
          initialSplits.forEach(split => {
            const element = split.elements[0] as HTMLElement;
            const localTop = element.getBoundingClientRect().top - curtain.getBoundingClientRect().top;
            if (flow && localTop >= innerHeight * 0.95) {
              ScrollTrigger.create({ trigger: scope, start: () => `top ${innerHeight * 0.88 - localTop}px`,
                once: true, onEnter: () => playCopy(split),
                onRefresh: self => { if (self.progress > 0) playCopy(split); },
              });
              return;
            }
            entryCopy.push(split);
            const at = ['slide','flow'].includes(transition) ? Math.min(0.88, Math.max(0.12, localTop / innerHeight + 0.12)) : transition === 'wipe' ? Math.min(0.88, entryTextAt(localTop, innerHeight) + 0.06) : 0.72;
            copyCues.push({ split, at });
          });
          ScrollTrigger.create({ trigger: scope, start: 'top top',
            onEnter: () => { entryCopy.forEach(split => playCopy(split)); scope.dataset.revealed = 'true'; },
            onRefresh: self => { if (self.progress > 0) entryCopy.forEach(split => playCopy(split)); },
          });
        } else reveal();
        const timeline = gsap.timeline({ paused: !pinned });
        const lead = 0;
        if (lead) timeline.to({}, { duration: lead });
        const phaseText = (selector: string, at: number) => {
          phaseSplits.forEach((split, element) => { if (element.matches(selector) || element.closest(selector)) timeline.call(() => playCopy(split), [], at + lead); });
        };
        if (story > 0) {
          const to = (selector: string, vars: gsap.TweenVars, position: number) => {
            const els = q(selector); if (!els.length) return;
            if (mobile && 'autoAlpha' in vars) timeline.to(els, { ...vars, ease: 'none' }, position + lead);
            else timeline.to(els, vars, position + lead);
          };
          const fromTo = (selector: string, from: gsap.TweenVars, vars: gsap.TweenVars, position: number) => {
            const els = q(selector); if (!els.length) return;
            if (mobile && 'autoAlpha' in vars) {
              gsap.set(els, from);
              timeline.fromTo(els, from, { ...vars, ease: 'none', immediateRender: false }, position + lead);
            } else timeline.fromTo(els, from, vars, position + lead);
          };
          if (kind === "home-hero") {
            gsap.set(q('.hero-secondary-text-wrap,.hero-right-text-wrap'), { autoAlpha: 0 });

            to('.hero-left-initial', { y: -45, autoAlpha: 0, duration: 0.5 }, 0.1);
            fromTo('.hero-right-text-wrap', { autoAlpha: 0, y: 35 }, { autoAlpha: 1, y: 0, duration: 0.6 }, 0.4);
            to('.hero-right-text-wrap', { autoAlpha: 0, y: -25, duration: 0.4 }, 1.15);
            fromTo('.hero-secondary-text-wrap', { autoAlpha: 0, y: 35 }, { autoAlpha: 1, y: 0, duration: 0.65 }, 1.4);
            phaseText('.hero-right-text-wrap', 0.4); phaseText('.hero-secondary-text-wrap', 1.4);
          } else if (kind === "process") {
            const t = processTiming;
            to('.s2-title-main,.s2-title-sub,.s2-body-text', { y: -48, autoAlpha: 0, duration: t.fadeDuration, ease: 'none' }, t.fadeStart);
            if (!mobile) {
              // Crop a fixed image plane from the left. Its dimensions and
              // object-cover framing stay constant throughout the transition.
              fromTo('.s2-image-column', { clipPath: 'inset(0% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 42.857143%)', duration: t.settleDuration, ease: 'none' }, t.settleStart);
              gsap.set(q('.s2-right-img-frame'), { clipPath: 'inset(0% 0% 0% 0%)' });
              fromTo('.s2-right-img-frame-under', { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: t.swapDuration, ease: 'power1.inOut' }, t.swapStart);
              to('.s2-right-img-frame', { clipPath: 'inset(0% 0% 100% 0%)', duration: t.swapDuration, ease: 'power1.inOut' }, t.swapStart);
              fromTo('.s2-right-img-frame-final', { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: t.secondSwapDuration, ease: 'power1.inOut' }, t.secondSwapStart);
            }
            const column = mobile ? '.s2-mob-scroll-wrapper' : '.s2-scroll-content';
            fromTo(column, { opacity: 1, y: innerHeight * 1.05 }, { y: () => -Math.max(0, (q(column)[0]?.scrollHeight ?? 0) - innerHeight * 0.55), duration: t.textDuration, ease: 'none' }, mobile ? 0.95 : t.innerStart);
            if (mobile) [1,2,3].forEach(i => fromTo(`.s2-mob-clip-bg-${i}`, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, ease: 'power1.inOut' }, 0.6 + i * 0.95));
          } else if (kind === "quality") {
            gsap.set(q('.s10-content-wrap'), { autoAlpha: 1 });
            to('.s10-title,.s10-title-sub,.s10-para-top', { y: () => -innerHeight * (mobile ? 0.65 : 1), ...(mobile ? { autoAlpha: 0 } : {}), duration: 1.2, ease: 'none' }, 0);
            fromTo(mobile ? '.s10-scrollable-container' : '.s10-content-wrap', { y: () => mobile ? 0 : qualityEntryOffset(innerHeight, q('.s10-content-wrap')[0]?.offsetTop ?? 0) }, { y: mobile ? -innerHeight * 0.78 : 0, duration: mobile ? 1.8 : 1.5, ease: 'none' }, mobile ? 0 : 0.12);
            to('.s10-bg-img', { scale: 1.18, yPercent: -7, duration: 1.8, ease: 'none' }, 0);
          } else if (kind === "service-hero") {
            to('.hero-text-wrap,.hero-btn', { autoAlpha: 0, y: -30, duration: 0.55 }, 0.05);
            to('.services-hero-top-layer', { clipPath: () => {
              if (!mobile) return 'inset(0% 57.5% 0% 0%)';
              const boxes = q('[data-mobile-hero-copy]').map(el => el.getBoundingClientRect().top - surface.getBoundingClientRect().top);
              const textTop = boxes.length ? Math.min(...boxes) : innerHeight * 0.4;
              const crop = Math.max(35, Math.min(75, 100 - (textTop - 20) / innerHeight * 100));
              return `inset(0% 0% ${crop}% 0%)`;
            }, duration: 1.6, ease: 'power1.inOut' }, 0.05);

          } else if (kind === "service-story") {
            to('.s10-content-initial', { autoAlpha: 0, y: -55, duration: 0.55 }, 0.2);
            // Preserve the card-to-fullscreen expansion before the paragraph journey.
            fromTo('.s10-img-inner-wrap', { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.7, ease: 'power2.inOut' }, 0.05);
            to('.s10-img-inner-wrap', { right: 0, bottom: 0, width: '100%', height: '100%', duration: 1.35, ease: 'power2.inOut' }, 0.65);
            to('.s10-img-element', { scale: 1.15, duration: 1.35, ease: 'power2.inOut' }, 0.65);
            fromTo('.s10-seq-container', { y: 0 }, { y: () => -(q('.s10-seq-container')[0]?.scrollHeight ?? innerHeight * 2) - innerHeight * 0.25, duration: 3, ease: 'none' }, 2);
            to('.s10-img-element', { yPercent: -12, duration: 3, ease: 'none' }, 2);
          } else if (kind === "editorial-hero") {
            gsap.set(q('.scroll-para-1,.scroll-para-2'), { autoAlpha: 0 });
            to('.hero-text-wrap', { autoAlpha: 0, y: -45, duration: 0.5 }, 0.1);
            fromTo('.scroll-para-1', { autoAlpha: 0, y: 35 }, { autoAlpha: 1, y: 0, duration: 0.6 }, 0.4);
            to('.scroll-para-1', { autoAlpha: 0, y: -25, duration: 0.4 }, 1.15);
            fromTo('.scroll-para-2', { autoAlpha: 0, y: 35 }, { autoAlpha: 1, y: 0, duration: 0.65 }, 1.4);
            phaseText('.scroll-para-1', 0.4); phaseText('.scroll-para-2', 1.4);
          } else if (kind === "invitation") {
            fromTo('.s9-bg-img-left,.s9-bg-img-right', { scale: 1 }, { scale: 1.12, duration: 1.3, ease: 'none' }, 0);
            gsap.set(q('.s9-native-title-wrapper-1,.s9-native-title-wrapper-2'), { autoAlpha: 1 });
            gsap.set(q('.s9-global-flight-container'), { autoAlpha: 0 });
            gsap.set(q('.s9-para-desktop'), { autoAlpha: 0 });
            const parts = [q('.s9-flight-part1')[0], q('.s9-flight-part2')[0]];
            const landing = q('.s9-target-wrapper .h2 > span');
            parts.forEach((part,i) => {
              if (!part || !landing[i]) return;
              const startX = () => surface.clientWidth / 2 - (i === 0 ? part.offsetWidth : 0);
              const startY = () => surface.clientHeight / 2 - part.offsetHeight / 2;
              const destination = () => {
                const b=landing[i].getBoundingClientRect(), box=surface.getBoundingClientRect();
                return {x:i === 0 ? b.right + 12 - part.offsetWidth - box.left : b.left-box.left,y:b.top-box.top};
              };
              timeline.fromTo(part, { x:startX,y:startY }, { x:()=>destination().x,y:()=>destination().y,duration:1.3,ease:'power1.inOut' },0);
            });
            fromTo('.s9-para-desktop', { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.7 }, 0.6);
            phaseText('.s9-para-desktop', 0.6);
          } else if (kind === "about-hero") {
            // Opaque panels and a hidden underlay protect the first paint even
            // when the hero photograph is still decoding.
            fromTo('.about-hero-underlay', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2, ease: 'none' }, 0.15);
            // Restore the original two image curtains, then peel them apart.
            to('.about-hero-panel-left', { clipPath: mobile ? 'inset(0% 0% 100% 0%)' : 'inset(0% 50% 100% 0%)', duration: 1.1, ease: 'power2.inOut' }, 0.3);
            to('.about-hero-panel-right', { clipPath: 'inset(100% 0% 0% 50%)', duration: 1.1, ease: 'power2.inOut' }, 0.3);
            to('.about-hero-text-wrap', { autoAlpha: 0, y: -45, duration: 0.6 }, 0.3);
            phaseText('.about-hero-underlay', 0.65);
  

          } else if (kind === "contact-story") {
            to('.contact-right-scroll-track', { y: () => mobile ? 0 : -Math.max(0, (q('.contact-right-scroll-track')[0]?.scrollHeight ?? innerHeight) - innerHeight * 0.65), duration: 1.8, ease: "none" }, 0.2);
          } else {
            to('.s5-bg', { yPercent: -20, duration: 1, ease: 'none' }, 0);
            if (!timeline.duration()) timeline.to({}, { duration: 1 });
          }
        }
        // Finish the inner story, then hold the outgoing composition perfectly
        // still while the following stationary scene opens through its mask.
        const contentDuration = timeline.duration();
        const contentTime = contentDuration || (story > 0 ? story : 0);
        if (!contentDuration && story > 0) timeline.to({}, { duration: story });
        if (handoff > 0) {
          const tail = story > 0 ? contentTime / story : 1;
          const at = timeline.duration();
          timeline.to({}, { duration: tail }, at);
          timeline.to(scope.querySelector('.luxury-handoff-shade'), { opacity: 0.12, duration: tail, ease: 'none' }, at);
        }
        let storyTrigger: ScrollTrigger | undefined;
        if (pinned) {
          const st = ScrollTrigger.create({ trigger: scope, animation: timeline, start: () => `top ${Math.min(0, innerHeight - view.offsetHeight)}px`, end: () => `+=${innerHeight * (story + handoff)}`, scrub: true, invalidateOnRefresh: true, onRefreshInit: measure });
          storyTrigger = st;
          const fraction = story / (story + handoff);
          scope.dataset.storyFraction = String(fraction);
          let flightMode = false;
          timeline.eventCallback('onUpdate', () => {
            callbacks.current.onProgress?.(contentTime > 0 ? Math.min(1, timeline.time() / contentTime) : 1);
            if (kind === 'invitation' && !mobile) {
              const flying = timeline.time() > 0.0001;
              if (flying !== flightMode) {
                flightMode = flying;
                gsap.set(q('.s9-native-title-wrapper-1,.s9-native-title-wrapper-2'),{autoAlpha:flying?0:1});
                gsap.set(q('.s9-global-flight-container'),{autoAlpha:flying?1:0});
              }
            }
          });
          callbacks.current.onReady?.(st);
        }
        ScrollTrigger.create({ trigger: scope, start: 'top 40%', end: () => storyTrigger ? storyTrigger.end + innerHeight : 'bottom top', onToggle: self => callbacks.current.onActive?.(self.isActive), onRefresh: self => callbacks.current.onActive?.(self.isActive) });
        if (kind === 'invitation' && !mobile) {
          gsap.fromTo(q('.s9-left-side'), { yPercent: 100 }, { yPercent: 0, ease: 'none', scrollTrigger: { trigger: scope, start:'top bottom', end:'top top', scrub:true } });
          gsap.fromTo(q('.s9-right-side'), { yPercent: -100 }, { yPercent: 0, ease: 'none', scrollTrigger: { trigger: scope, start:'top bottom', end:'top top', scrub:true } });
        }
        const backgrounds = q('.s8-bg-img,.s10-bg-img,.s1-bg,.s3-bg,.s7-bg-img,.appsec-bg,.hero-bg-target').filter(el => !el.hasAttribute('data-scene-bg'));
        if (hasPrevious && kind === 'standard' && backgrounds.length) gsap.fromTo(backgrounds, { yPercent: -3, scale: 1.06 }, {
          yPercent: 3, scale: 1, ease: "none",
          scrollTrigger: { trigger: scope, start: "top bottom", end: "bottom top", scrub: 1.1, invalidateOnRefresh: true },
        });
        // Animate a scoped variable, not the image transform. New carousel images
        // inherit the current zoom without restarting the scene or fighting wipes.
        if (hasPrevious && q('[data-scene-bg]').length) {
          gsap.timeline({ scrollTrigger: { trigger: scope, start: 'top bottom', end: hasNext ? 'bottom bottom' : 'bottom top', scrub: true, invalidateOnRefresh: true } })
            .fromTo(surface, { '--scene-image-zoom': 1.075 }, { '--scene-image-zoom': 1.015, duration: 0.65, ease: 'none' })
            .to(surface, { '--scene-image-zoom': 1.055, duration: 0.35, ease: 'none' });
        }
        commitReady();
      }, scope);
      smootherRef?.current?.resize();
      refreshMotionLayout();
    };
    document.fonts.ready.then(initialize);
    return () => { disposed = true; layoutObserver?.disconnect(); scope.style.removeProperty('height'); scope.style.removeProperty('--scene-top'); delete scope.dataset.hold; revealTweens.forEach(tween => tween.kill()); context?.revert(); splits.forEach(split => split.revert()); };
  }, [preloaderDone, kind, flow, steps, skipText, smootherRef, mobile, viewportWidth, transition]);

  return <section ref={root} data-luxury-stage={kind} data-transition={transition} className={`luxury-stage ${flow ? 'luxury-flow' : ''} ${className}`}>
    <div className="luxury-stage-view"><div className="luxury-stage-reveal"><div className="luxury-stage-surface">{children}</div><div className="luxury-handoff-shade" aria-hidden="true" /></div></div>
  </section>;
}
