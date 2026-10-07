import { AdminManager, type AdminField } from "@/components/admin/manager";
import { getServices } from "@/lib/content";

const fields: AdminField[] = [
  { name: "title", label: "Tên dịch vụ" }, { name: "slug", label: "Đường dẫn (slug)" },
  { name: "excerpt", label: "Mô tả ngắn", type: "textarea" }, { name: "description", label: "Nội dung chi tiết", type: "textarea" },
  { name: "pageIntro", label: "Mở đầu section Dịch vụ", type: "textarea", hint: "Hiển thị trên trang /dich-vu. Nếu để trống sẽ dùng nội dung mẫu." },
  { name: "pageItems", label: "Danh mục trong section", type: "textarea", hint: "Mỗi dòng là một hạng mục dịch vụ trên trang /dich-vu." },
  { name: "ctaLabel", label: "Nút CTA section", hint: "VD: Đặt lịch tư vấn chuyên sâu" },
  { name: "image", label: "Hình ảnh dịch vụ", type: "image", hint: "Khung hiển thị 16:9. Đề xuất: 1600 × 900px, JPG/WebP dưới 400KB; đặt chủ thể ở giữa để hiển thị tốt trên mobile." }, { name: "icon", label: "Biểu tượng", type: "select", options: ["implant", "sparkle", "align", "family", "shield", "tooth"] },
  { name: "metaTitle", label: "SEO title", section: "SEO Google", hint: "Đề xuất 50–60 ký tự. Để trống sẽ dùng tên dịch vụ." },
  { name: "metaDescription", label: "SEO description", type: "textarea", section: "SEO Google", hint: "Đề xuất 140–160 ký tự. Để trống sẽ dùng mô tả ngắn." },
  { name: "keywords", label: "Từ khóa SEO", section: "SEO Google", hint: "Phân cách các từ khóa bằng dấu phẩy." },
  { name: "order", label: "Thứ tự", type: "number" }, { name: "featured", label: "Hiển thị nổi bật", type: "checkbox" },
  { name: "published", label: "Đang hiển thị", type: "checkbox" },
];

export default async function AdminServicesPage() {
  const items = await getServices(true);
  return <><div className="admin-page-heading"><div><span>Nội dung</span><h1>Dịch vụ</h1><p>Quản lý các dịch vụ và thông tin điều trị trên website.</p></div></div><AdminManager collection="services" fields={fields} initialItems={items as unknown as Record<string, unknown>[]} /></>;
}
