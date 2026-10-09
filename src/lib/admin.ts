import { AppointmentModel, DoctorModel, GalleryModel, PostModel, RoadmapModel, ServiceModel, SettingsModel, VideoModel } from "@/models/cms";

export const collectionMap = {
  services: ServiceModel,
  posts: PostModel,
  gallery: GalleryModel,
  doctors: DoctorModel,
  videos: VideoModel,
  appointments: AppointmentModel,
  settings: SettingsModel,
  roadmap: RoadmapModel,
};

export type CollectionName = keyof typeof collectionMap;
