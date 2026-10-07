import type { Doctor, GalleryItem, Post, Service, SiteSettings, VideoItem } from "@/types/cms";

export const defaultSettings: SiteSettings = {
  siteName: "Nha Khoa Gia Đình Presmile",
  shortName: "Presmile",
  slogan: "Tử tế, tận tâm, an toàn",
  logoUrl: "/images/optimized/presmile-logo-horizontal.webp",
  heroImage: "/images/optimized/hero-presmile-16x9.jpg",
  aboutImage: "/images/optimized/about-team-square.jpg",
  technologyImage: "/images/optimized/technology-digital-6x7.jpg",
  ogImage: "/images/optimized/og-presmile-1200x630.jpg",
  heroEyebrow: "Nha khoa gia đình chuẩn quốc tế",
  heroTitle: "Nâng tầm nụ cười, chăm sóc cả gia đình",
  heroSubtitle:
    "Giải pháp nha khoa toàn diện với đội ngũ bác sĩ tận tâm, công nghệ hiện đại và phác đồ cá nhân hóa cho từng thành viên.",
  aboutTitle: "Nụ cười khỏe mạnh bắt đầu từ sự thấu hiểu",
  aboutBody:
    "Presmile hướng đến trải nghiệm nha khoa nhẹ nhàng, minh bạch và an toàn. Mỗi kế hoạch điều trị được xây dựng phù hợp với sức khỏe, nhu cầu và nhịp sống của từng khách hàng.",
  servicesHeroTitle: "Chuẩn mực chăm sóc răng miệng cao cấp, kiến tạo nụ cười đẹp, bền vững theo thời gian",
  servicesHeroSubtitle: "Nha khoa Presmile theo đuổi triết lý điều trị chính xác, tối giản xâm lấn và ứng dụng vật liệu, công nghệ tiên tiến để mỗi khách hàng nhận được kết quả điều trị xứng tầm với sự đầu tư của mình.",
  servicesHeroCta: "Đặt lịch tư vấn riêng cùng bác sĩ",
  servicesClosingTitle: "Trải nghiệm chuẩn mực chăm sóc nha khoa dành riêng cho Quý Khách",
  servicesClosingBody: "Đội ngũ Presmile sẵn sàng lắng nghe và đồng hành cùng Quý Khách trong hành trình kiến tạo nụ cười hoàn hảo. Đặt lịch hẹn ngay hôm nay để nhận tư vấn riêng từ Bác sĩ chuyên môn.",
  seoTitle: "Presmile Dental Center | Nha khoa gia đình tại TP.HCM",
  seoDescription:
    "Nha khoa Presmile tại 179–181 Sư Vạn Hạnh, TP.HCM: Implant kỹ thuật số, răng sứ thẩm mỹ, chỉnh nha và chăm sóc nha khoa cho cả gia đình.",
  seoKeywords:
    "nha khoa Presmile, nha khoa gia đình, nha khoa Quận 10, Implant kỹ thuật số, răng sứ thẩm mỹ, niềng răng, nha khoa trẻ em",
  primaryColor: "#13b8b0",
  accentColor: "#087f7a",
  backgroundColor: "#ffffff",
  textColor: "#314f50",
  headingColor: "#075f5b",
  bodyFont: "Be Vietnam Pro",
  headingFont: "Manrope",
  bodyFontSize: 16,
  headingFontSize: 64,
  contact: {
    phone: "091 333 7672",
    email: "presmiledental@gmail.com",
    address: "179–181 Sư Vạn Hạnh, Phường Vườn Lài, TP. Hồ Chí Minh",
    hours: "Thứ 2 – Thứ 7: 09:00 – 19:00",
    facebook: "https://www.facebook.com/PresmileDental/",
    zalo: "https://zalo.me/0913337672",
    tiktok: "https://www.tiktok.com/@nhakhoapresmile",
    tiktokDoctor: "https://www.tiktok.com/@bslienpresmile",
    youtube: "",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=179-181+Su+Van+Hanh+Ho+Chi+Minh",
  },
};

