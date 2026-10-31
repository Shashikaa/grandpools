"use client";

import RollingText from "@/src/components/RollingText";

import Link from "next/link";
import { useEffect } from "react";

interface HeroProps {
  onReady?: () => void;
}

export default function Hero({ onReady }: HeroProps) {
  useEffect(() => {
    // Preload background image to ensure context is fully painted
    const img = new Image();
    img.src = matchMedia("(max-width:1024px)").matches ? "/mobile/hero-home.webp" : "/hero-home.webp";

    if (img.complete) {
      onReady?.();
    } else {
      img.onload = () => onReady?.();
      img.onerror = () => onReady?.();
    }
  }, [onReady]);

  return (
    <section className="hero relative w-full h-full overflow-hidden bg-transparent">
      {/* Gradient layer */}
      <div
        className="hero-gradient-bg absolute inset-0 w-full h-full bg-gradient-to-br from-[#10221C] to-[#0A4145] z-10"
        style={{ opacity: 1 }}
      />

      {/* Targetable Background wrapper layer */}
      <div
        className="hero-bg-wrapper absolute inset-0 w-full h-full z-20 overflow-hidden"
        style={{ clipPath: "inset(0% 0% 0% 0%)" }}
      >
        <div
          className="hero-bg absolute inset-0 bg-cover bg-center bg-[url('/hero-home.webp')]"
          style={{ transform: "scale(1)", transformOrigin: "center center" }}
        />
        
        {/* Black Overlay */}
        <div className="hero-overlay absolute inset-0 bg-black/30 pointer-events-none z-[21]" />
      </div>

      {/* Main Container Layer */}
      <div className="section-container relative h-full w-full flex flex-col justify-end items-start lg:flex-row lg:items-end lg:justify-between !pb-[100px] md:!pb-[140px] lg:!pb-30 gap-8 z-30">

        {/* LEFT SIDE: Container for Initial Title & Frame 3 Secondary Paragraph */}
        <div className="max-w-xl lg:max-w-4xl flex flex-col justify-end overflow-visible relative min-h-[120px] w-full lg:w-auto">
          
          {/* 1. FRAME 1: Top-Left Paragraph & H1 (Below Header on Mobile) */}
          <div className="hero-left-initial max-lg:fixed max-lg:top-[15vh] max-lg:left-6 max-lg:right-6 block h-fit overflow-visible relative z-30 max-w-[350px] sm:max-w-[420px] lg:!max-w-[640px]">
            {/* Visually Visible H1 for SEO & Accessibility */}
            <h1 className="font-display text-[#F4EEDF] !font-[100] text-left !text-[42px]  lg:!text-[60px] font-normal leading-tight m-0 mb-3 p-0">
              Custom Concrete Pools, Built for Melbourne
            </h1>

            <p className="hero-title font-body text-[#F4EEDF] text-left text-base sm:text-lg lg:text-xl leading-relaxed m-0 p-0 select-none  max-w-[420px] ">
              Grounded in 25 years of master craftsmanship, we build bespoke swimming pools designed to seamlessly integrate with your home’s architecture and landscape.
            </p>
          </div>

          {/* 3. FRAME 3: Hidden until its scroll cue. */}
          <div 
            className="hero-secondary-text-wrap max-lg:fixed max-lg:bottom-[22vh] max-lg:left-6 max-lg:right-6 absolute bottom-12 left-0 lg:fixed lg:top-[100vh] lg:bottom-auto lg:left-24 w-full max-w-[300px] sm:max-w-[340px] z-30 overflow-visible pointer-events-none"
            style={{ opacity: 0, visibility: "hidden" }}
          >
            <p className="hero-secondary-para font-body text-[#F4EEDF] text-left text-sm sm:text-base leading-relaxed m-0 p-0">
              Expert craftsmanship and attention to detail bring your vision to life, delivering seamless pool solutions from concept to completion.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE: Frame 2 Paragraph & Button */}
        <div className="mt-4 lg:mt-0 lg:!pb-6 z-30 relative flex-shrink-0 flex flex-col items-start lg:items-end justify-end gap-22 min-h-[0px] w-full lg:w-auto">
          
          {/* 2. FRAME 2: Center Paragraph (Over the Pool Area on Mobile) */}
          <div style={{ opacity: 0, visibility: "hidden" }}
            className="hero-right-text-wrap max-lg:fixed max-lg:top-1/2 max-lg:-translate-y-1/2 max-lg:left-6 max-lg:right-6 relative w-full max-w-[340px] md:max-w-[390px] lg:!max-w-[420px] overflow-hidden text-left lg:text-right">
            <p className="hero-right-text font-body text-[#F4EEDF] text-left lg:text-right text-sm sm:text-base leading-relaxed m-0 p-0">
              At Grand Pools, we create custom swimming pools that balance style, function, and quality. Each pool is designed to complement its outdoor setting while adding lasting value and elegance to your home or business.
            </p>
          </div>

          {/* Action Button */}
          <Link
            href="/projects"
            prefetch={true}
            className="hero-contact-btn group btn-underline font-body ml-0 lg:ml-10"
          ><RollingText>See Our Projects</RollingText></Link>
        </div>
      </div>

      {/* Scroll Indicator (Desktop Only) */}
      <div className="hero-scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 z-30 hidden lg:flex flex-col items-center gap-2 pointer-events-none transition-opacity duration-[400ms]">
        <span className="text-[#F4EEDF] text-[10px] font-light tracking-[0.2em] uppercase [text-shadow:0_1px_6px_rgba(0,0,0,0.8)]">
          Scroll
        </span>
        <div className="w-[22px] h-[34px] rounded-[11px] border-[1.5px] border-[rgba(244,238,223,0.9)] relative flex justify-center pt-[5px] shadow-[0_0_12px_rgba(0,0,0,0.5),inset_0_0_8px_rgba(0,0,0,0.2)] backdrop-blur-sm bg-black/15">
          <div className="w-[3px] h-[6px] rounded-[2px] bg-[#F4EEDF] [animation:scrollDot_1.6s_ease-in-out_infinite]" />
        </div>
      </div>

      <style>{`
        @keyframes scrollDot {
          0%   { transform: translateY(0);    opacity: 1; }
          60%  { transform: translateY(10px); opacity: 0; }
          61%  { transform: translateY(0);    opacity: 0; }
          100% { transform: translateY(0);    opacity: 1; }
        }
      `}</style>
    </section>
  );
}