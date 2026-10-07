import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostDetail, ServiceDetail } from "@/components/site/content-detail";
import { getPosts, getServices } from "@/lib/content";
import { absoluteUrl, buildPageMetadata, SITE_URL } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 300;

export async function generateStaticParams() {
  const [services, posts] = await Promise.all([getServices(), getPosts()]);
  return [...services, ...posts].map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [services, posts] = await Promise.all([getServices(), getPosts()]);
  const service = services.find((item) => item.slug === slug);
  if (service) return {
    ...buildPageMetadata({ title: service.metaTitle || service.title, description: service.metaDescription || service.excerpt, path: `/${service.slug}`, image: service.image }),
    keywords: service.keywords?.split(",").map((item) => item.trim()).filter(Boolean),
  };
  const post = posts.find((item) => item.slug === slug);
  return post ? {
    ...buildPageMetadata({ title: post.metaTitle || post.title, description: post.metaDescription || post.excerpt, path: `/${post.slug}`, image: post.image }),
    keywords: post.keywords?.split(",").map((item) => item.trim()),
  } : { title: "Không tìm thấy nội dung" };
}

export default async function RootContentPage({ params }: Props) {
  const { slug } = await params;
  const [services, posts] = await Promise.all([getServices(), getPosts()]);
  const service = services.find((item) => item.slug === slug);
  if (service) {
    const structuredData = {
      "@context": "https://schema.org", "@type": "Service", name: service.title,
      description: service.excerpt, image: absoluteUrl(service.image), url: `${SITE_URL}/${service.slug}`,
      provider: { "@id": `${SITE_URL}/#dental-clinic` }, areaServed: "TP. Hồ Chí Minh",
    };
    return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /><ServiceDetail service={service} /></>;
  }
  const index = posts.findIndex((item) => item.slug === slug);
  if (index < 0) notFound();
  const post = posts[index];
  const structuredData = {
    "@context": "https://schema.org", "@type": "Article", headline: post.title,
    description: post.metaDescription || post.excerpt, image: [absoluteUrl(post.image)],
    datePublished: post.publishedAt, dateModified: post.publishedAt, inLanguage: "vi-VN",
    mainEntityOfPage: `${SITE_URL}/${post.slug}`,
    author: { "@type": "Organization", name: "Presmile Dental Center", url: SITE_URL },
    publisher: { "@id": `${SITE_URL}/#dental-clinic` },
  };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /><PostDetail post={post} previousPost={posts[index - 1]} nextPost={posts[index + 1]} /></>;
}
