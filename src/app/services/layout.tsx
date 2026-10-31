import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore custom swimming pool design and construction services from Grand Pools in Melbourne.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Grand Pools - Services",
    description:
      "Explore custom swimming pool design and construction services from Grand Pools in Melbourne.",
    url: "/services",
    images: ["/og-image.jpg"],
  },
};

export default function ServicesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}