"use client";
import { useSite } from "@/src/app/context/SiteContext";
import LuxuryPage from "@/src/components/motion/LuxuryPage";
import Stage from "@/src/components/motion/LuxuryStage";
import Hero from "@/src/components/Home/Hero";
import Process from "@/src/components/Home/SectionTwo";
import Harmony from "@/src/components/Home/Sectioneight";
import Quality from "@/src/components/Home/SectionTen";
import Projects from "@/src/components/Home/SectionSix";
import Founder from "@/src/components/Home/Sectionseven";
import App from "@/src/components/Appsection";
import Pricing from "@/src/components/Home/WhatAPoolCosts";
import Invitation from "@/src/components/Home/SectionNine";
import CTA from "@/src/components/SectionCTA";
import Footer from "@/src/components/Footer";
export default function Home() {
 const { preloaderDone } = useSite();
 return <LuxuryPage>
  <Stage kind="home-hero"><Hero /></Stage>
  <Stage kind="process"><Process /></Stage>
  <Stage kind="harmony"><Harmony preloaderDone={preloaderDone} /></Stage>
  <Stage kind="quality"><Quality /></Stage>
  <Stage skipText transition="slide"><Projects /></Stage>
  <Stage flow className="luxury-expert-app">
   <div className="luxury-expert-panel"><Founder /></div>
   <div className="luxury-app-panel"><App /></div>
  </Stage>
  <Stage flow className="luxury-pricing"><Pricing /></Stage>
  <Stage kind="invitation" className="luxury-invitation"><Invitation /></Stage>
  <Stage flow transition="slide" className="luxury-ending"><CTA /><div data-luxury-skip><Footer /></div></Stage>
 </LuxuryPage>;
}
