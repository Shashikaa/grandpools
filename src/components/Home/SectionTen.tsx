"use client";
import ResponsiveImage from "../ResponsiveImage";

import { useRef, useState, useEffect } from "react";

export default function SectionTen() {
  const sectionRef = useRef<HTMLElement>(null);
  const [offscreen, setOffscreen] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
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
      className="relative w-full h-full overflow-hidden select-none"
    >
      {/* ── Static Background Image Layer ── */}
      <div className="s10-static-bg absolute inset-0 z-[1] w-full h-full pointer-events-none">
        <ResponsiveImage 
          src="/pool-dark-bg.webp" 
          alt="Pool background" 
          draggable={false}
          className="s10-bg-img w-full h-full object-cover" loading="lazy" />
      </div>

      {/* ── FIRST STAGE ELEMENTS ── */}
      <h2
        className="s10-title absolute !font-[100] text-[#FFFFFF] select-text pointer-events-auto reveal-text"
        style={{
          fontFamily: "var(--font-display)",
          zIndex: 10,
        }}
      >
        Built for Quality
      </h2> 

      <p
        className="s10-title-sub absolute font-body text-[#FFFFFF] select-text pointer-events-auto !mt-3 reveal-text"
        style={{ zIndex: 10 }} 
      >
        Designed for You
      </p>

      <p
        className="s10-para-top absolute font-body text-[#FFFFFF] select-text pointer-events-auto reveal-text"
        style={{
          zIndex: 10,
        }}
      >
        We turn ambitious architectural visions into enduring aquatic retreats, 
        tailored specifically to how you live.
      </p>

      {/* ── MOBILE & TABLET SCROLLABLE STRUCTURAL CONTAINER ── */}
      <div className="s10-scrollable-container pointer-events-none">
        {/* SECOND STAGE ELEMENTS */}
        <div className="s10-content-wrap pointer-events-none">
          <p className="s10-card-para text-[#FFFFFF] text-sm md:text-base leading-relaxed select-text pointer-events-auto">
            At Grand Pools, we focus on every detail to deliver exceptional results, combining innovative design, modern technologies, premium materials, and proven construction techniques. <br /><br />
            Our commitment to quality, durability, clear communication, and a seamless process ensures your pool is built to last and exceeds expectations.
          </p>
        </div>
      </div>

      {/* ── Layout Breakpoints ── */}
      <style>{`
        @media (min-width: 1025px) {
          .s10-scrollable-container { display: contents; }
          .s10-title {
            top: clamp(180px, 25vh, 240px);
            left: clamp(40px, 6vw, 80px);
            max-width: 60%;
          }
          .s10-title-sub {
            top: clamp(280px, 37vh, 340px);
            left: clamp(40px, 6vw, 80px);
          }
          .s10-para-top {
            bottom: clamp(180px, 25vh, 240px);
            right: clamp(40px, 6vw, 80px);
            max-width: 340px;
            text-align: left;
          }
          .s10-content-wrap {
            position: absolute;
            bottom: clamp(300px, 30vh, 300px); 
            left: clamp(40px, 6vw, 80px);
            width: 35vw;
            height: auto;
            z-index: 15;
          }
        }

        /* Unified Mobile and Tablet Layout Rules */
        @media (max-width: 1024px) and (min-width: 768px) {
          .s10-title { top: clamp(270px, 15vh, 160px); left: 20px; }
          .s10-title-sub { top: clamp(336px, 20vh, 200px); left: 20px;  }
          .s10-para-top { bottom: 180px; left: 420px; right: 20px; text-align: right;  }
          
          .s10-scrollable-container {
            position: absolute;
            top: 100svh;
            left: 20px;
            right: 20px;
            display: flex;
            flex-direction: column;
            gap: 110px; 
            z-index: 60;
          }

          .s10-content-wrap {
            width: 60%;
            height: auto;
          }
        }
        
        @media (max-width: 767px) {
          .s10-title { top: clamp(120px, 10vh, 120px); left: 20px; }
          .s10-title-sub { top: clamp(166px, 14vh, 120px); left: 20px; }
          .s10-para-top { bottom: 180px; left: 40px; right: 20px; text-align: right; }
          
          .s10-scrollable-container {
            position: absolute;
            top: 100svh;
            left: 20px;
            right: 20px;
            display: flex;
            flex-direction: column;
            gap: 190px; 
            z-index: 60;
          }

          .s10-content-wrap {
            width: 100%;
            height: auto;
          }
        }
      `}</style>
    </section>
  );
}