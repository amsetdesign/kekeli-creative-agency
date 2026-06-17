import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-ssr";
import VisionClient from "@/components/vision/VisionClient";

export const metadata: Metadata = {
  title: "IA Vision de CarriÃ¨re | KEKELI Creative Agency",
  description: "Notre IA analyse votre profil artistique et gÃ©nÃ¨re une roadmap personnalisÃ©e : score artiste, points forts, stratÃ©gie 90 jours.",
  keywords: ["IA vision carriÃ¨re artiste", "roadmap artiste africain", "stratÃ©gie musicale IA", "score artiste Dakar", "plan carriÃ¨re musique SÃ©nÃ©gal"],
  alternates: { canonical: "/artistes/vision" },
  openGraph: {
    title: "IA Vision de CarriÃ¨re â€” KEKELI Creative Agency",
    description: "Score artiste, points forts, roadmap 90 jours â€” gÃ©nÃ©rÃ© par IA pour les artistes africains.",
    url: "/artistes/vision",
  },
};

export default async function VisionCarrierePage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/espace-client/login?next=/artistes/vision");
  return <VisionClient />;
}
