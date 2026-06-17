import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, TrendingUp, Check, ArrowRight } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import EntreprisesForm from "@/components/entreprises/EntreprisesForm";

export const metadata: Metadata = {
  title: "Stratégie Digitale & Croissance Entreprise — KEKELI Creative Agency Dakar",
  description: "Stratégie digitale complète, audit de marque et plan de croissance pour les entreprises à Dakar. Positionnez-vous comme leader dans votre secteur.",
  alternates: { canonical: "/entreprises/strategie" },
};

const COLOR = "#059669";

const services = [
  { title: "Audit Digital Complet", desc: "Analyse de votre présence digitale actuelle et identification des axes d'amélioration prioritaires.", items: ["Audit site web", "Analyse réseaux sociaux", "Veille concurrentielle", "Rapport détaillé"] },
  { title: "Stratégie de Contenu", desc: "Plan éditorial aligné à vos objectifs business pour attirer et convertir votre audience cible.", items: ["Personas clients", "Calendrier éditorial", "Formats adaptés", "Ligne éditoriale"] },
  { title: "Branding Réseaux Sociaux", desc: "Cohérence visuelle et tonale sur tous vos canaux digitaux pour une image de marque forte.", items: ["Guide de marque digital", "Templates unifiés", "Charte éditoriale", "Ton & voice"] },
  { title: "Growth Roadmap", desc: "Plan de croissance structuré sur 90 jours avec des objectifs mesurables et des actions concrètes.", items: ["Objectifs SMART", "Plan 30/60/90 jours", "KPIs & métriques", "Suivi mensuel"] },
];

const process = [
  { n: "01", title: "Diagnostic", desc: "Où en êtes-vous aujourd'hui ? Analyse complète de votre situation digitale." },
  { n: "02", title: "Objectifs", desc: "Définition des cibles business : clients, revenus, notoriété." },
  { n: "03", title: "Stratégie", desc: "Construction du plan d'action sur-mesure selon vos ressources." },
  { n: "04", title: "Exécution", desc: "Mise en œuvre des actions avec suivi et ajustements." },
  { n: "05", title: "Mesure", desc: "Bilan mensuel des résultats et nouvelles recommandations." },
];

export default function StrategiePage() {
  return (
    <>
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
              <span className="text-white/70">Stratégie & Croissance</span>
            </nav>
          </FadeIn>
          <FadeIn direction="up" delay={0.1}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${COLOR}22` }}>
                <TrendingUp size={20} style={{ color: COLOR }} />
              </div>
              <p className="font-body text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: COLOR }}>Stratégie & Croissance</p>
            </div>
            <h1 className="font-display text-5xl sm:text-6xl text-white leading-tight mb-4">
              Une stratégie claire<br /><em className="not-italic" style={{ color: COLOR }}>pour dominer votre marché.</em>
            </h1>
            <p className="font-body text-lg text-white/50 max-w-xl mb-8">
              Audit digital, stratégie de contenu et growth roadmap — un plan d'action sur-mesure pour faire croître votre entreprise durablement.
            </p>
            <Link href="#contact" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-body font-semibold text-sm text-black"
              style={{ background: "linear-gradient(135deg, #C8A84B 0%, #D4A83A 100%)", boxShadow: "0 6px 20px rgba(200,168,75,0.35)" }}>
              Définir ma stratégie <ArrowRight size={16} />
            </Link>
          </FadeIn>
        </div>
      </section>

      <section className="py-20" style={{ background: "#F7F4EE" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" className="mb-12 text-center">
            <h2 className="font-display text-3xl md:text-4xl text-[#0C0B09]">Nos solutions <span style={{ color: COLOR }}>stratégiques</span></h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map(({ title, desc, items }) => (
              <div key={title} className="bg-white rounded-2xl p-7" style={{ border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}>
                <h3 className="font-display text-xl text-[#0C0B09] mb-2">{title}</h3>
                <p className="font-body text-sm text-[#78716C] mb-4">{desc}</p>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li key={item} className="flex items-center gap-2 font-body text-sm text-[#57534E]">
                      <Check size={14} style={{ color: COLOR }} />{item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0C0B09]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" className="mb-12 text-center">
            <h2 className="font-display text-3xl md:text-4xl text-white">Notre <span style={{ color: COLOR }}>méthode</span></h2>
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
