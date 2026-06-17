import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { render } from "@react-email/components";
import { getSupabase } from "@/lib/supabase";
import { resend, SITE_URL } from "@/lib/resend";
import ProjectUpdateNotification from "@/lib/email-templates/ProjectUpdateNotification";
import MessageNotification from "@/lib/email-templates/MessageNotification";

async function isAuthorized() {
  const store = await cookies();
  const session = store.get("kekeli_admin")?.value;
  return session === process.env.ADMIN_SESSION_SECRET;
}

// GET /api/admin/projects — list all projects with client info
export async function GET() {
  if (!(await isAuthorized())) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { data, error } = await getSupabase()
    .from("projects")
    .select("*, client_profiles(full_name, company, email)")
    .order("updated_at", { ascending: false });

  if (error) { console.error("Projects DB error:", error.message); return NextResponse.json({ error: "Une erreur est survenue." }, { status: 500 }); }
  return NextResponse.json(data);
}

// POST /api/admin/projects — create a project OR add update OR reply to message
export async function POST(request: Request) {
  if (!(await isAuthorized())) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const body = await request.json();
  const { action } = body;
  const db = getSupabase();

  // ── Create project ──────────────────────────────────────────────────
  if (action === "create_project") {
    const { client_id, title, description, status, progress } = body;
    if (!client_id || !title) {
      return NextResponse.json({ error: "client_id et title requis." }, { status: 422 });
    }

    const { data, error } = await db
      .from("projects")
      .insert({ client_id, title, description: description ?? null, status: status ?? "en_attente", progress: progress ?? 0 })
      .select()
      .single();

    if (error) { console.error("Projects DB error:", error.message); return NextResponse.json({ error: "Une erreur est survenue." }, { status: 500 }); }
    return NextResponse.json({ success: true, data });
  }

  // ── Add project update ──────────────────────────────────────────────
  if (action === "add_update") {
    const { project_id, title, content, progress, status, attachments } = body;
    if (!project_id || !title || !content) {
      return NextResponse.json({ error: "project_id, title et content requis." }, { status: 422 });
    }

    const { data: update, error } = await db
      .from("project_updates")
      .insert({ project_id, title, content, progress: progress ?? null, status: status ?? null, attachments: attachments ?? [] })
      .select()
      .single();

    if (error) { console.error("Projects DB error:", error.message); return NextResponse.json({ error: "Une erreur est survenue." }, { status: 500 }); }

    // Update project progress if provided
    if (progress !== undefined) {
      const updates: Record<string, unknown> = { updated_at: new Date().toISOString() };
      if (progress !== null) updates.progress = progress;
      if (status) updates.status = status;
      await db.from("projects").update(updates).eq("id", project_id);
    }

    // Notify client by email
    const { data: project } = await db
      .from("projects")
      .select("title, client_profiles(full_name, email)")
      .eq("id", project_id)
      .single();

    if (project) {
      const client = (project as Record<string, unknown>).client_profiles as { full_name: string; email: string } | null;
      if (client?.email) {
        resend.emails
          .send({
            from: "KEKELI Creative Agency <onboarding@resend.dev>",
            to: [client.email],
            subject: `🔔 Nouvelle mise à jour — ${project.title}`,
            html: await render(
              ProjectUpdateNotification({
                client_name: client.full_name,
                project_title: project.title,
                update_title: title,
                update_content: content,
                progress: progress ?? null,
                siteUrl: SITE_URL,
                project_id,
              }),
            ),
          })
          .catch((err) => console.error("Update email error:", err));
      }
    }

    return NextResponse.json({ success: true, data: update });
  }

  // ── Agency reply message ────────────────────────────────────────────
  if (action === "send_message") {
    const { project_id, content } = body;
    if (!project_id || !content?.trim()) {
      return NextResponse.json({ error: "project_id et content requis." }, { status: 422 });
    }

    const { data: message, error } = await db
      .from("project_messages")
      .insert({ project_id, sender_type: "agency", sender_name: "Équipe KEKELI", content: content.trim() })
      .select()
      .single();

    if (error) { console.error("Projects DB error:", error.message); return NextResponse.json({ error: "Une erreur est survenue." }, { status: 500 }); }

    // Notify client
    const { data: project } = await db
      .from("projects")
      .select("title, client_profiles(full_name, email)")
      .eq("id", project_id)
      .single();

    if (project) {
      const client = (project as Record<string, unknown>).client_profiles as { full_name: string; email: string } | null;
      if (client?.email) {
        resend.emails
          .send({
            from: "KEKELI Creative Agency <onboarding@resend.dev>",
            to: [client.email],
            subject: `💬 Nouveau message de l'équipe KEKELI — ${project.title}`,
            html: await render(
              MessageNotification({
                recipient_name: client.full_name,
                sender_name: "Équipe KEKELI",
                project_title: project.title,
                message_content: content.trim(),
                siteUrl: SITE_URL,
                project_id,
                direction: "to_client",
              }),
            ),
          })
          .catch((err) => console.error("Message email error:", err));
      }
    }

    return NextResponse.json({ success: true, data: message });
  }

  return NextResponse.json({ error: "Action inconnue." }, { status: 400 });
}

// PATCH /api/admin/projects — update project status/progress
export async function PATCH(request: Request) {
  if (!(await isAuthorized())) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { id, ...updates } = await request.json();
  if (!id) return NextResponse.json({ error: "id requis." }, { status: 422 });

  const allowed = ["title", "description", "status", "progress", "financial"];
  const filtered = Object.fromEntries(
    Object.entries(updates).filter(([k]) => allowed.includes(k)),
  );

  const { data, error } = await getSupabase()
    .from("projects")
    .update({ ...filtered, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) { console.error("Projects DB error:", error.message); return NextResponse.json({ error: "Une erreur est survenue." }, { status: 500 }); }
  return NextResponse.json({ success: true, data });
}
