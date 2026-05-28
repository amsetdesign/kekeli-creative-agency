import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-ssr";
import StrategieLancementClient from "@/components/strategie-lancement/StrategieLancementClient";

export const metadata: Metadata = {
  title: "Générateur Stratégie Lancement Musical | KEKELI Creative Agency",
  description: "Notre IA génère un plan de lancement complet sur 90 jours pour votre single, EP ou album : phases, canaux, budget, KPIs et calendrier éditorial.",
  keywords: ["stratégie lancement musical IA", "plan lancement single Afrique", "lancer album Dakar", "calendrier éditorial artiste", "lancement EP Sénégal IA"],
  alternates: { canonical: "/artistes/strategie-lancement" },
  openGraph: {
    title: "Générateur Stratégie Lancement Musical — KEKELI Creative Agency",
    description: "Plan de lancement sur 90 jours pour votre single, EP ou album — généré par IA.",
    url: "/artistes/strategie-lancement",
  },
};

export default async function StrategieLancementPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/espace-client/login?next=/artistes/strategie-lancement");
  return <StrategieLancementClient />;
}
