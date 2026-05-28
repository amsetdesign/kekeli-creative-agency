import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import ProjectsGrid from "@/components/realisations/ProjectsGrid";

export const metadata: Metadata = {
  title: "Nos Réalisations",
  description:
    "Découvrez les projets réalisés par KEKELI Creative Agency : sites web, événements, communication artistes, branding et campagnes digitales à Dakar.",
  keywords: ["portfolio agence communication Dakar", "Sunu Impact Festival", "Galsen Gospel Urbain", "projets web Sénégal", "réalisations digitales"],
  alternates: { canonical: "/realisations" },
  openGraph: {
    title: "Nos Réalisations — KEKELI Creative Agency",
    description: "Sunu Impact Festival, Galsen Gospel Urbain et bien d'autres projets réalisés à Dakar.",
    url: "/realisations",
  },
};

export default function RealisationsPage() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────── */}
      <section className="relative min-h-[40vh] flex items-end pb-16 overflow-hidden bg-bg-dark">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1600&h=900&q=70&auto=format&fit=crop"
            alt="Nos réalisations — KEKELI Creative Agency"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/70 to-bg-dark/30" />
        </div>

        {/* Grain texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Breadcrumb */}
          <FadeIn direction="down" className="mb-6">
            <nav className="flex items-center gap-2 text-xs font-body text-text-on-dark/50">
              <Link href="/" className="hover:text-gold transition-colors">Accueil</Link>
              <ChevronRight size={12} />
              <span className="text-text-on-dark/80">Réalisations</span>
            </nav>
          </FadeIn>

          <FadeIn direction="up" delay={0.1}>
            <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-4">
              Portfolio
            </p>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-text-on-dark leading-tight mb-4">
              Nos <em className="text-gold not-italic">réalisations</em>
            </h1>
            <p className="font-body text-lg text-text-on-dark/60 max-w-xl">
              Chaque projet, une lumière révélée.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── FILTRES + GRILLE ──────────────────────────── */}
      <ProjectsGrid />

    </>
  );
}
