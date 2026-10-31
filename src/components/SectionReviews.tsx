"use client";

import { useState } from "react";

interface Review {
  id: number;
  stars: number;
  text: string;
  author: string;
  avatar: string;
  date: string;
}

const REVIEWS_DATA: Review[] = [
  {
    id: 1,
    stars: 5,
    text: "I couldn’t be happier with my experience working with Grand Pools! From start to finish, the team was incredibly professional, attentive, and committed to delivering exactly what I envisioned.\n\nWe recently built our dream home in Toorak, and adding a pool was a key part of the project. The Grand Pools team guided me through the entire process, from design to installation, ensuring every detail aligned with the style of our property. I was especially impressed by their creative ideas; they incorporated a stunning infinity edge and elegant mosaic tiling that became the centerpiece of our outdoor space.\n\nThe craftsmanship is outstanding, and the pool has truly elevated the look and feel of our home. It's now our favorite place to relax and entertain, and our guests are constantly amazed by how it looks. Thank you, Grand Pools, for your incredible work. I would highly recommend you to anyone looking to enhance their home with a beautiful, custom pool!",
    author: "Lucy",
    avatar: "/lucy-avatar.png",
    date: "14.11.2025",
  },
  {
    id: 2,
    stars: 5,
    text: "Our dream pool was designed, built and delivered by the expert team at Grand Pools just in time for the kids' best Christmas ever! Working with tricky access, awkward angles, close to boundaries and housing foundations this was not an easy build, however, nothing was too much trouble for Lachlan and the entire team. From start to finish we were kept updated, the transition between trades was seamless and the result is the talk of our street!\n\nThe waterfall from spa to pool provides a tranquility all year round, the spa is enjoyed on cold winter days, some have even braved the health benefits of the hot/cold dips. Our family loves what this has created for our lifestyle. The attention to detail and high standard of craftsmanship are evident in every aspect of the pool, even in the filter and pump set up! Lachlan thinks of everything! We could not recommend Grand Pools enough.",
    author: "James",
    avatar: "/james-avatar.png", 
    date: "12.05.2025",
  },
  {
    id: 3,
    stars: 5,
    text: "As a builder specializing in luxury properties, we’ve partnered with Grand Pools on multiple projects throughout the Bayside Region. Their team brings a level of expertise and creativity that has consistently added tremendous value to our developments.\n\nFrom initial design consultations to the final installation, Grand Pools understands the high standards our clients expect. Their pools are not just functional; they are crafted to be striking, durable, and seamlessly integrated into our properties. With each project, they bring custom solutions that enhance the aesthetic and appeal of our homes, making them stand out in a competitive market.\n\nWe can always count on Grand Pools for quality work, excellent communication, and timely completion, making them a trusted partner in our process. Our clients appreciate the elegance and luxury their pools bring, and we’re grateful to have Grand Pools as a go-to partner in enhancing the value and wow factor of our properties.",
    author: "Natalie & Taylor",
    avatar: "/builder-avatar.png",
    date: "06.06.2025",
  }
];

export default function SectionReviews() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextReview = () => {
    setActiveIndex((prev) => (prev + 1) % REVIEWS_DATA.length);
  };

  const prevReview = () => {
    setActiveIndex((prev) => (prev - 1 + REVIEWS_DATA.length) % REVIEWS_DATA.length);
  };

  const handleBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickedIndex = Math.floor((clickX / rect.width) * REVIEWS_DATA.length);
    
    if (clickedIndex >= 0 && clickedIndex < REVIEWS_DATA.length) {
      setActiveIndex(clickedIndex);
    }
  };

  return (
    <section className="section-container relative min-h-screen overflow-hidden bg-[#0A1410] flex flex-col items-center justify-center">
      
      {/* BACKGROUND IMAGE - Target for GSAP scale effect */}
      <div className="absolute inset-0 z-0">
        <img
          src="/section-reviews-bg.webp" 
          alt="Grand Pools background scenery"
          className="w-full h-full object-cover reviews-bg-img" loading="lazy" />
      </div>

      {/* CHANGED: Added px-4 (mobile side padding) and gap-4 md:gap-8 to create safe breathing room around the arrows */}
      <div className="relative z-10 w-full max-w-[850px] flex items-center justify-between flex-1 px-4 gap-4 md:px-6 md:gap-8">
        <button 
          onClick={prevReview}
          className="text-[#F4EEDF]/40 hover:text-[#F4EEDF] transition-colors p-2 select-none cursor-pointer shrink-0"
          aria-label="Previous review"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 md:w-8 md:h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        <div className="w-full max-w-[660px] mx-auto flex flex-col items-center pb-12">
          <div className="transition-opacity duration-500 ease-in-out w-full flex flex-col items-center gap-8 md:gap-12">
            
            <div className="flex justify-center gap-1">
              {Array.from({ length: REVIEWS_DATA[activeIndex].stars }).map((_, i) => (
                <span key={i} className="text-[#E0D3B2] !text-[28px] tracking-widest">★</span>
              ))}
            </div>

            <div className="flex items-center gap-4 w-full justify-start md:hidden">
              <img
                src={REVIEWS_DATA[activeIndex].avatar}
                alt={REVIEWS_DATA[activeIndex].author}
                className="w-12 h-12 rounded-full object-cover" loading="lazy" />
              <span className="font-display text-[#F4EEDF] text-3xl">
                {REVIEWS_DATA[activeIndex].author}
              </span>
            </div>

            <p className="font-body text-[#F4EEDF] !text-left whitespace-pre-line w-full !text-[12px] md:!text-[16px]">
              {REVIEWS_DATA[activeIndex].text}
            </p>

            <div className="w-full flex items-center justify-between lg:!pt-8">
              <div className="hidden md:flex items-center gap-3">
                <img
                  src={REVIEWS_DATA[activeIndex].avatar}
                  alt={REVIEWS_DATA[activeIndex].author}
                  className="w-9 h-9 rounded-full object-cover" loading="lazy" />
                <span className="font-display text-[#F4EEDF] text-2xl md:text-3xl">
                  {REVIEWS_DATA[activeIndex].author}
                </span>
              </div>

              <div className="text-[#F4EEDF] font-body text-sm w-full text-left md:w-auto md:text-right">
                {REVIEWS_DATA[activeIndex].date}
              </div>
            </div>

          </div>
        </div>

        <button 
          onClick={nextReview}
          className="text-[#F4EEDF]/40 hover:text-[#F4EEDF] transition-colors p-2 select-none cursor-pointer shrink-0"
          aria-label="Next review"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 md:w-8 md:h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>

      <div className="absolute bottom-[64px] left-1/2 -translate-x-1/2 z-20 w-full max-w-[90%] lg:max-w-[720px]">
        <div 
          onClick={handleBarClick}
          className="w-full h-[2px] bg-[#F4EEDF]/20 relative overflow-hidden cursor-pointer"
        >
          <div
            className="absolute top-0 h-full bg-[#F4EEDF] transition-all duration-500 ease-in-out"
            style={{
              width: `${100 / REVIEWS_DATA.length}%`,
              left: `${(activeIndex * 100) / REVIEWS_DATA.length}%`,
            }}
          />
        </div>
      </div>

    </section>
  );
}