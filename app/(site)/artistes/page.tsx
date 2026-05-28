import type { Metadata } from "next";
import ArtistesHero from "@/components/artistes/ArtistesHero";
import ArtistesStats from "@/components/artistes/ArtistesStats";
import ArtistesServices from "@/components/artistes/ArtistesServices";
import ArtistesRoadmap from "@/components/artistes/ArtistesRoadmap";
import ArtistesForm from "@/components/artistes/ArtistesForm";
import ArtisteCTA from "@/components/artistes/ArtisteCTA";

export const metadata: Metadata = {
  title: "Services Artistes",
  description:
    "KEKELI Creative Agency accompagne les artistes à Dakar et en Afrique : direction artistique, branding, clips, distribution musicale, stratégie digitale et monétisation.",
  keywords: [
    "services artistes Dakar",
    "direction artistique Sénégal",
    "branding artiste Afrique",
    "distribution musicale Afrique",
    "clip vidéo Dakar",
    "stratégie digitale artiste",
  ],
  alternates: { canonical: "/artistes" },
  openGraph: {
    title: "Services Artistes — KEKELI Creative Agency",
    description: "De la direction artistique à la monétisation, KEKELI Creative Agency vous accompagne à chaque étape de votre carrière.",
    url: "/artistes",
  },
};

/* ── Page ────────────────────────────────────────────── */
export default function ArtistesPage() {
  return (
    <>
      <ArtistesHero />
      <ArtistesStats />
      <ArtistesServices />
      <ArtistesRoadmap />
      <ArtistesForm />
      <ArtisteCTA />
    </>
  );
}