export const defaultServices: Service[] = [
  {
    title: "Cấy ghép Implant",
    slug: "cay-ghep-implant-ky-thuat-so",
    excerpt: "Phục hồi răng mất chính xác, vững chắc với quy trình lập kế hoạch số hóa.",
    description:
      "Công nghệ chẩn đoán và máng hướng dẫn hỗ trợ bác sĩ xác định vị trí cấy ghép tối ưu. Giải pháp phục hình được cá nhân hóa nhằm mang lại sự ổn định, thẩm mỹ và cảm giác ăn nhai tự nhiên.",
    image: "/images/services/implant-digital.jpg",
    icon: "implant",
    order: 5,
    featured: true,
    published: true,
  },
  {
    title: "Nha khoa Thẩm mỹ",
    slug: "rang-su-tham-my",
    excerpt: "Thiết kế nụ cười hài hòa, răng sứ cá nhân hóa theo đường nét khuôn mặt.",
    description:
      "Từ màu sắc đến hình dáng, mỗi phục hình được thiết kế theo đặc điểm riêng của khách hàng, ưu tiên bảo tồn mô răng và vẻ đẹp tự nhiên.",
    image: "/images/services/porcelain-veneers.jpg",
    icon: "sparkle",
    order: 4,
    featured: true,
    published: true,
  },
  {
    title: "Niềng răng (Chỉnh nha)",
    slug: "chinh-nha-nieng-rang",
    excerpt: "Các lựa chọn mắc cài và khay trong suốt cho người lớn lẫn trẻ em.",
    description:
      "Bác sĩ đánh giá khớp cắn, thẩm mỹ khuôn mặt và nhu cầu sinh hoạt để đề xuất phương án chỉnh nha phù hợp, dễ theo dõi và có lộ trình rõ ràng.",
    image: "/images/services/orthodontics-aligners.jpg",
    icon: "align",
    order: 3,
    featured: true,
    published: true,
  },
  {
    title: "Nha khoa Trẻ em",
    slug: "nha-khoa-tre-em",
    excerpt: "Không gian thân thiện giúp trẻ hình thành thói quen chăm sóc răng từ sớm.",
    description:
      "Thăm khám nhẹ nhàng, hướng dẫn dự phòng sâu răng và theo dõi sự phát triển răng hàm mặt trong môi trường gần gũi với trẻ.",
    image: "/images/services/pediatric-dentistry.jpg",
    icon: "family",
    order: 1,
    featured: true,
    published: true,
  },
  {
    title: "Nha khoa Tổng quát",
    slug: "dieu-tri-tong-quat",
    excerpt: "Khám định kỳ, cạo vôi, trám răng, điều trị tủy và chăm sóc nướu.",
    description:
      "Hệ thống dịch vụ tổng quát giúp phát hiện sớm và xử lý các vấn đề răng miệng, duy trì nền tảng sức khỏe lâu dài.",
    image: "/images/services/general-dentistry.jpg",
    icon: "shield",
    order: 2,
    featured: false,
    published: true,
  },
  {
    title: "Nhổ răng khôn",
    slug: "nho-rang-khon",
    excerpt: "Đánh giá bằng hình ảnh và quy trình kiểm soát đau, sưng sau điều trị.",
    description:
      "Bác sĩ thăm khám kỹ vị trí răng khôn và cấu trúc liên quan trước khi thực hiện, kèm hướng dẫn chăm sóc rõ ràng sau thủ thuật.",
    image: "/images/services/wisdom-tooth.jpg",
    icon: "tooth",
    order: 6,
    featured: false,
    published: true,
  },
];

