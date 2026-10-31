import type { Metadata } from "next";
import { GRAND_POOLS_DATA } from "./data";

type ProjectData = {
  title?: string;
  name?: string;
  description?: string;
  image?: string;
  location?: string;
};

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: Omit<LayoutProps, "children">): Promise<Metadata> {
  const { slug } = await params;

  const project = GRAND_POOLS_DATA[
    slug as keyof typeof GRAND_POOLS_DATA
  ] as ProjectData | undefined;

  if (!project) {
    return {
      title: {
        absolute: "Grand Pools - Project Not Found",
      },
      description: "The requested Grand Pools project could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = project.title || project.name || "Pool Project";

  const description =
    project.description ||
    `Explore the ${title} custom swimming pool project by Grand Pools${
      project.location ? ` in ${project.location}` : " in Melbourne"
    }.`;

  const image = project.image || "/og-image.jpg";
  const pageUrl = `/projects/${slug}`;

  return {
    title: {
      absolute: `Grand Pools - ${title}`,
    },

    description,

    keywords: [
      title,
      `${title} swimming pool`,
      "custom pool projects Melbourne",
      "swimming pool builders Melbourne",
      "luxury pools Melbourne",
      "Grand Pools",
    ],

    alternates: {
      canonical: pageUrl,
    },

    openGraph: {
      title: `Grand Pools - ${title}`,
      description,
      url: pageUrl,
      siteName: "Grand Pools",
      type: "article",
      locale: "en_AU",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${title} swimming pool project by Grand Pools`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `Grand Pools - ${title}`,
      description,
      images: [image],
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export function generateStaticParams() {
  return Object.keys(GRAND_POOLS_DATA).map((slug) => ({
    slug,
  }));
}

export default function ProjectLayout({ children }: LayoutProps) {
  return children;
}