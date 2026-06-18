import { createHmac, randomBytes, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const SECRET = () => {
  const s = process.env.ADMIN_SESSION_SECRET;
  if (!s) throw new Error("ADMIN_SESSION_SECRET is not set");
  return s;
};

/** Génère un token de session signé : `<random>.<hmac>` */
export function generateSessionToken(): string {
  const token = randomBytes(32).toString("hex");
  const sig   = createHmac("sha256", SECRET()).update(token).digest("hex");
  return `${token}.${sig}`;
}

/** Vérifie le token de session (timing-safe). */
function isValidSessionToken(value: string): boolean {
  const dot = value.lastIndexOf(".");
  if (dot === -1) return false;
  const token    = value.slice(0, dot);
  const received = value.slice(dot + 1);
  const expected = createHmac("sha256", SECRET()).update(token).digest("hex");
  try {
    return timingSafeEqual(Buffer.from(received, "hex"), Buffer.from(expected, "hex"));
  } catch {
    return false;
  }
}

/** À appeler en tête de chaque route API admin. */
export async function requireAdmin(): Promise<boolean> {
  const store = await cookies();
  const value = store.get("kekeli_admin")?.value;
  if (!value) return false;
  return isValidSessionToken(value);
}

/** Signe un payload OTP (timing-safe comparison à faire côté appelant). */
export function signOtp(payload: string): string {
  return createHmac("sha256", SECRET()).update(payload).digest("hex");
}

/** Compare deux chaînes de façon timing-safe. */
export function safeEqual(a: string, b: string): boolean {
  try {
    const ba = Buffer.from(a);
    const bb = Buffer.from(b);
    if (ba.length !== bb.length) return false;
    return timingSafeEqual(ba, bb);
  } catch {
    return false;
  }
}
