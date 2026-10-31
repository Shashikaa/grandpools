"use client";

import { useRef } from "react";

export default function SectionOne() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
      style={{ transform: "translateZ(0)", backfaceVisibility: "hidden" }}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <img data-scene-bg
          src="/Service1.webp"
          alt="Tailored Pool Solutions background"
          className="w-full h-full object-cover" loading="lazy" />
      </div>

      <div className="section-container relative z-[2] h-full flex flex-col justify-between pb-10 md:pb-14 lg:pb-6">
        
        {/* TOP CONTENT */}
        <div className="flex flex-col md:!mt-24 lg:!w-[660px]">
          <h2 className="s1-reveal-top font-display text-[#F4EEDF] leading-[1.2] !font-[100] reveal-text  !pr-18">
            Tailored Pool Solutions
          </h2> 
          <p className="s1-reveal-top font-body text-[#F4EEDF] text-sm md:text-base !mt-4 lg:!mt-8 reveal-text">
            For Every Need
          </p>
        </div>

        {/* BOTTOM RIGHT CONTENT */}
        <div className="flex justify-end">
          <p className="s1-reveal-bottom reveal-text font-body text-[#F4EEDF] text-right max-w-[220px] md:max-w-[280px] lg:max-w-[280px] !mb-33 md:!mb-80 lg:!mt-30">
            From renovations to new builds, we deliver high-quality pools with expert craftsmanship and precision.
          </p>
        </div>
      </div>
    </section>
  );
}