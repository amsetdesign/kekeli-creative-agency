import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import KELIBanner from "@/components/sections/KELIBanner";
import ServicesGrid from "@/components/sections/ServicesGrid";
import PortfolioPreview from "@/components/sections/PortfolioPreview";
import ProfileGuides from "@/components/sections/ProfileGuides";
import SondageTeaser from "@/components/sections/SondageTeaser";
import AboutQuick from "@/components/sections/AboutQuick";
import ContactCTA from "@/components/sections/ContactCTA";
import IAToolsSection from "@/components/sections/IAToolsSection";

export const metadata: Metadata = {
  title: "KEKELI Creative Agency — Agence de communication à Dakar",
  description:
    "KEKELI Creative Agency accompagne les entreprises, artistes et événements à Dakar avec une communication percutante et une stratégie digitale d'impact.",
  keywords: ["agence communication Dakar", "agence digitale Sénégal", "stratégie digitale", "photo shooting", "développement web Dakar"],
  alternates: { canonical: "/" },
  openGraph: {
    title: "KEKELI Creative Agency — Agence de communication à Dakar",
    description: "Communication percutante et stratégie digitale d'impact à Dakar, Sénégal.",
    url: "/",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <KELIBanner />
      <IAToolsSection />
      <PortfolioPreview />
      <ProfileGuides />
      <SondageTeaser />
      <AboutQuick />
      <ContactCTA />
    </>
  );
}
