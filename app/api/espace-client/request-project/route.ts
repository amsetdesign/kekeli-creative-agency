import { NextResponse } from "next/server";
import { render } from "@react-email/components";
import { createSupabaseServerClient } from "@/lib/supabase-ssr";
import { getSupabase } from "@/lib/supabase";
import { resend, AGENCY_EMAIL, SITE_URL } from "@/lib/resend";
import MessageNotification from "@/lib/email-templates/MessageNotification";

const URGENCY_LABELS: Record<string, string> = {
  normal: "Pas urgent",
  soon: "Dans 2-4 semaines",
  urgent: "Urgent",
};

export async function POST(request: Request) {
  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return NextResponse.json({ error: "Non authentifié." }, { status: 401 });

    const { type, description, urgency } = await request.json();
    if (!type || !description) {
      return NextResponse.json({ error: "Champs requis manquants." }, { status: 422 });
    }

    const { data: profile } = await getSupabase()
      .from("client_profiles")
      .select("full_name, email, company")
      .eq("id", user.id)
      .single();

    const clientName = profile?.full_name ?? user.email ?? "Client";
    const urgencyLabel = URGENCY_LABELS[urgency] ?? urgency;

    // Save to leads table so it appears in admin dashboard
    await getSupabase().from("leads").insert({
      type: "projet",
      status: "new",
      data: {
        client_name: clientName,
        client_email: profile?.email ?? user.email,
        client_id: user.id,
        type,
        urgency: urgencyLabel,
        description,
      },
    });

    const messageContent = `Nouvelle demande de projet\n\nType : ${type}\nUrgence : ${urgencyLabel}\n\nDescription :\n${description}`;

    await resend.emails.send({
      from: "KEKELI Creative Agency <onboarding@resend.dev>",
      to: [AGENCY_EMAIL],
      subject: `📋 Demande de projet — ${type} — ${clientName}`,
      html: await render(
        MessageNotification({
          recipient_name: "Équipe KEKELI",
          sender_name: `${clientName}${profile?.company ? ` (${profile.company})` : ""}`,
          project_title: type,
          message_content: messageContent,
          siteUrl: SITE_URL,
          project_id: "",
          direction: "to_agency",
        }),
      ),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Request project error:", err);
    return NextResponse.json({ error: "Erreur inattendue." }, { status: 500 });
  }
}
