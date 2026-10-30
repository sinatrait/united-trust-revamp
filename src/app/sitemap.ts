import type { MetadataRoute } from "next";

const baseUrl = "https://www.theunitedtrust.in";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...["/about", "/activities", "/gallery", "/contact"].map((path) => ({
      url: `${baseUrl}${path}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
