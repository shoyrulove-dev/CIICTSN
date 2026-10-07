"use client";

import { useSearchParams } from "next/navigation";

export function LoginForm() {
  const params = useSearchParams();
  return (
    <form action="/api/auth/login" method="post" className="admin-login-form">
      <input type="hidden" name="next" value={params.get("next") || "/admin"} />
      <label>Tên đăng nhập<input name="username" autoComplete="username" required placeholder="admin" /></label>
      <label>Mật khẩu<input name="password" type="password" autoComplete="current-password" required placeholder="••••••••" /></label>
      {params.get("error") ? <p>Tên đăng nhập hoặc mật khẩu chưa đúng.</p> : null}
      <button className="button button-primary">Đăng nhập quản trị</button>
    </form>
  );
}

