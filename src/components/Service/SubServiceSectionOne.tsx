"use client";

import { useRef, useState, useEffect } from "react";
import { SectionOneData } from "../../app/services/[slug]/data";

type SubServiceSectionOneProps = {
  data: SectionOneData;
};

export default function SubServiceSectionOne({ data }: SubServiceSectionOneProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [offscreen, setOffscreen] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const { IntersectionObserver } = window;
    if (!IntersectionObserver) return;

    const observer = new IntersectionObserver(
      ([entry]) => setOffscreen(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="s10-section relative w-full h-full overflow-hidden"
    >
      {/* ── Background Static Image Layer ── */}
      <div className="absolute inset-0 z-[1] pointer-events-auto w-full h-full mix-blend-normal">
        <img data-scene-bg 
          src="/toorak-top-view.webp" 
          alt="" aria-hidden="true" 
          className="w-full h-full object-cover" loading="lazy" />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* ── Foreground Layout Grid ── */}
      <div className="s10-content-initial section-container relative z-10 w-full h-full flex flex-col justify-between max-lg:justify-start max-lg:gap-4 !pt-[100px] md:!pt-[18vh] lg:!pt-[18vh] pb-[10vh]">
        
        {/* ── TOP: Description Paragraph ── */}
        <div className="w-full s10-top-text-row max-lg:order-2 max-lg:mt-2 !mt-[30px] lg:!mt-[0]">
          <p className="s10-para-top font-body text-[#F4EEDF] pointer-events-none text-sm lg:text-base max-w-[420px] whitespace-pre-line">
            {data.paragraph}
          </p>
        </div>

        {/* ── BOTTOM: Title Row ── */}
        <div className="w-full flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 s10-bottom-controls-row max-lg:order-1">
          <h2
            className="s10-title font-[100] text-[#F4EEDF] pointer-events-none whitespace-pre-line"
            style={{
              fontFamily: "var(--font-display)",
              lineHeight: "1.2",
            }}
          >
            {data.title}
          </h2> 

          {/* Spacer block sized to match the max 500px desktop image card width */}
          <div className="hidden lg:block w-[min(500px,38vw)] h-[clamp(300px,28vh,420px)] invisible pointer-events-none"></div>
        </div>

      </div>

      {/* ── THE REAL IMAGE LAYER (Constrained wrapper with desktop max-width 500px) ── */}
      <div className="s10-img-absolute-container absolute inset-0 z-[11] overflow-hidden w-full h-full pointer-events-none">
        <div className="s10-img-inner-wrap absolute right-[4vw] lg:right-[8vw] bottom-[10vh] w-[calc(100vw-8vw)] lg:w-[min(500px,38vw)] h-[220px] sm:h-[320px] lg:h-[clamp(300px,28vh,420px)] origin-bottom-right transition-none overflow-hidden">
          {/* The Image: Configured with h-[125%] to provide overflow bleed room during parallax translate */}
          <img
            src={data.sideImageUrl} 
            alt={data.title}
            className="s10-img-element absolute top-0 left-0 w-full h-[125%] object-cover origin-center z-10 will-change-transform" 
            loading="lazy" 
          />
          {/* Image Specific Dark Overlay */}
          <div className="absolute inset-0 bg-black/20 z-20 pointer-events-none mix-blend-multiply" />
        </div>
      </div>

      {/* ── Overlaid 4 Sequential Paragraphs Layer ── */}
      <div className="s10-seq-container absolute left-0 top-[100vh] w-full z-20 pointer-events-none section-container flex flex-col gap-[250px] pb-[46px]">
        
        {/* FRAME 1: Left Aligned everywhere */}
        <div className="s10-seq-p s10-seq-p-1 w-full flex justify-start text-left">
          <p className="font-body text-[#F4EEDF] text-base lg:text-lg max-w-[320px] leading-relaxed drop-shadow-lg whitespace-pre-line">
            {data.fourParagraphs?.[0]}
          </p>
        </div>

        {/* FRAME 2: Right Aligned on Mobile/Tab, Left Aligned on Desktop */}
        <div className="s10-seq-p s10-seq-p-2 w-full flex justify-end lg:justify-start text-right lg:text-left lg:!pl-[10%]">
          <p className="font-body text-[#F4EEDF] text-base lg:text-lg max-w-[320px] leading-relaxed drop-shadow-lg whitespace-pre-line">
            {data.fourParagraphs?.[1]}
          </p>
        </div>

        {/* FRAME 3: Left Aligned on Mobile/Tab, Right Aligned on Desktop */}
        <div className="s10-seq-p s10-seq-p-3 w-full flex justify-start lg:justify-end text-left lg:text-right">
          <p className="font-body text-[#F4EEDF] text-base lg:text-lg max-w-[330px] leading-relaxed drop-shadow-lg whitespace-pre-line">
            {data.fourParagraphs?.[2]}
          </p>
        </div>

        {/* FRAME 4: Right Aligned on Mobile/Tab, Center Aligned on Desktop */}
        <div className="s10-seq-p s10-seq-p-4 w-full flex justify-end lg:justify-center text-right">
          <p className="font-body text-[#F4EEDF] text-base lg:text-lg max-w-[340px] leading-relaxed drop-shadow-lg whitespace-pre-line">
            {data.fourParagraphs?.[3]}
          </p>
        </div>

      </div>

      <style>{`
        @media (min-width: 1025px) {
          .s10-title { font-size: clamp(2.5rem, 4vw, 4.5rem); }
        }
        @media (max-width: 1024px) {
          .s10-title { font-size: 2.2rem; }
        }
        @media (min-width: 640px) and (max-width: 1024px) {
          .s10-title { font-size: 3rem; }
        }
      `}</style>
    </section>
  );
}