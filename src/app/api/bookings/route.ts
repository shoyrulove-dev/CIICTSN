import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { sendBookingEmails } from "@/lib/resend";
import { BookingModel, NotificationModel, ResourceModel } from "@/models/cms";

export async function GET() {
  const demo = { _id: "demo-resource-pickleball", name: "Sân Pickleball demo", price: 0, unit: "giờ" };
  if (!(await connectToDatabase())) return NextResponse.json({ resources: [demo] });
  const resources = await ResourceModel.find({ published: true, status: "published" }).sort({ order: 1 }).lean();
  return NextResponse.json({ resources: JSON.parse(JSON.stringify(resources.length ? resources : [demo])) });
}

export async function POST(request: Request) {
  const data = await request.json() as Record<string, unknown>;
  const name = String(data.name || "").trim(), phone = String(data.phone || "").trim(), email = String(data.email || "").trim();
  const resourceId = String(data.resourceId || ""), startAt = String(data.startAt || ""), endAt = String(data.endAt || "");
  const participants = Math.max(1, Number(data.participants || 1));
  if (name.length < 2 || phone.replace(/\D/g, "").length < 9 || !resourceId || !startAt || !endAt || new Date(startAt) >= new Date(endAt)) return NextResponse.json({ message: "Vui lòng kiểm tra họ tên, điện thoại, sân/phòng và thời gian." }, { status: 400 });
  if (!(await connectToDatabase())) return NextResponse.json({ message: "Chưa thể nhận yêu cầu lúc này." }, { status: 503 });
  const conflict = await BookingModel.exists({ resourceId, status: { $in: ["pending", "confirmed"] }, startAt: { $lt: endAt }, endAt: { $gt: startAt } });
  if (conflict) return NextResponse.json({ message: "Khung giờ này đã có người đặt. Vui lòng chọn giờ khác." }, { status: 409 });
  const resource = resourceId.startsWith("demo-") ? { name: "Sân Pickleball demo" } : await ResourceModel.findById(resourceId).select("name").lean();
  const item = await BookingModel.create({ code: `BK-${Date.now().toString(36).toUpperCase()}`, name, phone, email, resourceId, startAt, endAt, participants, message: String(data.message || "").slice(0, 2000), status: "pending" });
  let mailStatus = "queued";
  try { const sent = await sendBookingEmails({ code: item.code, name, phone, email, resource: resource?.name || resourceId, startAt, endAt, participants }); mailStatus = sent.adminSent ? "sent" : "queued"; } catch { mailStatus = "failed"; }
  await NotificationModel.create({ recipient: email || phone, channel: "email", subject: `Yêu cầu đặt chỗ ${item.code}`, message: "Đã ghi nhận yêu cầu và chờ CIIC xác nhận.", relatedType: "booking", relatedId: String(item._id), status: mailStatus, sentAt: mailStatus === "sent" ? new Date().toISOString() : "" });
  return NextResponse.json({ message: `Đã nhận yêu cầu ${item.code}. CIIC sẽ liên hệ xác nhận.` });
}
