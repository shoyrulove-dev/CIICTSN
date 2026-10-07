"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { Icon } from "@/components/icons";

const nav = [
  ["Tổng quan", "/admin", "shield"],
  ["Dịch vụ", "/admin/services", "tooth"],
  ["Bài viết", "/admin/posts", "sparkle"],
  ["Kho ảnh", "/admin/gallery", "family"],
  ["Bác sĩ", "/admin/doctors", "shield"],
  ["Video", "/admin/videos", "sparkle"],
  ["Lịch hẹn", "/admin/appointments", "calendar"],
  ["Cấu hình", "/admin/settings", "align"],
];

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [navigation, setNavigation] = useState({ href: "", from: "" });

  return (
    <div className="admin-root">
      <aside className="admin-sidebar">
        <Link href="/admin" className="admin-brand"><span>PS</span><div><b>Presmile</b><small>Khu vực quản lý</small></div></Link>
        <nav>{nav.map(([label, href, icon]) => {
          const active = href === "/admin" ? pathname === href : pathname.startsWith(href);
          const pending = navigation.href === href && navigation.from === pathname;
          return <Link className={`${active ? "active" : ""}${pending ? " pending" : ""}`} href={href} key={href} aria-busy={pending} onClick={() => { if (!active) setNavigation({ href, from: pathname }); }}><Icon name={icon} /><span>{label}</span>{pending ? <i className="admin-nav-spinner" /> : null}</Link>;
        })}</nav>
      </aside>
      <div className="admin-main">
        <header className="admin-top"><div><span>Presmile Dental Center</span><b>Quản lý nội dung website</b></div><div className="admin-top-actions"><Link href="/" target="_blank" title="Mở website"><Icon name="arrow" /><span>Xem website</span></Link><form action="/api/auth/logout" method="post"><button className="admin-logout" type="submit" title="Đăng xuất" aria-label="Đăng xuất"><Icon name="arrow" /><span>Đăng xuất</span></button></form><span className="admin-avatar">AD</span></div></header>
        <main>{children}</main>
      </div>
    </div>
  );
}
