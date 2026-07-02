import { NextRequest, NextResponse } from "next/server";
import { resend, SITE_URL } from "@/lib/resend";
import { getSupabase } from "@/lib/supabase";

type GuideType = "artiste" | "entreprise";

const VALID: GuideType[] = ["artiste", "entreprise"];

const BOOKS: Record<GuideType, { title: string; price: string }> = {
  artiste:    { title: "Du Talent au Sommet",                         price: "5 000 F CFA" },
  entreprise: { title: "Le Guide de l'Entrepreneur au Sénégal 2026",  price: "5 000 F CFA" },
};

const ADMIN_EMAIL = "contact@kekelicreativeagency.com";

export async function POST(req: NextRequest) {
  try {
    const { name, email, type } = await req.json();

    if (!name?.trim() || !email?.trim() || !VALID.includes(type)) {
      return NextResponse.json({ error: "Données invalides." }, { status: 400 });
    }

    const book = BOOKS[type as GuideType];

    // 1. Email to buyer — payment instructions
    await resend.emails.send({
      from: "KEKELI Creative Agency <noreply@kekelicreativeagency.com>",
      to: email.trim(),
      subject: `Votre commande : ${book.title} — Instructions de paiement`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0C0B09;color:#fff;border-radius:16px;overflow:hidden;">
          <div style="height:3px;background:linear-gradient(90deg,#C8A84B,transparent);"></div>
          <div style="padding:40px 32px;">
            <p style="color:#C8A84B;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;margin:0 0 8px;">KEKELI Creative Agency</p>
            <h1 style="font-size:24px;font-weight:800;margin:0 0 12px;line-height:1.2;">Bonjour ${name.trim()} 👋</h1>
            <p style="color:rgba(255,255,255,0.65);font-size:15px;line-height:1.6;margin:0 0 24px;">
              Merci pour votre commande de <strong style="color:#C8A84B;">${book.title}</strong>.
            </p>

            <!-- Price block -->
            <div style="background:rgba(200,168,75,0.10);border:1px solid rgba(200,168,75,0.25);border-radius:12px;padding:20px 24px;margin-bottom:24px;">
              <p style="color:#C8A84B;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;margin:0 0 6px;">Montant à payer</p>
              <p style="font-size:28px;font-weight:800;color:#fff;margin:0;">${book.price}</p>
            </div>

            <!-- Payment instructions -->
            <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:20px 24px;margin-bottom:28px;">
              <p style="color:#C8A84B;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;margin:0 0 12px;">Comment payer ?</p>
              <p style="color:rgba(255,255,255,0.65);font-size:14px;line-height:1.7;margin:0 0 12px;">
                Effectuez un virement de <strong style="color:#fff;">${book.price}</strong> via <strong style="color:#fff;">Wave</strong> ou <strong style="color:#fff;">Orange Money</strong> à notre compte KEKELI Creative Agency.
              </p>
              <p style="color:rgba(255,255,255,0.65);font-size:14px;line-height:1.7;margin:0;">
                Après paiement, envoyez votre <strong style="color:#fff;">preuve de paiement</strong> (capture d'écran) à :<br/>
                <a href="mailto:${ADMIN_EMAIL}" style="color:#C8A84B;text-decoration:none;font-weight:700;">${ADMIN_EMAIL}</a>
              </p>
            </div>

            <p style="color:rgba(255,255,255,0.50);font-size:13px;line-height:1.6;margin:0 0 24px;">
              Dès confirmation de votre paiement, nous vous enverrons le guide en PDF sous <strong style="color:#fff;">24h maximum</strong>.
            </p>

            <a href="mailto:${ADMIN_EMAIL}" style="display:inline-block;background:#C8A84B;color:#0C0B09;font-weight:700;font-size:14px;padding:14px 28px;border-radius:30px;text-decoration:none;">
              Envoyer ma preuve de paiement →
            </a>
          </div>
          <div style="padding:20px 32px;border-top:1px solid rgba(255,255,255,0.08);">
            <p style="color:rgba(255,255,255,0.30);font-size:11px;margin:0;">
              KEKELI Creative Agency · Dakar, Sénégal · <a href="${SITE_URL}" style="color:#C8A84B;text-decoration:none;">kekelicreativeagency.com</a>
            </p>
          </div>
        </div>
      `,
    });

    // 2. Notification to admin
    await resend.emails.send({
      from: "KEKELI Website <noreply@kekelicreativeagency.com>",
      to: ADMIN_EMAIL,
      subject: `🛒 Nouvelle commande guide — ${book.title}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:520px;margin:0 auto;">
          <h2 style="color:#C8A84B;">Nouvelle commande de guide</h2>
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            <tr><td style="padding:8px 0;color:#666;">Nom</td><td style="padding:8px 0;font-weight:600;">${name.trim()}</td></tr>
            <tr><td style="padding:8px 0;color:#666;">Email</td><td style="padding:8px 0;"><a href="mailto:${email.trim()}">${email.trim()}</a></td></tr>
            <tr><td style="padding:8px 0;color:#666;">Guide</td><td style="padding:8px 0;font-weight:600;">${book.title}</td></tr>
            <tr><td style="padding:8px 0;color:#666;">Prix</td><td style="padding:8px 0;font-weight:700;color:#C8A84B;">${book.price}</td></tr>
          </table>
          <p style="margin-top:16px;color:#555;font-size:13px;">Le client attend la preuve de paiement pour envoyer le PDF.</p>
        </div>
      `,
    });

    // 3. Save in Supabase
    try {
      const db = getSupabase();
      await db.from("leads").insert({
        type: "guide_purchase",
        status: "pending_payment",
        data: { name: name.trim(), email: email.trim(), guide: type, book_title: book.title, price: book.price },
      });
    } catch {
      // Non-blocking
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[guide/purchase]", err);
    return NextResponse.json({ error: "Erreur serveur. Réessayez." }, { status: 500 });
  }
}
