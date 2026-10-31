"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "@/src/components/Footer";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const policySections = [
  {
    title: "Terms & Conditions of Engagement",
    content:
      "By using this website, requesting design quotes, or engaging with our pool design services, you agree to be bound by these Terms & Conditions of Engagement. If you do not agree with any part of these terms, you must refrain from using our platform and services.",
  },
  {
    title: "Intellectual Property Rights",
    content:
      "All custom pool designs, imagery, brand copy, architectural renderings, and digital media hosted on this site are the exclusive intellectual property of Grand Pools. Unauthorised copying, distribution, or reproduction is strictly prohibited.",
  },
  {
    title: "Privacy Policy & Data Collection",
    content:
      "Grand Pools collects personal information—including names, email addresses, phone numbers, and site location details—strictly to process site consultations, project quotes, and architectural inquiries. Your data is stored securely and is never sold to third-party marketing brokers.",
  },
  {
    title: "Cookie & Tracking Policy",
    content:
      "We use essential and analytical cookies to improve site performance, measure audience traffic, and refine project showcase assets. You can manage or disable cookie preferences directly through your browser settings without restricting core site functionality.",
  },
  {
    title: "Third-Party Services & Integrations",
    content:
      "Certain functionality, including analytics tools and interactive booking forms, may rely on trusted third-party providers. These external platforms adhere to strict data security standards aligned with privacy compliance regulations.",
  },
  {
    title: "Updates to Policy Terms",
    content:
      "Grand Pools reserves the right to amend or update these policies periodically to reflect evolving legal guidelines or operational requirements. We recommend reviewing this page periodically to remain informed of any updates.",
  },
];

