import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const AGENCY_EMAIL = process.env.AGENCY_EMAIL ?? "kekelicreativeagency@gmail.com";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      nomArtiste, nomLegal, email, telephone, pays,
      releaseType, titreProjet, genre, sousGenre, langue, nombreTitres, dateSortie, featuring,
      compositeurs, editeur, label, isrcExistant, upcExistant, proMembership,
      coverPret, photosPret, styleVisuel,
      mastersPrets, masteringInclus,
      toutesPlateformes, plateformesChoisies,
      contientSamples, clearancesSamples,
      bioArtiste, instagram, tiktok, youtube, spotifyExistant, planPromotion,
      formule, message,
    } = body;

    if (!nomArtiste || !email || !releaseType) {
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
    }

    const db = getSupabase();

    /* ── Sauvegarde Supabase ── */
    const { error: dbError } = await db.from("leads").insert({
      type: "distribution",
      name: nomArtiste,
      email,
      phone: telephone,
      status: "nouveau",
      data: {
        nomLegal, pays,
        releaseType, titreProjet, genre, sousGenre, langue,
        nombreTitres, dateSortie, featuring,
        compositeurs, editeur, label, isrcExistant, upcExistant, proMembership,
        coverPret, photosPret, styleVisuel,
        mastersPrets, masteringInclus,
        toutesPlateformes, plateformesChoisies,
        contientSamples, clearancesSamples,
        bioArtiste, instagram, tiktok, youtube, spotifyExistant, planPromotion,
        formule, message,
      },
    });

    if (dbError) console.error("Supabase error:", dbError);

    const plateformes = toutesPlateformes ? "Toutes les plateformes (40+)" : (plateformesChoisies ?? []).join(", ");

    /* ── Email agence ── */
    await resend.emails.send({
      from: "KEKELI Distribution <onboarding@resend.dev>",
      to: AGENCY_EMAIL,
      subject: `🎵 Demande de distribution — ${releaseType?.toUpperCase()} · ${nomArtiste}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#0C0B09">
          <div style="background:linear-gradient(135deg,#130A28,#1C0A40);padding:32px;border-radius:16px 16px 0 0;text-align:center">
            <h1 style="color:#C8A84B;font-size:24px;margin:0">Nouvelle demande de distribution</h1>
            <p style="color:rgba(220,210,255,0.70);margin:8px 0 0;font-size:14px">${releaseType?.toUpperCase()} · ${nomArtiste}</p>
          </div>
          <div style="background:#F9F7F3;padding:32px;border-radius:0 0 16px 16px">
            <h2 style="font-size:16px;margin:0 0 16px;color:#1C0A40">🎤 Artiste</h2>
            <table style="width:100%;font-size:13px;border-collapse:collapse">
              <tr><td style="padding:6px 0;color:#78716C;width:40%">Nom d'artiste</td><td style="padding:6px 0;font-weight:600">${nomArtiste}</td></tr>
              <tr><td style="padding:6px 0;color:#78716C">Nom légal</td><td style="padding:6px 0">${nomLegal}</td></tr>
              <tr><td style="padding:6px 0;color:#78716C">Email</td><td style="padding:6px 0"><a href="mailto:${email}">${email}</a></td></tr>
              <tr><td style="padding:6px 0;color:#78716C">Téléphone</td><td style="padding:6px 0">${telephone}</td></tr>
              <tr><td style="padding:6px 0;color:#78716C">Pays</td><td style="padding:6px 0">${pays}</td></tr>
            </table>

            <hr style="border:none;border-top:1px solid #E7E5E4;margin:20px 0"/>
            <h2 style="font-size:16px;margin:0 0 16px;color:#1C0A40">🎵 Projet</h2>
            <table style="width:100%;font-size:13px;border-collapse:collapse">
              <tr><td style="padding:6px 0;color:#78716C;width:40%">Type</td><td style="padding:6px 0;font-weight:600;color:#C8A84B">${releaseType?.toUpperCase()}</td></tr>
              <tr><td style="padding:6px 0;color:#78716C">Titre</td><td style="padding:6px 0">${titreProjet}</td></tr>
              <tr><td style="padding:6px 0;color:#78716C">Genre</td><td style="padding:6px 0">${genre}${sousGenre ? ` · ${sousGenre}` : ""}</td></tr>
              <tr><td style="padding:6px 0;color:#78716C">Langue</td><td style="padding:6px 0">${langue}</td></tr>
              <tr><td style="padding:6px 0;color:#78716C">Nb titres</td><td style="padding:6px 0">${nombreTitres}</td></tr>
              <tr><td style="padding:6px 0;color:#78716C">Date souhaitée</td><td style="padding:6px 0">${dateSortie}</td></tr>
              <tr><td style="padding:6px 0;color:#78716C">Featuring</td><td style="padding:6px 0">${featuring || "—"}</td></tr>
              <tr><td style="padding:6px 0;color:#78716C">Formule</td><td style="padding:6px 0;font-weight:600">${formule || "Non précisée"}</td></tr>
            </table>

            <hr style="border:none;border-top:1px solid #E7E5E4;margin:20px 0"/>
            <h2 style="font-size:16px;margin:0 0 16px;color:#1C0A40">⚖️ Droits & Audio</h2>
            <table style="width:100%;font-size:13px;border-collapse:collapse">
              <tr><td style="padding:6px 0;color:#78716C;width:40%">Compositeurs</td><td style="padding:6px 0">${compositeurs}</td></tr>
              <tr><td style="padding:6px 0;color:#78716C">Label/Éditeur</td><td style="padding:6px 0">${label || "—"} / ${editeur || "—"}</td></tr>
              <tr><td style="padding:6px 0;color:#78716C">PRO</td><td style="padding:6px 0">${proMembership || "—"}</td></tr>
              <tr><td style="padding:6px 0;color:#78716C">ISRC existant</td><td style="padding:6px 0">${isrcExistant}</td></tr>
              <tr><td style="padding:6px 0;color:#78716C">UPC existant</td><td style="padding:6px 0">${upcExistant}</td></tr>
              <tr><td style="padding:6px 0;color:#78716C">Samples</td><td style="padding:6px 0">${contientSamples}${clearancesSamples ? ` — ${clearancesSamples}` : ""}</td></tr>
              <tr><td style="padding:6px 0;color:#78716C">Masters prêts</td><td style="padding:6px 0">${mastersPrets || "—"}</td></tr>
              <tr><td style="padding:6px 0;color:#78716C">Mastering KEKELI</td><td style="padding:6px 0">${masteringInclus}</td></tr>
            </table>

            <hr style="border:none;border-top:1px solid #E7E5E4;margin:20px 0"/>
            <h2 style="font-size:16px;margin:0 0 16px;color:#1C0A40">🎨 Visuels & Cover</h2>
            <table style="width:100%;font-size:13px;border-collapse:collapse">
              <tr><td style="padding:6px 0;color:#78716C;width:40%">Cover prêt</td><td style="padding:6px 0">${coverPret || "—"}</td></tr>
              <tr><td style="padding:6px 0;color:#78716C">Photos artiste</td><td style="padding:6px 0">${photosPret || "—"}</td></tr>
              <tr><td style="padding:6px 0;color:#78716C">Style visuel</td><td style="padding:6px 0">${styleVisuel || "—"}</td></tr>
            </table>

            <hr style="border:none;border-top:1px solid #E7E5E4;margin:20px 0"/>
            <h2 style="font-size:16px;margin:0 0 8px;color:#1C0A40">🌍 Plateformes</h2>
            <p style="font-size:13px;margin:0 0 20px">${plateformes}</p>

            <h2 style="font-size:16px;margin:0 0 8px;color:#1C0A40">📱 Réseaux sociaux</h2>
            <p style="font-size:13px;margin:0 0 4px">Instagram: ${instagram || "—"} · TikTok: ${tiktok || "—"}</p>
            <p style="font-size:13px;margin:0 0 4px">YouTube: ${youtube || "—"} · Spotify: ${spotifyExistant || "—"}</p>
            <p style="font-size:13px;margin:0 0 20px">Promo: ${planPromotion || "—"}</p>

            ${bioArtiste ? `<div style="background:#F5F2EB;padding:16px;border-radius:8px;font-size:12px;color:#78716C;margin-bottom:20px"><strong>Bio:</strong> ${bioArtiste}</div>` : ""}
            ${message ? `<div style="background:#F5F2EB;padding:16px;border-radius:8px;font-size:12px;color:#78716C"><strong>Message:</strong> ${message}</div>` : ""}
          </div>
        </div>
      `,
    });

    /* ── Email confirmation artiste ── */
    await resend.emails.send({
      from: "KEKELI Creative Agency <onboarding@resend.dev>",
      to: email,
      subject: `✅ Demande de distribution reçue — ${titreProjet || releaseType}`,
      html: `
        <div style="font-family:sans-serif;max-width:500px;margin:0 auto;color:#0C0B09">
          <div style="background:linear-gradient(135deg,#130A28,#1C0A40);padding:32px;border-radius:16px;text-align:center;margin-bottom:24px">
            <h1 style="color:#C8A84B;font-size:22px;margin:0">Demande reçue ✓</h1>
            <p style="color:rgba(220,210,255,0.70);margin:8px 0 0;font-size:14px">KEKELI Creative Agency · Distribution Musicale</p>
          </div>
          <p style="font-size:15px">Bonjour <strong>${nomArtiste}</strong>,</p>
          <p style="font-size:14px;color:#6B7280;line-height:1.6">
            Nous avons bien reçu votre dossier de distribution pour <strong>${titreProjet || releaseType}</strong>.
            Notre équipe vous contactera dans les <strong style="color:#C8A84B">24 heures</strong> pour confirmer votre dossier et démarrer le processus.
          </p>
          <p style="font-size:14px;color:#6B7280">En attendant, n'hésitez pas à nous écrire sur WhatsApp si vous avez des questions urgentes.</p>
          <p style="font-size:13px;color:#9CA3AF;margin-top:32px">— L'équipe KEKELI Creative Agency · Dakar, Sénégal</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Distribution API error:", err);
    return NextResponse.json({ error: "Erreur interne" }, { status: 500 });
  }
}
