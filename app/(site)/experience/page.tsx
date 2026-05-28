import type { Metadata } from "next";
import ExperienceClient from "@/components/experience/ExperienceClient";

export const metadata: Metadata = {
  title: "L'Expérience KEKELI | KEKELI Creative Agency",
  description: "Une agence différente, une expérience unique. Découvrez comment KEKELI Creative Agency propulse les artistes africains vers leur plein potentiel.",
  keywords: ["expérience agence communication Dakar", "méthode KEKELI", "accompagnement artiste Sénégal", "agence créative africaine", "processus créatif Dakar"],
  alternates: { canonical: "/experience" },
  openGraph: {
    title: "L'Expérience KEKELI — KEKELI Creative Agency",
    description: "Une agence différente. Découvrez comment KEKELI propulse les artistes africains vers leur plein potentiel.",
    url: "/experience",
  },
};

export default function ExperiencePage() {
  return <ExperienceClient />;
}
