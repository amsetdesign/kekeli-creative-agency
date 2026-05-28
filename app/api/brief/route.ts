import { NextResponse } from "next/server";
import { render } from "@react-email/components";
import { briefSchema } from "@/lib/validations/brief";
import { resend, AGENCY_EMAIL } from "@/lib/resend";
import { getSupabase } from "@/lib/supabase";
import BriefNotification from "@/lib/email-templates/BriefNotification";

const PROJET_LABELS: Record<string, string> = {
  "site-web": "Site web / Application",
  "photo-video": "Photo / Vidéo",
  "reseaux": "Réseaux sociaux",
  "artiste": "Artiste / Musique",
  "evenement": "Événement",
  "branding": "Branding / Identité visuelle",
};

const BUDGET_LABELS: Record<string, string> = {
  "moins-200k": "Moins de 200 000 FCFA",
  "200k-500k": "200 000 — 500 000 FCFA",
  "500k-1500k": "500 000 — 1 500 000 FCFA",
  "plus-1500k": "Plus de 1 500 000 FCFA",
};

const DELAI_LABELS: Record<string, string> = {
  "urgent": "Urgent — moins d'1 mois",
  "normal": "Normal — 1 à 3 mois",
  "tranquille": "Pas pressé — 3 mois+",
  "indefini": "À définir ensemble",
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = briefSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Données invalides" }, { status: 422 });
    }

    const data = parsed.data;
    const projetLabel = PROJET_LABELS[data.projet] ?? data.projet;
    const budgetLabel = BUDGET_LABELS[data.budget] ?? data.budget;
    const delaiLabel = DELAI_LABELS[data.delai] ?? data.delai;

    const receivedAt = new Date().toLocaleString("fr-SN", {
      timeZone: "Africa/Dakar",
      dateStyle: "full",
      timeStyle: "short",
    });

    await resend.emails.send({
      from: "KEKELI Creative Agency <onboarding@resend.dev>",
      to: [AGENCY_EMAIL],
      subject: `⚡ Brief Express — ${projetLabel} — ${data.prenom}`,
      html: await render(
        BriefNotification({ data, projetLabel, budgetLabel, delaiLabel, receivedAt })
      ),
    });

    // Save to Supabase
    getSupabase().from("leads").insert({ type: "brief", data })
      .then(({ error: dbErr }) => { if (dbErr) console.error("Supabase insert error:", dbErr.message); });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Brief API error:", err);
    return NextResponse.json({ error: "Erreur inattendue" }, { status: 500 });
  }
}
