import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Megaphone, Check, ArrowRight } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import EntreprisesForm from "@/components/entreprises/EntreprisesForm";

export const metadata: Metadata = {
  title: "Campagnes Publicitaires Facebook Instagram Google — KEKELI Creative Agency Dakar",
  description: "Campagnes Facebook Ads, Instagram Ads, TikTok Ads et Google Ads pour les PME à Dakar. Ciblage local, visuels sur-mesure et optimisation ROI.",
  alternates: { canonical: "/entreprises/publicite" },
};

const COLOR = "#F97316";

const services = [
  { title: "Facebook & Instagram Ads", desc: "Campagnes publicitaires ciblées sur les deux plateformes les plus utilisées au Sénégal.", items: ["Ciblage géographique Dakar", "Audiences lookalike", "Visuels publicitaires", "Optimisation continue"] },
  { title: "TikTok Ads", desc: "Publicités vidéo sur TikTok pour toucher une audience jeune et engagée.", items: ["Vidéos publicitaires", "In-feed ads", "Branded hashtag", "Suivi conversions"] },
  { title: "Google Ads", desc: "Apparaissez en tête des résultats Google quand vos clients vous cherchent.", items: ["Search campaigns", "Display ads", "YouTube ads", "Remarketing"] },
  { title: "Reporting & Optimisation", desc: "Suivi hebdomadaire et optimisation continue pour maximiser votre retour sur investissement.", items: ["Rapport hebdomadaire", "A/B testing visuels", "Ajustement ciblage", "Analyse ROAS"] },
];

const process = [
  { n: "01", title: "Audit", desc: "Analyse de votre situation actuelle et définition des objectifs publicitaires." },
  { n: "02", title: "Stratégie", desc: "Choix des plateformes, budgets et messages selon votre cible." },
  { n: "03", title: "Création", desc: "Design des visuels et rédaction des textes publicitaires." },
  { n: "04", title: "Lancement", desc: "Mise en ligne des campagnes avec tracking et pixels installés." },
  { n: "05", title: "Optimisation", desc: "Suivi quotidien, A/B testing et optimisation pour maximiser le ROI." },
];

export default function PublicitePage() {
  return (
    <>
      <section className="relative min-h-[45vh] flex items-end pb-16 overflow-hidden" style={{ background: "#050A14" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/3 w-96 h-96 rounded-full opacity-20" style={{ background: `radial-gradient(circle, ${COLOR} 0%, transparent 70%)`, filter: "blur(80px)" }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <FadeIn direction="down" className="mb-6">
            <nav className="flex items-center gap-2 text-xs font-body text-white/40">
              <Link href="/" className="hover:text-white/70 transition-colors">Accueil</Link>
              <ChevronRight size={12} />
              <Link href="/entreprises" className="hover:text-white/70 transition-colors">Entreprises</Link>
              <ChevronRight size={12} />
              <span className="text-white/70">Campagnes Publicitaires</span>
            </nav>
          </FadeIn>
          <FadeIn direction="up" delay={0.1}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${COLOR}22` }}>
                <Megaphone size={20} style={{ color: COLOR }} />
              </div>
              <p className="font-body text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: COLOR }}>Campagnes Publicitaires</p>
            </div>
            <h1 className="font-display text-5xl sm:text-6xl text-white leading-tight mb-4">
              Publicité intelligente,<br /><em className="not-italic" style={{ color: COLOR }}>résultats mesurables.</em>
            </h1>
            <p className="font-body text-lg text-white/50 max-w-xl mb-8">
              Facebook, Instagram, TikTok et Google Ads — des campagnes ciblées qui attirent vos clients idéaux et maximisent votre retour sur investissement.
            </p>
            <Link href="#contact" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-body font-semibold text-sm text-black"
              style={{ background: "linear-gradient(135deg, #C8A84B 0%, #D4A83A 100%)" }}>
              Lancer ma campagne <ArrowRight size={16} />
            </Link>
          </FadeIn>
        </div>
      </section>

      <section className="py-20" style={{ background: "#F7F4EE" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" className="mb-12 text-center">
            <h2 className="font-display text-3xl md:text-4xl text-[#0C0B09]">Plateformes <span style={{ color: COLOR }}>publicitaires</span></h2>
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
            <h2 className="font-display text-3xl md:text-4xl text-white">Notre <span style={{ color: COLOR }}>approche</span></h2>
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
