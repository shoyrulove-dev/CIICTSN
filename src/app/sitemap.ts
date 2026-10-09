import type {MetadataRoute} from "next";
import {getPosts,getServices} from "@/lib/content";
import {roadmapModules,sportsSlugs} from "@/lib/roadmap";
import {SITE_URL} from "@/lib/seo";
export default async function sitemap():Promise<MetadataRoute.Sitemap>{
 const [services,posts]=await Promise.all([getServices(),getPosts()]);
 return [
  {url:SITE_URL,lastModified:new Date(),changeFrequency:"weekly",priority:1},
  {url:`${SITE_URL}/hoat-dong`,lastModified:new Date(),changeFrequency:"daily",priority:.9},{url:`${SITE_URL}/booking`,lastModified:new Date(),changeFrequency:"weekly",priority:.9},
  ...roadmapModules.map(item=>({url:`${SITE_URL}/kham-pha/${item.slug}`,lastModified:new Date(),changeFrequency:"weekly" as const,priority:.85})),
  ...Object.keys(sportsSlugs).map(slug=>({url:`${SITE_URL}/kham-pha/the-duc-the-thao/${slug}`,lastModified:new Date(),changeFrequency:"weekly" as const,priority:.8})),
  ...services.filter(item=>!roadmapModules.some(module=>module.slug===item.slug)).map(item=>({url:`${SITE_URL}/${item.slug}`,lastModified:new Date(),changeFrequency:"monthly" as const,priority:.7})),
  ...posts.map(item=>({url:`${SITE_URL}/${item.slug}`,lastModified:new Date(item.publishedAt),changeFrequency:"monthly" as const,priority:.75})),
 ];
}
