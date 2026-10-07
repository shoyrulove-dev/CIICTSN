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
    email: String, service: String, preferredDate: String, message: String,
    status: { type: String, enum: ["new", "confirmed", "completed", "cancelled"], default: "new" },
  },
  { timestamps: true }
);

export const SettingsModel = models.Settings || model("Settings", settingsSchema);
export const ServiceModel = models.Service || model("Service", serviceSchema);
export const PostModel = models.Post || model("Post", postSchema);
export const GalleryModel = models.Gallery || model("Gallery", gallerySchema);
export const DoctorModel = models.Doctor || model("Doctor", doctorSchema);
export const VideoModel = models.Video || model("Video", videoSchema);
export const AppointmentModel = models.Appointment || model("Appointment", appointmentSchema);
