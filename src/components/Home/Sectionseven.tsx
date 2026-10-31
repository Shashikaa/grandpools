"use client";

// Partners logo array
const PARTNERS = [
  { name: "Socure", logo: "/partners/logo1.svg" },
  { name: "Cedar", logo: "/partners/logo2.svg" },
  { name: "Airtable", logo: "/partners/logo3.svg" },
  { name: "Culture Amp", logo: "/partners/logo4.svg" },
];

const PARTNERS_LOOP = [...PARTNERS, ...PARTNERS];

export default function SectionSeven() {
  return (
    <section className="relative w-full h-full overflow-hidden">

      {/* ── Desktop BG ── */}
      <div
        className="s7-bg-img absolute bg-cover bg-center hidden lg:block"
        style={{
          backgroundImage: "url('/meetexpert.webp')",
          top: 0, left: 0, width: "100%", height: "120%",
          willChange: "transform",
        }}
      />

      {/* ── Mobile/Tablet BG ── */}
      <div
        className="s7-mob-bg absolute bg-cover bg-center block lg:hidden"
        style={{
          backgroundImage: "url('/secninemob.jpg')",
          top: 0, left: 0, width: "100%", height: "100%",
          transform: "scale(1.35)",
          transformOrigin: "center center",
          clipPath: "inset(0)",
          willChange: "transform",
        }}
      />

      <div 
        className="absolute inset-0 w-full h-full pointer-events-none bg-gradient-to-tl from-black/30 via-black/20 to-black/10"
        aria-hidden="true"
      />

      {/* ── Desktop: Title + Card ── */}
      <div
        className="hidden lg:flex absolute flex-col gap-3 z-10"
        style={{ top: "16%", left: "50%", width: 620 }}
      >
        <h2
          className="text-[#F4EEDF] font-[100] s7-title reveal-text"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Meet the Experts
        </h2>

        <div className="flex flex-col gap-0.5 !px-[32px] !py-[30px] max-w-[340px] !mt-2">
          <h3 className="s7-para font-body text-[#F4EEDF] text-[14px] font-normal reveal-text">
            Lachlan Deleeuw
          </h3>
          <p className="s7-para text-[#F4EEDF] text-[14px] mt-2 reveal-text">
            Founder – Grand Pools
          </p>
          <p className="s7-para font-body text-[#F4EBE4] text-[14px] font-normal leading-snug !mt-6 w-full reveal-text">
            Grand Pools founder Lachlan Deleeuw brings expert craftsmanship and tailored creativity to luxury pool builds, transforming backyards across Melbourne and the Bayside Region.
          </p>
        </div>
      </div>

      {/* ── Desktop: Partners Slider ── */}
      <div className="hidden lg:flex absolute bottom-20 right-12 flex-col items-end gap-6 z-10">
        <h3 className="font-body text-[#F4EBE4] text-xl font-bold tracking-wide">
          Our Partners
        </h3>
        <div
          className="overflow-hidden w-[600px]"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          }}
        >
          <div className="flex items-center gap-10 w-max animate-marquee">
            {PARTNERS_LOOP.map((p, i) => (
              <div key={i} className="flex flex-shrink-0 items-center justify-center">
                <img 
                  src={p.logo} 
                  alt={p.name}
                  className="block w-auto h-8 object-contain"
                  style={{ filter: "brightness(0) invert(1)" }} 
                  loading="lazy" 
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ════════════════════
          MOBILE + TABLET LAYOUT
      ════════════════════ */}
      <div className="lg:!hidden !flex !absolute !inset-0 !flex-col !justify-between !py-[72px] !m-0 !max-w-none !w-full z-10">

        {/* Title + card — left-aligned */}
        <div className="!flex !flex-col !items-left !gap-4 !pl-6">
          <h2
            className="h2 !text-[#F4EEDF] !font-[100] !text-left !m-0 !mt-12"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Meet the Expert
          </h2>

          <div className="!w-[340px] !max-w-[340px] !flex !flex-col !mt-2">
            <h3 className="!text-[#F4EEDF] !text-[14px] !font-normal !m-0">Lachlan Deleeuw</h3>
            <p className="!text-[#F4EEDF] !text-[14px] !mt-2.5 !mb-0">Founder – Grand Pools</p>
            <p className="!text-[#F4EBE4] !text-[14px] !font-normal !leading-snug !mt-4 !mb-0">
              Lachlan Deleeuw brings expert craftsmanship and tailored creativity to
              luxury pool builds, transforming backyards across Melbourne and the
              Bayside Region.
            </p>
          </div>
        </div>

        {/* Mobile: Partners Slider */}
        <div className="!flex !flex-col !items-end !gap-4 !px-6">
          <h3 className="!text-[#F4EBE4] !text-[18px] !font-normal !m-0">Our Partners</h3>
          <div
            className="!overflow-hidden !w-[380px]"
            style={{
              maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
              WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            }}
          >
            <div className="flex gap-7 w-max animate-marquee">
              {PARTNERS_LOOP.map((p, i) => (
                <div key={i} className="!flex-shrink-0">
                  <img 
                    src={p.logo} 
                    alt={p.name}
                    className="!block !w-[100px] !h-[32px] !object-contain"
                    style={{ filter: "brightness(0) invert(1)" }} 
                    loading="lazy" 
                  />
                </div>
              ))}
            </div>
          </div>
        </div> 

      </div>

    </section>
  );
}