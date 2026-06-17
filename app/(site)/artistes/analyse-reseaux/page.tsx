import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-ssr";
import AnalyseReseauxClient from "@/components/analyse/AnalyseReseauxClient";

export const metadata: Metadata = {
  title: "IA Analyse RÃ©seaux Sociaux | KEKELI Creative Agency",
  description: "Notre IA analyse votre branding Instagram, TikTok et YouTube : score de cohÃ©rence, points Ã  amÃ©liorer et plan d'action 30 jours.",
  keywords: ["analyse rÃ©seaux sociaux IA artiste", "audit Instagram artiste Dakar", "TikTok musique SÃ©nÃ©gal", "score cohÃ©rence branding", "plan action rÃ©seaux sociaux"],
  alternates: { canonical: "/artistes/analyse-reseaux" },
  openGraph: {
    title: "IA Analyse RÃ©seaux Sociaux â€” KEKELI Creative Agency",
    description: "Score de cohÃ©rence, points faibles et plan d'action 30 jours pour votre prÃ©sence Instagram, TikTok et YouTube.",
    url: "/artistes/analyse-reseaux",
  },
};

export default async function AnalyseReseauxPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/espace-client/login?next=/artistes/analyse-reseaux");
  return <AnalyseReseauxClient />;
}
