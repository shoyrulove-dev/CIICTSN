# Presmile Dental Center

Website nha khoa và hệ thống quản trị nội dung, xây dựng bằng Next.js, MongoDB và tối ưu cho Vercel.

Tài liệu bàn giao và cách sử dụng CMS: [docs/HUONG-DAN-QUAN-TRI.md](docs/HUONG-DAN-QUAN-TRI.md).

## Chạy local

```bash
npm install
copy .env.example .env.local
npm run dev
```

Mở `http://localhost:3000`. Admin tại `http://localhost:3000/admin/login`.

Nếu chưa cấu hình MongoDB, website dùng nội dung mẫu để vẫn xem được đầy đủ. Form đặt lịch và lưu nội dung admin sẽ hoạt động sau khi có `MONGODB_URI`.

## Biến môi trường

- `MONGODB_URI`: chuỗi kết nối MongoDB Atlas
- `MONGODB_DB`: tên database, mặc định `presmile`
- `ADMIN_USERNAME`: tài khoản admin
- `ADMIN_PASSWORD`: mật khẩu admin
- `SESSION_SECRET`: chuỗi bí mật dài, ngẫu nhiên
- `NEXT_PUBLIC_SITE_URL`: domain chính thức

Sau khi kết nối MongoDB, chạy:

```bash
npm run seed
```

## Triển khai Vercel

Import repository GitHub vào Vercel, thêm các biến môi trường trên cho Production/Preview, sau đó deploy. Không commit `.env.local`.
