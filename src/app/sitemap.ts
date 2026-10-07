import type { MetadataRoute } from "next";
import { getPosts, getServices } from "@/lib/content";
import { SITE_URL } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE_URL;
  const staticPaths = ["", "/gioi-thieu", "/dich-vu", "/kien-thuc", "/lien-he"];
  const [services, posts] = await Promise.all([getServices(), getPosts()]);
  return [
    ...staticPaths.map((path, index) => ({ url: `${base}${path}`, lastModified: new Date(), changeFrequency: index === 0 ? "weekly" as const : "monthly" as const, priority: index === 0 ? 1 : 0.8 })),
    ...services.map((item) => ({ url: `${base}/${item.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 })),
    ...posts.map((item) => ({ url: `${base}/${item.slug}`, lastModified: new Date(item.publishedAt), changeFrequency: "yearly" as const, priority: 0.7 })),
  ];
}
