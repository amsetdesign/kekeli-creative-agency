import type { Metadata } from "next";
import EntreprisesHero from "@/components/entreprises/EntreprisesHero";
import EntreprisesServices from "@/components/entreprises/EntreprisesServices";
import EntreprisesOutils from "@/components/entreprises/EntreprisesOutils";
import EntreprisesPacks from "@/components/entreprises/EntreprisesPacks";
import EntreprisesForm from "@/components/entreprises/EntreprisesForm";

export const metadata: Metadata = {
  title: "Solutions Entreprises — KEKELI Creative Agency Dakar",
  description:
    "Branding, site web, community management, publicité ciblée et coaching digital pour les PME et entreprises à Dakar. KEKELI Creative Agency vous aide à devenir visible et rentable.",
  keywords: ["agence digitale entreprise Dakar", "branding PME Sénégal", "site web entreprise Dakar", "community management Dakar", "publicité Facebook Dakar"],
  alternates: { canonical: "/entreprises" },
  openGraph: {
    title: "Solutions Entreprises — KEKELI Creative Agency",
    description: "Branding, site web, réseaux sociaux et publicité pour les PME de Dakar.",
    url: "/entreprises",
  },
};

export default function EntreprisesPage() {
  return (
    <>
      <EntreprisesHero />
      <EntreprisesServices />
      <EntreprisesOutils />
      <EntreprisesPacks />
      <EntreprisesForm />
    </>
  );
}
