import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "ciic_admin";
const MAX_AGE = 60 * 60 * 12;

function credentials() {
  return {
    username: process.env.ADMIN_USERNAME || "admin",
    password: process.env.ADMIN_PASSWORD || "presmile-admin",
    secret: process.env.SESSION_SECRET || "presmile-development-session-secret",
  };
}

function sign(value: string) {
  return createHmac("sha256", credentials().secret).update(value).digest("base64url");
}

export function verifyCredentials(username: string, password: string) {
  if (
    process.env.NODE_ENV === "production" &&
    (!process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD || !process.env.SESSION_SECRET)
  ) {
    return false;
  }
  const expected = credentials();
  const incomingUser = Buffer.from(username.trim());
  const expectedUser = Buffer.from(expected.username);
  const incomingPass = Buffer.from(password);
  const expectedPass = Buffer.from(expected.password);
  return (
    incomingUser.length === expectedUser.length &&
    incomingPass.length === expectedPass.length &&
    timingSafeEqual(incomingUser, expectedUser) &&
    timingSafeEqual(incomingPass, expectedPass)
  );
}

export function createSession() {
  const payload = Buffer.from(JSON.stringify({ exp: Date.now() + MAX_AGE * 1000 })).toString("base64url");
  return { token: `${payload}.${sign(payload)}`, maxAge: MAX_AGE };
}

export function parseSession(token?: string) {
  if (!token) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;
  const expected = Buffer.from(sign(payload));
  const received = Buffer.from(signature);
  if (expected.length !== received.length || !timingSafeEqual(expected, received)) return false;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as { exp: number };
    return data.exp > Date.now();
  } catch {
    return false;
  }
}

export async function isAdmin() {
  const store = await cookies();
  return parseSession(store.get(ADMIN_COOKIE)?.value);
}
