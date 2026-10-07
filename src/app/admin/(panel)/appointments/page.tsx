import { AdminManager, type AdminField } from "@/components/admin/manager";
import { connectToDatabase } from "@/lib/db";
import { AppointmentModel } from "@/models/cms";

const fields: AdminField[] = [
  { name: "name", label: "Khách hàng" }, { name: "phone", label: "Số điện thoại" },
  { name: "email", label: "Email" }, { name: "service", label: "Vai trò / nội dung quan tâm" },
  { name: "preferredDate", label: "Ngày mong muốn", type: "date" }, { name: "message", label: "Lời nhắn", type: "textarea" },
  { name: "status", label: "Trạng thái", type: "select", options: ["new", "confirmed", "completed", "cancelled"] },
];

export default async function AdminAppointmentsPage() {
  const items = (await connectToDatabase()) ? JSON.parse(JSON.stringify(await AppointmentModel.find({}).sort({ createdAt: -1 }).lean())) : [];
  return <><div className="admin-page-heading"><div><span>Khách hàng</span><h1>Lịch hẹn</h1><p>Tiếp nhận và cập nhật trạng thái yêu cầu đặt lịch từ website.</p></div></div><AdminManager collection="appointments" fields={fields} initialItems={items} titleField="name" /></>;
}

