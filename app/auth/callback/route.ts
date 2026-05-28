import { NextResponse } from "next/server";
import { render } from "@react-email/components";
import { createSupabaseServerClient } from "@/lib/supabase-ssr";
import { getSupabase } from "@/lib/supabase";
import { resend, AGENCY_EMAIL } from "@/lib/resend";
import ClientRegistrationNotification from "@/lib/email-templates/ClientRegistrationNotification";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/espace-client/dashboard";
  const mode = searchParams.get("mode") ?? "register";

  if (!code) {
    return NextResponse.redirect(new URL("/espace-client/login?error=auth", request.url));
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error || !data.user) {
    console.error("Auth callback error:", error?.message);
    return NextResponse.redirect(new URL("/espace-client/login?error=auth", request.url));
  }

  const user = data.user;
  const db = getSupabase();

  const { data: existing } = await db
    .from("client_profiles")
    .select("id")
    .eq("id", user.id)
    .single();

  if (!existing && mode === "login") {
    // User tried to sign in with Google but has no account yet → redirect to inscription
    await supabase.auth.signOut();
    return NextResponse.redirect(new URL("/espace-client/inscription?notice=google-not-found", origin));
  }

  if (!existing) {
    const meta = user.user_metadata ?? {};
    const full_name = (meta.full_name as string) || (meta.name as string) || "";
    const email = user.email ?? "";
    const company = (meta.company as string | undefined) ?? null;
    const phone = (meta.phone as string | undefined) ?? null;

    await db.from("client_profiles").insert({
      id: user.id,
      full_name,
      email,
      company,
      phone,
      status: "active",
    });

    const receivedAt = new Date().toLocaleString("fr-SN", {
      timeZone: "Africa/Dakar",
      dateStyle: "full",
      timeStyle: "short",
    });

    resend.emails
      .send({
        from: "KEKELI Creative Agency <onboarding@resend.dev>",
        to: [AGENCY_EMAIL],
        subject: `🆕 Nouveau compte activé — ${full_name || email}`,
        html: await render(
          ClientRegistrationNotification({ full_name, email, company, phone, receivedAt }),
        ),
      })
      .catch((err) => console.error("Callback email error:", err));
  }

  const safeNext = next.startsWith("/") ? next : "/espace-client/dashboard";
  return NextResponse.redirect(new URL(safeNext, origin));
}
