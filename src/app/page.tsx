import Image from "next/image";
import Link from "next/link";
import { CiicRegistrationForm } from "@/components/site/ciic-registration-form";
import { getPosts, getServices } from "@/lib/content";

export const revalidate = 300;

const ecosystem = [
  ["Giáo dục & đào tạo", "Không gian học tập, kỹ năng, khởi nghiệp và sáng tạo trẻ."],
  ["Biểu diễn & nghệ thuật", "Âm nhạc, hội họa, sân khấu đa năng và giao lưu nghệ thuật."],
  ["Triển lãm & hội chợ", "Trưng bày sản phẩm, kết nối giao thương, hội nghị và sự kiện."],
  ["Thể thao & sức khỏe", "Hoạt động cộng đồng, rèn luyện thể chất và nâng cao chất lượng sống."],
  ["Công nghệ nội dung", "AI showroom, studio thu âm, quay phim, podcast và truyền thông số."],
  ["Ẩm thực & kinh tế đêm", "Không gian trải nghiệm ẩm thực, sản phẩm địa phương và kinh tế đêm."],
  ["Thư viện & bảo tàng số", "Số hóa di sản, tri thức và trải nghiệm văn hóa tương tác."],
  ["Đối tác & quốc tế", "Kết nối doanh nghiệp, tổ chức, nhà trường và mạng lưới quốc tế."],
];

const activities = [
  ["Hằng ngày", "Trưng bày sản phẩm, trải nghiệm sáng tạo, hoạt động học tập và sinh hoạt cộng đồng."],
  ["Hằng tuần", "Acoustic Tuesday, Comedy Wednesday, Movie Night Thursday, Vibe-up Friday và Family Sunday."],
  ["Theo mùa", "Lễ hội văn hóa quốc tế, âm nhạc, ẩm thực, Trung Thu, Giáng Sinh, Tết và CIIC Birthday Bash."],
];

