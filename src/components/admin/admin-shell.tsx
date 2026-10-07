"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { Icon } from "@/components/icons";

const nav=[["Tổng quan","/admin","shield"],["Chương trình","/admin/services","sparkle"],["Bài viết","/admin/posts","align"],["Kho ảnh","/admin/gallery","family"],["Đối tác / hồ sơ","/admin/doctors","shield"],["Video","/admin/videos","sparkle"],["Đăng ký","/admin/appointments","calendar"],["Cấu hình","/admin/settings","align"],["Tích hợp","/admin/integrations","sparkle"]];

export function AdminShell({children}:{children:ReactNode}){
  const pathname=usePathname();const [pending,setPending]=useState("");
  return <div className="admin-root"><aside className="admin-sidebar"><Link href="/admin" className="admin-brand"><Image src="/images/ciic/logo.jpeg" alt="CIIC" width={48} height={48}/><div><b>CIIC</b><small>Quản lý website</small></div></Link><nav>{nav.map(([label,href,icon])=>{const active=href==="/admin"?pathname===href:pathname.startsWith(href);return <Link className={`${active?"active":""}${pending===href?" pending":""}`} href={href} key={href} onClick={()=>!active&&setPending(href)}><Icon name={icon}/><span>{label}</span>{pending===href&&<i className="admin-nav-spinner"/>}</Link>})}</nav></aside><div className="admin-main"><header className="admin-top"><div><span>CIIC Tân Sơn Nhất</span><b>Quản lý nội dung website</b></div><div className="admin-top-actions"><Link href="/" target="_blank"><Icon name="arrow"/><span>Xem website</span></Link><form action="/api/auth/logout" method="post"><button className="admin-logout" type="submit"><Icon name="arrow"/><span>Đăng xuất</span></button></form><span className="admin-avatar">CI</span></div></header><main>{children}</main></div></div>;
}
