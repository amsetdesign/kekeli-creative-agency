import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const AGENCY_EMAIL = process.env.AGENCY_EMAIL ?? "kekelicreativeagency@gmail.com";

const SERVICE_LABELS: Record<string, string> = {
  audit:      "Audit & Stratégie réseaux sociaux",
  planning:   "Planning éditorial",
  croissance: "Croissance d'audience",
  lancement:  "Stratégie de lancement",
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      nomArtiste, email, telephone, paysResidence, genre,
      services,
      plateformesActives, abonnesInstagram, abonnesTiktok, abonnesYoutube,
      audienceCible,
      projetEnCours, dateLancement,
      problematique, objectifChiffre,
      delaiSouhaite, message,
    } = body;

    if (!nomArtiste || !email || !services?.length) {
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
    }

    const db = getSupabase();

    const { error: dbError } = await db.from("leads").insert({
      type: "strategie",
      name: nomArtiste,
      email,
      phone: telephone,
      status: "nouveau",
      data: {
        paysResidence, genre, services,
        plateformesActives, abonnesInstagram, abonnesTiktok, abonnesYoutube,
        audienceCible,
        projetEnCours, dateLancement,
        problematique, objectifChiffre,
        delaiSouhaite, message,
      },
    });

    if (dbError) console.error("Supabase error:", dbError);

    const servicesStr = (Array.isArray(services) ? services : [])
      .map((s: string) => SERVICE_LABELS[s] ?? s).join(", ");
    const plateformesStr = Array.isArray(plateformesActives) ? plateformesActives.join(", ") : "—";

    /* ── Email agence ── */
    await resend.emails.send({
      from: "KEKELI Stratégie <onboarding@resend.dev>",
      to: AGENCY_EMAIL,
      subject: `📊 Demande stratégie digitale — ${nomArtiste}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#0C0B09">
          <div style="background:linear-gradient(135deg,#130A28,#1C0A40);padding:32px;border-radius:16px 16px 0 0;text-align:center">
            <h1 style="color:#93C5FD;font-size:24px;margin:0">Nouvelle demande de Stratégie Digitale</h1>
            <p style="color:rgba(220,210,255,0.70);margin:8px 0 0;font-size:14px">${nomArtiste}</p>
          </div>
          <div style="background:#F9F7F3;padding:32px;border-radius:0 0 16px 16px">
            <h2 style="font-size:16px;margin:0 0 16px;color:#1C0A40">🎤 Artiste</h2>
            <table style="width:100%;font-size:13px;border-collapse:collapse">
              <tr><td style="padding:6px 0;color:#78716C;width:40%">Nom d'artiste</td><td style="padding:6px 0;font-weight:600">${nomArtiste}</td></tr>
              <tr><td style="padding:6px 0;color:#78716C">Email</td><td style="padding:6px 0"><a href="mailto:${email}">${email}</a></td></tr>
              <tr><td style="padding:6px 0;color:#78716C">Téléphone</td><td style="padding:6px 0">${telephone || "—"}</td></tr>
              <tr><td style="padding:6px 0;color:#78716C">Pays</td><td style="padding:6px 0">${paysResidence || "—"}</td></tr>
              <tr><td style="padding:6px 0;color:#78716C">Genre musical</td><td style="padding:6px 0">${genre || "—"}</td></tr>
            </table>

            <hr style="border:none;border-top:1px solid #E7E5E4;margin:20px 0"/>
            <h2 style="font-size:16px;margin:0 0 12px;color:#1C0A40">📊 Services demandés</h2>
            <p style="font-size:13px;font-weight:600;color:#4C9BFF;margin:0 0 16px">${servicesStr}</p>

            <h2 style="font-size:16px;margin:0 0 16px;color:#1C0A40">📱 Présence digitale actuelle</h2>
            <table style="width:100%;font-size:13px;border-collapse:collapse">
              <tr><td style="padding:6px 0;color:#78716C;width:40%">Plateformes actives</td><td style="padding:6px 0">${plateformesStr}</td></tr>
              <tr><td style="padding:6px 0;color:#78716C">Abonnés Instagram</td><td style="padding:6px 0">${abonnesInstagram || "—"}</td></tr>
              <tr><td style="padding:6px 0;color:#78716C">Abonnés TikTok</td><td style="padding:6px 0">${abonnesTiktok || "—"}</td></tr>
              <tr><td style="padding:6px 0;color:#78716C">Abonnés YouTube</td><td style="padding:6px 0">${abonnesYoutube || "—"}</td></tr>
              <tr><td style="padding:6px 0;color:#78716C">Audience cible</td><td style="padding:6px 0">${audienceCible || "—"}</td></tr>
              <tr><td style="padding:6px 0;color:#78716C">Projet en cours</td><td style="padding:6px 0">${projetEnCours || "—"}</td></tr>
              ${dateLancement ? `<tr><td style="padding:6px 0;color:#78716C">Date de lancement</td><td style="padding:6px 0">${dateLancement}</td></tr>` : ""}
              <tr><td style="padding:6px 0;color:#78716C">Objectif chiffré</td><td style="padding:6px 0;font-weight:600">${objectifChiffre || "—"}</td></tr>
              <tr><td style="padding:6px 0;color:#78716C">Délai souhaité</td><td style="padding:6px 0">${delaiSouhaite || "—"}</td></tr>
            </table>

            ${problematique ? `<hr style="border:none;border-top:1px solid #E7E5E4;margin:20px 0"/><div style="background:#F5F2EB;padding:16px;border-radius:8px;font-size:12px;color:#44403C"><strong>Problématique principale :</strong><br/>${problematique}</div>` : ""}
            ${message ? `<div style="background:#F5F2EB;padding:12px;border-radius:8px;font-size:12px;color:#78716C;margin-top:12px"><strong>Informations complémentaires :</strong><br/>${message}</div>` : ""}
          </div>
        </div>
      `,
    });

    /* ── Email confirmation artiste ── */
    await resend.emails.send({
      from: "KEKELI Creative Agency <onboarding@resend.dev>",
      to: email,
      subject: `✅ Demande de stratégie digitale reçue — KEKELI Creative Agency`,
      html: `
        <div style="font-family:sans-serif;max-width:500px;margin:0 auto;color:#0C0B09">
          <div style="background:linear-gradient(135deg,#130A28,#1C0A40);padding:32px;border-radius:16px;text-align:center;margin-bottom:24px">
            <h1 style="color:#93C5FD;font-size:22px;margin:0">Demande reçue ✓</h1>
            <p style="color:rgba(220,210,255,0.70);margin:8px 0 0;font-size:14px">KEKELI Creative Agency · Stratégie Digitale</p>
          </div>
          <p style="font-size:15px">Bonjour <strong>${nomArtiste}</strong>,</p>
          <p style="font-size:14px;color:#6B7280;line-height:1.6">
            Nous avons bien reçu votre demande pour <strong>${servicesStr}</strong>.
            Notre équipe vous contactera dans les <strong style="color:#4C9BFF">24 heures</strong> avec un audit de votre présence digitale et un plan d'action personnalisé.
          </p>
          <p style="font-size:14px;color:#6B7280">En attendant, n'hésitez pas à nous écrire sur WhatsApp si vous avez des questions urgentes.</p>
          <p style="font-size:13px;color:#9CA3AF;margin-top:32px">— L'équipe KEKELI Creative Agency · Dakar, Sénégal</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Stratégie API error:", err);
    return NextResponse.json({ error: "Erreur interne" }, { status: 500 });
  }
}
