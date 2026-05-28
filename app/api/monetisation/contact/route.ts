import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const AGENCY_EMAIL = process.env.AGENCY_EMAIL ?? "kekelicreativeagency@gmail.com";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      nomArtiste, email, telephone, paysResidence,
      serviceType,
      chaineYoutube, abonnesYoutube, dejaMonetise,
      dejaSodav, dejaAffilie, societeActuelle,
      nbTitres, objectif, message,
    } = body;

    if (!nomArtiste || !email || !serviceType) {
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
    }

    const db = getSupabase();

    const { error: dbError } = await db.from("leads").insert({
      type: "monetisation",
      name: nomArtiste,
      email,
      phone: telephone,
      status: "nouveau",
      data: {
        paysResidence, serviceType,
        chaineYoutube, abonnesYoutube, dejaMonetise,
        dejaSodav, dejaAffilie, societeActuelle,
        nbTitres, objectif, message,
      },
    });

    if (dbError) console.error("Supabase error:", dbError);

    const serviceLabels: Record<string, string> = {
      youtube:   "Monétisation YouTube & Plateformes",
      droits:    "Droits d'auteur — SODAV / SACEM",
      "les-deux": "Pack complet — YouTube + Droits",
    };
    const serviceLabel = serviceLabels[serviceType] ?? serviceType;

    const showYoutube = serviceType === "youtube" || serviceType === "les-deux";
    const showDroits  = serviceType === "droits"  || serviceType === "les-deux";

    /* ── Email agence ── */
    await resend.emails.send({
      from: "KEKELI Monétisation <onboarding@resend.dev>",
      to: AGENCY_EMAIL,
      subject: `💰 Demande de monétisation — ${serviceLabel} · ${nomArtiste}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#0C0B09">
          <div style="background:linear-gradient(135deg,#130A28,#1C0A40);padding:32px;border-radius:16px 16px 0 0;text-align:center">
            <h1 style="color:#4ADE80;font-size:24px;margin:0">Nouvelle demande de monétisation</h1>
            <p style="color:rgba(220,210,255,0.70);margin:8px 0 0;font-size:14px">${serviceLabel} · ${nomArtiste}</p>
          </div>
          <div style="background:#F9F7F3;padding:32px;border-radius:0 0 16px 16px">
            <h2 style="font-size:16px;margin:0 0 16px;color:#1C0A40">🎤 Artiste</h2>
            <table style="width:100%;font-size:13px;border-collapse:collapse">
              <tr><td style="padding:6px 0;color:#78716C;width:40%">Nom d'artiste</td><td style="padding:6px 0;font-weight:600">${nomArtiste}</td></tr>
              <tr><td style="padding:6px 0;color:#78716C">Email</td><td style="padding:6px 0"><a href="mailto:${email}">${email}</a></td></tr>
              <tr><td style="padding:6px 0;color:#78716C">Téléphone</td><td style="padding:6px 0">${telephone || "—"}</td></tr>
              <tr><td style="padding:6px 0;color:#78716C">Pays</td><td style="padding:6px 0">${paysResidence || "—"}</td></tr>
              <tr><td style="padding:6px 0;color:#78716C">Nb titres catalogue</td><td style="padding:6px 0">${nbTitres || "—"}</td></tr>
            </table>

            <hr style="border:none;border-top:1px solid #E7E5E4;margin:20px 0"/>
            <h2 style="font-size:16px;margin:0 0 16px;color:#1C0A40">💰 Service demandé</h2>
            <p style="font-size:14px;font-weight:700;color:#16A34A;margin:0 0 16px">${serviceLabel}</p>

            ${showYoutube ? `
            <h2 style="font-size:15px;margin:16px 0 12px;color:#1C0A40">▶️ YouTube & Plateformes</h2>
            <table style="width:100%;font-size:13px;border-collapse:collapse">
              ${chaineYoutube ? `<tr><td style="padding:6px 0;color:#78716C;width:40%">Chaîne YouTube</td><td style="padding:6px 0"><a href="${chaineYoutube}">${chaineYoutube}</a></td></tr>` : ""}
              <tr><td style="padding:6px 0;color:#78716C">Abonnés</td><td style="padding:6px 0">${abonnesYoutube || "—"}</td></tr>
              <tr><td style="padding:6px 0;color:#78716C">Déjà monétisé</td><td style="padding:6px 0">${dejaMonetise || "—"}</td></tr>
            </table>
            ` : ""}

            ${showDroits ? `
            <h2 style="font-size:15px;margin:16px 0 12px;color:#1C0A40">⚖️ Droits d'auteur</h2>
            <table style="width:100%;font-size:13px;border-collapse:collapse">
              <tr><td style="padding:6px 0;color:#78716C;width:40%">Inscrit SODAV</td><td style="padding:6px 0">${dejaSodav || "—"}</td></tr>
              <tr><td style="padding:6px 0;color:#78716C">Affilié autre société</td><td style="padding:6px 0">${dejaAffilie || "—"}${societeActuelle ? ` — ${societeActuelle}` : ""}</td></tr>
            </table>
            ` : ""}

            ${objectif ? `<hr style="border:none;border-top:1px solid #E7E5E4;margin:20px 0"/><div style="background:#F5F2EB;padding:16px;border-radius:8px;font-size:12px;color:#44403C"><strong>Objectif :</strong><br/>${objectif}</div>` : ""}
            ${message ? `<div style="background:#F5F2EB;padding:16px;border-radius:8px;font-size:12px;color:#78716C;margin-top:12px"><strong>Informations complémentaires :</strong><br/>${message}</div>` : ""}
          </div>
        </div>
      `,
    });

    /* ── Email confirmation artiste ── */
    await resend.emails.send({
      from: "KEKELI Creative Agency <onboarding@resend.dev>",
      to: email,
      subject: `✅ Demande de monétisation reçue — KEKELI Creative Agency`,
      html: `
        <div style="font-family:sans-serif;max-width:500px;margin:0 auto;color:#0C0B09">
          <div style="background:linear-gradient(135deg,#130A28,#1C0A40);padding:32px;border-radius:16px;text-align:center;margin-bottom:24px">
            <h1 style="color:#4ADE80;font-size:22px;margin:0">Demande reçue ✓</h1>
            <p style="color:rgba(220,210,255,0.70);margin:8px 0 0;font-size:14px">KEKELI Creative Agency · Monétisation Musicale</p>
          </div>
          <p style="font-size:15px">Bonjour <strong>${nomArtiste}</strong>,</p>
          <p style="font-size:14px;color:#6B7280;line-height:1.6">
            Nous avons bien reçu votre demande pour <strong>${serviceLabel}</strong>.
            Notre équipe vous contactera dans les <strong style="color:#16A34A">24 heures</strong> avec un audit de votre situation et un devis personnalisé.
          </p>
          <p style="font-size:14px;color:#6B7280">En attendant, n'hésitez pas à nous écrire sur WhatsApp si vous avez des questions urgentes.</p>
          <p style="font-size:13px;color:#9CA3AF;margin-top:32px">— L'équipe KEKELI Creative Agency · Dakar, Sénégal</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Monétisation API error:", err);
    return NextResponse.json({ error: "Erreur interne" }, { status: 500 });
  }
}
