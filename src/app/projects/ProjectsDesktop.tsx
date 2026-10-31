"use client";
import LuxuryPage from "@/src/components/motion/LuxuryPage";
import Stage from "@/src/components/motion/LuxuryStage";
import Hero from "@/src/components/Projects/ProjectsHero";
import One from "@/src/components/Projects/SectionOne";
import Two from "@/src/components/Projects/SectionTwo";
import CTA from "@/src/components/SectionCTA";
import Footer from "@/src/components/Footer";
export default function Projects(){return <LuxuryPage><Stage kind="editorial-hero"><Hero/></Stage><Stage flow transition="slide"><One/></Stage><Stage skipText><Two isActive/></Stage><Stage flow transition="slide" className="luxury-ending"><CTA/><div data-luxury-skip><Footer/></div></Stage></LuxuryPage>;}
