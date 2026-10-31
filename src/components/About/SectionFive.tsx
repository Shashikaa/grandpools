"use client";
import { responsiveBackground } from "../ResponsiveImage";

import { useRef, useState, useCallback, useEffect } from "react";

const slides = [
  {
    targetNum: 25,
    suffix: "+ Years",
    label: "Industry Experience",
    desc: "Decades of knowledge in pool design and construction.",
  },
  {
    targetNum: 100,
    suffix: "+",
    label: "Completed Projects",
    desc: "Stunning pools crafted for homes and businesses.",
  },
  {
    targetNum: 100,
    suffix: "%",
    label: "Client Satisfaction",
    desc: "Trusted for quality, service, and seamless execution.",
  },
];

type SectionFiveProps = {
  isActive?: boolean;
  activeIndex?: number;
};

function AnimatedStat({
  target,
  suffix,
  isActive,
}: {
  target: number;
  suffix: string;
  isActive: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isActive) {
      return;
    }

    let start = 0;
    const duration = 1200; // ms
    const startTime = performance.now();

    let raf = 0;
    let cancelled = false;
    const updateCount = (now: number) => {
      if (cancelled) return;
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easedProgress * target));

      if (progress < 1) {
        raf = requestAnimationFrame(updateCount);
      } else {
        setCount(target);
      }
    };

    raf = requestAnimationFrame(updateCount);
    return () => { cancelled = true; cancelAnimationFrame(raf); };
  }, [isActive, target]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function SectionFive({ isActive = true, activeIndex = 0 }: SectionFiveProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const currentRef = useRef<number>(0);
  const [current, setCurrent] = useState(0);

  const goTo = useCallback((next: number) => {
    if (next === currentRef.current) return;
    currentRef.current = next;
    setCurrent(next);
  }, []);

  useEffect(() => { goTo(activeIndex); }, [activeIndex, goTo]);

  return (
    <section
      ref={containerRef}
      className="s5-stats-section relative w-full h-full overflow-hidden flex flex-col lg:grid lg:grid-cols-2 bg-[#F4EEDF]"
    >
      {/* TOP / LEFT SIDE */}
      <div className="s5-image-panel relative w-full h-[52%] shrink-0 lg:h-full lg:min-h-screen overflow-hidden bg-[#19211C]">
        <div
          className="s5-bg absolute -top-[0%] left-0 w-full h-[200%] bg-cover bg-center will-change-transform "
        ><div data-scene-bg className="responsive-background absolute inset-0 bg-cover bg-center" style={responsiveBackground("/about-paralell.webp")} /></div>

        <div className="absolute inset-0 bg-black/40 pointer-events-none z-[1]" />

        <div className="absolute z-10 bottom-[30px] md:bottom-[60px] left-[24px] md:left-[65px] flex flex-col !gap-2 md:!gap-4 overflow-hidden">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl !font-[100] text-[#F4EEDF]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Decades of Expertise
          </h2>
          <p
            className="text-sm sm:text-base md:text-lg text-[#F4EEDF]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Unmatched Craftsmanship
          </p>
        </div>
      </div>

      {/* BOTTOM / RIGHT SIDE */}
      <div className="s5-right-panel relative w-full h-[48%] shrink-0 lg:h-full lg:min-h-screen bg-[#F4EEDF] flex flex-col items-center justify-center px-6 py-8 md:px-12">
        <div className="s5-stat-content relative w-full max-w-[360px] h-[200px] sm:h-[240px] lg:h-[260px] bg-[#F4EEDF]">
          {slides.map((slide, i) => {
            const isCurrent = current === i;
            return (
              <div
                key={i}
                aria-hidden={!isCurrent}
                className="s5-text-group absolute inset-0 flex flex-col justify-center gap-2 md:gap-4 w-full h-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  opacity: isCurrent ? 1 : 0,
                  transform: isCurrent
                    ? "translate3d(0, 0px, 0)"
                    : i < current
                    ? "translate3d(0, -30px, 0)"
                    : "translate3d(0, 30px, 0)",
                  pointerEvents: isCurrent ? "auto" : "none",
                  
                }}
              >
                <h3 className="font-normal text-[#19211C] font-body text-5xl sm:text-6xl lg:text-5xl tracking-tight">
                  <AnimatedStat
                    target={slide.targetNum}
                    suffix={slide.suffix}
                    isActive={isActive && isCurrent}
                  />
                </h3>
                <div className="flex flex-col gap-1">
                  <p className="font-medium text-base sm:text-lg text-[#19211C]">
                    {slide.label}
                  </p>
                  <p
                    className="text-xs sm:text-sm md:text-base text-[#19211C]/80 leading-relaxed"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {slide.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}