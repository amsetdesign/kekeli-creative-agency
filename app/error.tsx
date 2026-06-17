"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center"
      style={{ background: "#FAFAF8" }}>
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
        style={{ background: "rgba(200,168,75,0.12)", border: "1px solid rgba(200,168,75,0.25)" }}>
        <span className="font-display font-bold text-2xl" style={{ color: "#C8A84B" }}>K</span>
      </div>
      <h1 className="font-display text-2xl font-bold text-[#0C0B09] mb-2">Une erreur est survenue</h1>
      <p className="font-body text-sm text-[#78716C] mb-8 max-w-sm">
        Quelque chose s&apos;est mal passé. Réessayez ou revenez à l&apos;accueil.
      </p>
      <div className="flex items-center gap-3">
        <button onClick={reset}
          className="px-5 py-2.5 rounded-xl font-body text-sm font-semibold transition-opacity hover:opacity-80"
          style={{ background: "#C8A84B", color: "#0C0B09" }}>
          Réessayer
        </button>
        <Link href="/"
          className="px-5 py-2.5 rounded-xl font-body text-sm font-medium transition-colors hover:bg-[#E7E5E4]"
          style={{ background: "#F0EDE6", color: "#44403C" }}>
          Accueil
        </Link>
      </div>
    </div>
  );
}
