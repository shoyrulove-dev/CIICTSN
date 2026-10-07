import { AdminManager, type AdminField } from "@/components/admin/manager";
import { getGallery } from "@/lib/content";

const fields: AdminField[] = [
  { name: "title", label: "Tiêu đề tầng nội dung" }, { name: "description", label: "Nội dung mô tả", type: "textarea", placeholder: "Mô tả không gian, đội ngũ hoặc công nghệ trong hình..." },
  { name: "image", label: "Banner của tầng", type: "image", hint: "Khung hiển thị 16:9. Đề xuất: 1600 × 900px, JPG/WebP dưới 450KB; đặt chủ thể ở vùng giữa để các tầng lệch nhau vẫn đẹp trên mobile." },
  { name: "category", label: "Danh mục" }, { name: "order", label: "Thứ tự", type: "number" },
  { name: "published", label: "Đang hiển thị", type: "checkbox" },
];

export default async function AdminGalleryPage() {
  const items = await getGallery(true);
  return <><div className="admin-page-heading"><div><span>Hình ảnh</span><h1>Kho hình ảnh</h1><p>Lưu hình ảnh và nội dung theo từng khu vực để dùng khi cần cập nhật website.</p></div></div><AdminManager collection="gallery" fields={fields} initialItems={items as unknown as Record<string, unknown>[]} /></>;
}
