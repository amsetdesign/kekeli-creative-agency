import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-ssr";
import VisionClient from "@/components/vision/VisionClient";

export const metadata: Metadata = {
  title: "IA Vision de Carrière | KEKELI Creative Agency",
  description: "Notre IA analyse votre profil artistique et génère une roadmap personnalisée : score artiste, points forts, stratégie 90 jours.",
  keywords: ["IA vision carrière artiste", "roadmap artiste africain", "stratégie musicale IA", "score artiste Dakar", "plan carrière musique Sénégal"],
  alternates: { canonical: "/artistes/vision" },
  openGraph: {
    title: "IA Vision de Carrière — KEKELI Creative Agency",
    description: "Score artiste, points forts, roadmap 90 jours — généré par IA pour les artistes africains.",
    url: "/artistes/vision",
  },
};

export default async function VisionCarrierePage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/espace-client/login?next=/artistes/vision");
  return <VisionClient />;
}
