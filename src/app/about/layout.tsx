import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",

  description:
    "Learn about Grand Pools and our approach to designing and building high-quality custom swimming pools across Melbourne.",

  alternates: {
    canonical: "/about",
  },

  openGraph: {
    title: "Grand Pools - About",
    description:
      "Learn about Grand Pools and our approach to designing and building high-quality custom swimming pools across Melbourne.",
    url: "/about",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "About Grand Pools Melbourne",
      },
    ],
  },
};

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}