import { cache } from "react";
import { connectToDatabase } from "@/lib/db";
import { defaultDoctors, defaultGallery, defaultPosts, defaultServices, defaultSettings, defaultVideos } from "@/lib/defaults";
import { DoctorModel, GalleryModel, PostModel, ServiceModel, SettingsModel, VideoModel } from "@/models/cms";
import type { Doctor, GalleryItem, Post, Service, SiteSettings, VideoItem } from "@/types/cms";

function serialize<T>(value: unknown): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

export const getSettings = cache(async function getSettings(): Promise<SiteSettings> {
  if (!(await connectToDatabase())) return defaultSettings;
  const stored = await SettingsModel.findOne().lean();
  return stored ? { ...defaultSettings, ...serialize<Partial<SiteSettings>>(stored), contact: { ...defaultSettings.contact, ...serialize<Record<string, string>>(stored.contact) } } : defaultSettings;
});

export const getServices = cache(async function getServices(all = false): Promise<Service[]> {
  if (!(await connectToDatabase())) return defaultServices;
  const filter = all ? {} : { published: true };
  const items = await ServiceModel.find(filter).sort({ order: 1, createdAt: 1 }).lean();
  return items.length ? serialize<Service[]>(items) : defaultServices;
});

export const getPosts = cache(async function getPosts(all = false): Promise<Post[]> {
  if (!(await connectToDatabase())) return defaultPosts;
  const filter = all ? {} : { published: true };
  const items = await PostModel.find(filter).sort({ publishedAt: -1, createdAt: -1 }).lean();
  return items.length ? serialize<Post[]>(items) : defaultPosts;
});

export const getGallery = cache(async function getGallery(all = false): Promise<GalleryItem[]> {
  if (!(await connectToDatabase())) return defaultGallery;
  const filter = all ? {} : { published: true };
  const items = await GalleryModel.find(filter).sort({ order: 1, createdAt: -1 }).lean();
  return items.length ? serialize<GalleryItem[]>(items) : defaultGallery;
});

export const getDoctors = cache(async function getDoctors(all = false): Promise<Doctor[]> {
  if (!(await connectToDatabase())) return defaultDoctors;
  const items = await DoctorModel.find(all ? {} : { published: true }).sort({ order: 1, createdAt: 1 }).lean();
  return items.length ? serialize<Doctor[]>(items) : defaultDoctors;
});

export const getVideos = cache(async function getVideos(all = false): Promise<VideoItem[]> {
  if (!(await connectToDatabase())) return defaultVideos;
  const items = await VideoModel.find(all ? {} : { published: true }).sort({ order: 1, createdAt: 1 }).lean();
  return items.length ? serialize<VideoItem[]>(items) : defaultVideos;
});
