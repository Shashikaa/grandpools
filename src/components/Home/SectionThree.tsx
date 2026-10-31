"use client";

import { useRef, useState, useCallback, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const slides = [
  {
    id: "concrete",
    label: "Concrete Pool Renovation",
    desc: "Restore and modernise your pool with high-quality finishes and functional upgrades for a fresh, stylish, and long-lasting look.",
    tab: "Concrete",
    img: "/pool-renovation.webp",
  },
  {
    id: "equipment",
    label: "Pool Equipment & Installation",
    desc: "We provide and install premium pool pumps, filters, heating systems, and automation solutions.",
    tab: "Equipment",
    img: "/hero.webp",
  },
  {
    id: "new-pool",
    label: "New Pool Construction",
    desc: "From concept to completion, we build bespoke pools tailored to your space, lifestyle, and vision.",
    tab: "New Pool",
    img: "/pool-new.webp",
  },
];

const CLIP_DURATION = 1.0;

function splitIntoLines(el: HTMLElement): HTMLElement[] {
  if (el.dataset.originalHtml !== undefined) {
    return Array.from(el.querySelectorAll<HTMLElement>(".gs-line-inner"));
  }

  el.dataset.originalHtml = el.innerHTML;
  el.style.transform = "none";

  el.innerHTML = el.innerHTML.replace(/(\S+)/g, '<span class="gs-word">$1</span>');
  const words = Array.from(el.querySelectorAll<HTMLElement>(".gs-word"));

  const lineMap = new Map<number, HTMLElement[]>();
  words.forEach((w) => {
    const top = Math.round(w.getBoundingClientRect().top);
    if (!lineMap.has(top)) lineMap.set(top, []);
    lineMap.get(top)!.push(w);
  });

  const lines = Array.from(lineMap.values());
  el.innerHTML = "";

  const lineInners: HTMLElement[] = [];

  lines.forEach((group) => {
    const lineOuter = document.createElement("span");
    lineOuter.className = "gs-line";
    lineOuter.style.cssText =
      "display:block; overflow:hidden; padding-bottom:0.12em; margin-bottom:-0.12em;";

    const lineInner = document.createElement("span");
    lineInner.className = "gs-line-inner";
    lineInner.style.cssText =
      "display:block; will-change:transform,opacity;";

    group.forEach((w, i) => {
      lineInner.appendChild(w);
      if (i < group.length - 1) {
        lineInner.appendChild(document.createTextNode(" "));
      }
    });

    lineOuter.appendChild(lineInner);
    el.appendChild(lineOuter);
    lineInners.push(lineInner);
  });

  return lineInners;
}

export default function SectionThree() {
  const containerRef = useRef<HTMLDivElement>(null);
  const currentRef = useRef<number>(0);
  const [current, setCurrent] = useState(0);
  const animating = useRef<boolean>(false);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const slideLinesCache = useRef<HTMLElement[][]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 1024;
      
      if (isMobile) {
        // MOBILE INITIAL LOAD: Run line split setups EXACTLY like desktop now
        gsap.set(".s3-services-nav", { x: 0, opacity: 1 });
        gsap.set(".s3-text-content-wrapper", { opacity: 1, y: 0 });
        
        slides.forEach((_, index) => {
          const slideContainer = containerRef.current!.querySelector(`.s3-text-${index + 1}`);
          if (slideContainer) {
            const textElements = slideContainer.querySelectorAll("h2, p, .s3-counter") as NodeListOf<HTMLElement>;
            const linesForThisSlide: HTMLElement[] = [];
            
            textElements.forEach((el) => {
              linesForThisSlide.push(...splitIntoLines(el));
            });
            
            slideLinesCache.current[index] = linesForThisSlide;
          }
        });

        slides.forEach((_, index) => {
          const slideContainer = containerRef.current!.querySelector(`.s3-text-${index + 1}`);
          if (index === 0) {
            // Mobile initial load sets texts cleanly visible but builds cache structure smoothly
            gsap.set(slideLinesCache.current[0], { yPercent: 0, opacity: 1 });
            gsap.set(slideContainer, { visibility: "visible", opacity: 1 });
          } else {
            if (slideLinesCache.current[index]) {
              gsap.set(slideLinesCache.current[index], { yPercent: 105, opacity: 0 });
            }
            gsap.set(slideContainer, { visibility: "hidden", opacity: 0 });
          }
        });
      } else {
        // DESKTOP INITIAL LOAD: Left completely untouched
        gsap.set(".s3-services-nav", { x: 40, opacity: 0 });
        gsap.set(".s3-text-content-wrapper", { opacity: 1, y: 0 });

        slides.forEach((_, index) => {
          const slideContainer = containerRef.current!.querySelector(`.s3-text-${index + 1}`);
          if (slideContainer) {
            const textElements = slideContainer.querySelectorAll("h2, p, .s3-counter") as NodeListOf<HTMLElement>;
            const linesForThisSlide: HTMLElement[] = [];
            
            textElements.forEach((el) => {
              linesForThisSlide.push(...splitIntoLines(el));
            });
            
            slideLinesCache.current[index] = linesForThisSlide;
          }
        });

        slides.forEach((_, index) => {
          const slideContainer = containerRef.current!.querySelector(`.s3-text-${index + 1}`);
          if (index === 0) {
            gsap.set(slideLinesCache.current[0], { yPercent: 105, opacity: 0 });
            gsap.set(slideContainer, { visibility: "visible", opacity: 1 });
          } else {
            gsap.set(slideContainer, { visibility: "hidden", opacity: 0 });
          }
        });
      }

      ScrollTrigger.refresh();

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const goTo = useCallback((next: number, direction: "next" | "prev") => {
    const prev = currentRef.current;
    if (animating.current || next === prev || !containerRef.current) return;
    animating.current = true;

    currentRef.current = next;
    setCurrent(next);

    if (indicatorRef.current) {
      const segmentWidthPercentage = 100 / slides.length;
      const targetLeftPosition = next * segmentWidthPercentage;

      gsap.to(indicatorRef.current, {
        left: `${targetLeftPosition}%`,
        duration: CLIP_DURATION,
        ease: "power2.inOut",
      });
    }

    const incomingClipStart = direction === "next" ? "inset(0 100% 0 0)" : "inset(0 0% 0 100%)";
    const incomingClipEnd = "inset(0 0% 0 0%)";
    const contextPrefix = ".s3-main-section";

    gsap.set(`${contextPrefix} .s3-bg-${next + 1}`, {
      clipPath: incomingClipStart,
      zIndex: 2,
    });
    gsap.set(`${contextPrefix} .s3-bg-${prev + 1}`, {
      clipPath: "inset(0 0% 0 0)",
      zIndex: 1,
    });

    gsap.to(`${contextPrefix} .s3-bg-${next + 1}`, {
      clipPath: incomingClipEnd,
      duration: CLIP_DURATION,
      ease: "power2.inOut",
      onComplete: () => {
        gsap.set(`${contextPrefix} .s3-bg-${next + 1}`, { zIndex: 1 });
        gsap.set(`${contextPrefix} .s3-bg-${prev + 1}`, {
          zIndex: 1,
          clipPath: "inset(0 100% 0 0)",
        });
      },
    });

    const prevContainer = containerRef.current.querySelector(`.s3-text-${prev + 1}`) as HTMLElement;
    const nextContainer = containerRef.current.querySelector(`.s3-text-${next + 1}`) as HTMLElement;

    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      // MOBILE SLIDER REVEAL: Changed to use the EXACT SAME line-reveal animation configuration as Desktop
      const prevInners = slideLinesCache.current[prev] || [];
      const nextInners = slideLinesCache.current[next] || [];

      if (prevContainer && nextContainer) {
        gsap.to(prevInners, {
          yPercent: -40,
          opacity: 0,
          duration: 0.35,
          ease: "power2.in",
          overwrite: "auto",
          onComplete: () => {
            gsap.set(prevContainer, { visibility: "hidden", opacity: 0 });
          },
        });

        gsap.set(nextContainer, { visibility: "visible", opacity: 1 });
        gsap.set(nextInners, { yPercent: 105, opacity: 0 });

        gsap.to(nextInners, {
          yPercent: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.04,
          ease: "power3.out",
          delay: 0.15,
          overwrite: "auto",
        });
      }
    } else {
      // DESKTOP SLIDER REVEAL: Left completely untouched
      const prevInners = slideLinesCache.current[prev] || [];
      const nextInners = slideLinesCache.current[next] || [];

      if (prevContainer && nextContainer) {
        gsap.to(prevInners, {
          yPercent: -40,
          opacity: 0,
          duration: 0.35,
          ease: "power2.in",
          overwrite: "auto",
          onComplete: () => {
            gsap.set(prevContainer, { visibility: "hidden", opacity: 0 });
          },
        });

        gsap.set(nextContainer, { visibility: "visible", opacity: 1 });
        gsap.set(nextInners, { yPercent: 105, opacity: 0 });

        gsap.to(nextInners, {
          yPercent: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.04,
          ease: "power3.out",
          delay: 0.15,
          overwrite: "auto",
        });
      }
    }

    gsap.delayedCall(CLIP_DURATION, () => {
      animating.current = false;
    });
  }, []);

  const handleTab = (idx: number) => {
    if (idx === currentRef.current) return;
    const direction = idx > currentRef.current ? "next" : "prev";
    goTo(idx, direction);
  };

  return (
    <div ref={containerRef} className="w-full h-full">
      <section
        className="s3-main-section w-full min-h-screen relative overflow-hidden z-30"
        style={{ pointerEvents: "auto" }}
      >
        {slides.map((slide, i) => (
          <img
            key={slide.id}
            className={`s3-bg s3-bg-${i + 1}`}
            src={slide.img}
            alt=""
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 1,
              zIndex: 1,
              clipPath: i === 0 ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
            }}
            />
        ))}

        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0, 0, 0, 0.4)",
            zIndex: 2,
          }}
        />

        {/* Navigation Menu Links */}
        <div
          className="s3-services-nav flex text-right items-end md:items-start"
          style={{
            position: "absolute",
            right: "5%",
            top: "43%",
            transform: "translateY(-50%)",
            zIndex: 40,
            flexDirection: "column",
            gap: "20px",
            maxWidth: "400px",
          }}
        >
          {slides.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => handleTab(i)}
              className="s3-card-btn font-display text-right transition-opacity duration-300 text-[14px] md:text-[16px]"
              style={{
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
                color: "#F4EEDF",
                opacity: current === i ? 1 : 0.5,
              }}
           
            >
              <span>{slide.label}</span>
            </button>
          ))}
        </div>

        {/* Text Area */}
        <div
          className="w-full"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            className="section-container w-full px-6 md:pl-[5%] md:pr-[42%] pb-[45px]"
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
              <div className="s3-text-content-wrapper w-full relative min-h-[240px] md:min-h-[180px] md:!mb-16 lg:!mb-10">
                {slides.map((slide, i) => (
                  <div
                    key={slide.id}
                    className={`s3-text s3-text-${i + 1}`}
                    style={{
                      position: "absolute",
                      top: 30,
                      left: 0,
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                    }}
                  >
                    <span className="s3-counter font-body text-[12px] md:text-[14px] text-[#F4EEDF] block !mb-1 md:!mb-2">
                      (0{i + 1})
                    </span>

                    <h2 className="font-display text-[#F4EEDF] text-3xl md:text-5xl font-bold">
                      {slide.label}
                    </h2>

                    <p className="!mt-2 lg:!mt-4 max-w-[440px] font-body text-[#F4EEDF] text-sm md:text-base">
                      {slide.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}