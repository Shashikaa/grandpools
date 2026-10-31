"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Footer from "../../components/Footer"; // Adjust path if needed

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

export default function ThankYou() {
  useEffect(() => {
    // Purge preloading classes and unlock body scrolling
    document.documentElement.classList.remove("preloading", "show-fade-preloader", "show-brand-preloader");
    document.body.classList.remove("preloading");
    document.documentElement.classList.add("page-thank-you");
  }, []);

  return (
    <div
      id="thank-you-page"
      className="site-root w-full overflow-x-hidden"
      style={{
        background: "linear-gradient(155deg, #0e2724 0%, #08373b 100%)",
      }}
    >
      {/* SECTION 1: Full Screen Hero */}
      <section className="relative flex h-screen min-h-[650px] w-full flex-col items-center justify-center text-center !px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center justify-center text-center max-w-xl mx-auto w-full"
        >
          {/* SVG Graphic (Checkmark Circle) */}
          <motion.div variants={itemVariants} className="mb-6 flex justify-center w-full">
            <svg
              width="120"
              height="120"
              viewBox="0 0 120 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-28 sm:w-32 h-auto mx-auto"
            >
              <circle
                cx="60"
                cy="60"
                r="54"
                stroke="#F4EEDF"
                strokeWidth="6"
                opacity="0.9"
              />
              <path
                d="M38 60L52 74L82 44"
                stroke="#F4EEDF"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-light tracking-tight !mb-8 w-full text-center"
            style={{ color: "#F4EEDF" }}
          >
            Thank You!
          </motion.h1>

          {/* Description Text */}
          <motion.p
            variants={itemVariants}
            className="font-body text-sm sm:text-base font-normal leading-relaxed max-w-md !mb-8 mx-auto text-center"
            style={{ color: "rgba(244, 238, 223, 0.75)" }}
          >
            Your submission has been received successfully. Our team will review your project details and get back to you shortly.
          </motion.p>

          {/* Underlined Button */}
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

      {/* SECTION 2: Footer Section */}
      <section className="relative w-full mt-20 md:mt-32">
        <Footer />
      </section>
    </div>
  );
}