# Hướng dẫn quản trị, bàn giao và đối chiếu yêu cầu Presmile

- **Website:** https://presmile.vercel.app
- **Quản trị:** https://presmile.vercel.app/admin/login
- **Mã nguồn:** https://github.com/shoyrulove-dev/Presmile
- **Source local:** `D:\HCM\Presmile`
**Ngày đối chiếu:** 27/08/2026

> Tài liệu không lưu mật khẩu hoặc khóa bí mật. Tài khoản quản trị và quyền truy cập dịch vụ được bàn giao qua kênh riêng.

## 1. Kết quả đối chiếu file “CÁC ĐIỂM ĐỀ XUẤT WESBITE.docx”

| Yêu cầu | Trạng thái | Kết quả thực hiện |
| --- | --- | --- |
| Bàn giao source và hướng dẫn back-end | ✅ Hoàn thành | Source đã push GitHub; CMS riêng bằng Next.js, không dùng WordPress; tài liệu này hướng dẫn vận hành. |
| Thời gian phản hồi 14 ngày làm việc | ⚠️ Cần xác nhận | Đây là điều khoản vận hành/hợp đồng, không phải tính năng website. Hai bên cần xác nhận phạm vi và cách tính thời gian. |
| SEO, tốc độ và khả năng tự chỉnh từ khóa | ✅ Hoàn thành | Có SEO toàn website, SEO riêng cho dịch vụ/bài viết, URL chuẩn, sitemap, robots, canonical, Open Graph và structured data. |
| Bỏ heading ở chân trang | ✅ Hoàn thành | Đã bỏ “Khám phá”, “Dịch vụ nổi bật”, “Liên hệ”; vẫn giữ link và thông tin cần thiết. |
| TikTok và YouTube ở chân trang | 🟡 Một phần phụ thuộc dữ liệu | Hai TikTok đã hiển thị. YouTube đã có trường cấu hình và icon tự động, nhưng đang ẩn vì chưa có URL kênh chính thức. |
| Tăng cỡ và sắp xếp mục dịch vụ | ✅ Hoàn thành | Thứ tự: Trẻ em → Tổng quát → Niềng răng → Thẩm mỹ → Implant; tiêu đề đã tăng độ rõ. |
| Mục lục và điều hướng bài viết | ✅ Hoàn thành | Có mục lục tự động, bài trước/bài tiếp theo và link quay lại Kiến thức. |
| URL rút gọn `domain/ten-url` | ✅ Hoàn thành | Dịch vụ và bài viết dùng URL gốc. URL cũ chuyển hướng vĩnh viễn 308 để bảo toàn SEO. |
| Bản đồ ở chân trang | ✅ Hoàn thành | Đã thêm iframe Google Maps tải chậm (lazy loading). |
| Bỏ Thư viện; chuyển video sang Liên hệ | ✅ Hoàn thành | Menu và sitemap không còn Thư viện; URL cũ chuyển sang Liên hệ; video nằm trước bản đồ. |

### Kết luận

- Phần kỹ thuật của tài liệu đã hoàn thành.
- Còn cần cung cấp **URL YouTube chính thức**.
- Video “Một vòng quanh không gian Presmile” hiện dùng bản Google Drive demo có sẵn. Cần cung cấp video YouTube/Google Drive chính thức nếu muốn thay.
- Điều khoản **14 ngày làm việc** cần xác nhận bằng thỏa thuận vận hành.

## 2. Kiến trúc và bàn giao

- Giao diện và CMS: Next.js.
- Database nội dung: MongoDB Atlas.
- Lưu và phân phối ảnh: ImageKit.
- Mã nguồn: GitHub, nhánh production `main`.
- Triển khai: Vercel tự động build và deploy sau khi push nhánh `main`.
- Source local chính thức: `D:\HCM\Presmile`.
- Trang quản trị: `/admin/login`.

Sau khi lưu trong admin, API cập nhật MongoDB và làm mới các trang liên quan. Website public thường hiển thị dữ liệu mới trong vài giây. Nếu trình duyệt đang giữ cache, tải lại trang bằng `Ctrl + F5`.

## 3. Hướng dẫn sử dụng admin

### Cấu hình website

