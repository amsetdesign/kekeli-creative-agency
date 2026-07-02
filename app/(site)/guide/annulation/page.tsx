import Link from "next/link";
import { XCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Paiement annulé — KEKELI Creative Agency",
  robots: { index: false },
};

export default function GuideAnnulationPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4" style={{ background: "#0C0B09" }}>
      <div className="text-center max-w-md">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ background: "rgba(239,68,68,0.12)", border: "2px solid #EF4444" }}
        >
          <XCircle size={38} className="text-red-400" />
        </div>
        <h1 className="font-display text-3xl text-white font-bold mb-3">
          Paiement annulé
        </h1>
        <p className="font-body text-base leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.55)" }}>
          Votre paiement n&apos;a pas été finalisé. Vous pouvez réessayer à tout moment.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/#livres"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-body font-bold text-sm text-black transition-opacity hover:opacity-85"
            style={{ background: "#C8A84B" }}
          >
            Réessayer
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-body font-bold text-sm transition-colors"
            style={{ border: "1px solid rgba(255,255,255,0.20)", color: "rgba(255,255,255,0.70)" }}
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </main>
  );
}
