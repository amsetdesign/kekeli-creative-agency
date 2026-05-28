import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const AGENCY_EMAIL = process.env.AGENCY_EMAIL ?? "kekelicreativeagency@gmail.com";

const PACK_LABELS: Record<string, string> = {
  logo:      "Logo & Identité Visuelle",
  templates: "Templates Réseaux Sociaux",
  epk:       "Press Kit Artiste (EPK)",
  complet:   "Direction Artistique Globale",
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      nomArtiste, email, telephone, paysResidence,
      packs,
      aLogo, aCharte,
      styleVisuel, referencesArtistes, couleursPref,
      plateformesUtilisees, delaiSouhaite,
      message,
    } = body;

    if (!nomArtiste || !email || !packs?.length) {
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
    }

    const db = getSupabase();

    const { error: dbError } = await db.from("leads").insert({
      type: "branding",
      name: nomArtiste,
      email,
      phone: telephone,
      status: "nouveau",
      data: {
        paysResidence, packs,
        aLogo, aCharte,
        styleVisuel, referencesArtistes, couleursPref,
        plateformesUtilisees, delaiSouhaite,
        message,
      },
    });

    if (dbError) console.error("Supabase error:", dbError);

    const packsStr = (Array.isArray(packs) ? packs : [])
      .map((p: string) => PACK_LABELS[p] ?? p)
      .join(", ");
    const plateformesStr = Array.isArray(plateformesUtilisees) ? plateformesUtilisees.join(", ") : "—";

    /* ── Email agence ── */
    await resend.emails.send({
      from: "KEKELI Branding <onboarding@resend.dev>",
      to: AGENCY_EMAIL,
      subject: `🎨 Demande de branding — ${nomArtiste}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#0C0B09">
          <div style="background:linear-gradient(135deg,#130A28,#1C0A40);padding:32px;border-radius:16px 16px 0 0;text-align:center">
            <h1 style="color:#A78BFA;font-size:24px;margin:0">Nouvelle demande de Branding</h1>
            <p style="color:rgba(220,210,255,0.70);margin:8px 0 0;font-size:14px">${packsStr} · ${nomArtiste}</p>
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
            <h2 style="font-size:16px;margin:0 0 16px;color:#1C0A40">🎨 Services demandés</h2>
            <p style="font-size:13px;font-weight:600;color:#8B5CF6;margin:0 0 16px">${packsStr}</p>

            <hr style="border:none;border-top:1px solid #E7E5E4;margin:20px 0"/>
            <h2 style="font-size:16px;margin:0 0 16px;color:#1C0A40">📊 Situation actuelle</h2>
            <table style="width:100%;font-size:13px;border-collapse:collapse">
              <tr><td style="padding:6px 0;color:#78716C;width:40%">Logo existant</td><td style="padding:6px 0">${aLogo || "—"}</td></tr>
              <tr><td style="padding:6px 0;color:#78716C">Charte graphique</td><td style="padding:6px 0">${aCharte || "—"}</td></tr>
              <tr><td style="padding:6px 0;color:#78716C">Style visuel souhaité</td><td style="padding:6px 0">${styleVisuel || "—"}</td></tr>
              <tr><td style="padding:6px 0;color:#78716C">Couleurs préférées</td><td style="padding:6px 0">${couleursPref || "—"}</td></tr>
              <tr><td style="padding:6px 0;color:#78716C">Plateformes</td><td style="padding:6px 0">${plateformesStr}</td></tr>
              <tr><td style="padding:6px 0;color:#78716C">Délai souhaité</td><td style="padding:6px 0;font-weight:600">${delaiSouhaite || "—"}</td></tr>
            </table>

            ${referencesArtistes ? `<hr style="border:none;border-top:1px solid #E7E5E4;margin:20px 0"/><div style="background:#F5F2EB;padding:16px;border-radius:8px;font-size:12px;color:#44403C"><strong>Références artistes / marques :</strong><br/>${referencesArtistes}</div>` : ""}
            ${message ? `<div style="background:#F5F2EB;padding:16px;border-radius:8px;font-size:12px;color:#78716C;margin-top:12px"><strong>Informations complémentaires :</strong><br/>${message}</div>` : ""}
          </div>
        </div>
      `,
    });

    /* ── Email confirmation artiste ── */
    await resend.emails.send({
      from: "KEKELI Creative Agency <onboarding@resend.dev>",
      to: email,
      subject: `✅ Brief branding reçu — KEKELI Creative Agency`,
      html: `
        <div style="font-family:sans-serif;max-width:500px;margin:0 auto;color:#0C0B09">
          <div style="background:linear-gradient(135deg,#130A28,#1C0A40);padding:32px;border-radius:16px;text-align:center;margin-bottom:24px">
            <h1 style="color:#A78BFA;font-size:22px;margin:0">Brief reçu ✓</h1>
            <p style="color:rgba(220,210,255,0.70);margin:8px 0 0;font-size:14px">KEKELI Creative Agency · Branding & Identité Visuelle</p>
          </div>
          <p style="font-size:15px">Bonjour <strong>${nomArtiste}</strong>,</p>
          <p style="font-size:14px;color:#6B7280;line-height:1.6">
            Nous avons bien reçu votre brief créatif pour <strong>${packsStr}</strong>.
            Notre équipe créative vous contactera dans les <strong style="color:#8B5CF6">24 heures</strong> avec des premières idées et un devis personnalisé.
          </p>
          <p style="font-size:14px;color:#6B7280">En attendant, n'hésitez pas à nous écrire sur WhatsApp si vous avez des questions urgentes.</p>
          <p style="font-size:13px;color:#9CA3AF;margin-top:32px">— L'équipe KEKELI Creative Agency · Dakar, Sénégal</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Branding API error:", err);
    return NextResponse.json({ error: "Erreur interne" }, { status: 500 });
  }
}
