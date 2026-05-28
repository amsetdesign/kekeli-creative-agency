import { NextResponse } from "next/server";
import { render } from "@react-email/components";
import { getSupabase } from "@/lib/supabase";
import { resend, AGENCY_EMAIL, SITE_URL } from "@/lib/resend";
import ClientRegistrationNotification from "@/lib/email-templates/ClientRegistrationNotification";

export async function POST(request: Request) {
  try {
    const { full_name, email, password, company, phone } = await request.json();

    if (!full_name || !email || !password) {
      return NextResponse.json({ error: "Champs requis manquants." }, { status: 422 });
    }

    if (password.length < 8 || !/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
      return NextResponse.json({ error: "Le mot de passe doit contenir au moins 8 caractères avec des lettres et des chiffres." }, { status: 422 });
    }

    const db = getSupabase();

    // Create Supabase Auth user (email pre-confirmed — we control activation via status)
    const { data: authData, error: authError } = await db.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (authError) {
      if (authError.message.includes("already")) {
        return NextResponse.json({ error: "Un compte avec cet email existe déjà." }, { status: 409 });
      }
      console.error("Auth create error:", authError.message);
      return NextResponse.json({ error: "Erreur lors de la création du compte." }, { status: 500 });
    }

    const userId = authData.user.id;

    // Insert client profile
    const { error: profileError } = await db.from("client_profiles").insert({
      id: userId,
      full_name,
      email,
      company: company ?? null,
      phone: phone ?? null,
      status: "pending",
    });

    if (profileError) {
      // Rollback auth user
      await db.auth.admin.deleteUser(userId);
      console.error("Profile insert error:", profileError.message);
      return NextResponse.json({ error: "Erreur lors de l'enregistrement." }, { status: 500 });
    }

    // Notify agency by email (non-blocking)
    const receivedAt = new Date().toLocaleString("fr-SN", {
      timeZone: "Africa/Dakar",
      dateStyle: "full",
      timeStyle: "short",
    });

    resend.emails
      .send({
        from: "KEKELI Creative Agency <onboarding@resend.dev>",
        to: [AGENCY_EMAIL],
        subject: `🆕 Nouvelle demande d'accès — ${full_name}`,
        html: await render(
          ClientRegistrationNotification({ full_name, email, company, phone, receivedAt }),
        ),
      })
      .catch((err) => console.error("Email error:", err));

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Register error:", err);
    return NextResponse.json({ error: "Erreur inattendue." }, { status: 500 });
  }
}
