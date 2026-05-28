import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-ssr";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const schema = z.object({
  nom_entreprise: z.string().min(1).max(150),
  secteur: z.string().max(100).optional(),
  email: z.string().email(),
  telephone: z.string().max(30).optional(),
  besoins: z.array(z.string().max(100)).max(20),
  budget: z.string().max(50).optional(),
  description: z.string().max(3000).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Données invalides." }, { status: 422 });
    }
    const data = parsed.data;

    const supabase = await createSupabaseServerClient();
    const { error: dbError } = await supabase.from("leads").insert({
      type: "entreprise",
      nom: data.nom_entreprise,
      email: data.email,
      telephone: data.telephone ?? null,
      besoins: data.besoins,
      budget: data.budget ?? null,
      message: data.description ?? null,
      metadata: { secteur: data.secteur ?? null },
      statut: "new",
    });
    if (dbError) console.error("Lead insert error:", dbError.message);

    try {
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: process.env.AGENCY_EMAIL ?? "amsetdesign@gmail.com",
        subject: `🏢 Nouveau brief entreprise — ${data.nom_entreprise}`,
        html: `
          <h2>Nouveau brief entreprise</h2>
          <p><strong>Entreprise :</strong> ${data.nom_entreprise}</p>
          <p><strong>Secteur :</strong> ${data.secteur ?? "—"}</p>
          <p><strong>Email :</strong> ${data.email}</p>
          <p><strong>Téléphone :</strong> ${data.telephone ?? "—"}</p>
          <p><strong>Besoins :</strong> ${data.besoins.join(", ")}</p>
          <p><strong>Budget :</strong> ${data.budget ?? "—"}</p>
          <p><strong>Projet :</strong> ${data.description ?? "—"}</p>
        `,
      });
    } catch (emailErr) {
      console.error("Email error:", emailErr);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Entreprises contact error:", err);
    return NextResponse.json({ error: "Une erreur est survenue." }, { status: 500 });
  }
}
