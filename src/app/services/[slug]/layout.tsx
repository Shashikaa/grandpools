import type { Metadata } from "next";
import { SERVICES_DATA } from "./data";

const SITE_URL = "https://www.grandpools.com.au";

type ServiceLayoutProps = {
  children: React.ReactNode;
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: Omit<ServiceLayoutProps, "children">): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES_DATA[slug];

  if (!service) {
    return {
      title: {
        absolute: "Grand Pools - Service Not Found",
      },
      description: "The requested Grand Pools service could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = service.hero.title;
  const description = service.hero.subtitle;
  const image = service.hero.bgImageUrl;
  const pageUrl = `/services/${service.slug}`;

  return {
    title: {
      absolute: `Grand Pools - ${title}`,
    },

    description,

    keywords: [
      title,
      `${title} Melbourne`,
      "pool builders Melbourne",
      "custom pools Melbourne",
      "swimming pool construction Melbourne",
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
      locale: "en_AU",
      type: "website",
      images: [
        {
          url: image,
          width: 1920,
          height: 1080,
          alt: `${title} by Grand Pools Melbourne`,
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
  return Object.keys(SERVICES_DATA).map((slug) => ({
    slug,
  }));
}

export default async function ServiceLayout({
  children,
  params,
}: ServiceLayoutProps) {
  const { slug } = await params;
  const service = SERVICES_DATA[slug];

  if (!service) {
    return children;
  }

  const pageUrl = `${SITE_URL}/services/${service.slug}`;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${pageUrl}/#service`,
    name: service.hero.title,
    description: service.hero.subtitle,
    url: pageUrl,
    image: service.hero.bgImageUrl,
    serviceType: service.hero.title,

    provider: {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#business`,
      name: "Grand Pools",
      url: SITE_URL,
      email: "admin@grandpools.com.au",
      sameAs: ["https://www.instagram.com/grandpools_aus/"],
    },

    areaServed: {
      "@type": "City",
      name: "Melbourne",
      containedInPlace: {
        "@type": "State",
        name: "Victoria",
      },
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.sectionTwo.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema).replace(/</g, "\\u003c"),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
        }}
      />

      {children}
    </>
  );
}