import Link from "next/link";
import { unstable_cache } from "next/cache";
import { connectToDatabase } from "@/lib/db";
import { ActivityModel, AppointmentModel, BookingModel, GalleryModel, PostModel, RegistrationModel, ScheduleModel, ServiceModel } from "@/models/cms";

const getDashboardCounts = unstable_cache(async () => {
  const connected = Boolean(await connectToDatabase());
  const counts = connected ? await Promise.all([
    ServiceModel.countDocuments(), PostModel.countDocuments(), GalleryModel.countDocuments(),
    AppointmentModel.countDocuments({ status: "new" }), BookingModel.countDocuments({ status: "pending" }),
    RegistrationModel.countDocuments({ status: { $in: ["pending", "waitlist"] } }),
    ActivityModel.countDocuments({ published: true }), ScheduleModel.countDocuments({ status: "open" }),
  ]) : [6, 3, 3, 0, 0, 0, 0, 0];
  return { connected, counts };
}, ["admin-dashboard-counts-v2"], { revalidate: 30, tags: ["admin-counts"] });

export default async function DashboardPage() {
  const { connected, counts } = await getDashboardCounts();
  const cards = [
    ["Chương trình", counts[0], "/admin/services"], ["Bài viết", counts[1], "/admin/posts"],
    ["Kho ảnh", counts[2], "/admin/gallery"], ["Liên hệ mới", counts[3], "/admin/appointments"],
    ["Đặt chỗ chờ xác nhận", counts[4], "/admin/operations/bookings"], ["Đăng ký cần xử lý", counts[5], "/admin/operations/registrations"],
    ["Hoạt động đang hiển thị", counts[6], "/admin/operations/activities"], ["Lịch đang mở", counts[7], "/admin/operations/schedules"],
  ];
  return (
    <>
      <div className="admin-page-heading"><div><span>Tổng quan</span><h1>Quản lý CIIC</h1><p>Các nội dung và yêu cầu cần xử lý được tập trung tại đây.</p></div><Link className="admin-primary" href="/admin/settings">Cập nhật trang chủ</Link></div>
      {!connected ? <div className="admin-connection-warning"><b>Tạm thời chưa lưu được thay đổi</b><span>Vui lòng báo người phụ trách website để kiểm tra.</span></div> : <div className="admin-connection-ok">Dữ liệu đang hoạt động bình thường</div>}
      <div className="admin-stat-grid">{cards.map(([label, value, href]) => <Link href={String(href)} key={String(label)}><span>{label}</span><b>{value}</b><small>Mở danh sách →</small></Link>)}</div>
      <section className="admin-welcome"><div><span>CIIC Tân Sơn Nhất</span><h2>Quản lý nội dung và vận hành tại một nơi.</h2><p>Bạn có thể cập nhật chương trình, hình ảnh, lịch hoạt động, đặt chỗ và đăng ký. Thông tin công khai sẽ xuất hiện trên website sau khi được duyệt.</p></div><Link href="/" target="_blank">Mở website ↗</Link></section>
    </>
  );
}
