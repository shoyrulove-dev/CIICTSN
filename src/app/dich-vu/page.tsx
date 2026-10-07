import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AppointmentForm } from "@/components/site/appointment-form";
import { Icon } from "@/components/icons";
import { PageShell } from "@/components/site/page-shell";
import { buildPageMetadata } from "@/lib/seo";
import { getServices, getSettings, getVideos } from "@/lib/content";
import { VideoEmbed } from "@/components/site/video-embed";

export const metadata: Metadata = buildPageMetadata({ title: "Dịch vụ nha khoa", description: "Nha khoa tổng quát, thẩm mỹ, chỉnh nha, Implant và nha khoa trẻ em tại Presmile TP.HCM.", path: "/dich-vu" });

const serviceGroups = [
  { id: "nha-khoa-tre-em", number: "01", title: "Nha khoa Trẻ em", intro: "Chăm sóc răng miệng cho trẻ tại Nha khoa Presmile được thực hiện với sự tinh tế và thấu hiểu tâm lý riêng của từng bé, để mỗi trải nghiệm nha khoa đầu đời trở thành nền tảng tích cực cho thói quen chăm sóc lâu dài.", items: ["Khám và tư vấn nha khoa chuyên biệt cho trẻ", "Trám răng sữa, điều trị sâu răng sớm bằng vật liệu sinh học an toàn", "Trám bít hố rãnh phòng ngừa sâu răng", "Nhổ răng sữa, theo dõi và định hướng quá trình mọc răng vĩnh viễn"], cta: "Đặt lịch khám răng cho bé" },
  { id: "nha-khoa-tong-quat", number: "02", title: "Nha khoa Tổng quát", intro: "Một nền tảng răng miệng vững chắc là khởi đầu cho mọi giá trị thẩm mỹ lâu dài. Tại Nha khoa Presmile, việc thăm khám và điều trị tổng quát được thực hiện với độ chính xác cao, ưu tiên bảo tồn mô răng thật và hạn chế tối đa can thiệp không cần thiết.", items: ["Khám và hoạch định lộ trình điều trị cá nhân hóa", "Vệ sinh răng miệng chuyên sâu bằng công nghệ Airflow (Thụy Sỹ), làm sạch mảng bám và vôi răng nhẹ nhàng, hạn chế ê buốt", "Trám răng thẩm mỹ, phục hồi vi thể", "Điều trị tủy với vật liệu sinh học, ưu tiên bảo tồn tủy răng", "Nhổ răng, tiểu phẫu răng khôn theo chuẩn vô khuẩn"], cta: "Đặt lịch khám & tư vấn chuyên sâu" },
  { id: "chinh-nha", number: "03", title: "Niềng răng (Chỉnh nha)", intro: "Một hành trình chỉnh nha cao cấp không chỉ đo bằng kết quả cuối cùng, mà bằng sự đồng hành chuẩn xác trong từng giai đoạn. Presmile xây dựng phác đồ điều trị riêng biệt cho từng cấu trúc hàm và theo dõi sát sao xuyên suốt liệu trình.", items: ["Niềng răng mắc cài kim loại hoặc sứ thẩm mỹ cao", "Niềng răng trong suốt Invisalign hoặc khay trong thế hệ mới", "Chỉnh nha cho trẻ em và thanh thiếu niên, can thiệp sớm để định hướng phát triển xương hàm", "Điều trị sai lệch khớp cắn phức tạp, phối hợp đa chuyên khoa khi cần"], cta: "Đăng ký tư vấn chỉnh nha 1-1 cùng Bác sĩ" },
  { id: "nha-khoa-tham-my", number: "04", title: "Nha khoa Thẩm mỹ", intro: "Vẻ đẹp của một nụ cười cao cấp nằm ở sự hài hòa tự nhiên, không phô trương, không gượng ép. Presmile lựa chọn vật liệu sứ tuyển chọn cùng kỹ thuật tối ưu để mỗi phục hình đạt độ chân thực và độ bền vượt trội.", items: ["Bọc răng sứ cao cấp với Cercon Dentsply (Đức) và Lava 3M (Mỹ)", "Dán sứ Veneer siêu mỏng, bảo tồn tối đa răng thật", "Kỹ thuật Bioclear đóng khe thưa, chỉnh hình thể răng không cần mài", "Tẩy trắng răng công nghệ tiên tiến", "Thiết kế nụ cười theo tỷ lệ khuôn mặt riêng"], cta: "Đặt lịch tư vấn thẩm mỹ riêng" },
  { id: "implant", number: "05", title: "Cấy ghép Implant", intro: "Với những trường hợp mất răng, Implant là giải pháp phục hồi bền vững và tinh tế, mang lại cảm giác ăn nhai và thẩm mỹ gần như răng thật. Presmile ứng dụng trụ Implant chính hãng cùng quy trình phẫu thuật đạt chuẩn để đảm bảo độ chính xác và an toàn.", items: ["Cấy ghép Implant từng răng, phục hình tức thì trong trường hợp phù hợp", "Phục hình trên Implant bằng răng sứ cao cấp", "Implant toàn hàm All-on-4 hoặc All-on-6 cho trường hợp mất răng toàn phần", "Lập kế hoạch điều trị chính xác bằng phim CT 3D trước phẫu thuật"], cta: "Đặt lịch tư vấn cấy ghép Implant" },
];

