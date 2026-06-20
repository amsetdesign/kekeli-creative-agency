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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": "https://kekelicreativeagency.com/a-propos/#webpage",
  url: "https://kekelicreativeagency.com/a-propos",
  name: "À Propos — KEKELI Creative Agency",
  description: "KEKELI signifie lumière en langue Ewe. Découvrez l'histoire, les valeurs et la mission de KEKELI Creative Agency, agence de communication créative à Dakar, Sénégal.",
  inLanguage: "fr-SN",
  isPartOf: { "@id": "https://kekelicreativeagency.com/#website" },
  about: {
    "@type": ["Organization", "MarketingAgency"],
    "@id": "https://kekelicreativeagency.com/#organization",
    name: "KEKELI Creative Agency",
    alternateName: "KEKELI Agency",
    description: "Agence de communication créative basée à Dakar, Sénégal. KEKELI signifie 'lumière' en langue Ewe — notre mission est de mettre la lumière sur vos projets.",
    url: "https://kekelicreativeagency.com",
    logo: {
      "@type": "ImageObject",
      url: "https://kekelicreativeagency.com/images/logo-kekeli.png",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dakar",
      addressCountry: "SN",
    },
    sameAs: [
      "https://www.instagram.com/kekeli_agency",
      "https://www.facebook.com/kekelicreativeagency",
      "https://www.linkedin.com/company/kekeli-creative-agency",
      "https://www.youtube.com/@kekelicreativeagency",
    ],
  },
};

export default function AProposPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AProposContent />
    </>
  );
}
