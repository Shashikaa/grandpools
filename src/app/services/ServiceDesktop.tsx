"use client";
import LuxuryPage from "@/src/components/motion/LuxuryPage";
import Stage from "@/src/components/motion/LuxuryStage";
import Collection from "@/src/components/motion/ServiceCollection";
import Hero from "@/src/components/Service/Hero";
import One from "@/src/components/Service/SectionOne";
import App from "@/src/components/Appsection";
import CTA from "@/src/components/SectionCTA";
import Footer from "@/src/components/Footer";
export default function Services(){return <LuxuryPage><Stage kind="service-hero"><Hero/></Stage><Stage><One/></Stage><Collection/><Stage flow transition="flow" className="luxury-app"><App/></Stage><Stage flow transition="slide" className="luxury-ending"><CTA/><div data-luxury-skip><Footer/></div></Stage></LuxuryPage>;}
