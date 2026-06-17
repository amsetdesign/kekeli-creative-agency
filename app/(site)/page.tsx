import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";
import ServicesGrid from "@/components/sections/ServicesGrid";

// Lazy-load below-fold sections — only Hero + ServicesGrid load immediately
const KELIBanner     = dynamic(() => import("@/components/sections/KELIBanner"));
const IAToolsSection = dynamic(() => import("@/components/sections/IAToolsSection"));
const PortfolioPreview = dynamic(() => import("@/components/sections/PortfolioPreview"));
const ProfileGuides  = dynamic(() => import("@/components/sections/ProfileGuides"));
const SondageTeaser  = dynamic(() => import("@/components/sections/SondageTeaser"));
const AboutQuick     = dynamic(() => import("@/components/sections/AboutQuick"));
const ContactCTA     = dynamic(() => import("@/components/sections/ContactCTA"));

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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://kekeli.agency/#business",
  name: "KEKELI Creative Agency",
  description: "Agence de communication basée à Dakar, Sénégal. Communication, stratégie digitale, photo & vidéo, branding et couverture événementielle.",
  url: "https://kekeli.agency",
  logo: "https://kekeli.agency/images/hero-portrait.jpg",
  image: "https://kekeli.agency/images/hero-portrait.jpg",
  email: "contact@kekeli.agency",
  telephone: "+221781672819",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dakar",
    addressCountry: "SN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 14.6937,
    longitude: -17.4441,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
    opens: "09:00",
    closes: "18:00",
  },
  sameAs: [
    "https://www.instagram.com/kekeli_agency",
    "https://www.facebook.com/kekelicreativeagency",
    "https://www.linkedin.com/company/kekeli-creative-agency",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services KEKELI Creative Agency",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Branding Artiste" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Développement Web" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Stratégie Digitale" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Photo & Vidéo" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Community Management" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Campagnes Publicitaires" } },
    ],
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
