import { NextResponse } from "next/server";
import { revalidateCmsCollection } from "@/lib/cms-revalidation";
import { connectToDatabase } from "@/lib/db";
import { AppointmentModel } from "@/models/cms";

export async function POST(request: Request) {
  const data = (await request.json()) as Record<string, unknown>;
  const name = String(data.name || "").trim();
  const phone = String(data.phone || "").trim();
  if (name.length < 2 || phone.replace(/\D/g, "").length < 9) {
    return NextResponse.json({ message: "Vui lòng nhập họ tên và số điện thoại hợp lệ." }, { status: 400 });
  }
  if (!(await connectToDatabase())) {
    return NextResponse.json(
      { message: "Form đang chờ kết nối MongoDB. Vui lòng gọi trực tiếp 091 333 7672." },
      { status: 503 }
    );
  }
  await AppointmentModel.create({
    name,
    phone,
    email: String(data.email || "").trim(),
    service: String(data.service || "Tư vấn tổng quát"),
    preferredDate: String(data.preferredDate || ""),
    message: String(data.message || "").trim(),
    status: "new",
  });
  revalidateCmsCollection("appointments");
  return NextResponse.json({ message: "Presmile đã nhận yêu cầu. Chúng tôi sẽ liên hệ xác nhận sớm nhất." });
}
