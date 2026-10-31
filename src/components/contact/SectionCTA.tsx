"use client";

import CtaForm from "@/src/components/CtaForm";

type SectionCTAProps = {
  imageSrcDesktop?: string;
  imageSrcMobile?: string;
};

export default function SectionCTA({
  imageSrcDesktop = "/CTAFORM.webp",
  imageSrcMobile = "/CTAFORM.webp",
}: SectionCTAProps) {
  return (
    <section
      id="contact-section"
      className="about-section-cta section-cta min-h-screen lg:h-full w-full relative"
      style={{
        background: "linear-gradient(135deg, #19211c 0%, #094146 100%)",
      }}
    >
      {/* Static Background Layer */}
      <div className="absolute inset-0 z-[1] pointer-events-none w-full h-full">
        <div className="hidden lg:block absolute inset-0 z-[1] pointer-events-auto w-full h-full">
          <img data-scene-bg
            src={imageSrcDesktop}
            alt="" aria-hidden="true"
            className="w-full h-full object-cover" loading="lazy" />
        </div>

        <div className="block lg:hidden w-full h-full">
          <img data-scene-bg
            src={imageSrcMobile}
            alt="" aria-hidden="true"
            className="w-full h-full object-cover" loading="lazy" />
        </div>
      </div>

      {/* Desktop Layout */}
      <div
        className="hidden lg:flex section-container cta-inner-desktop"
        style={{
          position: "relative",
          zIndex: 10,
          alignItems: "center",
          justifyContent: "space-between",
          gap: 44,
          minHeight: "100vh",
          maxWidth: 1440,
          padding: "40px 48px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            flex: "0 0 auto",
            maxWidth: 620,
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <h2
              className="font-display"
              style={{ color: "#F4EEDF", fontWeight: 100, margin: 0 }}
            >
Your Dream Pool Starts Here               </h2>
          </div>
          <p
            className="font-body"
            style={{
              color: "#F4EEDF",
              fontSize: 16,
              lineHeight: 1.2,
              margin: 0,
              maxWidth: 400,
            }}
          >
            Let&apos;s bring your vision to life with a custom-designed pool
            crafted for your space and lifestyle. Reach out to get started today.
          </p>
        </div>

        <div style={{ flex: "1 1 auto", maxWidth: 560 }}>
          <CtaForm isMobile={false} />
        </div>
      </div>

      {/* Mobile Layout */}
      <div
        className="flex lg:hidden  min-h-screen h-auto !pt-12 !pb-16"
        style={{
          position: "relative",
          zIndex: 10,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          paddingLeft: "20px",
          paddingRight: "20px",
          margin: 0,
        }}
      >
        <div
          className="h2 font-display !max-w-[300px] md:!max-w-[430px]"
          style={{
            color: "#F4EEDF",
            margin: 0,
            marginBottom: 28,
          }}
        >
Your Dream Pool Starts Here         </div>

        <p
          className="font-body max-w-[500px]"
          style={{
            color: "#F4EEDF",
            margin: 0,
            marginBottom: 28,
          }}
        >
          Let&apos;s bring your vision to life with a custom-designed pool
          crafted for your space and lifestyle. Reach out to get started today.
        </p>

        <CtaForm isMobile={true} nameSuffix="mobile" />
      </div>
    </section>
  );
}