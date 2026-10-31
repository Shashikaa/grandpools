import { notFound } from "next/navigation";
import ResponsiveTree from "../../../components/ResponsiveTree";
import SingleProjectPageDesktop from "./SingleProjectPageDesktop";
import SingleProjectPageMobile from "./SingleProjectPageMobile";
import { GRAND_POOLS_DATA } from "./data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Server renders the desktop tree so crawlers get real content for each
 * project/service page. ResponsiveTree swaps to mobile after mount at <=1024px.
 */
export default async function SingleProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const pageData = GRAND_POOLS_DATA[slug];

  // Unknown slug is a 404, not a client-side blank.
  if (!pageData) {
    notFound();
  }

  return (
    <ResponsiveTree
      desktop={<SingleProjectPageDesktop pageData={pageData} />}
      mobile={<SingleProjectPageMobile pageData={pageData} />}
    />
  );
}