export default function TermsPage() {
  const scopeRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const scrollContentRef = useRef<HTMLDivElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const scrollThumbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 0px)", () => {
        const section = sectionRef.current;
        const wrapper = scrollWrapperRef.current;
        const content = scrollContentRef.current;
        const track = scrollTrackRef.current;
        const thumb = scrollThumbRef.current;

        if (!section || !wrapper || !content) return;

        // Dynamic scrollable distance getter for smooth re-calculation on resize
        const getScrollAmount = () =>
          Math.max(0, content.scrollHeight - wrapper.clientHeight);

        const getThumbTravel = () => {
          if (!track || !thumb) return 0;
          return Math.max(0, track.clientHeight - thumb.clientHeight);
        };

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${getScrollAmount()}`,
            pin: true,
            scrub: 1.2,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });

        // 1. Scroll content upward smoothly as page pins
        tl.to(
          content,
          {
            y: () => -getScrollAmount(),
            ease: "none",
          },
          0
        );

        // 2. Synchronize track thumb movement relative to active scroll
        if (track && thumb) {
          tl.to(
            thumb,
            {
              y: () => getThumbTravel(),
              ease: "none",
            },
            0
          );
        }
      });
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const background = scopeRef.current?.querySelector('.hero-bg');
        if (background) gsap.timeline({ scrollTrigger: {
          trigger: scopeRef.current, start: 'top top', end: 'bottom bottom',
          scrub: true, invalidateOnRefresh: true,
        } }).fromTo(background, { scale: 1.075 }, { scale: 1.015, duration: 0.65, ease: 'none' })
          .to(background, { scale: 1.055, duration: 0.35, ease: 'none' });
      }
    }, scopeRef);

    // Refresh triggers after full DOM mount & style evaluation
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={scopeRef}>
      <main className="relative w-full bg-[#10221C] min-h-svh">
        {/* Fixed Background Image */}
        <div
          className="hero-bg-wrapper fixed inset-0 w-full h-full z-0 pointer-events-none overflow-hidden"
          style={{ clipPath: "inset(0% 0% 0% 0%)" }}
        >
          <div
            className="hero-bg absolute inset-0 bg-cover bg-center bg-[url('/Background.svg')]"
            style={{ transform: "scale(1)", transformOrigin: "center center" }}
          />
        </div>

        {/* Full Screen Policy Section */}
        <section
          ref={sectionRef}
          className="hero relative w-full h-svh bg-transparent overflow-hidden z-10 flex flex-col justify-between"
        >
          {/* Main Container */}
          <div className="section-container relative h-full w-full flex flex-col lg:flex-row justify-between gap-6 lg:gap-16 px-6 lg:px-16 pt-16 lg:pt-20 pb-6 lg:pb-20 min-h-0 flex-1">
            {/* Left Column */}
            <div className="w-full lg:w-1/2 flex flex-col justify-between shrink-0">
              <div>
                <h1 className="font-display text-[#F4EEDF] text-3xl sm:text-5xl lg:text-6xl leading-tight select-none">
                  Terms of Use
                </h1>
                <p className="font-body text-[#F4EEDF] !mt-6 lg:mt-6 !mb-4 max-w-md text-xs sm:text-base leading-relaxed ">
                  These Terms of Use detail the terms, conditions, and service
                  agreements governing our interactions with clients, website
                  visitors, and project partners. Here you can find clear
                  information about engagement rules, client obligations,
                  intellectual property rights, and legal responsibilities.
                </p>
              </div>

{/* Desktop Contact Details & Back Button */}
<div className="hidden lg:flex flex-col gap-12 font-body text-[#F4EEDF] text-sm sm:text-base">
  <div className="flex flex-col gap-4">
    <div>
      <h2 className="!text-base font-bold tracking-wide text-[#F4EEDF]">
        Legal & Privacy Inquiries
      </h2>
    </div>

    {/* Icons Row */}
    <div className="flex items-center gap-4">
      <a
        href="mailto:admin@grandpools.com.au"
        aria-label="Email"
        className="hover:opacity-75 transition-opacity duration-200"
      >
        <img
          src="/email.svg"
          alt="Email"
          className="w-5 h-5 object-contain"
        />
      </a>
      <a
        href="https://www.instagram.com/grandpools_aus/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className="hover:opacity-75 transition-opacity duration-200"
      >
        <img
          src="/ig.svg"
          alt="Instagram"
          className="w-6 h-6 object-contain"
        />
      </a>
    </div>
  </div>

  {/* Desktop-only Back to Home Link */}
  <div>
    <Link
      href="/"
      className="group btn-underline font-body"
    >
      BACK TO HOME
    </Link>
  </div>
</div>
            </div>

            {/* Right Column with Scrollable Content */}
            <div className="w-full lg:w-5/12 flex flex-row gap-4 flex-1 min-h-0 relative items-stretch my-2 lg:my-0">
              {/* Content Wrapper */}
              <div
                ref={scrollWrapperRef}
                className="w-full h-full overflow-hidden relative"
              >
                <div
                  ref={scrollContentRef}
                  className="w-full flex flex-col gap-8 lg:gap-10 text-[#F4EEDF] pb-24 transform-gpu will-change-transform"
                >
                  {policySections.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col gap-2 lg:gap-3 shrink-0"
                    >
                      <h2 className="!text-base sm:!text-lg lg:!text-xl font-body font-medium tracking-wide text-[#F4EEDF]">
                        {item.title}
                      </h2>
                      <p className="font-body text-[#F4EEDF]/90 text-xs sm:text-sm leading-relaxed max-w-md">
                        {item.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Custom GSAP Scrollbar Track & Thumb */}
              <div
                ref={scrollTrackRef}
                className="w-1 rounded-full h-full bg-[#F4EEDF]/20 relative overflow-hidden shrink-0"
              >
                <div
                  ref={scrollThumbRef}
                  className="w-full h-10 bg-[#F4EEDF] rounded-full absolute top-0 left-0 transform-gpu will-change-transform"
                />
              </div>
            </div>

            {/* Mobile Contact Info */}
            <div className="flex lg:hidden flex-col gap-3 font-body text-[#F4EEDF] pt-0 !mt-4 shrink-0 z-20 w-full">
              <h3 className="text-xs sm:text-sm font-bold tracking-wide text-[#F4EEDF]">
                Terms & Legal Inquiries
              </h3>
              {/* Left-Aligned Icons Row */}
              <div className="flex items-center gap-4">
                <a
                  href="mailto:admin@grandpools.com.au"
                  aria-label="Email"
                  className="hover:opacity-75 transition-opacity duration-200"
                >
                  <img
                    src="/email.svg"
                    alt="Email"
                    className="w-4 h-4 object-contain"
                  />
                </a>
                <a
                  href="https://www.instagram.com/grandpools_aus/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="hover:opacity-75 transition-opacity duration-200"
                >
                  <img
                    src="/ig.svg"
                    alt="Instagram"
                    className="w-5 h-5 object-contain"
                  />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <div className="footer-section-row relative w-full z-10 bg-transparent">
          <Footer />
        </div>
      </main>
    </div>
  );
}