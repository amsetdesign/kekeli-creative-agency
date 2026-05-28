import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const AGENCY_EMAIL = process.env.AGENCY_EMAIL ?? "kekelicreativeagency@gmail.com";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      nomArtiste, email, telephone,
      productionType, titreSon, genre,
      concept, references, ambianceColorimetrie,
      lieu, dateTournage, dateSortie, joursTournage,
      acteursFigurants, drone, costumes,
      diffusion, budget,
      message,
    } = body;

    if (!nomArtiste || !email || !productionType) {
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
    }

    const db = getSupabase();

    /* ── Sauvegarde Supabase ── */
    const { error: dbError } = await db.from("leads").insert({
      type: "clips",
      name: nomArtiste,
      email,
      phone: telephone,
      status: "nouveau",
      data: {
        productionType, titreSon, genre,
        concept, references, ambianceColorimetrie,
        lieu, dateTournage, dateSortie, joursTournage,
        acteursFigurants, drone, costumes,
        diffusion, budget,
        message,
      },
    });

    if (dbError) console.error("Supabase error:", dbError);

    const prodLabels: Record<string, string> = {
      clip: "Clip Officiel",
      lyric: "Lyric Video / Visualizer",
      teaser: "Teaser / Trailer",
      multi: "Pack Multi-vidéos",
    };
    const prodLabel = prodLabels[productionType] ?? productionType;
    const diffusionStr = Array.isArray(diffusion) ? diffusion.join(", ") : diffusion || "—";

    /* ── Email agence ── */
    await resend.emails.send({
      from: "KEKELI Clips <onboarding@resend.dev>",
      to: AGENCY_EMAIL,
      subject: `🎬 Demande de clip — ${prodLabel} · ${nomArtiste}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#0C0B09">
          <div style="background:linear-gradient(135deg,#130A28,#1C0A40);padding:32px;border-radius:16px 16px 0 0;text-align:center">
            <h1 style="color:#EC4899;font-size:24px;margin:0">Nouvelle demande de production vidéo</h1>
            <p style="color:rgba(220,210,255,0.70);margin:8px 0 0;font-size:14px">${prodLabel} · ${nomArtiste}</p>
          </div>
          <div style="background:#F9F7F3;padding:32px;border-radius:0 0 16px 16px">
            <h2 style="font-size:16px;margin:0 0 16px;color:#1C0A40">🎤 Artiste</h2>
            <table style="width:100%;font-size:13px;border-collapse:collapse">
              <tr><td style="padding:6px 0;color:#78716C;width:40%">Nom d'artiste</td><td style="padding:6px 0;font-weight:600">${nomArtiste}</td></tr>
              <tr><td style="padding:6px 0;color:#78716C">Email</td><td style="padding:6px 0"><a href="mailto:${email}">${email}</a></td></tr>
              <tr><td style="padding:6px 0;color:#78716C">Téléphone</td><td style="padding:6px 0">${telephone || "—"}</td></tr>
              <tr><td style="padding:6px 0;color:#78716C">Genre musical</td><td style="padding:6px 0">${genre || "—"}</td></tr>
            </table>

            <hr style="border:none;border-top:1px solid #E7E5E4;margin:20px 0"/>
            <h2 style="font-size:16px;margin:0 0 16px;color:#1C0A40">🎬 Projet</h2>
            <table style="width:100%;font-size:13px;border-collapse:collapse">
              <tr><td style="padding:6px 0;color:#78716C;width:40%">Type de production</td><td style="padding:6px 0;font-weight:600;color:#EC4899">${prodLabel}</td></tr>
              <tr><td style="padding:6px 0;color:#78716C">Titre du son</td><td style="padding:6px 0">${titreSon || "—"}</td></tr>
            </table>

            <hr style="border:none;border-top:1px solid #E7E5E4;margin:20px 0"/>
            <h2 style="font-size:16px;margin:0 0 8px;color:#1C0A40">🎨 Concept & Direction artistique</h2>
            ${concept ? `<div style="background:#F5F2EB;padding:16px;border-radius:8px;font-size:12px;color:#44403C;margin-bottom:12px"><strong>Concept / Synopsis :</strong><br/>${concept}</div>` : ""}
            ${references ? `<div style="background:#F5F2EB;padding:12px;border-radius:8px;font-size:12px;color:#78716C;margin-bottom:12px"><strong>Références :</strong> ${references}</div>` : ""}
            ${ambianceColorimetrie ? `<div style="background:#F5F2EB;padding:12px;border-radius:8px;font-size:12px;color:#78716C;margin-bottom:12px"><strong>Ambiance / Colorimétrie :</strong> ${ambianceColorimetrie}</div>` : ""}

            <hr style="border:none;border-top:1px solid #E7E5E4;margin:20px 0"/>
            <h2 style="font-size:16px;margin:0 0 16px;color:#1C0A40">🎥 Tournage</h2>
            <table style="width:100%;font-size:13px;border-collapse:collapse">
              <tr><td style="padding:6px 0;color:#78716C;width:40%">Lieu</td><td style="padding:6px 0">${lieu || "—"}</td></tr>
              <tr><td style="padding:6px 0;color:#78716C">Nb jours tournage</td><td style="padding:6px 0">${joursTournage || "—"}</td></tr>
              <tr><td style="padding:6px 0;color:#78716C">Date tournage souhaitée</td><td style="padding:6px 0">${dateTournage || "—"}</td></tr>
              <tr><td style="padding:6px 0;color:#78716C">Date de sortie prévue</td><td style="padding:6px 0">${dateSortie || "—"}</td></tr>
            </table>

            <hr style="border:none;border-top:1px solid #E7E5E4;margin:20px 0"/>
            <h2 style="font-size:16px;margin:0 0 16px;color:#1C0A40">⚙️ Besoins techniques</h2>
            <table style="width:100%;font-size:13px;border-collapse:collapse">
              <tr><td style="padding:6px 0;color:#78716C;width:40%">Acteurs / Figurants</td><td style="padding:6px 0">${acteursFigurants || "—"}</td></tr>
              <tr><td style="padding:6px 0;color:#78716C">Drone / Aérien</td><td style="padding:6px 0">${drone || "—"}</td></tr>
              <tr><td style="padding:6px 0;color:#78716C">Costumes / Stylisme</td><td style="padding:6px 0">${costumes || "—"}</td></tr>
            </table>

            <hr style="border:none;border-top:1px solid #E7E5E4;margin:20px 0"/>
            <h2 style="font-size:16px;margin:0 0 16px;color:#1C0A40">📱 Diffusion & Budget</h2>
            <table style="width:100%;font-size:13px;border-collapse:collapse">
              <tr><td style="padding:6px 0;color:#78716C;width:40%">Plateformes de diffusion</td><td style="padding:6px 0">${diffusionStr}</td></tr>
              <tr><td style="padding:6px 0;color:#78716C">Budget approximatif</td><td style="padding:6px 0;font-weight:600">${budget || "À définir"}</td></tr>
            </table>

            ${message ? `<hr style="border:none;border-top:1px solid #E7E5E4;margin:20px 0"/><div style="background:#F5F2EB;padding:16px;border-radius:8px;font-size:12px;color:#78716C"><strong>Informations complémentaires :</strong><br/>${message}</div>` : ""}
          </div>
        </div>
      `,
    });

    /* ── Email confirmation artiste ── */
    await resend.emails.send({
      from: "KEKELI Creative Agency <onboarding@resend.dev>",
      to: email,
      subject: `✅ Brief vidéo reçu — ${titreSon || prodLabel}`,
      html: `
        <div style="font-family:sans-serif;max-width:500px;margin:0 auto;color:#0C0B09">
          <div style="background:linear-gradient(135deg,#130A28,#1C0A40);padding:32px;border-radius:16px;text-align:center;margin-bottom:24px">
            <h1 style="color:#EC4899;font-size:22px;margin:0">Brief reçu ✓</h1>
            <p style="color:rgba(220,210,255,0.70);margin:8px 0 0;font-size:14px">KEKELI Creative Agency · Production Vidéo</p>
          </div>
          <p style="font-size:15px">Bonjour <strong>${nomArtiste}</strong>,</p>
          <p style="font-size:14px;color:#6B7280;line-height:1.6">
            Nous avons bien reçu votre brief pour <strong>${titreSon ? `"${titreSon}"` : prodLabel}</strong>.
            Notre équipe créative vous contactera dans les <strong style="color:#EC4899">24 heures</strong> avec un devis personnalisé.
          </p>
          <p style="font-size:14px;color:#6B7280">En attendant, n'hésitez pas à nous écrire sur WhatsApp si vous avez des questions urgentes.</p>
          <p style="font-size:13px;color:#9CA3AF;margin-top:32px">— L'équipe KEKELI Creative Agency · Dakar, Sénégal</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Clips API error:", err);
    return NextResponse.json({ error: "Erreur interne" }, { status: 500 });
  }
}
