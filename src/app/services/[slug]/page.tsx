import { notFound } from "next/navigation";
import ResponsiveTree from "../../../components/ResponsiveTree";
import SubServicesDesktop from "./SubServicesDesktop";
import SubServicesMobile from "./SubServicesMobile";
import { SERVICES_DATA } from "./data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Server renders the desktop tree so crawlers get real content for each
 * project/service page. ResponsiveTree swaps to mobile after mount at <=1024px.
 */
export default async function SingleServicePage({ params }: PageProps) {
  const { slug } = await params;
  const pageData = SERVICES_DATA[slug];

  // Unknown slug is a 404, not a client-side blank.
  if (!pageData) {
    notFound();
  }

  return (
    <ResponsiveTree
      desktop={<SubServicesDesktop pageData={pageData} />}
      mobile={<SubServicesMobile pageData={pageData} />}
    />
  );
}
