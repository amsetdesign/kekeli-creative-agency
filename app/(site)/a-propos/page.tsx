import type { Metadata } from "next";
import AProposContent from "@/components/about/AProposContent";

export const metadata: Metadata = {
  title: "À Propos",
  description:
    "KEKELI signifie 'lumière' en langue Ewe. Découvrez l'histoire, les valeurs et l'équipe de KEKELI Creative Agency, agence de communication à Dakar, Sénégal.",
  keywords: ["KEKELI signification", "agence communication histoire", "équipe créative Dakar", "valeurs agence Sénégal", "agence communication africaine"],
  alternates: { canonical: "/a-propos" },
  openGraph: {
    title: "À Propos — KEKELI Creative Agency",
    description: "KEKELI signifie lumière en langue Ewe. Notre mission : mettre la lumière sur votre projet.",
    url: "/a-propos",
  },
};

export default function AProposPage() {
  return <AProposContent />;
}
