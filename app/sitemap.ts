import { MetadataRoute } from "next";
import { caseStudies } from "@/lib/case-studies";

const BASE_URL = "https://kbathmax.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/work`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/work/case-studies`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    // Picked up automatically from the registry — no edit needed per study.
    ...caseStudies.map((study) => ({
      url: `${BASE_URL}/work/case-studies/${study.slug}`,
      lastModified: new Date(study.date),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
