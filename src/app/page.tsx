import type { Metadata } from "next";
import ResponsiveTree from "../components/ResponsiveTree";
import HomeDesktop from "./HomeDesktop";
import HomeMobile from "./HomeMobile";

export const metadata: Metadata = {
  title: {
    absolute: "Grand Pools",
  },

  description:
    "Grand Pools designs and builds custom swimming pools across Melbourne, combining thoughtful design, quality construction and lasting functionality.",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Grand Pools",
    description:
      "Discover custom swimming pools designed and built for beautiful Melbourne homes.",
    url: "/",
    siteName: "Grand Pools",
    type: "website",
    locale: "en_AU",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Grand Pools custom swimming pool in Melbourne",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Grand Pools",
    description:
      "Discover custom swimming pools designed and built for beautiful Melbourne homes.",
    images: ["/og-image.jpg"],
  },
};

/**
 * The desktop tree is what the server renders, so crawlers and no-JS visitors
 * receive real headings, copy and images. ResponsiveTree swaps in the mobile
 * tree after mount on viewports at or below 1024px.
 */
export default function HomePage() {
  return (
    <ResponsiveTree
      desktop={<HomeDesktop />}
      mobile={<HomeMobile />}
    />
  );
}