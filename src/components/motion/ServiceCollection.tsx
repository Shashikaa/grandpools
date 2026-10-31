"use client";
import { useRef, useState } from "react";
import type { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSite } from "@/src/app/context/SiteContext";
import SectionTwo from "@/src/components/Service/SectionTwo";
import { collectionIndex } from "./settings";
import LuxuryStage from "./LuxuryStage";
export default function ServiceCollection() {
  const [index, setIndex] = useState(0);
  const [active, setActive] = useState(false);
  const trigger = useRef<ScrollTrigger | null>(null);
  const { smootherRef } = useSite();
  return <LuxuryStage kind="sequence" steps={3} skipText onActive={setActive} onReady={st => { trigger.current = st; }} onProgress={p => setIndex(collectionIndex(p, 3))}>
    <SectionTwo isActive={active} activeSlideIndex={index} onSelectSlide={i => {
      const st = trigger.current;
      if (!st) return;
      const target = st.start + (st.end - st.start) * Number((st.trigger as HTMLElement).dataset.storyFraction || 1) * (i + 0.3) / 3;
      if (smootherRef?.current) smootherRef.current.scrollTo(target, { duration: 1.25 });
      else window.scrollTo({ top: target, behavior: 'smooth' });
    }} />
  </LuxuryStage>;
}
