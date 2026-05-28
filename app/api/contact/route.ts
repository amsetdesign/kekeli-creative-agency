import { NextResponse } from "next/server";
import { render } from "@react-email/components";
import { contactSchema } from "@/lib/validations/contact";
import { resend, AGENCY_EMAIL, SITE_URL } from "@/lib/resend";
import ContactNotification from "@/lib/email-templates/ContactNotification";
import ContactConfirmation from "@/lib/email-templates/ContactConfirmation";
import { getSupabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    /* ── Validation ───────────────────────────────── */
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Données invalides", details: parsed.error.flatten().fieldErrors },
        { status: 422 },
      );
    }

    const data = parsed.data;
    const receivedAt = new Date().toLocaleString("fr-SN", {
      timeZone: "Africa/Dakar",
      dateStyle: "full",
      timeStyle: "short",
    });

    /* ── Envoi des 2 emails en parallèle ─────────── */
    const [notif, confirm] = await Promise.all([
      // Email 1 : Notification à l'agence
      resend.emails.send({
        from: "KEKELI Creative Agency <onboarding@resend.dev>",
        to: [AGENCY_EMAIL],
        subject: `📬 Nouvelle demande — ${data.typeProjet} — ${data.prenom} ${data.nom}`,
        html: await render(ContactNotification({ data, receivedAt })),
      }),

      // Email 2 : Confirmation au client
      resend.emails.send({
        from: "KEKELI Creative Agency <onboarding@resend.dev>",
        to: [data.email],
        replyTo: AGENCY_EMAIL,
        subject: "✅ KEKELI Creative Agency a bien reçu votre message",
        html: await render(ContactConfirmation({ data, siteUrl: SITE_URL })),
      }),
    ]);

    if (notif.error || confirm.error) {
      console.error("Resend error:", notif.error ?? confirm.error);
      return NextResponse.json(
        { error: "Erreur lors de l'envoi de l'email. Veuillez réessayer." },
        { status: 500 },
      );
    }

    // Save to Supabase (non-blocking — email already sent)
    getSupabase().from("leads").insert({ type: "contact", data })
      .then(({ error: dbErr }) => { if (dbErr) console.error("Supabase insert error:", dbErr.message); });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Une erreur inattendue s'est produite." },
      { status: 500 },
    );
  }
}
