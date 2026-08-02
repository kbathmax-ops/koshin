import { MetadataRoute } from "next";

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
    // Case studies are archived (see archive/work/case-studies) — no longer routed.
  ];
}
