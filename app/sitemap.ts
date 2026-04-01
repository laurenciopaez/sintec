import { MetadataRoute } from "next";
import { SERVICES } from "@/lib/constants";

export const dynamic = "force-static";

const BASE_URL = "https://www.sintecsa.com.ar";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/quienes-somos`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/soluciones`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = SERVICES.map((service) => ({
    url: `${BASE_URL}/soluciones/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const faqRoutes: MetadataRoute.Sitemap = SERVICES.map((service) => ({
    url: `${BASE_URL}/soluciones/${service.slug}/faq`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...serviceRoutes, ...faqRoutes];
}
