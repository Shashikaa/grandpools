"use client";

import { useRef } from "react";

export default function SectionThree() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-full overflow-hidden"
      style={{ transform: "translateZ(0)", backfaceVisibility: "hidden" }}
    >
      {/* ── DESKTOP: Static Background Image ── */}
      <div className="hidden md:block absolute inset-0 z-[1] w-full h-full">
        <img data-scene-bg
          src="/sectiontwo.webp"
          alt=""
          aria-hidden
          className="s3-bg w-full h-full object-cover will-change-transform"
          style={{ transform: "translateZ(0)", backfaceVisibility: "hidden" }} loading="lazy" />
      </div>

      {/* ── MOBILE: Static Background Image ── */}
      <div className="block md:hidden absolute inset-0 z-[1] w-full h-full">
        <img data-scene-bg
          src="/marvin-van-mobile.webp"
          alt=""
          aria-hidden
          className="w-full h-full object-cover will-change-transform"
          style={{ transform: "translateZ(0)", backfaceVisibility: "hidden" }} loading="lazy" />
      </div>

      {/* ── Content Layer ── */}
      <div className="section-container relative z-[2] h-full flex flex-col justify-between pb-10 md:pb-14 lg:pb-16">
        <div className="flex flex-col md:!mt-24">
          <h2 className="s3-reveal-top reveal-text font-display text-[#F4EEDF] leading-[1.2] !font-[100]">
            Building Relationships <br />
          </h2>
          <p className="s3-reveal-top reveal-text font-body text-[#F4EEDF] text-sm md:text-base !mt-3">
            Driven by Excellence
          </p>
        </div>

        <div className="flex justify-end">
          <p className="s3-reveal-bottom reveal-text font-body text-[#F4EEDF] text-right lg:text-left max-w-[250px] md:max-w-[280px] lg:max-w-[280px] !mb-23 md:!mb-40 lg:!mb-0">
            At Grand Pools, we create pools with expert craftsmanship, innovative design, and personalised service, delivering seamless experiences and exceptional results.
          </p>
        </div>
      </div>
    </section>
  );
}