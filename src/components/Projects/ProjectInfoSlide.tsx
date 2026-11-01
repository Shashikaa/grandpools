"use client";
import { responsiveBackground } from "../ResponsiveImage";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import type { InfoSlide } from "../../app/projects/[slug]/data";

gsap.registerPlugin(SplitText);
interface Props { slides: InfoSlide[]; activeIndex?: number; isActive?: boolean }
export default function ProjectInfoSlide({ slides, activeIndex = 0, isActive = true }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const text = useRef<HTMLDivElement>(null);
  const index = Math.max(0, Math.min(slides.length - 1, activeIndex));
  const active = slides[index];
  useLayoutEffect(() => {
    if (!root.current || !text.current || !active) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const splits: SplitText[] = [];
    const context = gsap.context(() => {
      if (!reduced) text.current!.querySelectorAll<HTMLElement>('h2,p').forEach((el, i) => {
        const title = el.matches('h2');
        const split = SplitText.create(el, { type: title ? 'lines,words,chars' : 'lines', mask: 'lines', linesClass: 'luxury-line', wordsClass: 'luxury-word', charsClass: 'luxury-char', aria: 'auto' });
        splits.push(split);
        gsap.fromTo(title ? split.chars : split.lines, { yPercent: 105, opacity: 0 }, { yPercent: 0, opacity: 1, duration: title ? 1.3 : 1.4, stagger: title ? { amount: 0.35 } : 0.095, delay: i * 0.12, paused: !isActive, ease: 'power3.out' });
      });
    }, root);
    return () => { context.revert(); splits.forEach(split => split.revert()); };
  }, [index, active, isActive]);
  useLayoutEffect(() => {
    if (!root.current) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
      root.current!.querySelectorAll<HTMLElement>('.info-img-layer').forEach((layer, i) => {
        gsap.to(layer, { clipPath: i <= index ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)', duration: reduced ? 0 : 1.15, ease: 'power3.inOut', overwrite: true });
        gsap.to(layer.firstElementChild, { scale: i === index ? 1 : 1.085, duration: reduced ? 0 : 1.6, ease: 'power3.out', overwrite: true });
      });
    const layers = root.current.querySelectorAll('.info-img-layer,.info-image-inner');
    return () => { gsap.killTweensOf(layers); };
  }, [index]);
  if (!active) return null;
  return <div ref={root} className="absolute inset-0 w-full h-full overflow-hidden bg-[#131313] project-info-master">
    <div className="w-full h-full flex flex-col lg:grid lg:grid-cols-2">
      <div className="project-info-half relative w-full h-[50svh] lg:h-full order-1 lg:order-2 bg-[#EFECE6] !p-6 md:!p-16 lg:!p-20 flex flex-col justify-center z-[60] text-[#131313]">
        <div ref={text} key={index} className="info-text-block relative flex flex-col justify-center gap-3 md:gap-8">
          <h2 className="info-anim-item text-[#242A27] font-display text-2xl sm:text-3xl md:text-5xl font-light leading-tight">{active.title}</h2>
          <div className="info-anim-item max-w-md pt-1 md:pt-0 pb-0 md:pb-12"><p className="text-xs sm:text-sm md:text-base leading-relaxed text-[#242A27] font-normal">{active.description}</p></div>
        </div>
      </div>
      <div className="project-info-half relative w-full h-[50svh] lg:h-full order-2 lg:order-1 overflow-hidden bg-[#1e1e1e]">
        {slides.map((slide, i) => <div key={i} className={`info-img-layer info-img-layer-${i} absolute inset-0 w-full h-full overflow-hidden`} style={{ zIndex: i + 10, clipPath: i === 0 ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)' }}>
          <div className="info-image-inner w-full h-full"><div data-scene-bg className="responsive-background w-full h-full bg-cover bg-center" style={responsiveBackground(slide.image)}/></div>
        </div>)}
      </div>
    </div>
  </div>;
}
