import type { MetadataRoute } from "next";
import { getMergedGuides } from "@/lib/guidesDb";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://auraootd.com";
  const guides = await getMergedGuides();
  const routes = [
    "",
    "/ootd",
    "/guides",
    "/creators",
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
  const guideEntries = guides.map((g) => ({
    url: `${base}/guides/${g.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  return [...staticEntries, ...guideEntries];
}
