import { NextResponse } from "next/server";
import { createHmac } from "crypto";
import { cookies } from "next/headers";

function sign(data: string) {
  return createHmac("sha256", process.env.ADMIN_SESSION_SECRET!).update(data).digest("hex");
}

export async function POST(request: Request) {
  const { code } = await request.json();
  if (!code) return NextResponse.json({ error: "Code manquant" }, { status: 400 });

  const jar       = await cookies();
  const challenge = jar.get("kekeli_otp_challenge")?.value;

  if (!challenge) {
    return NextResponse.json({ error: "Session expirée. Recommencez." }, { status: 400 });
  }

  const parts = challenge.split(":");
  if (parts.length !== 3) {
    return NextResponse.json({ error: "Token invalide." }, { status: 400 });
  }

  const [storedCode, expiry, storedHmac] = parts;

  /* Vérifier signature */
  const expected = sign(`${storedCode}:${expiry}`);
  if (expected !== storedHmac) {
    return NextResponse.json({ error: "Token invalide." }, { status: 400 });
  }

  /* Vérifier expiration */
  if (Date.now() > parseInt(expiry)) {
    return NextResponse.json({ error: "Code expiré. Recommencez." }, { status: 400 });
  }

  /* Vérifier code */
  if (code.trim() !== storedCode) {
    return NextResponse.json({ error: "Code incorrect." }, { status: 401 });
  }

  /* Tout bon → session */
  const res = NextResponse.json({ success: true });

  res.cookies.set("kekeli_admin", process.env.ADMIN_SESSION_SECRET!, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  res.cookies.delete("kekeli_otp_challenge");

  return res;
}
