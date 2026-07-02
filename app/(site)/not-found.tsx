import Link from "next/link";
import { Home, MessageCircle } from "lucide-react";

export default function NotFound() {
  return (
    <main
      className="min-h-screen flex items-center justify-center relative overflow-hidden px-4"
      style={{ background: "#0C0B09" }}
    >
      {/* Atmospheric glows */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-[140px] opacity-20"
          style={{ background: "#C8A84B" }} />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full blur-[120px] opacity-10"
          style={{ background: "#8B5CF6" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-[100px] opacity-8"
          style={{ background: "#C8A84B" }} />
      </div>

      <div className="relative z-10 max-w-lg w-full text-center">
        {/* 404 */}
        <p
          className="font-display text-[9rem] md:text-[11rem] leading-none font-bold select-none"
          style={{
            background: "linear-gradient(135deg, #C8A84B 0%, rgba(200,168,75,0.18) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          404
        </p>

        <span
          className="inline-block px-4 py-1.5 text-xs font-body font-semibold uppercase tracking-[0.18em] rounded-full mb-5"
          style={{ color: "#C8A84B", border: "1px solid rgba(200,168,75,0.30)", background: "rgba(200,168,75,0.08)" }}
        >
          Page introuvable
        </span>

        <h1 className="font-display text-4xl md:text-5xl text-white mb-4 leading-tight">
          Cette page est<br />
          <em className="not-italic" style={{ color: "#C8A84B" }}>dans l&apos;ombre</em>
        </h1>

        <p className="font-body text-base mb-10 max-w-sm mx-auto leading-relaxed"
          style={{ color: "rgba(255,255,255,0.50)" }}>
          Cette page n&apos;existe pas ou a été déplacée.<br />
          Laissez-nous vous guider vers la lumière.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-body font-semibold text-sm text-black transition-all hover:brightness-110 active:scale-95"
            style={{ background: "linear-gradient(135deg, #C8A84B 0%, #D4A83A 100%)", boxShadow: "0 4px 20px rgba(200,168,75,0.30)" }}
          >
            <Home size={15} />
            Retour à l&apos;accueil
          </Link>
          <a
            href="https://wa.me/221765289111"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-body font-medium text-sm transition-all hover:border-gold/60"
            style={{ border: "1px solid rgba(200,168,75,0.30)", color: "rgba(255,255,255,0.80)" }}
          >
            <MessageCircle size={15} style={{ color: "#C8A84B" }} />
            Nous contacter
          </a>
        </div>

        {/* Quick links */}
        <div className="pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <p className="font-body text-xs mb-4" style={{ color: "rgba(255,255,255,0.30)" }}>
            Vous cherchez peut-être&hellip;
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { href: "/artistes",   label: "Artistes" },
              { href: "/entreprises", label: "Entreprises" },
              { href: "/tarifs",     label: "Tarifs" },
              { href: "/sondage",    label: "Audit gratuit" },
              { href: "/brief",      label: "Brief Express" },
              { href: "/realisations", label: "Réalisations" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="px-3 py-1.5 rounded-full text-xs font-body transition-all hover:text-white"
                style={{ border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.45)" }}
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
