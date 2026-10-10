type RegistrationEmail = { name: string; phone: string; email: string; service: string; message: string };
type BookingEmail = { code: string; name: string; phone: string; email: string; resource: string; startAt: string; endAt: string; participants: number };
type ActivityEmail = { code: string; name: string; phone: string; email: string; activity: string; schedule: string; participants: number; waitlisted: boolean };

export function resendStatus() {
  return { configured: Boolean(process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL && process.env.RESEND_TO_EMAIL), from: process.env.RESEND_FROM_EMAIL || "", to: process.env.RESEND_TO_EMAIL || "" };
}

async function send(to: string, subject: string, html: string) {
  const status = resendStatus();
  if (!status.configured) return { sent: false, reason: "not-configured" };
  const response = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" }, body: JSON.stringify({ from: status.from, to: [to], subject, html }) });
  if (!response.ok) throw new Error(`Resend error ${response.status}`);
  return { sent: true };
}

const frame = (content: string) => `<div style="font-family:Arial,sans-serif;line-height:1.65;color:#163d35;max-width:640px"><div style="border-top:6px solid #006b4f;padding:24px;background:#f8faf7"><b style="color:#006b4f">CIIC Tân Sơn Nhất</b>${content}<p style="color:#687b76;font-size:13px">Đây là email tự động từ website CIIC. Vui lòng không gửi thông tin nhạy cảm qua email.</p></div></div>`;

export async function sendRegistrationEmail(data: RegistrationEmail) {
  const { configured, to } = resendStatus();
  if (!configured) return { sent: false, reason: "not-configured" };
  return send(to, `[CIIC] Đăng ký mới từ ${data.name}`, frame(`<h2>Đăng ký mới từ website</h2><p><b>Họ tên:</b> ${escapeHtml(data.name)}</p><p><b>Điện thoại:</b> ${escapeHtml(data.phone)}</p><p><b>Email:</b> ${escapeHtml(data.email || "—")}</p><p><b>Vai trò:</b> ${escapeHtml(data.service)}</p><p><b>Nội dung:</b><br>${escapeHtml(data.message || "—").replace(/\n/g, "<br>")}</p>`));
}

export async function sendBookingEmails(data: BookingEmail) {
  const status = resendStatus();
  if (!status.configured) return { adminSent: false, userSent: false, reason: "not-configured" };
  await send(status.to, `[CIIC] Yêu cầu đặt chỗ ${data.code}`, frame(`<h2>Yêu cầu đặt chỗ mới</h2><p><b>Mã:</b> ${escapeHtml(data.code)}</p><p><b>Người đặt:</b> ${escapeHtml(data.name)} — ${escapeHtml(data.phone)}</p><p><b>Sân/phòng:</b> ${escapeHtml(data.resource)}</p><p><b>Thời gian:</b> ${escapeHtml(data.startAt)} đến ${escapeHtml(data.endAt)}</p><p><b>Số người:</b> ${data.participants}</p>`));
  let userSent = false;
  if (isEmail(data.email)) { await send(data.email, `CIIC đã nhận yêu cầu ${data.code}`, frame(`<h2>CIIC đã nhận yêu cầu đặt chỗ</h2><p>Chào ${escapeHtml(data.name)}, mã yêu cầu của bạn là <b>${escapeHtml(data.code)}</b>.</p><p>Thời gian dự kiến: ${escapeHtml(data.startAt)} đến ${escapeHtml(data.endAt)}. CIIC sẽ liên hệ để xác nhận.</p>`)); userSent = true; }
  return { adminSent: true, userSent };
}

export async function sendActivityRegistrationEmails(data: ActivityEmail) {
  const status = resendStatus();
  if (!status.configured) return { adminSent: false, userSent: false, reason: "not-configured" };
  await send(status.to, `[CIIC] Đăng ký hoạt động ${data.code}`, frame(`<h2>Đăng ký hoạt động mới</h2><p><b>Mã:</b> ${escapeHtml(data.code)}</p><p><b>Người đăng ký:</b> ${escapeHtml(data.name)} — ${escapeHtml(data.phone)}</p><p><b>Hoạt động:</b> ${escapeHtml(data.activity)}</p><p><b>Lịch:</b> ${escapeHtml(data.schedule)}</p><p><b>Số người:</b> ${data.participants}</p><p><b>Tình trạng:</b> ${data.waitlisted ? "Danh sách chờ" : "Chờ xác nhận"}</p>`));
  let userSent = false;
  if (isEmail(data.email)) { await send(data.email, `CIIC đã nhận đăng ký ${data.code}`, frame(`<h2>Đã nhận đăng ký</h2><p>Chào ${escapeHtml(data.name)}, mã đăng ký của bạn là <b>${escapeHtml(data.code)}</b>.</p><p>${data.waitlisted ? "Lịch hiện đã đủ chỗ và bạn được đưa vào danh sách chờ." : "CIIC sẽ liên hệ để xác nhận lịch tham gia."}</p>`)); userSent = true; }
  return { adminSent: true, userSent };
}

function isEmail(value: string) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); }
function escapeHtml(value: string) { return value.replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char] || char); }
