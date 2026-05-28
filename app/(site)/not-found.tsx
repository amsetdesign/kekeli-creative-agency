import Link from "next/link";
import { Home, MessageCircle } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-[calc(100vh-10rem)] flex items-center justify-center bg-[#FAFAF8] px-4">
      <div className="max-w-lg w-full text-center">
        {/* 404 display */}
        <div className="relative mb-8 inline-block">
          <p
            className="font-display text-[10rem] leading-none font-bold select-none"
            style={{
              background: "linear-gradient(135deg, #C8A84B 0%, rgba(200,168,75,0.15) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            404
          </p>
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-40 h-40 rounded-full blur-3xl opacity-20"
              style={{ background: "radial-gradient(circle, #C8A84B, transparent)" }}
            />
          </div>
        </div>

        <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-[#C8A84B] mb-3">
          Page introuvable
        </p>
        <h1 className="font-display text-4xl text-[#0C0B09] mb-4">
          Cette page est dans l&apos;ombre
        </h1>
        <p className="font-body text-[#78716C] leading-relaxed mb-10 max-w-sm mx-auto">
          Il semblerait que cette page n&apos;existe pas ou ait été déplacée.
          Laissez-nous vous guider vers la lumière.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#0C0B09] text-white px-6 py-3.5 rounded-xl font-body font-medium text-sm hover:bg-[#1c1917] transition-colors"
          >
            <Home size={15} />
            Retour à l&apos;accueil
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 border border-[#E7E5E4] text-[#0C0B09] px-6 py-3.5 rounded-xl font-body font-medium text-sm hover:border-[#C8A84B] hover:text-[#C8A84B] transition-colors"
          >
            <MessageCircle size={15} />
            Nous contacter
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-[#E7E5E4]">
          <p className="font-body text-xs text-[#A8A29E] mb-4">Vous cherchez peut-être&hellip;</p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { href: "/services", label: "Nos services" },
              { href: "/realisations", label: "Réalisations" },
              { href: "/sondage", label: "Audit gratuit" },
              { href: "/brief", label: "Brief Express" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="px-3 py-1.5 rounded-full border border-[#E7E5E4] text-xs font-body text-[#78716C] hover:border-[#C8A84B] hover:text-[#C8A84B] transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
