import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const AGENCY_EMAIL = process.env.AGENCY_EMAIL ?? "kekelicreativeagency@gmail.com";

const SERVICE_LABELS: Record<string, string> = {
  "zero-pro":  "De zéro à professionnel",
  mentoring:   "Mentoring & Coaching artistique",
  carriere:    "Gestion de carrière",
  medias:      "Préparation aux médias",
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      nomArtiste, email, telephone, paysResidence, genre,
      services,
      niveauCarriere, objectifs, freins,
      descriptionSituation, realisationsActuelles,
      disponibilite, delaiSouhaite,
      message,
    } = body;

    if (!nomArtiste || !email || !services?.length) {
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
    }

    const db = getSupabase();

    const { error: dbError } = await db.from("leads").insert({
      type: "accompagnement",
      name: nomArtiste,
      email,
      phone: telephone,
      status: "nouveau",
      data: {
        paysResidence, genre, services,
        niveauCarriere, objectifs, freins,
        descriptionSituation, realisationsActuelles,
        disponibilite, delaiSouhaite, message,
      },
    });

    if (dbError) console.error("Supabase error:", dbError);

    const servicesStr = (Array.isArray(services) ? services : [])
      .map((s: string) => SERVICE_LABELS[s] ?? s).join(", ");
    const objectifsStr = Array.isArray(objectifs) ? objectifs.join(", ") : "—";
    const freinsStr = Array.isArray(freins) ? freins.join(", ") : "—";

    /* ── Email agence ── */
    await resend.emails.send({
      from: "KEKELI Accompagnement <onboarding@resend.dev>",
      to: AGENCY_EMAIL,
      subject: `🌱 Demande d'accompagnement — ${nomArtiste}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#0C0B09">
          <div style="background:linear-gradient(135deg,#130A28,#1C0A40);padding:32px;border-radius:16px 16px 0 0;text-align:center">
            <h1 style="color:#6EE7B7;font-size:24px;margin:0">Nouvelle demande d'accompagnement</h1>
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
              <tr><td style="padding:6px 0;color:#78716C">Niveau de carrière</td><td style="padding:6px 0">${niveauCarriere || "—"}</td></tr>
              <tr><td style="padding:6px 0;color:#78716C">Disponibilité</td><td style="padding:6px 0">${disponibilite || "—"}</td></tr>
              <tr><td style="padding:6px 0;color:#78716C">Délai souhaité</td><td style="padding:6px 0;font-weight:600">${delaiSouhaite || "—"}</td></tr>
            </table>

            <hr style="border:none;border-top:1px solid #E7E5E4;margin:20px 0"/>
            <h2 style="font-size:16px;margin:0 0 12px;color:#1C0A40">🌱 Services demandés</h2>
            <p style="font-size:13px;font-weight:600;color:#10B981;margin:0 0 16px">${servicesStr}</p>

            <table style="width:100%;font-size:13px;border-collapse:collapse">
              <tr><td style="padding:6px 0;color:#78716C;width:40%">Objectifs</td><td style="padding:6px 0">${objectifsStr}</td></tr>
              <tr><td style="padding:6px 0;color:#78716C">Freins identifiés</td><td style="padding:6px 0">${freinsStr}</td></tr>
            </table>

            ${descriptionSituation ? `<hr style="border:none;border-top:1px solid #E7E5E4;margin:20px 0"/><div style="background:#F5F2EB;padding:16px;border-radius:8px;font-size:12px;color:#44403C"><strong>Situation actuelle :</strong><br/>${descriptionSituation}</div>` : ""}
            ${realisationsActuelles ? `<div style="background:#F5F2EB;padding:12px;border-radius:8px;font-size:12px;color:#78716C;margin-top:12px"><strong>Réalisations actuelles :</strong><br/>${realisationsActuelles}</div>` : ""}
            ${message ? `<div style="background:#F5F2EB;padding:12px;border-radius:8px;font-size:12px;color:#78716C;margin-top:12px"><strong>Questions / précisions :</strong><br/>${message}</div>` : ""}
          </div>
        </div>
      `,
    });

    /* ── Email confirmation artiste ── */
    await resend.emails.send({
      from: "KEKELI Creative Agency <onboarding@resend.dev>",
      to: email,
      subject: `✅ Demande d'accompagnement reçue — KEKELI Creative Agency`,
      html: `
        <div style="font-family:sans-serif;max-width:500px;margin:0 auto;color:#0C0B09">
          <div style="background:linear-gradient(135deg,#130A28,#1C0A40);padding:32px;border-radius:16px;text-align:center;margin-bottom:24px">
            <h1 style="color:#6EE7B7;font-size:22px;margin:0">Demande reçue ✓</h1>
            <p style="color:rgba(220,210,255,0.70);margin:8px 0 0;font-size:14px">KEKELI Creative Agency · Accompagnement Artiste</p>
          </div>
          <p style="font-size:15px">Bonjour <strong>${nomArtiste}</strong>,</p>
          <p style="font-size:14px;color:#6B7280;line-height:1.6">
            Nous avons bien reçu votre demande pour <strong>${servicesStr}</strong>.
            Notre équipe vous contactera dans les <strong style="color:#10B981">24 heures</strong> pour un premier échange gratuit et sans engagement.
          </p>
          <p style="font-size:14px;color:#6B7280">En attendant, n'hésitez pas à nous écrire sur WhatsApp si vous avez des questions urgentes.</p>
          <p style="font-size:13px;color:#9CA3AF;margin-top:32px">— L'équipe KEKELI Creative Agency · Dakar, Sénégal</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Accompagnement API error:", err);
    return NextResponse.json({ error: "Erreur interne" }, { status: 500 });
  }
}
