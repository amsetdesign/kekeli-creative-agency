import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Building2, Check, ArrowRight } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import EntreprisesForm from "@/components/entreprises/EntreprisesForm";

export const metadata: Metadata = {
  title: "Identité Visuelle & Branding Entreprise — KEKELI Creative Agency Dakar",
  description: "Logo professionnel, charte graphique et identité visuelle complète pour les entreprises à Dakar. Créez une image de marque forte qui inspire confiance.",
  alternates: { canonical: "/entreprises/branding" },
};

const COLOR = "#1E40AF";

const services = [
  { title: "Logo Professionnel", desc: "Création d'un logo unique, mémorable et déclinable sur tous les supports.", items: ["Concept & moodboard", "3 propositions créatives", "Révisions incluses", "Fichiers HD (SVG, PNG, PDF)"] },
  { title: "Charte Graphique", desc: "Guide complet pour une communication visuelle cohérente et professionnelle.", items: ["Palette couleurs", "Typographies officielles", "Règles d'usage logo", "Exemples d'application"] },
  { title: "Templates Réseaux Sociaux", desc: "Pack de visuels prêts à l'emploi pour vos publications Instagram, Facebook et LinkedIn.", items: ["20+ templates personnalisés", "Formats stories & posts", "Fichiers éditables", "Livraison Canva ou Figma"] },
  { title: "Supports Print", desc: "Cartes de visite, flyers, brochures et affiches au design professionnel.", items: ["Cartes de visite", "Flyers A4/A5", "Brochures pliées", "Fichiers print-ready"] },
];

const process = [
  { n: "01", title: "Brief & Discovery", desc: "On explore votre univers, vos valeurs et vos concurrents pour définir le positionnement idéal." },
  { n: "02", title: "Moodboard & Concept", desc: "Sélection des directions créatives, palettes et inspirations visuelles." },
  { n: "03", title: "Création", desc: "Design du logo, de la charte et de tous les supports définis ensemble." },
  { n: "04", title: "Révisions", desc: "Ajustements jusqu'à votre pleine satisfaction." },
  { n: "05", title: "Livraison", desc: "Tous vos fichiers organisés, prêts à l'emploi sur tous supports." },
];

export default function BrandingPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[45vh] flex items-end pb-16 overflow-hidden" style={{ background: "#050A14" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-20" style={{ background: `radial-gradient(circle, ${COLOR} 0%, transparent 70%)`, filter: "blur(80px)" }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <FadeIn direction="down" className="mb-6">
            <nav className="flex items-center gap-2 text-xs font-body text-white/40">
              <Link href="/" className="hover:text-white/70 transition-colors">Accueil</Link>
              <ChevronRight size={12} />
              <Link href="/entreprises" className="hover:text-white/70 transition-colors">Entreprises</Link>
              <ChevronRight size={12} />
              <span className="text-white/70">Identité & Branding</span>
            </nav>
          </FadeIn>
          <FadeIn direction="up" delay={0.1}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${COLOR}22` }}>
                <Building2 size={20} style={{ color: COLOR }} />
              </div>
              <p className="font-body text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: COLOR }}>Identité Visuelle & Branding</p>
            </div>
            <h1 className="font-display text-5xl sm:text-6xl text-white leading-tight mb-4">
              Une image de marque<br /><em className="not-italic" style={{ color: COLOR }}>qui inspire confiance.</em>
            </h1>
            <p className="font-body text-lg text-white/50 max-w-xl mb-8">
              Logo, charte graphique et templates — tout ce qu'il faut pour que votre entreprise soit immédiatement reconnue comme professionnelle.
            </p>
            <Link href="#contact" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-body font-semibold text-sm text-black"
              style={{ background: "linear-gradient(135deg, #C8A84B 0%, #D4A83A 100%)" }}>
              Démarrer mon branding <ArrowRight size={16} />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Services */}
      <section className="py-20" style={{ background: "#F7F4EE" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" className="mb-12 text-center">
            <h2 className="font-display text-3xl md:text-4xl text-[#0C0B09]">Ce que nous créons <span style={{ color: COLOR }}>pour vous</span></h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map(({ title, desc, items }) => (
              <div key={title} className="bg-white rounded-2xl p-7" style={{ border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}>
                <h3 className="font-display text-xl text-[#0C0B09] mb-2">{title}</h3>
                <p className="font-body text-sm text-[#78716C] mb-4">{desc}</p>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li key={item} className="flex items-center gap-2 font-body text-sm text-[#57534E]">
                      <Check size={14} style={{ color: COLOR }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-[#0C0B09]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" className="mb-12 text-center">
            <h2 className="font-display text-3xl md:text-4xl text-white">Notre <span style={{ color: COLOR }}>processus</span></h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
            {process.map(({ n, title, desc }) => (
              <FadeIn key={n} direction="up" delay={parseInt(n) * 0.08}>
                <div className="p-5 rounded-2xl" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
                  <span className="font-display text-3xl font-bold mb-3 block" style={{ color: `${COLOR}60` }}>{n}</span>
                  <h3 className="font-display text-base text-white mb-2">{title}</h3>
                  <p className="font-body text-xs text-white/40 leading-relaxed">{desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <EntreprisesForm />
    </>
  );
}
