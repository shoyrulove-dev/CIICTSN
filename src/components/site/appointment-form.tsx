"use client";

import { FormEvent, useState } from "react";
import type { Service } from "@/types/cms";

export function AppointmentForm({ services }: { services: Service[] }) {
  const [state, setState] = useState<{ loading: boolean; message: string; ok: boolean }>({ loading: false, message: "", ok: false });

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState({ loading: true, message: "", ok: false });
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());
    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      setState({ loading: false, message: result.message, ok: response.ok });
      if (response.ok) event.currentTarget.reset();
    } catch {
      setState({ loading: false, message: "Không thể gửi yêu cầu lúc này. Vui lòng gọi 091 333 7672.", ok: false });
    }
  }

  return (
    <form className="appointment-form" onSubmit={submit}>
      <div className="field-row">
        <label>Họ và tên<input name="name" required placeholder="Nguyễn Văn A" /></label>
        <label>Số điện thoại<input name="phone" required inputMode="tel" placeholder="09xx xxx xxx" /></label>
      </div>
      <div className="field-row">
        <label>Dịch vụ quan tâm<select name="service">{services.map((item) => <option key={item.slug}>{item.title}</option>)}</select></label>
        <label>Ngày mong muốn<input name="preferredDate" type="date" /></label>
      </div>
      <label>Lời nhắn<textarea name="message" rows={3} placeholder="Tình trạng hoặc nhu cầu cần tư vấn..." /></label>
      <button className="button button-primary" disabled={state.loading}>{state.loading ? "Đang gửi..." : "Gửi yêu cầu đặt lịch"}</button>
      {state.message ? <p className={`form-message ${state.ok ? "success" : "error"}`}>{state.message}</p> : null}
    </form>
  );
}

