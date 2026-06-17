import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return new NextResponse(unsubscribePage("Lien invalide", "Ce lien de désinscription est invalide ou expiré."), {
      status: 400,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  const db = getSupabase();
  const { data, error } = await db
    .from("newsletter_subscribers")
    .update({ unsubscribed_at: new Date().toISOString() })
    .eq("token", token)
    .is("unsubscribed_at", null)
    .select("email")
    .single();

  if (error || !data) {
    return new NextResponse(unsubscribePage("Déjà désinscrit", "Vous n'êtes plus abonné(e) à notre newsletter."), {
      status: 200,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  return new NextResponse(unsubscribePage("Désinscription confirmée", `L'adresse ${data.email} a bien été retirée de notre liste. Vous ne recevrez plus nos emails.`), {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

function unsubscribePage(title: string, message: string) {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} — KEKELI Creative Agency</title>
  <style>
    body { font-family: Arial, sans-serif; background: #FAFAF8; margin: 0; display: flex; align-items: center; justify-content: center; min-height: 100vh; }
    .card { background: #fff; border: 1px solid #E7E5E4; border-radius: 16px; padding: 40px; max-width: 440px; text-align: center; }
    .logo { color: #C8A84B; font-size: 28px; font-weight: bold; margin-bottom: 20px; }
    h1 { color: #0C0B09; font-size: 22px; margin: 0 0 12px; }
    p { color: #78716C; font-size: 15px; line-height: 1.6; margin: 0 0 24px; }
    a { display: inline-block; background: #C8A84B; color: #0C0B09; padding: 10px 22px; border-radius: 50px; text-decoration: none; font-weight: 600; font-size: 14px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="logo">K</div>
    <h1>${title}</h1>
    <p>${message}</p>
    <a href="/">Retour au site →</a>
  </div>
</body>
</html>`;
}
