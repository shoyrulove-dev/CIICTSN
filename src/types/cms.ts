export type ContactInfo = {
  phone: string;
  email: string;
  address: string;
  hours: string;
  facebook: string;
  zalo: string;
  tiktok: string;
  tiktokDoctor: string;
  youtube: string;
  mapUrl: string;
};

export type SiteSettings = {
  siteName: string;
  shortName: string;
  slogan: string;
  logoUrl: string;
  heroImage: string;
  aboutImage: string;
  technologyImage: string;
  ogImage: string;
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  aboutTitle: string;
  aboutBody: string;
  servicesHeroTitle: string;
  servicesHeroSubtitle: string;
  servicesHeroCta: string;
  servicesClosingTitle: string;
  servicesClosingBody: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  primaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  headingColor: string;
  bodyFont: string;
  headingFont: string;
  bodyFontSize: number;
  headingFontSize: number;
  contact: ContactInfo;
};

export type Service = {
  _id?: string;
  title: string;
  slug: string;
  excerpt: string;
  description: string;
  image: string;
  icon: string;
  pageIntro?: string;
  pageItems?: string;
  ctaLabel?: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
  order: number;
  featured: boolean;
  published: boolean;
};

export type Post = {
  _id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  publishedAt: string;
  published: boolean;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
  sourceLabel?: string;
  sourceUrl?: string;
  videoEmbedUrl?: string;
};

export type GalleryItem = {
  _id?: string;
  title: string;
  description: string;
  image: string;
  category: string;
  order: number;
  published: boolean;
};

export type Doctor = {
  _id?: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  order: number;
  published: boolean;
};

export type VideoItem = {
  _id?: string;
  title: string;
  description: string;
  embedUrl: string;
  placement: "contact" | "gallery" | "pediatric" | "knowledge";
  order: number;
  published: boolean;
};

export type Appointment = {
  _id?: string;
  name: string;
  phone: string;
  email?: string;
  service: string;
  preferredDate?: string;
  message?: string;
  status: "new" | "confirmed" | "completed" | "cancelled";
  createdAt?: string;
};
