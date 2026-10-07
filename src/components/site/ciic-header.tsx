"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { SiteSettings } from "@/types/cms";

const groups = [
  { label: "GIỚI THIỆU", links: [["Về CIIC", "#about"], ["Mục tiêu", "#goals"], ["Giá trị mô hình", "#values"]] },
  { label: "HỆ SINH THÁI", links: [["Lĩnh vực hoạt động", "#ecosystem"], ["Không gian CIIC", "#spaces"], ["Chương trình", "#events"]] },
  { label: "HOẠT ĐỘNG", links: [["Lịch hoạt động", "#activities"], ["Sự kiện văn hóa", "#events"], ["Tin tức", "#news"]] },
  { label: "THAM GIA", links: [["Người dân", "#register"], ["Doanh nghiệp / CLB", "#register"], ["Đề xuất hợp tác", "#register"]] },
];

export function CiicHeader({ settings }: { settings: SiteSettings }) {
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (openMenu === null) return;
    const close = () => setOpenMenu(null);
    const timer = window.setTimeout(close, 60_000);
    const outside = (event: MouseEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) close();
    };
    const keyboard = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", keyboard);
    window.addEventListener("hashchange", close);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", keyboard);
      window.removeEventListener("hashchange", close);
    };
  }, [openMenu]);

  return <>
    <div className="ipf-top"><div className="ipf-container"><span>TRUNG TÂM ĐỔI MỚI SÁNG TẠO CÔNG NGHIỆP VĂN HÓA · TÂN SƠN NHẤT</span><span>{settings.contact.address}</span></div></div>
    <header className="ipf-header" ref={headerRef}>
      <div className="ipf-container ipf-header-inner">
        <Link className="ipf-brand" href="/" onClick={() => setOpenMenu(null)}><Image src={settings.logoUrl} alt={settings.shortName} width={76} height={76}/><span><b>CIIC</b><small>TÂN SƠN NHẤT</small></span></Link>
        <nav className="ipf-nav" aria-label="Điều hướng chính">
          {groups.map((group, index) => <details open={openMenu === index} key={group.label} onToggle={(event) => {
            if (event.currentTarget.open) setOpenMenu(index);
          }}>
            <summary onClick={(event) => { event.preventDefault(); setOpenMenu((current) => current === index ? null : index); }}>{group.label}</summary>
            <div>{group.links.map(([label, href]) => <a href={href} key={`${label}-${href}`} onClick={() => setOpenMenu(null)}>{label}</a>)}</div>
          </details>)}
        </nav>
        <a className="ipf-cta" href="#register" onClick={() => setOpenMenu(null)}>ĐĂNG KÝ THAM GIA</a>
      </div>
    </header>
  </>;
}
