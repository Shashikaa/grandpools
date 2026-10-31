"use client";

import CtaForm from "./CtaForm";

type SectionCTAProps = {
  preloaderDone?: boolean;
};

export default function SectionCTA({ preloaderDone }: SectionCTAProps) {
  return (
    <section className="about-section-cta section-cta min-h-[100dvh] h-auto w-full relative">
      {/* Static Background Images */}
      <div className="absolute inset-0 z-[1] pointer-events-none w-full h-full">
        {/* Desktop Background */}
        <div className="hidden lg:block absolute inset-0 w-full h-full">
          <img data-scene-bg
            src="/CTA.webp"
            alt="" aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        </div>

        {/* Mobile Background */}
        <div className="block lg:hidden w-full h-full">
          <img data-scene-bg
            src="/CTAmob.webp"
            alt="" aria-hidden="true"
            className="w-full h-full object-cover" loading="lazy" />
        </div>
      </div>

      {/* Desktop Layout Inner */}
      <div
        className="hidden lg:flex section-container cta-inner-desktop"
        style={{
          position: "relative",
          zIndex: 10,
          alignItems: "center",
          justifyContent: "space-between",
          gap: 44,
          minHeight: "100vh",
          height: "100%",
          maxWidth: 1440,
          padding: "40px 48px",
          margin: "0 auto",
          opacity: "var(--cta-inner-opacity, 1)",
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
              style={{
                color: "#F4EEDF",
                fontWeight: 100,
                margin: 0,
              }}
            >
              Your Dream Pool Starts Here
            </h2>
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

      {/* Mobile Layout Inner */}
      <div
        className="flex lg:hidden cta-inner-mobile min-h-[100dvh] h-auto w-full !pt-12 !pb-16"
        style={{
          position: "relative",
          zIndex: 10,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          paddingLeft: "20px",
          paddingRight: "20px",
          margin: 0,
          opacity: "var(--cta-inner-opacity, 1)",
        }}
      >
        <div
          className="h2 font-display !max-w-[300px] md:!max-w-[430px]"
          style={{
            color: "#F4EEDF",
            margin: 0,
            marginBottom: 20,
          }}
        >
          Your Dream Pool Starts Here
        </div>

        <p
          className="font-body max-w-[500px]"
          style={{
            color: "#F4EEDF",
            margin: 0,
            marginBottom: 20,
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