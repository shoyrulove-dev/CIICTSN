import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Be_Vietnam_Pro, Manrope, Noto_Serif } from "next/font/google";
import { getSettings } from "@/lib/content";
import { absoluteUrl, SITE_URL } from "@/lib/seo";
import "./globals.css";

export const revalidate = 300;

const bodyFont = Be_Vietnam_Pro({ subsets: ["latin", "vietnamese"], variable: "--font-body", weight: ["300", "400", "500", "600", "700"] });
const displayFont = Manrope({ subsets: ["latin"], variable: "--font-display", weight: ["500", "600", "700", "800"] });
const ciicSerif = Noto_Serif({ subsets: ["latin", "vietnamese"], variable: "--font-ciic-serif", weight: ["600", "700", "800"] });

const fontStacks: Record<string, string> = {
  "Be Vietnam Pro": "var(--font-body), Arial, sans-serif",
  Manrope: "var(--font-display), Arial, sans-serif",
  Arial: "Arial, sans-serif",
  Tahoma: "Tahoma, Arial, sans-serif",
  Georgia: "Georgia, serif",
};

function color(value: string, fallback: string) {
  return /^#[0-9a-f]{6}$/i.test(value || "") ? value : fallback;
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: "CIIC Tân Sơn Nhất | Đổi mới sáng tạo", template: "%s | CIIC Tân Sơn Nhất" },
    description: "CIIC Tân Sơn Nhất – không gian kết nối đổi mới sáng tạo, công nghệ và nguồn lực.",
    keywords: settings.seoKeywords.split(",").map((item) => item.trim()),
    authors: [{ name: "CIIC Tân Sơn Nhất", url: SITE_URL }],
    creator: "CIIC Tân Sơn Nhất",
    publisher: "CIIC Tân Sơn Nhất",
    category: "business",
    alternates: { canonical: SITE_URL },
    applicationName: "CIIC Tân Sơn Nhất",
    formatDetection: { telephone: true, address: true, email: true },
    icons: { icon: "/icon.png", apple: "/icon.png" },
    manifest: "/manifest.webmanifest",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      title: settings.seoTitle,
      description: settings.seoDescription,
      url: SITE_URL,
      siteName: "CIIC Tân Sơn Nhất",
      images: [{ url: absoluteUrl(settings.ogImage), width: 1200, height: 630, alt: "CIIC Tân Sơn Nhất" }],
      locale: "vi_VN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: settings.seoTitle,
      description: settings.seoDescription,
      images: [absoluteUrl(settings.ogImage)],
    },
  };
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const settings = await getSettings();
  const themeStyle = {
    "--site-primary": color(settings.primaryColor, "#13b8b0"),
    "--site-accent": color(settings.accentColor, "#087f7a"),
    "--site-background": color(settings.backgroundColor, "#ffffff"),
    "--site-text": color(settings.textColor, "#314f50"),
    "--site-heading": color(settings.headingColor, "#075f5b"),
    "--site-body-font": fontStacks[settings.bodyFont] || fontStacks["Be Vietnam Pro"],
    "--site-heading-font": fontStacks[settings.headingFont] || fontStacks.Manrope,
    "--site-body-size": `${Math.min(20, Math.max(13, Number(settings.bodyFontSize) || 16))}px`,
    "--site-heading-size": `${Math.min(84, Math.max(42, Number(settings.headingFontSize) || 64))}px`,
  } as CSSProperties;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "CivicStructure"],
        "@id": `${SITE_URL}/#organization`,
        name: settings.siteName,
        alternateName: settings.shortName,
        url: SITE_URL,
        logo: absoluteUrl(settings.logoUrl),
        image: absoluteUrl(settings.heroImage),
        description: settings.seoDescription,
        telephone: settings.contact.phone,
        email: settings.contact.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: settings.contact.address,
          addressLocality: "TP. Hồ Chí Minh",
          addressCountry: "VN",
        },
        sameAs: [
          settings.contact.facebook,
          settings.contact.tiktok,
          settings.contact.tiktokDoctor,
          settings.contact.youtube,
        ].filter(Boolean),
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: settings.siteName,
        inLanguage: "vi-VN",
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
    ],
  };
  return (
    <html lang="vi">
      <body className={`${bodyFont.variable} ${displayFont.variable} ${ciicSerif.variable}`} style={themeStyle}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        {children}
      </body>
    </html>
  );
}
