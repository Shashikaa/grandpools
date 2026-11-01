"use client";

import Image from "../ResponsiveImage";

interface ProjectsHeroProps {
  hideText?: boolean;
  isMobile?: boolean;
}

export default function ProjectsHero({
  hideText = false,
  isMobile = false,
}: ProjectsHeroProps) {
  const desktopImg = "/camberwell1.webp";
  const mobileImg = "/camberwell1.webp";

  const bgImage = isMobile ? mobileImg : desktopImg;

  return (
    <div className="relative w-full h-full bg-[#F4EEDF]">
      <div
        className="projects-hero-top-layer absolute inset-0 w-full h-full overflow-hidden z-10 will-change-[clip-path]"
        style={{ clipPath: "inset(0px 0px 0px 0px)" }}
      >
        <section className="relative w-full h-full bg-[#111]">
          {/* BACKGROUND IMAGE CONTAINER */}
          <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 1 }}>
            <div
              data-scene-bg className="projects-hero-bg hero-bg-anim hero-bg-target absolute left-0 right-0"
              style={{
                top: "-10%",
                bottom: "-10%",
                willChange: "transform",
                backfaceVisibility: "hidden",
              }}
            >
              <Image
                src={bgImage}
                alt="Projects Hero"
                fill
                priority
                quality={90}
                sizes="100vw"
                className="object-cover object-center"
              />
            </div>
          </div>

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/50 z-[2] pointer-events-none" />

          {!hideText && (
            <>
              {/* Bottom Left-Aligned Initial Title & Subtitle */}
              <div data-mobile-hero-bottom className="hero-text-wrap section-container absolute inset-0 z-10 h-full flex flex-col justify-end pb-12 md:pb-16 lg:pb-22 pl-6 md:pl-12 lg:pl-20 will-change-[opacity,transform]">
                <div className="flex flex-col !gap-4 lg:!gap-8">
                  <h1
                    className="hero-title hero-text-target hero-title-target text-[#F4EEDF] font-[100]"
                    style={{
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    Projects
                  </h1>
                  <p className="hero-desc hero-text-target hero-desc-target text-[#F4EEDF] !mt-1 max-w-[380px]">
                    Projects That Speak for Themselves
                    <br />
                    Take a look at some of our completed pool projects across Melbourne.
                  </p>
                </div>
              </div>

              {/* Dynamic Scroll Text Blocks */}
              <div className="scroll-text-container section-container absolute inset-0 z-20 h-full pointer-events-none">
                {/* Paragraph 1: Bottom Right */}
                <div className="absolute bottom-12 md:bottom-16 lg:bottom-22 left-6 md:left-12 lg:left-20 w-full max-w-[310px] md:max-w-[400px] lg:max-w-[440px] text-[#F4EEDF]">
                  <p className="scroll-para-1 invisible top-0 left-0 w-full pointer-events-auto">
                    Our projects reflect the quality, craftsmanship, and attention to detail that define Grand Pools. From luxury backyard retreats to large-scale custom builds across Melbourne, every pool is designed to complement its surroundings and deliver lasting beauty, function, and value.
                  </p>
                </div>

                {/* Paragraph 2: Top Left */}
                <div className="absolute top-24 md:top-32 lg:top-36 left-6 md:left-12 lg:left-20 w-full max-w-[310px] md:max-w-[400px] lg:max-w-[440px] text-[#F4EEDF]">
                  <p className="scroll-para-2 invisible top-0 left-0 w-full pointer-events-auto">
                    We work closely with each client to create tailored pool solutions that transform outdoor spaces into refined environments for relaxation, entertaining, and everyday enjoyment.
                  </p>
                </div>
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
}