export default async function HomePage() {
  const [services, posts] = await Promise.all([getServices(), getPosts()]);
  const news = posts.slice(0, 3);
  return <div className="ipf-site">
    <div className="ipf-top"><div className="ipf-container"><span>TRUNG TÂM ĐỔI MỚI SÁNG TẠO CÔNG NGHIỆP VĂN HÓA · TÂN SƠN NHẤT</span><span>446–448 Hoàng Văn Thụ, P. Tân Sơn Nhất, TP.HCM</span></div></div>
    <header className="ipf-header"><div className="ipf-container ipf-header-inner">
      <Link className="ipf-brand" href="/"><Image src="/images/ciic/logo.jpeg" alt="CIIC Tân Sơn Nhất" width={76} height={76}/><span><b>CIIC</b><small>TÂN SƠN NHẤT</small></span></Link>
      <nav className="ipf-nav">
        <details><summary>GIỚI THIỆU</summary><div><a href="#about">Về CIIC</a><a href="#goals">Mục tiêu</a><a href="#values">Giá trị mô hình</a></div></details>
        <details><summary>HỆ SINH THÁI</summary><div><a href="#ecosystem">Lĩnh vực hoạt động</a><a href="#spaces">Không gian CIIC</a><a href="#partners">Đối tác đồng hành</a></div></details>
        <details><summary>HOẠT ĐỘNG</summary><div><a href="#activities">Lịch hoạt động</a><a href="#events">Sự kiện văn hóa</a><a href="#news">Tin tức</a></div></details>
        <details><summary>THAM GIA</summary><div><a href="#register">Dành cho người dân</a><a href="#register">Dành cho doanh nghiệp / CLB</a><a href="#register">Đề xuất hợp tác</a></div></details>
      </nav>
      <a className="ipf-cta" href="#register">ĐĂNG KÝ THAM GIA</a>
    </div></header>

    <main>
      <section className="ipf-hero">
        <Image src="/images/ciic/image90.png" alt="Mô phỏng không gian CIIC Tân Sơn Nhất" fill priority sizes="100vw"/>
        <div className="ipf-hero-shade"/><div className="ipf-container ipf-hero-copy"><p>TRUNG TÂM ĐỔI MỚI SÁNG TẠO CÔNG NGHIỆP VĂN HÓA</p><h1>Văn hóa là nền tảng.<br/><em>Sáng tạo là động lực.</em></h1><span>Không gian mở kết nối Chính quyền — Hiệp hội — Doanh nghiệp — Nhà trường — CLB — Người dân ngay tại địa phương.</span><div><a className="ipf-button gold" href="#about">KHÁM PHÁ CIIC</a><a className="ipf-button ghost" href="#register">ĐĂNG KÝ THAM GIA</a></div></div>
      </section>

      <section className="ipf-route-bar"><div className="ipf-container"><a href="#register"><b>01</b><span>NGƯỜI DÂN<small>Khám phá hoạt động & ưu đãi</small></span></a><a href="#register"><b>02</b><span>DOANH NGHIỆP / CLB<small>Đăng chương trình & kết nối B2B</small></span></a><a href="#register"><b>03</b><span>ĐỐI TÁC<small>Đồng hành & phát triển dự án</small></span></a><a href="#activities"><b>04</b><span>LỊCH HOẠT ĐỘNG<small>Xem trải nghiệm sắp diễn ra</small></span></a></div></section>

      <section className="ipf-section ipf-intro" id="about"><div className="ipf-container ipf-split"><div><p className="ipf-kicker">GIỚI THIỆU CIIC TÂN SƠN NHẤT</p><h2>Từ một cơ sở hiện hữu<br/>đến <em>điểm mẫu văn hóa số</em></h2></div><div><p className="ipf-lead">CIIC được định hướng trở thành mô hình mẫu Trung tâm Đổi mới sáng tạo Công nghiệp văn hóa cấp cơ sở: nơi người dân học tập, sinh hoạt, sáng tạo, thụ hưởng và kết nối doanh nghiệp.</p><p>Tận dụng hạ tầng hiện hữu tại 446–448 Hoàng Văn Thụ để hình thành hệ sinh thái Văn hóa — Nghệ thuật — Giáo dục — Thể thao — Ẩm thực — Công nghệ — Sáng tạo.</p><a className="ipf-more" href="#values">XEM GIÁ TRỊ MÔ HÌNH →</a></div></div></section>

      <section className="ipf-goals" id="goals"><div className="ipf-container"><p className="ipf-kicker light">MỤC TIÊU 12 THÁNG</p><div className="ipf-goal-grid"><div><b>10.000+</b><span>người dân và cộng đồng tham gia thử nghiệm</span></div><div><b>100+</b><span>doanh nghiệp, CLB và hội đoàn được lập hồ sơ</span></div><div><b>30+</b><span>chương trình học tập, văn hóa và thể thao</span></div><div><b>01</b><span>dashboard vận hành bằng dữ liệu</span></div></div></div></section>

      <section className="ipf-section" id="ecosystem"><div className="ipf-container"><div className="ipf-title-row"><div><p className="ipf-kicker">HỆ SINH THÁI ĐA NGÀNH</p><h2>Một điểm đến.<br/><em>Nhiều dòng trải nghiệm.</em></h2></div><p>Thiết kế đồng bộ toàn khu cho nhận diện, cảnh quan, ánh sáng, trải nghiệm người dùng và vận hành số.</p></div><div className="ipf-ecosystem">{ecosystem.map(([title,body],i)=><article key={title}><span>{String(i+1).padStart(2,"0")}</span><h3>{title}</h3><p>{body}</p><a href="#register">TÌM HIỂU →</a></article>)}</div></div></section>

      <section className="ipf-space" id="spaces"><div className="ipf-container"><div className="ipf-space-copy"><p className="ipf-kicker light">KHÔNG GIAN CIIC</p><h2>Sáng tạo — Bản sắc — Lan tỏa</h2><p>Cổng chào văn hóa, khu ẩm thực, sân khấu đa năng, studio nội dung số và phòng hội nghị được tổ chức thành một hành trình trải nghiệm liên tục.</p><div className="ipf-space-tags"><span>Văn hóa nghệ thuật</span><span>Ẩm thực</span><span>Sân khấu đa năng</span><span>Studio sáng tạo</span></div></div><div className="ipf-space-image"><Image src="/images/ciic/image68.png" alt="Cổng chào không gian văn hóa nghệ thuật CIIC" fill sizes="(max-width:900px) 100vw, 56vw"/></div></div></section>

      <section className="ipf-section ipf-activities" id="activities"><div className="ipf-container"><div className="ipf-title-row"><div><p className="ipf-kicker">HOẠT ĐỘNG & SỰ KIỆN</p><h2>Thường xuyên.<br/><em>Đa dạng. Liên tục.</em></h2></div><p>Hệ thống hoạt động được xây dựng để phục vụ nhiều nhóm đối tượng và tạo nhịp sống mới cho khu vực Tân Sơn Nhất.</p></div><div className="ipf-activity-list">{activities.map(([label,title],i)=><article key={label}><b>0{i+1}</b><div><small>{label}</small><h3>{title}</h3></div><a href="#register">ĐĂNG KÝ →</a></article>)}</div><div className="ipf-program-cards" id="events">{services.slice(0,3).map((item,i)=><article key={item.slug}><span>{["CỘNG ĐỒNG","SÁNG TẠO","GIAO THƯƠNG"][i]}</span><h3>{item.title}</h3><p>{item.excerpt}</p><a href="#register">QUAN TÂM CHƯƠNG TRÌNH →</a></article>)}</div></div></section>

      <section className="ipf-values" id="values"><div className="ipf-container"><p className="ipf-kicker light">GIÁ TRỊ CỘNG ĐỒNG</p><h2>Một nền tảng — bốn dòng giá trị</h2><div className="ipf-value-grid"><article><b>01</b><h3>Chính quyền địa phương</h3><p>Dữ liệu tham gia, lịch hoạt động, phản hồi và cơ sở đề xuất chính sách.</p></article><article><b>02</b><h3>Doanh nghiệp — CLB — Hội đoàn</h3><p>Hồ sơ giới thiệu, chương trình, kết nối B2B và xúc tiến thương mại.</p></article><article><b>03</b><h3>Cộng đồng — Thành viên</h3><p>Không gian học tập, thể thao, văn hóa, việc làm, kỹ năng và khởi nghiệp.</p></article><article><b>04</b><h3>Thành phố & mở rộng</h3><p>Mô hình văn hóa số cấp cơ sở có dữ liệu tham chiếu và khả năng nhân rộng.</p></article></div></div></section>

      <section className="ipf-section ipf-news" id="news"><div className="ipf-container"><div className="ipf-title-row"><div><p className="ipf-kicker">TRUNG TÂM THÔNG TIN</p><h2>Cập nhật mới</h2></div><a className="ipf-more" href="#register">NHẬN THÔNG TIN →</a></div><div className="ipf-news-grid">{news.map((post,i)=><article key={post.slug}><div className="ipf-news-image"><Image src={["/images/ciic/image104.png","/images/ciic/image94.png","/images/ciic/image128.png"][i]} alt="" fill sizes="(max-width:800px) 100vw, 33vw"/></div><small>{post.publishedAt || "CIIC TÂN SƠN NHẤT"}</small><h3>{post.title}</h3><p>{post.excerpt}</p><a href="#register">ĐỌC THÊM →</a></article>)}</div></div></section>

      <section className="ipf-register" id="register"><div className="ipf-container ipf-split"><div><p className="ipf-kicker light">THAM GIA HỆ SINH THÁI</p><h2>Cùng CIIC kiến tạo<br/><em>một điều mới</em></h2><p>Đăng ký nhận lịch hoạt động, đề xuất chương trình, giới thiệu doanh nghiệp/CLB hoặc trao đổi cơ hội hợp tác.</p><ul><li>Người dân & thành viên cộng đồng</li><li>Doanh nghiệp, CLB, hội đoàn</li><li>Nhà trường, chuyên gia và đối tác quốc tế</li></ul></div><CiicRegistrationForm/></div></section>
    </main>
    <footer className="ipf-footer"><div className="ipf-container ipf-footer-grid"><div className="ipf-brand"><Image src="/images/ciic/logo.jpeg" alt="CIIC" width={84} height={84}/><span><b>CIIC</b><small>TÂN SƠN NHẤT</small></span></div><div><b>TRUNG TÂM</b><p>446–448 Hoàng Văn Thụ<br/>P. Tân Sơn Nhất, TP.HCM</p></div><div><b>KHÁM PHÁ</b><p><a href="#about">Giới thiệu</a><br/><a href="#ecosystem">Hệ sinh thái</a><br/><a href="#activities">Hoạt động</a></p></div><div><b>KẾT NỐI</b><p>079 8888 558<br/>www.congnghiepvanhoa.vn</p></div></div><div className="ipf-container ipf-copyright">© 2026 CIIC Tân Sơn Nhất · Văn hóa là nền tảng · Sáng tạo là động lực · Công nghệ là công cụ · Người dân là trung tâm</div></footer>
  </div>;
}
