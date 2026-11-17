import type { MetadataRoute } from "next";
import { getMergedGuides } from "@/lib/guidesDb";
import { publishedArticles } from "@/lib/articles";

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
  // 읽을거리(글 가이드) — 발행한 글만. 고친 날을 그대로 알린다.
  const articleEntries = publishedArticles().map((a) => ({
    url: `${base}/guides/${a.slug}`,
    lastModified: new Date(a.updated_at),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  return [...staticEntries, ...guideEntries, ...articleEntries];
}
