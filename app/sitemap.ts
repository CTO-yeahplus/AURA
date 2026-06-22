import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://auraootd.com";
  const routes = ["", "/fashion", "/beauty", "/lifestyle", "/picks", "/about", "/disclosure", "/privacy"];
  return routes.map((r) => ({
    url: `${base}${r}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: r === "" ? 1 : 0.7,
  }));
}
