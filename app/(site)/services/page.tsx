import type { Metadata } from "next";
import ServicesContent from "@/components/services/ServicesContent";

export const metadata: Metadata = {
  title: "Nos Services — KEKELI Creative Agency Dakar",
  description:
    "Tous les services KEKELI : branding artiste, clips, photo shooting, community management, développement web, campagnes publicitaires, outils IA — à Dakar, Sénégal.",
  keywords: [
    "services agence communication Dakar", "branding artiste Sénégal", "développement web Dakar",
    "community management Dakar", "photo shooting professionnel", "campagnes publicitaires Afrique",
  ],
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return <ServicesContent />;
}
