"use client";

import { useState, useRef } from "react";
import FAQAccordion from "../FAQAccordion"; // Adjust path if needed

const FAQ_ITEMS = [
  {
    question: "Do I need a consultation before starting a project?",
    answer:
      "Yes, every project starts with a consultation so we can understand your space, goals, and preferences. We’ll discuss ideas, assess your site if needed, and provide expert recommendations to help you move forward confidently.",
  },
  {
    question: "How much does a new pool or renovation cost?",
    answer:
      "Costs depend on the size, design, and features of your pool. After the consultation, we’ll give you a detailed quote tailored to your needs and budget, with full transparency and no hidden surprises.",
  },
  {
    question: "Which areas do you service?",
    answer:
      "We work across Melbourne and surrounding suburbs. If you’re unsure about your location, get in touch and we’ll let you know if we can help in your area.",
  },
  {
    question: "How long does the process take?",
    answer:
      "Timeframes vary by project. Minor renovations can take 2–4 weeks, while full custom builds may take several months. We’ll provide a clear schedule and regular updates along the way.",
  },
  {
    question: "Can you help with design ideas and planning?",
    answer:
      "Yes, we offer complete design support. Whether you know what you want or need guidance, we’ll help you create a custom design that fits your lifestyle, space, and budget.",
  },
];

interface FAQSectionProps {
  onLayoutChange?: () => void;
}

export default function FAQSection({ onLayoutChange }: FAQSectionProps) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [hasVideoError, setHasVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleCanPlay = () => {
    if (videoRef.current && !isVideoLoaded) {
      const playPromise = videoRef.current.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsVideoLoaded(true);
            onLayoutChange?.();
          })
          .catch(() => {
            setHasVideoError(true);
            setIsVideoLoaded(false);
            onLayoutChange?.();
          });
      } else {
        setIsVideoLoaded(true);
        onLayoutChange?.();
      }
    }
  };

  const handleVideoError = () => {
    setHasVideoError(true);
    setIsVideoLoaded(false);
    onLayoutChange?.();
  };

  return (
    <div className="w-full min-h-screen relative overflow-hidden !bg-black flex items-center justify-center py-12 lg:py-0">
      {/* FALLBACK THUMBNAIL OVERLAY */}
      <div
        className={`absolute inset-0 z-[1] transition-opacity duration-700 ease-in-out pointer-events-none ${
          isVideoLoaded && !hasVideoError ? "opacity-0" : "opacity-100"
        }`}
      >
        <img data-scene-bg
          src="/images/video-thumbnail.webp"
          alt="FAQ Background Thumbnail"
          className="w-full h-full object-cover"
          onLoad={() => onLayoutChange?.()}
          loading="lazy"
        />
      </div>

      {/* BACKGROUND VIDEO LAYER */}
      {!hasVideoError && (
        <video data-scene-bg
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster="/images/video-thumbnail.webp"
          onCanPlay={handleCanPlay}
          onError={handleVideoError}
          className="absolute top-0 left-0 w-full h-full object-cover z-0 pointer-events-none will-change-transform transform-gpu"
          style={{ transform: "translateZ(0)" }}
        >
          <source src="/videos/Grand-Pools-Hero-Video.webm" type="video/webm" />
        </video>
      )}

      {/* GRADIENT OVERLAY */}
      <div
        className="absolute top-0 left-0 w-full h-full backdrop-blur-md z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(60deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.44) 44%, rgba(0, 0, 0, 0) 100%)",
        }}
      />

      {/* Main Content Container */}
      <div className="faq-content section-container relative z-20 w-full min-h-screen lg:min-h-0 lg:h-auto flex flex-col lg:flex-row justify-center lg:justify-between items-start lg:items-center gap-12 lg:gap-8">
        {/* LEFT SIDE — Title */}
        <div className="flex flex-col select-none justify-center w-full lg:w-auto">
          <h2
            className="!text-[#F4EEDF] font-display !font-[100]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Still Have <br /> Questions
          </h2>
        </div>

        {/* RIGHT SIDE — Accordion */}
        <div className="w-full lg:max-w-[650px] flex flex-col justify-center">
          <FAQAccordion items={FAQ_ITEMS} />
        </div>
      </div>
    </div>
  );
}