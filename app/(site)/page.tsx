import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";
import ServicesGrid from "@/components/sections/ServicesGrid";
import AudienceSection from "@/components/sections/AudienceSection";

// Lazy-load below-fold sections — only Hero + ServicesGrid load immediately
const KELIBanner     = dynamic(() => import("@/components/sections/KELIBanner"));
const IAToolsSection = dynamic(() => import("@/components/sections/IAToolsSection"));
const PortfolioPreview = dynamic(() => import("@/components/sections/PortfolioPreview"));
const BooksDownload  = dynamic(() => import("@/components/sections/BooksDownload"));
const SondageTeaser  = dynamic(() => import("@/components/sections/SondageTeaser"));
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
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://kekelicreativeagency.com/#website",
      url: "https://kekelicreativeagency.com",
      name: "KEKELI Creative Agency",
      description: "Agence de communication créative à Dakar, Sénégal",
      inLanguage: "fr-SN",
      publisher: { "@id": "https://kekelicreativeagency.com/#organization" },
    },
    {
      "@type": ["LocalBusiness", "MarketingAgency"],
      "@id": "https://kekelicreativeagency.com/#organization",
      name: "KEKELI Creative Agency",
      alternateName: "KEKELI Agency",
      description: "Agence de communication créative basée à Dakar. Branding, stratégie digitale, photo & vidéo, développement web et campagnes publicitaires pour artistes, entreprises et événements en Afrique de l'Ouest.",
      url: "https://kekelicreativeagency.com",
      logo: {
        "@type": "ImageObject",
        url: "https://kekelicreativeagency.com/images/logo-kekeli.png",
        width: 512,
        height: 512,
      },
      image: "https://kekelicreativeagency.com/images/logo-horizontal-dark.png",
      email: "contact@kekelicreativeagency.com",
      priceRange: "$$",
      currenciesAccepted: "XOF",
      paymentAccepted: "Wave, Orange Money",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Dakar",
        addressRegion: "Dakar",
        addressCountry: "SN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 14.6937,
        longitude: -17.4441,
      },
      areaServed: [
        { "@type": "Country", name: "Sénégal" },
        { "@type": "Country", name: "Côte d'Ivoire" },
        { "@type": "Country", name: "France" },
      ],
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
        opens: "09:00",
        closes: "18:00",
      },
      knowsLanguage: ["French", "Wolof", "English"],
      sameAs: [
        "https://www.instagram.com/kekeli_agency",
        "https://www.facebook.com/kekelicreativeagency",
        "https://www.linkedin.com/company/kekeli-creative-agency",
        "https://www.youtube.com/@kekelicreativeagency",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: "contact@kekelicreativeagency.com",
        availableLanguage: ["French", "Wolof"],
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Services KEKELI Creative Agency",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Branding Artiste", description: "Logo, identité visuelle et direction artistique pour artistes africains" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Photo & Vidéo Professionnelle", description: "Shooting photo, clips vidéo et couverture événementielle" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Développement Web & Applications", description: "Sites vitrine, e-commerce, applications mobile iOS & Android" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Community Management", description: "Gestion réseaux sociaux, contenu et engagement" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Campagnes Publicitaires", description: "Facebook Ads, Instagram Ads, TikTok Ads et Google Ads" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Stratégie Digitale & Croissance", description: "Audit digital, content strategy et growth roadmap" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Distribution Musicale", description: "Distribution sur Spotify, Apple Music, Boomplay et +" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Site Web & Digitalisation", description: "Vitrine, e-commerce et espace client" } },
        ],
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <AudienceSection />
      <ServicesGrid />
      <KELIBanner />
      <IAToolsSection />
      <PortfolioPreview />
      <BooksDownload />
      <SondageTeaser />
      <ContactCTA />
    </>
  );
}