const serviceMedia: Record<string, { slug: string; fallback: string }> = {
  "nha-khoa-tong-quat": { slug: "dieu-tri-tong-quat", fallback: "/images/services/general-dentistry.jpg" },
  "nha-khoa-tham-my": { slug: "rang-su-tham-my", fallback: "/images/services/porcelain-veneers.jpg" },
  "chinh-nha": { slug: "chinh-nha-nieng-rang", fallback: "/images/services/orthodontics-aligners.jpg" },
  implant: { slug: "cay-ghep-implant-ky-thuat-so", fallback: "/images/services/implant-digital.jpg" },
  "nha-khoa-tre-em": { slug: "nha-khoa-tre-em", fallback: "/images/services/pediatric-dentistry.jpg" },
};

export default async function ServicesPage() {
  const [videos, services, settings] = await Promise.all([getVideos(), getServices(), getSettings()]);
  const pediatricVideos = videos.filter((video) => video.placement === "pediatric");
  const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(settings.contact.address)}&output=embed`;
  return <PageShell>
    <section className="page-hero service-page-hero"><div className="shell"><span>Dịch vụ Presmile</span><h1>{settings.servicesHeroTitle}</h1><p>{settings.servicesHeroSubtitle}</p><Link className="button button-primary service-hero-cta" href="/lien-he#dat-lich">{settings.servicesHeroCta} <Icon name="arrow" /></Link></div></section>
    <nav className="service-anchor-nav" aria-label="Danh mục dịch vụ"><div className="shell">{serviceGroups.map((service) => <a href={`#${service.id}`} key={service.id}>{service.title}</a>)}</div></nav>
    <main>{serviceGroups.map((service, index) => {
      const media = serviceMedia[service.id];
      const storedService = services.find((item) => item.slug === media.slug);
      const image = storedService?.image || media.fallback;
      const items = storedService?.pageItems?.split("\n").map((item) => item.trim()).filter(Boolean) || service.items;
      return <section className={`service-detail-section ${index % 2 ? "is-tinted" : ""}`} id={service.id} key={service.id}><div className="shell service-detail-grid"><aside className="service-detail-aside"><div className="service-detail-label"><b>{service.number}</b><span>Dịch vụ Presmile</span></div><div className="service-detail-media"><Image src={image} alt={service.title} fill sizes="(max-width: 760px) 100vw, 34vw" /></div></aside><div><h2>{storedService?.title || service.title}</h2><p className="service-detail-intro">{storedService?.pageIntro || service.intro}</p><ul>{items.map((item) => <li key={item}><Icon name="check" />{item}</li>)}</ul>{service.id === "nha-khoa-tre-em" && pediatricVideos.length ? <div className="service-video-list">{pediatricVideos.map((video) => <VideoEmbed item={video} key={video._id || video.title} />)}</div> : null}<Link className="button button-outline" href="/lien-he#dat-lich">{storedService?.ctaLabel || service.cta} <Icon name="arrow" /></Link></div></div></section>;
    })}</main>
    <section className="service-closing"><div className="shell"><h2>{settings.servicesClosingTitle}</h2><p>{settings.servicesClosingBody}</p><Link className="button button-primary" href="#dat-lich-dich-vu">Đặt lịch tư vấn <Icon name="arrow" /></Link></div></section>
    <section className="service-contact-block" id="dat-lich-dich-vu"><div className="shell service-contact-grid"><div><span>Liên hệ Presmile</span><h2>Đặt lịch hẹn cùng đội ngũ Bác sĩ</h2><p><Icon name="pin" />{settings.contact.address}</p><p><Icon name="phone" /><a href={`tel:${settings.contact.phone.replace(/\s/g, "")}`}>{settings.contact.phone}</a></p><p><Icon name="clock" />{settings.contact.hours}</p><iframe title="Bản đồ đến Presmile" src={mapEmbedUrl} loading="lazy" /></div><AppointmentForm services={services} /></div></section>
  </PageShell>;
}
