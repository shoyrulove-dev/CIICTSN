import { NextResponse } from "next/server";
import { collectionMap, type CollectionName } from "@/lib/admin";
import { isAdmin } from "@/lib/auth";
import { revalidateCmsCollection } from "@/lib/cms-revalidation";
import { connectToDatabase } from "@/lib/db";
import { slugify } from "@/lib/slug";
import { validateContentSlug } from "@/lib/content-slug";
import {AuditLogModel,BookingModel} from "@/models/cms";

type Context = { params: Promise<{ collection: string; id: string }> };

function flattenUpdate(payload: Record<string, unknown>, prefix = ""): Record<string, unknown> {
  return Object.entries(payload).reduce<Record<string, unknown>>((update, [key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === "object" && !Array.isArray(value) && !(value instanceof Date)) {
      Object.assign(update, flattenUpdate(value as Record<string, unknown>, path));
    } else update[path] = value;
    return update;
  }, {});
}

export async function PUT(request: Request, context: Context) {
  if (!(await isAdmin())) return NextResponse.json({ message: "Chưa đăng nhập." }, { status: 401 });
  if (!(await connectToDatabase())) return NextResponse.json({ message: "Chưa kết nối MongoDB." }, { status: 503 });
  const { collection, id } = await context.params;
  const Model = collectionMap[collection as CollectionName];
  if (!Model) return NextResponse.json({ message: "Dữ liệu không hợp lệ." }, { status: 404 });
  const payload = (await request.json()) as Record<string, unknown>;
  if(collection==="bookings"&&payload.resourceId&&payload.startAt&&payload.endAt){const conflict=await BookingModel.exists({_id:{$ne:id},resourceId:payload.resourceId,status:{$in:["pending","confirmed"]},startAt:{$lt:String(payload.endAt)},endAt:{$gt:String(payload.startAt)}});if(conflict)return NextResponse.json({message:"Khung giờ này đã có yêu cầu đặt chỗ."},{status:409});}
  if (payload.title && !payload.slug) payload.slug = slugify(String(payload.title));
  const slugError = await validateContentSlug(collection, payload.slug, id);
  if (slugError) return NextResponse.json({ message: slugError }, { status: 400 });
  const previousItem = await Model.findById(id).lean();
  const item = await Model.findByIdAndUpdate(id, flattenUpdate(payload), { new: true, runValidators: true });
  if (!item) return NextResponse.json({ message: "Không tìm thấy dữ liệu." }, { status: 404 });
  revalidateCmsCollection(collection as CollectionName, item, previousItem);
  await AuditLogModel.create({actor:"admin",role:"super_admin",action:"update",collectionName:collection,itemId:id,summary:`Cập nhật ${collection}`});
  return NextResponse.json({ item: JSON.parse(JSON.stringify(item)), message: "Đã lưu thay đổi." });
}

export async function DELETE(_: Request, context: Context) {
  if (!(await isAdmin())) return NextResponse.json({ message: "Chưa đăng nhập." }, { status: 401 });
  if (!(await connectToDatabase())) return NextResponse.json({ message: "Chưa kết nối MongoDB." }, { status: 503 });
  const { collection, id } = await context.params;
  const Model = collectionMap[collection as CollectionName];
  if (!Model || collection === "settings") return NextResponse.json({ message: "Không thể xóa dữ liệu này." }, { status: 400 });
  const item = await Model.findByIdAndDelete(id);
  if (!item) return NextResponse.json({ message: "Không tìm thấy dữ liệu." }, { status: 404 });
  revalidateCmsCollection(collection as CollectionName, item);
  await AuditLogModel.create({actor:"admin",role:"super_admin",action:"delete",collectionName:collection,itemId:id,summary:`Xóa ${collection}`});
  return NextResponse.json({ message: "Đã xóa." });
}
