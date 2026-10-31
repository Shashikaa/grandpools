"use client";

const CARDS = [
  {
    title: "Email Us",
    description: "Send us a message and we will get back to you as soon as possible.",
    value: "admin@grandpools.com.au",
    href: "mailto:admin@grandpools.com.au",
    isExternal: false,
  },

  {
    title: "Follow Us",
    description: "Explore our latest pool designs, project updates, and inspiration on Instagram.",
    value: "@grandpool_aus",
    href: "https://www.instagram.com/grandpools_aus/",
    isExternal: true,
  },
];

export default function SectionOne() {
  return (
    <div className="w-full min-h-screen md:min-h-auto  md:h-full relative overflow-hidden bg-black">
      {/* Background Image Layer */}
<div
  data-scene-bg className="contact-one-bg absolute top-0 left-0 w-full h-[100%] lg:h-[200%] bg-cover bg-bottom lg:bg-center bg-no-repeat will-change-transform"
  style={{ backgroundImage: "url('/contactparalax.webp')" }}
/>
      
      {/* Main Layout Grid Context */}
      <div className="section-container relative z-10 w-full h-auto lg:h-full flex flex-col lg:flex-row items-stretch justify-center lg:justify-between gap-12 lg:gap-0">
        
        {/* LEFT SIDE — Static Title Block */}
        <div className="contact-one-left flex flex-col gap-2 lg:gap-4 justify-start pb-4 select-none lg:!pt-22">
          <h2
            className="contact-one-title text-[#F4EEDF] !font-[100]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Get in Touch
          </h2>
          <p className="contact-one-subtitle text-[#F4EEDF]">
            With Our Team
          </p>
        </div>

        {/* RIGHT SIDE — Relative Frame Container */}
        <div className="relative w-full lg:w-[372px] h-auto lg:h-full">
          {/* Master Scrolling Content Column */}
          <div className="contact-right-scroll-track relative lg:absolute top-0 right-0 w-full flex flex-col will-change-transform">
            
            {/* 1. Intro Paragraph Block */}
            <div className="w-full flex flex-col justify-start lg:justify-end text-left lg:text-right !pb-8 lg:!pb-16 h-auto lg:h-[calc(100vh-120px)]">
              <p className="text-[#F4EEDF]">
                Have a question or want to discuss your project? Contact us by  email, or connect with us on Instagram. We’re always happy to help.
              </p>
            </div>

            {/* 2. Cards Group Layer */}
            <div className="contact-cards-container flex flex-col gap-12 lg:gap-16 w-full pt-4 lg:pt-12">
              {CARDS.map((card) => (
                <div
                  key={card.title}
                  className="w-full flex flex-col text-left pr-0 lg:!pr-16"
                >
                  <div className="text-[#F4EEDF]">
                    <p className="!text-[20px] text-[#F4EEDF] !mb-2">
                      {card.title}
                    </p>
                    <p className="font-light leading-relaxed !mb-3 text-[#F4EEDF]">
                      {card.description}
                    </p>
                    <a
                      href={card.href}
                      target={card.isExternal ? "_blank" : undefined}
                      rel={card.isExternal ? "noopener noreferrer" : undefined}
                      className="group font-light tracking-wide inline-flex items-center gap-2 text-[#F4EEDF]"
                    >
                      <span className="group-hover:underline underline-offset-4">
                        {card.value}
                      </span>
                      <span aria-hidden="true">→</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}