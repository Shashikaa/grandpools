"use client";

import { useState } from "react";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className="w-full !border-b !border-[#F4EEDF]"
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full !py-5 md:!py-5 flex items-center justify-between text-left group focus:outline-none !cursor-pointer"
            >
              {/* Question Text */}
              <span className="!text-[#F4EEDF] font-body !font-[400] !text-[16px] transition-opacity duration-300 group-hover:opacity-80">
                {item.question}
              </span>
              
              {/* Chevron Icon */}
              <span className={`!text-[#F4EEDF] transition-transform duration-300 ml-4 transform ${isOpen ? "rotate-180" : "rotate-0"}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.2"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </span>
            </button>

            {/* Animated Answer Container */}
            <div
              className={`grid transition-all duration-300 ease-out ${
                isOpen 
                  ? "grid-rows-[1fr] opacity-100" 
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              {/* Inner element handles overflow and smooth internal padding expansion */}
              <div className="overflow-hidden">
                <div className="pb-6">
                  <p className="!text-[#F4EEDF] font-body !pb-3">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}