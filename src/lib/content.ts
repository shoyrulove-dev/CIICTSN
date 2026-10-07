import { cache } from "react";
import { unstable_cache } from "next/cache";
import { connectToDatabase } from "@/lib/db";
import { defaultDoctors, defaultGallery, defaultPosts, defaultServices, defaultSettings, defaultVideos } from "@/lib/defaults";
import { DoctorModel, GalleryModel, PostModel, ServiceModel, SettingsModel, VideoModel } from "@/models/cms";
import type { Doctor, GalleryItem, Post, Service, SiteSettings, VideoItem } from "@/types/cms";

function serialize<T>(value: unknown): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function optimizedImage(url: string) {
  if (!url?.startsWith("/images/ciic/") || url.endsWith("/logo.jpeg")) return url;
  return url.replace(/\.(png|jpe?g)$/i, ".webp");
}

function withOptimizedImages<T extends { image?: string }>(items: T[]) {
  return items.map((item) => item.image ? { ...item, image: optimizedImage(item.image) } : item);
}

const loadSettings = unstable_cache(async function loadSettings(): Promise<SiteSettings> {
  if (!(await connectToDatabase())) return defaultSettings;
  const stored = await SettingsModel.findOne().lean();
  const settings = stored ? { ...defaultSettings, ...serialize<Partial<SiteSettings>>(stored), contact: { ...defaultSettings.contact, ...serialize<Record<string, string>>(stored.contact) } } : defaultSettings;
  return { ...settings, heroImage: optimizedImage(settings.heroImage), aboutImage: optimizedImage(settings.aboutImage), technologyImage: optimizedImage(settings.technologyImage), ogImage: optimizedImage(settings.ogImage) };
}, ["ciic-settings"], { revalidate: 300, tags: ["cms-settings"] });

export const getSettings = cache(loadSettings);

async function loadServices(all: boolean): Promise<Service[]> {
  if (!(await connectToDatabase())) return defaultServices;
  const filter = all ? {} : { published: true };
  const items = await ServiceModel.find(filter).sort({ order: 1, createdAt: 1 }).lean();
  return withOptimizedImages(items.length ? serialize<Service[]>(items) : defaultServices);
}
const loadPublishedServices = unstable_cache(() => loadServices(false), ["ciic-services-published"], { revalidate: 300, tags: ["cms-services"] });
const loadAllServices = unstable_cache(() => loadServices(true), ["ciic-services-all"], { revalidate: 300, tags: ["cms-services"] });
export const getServices = cache((all = false) => all ? loadAllServices() : loadPublishedServices());

async function loadPosts(all: boolean): Promise<Post[]> {
  if (!(await connectToDatabase())) return defaultPosts;
  const filter = all ? {} : { published: true };
  const items = await PostModel.find(filter).sort({ publishedAt: -1, createdAt: -1 }).lean();
  return withOptimizedImages(items.length ? serialize<Post[]>(items) : defaultPosts);
}
const loadPublishedPosts = unstable_cache(() => loadPosts(false), ["ciic-posts-published"], { revalidate: 300, tags: ["cms-posts"] });
const loadAllPosts = unstable_cache(() => loadPosts(true), ["ciic-posts-all"], { revalidate: 300, tags: ["cms-posts"] });
export const getPosts = cache((all = false) => all ? loadAllPosts() : loadPublishedPosts());

async function loadGallery(all: boolean): Promise<GalleryItem[]> {
  if (!(await connectToDatabase())) return defaultGallery;
  const filter = all ? {} : { published: true };
  const items = await GalleryModel.find(filter).sort({ order: 1, createdAt: -1 }).lean();
  return withOptimizedImages(items.length ? serialize<GalleryItem[]>(items) : defaultGallery);
}
const loadPublishedGallery = unstable_cache(() => loadGallery(false), ["ciic-gallery-published"], { revalidate: 300, tags: ["cms-gallery"] });
const loadAllGallery = unstable_cache(() => loadGallery(true), ["ciic-gallery-all"], { revalidate: 300, tags: ["cms-gallery"] });
export const getGallery = cache((all = false) => all ? loadAllGallery() : loadPublishedGallery());

async function loadDoctors(all: boolean): Promise<Doctor[]> {
  if (!(await connectToDatabase())) return defaultDoctors;
  const items = await DoctorModel.find(all ? {} : { published: true }).sort({ order: 1, createdAt: 1 }).lean();
  return withOptimizedImages(items.length ? serialize<Doctor[]>(items) : defaultDoctors);
}
const loadPublishedDoctors = unstable_cache(() => loadDoctors(false), ["ciic-doctors-published"], { revalidate: 300, tags: ["cms-doctors"] });
const loadAllDoctors = unstable_cache(() => loadDoctors(true), ["ciic-doctors-all"], { revalidate: 300, tags: ["cms-doctors"] });
export const getDoctors = cache((all = false) => all ? loadAllDoctors() : loadPublishedDoctors());

async function loadVideos(all: boolean): Promise<VideoItem[]> {
  if (!(await connectToDatabase())) return defaultVideos;
  const items = await VideoModel.find(all ? {} : { published: true }).sort({ order: 1, createdAt: 1 }).lean();
  return items.length ? serialize<VideoItem[]>(items) : defaultVideos;
}
const loadPublishedVideos = unstable_cache(() => loadVideos(false), ["ciic-videos-published"], { revalidate: 300, tags: ["cms-videos"] });
const loadAllVideos = unstable_cache(() => loadVideos(true), ["ciic-videos-all"], { revalidate: 300, tags: ["cms-videos"] });
export const getVideos = cache((all = false) => all ? loadAllVideos() : loadPublishedVideos());
