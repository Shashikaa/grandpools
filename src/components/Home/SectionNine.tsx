"use client";

export default function SectionNine() {
  return (
    <section className="s9-section relative w-full h-screen overflow-hidden bg-transparent">
      
      {/* ── BACKGROUND PANELS LAYER ── */}
      <div className="absolute inset-0 z-10 hidden lg:flex flex-col lg:flex-row w-full h-full pointer-events-none">
        {/* LEFT PANEL */}
        <div className="s9-left-side absolute left-0 bottom-0 w-full lg:w-1/2 h-1/2 lg:h-full overflow-hidden pointer-events-auto bg-black">
          <div 
            className="s9-bg-img-left absolute inset-0 bg-cover bg-left w-[200%] h-full "
            style={{ backgroundImage: "url('/secninebg.webp')" }}
          />
          
          <div className="s9-native-title-wrapper-1 absolute top-1/2 right-0 -translate-y-1/2 w-[400px] hidden lg:block">
            <div className="h2  s9-title-part1 text-[#F4EEDF] font-display text-[46px] leading-none text-right whitespace-nowrap select-none">
              Ready to<span className="inline-block w-[12px]">&nbsp;</span>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="s9-right-side absolute right-0 top-0 w-full lg:w-1/2 h-1/2 lg:h-full overflow-hidden pointer-events-auto bg-black">
          <div 
            className="s9-bg-img-right absolute inset-0 bg-cover bg-right w-[200%] h-full "
            style={{ 
              backgroundImage: "url('/secninebg.webp')",
              left: "-100%"
            }}
          />

          <div className="s9-native-title-wrapper-2 absolute top-1/2 left-0 -translate-y-1/2 w-[400px] hidden lg:block">
            <div className="h2 s9-title-part2 text-[#F4EEDF] font-display text-[46px] leading-none text-left whitespace-nowrap select-none">
              Dive In?
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE & TABLET BACKGROUND */}
<div 
  className="s9-bg-mobile absolute inset-0 z-10 block lg:hidden bg-cover bg-center "
  style={{ backgroundImage: "url('/secninebg.webp')" }}
/>
      {/* ── GLOBAL FOREGROUND LAYER FOR UNCLIPPED FLIGHT PATH ── */}
      <div className="s9-global-flight-container absolute inset-0 z-30 hidden lg:block pointer-events-none opacity-0 invisible">
        <div className="s9-flight-wrapper absolute inset-0 text-[#F4EEDF]">
          <div className="s9-flight-part1 h2 absolute left-0 top-0 w-[400px] font-display text-[46px] leading-none text-right whitespace-nowrap">Ready to<span className="inline-block w-[12px]">&nbsp;</span></div>
          <div className="s9-flight-part2 h2 absolute left-0 top-0 w-[400px] font-display text-[46px] leading-none text-left whitespace-nowrap">Dive In?</div>
        </div>
      </div>

      {/* ── INTERACTION LAYER: DESKTOP FLIGHT LANDING TARGETS ── */}
      <div className="absolute inset-0 z-20 hidden lg:block pointer-events-none">
        <div className="absolute bottom-24 right-14 flex flex-col items-end justify-end h-full max-w-[500px]">
          
          {/* TARGET WRAPPER */}
          <div className="s9-target-wrapper relative w-full text-right opacity-0 select-none pointer-events-none">
            <div className="h2 font-display text-[46px] leading-none inline-flex items-center justify-end gap-3 text-[#F4EEDF] whitespace-nowrap">
              <span>Ready to</span>
              <span>Dive In?</span>
            </div>
          </div>

          <div className="h-4 w-full block clear-both" />

          {/* Content Paragraph Framework */}
          <p className="s9-para-desktop max-w-[460px] text-[#F4EEDF] text-right opacity-0 pointer-events-auto !leading-[1.2] !pr-4">
Unwind in a space designed around your lifestyle. From morning laps in clear, sunlit waters to quiet evenings by the poolside, every detail is crafted to offer an effortless escape at home. Take your time, set your own rhythm, and enjoy resort-quality living in your own backyard.
          </p>
        </div>
      </div>

      {/* MOBILE & TABLET OVERLAY LAYER */}
      <div className="absolute top-32 right-6 md:right-10 z-40 flex flex-col items-end lg:hidden max-w-[320px] md:max-w-[450px] pointer-events-none">
        <h2 className="h2 s9-title text-[#F4EEDF] font-display text-3xl md:text-4xl text-right w-full !mb-5">
          Ready to Dive In?
        </h2>
        <p className="s9-para-mobile text-[#F4EEDF] font-body text-right text-sm md:text-base leading-relaxed">
Unwind in a space designed around your lifestyle. From morning laps in clear, sunlit waters to quiet evenings by the poolside, every detail is crafted to offer an effortless escape at home. Take your time, set your own rhythm, and enjoy resort-quality living in your own backyard.
        </p>
      </div>

    </section>
  );
}