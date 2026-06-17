import { NextResponse } from "next/server";
import { render } from "@react-email/components";
import { createSupabaseServerClient } from "@/lib/supabase-ssr";
import { getSupabase } from "@/lib/supabase";
import { resend, AGENCY_EMAIL, SITE_URL } from "@/lib/resend";
import MessageNotification from "@/lib/email-templates/MessageNotification";

export async function GET(request: Request) {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Non authentifié." }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const project_id = searchParams.get("project_id");
    const before     = searchParams.get("before"); // ISO timestamp
    const limit      = Math.min(parseInt(searchParams.get("limit") ?? "30"), 50);

    if (!project_id) return NextResponse.json({ error: "project_id manquant." }, { status: 400 });

    const db = getSupabase();

    const { data: project } = await db
      .from("projects")
      .select("id")
      .eq("id", project_id)
      .eq("client_id", user.id)
      .single();

    if (!project) return NextResponse.json({ error: "Projet introuvable." }, { status: 404 });

    let query = db
      .from("project_messages")
      .select("*")
      .eq("project_id", project_id)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (before) query = query.lt("created_at", before);

    const { data, error } = await query;
    if (error) return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });

    return NextResponse.json({ messages: (data ?? []).reverse() });
  } catch {
    return NextResponse.json({ error: "Erreur inattendue." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Non authentifié." }, { status: 401 });
    }

    const { project_id, content, attachments } = await request.json();

    if (!project_id || (!content?.trim() && !attachments?.length)) {
      return NextResponse.json({ error: "Données manquantes." }, { status: 422 });
    }

    const db = getSupabase();

    // Verify the project belongs to the user
    const { data: project } = await db
      .from("projects")
      .select("id, title, client_id")
      .eq("id", project_id)
      .eq("client_id", user.id)
      .single();

    if (!project) {
      return NextResponse.json({ error: "Projet introuvable." }, { status: 404 });
    }

    // Get client profile for sender name
    const { data: profile } = await db
      .from("client_profiles")
      .select("full_name, email")
      .eq("id", user.id)
      .single();

    const senderName = profile?.full_name ?? user.email ?? "Client";

    // Insert message
    const { data: message, error: msgError } = await db
      .from("project_messages")
      .insert({
        project_id,
        sender_type: "client",
        sender_name: senderName,
        content: content?.trim() || "",
        attachments: attachments ?? [],
      })
      .select()
      .single();

    if (msgError) {
      console.error("Message insert error:", msgError.message);
      return NextResponse.json({ error: "Erreur lors de l'envoi." }, { status: 500 });
    }

    // Notify agency (non-blocking)
    resend.emails
      .send({
        from: "KEKELI Creative Agency <onboarding@resend.dev>",
        to: [AGENCY_EMAIL],
        subject: `💬 Nouveau message de ${senderName} — ${project.title}`,
        html: await render(
          MessageNotification({
            recipient_name: "Équipe KEKELI",
            sender_name: senderName,
            project_title: project.title,
            message_content: content.trim(),
            siteUrl: SITE_URL,
            project_id,
            direction: "to_agency",
          }),
        ),
      })
      .catch((err) => console.error("Email error:", err));

    return NextResponse.json({ success: true, message });
  } catch (err) {
    console.error("Messages route error:", err);
    return NextResponse.json({ error: "Erreur inattendue." }, { status: 500 });
  }
}
