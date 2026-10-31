"use client";

import Image from "../ResponsiveImage";

interface ContactHeroProps {
  hideText?: boolean;
  isMobile?: boolean;
}

export default function ContactHero({
  hideText = false,
  isMobile = false,
}: ContactHeroProps) {
  const desktopImg = "/toorak-top-view.webp";
  const mobileImg = "/toorak-top-view.webp";
  const bgImage = isMobile ? mobileImg : desktopImg;

  return (
    <section className="relative w-full min-h-[100dvh] flex flex-col justify-end overflow-hidden bg-transparent">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-[1] overflow-hidden">
        <div data-scene-bg className="hero-bg-target absolute inset-0 h-full w-full">
          <Image
            src={bgImage}
            alt="Contact Grand Pools Hero"
            fill
            priority
            quality={90}
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      </div>

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 z-[2]" />

      {/* Hero Content */}
      {!hideText && (
        <div className="section-container relative z-10 w-full pb-16 pt-32">
          <div className="flex flex-col gap-4 lg:gap-8 leading-normal">
            <h1
              className="hero-text-target hero-title-target text-[#F4EEDF] font-[100]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Let’s Bring Your
              <br />
              Dream Pool to Life
            </h1>
            <p className="hero-text-target hero-desc-target text-[#F4EEDF] max-w-[434px]">
              Have a question or are you ready to start your project? Get in touch with our friendly team. We’re here to help every step of the way, from planning to completion.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}