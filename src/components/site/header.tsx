import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/icons";
import type { SiteSettings } from "@/types/cms";

const links = [
  ["Trang chủ", "/"],
  ["Về Presmile", "/gioi-thieu"],
  ["Dịch vụ", "/dich-vu"],
  ["Kiến thức", "/kien-thuc"],
  ["Liên hệ", "/lien-he"],
];

export function SiteHeader({ settings }: { settings: SiteSettings }) {
  return (
    <>
      <div className="topbar">
        <div className="shell topbar-inner">
          <a href={settings.contact.mapUrl} target="_blank" rel="noreferrer"><Icon name="pin" />{settings.contact.address}</a>
          <div>
            <span><Icon name="clock" />{settings.contact.hours}</span>
            <a href={`tel:${settings.contact.phone.replace(/\s/g, "")}`}><Icon name="phone" />{settings.contact.phone}</a>
          </div>
        </div>
      </div>
      <header className="site-header">
        <div className="shell nav-wrap">
          <Link className="brand" href="/" aria-label={`${settings.shortName} - Trang chủ`}>
            <Image src={settings.logoUrl} alt={settings.siteName} width={176} height={88} loading="eager" />
          </Link>
          <nav className="desktop-nav" aria-label="Điều hướng chính">
            {links.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}
          </nav>
          <Link className="button button-primary header-cta" href="/lien-he#dat-lich">Đặt lịch khám</Link>
          <details className="mobile-menu">
            <summary aria-label="Mở menu"><Icon name="menu" /></summary>
            <nav>{links.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}</nav>
          </details>
        </div>
      </header>
    </>
  );
}
