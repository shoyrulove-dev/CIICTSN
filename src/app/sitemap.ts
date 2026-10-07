import type { MetadataRoute } from "next";
import { getPosts, getServices } from "@/lib/content";
import { SITE_URL } from "@/lib/seo";
export default async function sitemap():Promise<MetadataRoute.Sitemap>{const [services,posts]=await Promise.all([getServices(),getPosts()]);return [{url:SITE_URL,lastModified:new Date(),changeFrequency:"weekly",priority:1},...services.map(item=>({url:`${SITE_URL}/${item.slug}`,lastModified:new Date(),changeFrequency:"monthly" as const,priority:.8})),...posts.map(item=>({url:`${SITE_URL}/${item.slug}`,lastModified:new Date(item.publishedAt),changeFrequency:"monthly" as const,priority:.75}))]}
