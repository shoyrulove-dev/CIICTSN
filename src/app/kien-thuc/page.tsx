import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { PageShell } from "@/components/site/page-shell";
import { getPosts } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Kiến thức nha khoa",
  description: "Kiến thức chăm sóc răng miệng, Implant, chỉnh nha và nha khoa trẻ em được biên soạn dễ hiểu bởi Presmile.",
  path: "/kien-thuc",
  image: "/images/posts/daily-oral-care.jpg",
});

export default async function PostsPage() {
  const posts = await getPosts();
  return (
    <PageShell>
      <section className="page-hero"><div className="shell"><span>Kiến thức</span><h1>Hiểu đúng để chăm răng tốt hơn</h1><p>Thông tin ngắn gọn, thực tế giúp gia đình bạn chủ động bảo vệ sức khỏe răng miệng.</p></div></section>
      <section className="page-content"><div className="shell post-grid">
        {posts.map((post, index) => (
          <Link href={`/${post.slug}`} className="post-card" key={post.slug}>
            <div className={`post-image crop-${(index % 3) + 1}`}><Image src={post.image} alt="" fill sizes="(max-width: 760px) 100vw, 33vw" /></div>
            <div><time>{new Date(post.publishedAt).toLocaleDateString("vi-VN")}</time><h3>{post.title}</h3><p>{post.excerpt}</p><span className="card-link">Đọc bài viết <Icon name="arrow" /></span></div>
          </Link>
        ))}
      </div></section>
    </PageShell>
  );
}
