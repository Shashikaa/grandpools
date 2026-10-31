"use client";

import { useRef, useState, useEffect } from "react";
// Import the updated WaveCanvas component that handles combined Image + Video liquid calculations
import WaveCanvas from "../WaveCanvas"; 

export default function SectionFive() {
  const sectionRef = useRef<HTMLElement>(null);
  const [canvasLoaded, setCanvasLoaded] = useState(false);
  const [offscreen, setOffscreen] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setOffscreen(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-5 absolute inset-0 w-full h-full overflow-hidden z-10 [will-change:transform] [transform:translateZ(0)] [backface-visibility:hidden]"
    >
      {/* Background Layer Group */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        
        {/* WebGL Wave Canvas Container 
          The static <img> tag is gone. The image is now fully processed on the GPU inside the canvas, 
          fading in smoothly with 100% visibility once the asset shaders compile.
        */}
        <div 
          className="absolute inset-0 w-full h-full transition-opacity duration-700"
          style={{ 
            zIndex: 1,
            opacity: canvasLoaded ? 1 : 0, 
          }}
        >

          <WaveCanvas 

            onReady={() => setCanvasLoaded(true)} 
          />
        </div>
        
      </div>

      {/* Text Overlay Content */}
      <div className="absolute inset-0 z-[2] flex flex-col items-center justify-center gap-10 md:gap-20 pointer-events-none text-center">
        <div className="flex flex-col gap-2">
          <h2
            className="s5-title font-display !font-[100] text-[#F4EEDF]"
          >
            Crafting Stunning Pools
          </h2>
        </div>

        <p
          className="s5-body font-body text-[#F4EBE4] w-full !w-[400px] md:!w-[400px] lg:!w-[400px] !text-[14px] md:!text-[16px]"
        >
          With expert craftsmanship and attention to detail, we bring your vision
          to life. Whether you need a backyard retreat or a high-end commercial
          pool, our team ensures a seamless experience from design to completion.
        </p>
      </div>
    </section>
  );
}