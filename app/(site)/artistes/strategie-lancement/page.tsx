import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-ssr";
import StrategieLancementClient from "@/components/strategie-lancement/StrategieLancementClient";

export const metadata: Metadata = {
  title: "GÃ©nÃ©rateur StratÃ©gie Lancement Musical | KEKELI Creative Agency",
  description: "Notre IA gÃ©nÃ¨re un plan de lancement complet sur 90 jours pour votre single, EP ou album : phases, canaux, budget, KPIs et calendrier Ã©ditorial.",
  keywords: ["stratÃ©gie lancement musical IA", "plan lancement single Afrique", "lancer album Dakar", "calendrier Ã©ditorial artiste", "lancement EP SÃ©nÃ©gal IA"],
  alternates: { canonical: "/artistes/strategie-lancement" },
  openGraph: {
    title: "GÃ©nÃ©rateur StratÃ©gie Lancement Musical â€” KEKELI Creative Agency",
    description: "Plan de lancement sur 90 jours pour votre single, EP ou album â€” gÃ©nÃ©rÃ© par IA.",
    url: "/artistes/strategie-lancement",
  },
};

export default async function StrategieLancementPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/espace-client/login?next=/artistes/strategie-lancement");
  return <StrategieLancementClient />;
}
