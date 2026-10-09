import { Schema, model, models } from "mongoose";

const settingsSchema = new Schema(
  {
    siteName: String, shortName: String, slogan: String, logoUrl: String,
    heroImage: String, aboutImage: String, technologyImage: String, ogImage: String,
    heroEyebrow: String, heroTitle: String, heroSubtitle: String,
    aboutTitle: String, aboutBody: String,
    goalsTitle: String, goal1Value: String, goal1Label: String, goal2Value: String, goal2Label: String, goal3Value: String, goal3Label: String, goal4Value: String, goal4Label: String,
    ecosystemTitle: String, ecosystemBody: String, spaceTitle: String, spaceBody: String, activitiesTitle: String, activitiesBody: String, valuesTitle: String, registerTitle: String, registerBody: String,
    servicesHeroTitle: String, servicesHeroSubtitle: String, servicesHeroCta: String, servicesClosingTitle: String, servicesClosingBody: String, primaryColor: String, accentColor: String,
    backgroundColor: String, textColor: String, headingColor: String,
    bodyFont: String, headingFont: String, bodyFontSize: Number, headingFontSize: Number,
    seoTitle: String, seoDescription: String, seoKeywords: String,
    contact: { type: Object, default: {} },
  },
  { timestamps: true }
);

const serviceSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: String, description: String, image: String, icon: String, pageIntro: String, pageItems: String, ctaLabel: String,
    metaTitle: String, metaDescription: String, keywords: String,
    order: { type: Number, default: 0 }, featured: { type: Boolean, default: false },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const postSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: String, content: String, image: String, publishedAt: String,
    metaTitle: String, metaDescription: String, keywords: String,
    sourceLabel: String, sourceUrl: String, videoEmbedUrl: String,
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const gallerySchema = new Schema(
  {
    title: String, description: String, image: { type: String, required: true }, category: String,
    order: { type: Number, default: 0 }, published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const doctorSchema = new Schema(
  { name: { type: String, required: true }, role: String, bio: String, image: String, order: { type: Number, default: 0 }, published: { type: Boolean, default: true } },
  { timestamps: true }
);

const videoSchema = new Schema(
  { title: { type: String, required: true }, description: String, embedUrl: { type: String, required: true }, placement: { type: String, enum: ["contact", "gallery", "pediatric", "knowledge"], default: "contact" }, order: { type: Number, default: 0 }, published: { type: Boolean, default: true } },
  { timestamps: true }
);

const appointmentSchema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: String, service: String, preferredDate: String, message: String, ipHash: String,
    status: { type: String, enum: ["new", "confirmed", "completed", "cancelled"], default: "new" },
  },
  { timestamps: true }
);

const roadmapSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true }, number: String, title: { type: String, required: true },
    eyebrow: String, summary: String, image: String, groupsJson: String,
    order: { type: Number, default: 0 }, published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const publishable={status:{type:String,enum:["draft","review","published","hidden","ended"],default:"draft"},published:{type:Boolean,default:false},order:{type:Number,default:0}};
const categorySchema=new Schema({name:{type:String,required:true},slug:{type:String,required:true,unique:true},parentId:String,description:String,image:String,...publishable},{timestamps:true});
const organizerSchema=new Schema({name:{type:String,required:true},slug:{type:String,required:true,unique:true},type:String,contactName:String,phone:String,email:String,address:String,description:String,image:String,...publishable},{timestamps:true});
const venueSchema=new Schema({name:{type:String,required:true},slug:{type:String,required:true,unique:true},address:String,mapUrl:String,capacity:Number,amenities:String,sportTypes:String,image:String,...publishable},{timestamps:true});
const resourceSchema=new Schema({name:{type:String,required:true},slug:{type:String,required:true,unique:true},venueId:String,type:String,capacity:Number,price:Number,unit:String,rules:String,image:String,...publishable},{timestamps:true});
const activitySchema=new Schema({name:{type:String,required:true},slug:{type:String,required:true,unique:true},categoryId:String,venueIds:String,organizerId:String,description:String,ageGroup:String,level:String,capacity:Number,price:Number,registrationEnabled:Boolean,image:String,...publishable},{timestamps:true});
const scheduleSchema=new Schema({title:{type:String,required:true},activityId:String,eventId:String,venueId:String,resourceId:String,startAt:String,endAt:String,capacity:Number,status:{type:String,enum:["draft","open","full","cancelled","completed"],default:"draft"},note:String},{timestamps:true});
const eventSchema=new Schema({title:{type:String,required:true},slug:{type:String,required:true,unique:true},categoryId:String,venueId:String,organizerId:String,startAt:String,endAt:String,deadline:String,capacity:Number,price:Number,description:String,image:String,...publishable},{timestamps:true});
const bookingSchema=new Schema({code:String,name:{type:String,required:true},phone:{type:String,required:true},email:String,resourceId:String,venueId:String,startAt:String,endAt:String,participants:Number,total:Number,message:String,status:{type:String,enum:["pending","confirmed","completed","cancelled","waitlist"],default:"pending"}},{timestamps:true});
const registrationSchema=new Schema({code:String,name:{type:String,required:true},phone:{type:String,required:true},email:String,activityId:String,eventId:String,scheduleId:String,participants:{type:Number,default:1},status:{type:String,enum:["pending","confirmed","completed","cancelled","waitlist"],default:"pending"}},{timestamps:true});
const notificationSchema=new Schema({recipient:String,channel:{type:String,enum:["email","sms","system"],default:"system"},subject:String,message:String,relatedType:String,relatedId:String,status:{type:String,enum:["queued","sent","failed","read"],default:"queued"},sentAt:String},{timestamps:true});
const adminUserSchema=new Schema({name:String,username:{type:String,required:true,unique:true},passwordHash:String,role:{type:String,enum:["super_admin","culture_manager","sports_manager","learning_manager","commerce_manager","editor"],default:"editor"},active:{type:Boolean,default:true}},{timestamps:true});
const auditLogSchema=new Schema({actor:String,role:String,action:String,collectionName:String,itemId:String,summary:String,payload:Object},{timestamps:true});

export const SettingsModel = models.Settings || model("Settings", settingsSchema);
export const ServiceModel = models.Service || model("Service", serviceSchema);
export const PostModel = models.Post || model("Post", postSchema);
export const GalleryModel = models.Gallery || model("Gallery", gallerySchema);
export const DoctorModel = models.Doctor || model("Doctor", doctorSchema);
export const VideoModel = models.Video || model("Video", videoSchema);
export const AppointmentModel = models.Appointment || model("Appointment", appointmentSchema);
export const RoadmapModel = models.Roadmap || model("Roadmap", roadmapSchema);
export const CategoryModel=models.Category||model("Category",categorySchema);
export const OrganizerModel=models.Organizer||model("Organizer",organizerSchema);
export const VenueModel=models.Venue||model("Venue",venueSchema);
export const ResourceModel=models.Resource||model("Resource",resourceSchema);
export const ActivityModel=models.Activity||model("Activity",activitySchema);
export const ScheduleModel=models.Schedule||model("Schedule",scheduleSchema);
export const EventModel=models.Event||model("Event",eventSchema);
export const BookingModel=models.Booking||model("Booking",bookingSchema);
export const RegistrationModel=models.Registration||model("Registration",registrationSchema);
export const NotificationModel=models.Notification||model("Notification",notificationSchema);
export const AdminUserModel=models.AdminUser||model("AdminUser",adminUserSchema);
export const AuditLogModel=models.AuditLog||model("AuditLog",auditLogSchema);
