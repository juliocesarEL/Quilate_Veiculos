import type { MetadataRoute } from "next";
import { loja } from "@/data/loja";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: loja.siteUrl, changeFrequency: "weekly", priority: 1 }];
}
