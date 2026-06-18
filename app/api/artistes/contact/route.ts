import { getSupabase } from "@/lib/supabase";
import { Resend } from "resend";

export async function POST(request: Request) {
  const data = await request.json();

  // Save to leads table
  try {
    await getSupabase()
      .from("leads")
      .insert({
        type: "artiste",
        status: "new",
        data,
      });
  } catch {
    // non-blocking
  }

  // Send email notification to agency
  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails
    .send({
      from: "KELI — KEKELI Creative Agency <noreply@kekelicreativeagency.com>",
      to: process.env.AGENCY_EMAIL ?? "kekelicreativeagency@gmail.com",
      subject: `🎤 Nouveau contact artiste — ${data.nom_artiste}`,
      html: `
        <h2>Nouveau contact artiste</h2>
        <p><b>Artiste :</b> ${data.nom_artiste}</p>
        <p><b>Email :</b> ${data.email}</p>
        <p><b>Téléphone :</b> ${data.telephone ?? "Non renseigné"}</p>
        <p><b>Genre :</b> ${data.genre_musical ?? "Non renseigné"}</p>
        <p><b>Niveau :</b> ${data.niveau ?? "Non renseigné"}</p>
        <p><b>Présence digitale :</b> ${data.presence_digitale ?? "Non renseignée"}</p>
        <p><b>Budget :</b> ${data.budget ?? "Non précisé"}</p>
        <p><b>Besoins :</b> ${Array.isArray(data.besoins) ? data.besoins.join(", ") : (data.besoins ?? "Aucun")}</p>
        <p><b>Description :</b> ${data.description ?? "Aucune"}</p>
      `,
    })
    .catch(() => {});

  return Response.json({ success: true });
}
