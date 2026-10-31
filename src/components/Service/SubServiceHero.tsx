"use client";

import RollingText from "@/src/components/RollingText";

import { useState } from "react";
import Image from "../ResponsiveImage";
import Link from "next/link";

export interface TabContent {
  label: string;
  type: "paragraph" | "points";
  content: string | string[];
}

export interface SubServiceHeroData {
  title: string;
  subtitle: string;
  bgImageUrl: string;
  tabs: TabContent[];
}

interface HeroProps {
  data: SubServiceHeroData;
  hideText?: boolean;
  isMobile?: boolean;
}

export default function SubServiceHero({ data, hideText = false }: HeroProps) {
  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const activeTab = data.tabs[activeTabIdx] || data.tabs[0];

  return (
    <div className="relative w-full h-full bg-[#0F2828]">
      {/* UNDERNEATH LAYER: Stationary multi-tab interaction stack */}
      <div className="subservice-hero-underlay absolute section-container inset-0 w-full h-full flex flex-col justify-between p-6 md:p-12 lg:p-16 z-0 text-[#F4EEDF] pointer-events-auto overflow-y-auto">
        <div data-mobile-hero-copy className="subservice-hero-tabs flex flex-col gap-3 text-left lg:absolute lg:top-32 lg:right-16 lg:w-[450px] !mt-10">
          {data.tabs.map((tab, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTabIdx(idx)}
              className={`text-right sm:text-right font-light text-xl md:text-2xl lg:text-xl transition-all duration-300 pointer-events-auto cursor-pointer ${
                activeTabIdx === idx
                  ? "text-[#F4EEDF] opacity-100 translate-x-1"
                  : "text-[#F4EEDF]/40 hover:opacity-80"
              }`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Bottom layout container */}
        <div className="w-full lg:max-w-[550px] flex flex-col sm:flex-row items-end justify-between gap-6 text-left lg:absolute lg:bottom-16 lg:right-0 mb-10">
          <div className="w-full max-w-[420px] min-h-[140px]">
            {activeTab?.type === "paragraph" ? (
              <p className="text-[#F4EEDF] text-sm md:text-lg lg:text-lg leading-relaxed">
                {activeTab.content as string}
              </p>
            ) : (
              <ol className="space-y-3 w-full text-sm md:text-[16px] text-[#fff] font-body list-none p-0 m-0">
                {(activeTab?.content as string[]).map((point, i) => (
                  <li
                    key={i}
                    className="flex items-baseline gap-2 leading-relaxed"
                  >
                    <span className="text-[#fff] font-body text-sm md:text-[16px] select-none shrink-0 min-w-[4px]">
                      {String(i + 1).padStart(2)}.
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>
      </div>

      {/* TOP LAYER */}
      <div
        className="services-hero-top-layer absolute inset-0 w-full h-full overflow-hidden z-10 pointer-events-none will-change-[clip-path]"
        style={{
          clipPath: "inset(0% 0% 0% 0%)",
          WebkitClipPath: "inset(0% 0% 0% 0%)",
        }}
      >
        <section className="relative w-full h-full bg-[#111]">
          {/* BACKGROUND IMAGE CONTAINER */}
          <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 1 }}>
            <div
              className="service-hero-bg hero-bg-anim hero-bg-target absolute left-0 right-0"
              style={{
                top: "-10%",
                bottom: "-10%",
                willChange: "transform",
                backfaceVisibility: "hidden",
              }}
            >
              <Image
                src={data.bgImageUrl}
                alt={data.title}
                fill
                priority
                quality={90}
                sizes="100vw"
                className="object-cover object-center"
              />
            </div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 z-[1]" />

          {!hideText && (
            <div className="hero-text-wrap section-container relative z-10 h-full flex flex-col justify-end pb-20 md:pb-22 pointer-events-auto will-change-[opacity,transform]">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 leading-normal w-full">
                {/* Title and Subtitle Block */}
                <div className="flex flex-col gap-2 lg:gap-6">
                  <h1
                    className="hero-title hero-text-target hero-title-target text-[#F4EEDF] font-light max-w-[700px] !font-[100]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {data.title}
                  </h1>
                  <p className="hero-desc hero-text-target hero-desc-target text-[#F4EEDF] mt-1 max-w-[300px]">
                    {data.subtitle}
                  </p>
                </div>

                {/* Contact Us Button */}
                <Link href="/contact" className="btn-underline   hero-btn lg:ml-10"><RollingText>CONTACT US</RollingText></Link>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}