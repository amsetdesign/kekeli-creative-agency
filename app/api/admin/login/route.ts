import { NextResponse } from "next/server";
import { createHmac, randomInt } from "crypto";
import { resend } from "@/lib/resend";

function sign(data: string) {
  return createHmac("sha256", process.env.ADMIN_SESSION_SECRET!).update(data).digest("hex");
}

export async function POST(request: Request) {
  const { password } = await request.json();

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Mot de passe incorrect" }, { status: 401 });
  }

  const code    = randomInt(100000, 999999).toString();
  const expiry  = (Date.now() + 10 * 60 * 1000).toString(); // 10 min
  const payload = `${code}:${expiry}`;
  const token   = `${payload}:${sign(payload)}`;

  /* ── Envoyer le code par email ── */
  const emailResult = await resend.emails.send({
    from: "KEKELI Admin <onboarding@resend.dev>",
    to: [process.env.ADMIN_EMAIL!],
    subject: `🔐 Code de connexion KEKELI : ${code}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:400px;margin:auto;padding:40px 20px;text-align:center">
        <div style="background:#0C0B09;border-radius:16px;padding:40px">
          <div style="color:#C8A84B;font-size:28px;font-weight:bold;margin-bottom:8px">K</div>
          <h2 style="color:#fff;margin:0 0 8px">Code de connexion</h2>
          <p style="color:rgba(255,255,255,0.5);font-size:14px;margin:0 0 32px">Valable 10 minutes</p>
          <div style="background:rgba(200,168,75,0.12);border:1px solid rgba(200,168,75,0.3);border-radius:12px;padding:24px;margin-bottom:24px">
            <span style="color:#C8A84B;font-size:36px;font-weight:bold;letter-spacing:12px">${code}</span>
          </div>
          <p style="color:rgba(255,255,255,0.35);font-size:12px;margin:0">Si vous n'êtes pas à l'origine de cette tentative, ignorez cet email.</p>
        </div>
      </div>
    `,
  });

  console.log("[2FA] Resend result:", JSON.stringify(emailResult));

  const res = NextResponse.json({ step: "otp" });
  res.cookies.set("kekeli_otp_challenge", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 10, // 10 min
    path: "/",
  });
  return res;
}
