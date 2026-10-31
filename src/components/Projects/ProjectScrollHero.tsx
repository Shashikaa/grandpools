"use client";
import { responsiveBackground } from "../ResponsiveImage";

interface ProjectScrollHeroProps {
  title: string;
  description?: string;
  images: string[];
}

export default function ProjectScrollHero({
  title,
  description,
  images,
}: ProjectScrollHeroProps) {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#131313] p-8 md:p-16 flex items-end project-hero-master section-container">
      {/* Dynamic Stacking of Passed Images */}
      {images.map((src, index) => (
        <div
          key={`${src}-${index}`}
          className="hero-image-layer absolute inset-0 w-full h-full overflow-hidden"
          style={{
            zIndex: index + 10,
            clipPath:
              index === 0
                ? "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
                : "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
          }}
        >
          <div
            data-scene-bg className="responsive-background hero-image-inner hero-bg-anim hero-bg-target w-full h-full bg-cover bg-center will-change-transform"
            style={{
              ...responsiveBackground(src),
              transformOrigin: "center center",
            }}
          />
        </div>
      ))}

      {/* Gradient Overlay for Readable Text */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none hero-gradient-overlay"
        style={{ zIndex: 100 }}
      />

      {/* Typography Container */}
      <div className="hero-text-wrap relative max-w-3xl w-full z-[101] pointer-events-none flex flex-col gap-4 lg:gap-8 pb-4 will-change-[opacity,transform]">
        {/* Title */}
        <h1 className="hero-title hero-text-target hero-title-target text-white font-display text-4xl md:text-6xl font-bold tracking-tight">
          {title}
        </h1>

        {/* Description right under title */}
        {description && (
          <p className="hero-description hero-text-target hero-desc-target text-white/85 text-base md:text-xl font-normal leading-relaxed max-w-sm">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}