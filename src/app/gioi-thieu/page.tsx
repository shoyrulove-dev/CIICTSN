import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/site/page-shell";
import { SectionHeading } from "@/components/site/section-heading";
import { getSettings } from "@/lib/content";
import { getDoctors } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Giới thiệu Nha khoa Presmile",
  description: "Tìm hiểu Nha khoa gia đình Presmile, đội ngũ tận tâm và triết lý chăm sóc răng miệng tử tế, minh bạch, an toàn.",
  path: "/gioi-thieu",
});

export default async function AboutPage() {
  const [settings, doctors] = await Promise.all([getSettings(), getDoctors()]);
  return (
    <PageShell>
      <section className="page-hero"><div className="shell"><span>Về chúng tôi</span><h1>Gia đình Presmile</h1><p>Một nơi mọi thành viên đều được lắng nghe, thấu hiểu và chăm sóc bằng kế hoạch riêng.</p></div></section>
      <section className="page-content">
        <div className="shell about-grid">
          <div className="about-image"><Image src={settings.aboutImage} alt="Đội ngũ Presmile Dental Center" fill sizes="(max-width: 760px) 100vw, 50vw" /></div>
          <div>
            <SectionHeading eyebrow="Câu chuyện Presmile" title={settings.aboutTitle} body={settings.aboutBody} />
            <p className="prose">Với định hướng nha khoa gia đình, Presmile cung cấp giải pháp từ dự phòng, điều trị tổng quát đến Implant, phục hình thẩm mỹ và chỉnh nha. Đội ngũ hướng tới giao tiếp minh bạch, thao tác nhẹ nhàng và trải nghiệm an tâm cho cả trẻ em lẫn người lớn tuổi.</p>
            <Link className="button button-primary" href="/lien-he#dat-lich">Đặt lịch tư vấn</Link>
          </div>
        </div>
      </section>
      <section className="section services-section">
        <div className="shell">
          <SectionHeading center eyebrow="Giá trị cốt lõi" title="Tử tế trong từng quyết định điều trị" />
          <div className="values-grid">
            <article><b>01</b><h3>Tận tâm</h3><p>Lắng nghe nhu cầu và đồng hành xuyên suốt hành trình chăm sóc răng miệng.</p></article>
            <article><b>02</b><h3>An toàn</h3><p>Tuân thủ quy trình kiểm soát vô khuẩn và đánh giá kỹ trước điều trị.</p></article>
            <article><b>03</b><h3>Minh bạch</h3><p>Giải thích rõ tình trạng, lựa chọn, lộ trình và chi phí dự kiến.</p></article>
          </div>
        </div>
      </section>
      <section className="section doctor-section"><div className="shell"><SectionHeading center eyebrow="Đội ngũ chuyên môn" title="Bác sĩ đồng hành cùng hành trình nụ cười của bạn" body="Thông tin đội ngũ được cập nhật minh bạch để Quý Khách dễ dàng tìm hiểu và lựa chọn." /><div className="doctor-grid">{doctors.map((doctor) => <article className="doctor-card" key={doctor._id || doctor.name}><div className="doctor-photo"><Image src={doctor.image} alt={doctor.name} fill sizes="(max-width: 760px) 100vw, 33vw" /></div><div><span>{doctor.role}</span><h3>{doctor.name}</h3><p>{doctor.bio}</p></div></article>)}</div></div></section>
    </PageShell>
  );
}
