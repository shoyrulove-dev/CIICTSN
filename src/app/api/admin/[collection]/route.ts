import { NextResponse } from "next/server";
import { collectionMap, type CollectionName } from "@/lib/admin";
import { isAdmin } from "@/lib/auth";
import { revalidateCmsCollection } from "@/lib/cms-revalidation";
import { connectToDatabase } from "@/lib/db";
import { slugify } from "@/lib/slug";
import { validateContentSlug } from "@/lib/content-slug";

type Context = { params: Promise<{ collection: string }> };

function safeModel(name: string) {
  return collectionMap[name as CollectionName];
}

export async function GET(_: Request, context: Context) {
  if (!(await isAdmin())) return NextResponse.json({ message: "Chưa đăng nhập." }, { status: 401 });
  if (!(await connectToDatabase())) return NextResponse.json({ message: "Chưa kết nối MongoDB." }, { status: 503 });
  const { collection } = await context.params;
  const Model = safeModel(collection);
  if (!Model) return NextResponse.json({ message: "Dữ liệu không hợp lệ." }, { status: 404 });
  const sort: Record<string, 1 | -1> =
    collection === "appointments"
      ? { createdAt: -1 }
      : collection === "posts"
        ? { publishedAt: -1 }
        : { order: 1, createdAt: -1 };
  const items = await Model.find({}).sort(sort).lean();
  return NextResponse.json({ items: JSON.parse(JSON.stringify(items)) });
}

export async function POST(request: Request, context: Context) {
  if (!(await isAdmin())) return NextResponse.json({ message: "Chưa đăng nhập." }, { status: 401 });
  if (!(await connectToDatabase())) return NextResponse.json({ message: "Chưa kết nối MongoDB." }, { status: 503 });
  const { collection } = await context.params;
  const Model = safeModel(collection);
  if (!Model) return NextResponse.json({ message: "Dữ liệu không hợp lệ." }, { status: 404 });
  const payload = (await request.json()) as Record<string, unknown>;
  if (payload.title && !payload.slug) payload.slug = slugify(String(payload.title));
  const slugError = await validateContentSlug(collection, payload.slug);
  if (slugError) return NextResponse.json({ message: slugError }, { status: 400 });
  if (collection === "settings") {
    const existing = await Model.findOne();
    const item = existing
      ? await Model.findByIdAndUpdate(existing._id, payload, { new: true, runValidators: true })
      : await Model.create(payload);
    revalidateCmsCollection(collection as CollectionName, item);
    return NextResponse.json({ item: JSON.parse(JSON.stringify(item)), message: "Đã cập nhật website." });
  }
  const item = await Model.create(payload);
  revalidateCmsCollection(collection as CollectionName, item);
  return NextResponse.json({ item: JSON.parse(JSON.stringify(item)), message: "Đã thêm mới." });
}
