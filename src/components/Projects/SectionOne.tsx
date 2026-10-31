"use client";

import Image from "next/image";

export default function SectionOne() {
  return (
    <section className="w-full min-h-[100svh] h-auto md:h-auto bg-[#F4EEDF] py-12 md:py-32 lg:py-48 px-6 md:px-12 lg:px-20 text-[#111] flex items-center">
      <div className="w-full h-full md:h-auto flex flex-col justify-start items-stretch section-container">
        
        {/* Row 1: Right-Aligned Title */}
        <div className="w-full flex justify-end !mb-12 lg:!mb-8">
          <h2 
            className="reveal-text !font-[100] text-left lg:text-right" 
            style={{ fontFamily: "var(--font-display)" }}
          >
            Explore Our Projects
          </h2>
        </div>

        {/* Row 2: Paragraph Aligned Under the Title Block */}
        <div className="w-full flex justify-start !mb-15 lg:!mb-24">
          <p className="reveal-text max-w-[340px] text-left text-sm md:text-base">
            Browse through our collection of custom-built pools, each crafted to suit the unique needs and style of our clients.
          </p>
        </div>

        {/* Row 3: Centered Image Container */}
        <div className="w-full flex justify-center items-center">
          <div className="relative w-full h-[45svh] md:h-auto md:aspect-[4/3] max-h-[650px] overflow-hidden">
            
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <Image
                src="/camberwell5.webp" 
                alt="Aerial view of custom pool"
                width={2000}
                height={1500}
                priority
                className="parallax-img-asset w-full h-full object-cover object-center scale-[1.3] will-change-transform"
                sizes="(max-width: 1024px) 100vw, 2000px"
              />
            </div>
            
          </div>
        </div>

      </div>
    </section>
  );
}