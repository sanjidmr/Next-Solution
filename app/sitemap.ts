import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { publicNavPaths } from "@/config/navigation";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const lastModified = new Date();

  return publicNavPaths.map((path) => ({
    url: path === "/" ? baseUrl : `${baseUrl}${path}`,
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
