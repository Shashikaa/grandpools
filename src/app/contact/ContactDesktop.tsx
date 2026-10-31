"use client";
import LuxuryPage from "@/src/components/motion/LuxuryPage";
import Stage from "@/src/components/motion/LuxuryStage";
import Hero from "@/src/components/contact/Hero";
import CTA from "@/src/components/contact/SectionCTA";
import One from "@/src/components/contact/SectionOne";
import FAQ from "@/src/components/contact/FAQSection";
import Footer from "@/src/components/Footer";
export default function Contact(){return <LuxuryPage><Stage><Hero/></Stage><Stage flow><CTA/></Stage><Stage kind="contact-story"><One/></Stage><Stage flow transition="slide" className="luxury-ending"><FAQ/><div data-luxury-skip><Footer/></div></Stage></LuxuryPage>;}
