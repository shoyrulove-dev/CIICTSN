import type {Metadata} from "next";
import Image from "next/image";
import Link from "next/link";
import {notFound} from "next/navigation";
import {CiicHeader} from "@/components/site/ciic-header";
import {SiteFooter} from "@/components/site/footer";
import {ScrollReveal} from "@/components/site/scroll-reveal";
import {getRoadmapModules,getServices,getSettings} from "@/lib/content";
import {roadmapBySlug,roadmapModules} from "@/lib/roadmap";

export const revalidate=3600;
export function generateStaticParams(){return roadmapModules.map(({slug})=>({slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const item=roadmapBySlug[slug];return item?{title:`${item.title} | CIIC Tân Sơn Nhất`,description:item.summary}:{};}
function sportSlug(value:string){return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/đ/g,"d").replace(/\s+/g,"-");}
export default async function RoadmapPage({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;const [settings,services,modules]=await Promise.all([getSettings(),getServices(),getRoadmapModules()]);const item=modules.find(module=>module.slug===slug);if(!item)notFound();
 return <div className="ipf-site roadmap-site"><ScrollReveal/><CiicHeader settings={settings}/><main>
  <section className="roadmap-hero"><Image src={item.image} alt={item.title} fill priority sizes="100vw"/><div className="roadmap-hero-shade"/><div className="ipf-container roadmap-hero-copy"><p>{item.eyebrow}</p><b>{item.number}</b><h1>{item.title}</h1><span>{item.summary}</span><div><a className="ipf-button gold" href="#noi-dung">KHÁM PHÁ NỘI DUNG</a><Link className="ipf-button ghost" href="/#register">ĐĂNG KÝ QUAN TÂM</Link></div></div></section>
  <section className="roadmap-content" id="noi-dung"><div className="ipf-container"><div className="roadmap-intro"><div><p className="ipf-kicker">CẤU TRÚC ĐỀ XUẤT</p><h2>Nội dung đang được chuẩn bị theo từng nhóm</h2></div><p>Dữ liệu bên dưới là bản demo để thống nhất cấu trúc. Quản trị viên có thể cập nhật chương trình, hình ảnh và thông tin vận hành khi có dữ liệu chính thức.</p></div><div className="roadmap-groups">{item.groups.map((group,index)=><article id={`nhom-${index+1}`} key={group.title}><span>{String(index+1).padStart(2,"0")}</span><h3>{group.title}</h3><p>{group.description}</p><ul>{group.items.map(value=><li key={value}>{slug==="the-duc-the-thao"&&index===0?<Link href={`/kham-pha/the-duc-the-thao/${sportSlug(value)}`}>{value}<b>→</b></Link>:value}</li>)}</ul></article>)}</div></div></section>
  <section className="roadmap-next"><div className="ipf-container"><p className="ipf-kicker light">KHÁM PHÁ TOÀN BỘ CIIC</p><h2>10 nhóm nội dung trong một hành trình</h2><div>{modules.map(module=><Link className={module.slug===slug?"active":""} href={`/kham-pha/${module.slug}`} key={module.slug}><b>{module.number}</b><span>{module.title}</span></Link>)}</div></div></section>
  <section className="roadmap-cta"><div className="ipf-container"><div><p className="ipf-kicker">CẦN THÔNG TIN CHÍNH THỨC</p><h2>Bạn muốn tham gia hoặc bổ sung dữ liệu?</h2></div><Link className="ipf-button gold" href="/#register">GỬI THÔNG TIN CHO CIIC</Link></div></section>
 </main><SiteFooter settings={settings} services={services}/></div>;
}
