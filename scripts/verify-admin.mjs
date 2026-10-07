const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
const username = process.env.ADMIN_USERNAME;
const password = process.env.ADMIN_PASSWORD;

if (!username || !password) throw new Error("Admin credentials are not configured");

const login = await fetch(`${baseUrl}/api/auth/login`, {
  method: "POST",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
  body: new URLSearchParams({ username, password, next: "/admin" }),
  redirect: "manual",
});
const cookie = login.headers.get("set-cookie")?.split(";", 1)[0] || "";
const headers = cookie ? { Cookie: cookie } : {};

const [settingsPage, servicesApi, uploadAuth] = await Promise.all([
  fetch(`${baseUrl}/admin/settings`, { headers, redirect: "manual" }),
  fetch(`${baseUrl}/api/admin/services`, { headers, redirect: "manual" }),
  fetch(`${baseUrl}/api/admin/upload`, { headers, redirect: "manual" }),
]);

let writeCheck;
let publicSync;
if (process.env.VERIFY_ADMIN_WRITE === "1" && servicesApi.status === 200) {
  const { items } = await servicesApi.clone().json();
  const service = items?.[0];
  if (service?._id && service?.slug) {
    const { _id, __v, createdAt, updatedAt, ...payload } = service;
    void __v;
    void createdAt;
    void updatedAt;
    const update = await fetch(`${baseUrl}/api/admin/services/${_id}`, {
      method: "PUT",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    writeCheck = update.status;
    const publicPage = await fetch(`${baseUrl}/${service.slug}`, { cache: "no-store" });
    publicSync = publicPage.status === 200 && (await publicPage.text()).includes(service.title);
  }
}

console.log(JSON.stringify({
  login: login.status,
  sessionCookie: Boolean(cookie),
  settingsPage: settingsPage.status,
  servicesApi: servicesApi.status,
  imageKitUploadAuth: uploadAuth.status,
  writeCheck,
  publicSync,
}, null, 2));

if (!cookie || settingsPage.status !== 200 || servicesApi.status !== 200 || uploadAuth.status !== 200 || writeCheck && writeCheck !== 200 || publicSync === false) {
  process.exitCode = 1;
}
