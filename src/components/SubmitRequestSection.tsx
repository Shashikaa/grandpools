"use client";

import CtaForm from "./CtaForm";

type SubmitRequestSectionProps = {
  onClose?: () => void;
};

export default function SubmitRequestSection({
  onClose,
}: SubmitRequestSectionProps) {
  return (
    <section className="about-section-cta section-cta relative z-[10000] min-h-[100dvh] w-full overflow-hidden lg:!hidden">
      {/* Floating Close Button */}
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="!fixed !right-4 !top-4 !z-[50] !flex !cursor-pointer !items-center !justify-center !border-none !bg-transparent !p-1.5 !opacity-85 !transition-[opacity,transform] !duration-200 !ease-in-out hover:!rotate-90 hover:!opacity-100 active:!scale-90 active:!opacity-100 md:!right-12 md:!top-8"
        >
          <img
            src="/closebtn.svg"
            alt=""
            aria-hidden="true"
            className="!block !h-6 !w-6 !object-contain md:!h-7 md:!w-7" loading="lazy" />
        </button>
      )}

      {/* Mobile and Tablet Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] h-full w-full"
      >
        <img
          src="/CTAmob.webp"
          alt=""
          className="h-full w-full object-cover" loading="lazy" />
      </div>

      {/* Mobile and Tablet Layout */}
      <div
        className="cta-inner-mobile relative z-10 flex min-h-[100dvh] w-full flex-col items-start justify-start !py-20 md:justify-center"
        style={{
          paddingLeft: "20px",
          paddingRight: "20px",
          margin: 0,
        }}
      >
        <div className="w-full">
          {/* Visual title—not an SEO heading */}
          <div
            aria-hidden="true"
            className="h2 font-display !max-w-[300px] md:!max-w-[430px]"
            style={{
              color: "#F4EEDF",
              margin: 0,
              marginBottom: 20,
              textAlign: "left",
            }}
          >
Your Dream Pool Starts Here  
          </div>

          <p
            className="font-body max-w-[500px]"
            style={{
              color: "#F4EEDF",
              margin: 0,
              marginBottom: 20,
              textAlign: "left",
            }}
          >
            Let&apos;s bring your vision to life with a custom-designed pool
            crafted for your space and lifestyle. Reach out to get started
            today.
          </p>

          <div className="w-full text-left">
            <CtaForm isMobile={true} nameSuffix="modal-mobile" />
          </div>
        </div>
      </div>
    </section>
  );
}