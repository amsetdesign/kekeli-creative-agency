import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Check, Palette, FileText, Image, Layers } from "lucide-react";
import FadeIn, { FadeInStagger, FadeInItem } from "@/components/animations/FadeIn";
import PersonnalitesForm from "@/components/personnalites/PersonnalitesForm";

export const metadata: Metadata = {
  title: "Personal Branding — Logo, Charte & Identité Visuelle Personnelle",
  description: "Créez une marque personnelle forte et inoubliable. Logo, monogramme, charte graphique et kit complet pour coachs, PDG, entrepreneurs et influenceurs — KEKELI Creative Agency, Dakar.",
  alternates: { canonical: "/personnalites/personal-branding" },
};

const ACCENT = "#10B981";

const services = [
  {
    icon: Palette, emoji: "✏️", title: "Logo & Monogramme",
    desc: "Un logo personnel ou un monogramme élégant qui vous identifie immédiatement sur tous vos supports.",
    includes: ["Logo principal (3 propositions)", "Monogramme personnel", "Déclinaisons couleur", "Fichiers HD (PNG, SVG, PDF)"],
  },
  {
    icon: Image, emoji: "🎨", title: "Charte Graphique Personnelle",
    desc: "Palette de couleurs, typographies, pictogrammes — un système visuel cohérent pour toute votre communication.",
    includes: ["Palette de couleurs officielle", "Typographies principales & secondaires", "Règles d'utilisation", "Charte complète en PDF"],
  },
  {
    icon: FileText, emoji: "📱", title: "Templates Réseaux Sociaux",
    desc: "Posts, stories, bannières — des modèles prêts à l'emploi pour un feed professionnel sans effort.",
    includes: ["Posts Instagram & LinkedIn", "Stories & Reels templates", "Couverture YouTube & Facebook", "Livrés en Canva éditable"],
  },
  {
    icon: Layers, emoji: "💼", title: "Kit de Marque Complet",
    desc: "Signature email, carte de visite digitale, présentation PowerPoint — votre marque sur chaque point de contact.",
    includes: ["Signature email professionnelle", "Carte de visite digitale", "Template présentation (PPT/Canva)", "Guide d'utilisation complet"],
  },
];

export default function PersonalBrandingPage() {
  return (
    <>
      <section className="relative py-32 overflow-hidden" style={{ background: "#080D0B" }}>
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[480px] h-[480px] rounded-full blur-[160px] opacity-18" style={{ background: ACCENT }} />
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-[130px] opacity-12" style={{ background: "#059669" }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="down" className="mb-8">
            <nav className="flex items-center gap-2 text-xs font-body" style={{ color: "rgba(255,255,255,0.45)" }}>
              <Link href="/" className="hover:text-gold transition-colors">Accueil</Link>
              <ChevronRight size={12} />
              <Link href="/personnalites" className="hover:text-gold transition-colors">Personnalités</Link>
              <ChevronRight size={12} />
              <span style={{ color: "rgba(255,255,255,0.70)" }}>Personal Branding</span>
            </nav>
          </FadeIn>
          <div className="max-w-3xl">
            <FadeIn direction="up" delay={0.05}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 font-body text-xs font-semibold uppercase tracking-[0.14em]"
                style={{ border: `1px solid ${ACCENT}55`, background: `${ACCENT}12`, color: ACCENT }}>
                <Palette size={12} /> Personal Branding · Identité Visuelle
              </span>
            </FadeIn>
            <FadeIn direction="up" delay={0.12}>
              <h1 className="font-body font-bold text-5xl sm:text-6xl text-white leading-tight mb-6">
                Une identité visuelle<br />
                <span style={{ color: ACCENT }}>à votre image</span>
              </h1>
            </FadeIn>
            <FadeIn direction="up" delay={0.22}>
              <p className="font-body text-lg leading-relaxed mb-8 max-w-xl" style={{ color: "rgba(255,255,255,0.65)" }}>
                Logo personnel, monogramme, charte graphique et kit complet — KEKELI construit une identité visuelle forte
                qui vous rend reconnaissable au premier coup d&apos;œil.
              </p>
            </FadeIn>
            <FadeIn direction="up" delay={0.30}>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="#formulaire" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-body font-bold text-base text-black transition-all hover:scale-105"
                  style={{ background: `linear-gradient(135deg, ${ACCENT} 0%, #059669 100%)`, boxShadow: `0 8px 30px ${ACCENT}40` }}>
                  Créer mon identité
                </a>
                <Link href="/personnalites" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-body font-semibold text-base transition-all hover:bg-white/5"
                  style={{ border: "2px solid rgba(255,255,255,0.22)", color: "rgba(255,255,255,0.82)" }}>
                  Voir tous les services
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="py-24" style={{ background: "linear-gradient(160deg, #F0FDF4 0%, #ECFDF5 50%, #F0FDF4 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" className="text-center mb-14">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: "#059669" }}>Ce qu&apos;on crée</p>
            <h2 className="font-display text-4xl text-gray-900">Votre kit <em className="not-italic" style={{ color: ACCENT }}>Personal Brand</em></h2>
          </FadeIn>
          <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((s) => {
              const Icon = s.icon;
              return (
                <FadeInItem key={s.title}>
                  <div className="h-full bg-white rounded-2xl p-6 flex flex-col" style={{ boxShadow: `0 4px 20px ${ACCENT}14` }}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl" style={{ background: `${ACCENT}15` }}>{s.emoji}</div>
                      <h3 className="font-body font-bold text-gray-900 text-base">{s.title}</h3>
                    </div>
                    <p className="font-body text-xs text-gray-500 leading-relaxed mb-4">{s.desc}</p>
                    <div className="space-y-1.5 flex-1">
                      {s.includes.map((item) => (
                        <div key={item} className="flex items-start gap-2">
                          <Check size={12} className="mt-0.5 shrink-0" style={{ color: ACCENT }} />
                          <span className="font-body text-xs text-gray-600">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeInItem>
              );
            })}
          </FadeInStagger>
        </div>
      </section>

      <section id="formulaire" className="py-24 relative overflow-hidden" style={{ background: "#080D0B" }}>
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 rounded-full blur-[140px] opacity-14" style={{ background: ACCENT }} />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" className="text-center mb-10">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: ACCENT }}>Commencer</p>
            <h2 className="font-display text-4xl text-white mb-4">Construisons votre <em className="not-italic" style={{ color: ACCENT }}>identité</em></h2>
            <p className="font-body text-sm" style={{ color: "rgba(255,255,255,0.50)" }}>Notre équipe vous répond sous 24h avec une proposition et un devis personnalisé.</p>
          </FadeIn>
          <FadeIn direction="up" delay={0.15}>
            <div className="rounded-3xl p-6 sm:p-10" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)" }}>
              <PersonnalitesForm />
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
