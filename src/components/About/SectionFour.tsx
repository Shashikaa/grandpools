"use client";



export default function SectionFour() {
  const overlayColor = "rgba(25, 33, 28, 0.24)";
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Desktop image with color overlay */}
      <div
        data-scene-bg className="s1-bg s4-img-bg absolute -top-[10%] left-0 right-0 h-[135%] bg-cover bg-center will-change-transform transform-gpu backface-hidden hidden lg:block"
        style={{
          backgroundImage: `linear-gradient(${overlayColor}, ${overlayColor}), url('/about.webp')`,
          transform: "translate3d(0, 0%, 0) scale(1.15)",
        }}
      />

      {/* Mobile + Tablet image with color overlay */}
      <div
        data-scene-bg className="s1-bg s4-img-bg absolute -top-[10%] left-0 right-0 h-[135%] bg-cover bg-top will-change-transform transform-gpu backface-hidden block lg:hidden"
        style={{
          backgroundImage: `linear-gradient(${overlayColor}, ${overlayColor}), url('/about-mob.webp')`,
          transform: "translate3d(0, 0%, 0) scale(1.15)",
        }}
      />

      {/* Black Overlay */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none z-[1] transform-gpu backface-hidden" />

      <div className="section-container relative z-[1] h-full flex items-start lg:items-end !pb-26 md:!pb-32 lg:!pb-50 !pt-42 md:!pt-32 lg:!pt-32">
        <div className="w-full max-w-[250px] md:max-w-[340px] lg:max-w-[360px] h-auto md:h-[148px] lg:h-[164px] flex flex-col justify-center gap-4 will-change-transform">
          <p className="reveal-text text-[#F4EEDF] font-body font-normal">
            Built with premium materials and proven techniques, each pool is tailored to your vision and space, with clear communication to keep the process smooth from start to finish.
          </p>
        </div>
      </div>
    </section>
  );
}