import type { MetadataRoute } from "next";
import { SERVICES_DATA } from "./services/[slug]/data";
import { GRAND_POOLS_DATA } from "./projects/[slug]/data";

const BASE_URL = "https://www.grandpools.com.au";

export default function sitemap(): MetadataRoute.Sitemap {
  const serviceRoutes: MetadataRoute.Sitemap = Object.keys(
    SERVICES_DATA
  ).map((slug) => ({
    url: `${BASE_URL}/services/${slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const projectRoutes: MetadataRoute.Sitemap = Object.keys(
    GRAND_POOLS_DATA
  ).map((slug) => ({
    url: `${BASE_URL}/projects/${slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: BASE_URL,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/services`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/projects`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/privacy-policy`,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${BASE_URL}/terms-of-use`,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    ...serviceRoutes,
    ...projectRoutes,
  ];
}