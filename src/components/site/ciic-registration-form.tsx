"use client";

import { FormEvent, useState } from "react";

export function CiicRegistrationForm() {
  const [state, setState] = useState<"idle"|"sending"|"done"|"error">("idle");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setState("sending");
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/appointments", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(Object.fromEntries(form)) });
    if (response.ok) { setState("done"); event.currentTarget.reset(); } else setState("error");
  }
  return <form className="ipf-form" onSubmit={submit}>
    <div><label>Họ và tên *</label><input name="name" required placeholder="Nguyễn Văn A"/></div>
    <div><label>Số điện thoại *</label><input name="phone" required placeholder="09xx xxx xxx"/></div>
    <div><label>Email</label><input name="email" type="email" placeholder="email@domain.com"/></div>
    <div><label>Bạn muốn tham gia với vai trò?</label><select name="service"><option>Người dân / thành viên</option><option>Doanh nghiệp / thương hiệu</option><option>CLB / hội đoàn</option><option>Nhà trường / chuyên gia</option><option>Đối tác đồng hành</option></select></div>
    <div className="wide"><label>Nội dung quan tâm</label><textarea name="message" rows={4} placeholder="Chia sẻ nhu cầu hoặc đề xuất của bạn..."/></div>
    <button disabled={state==="sending"}>{state==="sending"?"ĐANG GỬI...":"GỬI ĐĂNG KÝ →"}</button>
    {state==="done"&&<p className="ipf-form-note ok">Đã nhận thông tin. CIIC sẽ liên hệ với bạn sớm.</p>}
    {state==="error"&&<p className="ipf-form-note">Chưa gửi được. Vui lòng thử lại sau.</p>}
  </form>;
}
