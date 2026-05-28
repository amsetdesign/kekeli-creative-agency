import type { Metadata } from "next";
import ContactContent from "@/components/contact/ContactContent";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez KEKELI Creative Agency à Dakar. Réponse garantie sous 24h pour tous vos projets de communication, web, photo ou stratégie digitale.",
  keywords: ["contacter agence communication Dakar", "devis site web Sénégal", "demande de devis", "contact agence digitale"],
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contactez KEKELI Creative Agency — Dakar",
    description: "Parlons de votre projet. Réponse garantie sous 24h.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
