import { NextResponse } from "next/server";
import { revalidateCmsCollection } from "@/lib/cms-revalidation";
import { connectToDatabase } from "@/lib/db";
import { AppointmentModel } from "@/models/cms";
import { sendRegistrationEmail } from "@/lib/resend";
import {createHash} from "node:crypto";

export async function POST(request: Request) {
  const data = (await request.json()) as Record<string, unknown>;
  const name = String(data.name || "").trim();
  const phone = String(data.phone || "").trim();
  if(data.company)return NextResponse.json({message:"Đã nhận thông tin."});
  const startedAt=Number(data.startedAt||0);if(!startedAt||Date.now()-startedAt<1800)return NextResponse.json({message:"Vui lòng kiểm tra lại thông tin."},{status:400});
  if (name.length < 2 || name.length>100 || phone.replace(/\D/g, "").length < 9) return NextResponse.json({message:"Vui lòng nhập họ tên và số điện thoại hợp lệ."},{status:400});
  if (!(await connectToDatabase())) return NextResponse.json({message:"Hiện chưa thể nhận thông tin trực tuyến. Bạn vui lòng gọi 079 8888 558 để được hỗ trợ."},{status:503});
  const email=String(data.email||"").trim();
  if(email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))return NextResponse.json({message:"Email chưa đúng định dạng."},{status:400});
  const service=String(data.service||"Đăng ký tham gia CIIC").slice(0,120);
  const message=String(data.message||"").trim().slice(0,3000);
  const forwarded=request.headers.get("x-forwarded-for")?.split(",")[0]||"unknown";const ipHash=createHash("sha256").update(`${forwarded}:${process.env.SESSION_SECRET||"ciic"}`).digest("hex");
  const recent=await AppointmentModel.countDocuments({ipHash,createdAt:{$gte:new Date(Date.now()-10*60*1000)}});if(recent>=5)return NextResponse.json({message:"Bạn đã gửi nhiều lần. Vui lòng thử lại sau ít phút."},{status:429});
  await AppointmentModel.create({name,phone,email,service,preferredDate:"",message,status:"new",ipHash});
  try { await sendRegistrationEmail({name,phone,email,service,message}); } catch (error) { console.error("Resend notification failed",error); }
  revalidateCmsCollection("appointments");
  return NextResponse.json({message:"CIIC đã nhận thông tin. Chúng tôi sẽ liên hệ xác nhận sớm nhất."});
}
