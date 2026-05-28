import type { Metadata } from "next";
import SondageContent from "@/components/sondage/SondageContent";

export const metadata: Metadata = {
  title: "Audit de visibilité digitale gratuit",
  description:
    "Évaluez gratuitement votre présence digitale en 10 questions. Rapport personnalisé et recommandations d'experts offerts par KEKELI Creative Agency.",
  keywords: ["audit visibilité digitale gratuit", "sondage communication Dakar", "évaluer présence réseaux sociaux", "diagnostic digital Sénégal"],
  alternates: { canonical: "/sondage" },
  openGraph: {
    title: "Audit de visibilité digitale gratuit — KEKELI Creative Agency",
    description: "10 questions · Résultats immédiats · Rapport PDF offert. Quel est votre profil ?",
    url: "/sondage",
  },
};

export default function SondagePage() {
  return <SondageContent />;
}
