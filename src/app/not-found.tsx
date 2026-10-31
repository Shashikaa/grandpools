"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Footer from "../components/Footer"; // Adjust path if needed

const EASE = [0.16, 1, 0.3, 1] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: EASE },
  },
};

export default function NotFound() {
  useEffect(() => {
    // Instantly purge preloading classes and unlock body scrolling
    document.documentElement.classList.remove("preloading", "show-fade-preloader", "show-brand-preloader");
    document.body.classList.remove("preloading");
    document.documentElement.classList.add("page-404");
  }, []);

  return (
    <div
      id="not-found-page"
      className="site-root w-full overflow-x-hidden"
      style={{
        background: "linear-gradient(155deg, #0e2724 0%, #08373b 100%)",
      }}
    >
      {/* SECTION 1: Full Screen 404 Hero */}
      <section className="relative flex h-screen min-h-[650px] w-full flex-col items-center justify-center text-center !px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center justify-center text-center max-w-xl mx-auto w-full"
        >
          {/* SVG Graphic (4 - UFO - 4) */}
          <motion.div variants={itemVariants} className="mb-6 flex justify-center w-full">
            <svg
              width="320"
              height="230"
              viewBox="0 0 220 130"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-48 sm:w-56 h-auto mx-auto"
            >
              {/* Left 4 */}
              <path
                d="M35 95V25L10 65H50"
                stroke="#F4EEDF"
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.9"
              />
              {/* Center UFO */}
              <g transform="translate(70, 10)">
                {/* Light Beam */}
                <polygon points="40,35 12,105 68,105" fill="rgba(244, 238, 223, 0.15)" />
                {/* Light Pool Base */}
                <ellipse cx="40" cy="105" rx="28" ry="7" fill="rgba(244, 238, 223, 0.3)" />
                {/* Glass Dome */}
                <path d="M26 35 C26 18, 54 18, 54 35 Z" fill="#F4EEDF" opacity="0.95" />
                {/* Saucer Ring */}
                <ellipse cx="40" cy="38" rx="36" ry="9" fill="#08373b" stroke="#F4EEDF" strokeWidth="3.5" />
              </g>
              {/* Right 4 */}
              <path
                d="M185 95V25L160 65H200"
                stroke="#F4EEDF"
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.9"
              />
            </svg>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-light tracking-tight !mb-8 w-full text-center"
            style={{ color: "#F4EEDF" }}
          >
            Page Not Found
          </motion.h1>

          {/* Description Text */}
          <motion.p
            variants={itemVariants}
            className="font-body text-sm sm:text-base font-normal leading-relaxed max-w-md !mb-8 mx-auto text-center"
            style={{ color: "rgba(244, 238, 223, 0.75)" }}
          >
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </motion.p>

          {/* Previous Style Underlined Button */}
          <motion.div variants={itemVariants} className="flex justify-center w-full">
<a
  href="/"
  className="hero-contact-btn group btn-underline font-body"
>
  Back to Home
</a>
          </motion.div>
        </motion.div>
      </section>

      {/* SECTION 2: Footer Section with Gap */}
      <section className="relative w-full mt-20 md:mt-32">
        <Footer />
      </section>
    </div>
  );
}