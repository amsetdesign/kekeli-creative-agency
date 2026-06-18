import { NextResponse } from "next/server";
import { render } from "@react-email/components";
import { getSupabase } from "@/lib/supabase";
import { resend, SITE_URL } from "@/lib/resend";
import ClientActivation from "@/lib/email-templates/ClientActivation";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { data, error } = await getSupabase()
    .from("client_profiles")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Clients DB error:", error.message);
    return NextResponse.json({ error: "Une erreur est survenue." }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function PATCH(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { id, status } = await request.json();

  if (!id || !["pending", "active", "suspended"].includes(status)) {
    return NextResponse.json({ error: "Données invalides." }, { status: 422 });
  }

  const db = getSupabase();

  const { data, error } = await db
    .from("client_profiles")
    .update({ status })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Clients DB error:", error.message);
    return NextResponse.json({ error: "Une erreur est survenue." }, { status: 500 });
  }

  // Send activation email when status changes to active
  if (status === "active" && data) {
    resend.emails
      .send({
        from: "KEKELI Creative Agency <onboarding@resend.dev>",
        to: [data.email],
        subject: "✅ Votre accès à l'espace client KEKELI est activé !",
        html: await render(ClientActivation({ full_name: data.full_name, siteUrl: SITE_URL })),
      })
      .catch((err) => console.error("Activation email error:", err));
  }

  return NextResponse.json({ success: true, data });
}
