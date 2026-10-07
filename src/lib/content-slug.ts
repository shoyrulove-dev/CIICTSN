import { PostModel, ServiceModel } from "@/models/cms";

const RESERVED_SLUGS = new Set([
  "admin", "api", "dich-vu", "kien-thuc", "gioi-thieu", "lien-he", "thu-vien",
  "robots.txt", "sitemap.xml", "manifest.webmanifest", "icon.png",
]);

export async function validateContentSlug(collection: string, slugValue: unknown, excludeId?: string) {
  if (collection !== "services" && collection !== "posts") return "";
  const slug = String(slugValue || "").trim();
  if (!slug) return "Đường dẫn (slug) không được để trống.";
  if (RESERVED_SLUGS.has(slug)) return "Đường dẫn này trùng với một trang hệ thống. Vui lòng chọn slug khác.";

  const query = excludeId ? { slug, _id: { $ne: excludeId } } : { slug };
  const [serviceExists, postExists] = await Promise.all([
    ServiceModel.exists(query),
    PostModel.exists(query),
  ]);
  if (serviceExists || postExists) return "Slug đã được dùng bởi một dịch vụ hoặc bài viết khác.";
  return "";
}
