"use client";
import ResponsiveImage from "../ResponsiveImage";

import { useRef, useState, useEffect } from "react";
import LazyWaveCanvas from "../LazyWaveCanvas";

type SectionEightProps = {
  preloaderDone?: boolean;
};

export default function SectionEight({ preloaderDone }: SectionEightProps) {
  const sectionRef    = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const personRef    = useRef<HTMLDivElement>(null);
  const bgParallaxRef = useRef<HTMLDivElement>(null);

  const [assetsLoaded] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      const moveX = (clientX / innerWidth) - 0.5;
      const moveY = (clientY / innerHeight) - 0.5;

      const bgIntensity = 6;
      const personIntensity = -45;

      if (bgParallaxRef.current) {
        bgParallaxRef.current.style.transform = `translate3d(${moveX * bgIntensity}px, ${moveY * bgIntensity}px, 0)`;
      }
      if (personRef.current) {
        personRef.current.style.transform = `translate3d(${moveX * personIntensity}px, ${moveY * personIntensity}px, 0)`;
      }
    };

    const handleMouseEnter = () => {
      if (bgParallaxRef.current) bgParallaxRef.current.style.transition = "none";
      if (personRef.current) personRef.current.style.transition = "none";
    };

    const handleMouseLeave = () => {
      if (bgParallaxRef.current) {
        bgParallaxRef.current.style.transition = "transform 0.6s ease-out";
        bgParallaxRef.current.style.transform = "translate3d(0,0,0)";
      }
      if (personRef.current) {
        personRef.current.style.transition = "transform 0.6s ease-out";
        personRef.current.style.transform = "translate3d(0,0,0)";
      }
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative w-full h-full overflow-hidden select-none"
      style={{ transform: "translate3d(0,0,0)", backfaceVisibility: "hidden" }}
    >
      <link rel="preload" href="/Forest.webp" as="image" type="image/webp" />
      <link rel="preload" href="/ForestMob.webp" as="image" type="image/webp" />

      {/* MOBILE + TABLET LAYOUT */}
      <div className="lg:!hidden !absolute !inset-0 !overflow-hidden section-container pointer-events-none">
        <div className="s8-mob-bg absolute inset-0 z-[1] w-full h-full overflow-hidden pointer-events-none">
          <ResponsiveImage 
            src="/ForestMob.webp" 
            alt="Forest" 
            draggable={false}
            className="w-full h-full object-cover" 
            style={{ 
              width: "100%", 
              height: "100%", 
              objectFit: "cover",
              opacity: assetsLoaded ? 1 : 0,
              transition: "opacity 0.3s"
            }} loading="lazy" />
        </div>

        <div className="!absolute !top-0 !left-0 !z-20 !flex !flex-col !items-start !gap-4 !pt-[12vh] !px-5 pointer-events-none">
          <h3 className="s8-subheading font-body text-[#F4EEDF] text-lg  m-0 select-text pointer-events-auto">
            Natural Harmony
          </h3>

          <h2 className="s8-heading select-text pointer-events-auto !text-[#F4EEDF] !text-left font-display m-0">
            Designed for Stillness
          </h2>

          <p className="s8-para select-text pointer-events-auto !text-[#F4EEDF] !text-left font-body max-w-[300px] mt-2">
            Designed to disappear into the landscape, not announce itself.
            The result isn't a pool. It's a quiet room you walk outside to find.
          </p>
        </div>
      </div>

      {/* DESKTOP LAYOUT */}
      <div ref={containerRef} className="hidden lg:block absolute inset-0" style={{ overflow: "hidden" }}>
        
        <div
          className="s8-bg-img absolute inset-0 w-full pointer-events-none"
          style={{
            top: "-10%", 
            height: "120%",
            willChange: "transform",
            opacity: assetsLoaded ? 1 : 0,
            transition: "opacity 0.4s ease-out"
          }}
        >
          <div 
            ref={bgParallaxRef} 
            className="absolute inset-0 w-full h-full"
            style={{ willChange: "transform" }}
          >
            <div className="absolute inset-0 z-[1] pointer-events-none w-full h-full">
              <LazyWaveCanvas imageSrc="/Forest.webp" preloaderDone={preloaderDone} />
            </div>
          </div>
        </div>

        {/* Foreground Content Stack */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          <div
            ref={personRef}
            className="absolute bottom-[-30px] left-[6vw] h-[105%] w-[75%] pointer-events-none"
            style={{ willChange: "transform" }}
          >
            <ResponsiveImage
              src="/person.png"
              alt=""
              draggable={false}
              style={{
                width: "100%", height: "100%", objectFit: "contain", 
                objectPosition: "bottom left", mixBlendMode: "screen",
                display: "block", transform: "scaleX(-1)", zIndex: 100,
              }} loading="lazy" />
          </div>

          <div className="absolute left-1/2 top-1/2 -translate-y-1/2 flex flex-col gap-3 text-left pointer-events-none">
            {/* H3 Subtitle Eyebrow */}
            <h3 className="s8-subheading select-text pointer-events-auto text-[#F4EEDF] font-body text-xs lg:text-lg   m-0 reveal-text ">
              Natural Harmony
            </h3>

            {/* Main H2 Heading */}
            <h2 className="s8-heading select-text pointer-events-auto text-[#F4EEDF] font-display whitespace-nowrap reveal-text m-0">
              Designed for Stillness
            </h2>

            {/* Paragraph Description */}
            <p className="s8-para select-text pointer-events-auto text-[#F4EEDF]/90 font-body leading-relaxed max-w-[330px] reveal-text mt-1 [text-shadow:0_1px_8px_rgba(0,0,0,0.6)]">
              Designed to disappear into the landscape, not announce itself.
              The result isn't a pool. It's a quiet room you walk outside to find.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}