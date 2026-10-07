import Link from "next/link";
import { unstable_cache } from "next/cache";
import { connectToDatabase } from "@/lib/db";
import { AppointmentModel, GalleryModel, PostModel, ServiceModel } from "@/models/cms";

const getDashboardCounts = unstable_cache(async () => {
  const connected = Boolean(await connectToDatabase());
  const counts = connected
    ? await Promise.all([ServiceModel.countDocuments(), PostModel.countDocuments(), GalleryModel.countDocuments(), AppointmentModel.countDocuments({ status: "new" })])
    : [6, 3, 3, 0];
  return { connected, counts };
}, ["admin-dashboard-counts"], { revalidate: 60, tags: ["admin-counts"] });

export default async function DashboardPage() {
  const { connected, counts } = await getDashboardCounts();
  const cards = [["Chương trình", counts[0], "/admin/services"], ["Bài viết", counts[1], "/admin/posts"], ["Ảnh / sự kiện", counts[2], "/admin/gallery"], ["Đăng ký mới", counts[3], "/admin/appointments"]];
  return (
    <>
      <div className="admin-page-heading"><div><span>Tổng quan</span><h1>Quản lý website</h1><p>Xem nhanh và cập nhật mọi nội dung của CIIC tại đây.</p></div><Link className="admin-primary" href="/admin/settings">Chỉnh sửa trang chủ</Link></div>
      {!connected ? <div className="admin-connection-warning"><b>Tạm thời chưa lưu được thay đổi</b><span>Vui lòng báo người phụ trách website để kiểm tra.</span></div> : <div className="admin-connection-ok">Website đã sẵn sàng để cập nhật</div>}
      <div className="admin-stat-grid">{cards.map(([label, value, href]) => <Link href={String(href)} key={String(label)}><span>{label}</span><b>{value}</b><small>Xem và quản lý →</small></Link>)}</div>
      <section className="admin-welcome"><div><span>CIIC Tân Sơn Nhất</span><h2>Mọi nội dung của CIIC được quản lý tại một nơi.</h2><p>Bạn có thể cập nhật chương trình, hình ảnh, bài viết và thông tin thương hiệu. Nội dung mới sẽ xuất hiện trên website sau khi lưu.</p></div><Link href="/" target="_blank">Mở website ↗</Link></section>
    </>
  );
}
