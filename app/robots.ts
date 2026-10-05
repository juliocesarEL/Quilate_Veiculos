import type { MetadataRoute } from "next";
import { loja } from "@/data/loja";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${loja.siteUrl}/sitemap.xml`,
  };
}
