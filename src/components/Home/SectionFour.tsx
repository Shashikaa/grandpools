"use client";

export default function SectionFour() {
  return (
    <section
      style={{
        position:           "absolute",
        inset:              0,
        width:              "100%",
        height:             "100%",
        zIndex:             40,
        willChange:         "transform",
        transform:          "translateZ(0)",
        backfaceVisibility: "hidden",
      }}
    >
      <style>{`
        @media (max-width: 1024px) {
          .s4-mobile-layout  { display: flex !important; }
          .s4-desktop-layout { display: none !important; }
        }
        @media (min-width: 1025px) {
          .s4-mobile-layout  { display: none !important; }
          .s4-desktop-layout { display: flex !important; }
        }
      `}</style>

      {/* ── Layer 0: background ── */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 0 }}>
        <div
          className="s4-bg-img"
          style={{
            position:           "absolute",
            top:                "-10%",
            left:               0,
            width:              "100%",
            height:             "120%",
            backgroundImage:    "url('/murray-st-prahran.webp')",
            backgroundSize:     "cover",
            backgroundPosition: "center",
            willChange:         "transform",
          }}
        />
      </div>

      {/* ── Layer 1: gradient overlay ── */}
      <div
        style={{
          position:   "absolute",
          inset:      0,
          zIndex:     1,
          background: `radial-gradient(
            ellipse 140% 140% at 50% 50%,
            rgba(25, 33, 28, 0.72) 0%,
            rgba(25, 33, 28, 0.30) 100%
          )`,
        }}
      />

      {/* ── Layer 2: blur ── */}
      <div
        style={{
          position:             "absolute",
          inset:                0,
          zIndex:               2,
          backdropFilter:       "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          boxShadow:            "inset -5px -5px 250px 0px rgba(255,255,255,0.02)",
          background:           "rgba(25,33,28,0.15)",
        }}
      />

      {/* ── MOBILE + TABLET layout (≤ 1024px) ── */}
      <div
        className="s4-mobile-layout section-container"
        style={{
          display:            "none",
          position:           "absolute",
          inset:              0,
          width:              "100%",
          height:             "100%",
          zIndex:             3,
          flexDirection:      "column",
          boxSizing:          "border-box",
          overflow:           "hidden",
          /* Forces its own GPU compositing layer so the text gets
             rasterized independently of the parent .section-4's
             scrubbed transform — fixes text dropping out mid-scroll
             on mobile WebKit/Blink and only reappearing on reversal. */
          transform:          "translateZ(0.001px)",
          backfaceVisibility: "hidden",
          willChange:         "transform",
          /* section-container supplies padding-inline + padding-block */
          paddingBlock:       undefined,
        }}
      >
        {/* Title */}
        <div
          style={{
            display:            "flex",
            justifyContent:     "flex-end",
            flexShrink:         0,
            transform:          "translateZ(0)",
            backfaceVisibility: "hidden",
          }}
        >
          <h2 className="font-display  text-[#F4EEDF] text-right !mt-22 md:!mt-16">
            Making Memories
          </h2>
        </div>

        {/* Para */}
        <div
          style={{
            marginTop:          32,
            maxWidth:           480,
            flexShrink:         0,
            transform:          "translateZ(0)",
            backfaceVisibility: "hidden",
          }}
        >
          <p className="font-body  text-[#F4EEDF] md:!mt-8">
            At Grand Pools, we build more than just swimming pools — we create
            spaces where families gather, friends connect, and lasting memories
            are made. With expert craftsmanship and a passion for innovation,
            we bring your vision to life.
          </p>
        </div>

        {/* ── Parallax image ── */}
        <div
          className="s4-img-outer-mob md:!mt-18"
          style={{
            marginTop:  32,
            width:      "100%",
            flexGrow:   1,
            flexShrink: 0,
            maxHeight:  "45vh",
            overflow:   "hidden",
            position:   "relative",
          }}
        >
          <div
            className="s4-img-mob"
            style={{
              position:           "absolute",
              top:                "-30%",
              left:               0,
              width:              "100%",
              height:             "160%",
              backgroundImage:    "url('/parallax-image-mobile.webp')",
              backgroundSize:     "cover",
              backgroundPosition: "center",
              willChange:         "transform",
            }}
          />
        </div>
      </div>

      {/* ── DESKTOP layout (≥ 1025px) ── */}
      <div
        className="s4-content s4-desktop-layout section-container"
        style={{
          position:      "absolute",
          top:           0,
          left:          0,
          width:         "100%",
          height:        "140vh",
          zIndex:        3,
          display:       "flex",
          flexDirection: "column",
          boxSizing:     "border-box",
          willChange:    "transform",
          /* section-container supplies padding-inline + padding-block */
        }}
      >
        <div style={{ flexShrink: 0, display: "flex", justifyContent: "flex-end" }}>
          <h2 className="font-display s4-title text-[#F4EEDF]">
            Making Memories
          </h2>
        </div>

        <div style={{ marginTop: 100, flexShrink: 0, maxWidth: 400 }}>
          <p className="font-body s4-para text-[#F4EEDF]">
            At Grand Pools, we build more than just swimming pools — we create
            spaces where families gather, friends connect, and lasting memories
            are made. With expert craftsmanship and a passion for innovation,
            we bring your vision to life.
          </p>
        </div>

        <div
          className="s4-img-outer"
          style={{
            position:     "relative",
            overflow:     "hidden",
            marginTop:    64,
            marginBottom: 50,
            height:       490,
            width:        "100%",
            flexShrink:   0,
          }}
        >
          <div
            className="s4-img"
            style={{
              position:           "absolute",
              top:                "-20%",
              left:               0,
              width:              "100%",
              height:             "140%",
              backgroundImage:    "url('/parallax-image.webp')",
              backgroundSize:     "cover",
              backgroundPosition: "center 60%",
              willChange:         "transform",
            }}
          />
        </div>
      </div>

    </section>
  );
}