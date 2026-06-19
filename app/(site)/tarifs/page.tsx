import type { Metadata } from "next";
import TarifsClient from "@/components/tarifs/TarifsClient";

export const metadata: Metadata = {
  title: "Tarifs",
  description:
    "Découvrez les tarifs de KEKELI Creative Agency à Dakar — branding, clips vidéo, photo, community management, site web. Fourchettes indicatives en FCFA. Devis gratuit sous 24h.",
  keywords: [
    "tarifs agence communication Dakar",
    "prix branding Sénégal",
    "coût clip vidéo Dakar",
    "tarif site web Afrique",
    "devis agence digitale",
    "tarifs community management Dakar",
    "prix identité visuelle Sénégal",
  ],
  alternates: { canonical: "/tarifs" },
  openGraph: {
    title: "Tarifs KEKELI Creative Agency — Artistes & Entreprises",
    description:
      "Tarifs transparents adaptés au marché africain. Branding, clips, photo, web, community management. Devis gratuit sous 24h.",
    url: "/tarifs",
  },
};

export default function TarifsPage() {
  return <TarifsClient />;
}
