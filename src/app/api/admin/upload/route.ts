import { NextResponse } from "next/server";
import { createHmac, randomUUID } from "node:crypto";
import { isAdmin } from "@/lib/auth";

export const runtime = "nodejs";

const PROXY_MAX_FILE_SIZE = 4 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"]);

function cleanSegment(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9-_]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

function getImageKitConfig() {
  return {
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY || "",
  };
}

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ message: "Chưa đăng nhập." }, { status: 401 });
  }

  const { privateKey, publicKey } = getImageKitConfig();
  if (!privateKey || !publicKey) {
    return NextResponse.json(
      { message: "ImageKit chưa được cấu hình đầy đủ trên Vercel." },
      { status: 503 }
    );
  }

  const token = randomUUID();
  const expire = Math.floor(Date.now() / 1000) + 20 * 60;
  const signature = createHmac("sha1", privateKey).update(`${token}${expire}`).digest("hex");

  return NextResponse.json(
    { token, expire, signature, publicKey },
    { headers: { "Cache-Control": "no-store" } }
  );
}

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ message: "Chưa đăng nhập." }, { status: 401 });
  }

  const { privateKey } = getImageKitConfig();
  if (!privateKey) {
    return NextResponse.json(
      { message: "ImageKit chưa được cấu hình. Cần thêm IMAGEKIT_PRIVATE_KEY trên Vercel." },
      { status: 503 }
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ message: "Dữ liệu upload không hợp lệ." }, { status: 400 });
  }
  const file = formData.get("file");
  const requestedFolder = cleanSegment(String(formData.get("folder") || "media"));

  if (!(file instanceof File)) {
    return NextResponse.json({ message: "Không tìm thấy file upload." }, { status: 400 });
  }
  if (file.size === 0) {
    return NextResponse.json({ message: "File upload đang trống." }, { status: 400 });
  }
  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json({ message: "Chỉ hỗ trợ JPG, PNG, WebP, GIF hoặc SVG." }, { status: 400 });
  }
  if (file.size > PROXY_MAX_FILE_SIZE) {
    return NextResponse.json(
      { message: "Upload qua server chỉ hỗ trợ tối đa 4MB. Hãy upload trực tiếp từ nút ImageKit trong admin." },
      { status: 413 }
    );
  }

  const base64 = Buffer.from(await file.arrayBuffer()).toString("base64");
  const imageKitForm = new URLSearchParams();
  imageKitForm.set("file", `data:${file.type};base64,${base64}`);
  imageKitForm.set("fileName", `${Date.now()}-${cleanSegment(file.name) || "presmile-image"}`);
  imageKitForm.set("folder", `ciic/${requestedFolder}`);
  imageKitForm.set("useUniqueFileName", "true");
  imageKitForm.set("tags", "ciic,website");

  const response = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${privateKey}:`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: imageKitForm.toString(),
  });
  const result = (await response.json()) as { url?: string; thumbnailUrl?: string; fileId?: string; message?: string };

  if (!response.ok || !result.url) {
    return NextResponse.json({ message: result.message || "ImageKit upload thất bại." }, { status: response.status || 500 });
  }

  return NextResponse.json({
    message: "Upload ImageKit thành công.",
    url: result.url,
    thumbnailUrl: result.thumbnailUrl,
    fileId: result.fileId,
  });
}
