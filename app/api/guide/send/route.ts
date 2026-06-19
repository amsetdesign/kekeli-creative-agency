import { NextRequest, NextResponse } from "next/server";
import { resend, SITE_URL } from "@/lib/resend";
import { generateGuide, type GuideType } from "@/lib/pdf/generateGuide";
import { getSupabase } from "@/lib/supabase";

const VALID: GuideType[] = ["artiste", "entreprise"];

const BOOKS: Record<GuideType, { title: string; filename: string }> = {
  artiste:    { title: "Du Talent au Sommet",                    filename: "du-talent-au-sommet.pdf" },
  entreprise: { title: "Le Guide de l'Entrepreneur au Sénégal 2026", filename: "guide-entrepreneur-senegal-2026.pdf" },
};

export async function POST(req: NextRequest) {
  try {
    const { name, email, type } = await req.json();

    if (!name?.trim() || !email?.trim() || !VALID.includes(type)) {
      return NextResponse.json({ error: "Données invalides." }, { status: 400 });
    }

    const book = BOOKS[type as GuideType];
    const arrayBuffer = generateGuide(type as GuideType);
    const content = Buffer.from(arrayBuffer);

    // Send email with PDF attachment
    await resend.emails.send({
      from: "KEKELI Creative Agency <noreply@kekelicreativeagency.com>",
      to: email.trim(),
      subject: `Votre guide gratuit : ${book.title}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0C0B09;color:#fff;border-radius:16px;overflow:hidden;">
          <div style="padding:40px 32px;background:linear-gradient(135deg,#1a1208 0%,#0C0B09 100%);">
            <p style="color:#C8A84B;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;margin:0 0 8px;">KEKELI Creative Agency</p>
            <h1 style="font-size:26px;font-weight:800;margin:0 0 12px;line-height:1.2;">Bonjour ${name.trim()} 👋</h1>
            <p style="color:rgba(255,255,255,0.65);font-size:15px;line-height:1.6;margin:0 0 24px;">
              Votre guide <strong style="color:#C8A84B;">${book.title}</strong> est prêt.
              Vous le trouverez en pièce jointe de cet email.
            </p>
            <div style="background:rgba(200,168,75,0.10);border:1px solid rgba(200,168,75,0.25);border-radius:12px;padding:20px 24px;margin-bottom:28px;">
              <p style="color:#C8A84B;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;margin:0 0 8px;">Ce guide contient :</p>
              <ul style="color:rgba(255,255,255,0.70);font-size:13px;line-height:1.8;margin:0;padding-left:18px;">
                ${type === "artiste" ? `
                  <li>Construire une identité artistique forte</li>
                  <li>Maîtriser les réseaux sociaux et TikTok</li>
                  <li>Distribuer et monétiser votre musique</li>
                  <li>Gérer vos droits d'auteur (BSDA)</li>
                ` : `
                  <li>Créer une identité visuelle professionnelle</li>
                  <li>Développer votre présence digitale</li>
                  <li>Lancer des campagnes publicitaires efficaces</li>
                  <li>Structurer votre stratégie de communication</li>
                `}
              </ul>
            </div>
            <a href="${SITE_URL}/contact" style="display:inline-block;background:#C8A84B;color:#0C0B09;font-weight:700;font-size:14px;padding:14px 28px;border-radius:30px;text-decoration:none;">
              Discuter avec KEKELI →
            </a>
          </div>
          <div style="padding:20px 32px;border-top:1px solid rgba(255,255,255,0.08);">
            <p style="color:rgba(255,255,255,0.30);font-size:11px;margin:0;">
              KEKELI Creative Agency · Dakar, Sénégal · <a href="${SITE_URL}" style="color:#C8A84B;text-decoration:none;">kekelicreativeagency.com</a>
            </p>
          </div>
        </div>
      `,
      attachments: [{ filename: book.filename, content }],
    });

    // Save lead in Supabase
    try {
      const db = getSupabase();
      await db.from("leads").insert({
        type: "guide_download",
        status: "new",
        data: { name: name.trim(), email: email.trim(), guide: type, book_title: book.title },
      });
    } catch {
      // Non-blocking — email already sent
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[guide/send]", err);
    return NextResponse.json({ error: "Erreur serveur. Réessayez." }, { status: 500 });
  }
}
