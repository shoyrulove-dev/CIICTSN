import type { Metadata } from "next";
import { AppointmentForm } from "@/components/site/appointment-form";
import { Icon } from "@/components/icons";
import { PageShell } from "@/components/site/page-shell";
import { SectionHeading } from "@/components/site/section-heading";
import { VideoEmbed } from "@/components/site/video-embed";
import { getServices, getSettings, getVideos } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Liên hệ & đặt lịch nha khoa",
  description: "Đặt lịch tư vấn tại Presmile Dental Center, 179–181 Sư Vạn Hạnh, TP. Hồ Chí Minh. Hotline 091 333 7672.",
  path: "/lien-he",
});

export default async function ContactPage() {
  const [settings, services, videos] = await Promise.all([getSettings(), getServices(), getVideos()]);
  const contactVideos = videos.filter((video) => video.placement === "contact" || video.placement === "gallery");
  const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(settings.contact.address)}&output=embed`;
  return (
    <PageShell>
      <section className="page-hero"><div className="shell"><span>Liên hệ</span><h1>Presmile luôn sẵn sàng lắng nghe</h1><p>Liên hệ hoặc để lại yêu cầu, đội ngũ sẽ hỗ trợ bạn sắp xếp lịch thăm khám phù hợp.</p></div></section>
      <section className="page-content" id="dat-lich"><div className="shell contact-grid">
        <div>
          <SectionHeading eyebrow="Thông tin phòng khám" title="Hẹn gặp bạn tại Presmile" />
          <div className="contact-cards">
            <a className="contact-card" href={settings.contact.mapUrl} target="_blank" rel="noreferrer"><Icon name="pin" /><span><b>Địa chỉ</b>{settings.contact.address}</span></a>
            <a className="contact-card" href={`tel:${settings.contact.phone.replace(/\s/g, "")}`}><Icon name="phone" /><span><b>Hotline</b>{settings.contact.phone}</span></a>
            <a className="contact-card" href={`mailto:${settings.contact.email}`}><Icon name="mail" /><span><b>Email</b>{settings.contact.email}</span></a>
            <div className="contact-card"><Icon name="clock" /><span><b>Giờ làm việc</b>{settings.contact.hours}</span></div>
            <a className="contact-card" href={settings.contact.facebook} target="_blank" rel="noreferrer"><Icon name="facebook" /><span><b>Facebook</b>Presmile Dental</span></a>
          </div>
        </div>
        <AppointmentForm services={services} />
      </div></section>
      {contactVideos.length ? <section className="section contact-video-section" id="video-presmile"><div className="shell"><div className="video-section-heading"><span>Không gian Presmile</span><h2>Một vòng quanh Presmile</h2></div><div className="video-grid">{contactVideos.map((video) => <VideoEmbed item={video} key={video._id || video.title} />)}</div></div></section> : null}
      <section className="contact-map-section"><div className="shell"><div className="contact-map-heading"><span>Bản đồ</span><h2>Đường đến Presmile</h2></div><iframe title="Bản đồ đến Nha khoa Presmile" src={mapEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div></section>
    </PageShell>
  );
}
