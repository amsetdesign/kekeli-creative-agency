import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-ssr";
import DiagnosticClient from "@/components/entreprises/DiagnosticClient";

export const metadata: Metadata = {
  title: "Diagnostic Entreprise — Que manque-t-il à mon entreprise ? | KEKELI Creative Agency",
  description: "L'IA détecte vos lacunes digitales (visibilité, branding, réseaux, publicité) et vous propose un plan d'action priorisé pour développer votre business.",
  alternates: { canonical: "/entreprises/diagnostic" },
};

export default async function DiagnosticPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/espace-client/login?next=/entreprises/diagnostic");
  return <DiagnosticClient />;
}
