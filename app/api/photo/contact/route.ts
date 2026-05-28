import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const AGENCY_EMAIL = process.env.AGENCY_EMAIL ?? "kekelicreativeagency@gmail.com";

const SHOOT_LABELS: Record<string, string> = {
  portrait:   "Portrait Artiste",
  thematique: "Shooting Thématique",
  studio:     "Shooting en Studio",
  exterieur:  "Shooting en Extérieur",
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      nomArtiste, email, telephone, paysResidence,
      shootTypes,
      ambianceSouhaitee, referencesVisuelles, conceptDescription,
      datePreferee, delaiSouhaite, nombrePersonnes, costumesPrevus,
      utilisations,
      message,
    } = body;

    if (!nomArtiste || !email || !shootTypes?.length) {
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
    }

    const db = getSupabase();

    const { error: dbError } = await db.from("leads").insert({
      type: "photo",
      name: nomArtiste,
      email,
      phone: telephone,
      status: "nouveau",
      data: {
        paysResidence, shootTypes,
        ambianceSouhaitee, referencesVisuelles, conceptDescription,
        datePreferee, delaiSouhaite, nombrePersonnes, costumesPrevus,
        utilisations, message,
      },
    });

    if (dbError) console.error("Supabase error:", dbError);

    const shootStr = (Array.isArray(shootTypes) ? shootTypes : [])
      .map((t: string) => SHOOT_LABELS[t] ?? t)
      .join(", ");
    const utilisationsStr = Array.isArray(utilisations) ? utilisations.join(", ") : "—";

    /* ── Email agence ── */
    await resend.emails.send({
      from: "KEKELI Photo <onboarding@resend.dev>",
      to: AGENCY_EMAIL,
      subject: `📸 Demande de shooting — ${nomArtiste}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#0C0B09">
          <div style="background:linear-gradient(135deg,#130A28,#1C0A40);padding:32px;border-radius:16px 16px 0 0;text-align:center">
            <h1 style="color:#22D3EE;font-size:24px;margin:0">Nouvelle demande de Photo Shooting</h1>
            <p style="color:rgba(220,210,255,0.70);margin:8px 0 0;font-size:14px">${shootStr} · ${nomArtiste}</p>
          </div>
          <div style="background:#F9F7F3;padding:32px;border-radius:0 0 16px 16px">
            <h2 style="font-size:16px;margin:0 0 16px;color:#1C0A40">🎤 Artiste</h2>
            <table style="width:100%;font-size:13px;border-collapse:collapse">
              <tr><td style="padding:6px 0;color:#78716C;width:40%">Nom d'artiste</td><td style="padding:6px 0;font-weight:600">${nomArtiste}</td></tr>
              <tr><td style="padding:6px 0;color:#78716C">Email</td><td style="padding:6px 0"><a href="mailto:${email}">${email}</a></td></tr>
              <tr><td style="padding:6px 0;color:#78716C">Téléphone</td><td style="padding:6px 0">${telephone || "—"}</td></tr>
              <tr><td style="padding:6px 0;color:#78716C">Pays</td><td style="padding:6px 0">${paysResidence || "—"}</td></tr>
            </table>

            <hr style="border:none;border-top:1px solid #E7E5E4;margin:20px 0"/>
            <h2 style="font-size:16px;margin:0 0 16px;color:#1C0A40">📸 Shooting</h2>
            <table style="width:100%;font-size:13px;border-collapse:collapse">
              <tr><td style="padding:6px 0;color:#78716C;width:40%">Types de shooting</td><td style="padding:6px 0;font-weight:600;color:#06B6D4">${shootStr}</td></tr>
              <tr><td style="padding:6px 0;color:#78716C">Ambiance souhaitée</td><td style="padding:6px 0">${ambianceSouhaitee || "—"}</td></tr>
              <tr><td style="padding:6px 0;color:#78716C">Date préférée</td><td style="padding:6px 0">${datePreferee || "—"}</td></tr>
              <tr><td style="padding:6px 0;color:#78716C">Délai livraison</td><td style="padding:6px 0">${delaiSouhaite || "—"}</td></tr>
              <tr><td style="padding:6px 0;color:#78716C">Nombre de personnes</td><td style="padding:6px 0">${nombrePersonnes || "—"}</td></tr>
              <tr><td style="padding:6px 0;color:#78716C">Costumes / Stylisme</td><td style="padding:6px 0">${costumesPrevus || "—"}</td></tr>
              <tr><td style="padding:6px 0;color:#78716C">Utilisation prévue</td><td style="padding:6px 0">${utilisationsStr}</td></tr>
            </table>

            ${conceptDescription ? `<hr style="border:none;border-top:1px solid #E7E5E4;margin:20px 0"/><div style="background:#F5F2EB;padding:16px;border-radius:8px;font-size:12px;color:#44403C"><strong>Concept / Description :</strong><br/>${conceptDescription}</div>` : ""}
            ${referencesVisuelles ? `<div style="background:#F5F2EB;padding:12px;border-radius:8px;font-size:12px;color:#78716C;margin-top:12px"><strong>Références visuelles :</strong> ${referencesVisuelles}</div>` : ""}
            ${message ? `<div style="background:#F5F2EB;padding:12px;border-radius:8px;font-size:12px;color:#78716C;margin-top:12px"><strong>Informations complémentaires :</strong><br/>${message}</div>` : ""}
          </div>
        </div>
      `,
    });

    /* ── Email confirmation artiste ── */
    await resend.emails.send({
      from: "KEKELI Creative Agency <onboarding@resend.dev>",
      to: email,
      subject: `✅ Brief shooting reçu — KEKELI Creative Agency`,
      html: `
        <div style="font-family:sans-serif;max-width:500px;margin:0 auto;color:#0C0B09">
          <div style="background:linear-gradient(135deg,#130A28,#1C0A40);padding:32px;border-radius:16px;text-align:center;margin-bottom:24px">
            <h1 style="color:#22D3EE;font-size:22px;margin:0">Brief reçu ✓</h1>
            <p style="color:rgba(220,210,255,0.70);margin:8px 0 0;font-size:14px">KEKELI Creative Agency · Photo Shooting</p>
          </div>
          <p style="font-size:15px">Bonjour <strong>${nomArtiste}</strong>,</p>
          <p style="font-size:14px;color:#6B7280;line-height:1.6">
            Nous avons bien reçu votre brief pour <strong>${shootStr}</strong>.
            Notre photographe vous contactera dans les <strong style="color:#06B6D4">24 heures</strong> avec un devis personnalisé et des suggestions de lieux.
          </p>
          <p style="font-size:14px;color:#6B7280">En attendant, n'hésitez pas à nous écrire sur WhatsApp si vous avez des questions urgentes.</p>
          <p style="font-size:13px;color:#9CA3AF;margin-top:32px">— L'équipe KEKELI Creative Agency · Dakar, Sénégal</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Photo API error:", err);
    return NextResponse.json({ error: "Erreur interne" }, { status: 500 });
  }
}
