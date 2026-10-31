"use client";
import LuxuryPage from "@/src/components/motion/LuxuryPage";
import Stage from "@/src/components/motion/LuxuryStage";
import Hero from "@/src/components/Service/SubServiceHero";
import One from "@/src/components/Service/SubServiceSectionOne";
import FAQ from "@/src/components/Service/SubServiceFAQSection";
import App from "@/src/components/Projects/Appsection";
import CTA from "@/src/components/SectionCTA";
import Footer from "@/src/components/Footer";
import type { FullServiceData } from "./data";
export default function Service({pageData}: {pageData: FullServiceData}){return <LuxuryPage><Stage kind="service-hero"><Hero data={pageData.hero}/></Stage><Stage kind="service-story"><One data={pageData.sectionOne}/></Stage><Stage flow transition="flow" className="luxury-app"><App/></Stage><Stage flow><FAQ data={pageData.sectionTwo}/></Stage><Stage flow transition="slide" className="luxury-ending"><CTA/><div data-luxury-skip><Footer/></div></Stage></LuxuryPage>;}
