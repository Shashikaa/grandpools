import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore custom swimming pool projects designed and built by Grand Pools across Melbourne.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Grand Pools - Projects",
    description:
      "Explore custom swimming pool projects designed and built by Grand Pools across Melbourne.",
    url: "/projects",
    images: ["/og-image.jpg"],
  },
};

export default function ProjectsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}