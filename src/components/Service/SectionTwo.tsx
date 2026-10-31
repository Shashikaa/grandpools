"use client";

import RollingText from "@/src/components/RollingText";

import { useRef, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDesktopText } from "../motion/useDesktopText";
import Link from "next/link";
import gsap from "gsap";

interface Slide {
  img: string;
  mobileImg?: string;
  label: string;
  desc: string;
  href: string;
}

const slides: Slide[] = [
  {
    img: "/pool-courtyard-bg.webp",
    mobileImg: "/pool-courtyard-bg-mobile.webp", // Mobile-specific image path
    label: "Residential Pool Construction",
    desc: "Whether you’re creating a peaceful backyard retreat or a space made for entertaining, we bring your vision to life with tailored design, expert craftsmanship, and a clear process from start to finish.",
    href: "/services/residential-pools-construction",
  },
  {
    img: "/terrace2-bg.webp",
    mobileImg: "/terrace2-bg-mobile.webp", // Mobile-specific image path
    label: "Pool Equipment & Installation",
    desc: "From pumps and filters to heating systems and automation, we supply and install the latest pool equipment to keep your pool running smoothly.",
    href: "/services/pool-equipment-and-installation",
  },
  {
    img: "/terrace-bg.webp",
    mobileImg: "/terrace-bg-mobile.webp", // Mobile-specific image path
    label: "Commercial Pool Construction",
    desc: "We design and build large-scale pools for hotels, resorts, apartment complexes, and public facilities, delivering premium quality and durability.",
    href: "/services/commercial-pool-construction",
  },
];

type SectionTwoProps = {
  isActive: boolean;
  activeSlideIndex: number;
  onSelectSlide?: (index: number) => void;
};

const textLineVariants = {
  hidden: { y: "100%", opacity: 0 },
  visible: (delay: number) => ({
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.45,
      delay: 0.15 + delay,
      ease: [0.25, 1, 0.5, 1] as any,
    },
  }),
  exit: {
    y: "-50%",
    opacity: 0,
    transition: { duration: 0.2, ease: "easeIn" as any },
  },
};

export default function SectionTwo({
  activeSlideIndex,
  onSelectSlide,
}: SectionTwoProps) {
  const desktopText = useDesktopText();
  const imageRoot = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const layers = imageRoot.current?.querySelectorAll<HTMLElement>('.service-image-layer');
    if (!layers) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    layers.forEach((layer,i) => gsap.to(layer,{clipPath:i <= activeSlideIndex ? 'inset(0% 0% 0% 0%)' : 'inset(0% 100% 0% 0%)',duration:reduced ? 0 : 1.05,ease:'power2.inOut',overwrite:true}));
    return () => { gsap.killTweensOf(layers); };
  },[activeSlideIndex]);
  const copyVariants = desktopText ? textLineVariants : {
    hidden: { y: 0, opacity: 0, transition: { duration: 0.4 } },
    visible: { y: 0, opacity: 1, transition: { duration: 0.55 } },
    exit: { y: 0, opacity: 0, transition: { duration: 0.35 } },
  };
  const activeSlide = slides[activeSlideIndex] || slides[0];
  return (
    <div className="w-full h-full relative overflow-hidden bg-[#19211C]">
      <div ref={imageRoot} className="absolute inset-0 overflow-hidden">
        {slides.map((slide,i) => <div key={slide.href} className="service-image-layer absolute inset-0 overflow-hidden"
          style={{zIndex:i+1,clipPath:i===0?'inset(0% 0% 0% 0%)':'inset(0% 100% 0% 0%)'}}>
          <picture><source media="(max-width:1024px)" srcSet={slide.mobileImg || slide.img}/>
            <img data-scene-bg src={slide.img} alt={slide.label} className="absolute inset-0 h-full w-full object-cover" loading={i===0?'eager':'lazy'} decoding="async"/>
          </picture>
          <div className="absolute inset-0 bg-gradient-to-t from-[#19211C]/95 via-[#19211C]/25 to-transparent"/>
        </div>)}
      </div>

      {/* ── 2. STAGGERED TEXT CONTENT ── */}
      <div className="absolute bottom-[10%] left-[5%] md:left-[8%] right-[5%] z-30 pointer-events-none max-w-7xl">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeSlideIndex}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col items-start gap-4 md:gap-6 lg:gap-8"
          >
            {/* Title with Masked Reveal */}
            <div className="overflow-visible lg:overflow-hidden py-1">
              <motion.h2
                custom={0}
                variants={copyVariants}
                className="font-display text-[#F4EEDF] text-3xl md:text-5xl lg:text-[70px] !leading-[1] font-light"
              >
                {activeSlide.label}
              </motion.h2>
            </div>

            {/* Description Bar & Right-aligned Button */}
            <div className="w-full flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div className="flex flex-row items-stretch gap-4 md:gap-6">
                {/* Active Indicator Bars */}
                <div className="flex flex-col gap-[4px] py-1 justify-center pointer-events-auto">
                  {slides.map((_, barIdx) => (
                    <div
                      key={barIdx}
                      onClick={() => onSelectSlide?.(barIdx)}
                      className={`w-[2px] cursor-pointer transition-all duration-500 ease-out ${
                        activeSlideIndex === barIdx
                          ? "bg-white h-5 opacity-100"
                          : "bg-white/30 h-3 opacity-40 hover:opacity-75"
                      }`}
                    />
                  ))}
                </div>

                {/* Description */}
                <div className="flex-1 overflow-visible lg:overflow-hidden py-1">
                  <motion.p
                    custom={0.1}
                    variants={copyVariants}
                    className="font-body text-[#F4EEDF] text-[13px] md:text-[16px] leading-relaxed max-w-[420px]"
                  >
                    {activeSlide.desc}
                  </motion.p>
                </div>
              </div>

              {/* Bottom-Right Link */}
              <div className="overflow-hidden py-1 self-start sm:self-end pointer-events-auto">
                <motion.div custom={0.2} variants={copyVariants}>
                  <Link
                    href={activeSlide.href}
                    className="group btn-underline font-body text-[#F4EEDF]"
                  ><RollingText>LEARN MORE</RollingText></Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}