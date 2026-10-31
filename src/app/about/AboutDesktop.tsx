"use client";
import { useState } from "react";
import { collectionIndex } from "@/src/components/motion/settings";
import LuxuryPage from "@/src/components/motion/LuxuryPage";
import Stage from "@/src/components/motion/LuxuryStage";
import Hero from "@/src/components/About/Hero";
import One from "@/src/components/About/SectionOne";
import Two from "@/src/components/About/SectionTwo";
import Three from "@/src/components/About/SectionThree";
import Four from "@/src/components/About/SectionFour";
import Five from "@/src/components/About/SectionFive";
import CTA from "@/src/components/SectionCTA";
import Footer from "@/src/components/Footer";
export default function About({ isMobile = false }: { isMobile?: boolean }) {
 const [stat, setStat] = useState(0);
 const [statsActive, setStatsActive] = useState(false);
 return <LuxuryPage><Stage kind="about-hero"><Hero isMobile={isMobile}/><div className="about-hero-underlay"><One/></div></Stage><Stage><Two/></Stage><Stage transition="slide"><Three/></Stage><Stage><Four/></Stage><Stage kind="sequence" steps={3} className="luxury-about-stats" skipText onActive={setStatsActive} onProgress={p => setStat(collectionIndex(p, 3))}><Five isActive={statsActive} activeIndex={stat}/></Stage><Stage flow transition="slide" className="luxury-ending"><CTA/><div data-luxury-skip><Footer/></div></Stage></LuxuryPage>;
}
