import type { MetadataRoute } from "next";
import { GUIDES } from "@/lib/guides";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://auraootd.com";
  const routes = [
    "",
    "/fashion",
    "/beauty",
    "/lifestyle",
    "/guides",
    "/picks",
    "/about",
    "/disclosure",
    "/privacy",
    "/terms",
    "/community-guidelines",
  ];
  const staticEntries = routes.map((r) => ({
    url: `${base}${r}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: r === "" ? 1 : 0.7,
  }));
  const guideEntries = GUIDES.map((g) => ({
    url: `${base}/guides/${g.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  return [...staticEntries, ...guideEntries];
}
