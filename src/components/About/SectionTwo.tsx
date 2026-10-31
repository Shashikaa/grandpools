"use client";

export default function SectionTwo() {
  return (
    <section className="relative w-full h-full overflow-hidden">

      {/* ── Full bleed background image ── */}
      <div
        data-scene-bg className="s2-bg absolute inset-0 bg-cover bg-center will-change-transform bg-[url('/aboutsec3.webp')] lg:bg-[url('/aboutsec3.webp')]"
      />
{/* ── Black Overlay ── */}
      <div 
        className="absolute inset-0 bg-black/50 pointer-events-none " 
      />
      {/* ── Left bottom layout wrapper (Card container styling removed) ── */}
      <div
        className="absolute z-10 bottom-16 left-[20px] md:left-[30px] lg:!left-[80px] flex flex-col gap-6 w-[80vw] max-w-[400px] lg:w-full lg:max-w-[490px]"
      >
        <div className="flex flex-col gap-3">
          <h2
            className=" !font-[100] text-[#FFFFFF] !leading-[1.2] reveal-text"
            style={{ fontFamily: "var(--font-display)" }}
          >
            A Passion for Pools
          </h2>
          <p
            className=" text-[#FFFFFF] reveal-text"
            style={{ fontFamily: "var(--font-body)" }}
          >
            A Commitment to Quality
          </p>
        </div>

        <p
          className=" text-[#FFFFFF] !mt-2 !mb-6 lg:!mt-8 reveal-text"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Founded in 2021, Grand Pools combines 25+ years of experience to
          design and build exceptional pools, delivering quality craftsmanship,
          innovative solutions, and personalised service for residential and
          commercial projects across Melbourne.
        </p>
      </div>

    </section>
  ); 
}