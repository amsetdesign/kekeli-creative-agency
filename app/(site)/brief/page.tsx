import type { Metadata } from "next";
import BriefWizard from "@/components/brief/BriefWizard";
import PaymentBadges from "@/components/ui/PaymentBadges";

export const metadata: Metadata = {
  title: "Brief Express — Parlez-nous de votre projet",
  description:
    "Décrivez votre projet en 4 étapes. Recevez une estimation immédiate sur WhatsApp. Réponse KEKELI Creative Agency sous 30 minutes.",
  keywords: ["brief projet agence", "devis rapide Dakar", "demande devis express", "agence digitale Sénégal"],
  alternates: { canonical: "/brief" },
  openGraph: {
    title: "Brief Express — KEKELI Creative Agency",
    description: "4 questions · Estimation immédiate · Réponse WhatsApp sous 30 minutes.",
    url: "/brief",
  },
};

export default function BriefPage() {
  return (
    <main style={{ background: "#0C0B09" }} className="min-h-screen relative overflow-hidden">
      {/* Blobs */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[140px] opacity-15" style={{ background: "#C8A84B" }} />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-[120px] opacity-10" style={{ background: "#C8A84B" }} />
      </div>

      {/* Header */}
      <div className="relative z-10 text-center pt-20 pb-6 px-4">
        <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest uppercase rounded-full mb-5" style={{ color: "#C8A84B", border: "1px solid rgba(200,168,75,0.30)", background: "rgba(200,168,75,0.08)" }}>
          Brief Express
        </span>
        <h1 className="font-display text-4xl md:text-5xl text-white leading-tight">
          Votre projet en <span style={{ color: "#C8A84B" }}>4 étapes</span>
        </h1>
        <p className="mt-3 text-base max-w-md mx-auto font-body" style={{ color: "rgba(220,210,255,0.60)" }}>
          Dites-nous ce dont vous avez besoin. Nous vous répondons sur WhatsApp dans les 30 minutes.
        </p>
        <PaymentBadges className="mt-5" />
      </div>

      <div className="relative z-10">
        <BriefWizard />
      </div>
    </main>
  );
}
