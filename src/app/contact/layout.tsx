import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Grand Pools to discuss your custom swimming pool project in Melbourne.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Grand Pools - Contact",
    description:
      "Contact Grand Pools to discuss your custom swimming pool project in Melbourne.",
    url: "/contact",
    images: ["/og-image.jpg"],
  },
};

export default function ContactLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}