Vào **Cấu hình** và bấm từng nhóm để mở. Có thể quản lý:

- Tên website, slogan, logo.
- Banner và nội dung trang chủ.
- Nội dung trang Dịch vụ.
- Font nội dung, font tiêu đề, cỡ chữ.
- Màu chính, màu nhấn, màu nền và màu chữ.
- SEO toàn website và ảnh chia sẻ mạng xã hội.
- Hotline, email, địa chỉ, giờ làm việc, bản đồ.
- Facebook, Zalo, hai TikTok và YouTube.

Mỗi nhóm có nút **Lưu nhóm này** riêng ở cuối nhóm, không cần kéo xuống cuối trang. Trạng thái cạnh nút cho biết: **Chưa có thay đổi**, **Có thay đổi chưa lưu**, **Đang lưu**, **Đã lưu** hoặc **Lưu chưa thành công**. Có thể nhập nội dung ở nhiều nhóm; khi lưu một nhóm, các thay đổi chưa lưu ở nhóm khác vẫn được giữ nguyên.

### Dịch vụ

- Nhập tên dịch vụ và slug không dấu, ví dụ `nha-khoa-tre-em`.
- Cập nhật mô tả ngắn, nội dung chi tiết, danh mục, CTA và ảnh 16:9.
- Dùng **Thứ tự** để sắp xếp; số nhỏ hiển thị trước.
- Bật **Đang hiển thị** để xuất bản.
- Mỗi dịch vụ có SEO title, SEO description và keywords riêng.
- URL public có dạng `https://presmile.vercel.app/slug`.

### Bài viết

- Nhập tiêu đề, slug, mô tả, nội dung, ngày đăng và ảnh đại diện.
- Dùng `## Tiêu đề` cho mục chính và `### Tiêu đề phụ` cho mục con. Website tạo mục lục tự động.
- Có thể thêm URL video, tên nguồn và URL nguồn tham khảo.
- Nhập SEO title, description và keywords nếu cần tối ưu riêng.
- Bật **Đang hiển thị** để xuất bản.

### Bác sĩ

- Quản lý tên, vai trò, tiểu sử, ảnh chân dung, thứ tự và trạng thái xuất bản.

### Video

- Dán URL embed YouTube hoặc Google Drive preview.
- Chọn vị trí: **Liên hệ**, **Nha khoa trẻ em** hoặc **Kiến thức**.
- Video đặt tại **Liên hệ** xuất hiện trong “Một vòng quanh Presmile”, trước bản đồ.

### Kho ảnh

- Dữ liệu ảnh cũ vẫn được giữ trong admin để quản lý nội bộ.
- Không còn trang Thư viện public theo yêu cầu.

### Lịch hẹn

- Xem yêu cầu từ form website.
- Cập nhật trạng thái: mới, đã xác nhận, hoàn thành hoặc hủy.

## 4. Upload ảnh bằng ImageKit

1. Mở mục cần chỉnh và chọn trường ảnh.
2. Có thể dán URL ảnh hoặc bấm **Upload**.
3. Chọn JPG, PNG, WebP, GIF hoặc SVG; giới hạn giao diện là 25 MB.
4. Chờ tiến trình đạt 100%.
5. Trong phần Cấu hình, bấm **Lưu nhóm này** của nhóm chứa ảnh; upload xong nhưng chưa lưu thì website chưa đổi ảnh.

ImageKit đã được cấu hình trên production. Endpoint xác thực upload, phiên admin và API nội dung đã được kiểm tra hoạt động.

## 5. Kích thước ảnh đề xuất

| Vị trí | Kích thước | Định dạng/dung lượng |
| --- | --- | --- |
| Banner chính, dịch vụ, tầng nội dung | 1600 × 900 px (16:9) | WebP/JPG, dưới 400–450 KB |
| Logo ngang | 1200 × 400 px (3:1) | PNG/WebP trong suốt, dưới 500 KB |
| Ảnh chia sẻ mạng xã hội | 1200 × 630 px (1.91:1) | WebP/JPG, dưới 300 KB |
| Ảnh đội ngũ vuông | 1200 × 1200 px (1:1) | WebP/JPG, dưới 350 KB |
| Ảnh công nghệ dọc | 1200 × 1400 px (6:7) | WebP/JPG, dưới 400 KB |

