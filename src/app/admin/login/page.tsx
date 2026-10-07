import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { LoginForm } from "@/components/admin/login-form";

export default function AdminLoginPage() {
  return (
    <main className="admin-login">
      <section>
        <div className="admin-login-brand"><Image src="/images/optimized/presmile-logo-horizontal.webp" alt="Presmile Dental Center" width={180} height={58} priority /><div><h1>Chào mừng trở lại</h1><p>Đăng nhập để quản lý nội dung và lịch hẹn Presmile.</p></div></div>
        <Suspense><LoginForm /></Suspense>
        <Link href="/">← Quay lại website</Link>
      </section>
      <div className="admin-login-art"><Image src="/images/admin-login-v2.jpg" alt="Đội ngũ nha khoa Presmile" fill priority sizes="55vw" /><div><span>Presmile Admin Center</span><h2>Mọi nội dung website trong một không gian quản trị.</h2></div></div>
    </main>
  );
}
