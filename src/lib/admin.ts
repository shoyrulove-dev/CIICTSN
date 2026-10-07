import { AppointmentModel, DoctorModel, GalleryModel, PostModel, ServiceModel, SettingsModel, VideoModel } from "@/models/cms";

export const collectionMap = {
  services: ServiceModel,
  posts: PostModel,
  gallery: GalleryModel,
  doctors: DoctorModel,
  videos: VideoModel,
  appointments: AppointmentModel,
  settings: SettingsModel,
};

export type CollectionName = keyof typeof collectionMap;