export const defaultPosts: Post[] = [
  {
    title: "Khi nào nên đưa trẻ đi khám răng lần đầu?",
    slug: "khi-nao-nen-dua-tre-di-kham-rang-lan-dau",
    excerpt: "Lần khám đầu tiên đúng thời điểm giúp cha mẹ chủ động phòng sâu răng và tạo trải nghiệm tích cực cho trẻ.",
    content:
      "Học viện Nha khoa Nhi Hoa Kỳ khuyến nghị trẻ nên được khám khi chiếc răng đầu tiên xuất hiện hoặc chậm nhất vào sinh nhật đầu tiên. Mục tiêu của lần gặp đầu thường là đánh giá nguy cơ sâu răng, hướng dẫn vệ sinh và giúp gia đình xây dựng thói quen chăm sóc phù hợp.\n\nCha mẹ nên chọn thời điểm trẻ tỉnh táo, mang theo thông tin sức khỏe cần thiết và nói về buổi khám bằng ngôn ngữ nhẹ nhàng. Không nên chờ đến khi trẻ đau mới đi khám, vì trải nghiệm đầu tiên khi đang khó chịu dễ làm trẻ lo lắng hơn.\n\nTại nhà, hãy dùng bàn chải lông mềm phù hợp độ tuổi. Lượng kem đánh răng chứa fluoride và tần suất tái khám cần theo hướng dẫn riêng của bác sĩ dựa trên tuổi và nguy cơ sâu răng của trẻ.",
    image: "/images/posts/pediatric-first-visit.jpg",
    publishedAt: "2026-07-22",
    metaTitle: "Trẻ nên khám răng lần đầu khi nào?",
    metaDescription: "Mốc khám răng đầu tiên, cách chuẩn bị và những điều cha mẹ nên biết để trẻ có trải nghiệm nha khoa tích cực.",
    keywords: "khám răng trẻ em, nha khoa trẻ em, lần đầu khám răng",
    sourceLabel: "American Academy of Pediatric Dentistry",
    sourceUrl: "https://www.aapd.org/resources/parent/faq/",
    published: true,
  },
  {
    title: "Implant kỹ thuật số khác gì Implant truyền thống?",
    slug: "implant-ky-thuat-so-khac-gi",
    excerpt: "Công nghệ hình ảnh 3D và kế hoạch số hỗ trợ bác sĩ đánh giá vị trí cấy ghép trực quan trước điều trị.",
    content:
      "Implant kỹ thuật số không phải là một loại trụ Implant riêng. Đây là cách sử dụng dữ liệu chụp, dấu răng số và phần mềm lập kế hoạch để bác sĩ đánh giá cấu trúc xương, vị trí phục hình dự kiến và hướng đặt trụ trước khi thực hiện.\n\nTrong một số trường hợp phù hợp, dữ liệu này có thể được dùng để thiết kế máng hướng dẫn phẫu thuật. Lợi ích chính là kế hoạch điều trị trực quan hơn và sự phối hợp chặt chẽ giữa bước phẫu thuật với răng phục hình sau cùng.\n\nKhông phải khách hàng nào cũng có cùng chỉ định. Sức khỏe toàn thân, tình trạng nướu, thể tích xương và thói quen chăm sóc răng miệng đều cần được đánh giá trực tiếp trước khi bác sĩ đề xuất phương án.",
    image: "/images/posts/implant-digital.jpg",
    publishedAt: "2026-07-18",
    metaTitle: "Implant kỹ thuật số là gì? Khác biệt trong lập kế hoạch",
    metaDescription: "Tìm hiểu vai trò của hình ảnh 3D, dấu răng số và máng hướng dẫn trong quy trình cấy ghép Implant kỹ thuật số.",
    keywords: "Implant kỹ thuật số, cấy ghép Implant, máng hướng dẫn phẫu thuật",
    sourceLabel: "National Institute of Dental and Craniofacial Research",
    sourceUrl: "https://www.nidcr.nih.gov/health-info",
    published: true,
  },
  {
    title: "5 thói quen giữ nụ cười khỏe mỗi ngày",
    slug: "5-thoi-quen-giu-nu-cuoi-khoe",
    excerpt: "Năm việc đơn giản, thực tế giúp giảm mảng bám và duy trì sức khỏe răng nướu lâu dài.",
    content:
      "Một: chải răng hai lần mỗi ngày bằng kem đánh răng chứa fluoride, thao tác nhẹ nhàng dọc theo viền nướu. Hai: làm sạch kẽ răng mỗi ngày bằng chỉ nha khoa hoặc dụng cụ phù hợp với khoảng kẽ.\n\nBa: hạn chế số lần ăn vặt có đường trong ngày và ưu tiên nước lọc. Bốn: không hút thuốc lá; đây là yếu tố liên quan đến nhiều vấn đề răng nướu. Năm: khám định kỳ theo lịch bác sĩ đề xuất để phát hiện sớm thay đổi bất thường.\n\nNhu cầu chăm sóc tại nhà của mỗi người có thể khác nhau khi đang niềng răng, có Implant, cầu răng hoặc bệnh nướu. Hãy hỏi bác sĩ về loại bàn chải và dụng cụ làm sạch phù hợp.",
    image: "/images/posts/daily-oral-care.jpg",
    publishedAt: "2026-07-12",
    metaTitle: "5 thói quen chăm sóc răng miệng mỗi ngày",
    metaDescription: "Hướng dẫn ngắn gọn về chải răng, làm sạch kẽ, dinh dưỡng và khám định kỳ để bảo vệ nụ cười.",
    keywords: "chăm sóc răng miệng, chải răng đúng cách, chỉ nha khoa",
    sourceLabel: "American Dental Association – MouthHealthy",
    sourceUrl: "https://www.mouthhealthy.org/oral-health-recommendations",
    published: true,
  },
  {
    title: "Niềng răng trong suốt: 6 điều cần biết trước khi bắt đầu",
    slug: "nieng-rang-trong-suot-dieu-can-biet",
    excerpt: "Khay trong suốt cần chẩn đoán và theo dõi chuyên môn để dịch chuyển răng an toàn, đúng kế hoạch.",
    content:
      "Khay trong suốt có tính thẩm mỹ và có thể tháo ra khi ăn, nhưng vẫn là một phương pháp chỉnh nha cần bác sĩ đánh giá răng, nướu, khớp cắn và phim chụp trước khi bắt đầu.\n\nHiệu quả phụ thuộc nhiều vào thời gian đeo khay theo chỉ định, cách vệ sinh và lịch tái khám. Khay cần được tháo khi ăn uống, làm sạch đúng cách và bảo quản trong hộp để hạn chế thất lạc hoặc biến dạng.\n\nKhông nên tự mua khay hoặc dịch chuyển răng khi chưa có đánh giá toàn diện. Một kế hoạch chỉ quan tâm răng thẳng mà bỏ qua sức khỏe nướu, xương và khớp cắn có thể dẫn đến kết quả không mong muốn.",
    image: "/images/posts/clear-aligners.jpg",
    publishedAt: "2026-07-05",
    metaTitle: "Niềng răng trong suốt: 6 điều cần biết",
    metaDescription: "Những điều cần chuẩn bị về thăm khám, thời gian đeo, vệ sinh và tái khám khi chỉnh nha bằng khay trong suốt.",
    keywords: "niềng răng trong suốt, khay trong suốt, chỉnh nha",
    sourceLabel: "American Dental Association – MouthHealthy",
    sourceUrl: "https://www.mouthhealthy.org/all-topics-a-z/diy-dentistry",
    published: true,
  },
];

