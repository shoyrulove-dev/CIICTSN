import { AdminManager, type AdminField } from "@/components/admin/manager";
import { getSettings } from "@/lib/content";

const fields: AdminField[] = [
  { name: "siteName", label: "Tên website", section: "Nhận diện thương hiệu" },
  { name: "shortName", label: "Tên ngắn", section: "Nhận diện thương hiệu" },
  { name: "slogan", label: "Slogan", section: "Nhận diện thương hiệu" },
  { name: "logoUrl", label: "Logo website", type: "image", section: "Nhận diện thương hiệu", hint: "Có thể dán link hoặc upload ImageKit. Đề xuất logo ngang: 1200 × 400px (3:1), PNG/WebP nền trong suốt, dưới 500KB và chừa khoảng thở quanh logo." },

  { name: "heroImage", label: "Banner chính", type: "image", section: "Banner và trang chủ", hint: "Khung hiển thị 16:9. Đề xuất: 1600 × 900px, JPG/WebP dưới 400KB; chừa vùng bên trái thoáng để đặt tiêu đề và không chèn chữ/logo vào ảnh." },
  { name: "heroEyebrow", label: "Dòng nhỏ hero", section: "Banner và trang chủ" },
  { name: "heroTitle", label: "Tiêu đề hero", type: "textarea", section: "Banner và trang chủ" },
  { name: "heroSubtitle", label: "Mô tả hero", type: "textarea", section: "Banner và trang chủ" },
  { name: "aboutTitle", label: "Tiêu đề giới thiệu", type: "textarea", section: "Banner và trang chủ" },
  { name: "aboutBody", label: "Nội dung giới thiệu", type: "textarea", section: "Banner và trang chủ" },
  { name: "servicesHeroTitle", label: "Tiêu đề hero Dịch vụ", type: "textarea", section: "Trang Dịch vụ" },
  { name: "servicesHeroSubtitle", label: "Mô tả hero Dịch vụ", type: "textarea", section: "Trang Dịch vụ" },
  { name: "servicesHeroCta", label: "Nút hero Dịch vụ", section: "Trang Dịch vụ" },
  { name: "servicesClosingTitle", label: "Tiêu đề khối cuối Dịch vụ", type: "textarea", section: "Trang Dịch vụ" },
  { name: "servicesClosingBody", label: "Nội dung khối cuối Dịch vụ", type: "textarea", section: "Trang Dịch vụ" },
  { name: "aboutImage", label: "Ảnh đội ngũ trang giới thiệu", type: "image", section: "Ảnh các khu vực", hint: "Khung hiển thị vuông 1:1. Đề xuất: 1200 × 1200px, JPG/WebP dưới 350KB; đặt khuôn mặt trong vùng trung tâm." },
  { name: "technologyImage", label: "Ảnh công nghệ trang chủ", type: "image", section: "Ảnh các khu vực", hint: "Khung dọc 6:7. Đề xuất: 1200 × 1400px, JPG/WebP dưới 400KB; chủ thể ở giữa, không đặt chữ trong ảnh." },

  { name: "bodyFont", label: "Font chữ nội dung", type: "select", section: "Font và kích thước", options: ["Be Vietnam Pro", "Manrope", "Arial", "Tahoma", "Georgia"] },
  { name: "headingFont", label: "Font chữ tiêu đề", type: "select", section: "Font và kích thước", options: ["Manrope", "Be Vietnam Pro", "Arial", "Tahoma", "Georgia"] },
  { name: "bodyFontSize", label: "Cỡ chữ nội dung (px)", type: "number", section: "Font và kích thước", hint: "Đề xuất 15–18px." },
  { name: "headingFontSize", label: "Cỡ tiêu đề lớn nhất (px)", type: "number", section: "Font và kích thước", hint: "Đề xuất 52–72px." },

  { name: "primaryColor", label: "Màu chính (xanh logo)", type: "color", section: "Màu sắc giao diện" },
  { name: "accentColor", label: "Màu nền nhấn", type: "color", section: "Màu sắc giao diện" },
  { name: "backgroundColor", label: "Màu nền website", type: "color", section: "Màu sắc giao diện" },
  { name: "textColor", label: "Màu chữ nội dung", type: "color", section: "Màu sắc giao diện" },
  { name: "headingColor", label: "Màu tiêu đề", type: "color", section: "Màu sắc giao diện" },

  { name: "seoTitle", label: "SEO title toàn website", section: "SEO Google" },
  { name: "seoDescription", label: "SEO description", type: "textarea", section: "SEO Google" },
  { name: "seoKeywords", label: "Từ khóa SEO", section: "SEO Google" },
  { name: "ogImage", label: "Ảnh chia sẻ Google/Facebook", type: "image", section: "SEO Google", hint: "Chuẩn Open Graph: 1200 × 630px (1.91:1), JPG/WebP dưới 300KB; không đặt nội dung quan trọng sát mép." },

  { name: "contact.phone", label: "Hotline", section: "Thông tin liên hệ" },
  { name: "contact.email", label: "Email", section: "Thông tin liên hệ" },
  { name: "contact.address", label: "Địa chỉ", type: "textarea", section: "Thông tin liên hệ" },
  { name: "contact.hours", label: "Giờ làm việc", section: "Thông tin liên hệ" },
  { name: "contact.facebook", label: "Facebook", type: "url", section: "Thông tin liên hệ" },
  { name: "contact.zalo", label: "Zalo", type: "url", section: "Thông tin liên hệ" },
  { name: "contact.tiktok", label: "TikTok Nha khoa Presmile", type: "url", section: "Mạng xã hội", placeholder: "https://www.tiktok.com/@nhakhoapresmile" },
  { name: "contact.tiktokDoctor", label: "TikTok Bác sĩ Liên", type: "url", section: "Mạng xã hội", placeholder: "https://www.tiktok.com/@bslienpresmile" },
  { name: "contact.youtube", label: "Kênh YouTube", type: "url", section: "Mạng xã hội", placeholder: "https://www.youtube.com/@ten-kenh", hint: "Để trống thì icon YouTube sẽ tự ẩn." },
  { name: "contact.mapUrl", label: "Google Maps", type: "url", section: "Thông tin liên hệ" },
];

export default async function AdminSettingsPage() {
  const settings = await getSettings();
  return <><div className="admin-page-heading"><div><span>Website Presmile</span><h1>Cấu hình website</h1><p>Cập nhật nhận diện, nội dung trang chủ và thông tin liên hệ.</p></div></div><AdminManager collection="settings" fields={fields} initialItems={[settings as unknown as Record<string, unknown>]} singleton /></>;
}
