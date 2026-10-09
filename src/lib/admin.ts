import { ActivityModel,AdminUserModel,AppointmentModel,AuditLogModel,BookingModel,CategoryModel,DoctorModel,EventModel,GalleryModel,NotificationModel,OrganizerModel,PostModel,RegistrationModel,ResourceModel,RoadmapModel,ScheduleModel,ServiceModel,SettingsModel,VenueModel,VideoModel } from "@/models/cms";

export const collectionMap = {
  services: ServiceModel,
  posts: PostModel,
  gallery: GalleryModel,
  doctors: DoctorModel,
  videos: VideoModel,
  appointments: AppointmentModel,
  settings: SettingsModel,
  roadmap: RoadmapModel,
  categories:CategoryModel,activities:ActivityModel,venues:VenueModel,resources:ResourceModel,schedules:ScheduleModel,events:EventModel,bookings:BookingModel,registrations:RegistrationModel,organizers:OrganizerModel,notifications:NotificationModel,users:AdminUserModel,audit:AuditLogModel,
};

export type CollectionName = keyof typeof collectionMap;
