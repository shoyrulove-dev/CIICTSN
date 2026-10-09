import {AdminManager,type AdminField} from "@/components/admin/manager";
import {getRoadmapModules} from "@/lib/content";
const fields:AdminField[]=[
 {name:"number",label:"Số thứ tự"},{name:"title",label:"Tên nhóm"},{name:"slug",label:"Đường dẫn"},
 {name:"eyebrow",label:"Dòng giới thiệu"},{name:"summary",label:"Mô tả ngắn",type:"textarea"},
 {name:"image",label:"Ảnh bìa 16:9",type:"image",hint:"Đề xuất 1600 × 900px, WebP/JPG dưới 450KB."},
 {name:"groupsJson",label:"Các nhóm nội dung (JSON)",type:"textarea",hint:"Giữ đúng cấu trúc title, description và items. Có thể sửa nội dung nhưng không xóa dấu ngoặc JSON."},
 {name:"order",label:"Thứ tự",type:"number"},{name:"published",label:"Đang hiển thị",type:"checkbox"},
];
export default async function Page(){const items=await getRoadmapModules(true);return <><div className="admin-page-heading"><div><span>Cấu trúc website</span><h1>10 nhóm nội dung</h1><p>Quản lý nội dung demo, ảnh đại diện và trạng thái hiển thị của toàn bộ cấu trúc CIIC.</p></div></div><AdminManager collection="roadmap" fields={fields} initialItems={items as unknown as Record<string,unknown>[]}/></>}
