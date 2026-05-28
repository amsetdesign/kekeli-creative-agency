import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-ssr";
import AnalyseReseauxClient from "@/components/analyse/AnalyseReseauxClient";

export const metadata: Metadata = {
  title: "IA Analyse Réseaux Sociaux | KEKELI Creative Agency",
  description: "Notre IA analyse votre branding Instagram, TikTok et YouTube : score de cohérence, points à améliorer et plan d'action 30 jours.",
  keywords: ["analyse réseaux sociaux IA artiste", "audit Instagram artiste Dakar", "TikTok musique Sénégal", "score cohérence branding", "plan action réseaux sociaux"],
  alternates: { canonical: "/artistes/analyse-reseaux" },
  openGraph: {
    title: "IA Analyse Réseaux Sociaux — KEKELI Creative Agency",
    description: "Score de cohérence, points faibles et plan d'action 30 jours pour votre présence Instagram, TikTok et YouTube.",
    url: "/artistes/analyse-reseaux",
  },
};

export default async function AnalyseReseauxPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/espace-client/login?next=/artistes/analyse-reseaux");
  return <AnalyseReseauxClient />;
}
