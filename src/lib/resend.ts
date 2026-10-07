type RegistrationEmail = { name:string; phone:string; email:string; service:string; message:string };

export function resendStatus() {
  return { configured:Boolean(process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL && process.env.RESEND_TO_EMAIL), from:process.env.RESEND_FROM_EMAIL||"", to:process.env.RESEND_TO_EMAIL||"" };
}

export async function sendRegistrationEmail(data: RegistrationEmail) {
  const { configured, from, to } = resendStatus();
  if (!configured) return { sent:false, reason:"not-configured" };
  const response = await fetch("https://api.resend.com/emails",{method:"POST",headers:{Authorization:`Bearer ${process.env.RESEND_API_KEY}`,"Content-Type":"application/json"},body:JSON.stringify({from,to:[to],subject:`[CIIC] Đăng ký mới từ ${data.name}`,html:`<div style="font-family:Arial,sans-serif;line-height:1.6"><h2>Đăng ký mới từ website CIIC</h2><p><b>Họ tên:</b> ${escapeHtml(data.name)}</p><p><b>Điện thoại:</b> ${escapeHtml(data.phone)}</p><p><b>Email:</b> ${escapeHtml(data.email||"—")}</p><p><b>Vai trò:</b> ${escapeHtml(data.service)}</p><p><b>Nội dung:</b><br>${escapeHtml(data.message||"—").replace(/\n/g,"<br>")}</p></div>`})});
  if (!response.ok) throw new Error(`Resend error ${response.status}`);
  return { sent:true };
}

function escapeHtml(value:string){return value.replace(/[&<>'"]/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[char]||char));}
