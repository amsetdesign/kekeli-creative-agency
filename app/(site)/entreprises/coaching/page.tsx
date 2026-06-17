import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, GraduationCap, Check, ArrowRight, CalendarDays, BookOpen, TrendingUp, MessageCircle } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import EntreprisesForm from "@/components/entreprises/EntreprisesForm";

export const metadata: Metadata = {
  title: "Business Coach 2 Mois — Accompagnement Digital Entreprise — KEKELI Creative Agency Dakar",
  description: "Programme d'accompagnement et formation digitale sur 2 mois pour les PME à Dakar. Suivi hebdomadaire, coaching visibilité et formation réseaux sociaux.",
  alternates: { canonical: "/entreprises/coaching" },
};

const COLOR = "#0891B2";

const modules = [
  { icon: CalendarDays, title: "Suivi Hebdomadaire", desc: "Appel stratégie chaque semaine pour faire le point, ajuster et rester sur la bonne trajectoire.", items: ["Appel visio 1h/semaine", "Compte-rendu écrit", "Objectifs hebdomadaires", "Accès direct WhatsApp"] },
  { icon: BookOpen, title: "Formation Pratique", desc: "Maîtrisez les outils et plateformes essentiels pour votre communication digitale.", items: ["Instagram Business", "Facebook Business Manager", "TikTok for Business", "Publicité en ligne"] },
  { icon: TrendingUp, title: "Coaching Visibilité", desc: "Apprenez à publier efficacement, attirer des clients et améliorer votre présence digitale.", items: ["Stratégie contenu", "Création de reels", "Optimisation profils", "Analyse des stats"] },
  { icon: MessageCircle, title: "Accompagnement Quotidien", desc: "Disponibles pour répondre à vos questions, corriger vos contenus et partager des idées au quotidien.", items: ["Réponses sous 24h", "Correction contenus", "Idées de publication", "Suivi des résultats"] },
];

const weeks = [
  { period: "Semaine 1-2", title: "Diagnostic & Fondations", desc: "Audit complet, définition des objectifs et mise en place des bases." },
  { period: "Semaine 3-4", title: "Branding & Contenu", desc: "Création de l'identité visuelle digitale et des premiers contenus." },
  { period: "Semaine 5-6", title: "Publication & Engagement", desc: "Stratégie de publication, croissance audience et gestion communauté." },
  { period: "Semaine 7-8", title: "Publicité & Croissance", desc: "Lancement des premières campagnes publicitaires et optimisation." },
];

export default function CoachingPage() {
  return (
    <>
      <section className="relative min-h-[45vh] flex items-end pb-16 overflow-hidden" style={{ background: "#050A14" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-96 h-96 rounded-full opacity-20" style={{ background: `radial-gradient(circle, ${COLOR} 0%, transparent 70%)`, filter: "blur(80px)" }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <FadeIn direction="down" className="mb-6">
            <nav className="flex items-center gap-2 text-xs font-body text-white/40">
              <Link href="/" className="hover:text-white/70 transition-colors">Accueil</Link>
              <ChevronRight size={12} />
              <Link href="/entreprises" className="hover:text-white/70 transition-colors">Entreprises</Link>
              <ChevronRight size={12} />
              <span className="text-white/70">Business Coach 2 Mois</span>
            </nav>
          </FadeIn>
          <FadeIn direction="up" delay={0.1}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${COLOR}22` }}>
                <GraduationCap size={20} style={{ color: COLOR }} />
              </div>
              <p className="font-body text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: COLOR }}>Business Coach · 2 Mois</p>
            </div>
            <h1 className="font-display text-5xl sm:text-6xl text-white leading-tight mb-4">
              Maîtrisez votre<br /><em className="not-italic" style={{ color: COLOR }}>communication digitale.</em>
            </h1>
            <p className="font-body text-lg text-white/50 max-w-xl mb-8">
              8 semaines d'accompagnement intensif : formation, coaching, suivi quotidien — pour que vous soyez autonome et performant sur vos réseaux sociaux.
            </p>
            <Link href="#contact" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-body font-semibold text-sm text-black"
              style={{ background: "linear-gradient(135deg, #C8A84B 0%, #D4A83A 100%)" }}>
              Rejoindre le programme <ArrowRight size={16} />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Programme */}
      <section className="py-20" style={{ background: "#F7F4EE" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" className="mb-12 text-center">
            <h2 className="font-display text-3xl md:text-4xl text-[#0C0B09]">Ce que comprend <span style={{ color: COLOR }}>le programme</span></h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {modules.map(({ icon: Icon, title, desc, items }) => (
              <div key={title} className="bg-white rounded-2xl p-7" style={{ border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: `${COLOR}15` }}>
                  <Icon size={20} style={{ color: COLOR }} />
                </div>
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

      {/* Timeline 8 semaines */}
      <section className="py-20 bg-[#0C0B09]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" className="mb-12 text-center">
            <h2 className="font-display text-3xl md:text-4xl text-white">Les <span style={{ color: COLOR }}>8 semaines</span> du programme</h2>
          </FadeIn>
          <div className="space-y-4">
            {weeks.map(({ period, title, desc }, i) => (
              <FadeIn key={period} direction="up" delay={i * 0.1}>
                <div className="flex gap-5 p-6 rounded-2xl" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
                  <div className="shrink-0 px-4 py-2 rounded-xl text-center" style={{ background: `${COLOR}15` }}>
                    <p className="font-body text-[10px] text-white/40 uppercase tracking-wider">Phase</p>
                    <p className="font-display text-lg font-bold" style={{ color: COLOR }}>{i + 1}</p>
                  </div>
                  <div>
                    <p className="font-body text-xs text-white/35 mb-0.5">{period}</p>
                    <h3 className="font-display text-lg text-white mb-1">{title}</h3>
                    <p className="font-body text-sm text-white/45">{desc}</p>
                  </div>
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
