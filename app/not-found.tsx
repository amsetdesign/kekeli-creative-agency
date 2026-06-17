import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center"
      style={{ background: "#FAFAF8" }}>

      <div className="mb-8">
        <p className="font-display text-[120px] font-bold leading-none"
          style={{ color: "rgba(200,168,75,0.12)" }}>
          404
        </p>
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto -mt-12 mb-6"
          style={{ background: "rgba(200,168,75,0.12)", border: "1px solid rgba(200,168,75,0.25)" }}>
          <span className="font-display font-bold text-2xl" style={{ color: "#C8A84B" }}>K</span>
        </div>
        <h1 className="font-display text-2xl font-bold text-[#0C0B09] mb-2">
          Page introuvable
        </h1>
        <p className="font-body text-sm text-[#78716C] max-w-sm mx-auto">
          Cette page n&apos;existe pas ou a été déplacée. Revenez à l&apos;accueil ou explorez nos services.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-3">
        <Link href="/"
          className="px-6 py-3 rounded-xl font-body text-sm font-semibold transition-opacity hover:opacity-80"
          style={{ background: "#C8A84B", color: "#0C0B09" }}>
          Retour à l&apos;accueil
        </Link>
        <Link href="/contact"
          className="px-6 py-3 rounded-xl font-body text-sm font-medium transition-colors hover:bg-[#E7E5E4]"
          style={{ background: "#F0EDE6", color: "#44403C" }}>
          Nous contacter
        </Link>
      </div>

      <div className="mt-12 flex flex-wrap justify-center gap-4">
        {[
          { label: "Artistes", href: "/artistes" },
          { label: "Entreprises", href: "/entreprises" },
          { label: "Audit gratuit", href: "/sondage" },
          { label: "Brief projet", href: "/brief" },
        ].map(({ label, href }) => (
          <Link key={href} href={href}
            className="font-body text-xs text-[#A8A29E] hover:text-[#C8A84B] transition-colors underline underline-offset-2">
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}
