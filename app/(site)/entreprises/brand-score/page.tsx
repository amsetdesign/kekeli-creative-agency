import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-ssr";
import BrandScoreClient from "@/components/entreprises/BrandScoreClient";

export const metadata: Metadata = {
  title: "Brand Score — Évaluez votre image de marque | KEKELI Creative Agency",
  description: "Répondez à 10 questions et obtenez votre Brand Score : diagnostic complet de votre image de marque avec recommandations personnalisées.",
  alternates: { canonical: "/entreprises/brand-score" },
};

export default async function BrandScorePage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/espace-client/login?next=/entreprises/brand-score");
  return <BrandScoreClient />;
}