export const defaultGallery: GalleryItem[] = [
  { title: "Không gian thân thiện cho cả gia đình", description: "Khu vực đón tiếp được thiết kế thoáng, sạch và gần gũi để mỗi thành viên cảm thấy thoải mái ngay từ khi bước vào Presmile.", image: "/images/services/general-dentistry.jpg", category: "Không gian Presmile", order: 1, published: true },
  { title: "Đội ngũ tận tâm, đồng hành dài lâu", description: "Mỗi kế hoạch chăm sóc bắt đầu bằng lắng nghe kỹ nhu cầu, thăm khám cẩn thận và giải thích rõ ràng từng lựa chọn phù hợp.", image: "/images/optimized/hero-presmile-16x9.jpg", category: "Đội ngũ chuyên môn", order: 2, published: true },
  { title: "Công nghệ hỗ trợ điều trị chính xác", description: "Hệ thống hình ảnh và quy trình số hóa giúp bác sĩ có thêm dữ liệu để chẩn đoán, lập kế hoạch và theo dõi điều trị trực quan.", image: "/images/services/implant-digital.jpg", category: "Công nghệ nha khoa", order: 3, published: true },
];

export const defaultDoctors: Doctor[] = [
  { name: "Bác sĩ Presmile 01", role: "Nha khoa tổng quát", bio: "Hồ sơ tạm — vui lòng cập nhật họ tên, chứng chỉ hành nghề, chuyên môn và nội dung giới thiệu trong trang quản trị.", image: "/images/optimized/about-team-square.jpg", order: 1, published: true },
  { name: "Bác sĩ Presmile 02", role: "Nha khoa thẩm mỹ & phục hình", bio: "Hồ sơ tạm — vui lòng thay bằng thông tin bác sĩ chính thức trước khi truyền thông hoặc chạy quảng cáo.", image: "/images/optimized/about-team-square.jpg", order: 2, published: true },
  { name: "Bác sĩ Presmile 03", role: "Chỉnh nha & nha khoa trẻ em", bio: "Hồ sơ tạm — vui lòng cập nhật ảnh chân dung và phạm vi chuyên môn chính xác trong trang quản trị.", image: "/images/optimized/about-team-square.jpg", order: 3, published: true },
];

export const defaultVideos: VideoItem[] = [
  { title: "Một vòng quanh không gian Presmile", description: "Video demo từ thư viện nội bộ. Thay bằng link YouTube Unlisted trong Admin → Video Presmile khi đã upload bản chính thức.", embedUrl: "https://drive.google.com/file/d/1HGeFhj7bt58fwq36sYj6-nBAzZGgvHT8/preview", placement: "gallery", order: 1, published: true },
  { title: "Hướng dẫn bé chăm sóc răng miệng", description: "Video demo cho khu vực Nha khoa Trẻ em. Thay bằng link YouTube Unlisted khi hoàn tất xuất bản.", embedUrl: "https://drive.google.com/file/d/12l_ILVX8eLPwvsuJzwBsoIjV-9fiyIgN/preview", placement: "pediatric", order: 2, published: true },
];
