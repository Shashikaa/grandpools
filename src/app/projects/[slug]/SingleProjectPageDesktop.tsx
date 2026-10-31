"use client";
import LuxuryPage from "@/src/components/motion/LuxuryPage";
import Stage from "@/src/components/motion/LuxuryStage";
import Story from "@/src/components/motion/ProjectStory";
import Hero from "@/src/components/Projects/ProjectScrollHero";
import App from "@/src/components/Projects/Appsection";
import FAQ from "@/src/components/contact/FAQSection";
import Footer from "@/src/components/Footer";
import type { FullServiceData } from "./data";
export default function Project({pageData}: {pageData: FullServiceData}){return <LuxuryPage><Stage><Hero title={pageData.title} description={pageData.description} images={pageData.images || []}/></Stage><Story slides={pageData.slides || []}/><Stage flow transition="flow" className="luxury-app"><App/></Stage><Stage flow transition="slide" className="luxury-ending"><FAQ/><div data-luxury-skip><Footer/></div></Stage></LuxuryPage>;}
