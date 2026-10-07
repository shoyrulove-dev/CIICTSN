import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/icons";
import type { Service, SiteSettings } from "@/types/cms";

export function SiteFooter({ settings, services }: { settings: SiteSettings; services: Service[] }) {
  const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(settings.contact.address)}&output=embed`;
  const socialLinks = [
    { href: settings.contact.facebook, label: "Facebook", icon: "facebook" },
    { href: settings.contact.zalo, label: "Zalo", text: "Zalo" },
    { href: settings.contact.tiktok, label: "TikTok Nha khoa Presmile", icon: "tiktok" },
    { href: settings.contact.tiktokDoctor, label: "TikTok Bác sĩ Liên Presmile", icon: "tiktok" },
    { href: settings.contact.youtube, label: "YouTube Presmile", icon: "youtube" },
  ].filter((item) => item.href);
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <Image src={settings.logoUrl} alt={settings.siteName} width={180} height={100} />
          <strong>{settings.siteName}</strong>
          <small>{settings.slogan}</small>
          <p>{settings.aboutBody}</p>
          <div className="social-row">
            {socialLinks.map((item) => <a href={item.href} target="_blank" rel="noreferrer" aria-label={item.label} title={item.label} key={item.label}>{item.icon ? <Icon name={item.icon} /> : item.text}</a>)}
          </div>
        </div>
        <div className="footer-links" aria-label="Khám phá website">
          <Link href="/gioi-thieu">Về Presmile</Link>
          <Link href="/dich-vu">Dịch vụ nha khoa</Link>
          <Link href="/kien-thuc">Kiến thức</Link>
          <Link href="/lien-he">Liên hệ</Link>
        </div>
        <div className="footer-links" aria-label="Dịch vụ nổi bật">
          {services.slice(0, 5).map((service) => <Link href={`/${service.slug}`} key={service.slug}>{service.title}</Link>)}
        </div>
        <div className="footer-contact">
          <a href={settings.contact.mapUrl} target="_blank" rel="noreferrer"><Icon name="pin" />{settings.contact.address}</a>
          <a href={`tel:${settings.contact.phone.replace(/\s/g, "")}`}><Icon name="phone" />{settings.contact.phone}</a>
          <a href={`mailto:${settings.contact.email}`}><Icon name="mail" />{settings.contact.email}</a>
          <span><Icon name="clock" />{settings.contact.hours}</span>
          <iframe title="Bản đồ Nha khoa Presmile" src={mapEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </div>
      <div className="footer-bottom"><div className="shell">© {new Date().getFullYear()} {settings.shortName}. Tất cả quyền được bảo lưu.</div></div>
    </footer>
  );
}
