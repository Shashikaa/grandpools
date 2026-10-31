"use client";
import { useState } from "react";
import type { InfoSlide } from "@/src/app/projects/[slug]/data";
import ProjectInfoSlide from "@/src/components/Projects/ProjectInfoSlide";
import { collectionIndex } from "./settings";
import LuxuryStage from "./LuxuryStage";
export default function ProjectStory({ slides }: { slides: InfoSlide[] }) {
  const [index, setIndex] = useState(0);
  const [active, setActive] = useState(false);
  return <LuxuryStage kind="sequence" steps={slides.length} skipText onActive={setActive} onProgress={p => setIndex(collectionIndex(p, slides.length))}>
    <ProjectInfoSlide slides={slides} activeIndex={index} isActive={active} />
  </LuxuryStage>;
}
