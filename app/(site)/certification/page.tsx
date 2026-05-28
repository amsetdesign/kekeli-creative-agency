import type { Metadata } from "next";
import CertificationClient from "@/components/certification/CertificationClient";

export const metadata: Metadata = {
  title: "Certification Artiste | KEKELI Creative Agency",
  description: "Générez votre certificat officiel KEKELI Creative Agency et partagez votre niveau artistique avec votre communauté.",
  keywords: ["certification artiste Dakar", "badge artiste KEKELI", "niveau artistique Sénégal", "certificat musique Afrique"],
  alternates: { canonical: "/certification" },
  openGraph: {
    title: "Certification Artiste — KEKELI Creative Agency",
    description: "Obtenez votre certificat officiel et partagez votre niveau artistique avec votre communauté.",
    url: "/certification",
  },
};

export default function CertificationPage() {
  return <CertificationClient />;
}
