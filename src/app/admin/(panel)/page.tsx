import Link from "next/link";
import { connectToDatabase } from "@/lib/db";
import { AppointmentModel, GalleryModel, PostModel, ServiceModel } from "@/models/cms";

export default async function DashboardPage() {
  const connected = Boolean(await connectToDatabase());
  const counts = connected
    ? await Promise.all([ServiceModel.countDocuments(), PostModel.countDocuments(), GalleryModel.countDocuments(), AppointmentModel.countDocuments({ status: "new" })])
    : [6, 3, 3, 0];
  const cards = [["Dịch vụ", counts[0], "/admin/services"], ["Bài viết", counts[1], "/admin/posts"], ["Ảnh thư viện", counts[2], "/admin/gallery"], ["Lịch hẹn mới", counts[3], "/admin/appointments"]];
  return (
    <>
      <div className="admin-page-heading"><div><span>Tổng quan</span><h1>Bảng điều khiển</h1><p>Theo dõi và cập nhật website Presmile từ một nơi.</p></div><Link className="admin-primary" href="/admin/settings">Cấu hình website</Link></div>
      {!connected ? <div className="admin-connection-warning"><b>Chưa thể lưu thay đổi</b><span>Vui lòng liên hệ người phụ trách kỹ thuật để kiểm tra kết nối dữ liệu website.</span></div> : <div className="admin-connection-ok">Dữ liệu website đang hoạt động ổn định</div>}
      <div className="admin-stat-grid">{cards.map(([label, value, href]) => <Link href={String(href)} key={String(label)}><span>{label}</span><b>{value}</b><small>Xem và quản lý →</small></Link>)}</div>
      <section className="admin-welcome"><div><span>Presmile Dental Center</span><h2>Nội dung rõ ràng giúp khách hàng an tâm trước cả khi đến phòng khám.</h2><p>Hãy cập nhật dịch vụ, hình ảnh thật và kiến thức hữu ích đều đặn. Sau khi lưu, thay đổi sẽ hiển thị trên website.</p></div><Link href="/" target="_blank">Mở website ↗</Link></section>
    </>
  );
}
