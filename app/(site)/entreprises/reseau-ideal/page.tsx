import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-ssr";
import ReseauIdealClient from "@/components/entreprises/ReseauIdealClient";

export const metadata: Metadata = {
  title: "Réseau Idéal — Quel réseau social pour votre entreprise ? | KEKELI Creative Agency",
  description: "Décrivez votre activité et votre cible — l'IA vous recommande les meilleurs réseaux sociaux et une stratégie adaptée à votre secteur.",
  alternates: { canonical: "/entreprises/reseau-ideal" },
};

export default async function ReseauIdealPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/espace-client/login?next=/entreprises/reseau-ideal");
  return <ReseauIdealClient />;
}
