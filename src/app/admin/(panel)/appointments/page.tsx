import { AdminManager, type AdminField } from "@/components/admin/manager";
import { connectToDatabase } from "@/lib/db";
import { AppointmentModel } from "@/models/cms";

const fields: AdminField[] = [
  { name: "name", label: "Khách hàng" }, { name: "phone", label: "Số điện thoại" },
  { name: "email", label: "Email" }, { name: "service", label: "Vai trò / nội dung quan tâm" },
  { name: "preferredDate", label: "Ngày mong muốn", type: "date" }, { name: "message", label: "Lời nhắn", type: "textarea" },
  { name: "status", label: "Tình trạng liên hệ", type: "select", options: ["Mới nhận", "Đã liên hệ", "Đã hoàn tất", "Đã hủy"] },
];

export default async function AdminAppointmentsPage() {
  const items = (await connectToDatabase()) ? JSON.parse(JSON.stringify(await AppointmentModel.find({}).sort({ createdAt: -1 }).lean())) : [];
  return <><div className="admin-page-heading"><div><span>Người quan tâm</span><h1>Thông tin đăng ký</h1><p>Xem và theo dõi những người đã gửi lời nhắn từ website.</p></div></div><AdminManager collection="appointments" fields={fields} initialItems={items} titleField="name" /></>;
}

