import { NextResponse } from "next/server";
import { revalidateCmsCollection } from "@/lib/cms-revalidation";
import { connectToDatabase } from "@/lib/db";
import { AppointmentModel } from "@/models/cms";
import { sendRegistrationEmail } from "@/lib/resend";

export async function POST(request: Request) {
  const data = (await request.json()) as Record<string, unknown>;
  const name = String(data.name || "").trim();
  const phone = String(data.phone || "").trim();
  if (name.length < 2 || phone.replace(/\D/g, "").length < 9) return NextResponse.json({message:"Vui lòng nhập họ tên và số điện thoại hợp lệ."},{status:400});
  if (!(await connectToDatabase())) return NextResponse.json({message:"Form đang chờ kết nối MongoDB. Vui lòng gọi trực tiếp 079 8888 558."},{status:503});
  const email=String(data.email||"").trim();
  const service=String(data.service||"Đăng ký tham gia CIIC");
  const message=String(data.message||"").trim();
  await AppointmentModel.create({name,phone,email,service,preferredDate:"",message,status:"new"});
  try { await sendRegistrationEmail({name,phone,email,service,message}); } catch (error) { console.error("Resend notification failed",error); }
  revalidateCmsCollection("appointments");
  return NextResponse.json({message:"CIIC đã nhận thông tin. Chúng tôi sẽ liên hệ xác nhận sớm nhất."});
}
