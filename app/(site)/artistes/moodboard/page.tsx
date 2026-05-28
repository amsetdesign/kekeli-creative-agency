import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-ssr";
import MoodboardClient from "@/components/moodboard/MoodboardClient";

export const metadata: Metadata = {
  title: "IA Moodboard & Direction Visuelle | KEKELI Creative Agency",
  description: "Notre IA génère ta direction visuelle complète : palette de couleurs, typographie, références esthétiques et guide de contenu personnalisé.",
  keywords: ["moodboard artiste IA", "direction visuelle musicien Dakar", "palette couleurs artiste", "identité visuelle IA Sénégal", "guide contenu artiste africain"],
  alternates: { canonical: "/artistes/moodboard" },
  openGraph: {
    title: "IA Moodboard & Direction Visuelle — KEKELI Creative Agency",
    description: "Palette, typographie, références esthétiques et guide de contenu — généré par IA pour ta direction visuelle.",
    url: "/artistes/moodboard",
  },
};

export default async function MoodboardPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/espace-client/login?next=/artistes/moodboard");
  return <MoodboardClient />;
}
