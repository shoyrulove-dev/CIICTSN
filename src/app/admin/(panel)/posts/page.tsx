import { AdminManager, type AdminField } from "@/components/admin/manager";
import { getPosts } from "@/lib/content";

const fields: AdminField[] = [
  { name: "title", label: "Tiêu đề" }, { name: "slug", label: "Đường dẫn (slug)" },
  { name: "excerpt", label: "Mô tả ngắn", type: "textarea" }, { name: "content", label: "Nội dung bài viết", type: "textarea", hint: "Dùng ## Tiêu đề mục và ### Tiêu đề nhỏ để tạo mục lục tự động. Mỗi đoạn cách nhau bằng một dòng trống." },
  { name: "image", label: "Ảnh đại diện", type: "image", hint: "Khung hiển thị 16:9. Đề xuất: 1600 × 900px, JPG/WebP dưới 400KB; không đặt chữ sát mép ảnh." }, { name: "publishedAt", label: "Ngày đăng", type: "date" },
  { name: "metaTitle", label: "SEO title" }, { name: "metaDescription", label: "SEO description", type: "textarea" },
  { name: "keywords", label: "Từ khóa SEO" }, { name: "sourceLabel", label: "Tên nguồn tham khảo" },
  { name: "sourceUrl", label: "URL nguồn tham khảo", type: "url" },
  { name: "videoEmbedUrl", label: "Video YouTube nhúng (không bắt buộc)", type: "url", placeholder: "https://www.youtube-nocookie.com/embed/VIDEO_ID", hint: "YouTube Unlisted → Share → Embed → copy URL trong src. Video sẽ hiện trong bài viết." },
  { name: "published", label: "Đang hiển thị", type: "checkbox" },
];

export default async function AdminPostsPage() {
  const items = await getPosts(true);
  return <><div className="admin-page-heading"><div><span>Tin tức CIIC</span><h1>Bài viết</h1><p>Chia sẻ hoạt động, câu chuyện và thông tin hữu ích đến cộng đồng.</p></div></div><AdminManager collection="posts" fields={fields} initialItems={items as unknown as Record<string, unknown>[]} /></>;
}