Đặt chủ thể trong vùng trung tâm, chừa khoảng thở ở mép và không chèn chữ quan trọng vào banner. Logo cần có nền trong suốt và khoảng trống quanh biểu tượng để không bị cắt.

## 6. SEO và URL

- SEO toàn website: **Cấu hình → SEO Google**.
- SEO dịch vụ và bài viết: mở nội dung tương ứng → **SEO Google**.
- Title đề xuất 50–60 ký tự; description 140–160 ký tự.
- Keywords phân cách bằng dấu phẩy.
- Không đổi slug sau khi Google đã lập chỉ mục nếu không thực sự cần thiết.
- Sitemap: https://presmile.vercel.app/sitemap.xml
- Robots: https://presmile.vercel.app/robots.txt
- URL cũ `/dich-vu/slug` và `/kien-thuc/slug` chuyển hướng 308 sang `/slug`.

## 7. Quy trình cập nhật source và deploy

1. Chỉnh source tại `D:\HCM\Presmile`.
2. Chạy `npm run lint`.
3. Chạy `npm run build`.
4. Commit và push nhánh `main` lên GitHub.
5. Vercel tự triển khai production.
6. Kiểm tra website, admin, sitemap, redirect và runtime logs.

Lần kiểm tra gần nhất: lint đạt, TypeScript/build đạt 35 trang, dependency audit không có lỗ hổng, các trang public và admin hoạt động ổn định, không có runtime error mới trên Vercel.

## 8. Trải nghiệm hiển thị và tốc độ

- Website public dùng hiệu ứng xuất hiện nhẹ khi cuộn trang cho các khối nội dung, dịch vụ, bài viết, video và biểu mẫu.
- Hiệu ứng chỉ chạy một lần, không dùng thư viện animation nặng và không làm ẩn nội dung nếu trình duyệt tắt JavaScript.
- Người dùng bật chế độ giảm chuyển động trên thiết bị sẽ xem nội dung ngay, không có hiệu ứng chuyển động.
- Các phần nội dung ở phía dưới trang được tối ưu để trình duyệt ưu tiên tải phần đang xem trước.
- Trang quản trị ưu tiên phản hồi thao tác: có trạng thái đang lưu/tải và không dùng hiệu ứng cuộn để tránh cảm giác chậm.

## 9. Bảo mật và quyền truy cập

- Không lưu mật khẩu hoặc khóa bí mật trong GitHub/tài liệu public.
- MongoDB, ImageKit, tài khoản admin và session secret chỉ đặt trong Vercel Environment Variables hoặc `.env.local` không commit.
- Do một số khóa đã từng được gửi qua hội thoại, nên đổi mật khẩu admin, MongoDB và ImageKit Private Key sau khi bàn giao.
- Khi đổi khóa phải cập nhật Vercel Production và máy phát triển, sau đó redeploy và thử lại upload/admin.

## 10. Nội dung còn cần bổ sung hoặc xác nhận

1. URL kênh YouTube chính thức.
2. Link video “Một vòng quanh không gian Presmile” bản chính thức.
3. Xác nhận điều khoản phản hồi 14 ngày: áp dụng cho lỗi hay cả yêu cầu mới, ngày làm việc tính thế nào, kênh tiếp nhận và mức ưu tiên.
4. Xác nhận người nhận quyền GitHub, Vercel, MongoDB và ImageKit khi bàn giao cuối.
5. Nên rà soát lại địa chỉ, giờ làm việc, email, hotline và nội dung y khoa trước ngày công bố chính thức.

## 11. Checklist bàn giao

- [x] Source GitHub và source local.
- [x] Vercel production hoạt động.
- [x] MongoDB kết nối và admin cập nhật được public.
- [x] ImageKit được cấu hình và xác thực upload hoạt động.
- [x] SEO, sitemap, robots, canonical và URL rút gọn.
- [x] Tài liệu quản trị và kích thước ảnh.
- [ ] URL YouTube chính thức.
- [ ] Video giới thiệu chính thức.
- [ ] Xác nhận SLA 14 ngày và danh sách người nhận quyền dịch vụ.
