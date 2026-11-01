"use client";

import RollingText from "@/src/components/RollingText";

import Image from "../ResponsiveImage";
import Link from "next/link";

interface HeroProps {
  hideText?: boolean;
  isMobile?: boolean;
}

export default function ServicesHero({ hideText = false, isMobile = false }: HeroProps) {
  const desktopImg = "/servicehero.webp";
  const mobileImg = "/servicehero.webp";

  const bgImage = isMobile ? mobileImg : desktopImg;

  return (
    <div className="relative w-full h-full bg-[#12322D]">
      {/* UNDERNEATH LAYER: Exact Figma Positioning */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-[57.5%] z-0 text-[#F4EEDF]">
        <div className="relative w-full h-full p-6 md:p-12 lg:p-16">
          {/* Paragraph 1: High/Center-Left Position */}
          <div data-mobile-hero-copy className="absolute bottom-[260px] md:bottom-[280px] lg:top-[35%] left-6 md:left-12 lg:!left-[37%]  max-w-[290px] md:max-w-[310px]">
            <p className="text-[14px] md:text-[16px] leading-relaxed font-light">
From considered pool renovations to high-end commercial builds, we deliver tailored solutions with precision, care, and a clear focus on quality.
            </p>
          </div>

          {/* Paragraph 2: Bottom-Right Position */}
          <div data-mobile-hero-copy className="absolute bottom-18 right-6 lg:bottom-12 md:right-12 lg:bottom-16 lg:right-16 max-w-[280px] md:max-w-[300px] text-left">
            <p className="text-[14px] md:text-[16px] leading-relaxed font-light">
Whether you’re renovating an existing pool or creating something new, our team keeps the process clear, considered, and focused on a high-quality result.
            </p>
          </div>
        </div>
      </div>

      {/* TOP LAYER: Full screen image container clipped with Inset values */}
      <div 
        className="services-hero-top-layer absolute inset-0 w-full h-full overflow-hidden z-10 will-change-[clip-path]"
        style={{ clipPath: "inset(0px 0px 0px 0px)" }}
      >
        <section className="relative w-full h-full bg-[#111]">
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
              src={bgImage}
              alt="Services Hero"
              fill
              priority
              quality={90}
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 z-[1]" />

          {!hideText && (
            <div data-mobile-hero-bottom className="section-container relative z-10 h-full flex flex-col justify-end !pb-24 lg:!pb-42">
              <div className="hero-text-wrap flex flex-col !gap-4 lg:!gap-8 leading-normal will-change-[opacity,transform]">
                <h1
                  className="hero-title hero-text-target hero-title-target text-[#F4EEDF] !font-[100]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Expert Pool Solutions
                </h1>
                <p className="hero-desc hero-text-target hero-desc-target text-[#F4EEDF] w-[320px]">
Tailored pools for relaxing, hosting, and elevated outdoor living.                </p>
              </div>
            </div>
          )}
        </section>
      </div>

      {/* BUTTON LAYER: Left on mobile/tablet, Right on desktop */}
      {!hideText && (
        <div className="hero-btn  absolute z-50 pointer-events-auto block left-[20px] bottom-12 md:left-[30px] lg:!left-auto lg:!right-[60px] lg:bottom-[90px] transform-gpu">
          <Link
            href="/contact"
            className="group btn-underline font-body "
          ><RollingText>CONTACT US</RollingText></Link>
        </div>
      )}
    </div>
  );
}