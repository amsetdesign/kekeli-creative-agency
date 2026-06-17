import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-ssr";
import MoodboardClient from "@/components/moodboard/MoodboardClient";

export const metadata: Metadata = {
  title: "IA Moodboard & Direction Visuelle | KEKELI Creative Agency",
  description: "Notre IA gÃ©nÃ¨re ta direction visuelle complÃ¨te : palette de couleurs, typographie, rÃ©fÃ©rences esthÃ©tiques et guide de contenu personnalisÃ©.",
  keywords: ["moodboard artiste IA", "direction visuelle musicien Dakar", "palette couleurs artiste", "identitÃ© visuelle IA SÃ©nÃ©gal", "guide contenu artiste africain"],
  alternates: { canonical: "/artistes/moodboard" },
  openGraph: {
    title: "IA Moodboard & Direction Visuelle â€” KEKELI Creative Agency",
    description: "Palette, typographie, rÃ©fÃ©rences esthÃ©tiques et guide de contenu â€” gÃ©nÃ©rÃ© par IA pour ta direction visuelle.",
    url: "/artistes/moodboard",
  },
};

export default async function MoodboardPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/espace-client/login?next=/artistes/moodboard");
  return <MoodboardClient />;
}
