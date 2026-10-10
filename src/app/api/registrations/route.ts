import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { sendActivityRegistrationEmails } from "@/lib/resend";
import { ActivityModel, NotificationModel, RegistrationModel, ScheduleModel } from "@/models/cms";

export async function POST(request: Request) {
  const data = await request.json() as Record<string, unknown>;
  const name = String(data.name || "").trim(), phone = String(data.phone || "").trim(), email = String(data.email || "").trim(), scheduleId = String(data.scheduleId || "");
  const participants = Math.max(1, Number(data.participants || 1));
  if (name.length < 2 || phone.replace(/\D/g, "").length < 9 || !scheduleId) return NextResponse.json({ message: "Vui lòng nhập đủ thông tin và chọn lịch." }, { status: 400 });
  if (!(await connectToDatabase())) return NextResponse.json({ message: "Chưa thể nhận đăng ký lúc này." }, { status: 503 });
  const demo = scheduleId.startsWith("demo-");
  const schedule = demo ? { _id: scheduleId, activityId: "demo-pickleball", eventId: "", capacity: 12, status: "open", title: "Lịch trải nghiệm Pickleball" } : await ScheduleModel.findById(scheduleId).lean();
  if (!schedule || !["open", "full"].includes(schedule.status)) return NextResponse.json({ message: "Lịch này chưa mở đăng ký." }, { status: 400 });
  const used = await RegistrationModel.aggregate([{ $match: { scheduleId, status: { $in: ["pending", "confirmed"] } } }, { $group: { _id: null, total: { $sum: "$participants" } } }]);
  const status = schedule.capacity && (used[0]?.total || 0) + participants > schedule.capacity ? "waitlist" : "pending";
  const item = await RegistrationModel.create({ code: `RG-${Date.now().toString(36).toUpperCase()}`, name, phone, email, scheduleId, activityId: schedule.activityId, eventId: schedule.eventId, participants, status });
  const activity = demo ? { name: "Pickleball" } : await ActivityModel.findById(schedule.activityId).select("name").lean();
  let mailStatus = "queued";
  try { const sent = await sendActivityRegistrationEmails({ code: item.code, name, phone, email, activity: activity?.name || "Hoạt động CIIC", schedule: schedule.title, participants, waitlisted: status === "waitlist" }); mailStatus = sent.adminSent ? "sent" : "queued"; } catch { mailStatus = "failed"; }
  await NotificationModel.create({ recipient: email || phone, channel: "email", subject: `Đăng ký hoạt động ${item.code}`, message: status === "waitlist" ? "Đã thêm vào danh sách chờ." : "Đã ghi nhận và chờ CIIC xác nhận.", relatedType: "registration", relatedId: String(item._id), status: mailStatus, sentAt: mailStatus === "sent" ? new Date().toISOString() : "" });
  return NextResponse.json({ message: status === "waitlist" ? `Lịch đã đủ chỗ. ${item.code} đã được đưa vào danh sách chờ.` : `Đã nhận đăng ký ${item.code}. CIIC sẽ liên hệ xác nhận.` });
}
