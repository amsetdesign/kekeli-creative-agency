import Link from "next/link";
import { CheckCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Paiement confirmé — KEKELI Creative Agency",
  robots: { index: false },
};

export default function GuideSuccesPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4" style={{ background: "#0C0B09" }}>
      <div className="text-center max-w-md">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ background: "rgba(16,185,129,0.12)", border: "2px solid #10B981" }}
        >
          <CheckCircle size={38} className="text-emerald-400" />
        </div>
        <h1 className="font-display text-3xl text-white font-bold mb-3">
          Paiement confirmé !
        </h1>
        <p className="font-body text-base leading-relaxed mb-2" style={{ color: "rgba(255,255,255,0.60)" }}>
          Merci pour votre achat. Votre guide vous sera envoyé par email dans quelques minutes.
        </p>
        <p className="font-body text-sm mb-8" style={{ color: "rgba(255,255,255,0.30)" }}>
          Vérifiez vos spams si vous ne recevez rien.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-body font-bold text-sm text-black transition-opacity hover:opacity-85"
          style={{ background: "#C8A84B" }}
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </main>
  );
}
