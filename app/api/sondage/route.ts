import { NextResponse } from "next/server";
import { render } from "@react-email/components";
import { sondageSubmitSchema } from "@/lib/validations/sondage";
import { getSupabase } from "@/lib/supabase";
import { sondageConfigs } from "@/data/sondages";
import { resend, AGENCY_EMAIL, SITE_URL } from "@/lib/resend";
import { generateSondageReport } from "@/lib/pdf/generateSondageReport";
import SondageNotification from "@/lib/email-templates/SondageNotification";
import SondageConfirmation from "@/lib/email-templates/SondageConfirmation";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const parsed = sondageSubmitSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Données invalides", details: parsed.error.flatten().fieldErrors },
        { status: 422 }
      );
    }

    const { type, score, userInfo } = parsed.data;
    const config = sondageConfigs[type];

    if (!config) {
      return NextResponse.json({ error: "Type de profil inconnu" }, { status: 400 });
    }

    const receivedAt = new Date().toLocaleString("fr-SN", {
      timeZone: "Africa/Dakar",
      dateStyle: "full",
      timeStyle: "short",
    });

    const dateShort = new Date().toLocaleDateString("fr-SN", {
      timeZone: "Africa/Dakar",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    // Generate PDF report
    const pdfBuffer = generateSondageReport(config, score, userInfo, dateShort);
    const pdfAttachment = {
      filename: `rapport-kekeli-${type}-${score}.pdf`,
      content: Buffer.from(pdfBuffer),
    };

    // Send both emails in parallel
    const [notif, confirm] = await Promise.all([
      resend.emails.send({
        from: "KEKELI Creative Agency <onboarding@resend.dev>",
        to: [AGENCY_EMAIL],
        subject: `🎯 Sondage — ${config.title} — ${userInfo.prenom} — ${score}/100`,
        html: await render(SondageNotification({ config, score, userInfo, receivedAt })),
      }),
      resend.emails.send({
        from: "KEKELI Creative Agency <onboarding@resend.dev>",
        to: [userInfo.email],
        replyTo: AGENCY_EMAIL,
        subject: `✅ ${config.tone === "tu" ? "Ton" : "Votre"} rapport d'audit KEKELI — ${score}/100`,
        html: await render(SondageConfirmation({ config, score, userInfo, siteUrl: SITE_URL })),
        attachments: [pdfAttachment],
      }),
    ]);

    if (notif.error || confirm.error) {
      console.error("Resend sondage error:", notif.error ?? confirm.error);
      return NextResponse.json(
        { error: "Erreur lors de l'envoi de l'email. Veuillez réessayer." },
        { status: 500 }
      );
    }

    // Save to Supabase
    getSupabase().from("leads").insert({ type: "sondage", data: { type, score, userInfo } })
      .then(({ error: dbErr }) => { if (dbErr) console.error("Supabase insert error:", dbErr.message); });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Sondage API error:", err);
    return NextResponse.json(
      { error: "Une erreur inattendue s'est produite." },
      { status: 500 }
    );
  }
}
