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
    {
      url: `${BASE_URL}/work/way-compass`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    // Other per-project pages still build, but their cards link directly to
    // live sites, so they stay out of the sitemap for now.
    // Case studies are archived (see archive/work/case-studies) — no longer routed.
  ];
}
