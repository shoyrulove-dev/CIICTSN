import type { Doctor, GalleryItem, Post, Service, SiteSettings, VideoItem } from "@/types/cms";

export const defaultSettings: SiteSettings = {
  siteName:"Trung tâm Đổi mới sáng tạo Công nghiệp Văn hóa Tân Sơn Nhất", shortName:"CIIC Tân Sơn Nhất", slogan:"Văn hóa là nền tảng · Sáng tạo là động lực", logoUrl:"/images/ciic/logo.jpeg", heroImage:"/images/ciic/image90.png", aboutImage:"/images/ciic/image68.png", technologyImage:"/images/ciic/image92.png", ogImage:"/images/ciic/image90.png",
  heroEyebrow:"Trung tâm Đổi mới sáng tạo Công nghiệp Văn hóa", heroTitle:"Văn hóa là nền tảng — Sáng tạo là động lực", heroSubtitle:"Mô hình mẫu văn hóa số cấp cơ sở tại Tân Sơn Nhất.", aboutTitle:"Từ một cơ sở hiện hữu đến điểm mẫu công nghiệp văn hóa số", aboutBody:"Nơi người dân học tập, sinh hoạt, sáng tạo, thụ hưởng và kết nối doanh nghiệp ngay tại địa phương.",
  servicesHeroTitle:"Hệ sinh thái đa ngành", servicesHeroSubtitle:"Văn hóa, nghệ thuật, giáo dục, thể thao, ẩm thực, công nghệ và sáng tạo.", servicesHeroCta:"Đăng ký tham gia hệ sinh thái", servicesClosingTitle:"Cùng CIIC kiến tạo giá trị mới", servicesClosingBody:"Kết nối Chính quyền, Hiệp hội, Doanh nghiệp, Nhà trường, CLB và Người dân.",
  seoTitle:"CIIC Tân Sơn Nhất | Trung tâm Đổi mới sáng tạo Công nghiệp Văn hóa", seoDescription:"CIIC Tân Sơn Nhất – mô hình mẫu trung tâm đổi mới sáng tạo công nghiệp văn hóa cấp cơ sở tại 446–448 Hoàng Văn Thụ, TP.HCM.", seoKeywords:"CIIC Tân Sơn Nhất, công nghiệp văn hóa, đổi mới sáng tạo, văn hóa số, sự kiện Tân Sơn Nhất", primaryColor:"#006548", accentColor:"#003f35", backgroundColor:"#ffffff", textColor:"#173b34", headingColor:"#003f35", bodyFont:"Be Vietnam Pro", headingFont:"Georgia", bodyFontSize:16, headingFontSize:68,
  contact:{phone:"079 8888 558",email:"",address:"446–448 Hoàng Văn Thụ, P. Tân Sơn Nhất, TP.HCM",hours:"Đang cập nhật",facebook:"",zalo:"",tiktok:"",tiktokDoctor:"",youtube:"",mapUrl:"https://www.google.com/maps/search/?api=1&query=446-448+Hoang+Van+Thu+Tan+Son+Nhat+Ho+Chi+Minh"}
};

export const defaultServices: Service[] = [
  {title:"Không gian văn hóa — nghệ thuật",slug:"khong-gian-van-hoa-nghe-thuat",excerpt:"Trải nghiệm bản sắc Việt qua biểu diễn, hội họa, triển lãm và hoạt động tương tác.",description:"Không gian kết nối truyền thống với hiện đại, dành cho cộng đồng và các nhà sáng tạo.",image:"/images/ciic/image68.png",icon:"sparkle",order:1,featured:true,published:true},
  {title:"Cộng đồng học tập & sáng tạo",slug:"cong-dong-hoc-tap-sang-tao",excerpt:"Chương trình giáo dục, kỹ năng, nghề nghiệp, khởi nghiệp và sáng tạo trẻ.",description:"Môi trường học — làm — trải nghiệm thực tế dành cho nhiều nhóm tuổi.",image:"/images/ciic/image92.png",icon:"family",order:2,featured:true,published:true},
  {title:"Triển lãm — hội chợ — giao thương",slug:"trien-lam-hoi-cho-giao-thuong",excerpt:"Trưng bày sản phẩm, phiên chợ, hội nghị, kết nối B2B và xúc tiến thương mại.",description:"Kênh giới thiệu sản phẩm và kết nối cơ hội hợp tác cho doanh nghiệp, CLB, hội đoàn.",image:"/images/ciic/image104.png",icon:"arrow",order:3,featured:true,published:true},
  {title:"Công nghệ & nội dung số",slug:"cong-nghe-noi-dung-so",excerpt:"AI showroom, studio thu âm, quay phim, podcast và truyền thông sản phẩm văn hóa.",description:"Hạ tầng nội dung số phục vụ sáng tạo, truyền thông và quảng bá sản phẩm.",image:"/images/ciic/image93.png",icon:"sparkle",order:4,featured:true,published:true}
];

export const defaultPosts: Post[] = [
  {title:"CIIC Tân Sơn Nhất — mô hình mẫu công nghiệp văn hóa cấp cơ sở",slug:"ciic-tan-son-nhat-mo-hinh-mau",excerpt:"Tận dụng hạ tầng hiện hữu để hình thành hệ sinh thái văn hóa, sáng tạo và công nghệ có khả năng đo lường, nhân rộng.",content:"CIIC được định hướng là nơi người dân học tập, sinh hoạt, sáng tạo, thụ hưởng và kết nối doanh nghiệp ngay tại địa phương.",image:"/images/ciic/image90.png",publishedAt:"2026-10-07",published:true},
  {title:"Hệ sinh thái đa ngành tại CIIC",slug:"he-sinh-thai-da-nganh-ciic",excerpt:"Từ giáo dục, nghệ thuật, thể thao đến studio nội dung số, ẩm thực và kinh tế đêm.",content:"Hệ sinh thái được triển khai theo mức độ sẵn sàng của pháp lý, an toàn và hạ tầng.",image:"/images/ciic/image94.png",publishedAt:"2026-10-07",published:true},
  {title:"Hoạt động thường xuyên cho mọi đối tượng",slug:"hoat-dong-thuong-xuyen-ciic",excerpt:"Chương trình hằng ngày, cuối tuần và lễ hội theo mùa dành cho cộng đồng Tân Sơn Nhất.",content:"Các hoạt động được tổ chức liên tục để tạo điểm đến thường nhật và nâng cao chất lượng sống.",image:"/images/ciic/image128.png",publishedAt:"2026-10-07",published:true}
];

export const defaultGallery: GalleryItem[] = [
  {title:"CIIC Corner",description:"Không gian trải nghiệm và kinh tế đêm.",image:"/images/ciic/image90.png",category:"Không gian",order:1,published:true},
  {title:"Cổng chào văn hóa",description:"Sáng tạo — Bản sắc — Lan tỏa.",image:"/images/ciic/image68.png",category:"Không gian",order:2,published:true},
  {title:"Sân khấu đa năng",description:"Biểu diễn, giao lưu và sự kiện cộng đồng.",image:"/images/ciic/image85.png",category:"Không gian",order:3,published:true}
];

export const defaultDoctors: Doctor[] = [];
export const defaultVideos: VideoItem[] = [];
