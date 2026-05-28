import type { Metadata } from "next";
import ImpactClient from "@/components/impact/ImpactClient";

export const metadata: Metadata = {
  title: "Impact Mondial | KEKELI Creative Agency",
  description: "De Dakar au monde entier — découvrez l'impact de KEKELI Creative Agency sur la scène musicale africaine et internationale.",
  keywords: ["impact agence communication Dakar", "rayonnement artistique Afrique", "artistes africains international", "musique Sénégal monde", "KEKELI impact"],
  alternates: { canonical: "/impact" },
  openGraph: {
    title: "Impact Mondial — KEKELI Creative Agency",
    description: "De Dakar au monde entier — l'impact de KEKELI sur la scène musicale africaine et internationale.",
    url: "/impact",
  },
};

export default function ImpactPage() {
  return <ImpactClient />;
}
