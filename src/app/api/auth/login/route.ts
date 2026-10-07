import { NextResponse } from "next/server";
import { ADMIN_COOKIE, createSession, verifyCredentials } from "@/lib/auth";

export async function POST(request: Request) {
  let data: FormData;
  try {
    data = await request.formData();
  } catch {
    return NextResponse.json({ message: "Dữ liệu đăng nhập không hợp lệ." }, { status: 400 });
  }
  const username = String(data.get("username") || "");
  const password = String(data.get("password") || "");
  const next = String(data.get("next") || "/admin");

  if (!verifyCredentials(username, password)) {
    return NextResponse.redirect(new URL("/admin/login?error=1", request.url), 303);
  }

  const { token, maxAge } = createSession();
  const response = NextResponse.redirect(new URL(next.startsWith("/admin") ? next : "/admin", request.url), 303);
  response.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge,
  });
  return response;
}
