import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/site/page-shell";
import { VideoEmbed } from "@/components/site/video-embed";
import { slugify } from "@/lib/slug";
import type { Post, Service } from "@/types/cms";

type ArticleSection = {
  id: string;
  title: string;
  level: 2 | 3;
  paragraphs: string[];
};

const fallbackHeadings = ["Tổng quan", "Điểm nổi bật", "Thông tin tham gia", "Gợi ý từ CIIC"];

export function buildArticleSections(content: string): ArticleSection[] {
  const blocks = content.split(/\n{2,}/).map((block) => block.trim()).filter(Boolean);
  const hasHeadings = blocks.some((block) => /^#{2,3}\s+/.test(block));

  if (!hasHeadings) {
    return blocks.map((paragraph, index) => ({
      id: slugify(`${fallbackHeadings[index] || `Nội dung ${index + 1}`}-${index + 1}`),
      title: fallbackHeadings[index] || `Nội dung ${index + 1}`,
      level: 2,
      paragraphs: [paragraph],
    }));
  }

  const sections: ArticleSection[] = [];
  let current: ArticleSection | null = null;
  blocks.forEach((block, index) => {
    const match = block.match(/^(#{2,3})\s+(.+)$/);
    if (match) {
      const title = match[2].trim();
      current = {
        id: `${slugify(title)}-${index + 1}`,
        title,
        level: match[1].length === 3 ? 3 : 2,
        paragraphs: [],
      };
      sections.push(current);
      return;
    }
    if (!current) {
      current = { id: "tong-quan", title: "Tổng quan", level: 2, paragraphs: [] };
      sections.push(current);
    }
    current.paragraphs.push(block);
  });
  return sections;
}

export function ServiceDetail({ service }: { service: Service }) {
  return (
    <PageShell>
      <section className="page-content"><div className="shell detail-grid">
        <div className="detail-copy">
          <span className="booking-eyebrow">Chương trình CIIC</span>
          <h1>{service.title}</h1>
          <p>{service.excerpt}</p>
          <div className="prose"><p>{service.description}</p><p>Lịch tổ chức và cách tham gia sẽ được CIIC cập nhật theo từng chương trình.</p></div>
          <div className="detail-cta"><h3>Bạn muốn tìm hiểu chương trình này?</h3><p>Hãy để lại lời nhắn, CIIC sẽ liên hệ và chia sẻ thông tin phù hợp.</p><Link className="button button-primary" href="/#register">Đăng ký tìm hiểu</Link></div>
        </div>
        <div className="detail-image"><Image src={service.image} alt={service.title} fill sizes="(max-width: 760px) 100vw, 42vw" /></div>
      </div></section>
    </PageShell>
  );
}

export function PostDetail({ post, previousPost, nextPost }: { post: Post; previousPost?: Post; nextPost?: Post }) {
  const sections = buildArticleSections(post.content);
  return (
    <PageShell>
      <section className="page-content"><article className="shell article-layout">
        <aside className="article-toc" aria-label="Mục lục bài viết">
          <strong>Mục lục bài viết</strong>
          <nav>{sections.map((section) => <a className={section.level === 3 ? "is-sub" : ""} href={`#${section.id}`} key={section.id}>{section.title}</a>)}</nav>
        </aside>
        <div className="detail-copy article-body">
          <span className="booking-eyebrow">Câu chuyện CIIC</span>
          <h1>{post.title}</h1>
          <p>{post.excerpt}</p>
          <div className="article-cover"><Image src={post.image} alt={post.title} fill priority sizes="(max-width: 760px) 100vw, 760px" /></div>
          <div className="prose article-prose">
            {sections.map((section) => <section id={section.id} className={section.level === 3 ? "article-subsection" : ""} key={section.id}>
              {section.level === 3 ? <h3>{section.title}</h3> : <h2>{section.title}</h2>}
              {section.paragraphs.map((paragraph, index) => <p key={`${section.id}-${index}`}>{paragraph}</p>)}
            </section>)}
            {post.videoEmbedUrl ? <VideoEmbed item={{ title: post.title, description: "Video minh họa cho nội dung bài viết.", embedUrl: post.videoEmbedUrl, placement: "knowledge", order: 0, published: true }} /> : null}
            <p className="medical-note">Thông tin về thời gian, địa điểm và cách tham gia có thể được cập nhật theo kế hoạch tổ chức thực tế.</p>
            {post.sourceUrl ? <p className="article-source">Nguồn tham khảo: <a href={post.sourceUrl} target="_blank" rel="noreferrer">{post.sourceLabel || post.sourceUrl}</a></p> : null}
          </div>
          <nav className="post-navigation" aria-label="Điều hướng bài viết">
            {previousPost ? <Link href={`/${previousPost.slug}`}><small>← Bài trước</small><strong>{previousPost.title}</strong></Link> : <span />}
            {nextPost ? <Link href={`/${nextPost.slug}`}><small>Bài tiếp theo →</small><strong>{nextPost.title}</strong></Link> : <span />}
          </nav>
          <Link className="back-to-knowledge" href="/#news">← Quay lại tin tức CIIC</Link>
        </div>
      </article></section>
    </PageShell>
  );
}
