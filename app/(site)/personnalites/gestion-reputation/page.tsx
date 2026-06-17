import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Check, Shield } from "lucide-react";
import FadeIn, { FadeInStagger, FadeInItem } from "@/components/animations/FadeIn";
import PersonnalitesForm from "@/components/personnalites/PersonnalitesForm";

export const metadata: Metadata = {
  title: "Gestion de Réputation — E-réputation & Community Management VIP",
  description: "Protégez et renforcez votre image en ligne. Monitoring e-réputation, gestion de crise et community management premium pour personnalités — KEKELI Creative Agency, Dakar.",
  alternates: { canonical: "/personnalites/gestion-reputation" },
};

const ACCENT = "#10B981";

const services = [
  {
    emoji: "🔍", title: "Monitoring E-réputation",
    desc: "Surveillance 24/7 de tout ce qui se dit sur vous en ligne — réseaux sociaux, presse, forums, YouTube et Google.",
    includes: ["Alertes en temps réel sur vos mentions", "Rapport hebdomadaire de réputation", "Analyse du sentiment (positif / négatif)", "Veille sur la concurrence & les pairs"],
  },
  {
    emoji: "🛡️", title: "Protocole de Gestion de Crise",
    desc: "Un plan d'action prêt à l'emploi en cas de bad buzz, polémique ou attaque sur vos réseaux sociaux.",
    includes: ["Audit de vulnérabilité préventif", "Protocole de réponse en moins de 2h", "Messages types de communication de crise", "Accompagnement pendant la phase critique"],
  },
  {
    emoji: "💬", title: "Community Management VIP",
    desc: "Gestion professionnelle de vos commentaires et messages — réponses soignées, modération et engagement positif.",
    includes: ["Modération quotidienne des commentaires", "Réponses personnalisées aux messages clés", "Suppression des contenus inappropriés", "Reporting mensuel d'engagement"],
  },
  {
    emoji: "📣", title: "Relations Presse & Médias",
    desc: "Construction de votre présence média en ligne — articles, interviews, mentions positives pour renforcer votre crédibilité.",
    includes: ["Dossier de presse digital", "Prise de contact avec journalistes & blogueurs", "Placement d'articles & interviews", "Optimisation SEO de votre nom"],
  },
];

export default function GestionReputationPage() {
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
              <span style={{ color: "rgba(255,255,255,0.70)" }}>Gestion de Réputation</span>
            </nav>
          </FadeIn>
          <div className="max-w-3xl">
            <FadeIn direction="up" delay={0.05}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 font-body text-xs font-semibold uppercase tracking-[0.14em]"
                style={{ border: `1px solid ${ACCENT}55`, background: `${ACCENT}12`, color: ACCENT }}>
                <Shield size={12} /> Gestion de Réputation · E-réputation & Crise
              </span>
            </FadeIn>
            <FadeIn direction="up" delay={0.12}>
              <h1 className="font-body font-bold text-5xl sm:text-6xl text-white leading-tight mb-6">
                Protégez ce que<br />
                <span style={{ color: ACCENT }}>vous avez construit.</span>
              </h1>
            </FadeIn>
            <FadeIn direction="up" delay={0.22}>
              <p className="font-body text-lg leading-relaxed mb-8 max-w-xl" style={{ color: "rgba(255,255,255,0.65)" }}>
                Monitoring e-réputation, gestion de crise et community management premium — pour les personnalités
                qui ne peuvent pas se permettre de laisser leur image au hasard.
              </p>
            </FadeIn>
            <FadeIn direction="up" delay={0.30}>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="#formulaire" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-body font-bold text-base text-black transition-all hover:scale-105"
                  style={{ background: `linear-gradient(135deg, ${ACCENT} 0%, #059669 100%)`, boxShadow: `0 8px 30px ${ACCENT}40` }}>
                  Protéger ma réputation
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
            <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: "#059669" }}>Ce qu&apos;on protège</p>
            <h2 className="font-display text-4xl text-gray-900">Votre réputation, <em className="not-italic" style={{ color: ACCENT }}>notre priorité</em></h2>
          </FadeIn>
          <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((s) => (
              <FadeInItem key={s.title}>
                <div className="h-full bg-white rounded-2xl p-6 flex flex-col" style={{ boxShadow: `0 4px 20px ${ACCENT}14` }}>
                  <div className="text-3xl mb-3">{s.emoji}</div>
                  <h3 className="font-body font-bold text-gray-900 text-base mb-2">{s.title}</h3>
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
            ))}
          </FadeInStagger>
        </div>
      </section>

      <section id="formulaire" className="py-24 relative overflow-hidden" style={{ background: "#080D0B" }}>
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 rounded-full blur-[140px] opacity-14" style={{ background: ACCENT }} />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" className="text-center mb-10">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: ACCENT }}>Consultation gratuite</p>
            <h2 className="font-display text-4xl text-white mb-4">Sécurisons votre <em className="not-italic" style={{ color: ACCENT }}>e-réputation</em></h2>
            <p className="font-body text-sm" style={{ color: "rgba(255,255,255,0.50)" }}>Réponse sous 24h · Confidentiel · Sans engagement.</p>
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
