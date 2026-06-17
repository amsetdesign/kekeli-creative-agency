import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Check, TrendingUp, BarChart2, Calendar, Rocket, Target, Zap, Eye, Globe } from "lucide-react";
import FadeIn, { FadeInStagger, FadeInItem } from "@/components/animations/FadeIn";
import StrategieForm from "@/components/strategie/StrategieForm";

export const metadata: Metadata = {
  title: "Stratégie Digitale Artiste — Réseaux Sociaux & Croissance",
  description:
    "Audit réseaux sociaux, planning éditorial, croissance d'audience et stratégie de lancement. KEKELI Creative Agency développe votre visibilité digitale sur Instagram, TikTok, YouTube et toutes les plateformes.",
  keywords: ["stratégie digitale artiste Sénégal", "réseaux sociaux musique Dakar", "croissance Instagram artiste africain", "TikTok musique Sénégal", "lancement single digital Dakar"],
  alternates: { canonical: "/artistes/strategie" },
  openGraph: {
    title: "Stratégie Digitale Artiste — Réseaux & Croissance — KEKELI Creative Agency",
    description: "Audit, planning éditorial, croissance et stratégie de lancement pour artistes à Dakar.",
    url: "/artistes/strategie",
  },
};

const ACCENT = "#4C9BFF";
const ACCENT_LIGHT = "#93C5FD";

const services = [
  {
    emoji: "🔍",
    title: "Audit & Stratégie réseaux sociaux",
    desc: "On analyse votre présence digitale actuelle et on bâtit un plan d'action concret, plateforme par plateforme, adapté à votre audience.",
    includes: [
      "Audit complet de vos comptes actuels",
      "Analyse de vos statistiques et tendances",
      "Benchmark par rapport à votre genre musical",
      "Stratégie par plateforme (Instagram, TikTok, YouTube...)",
      "Recommandations de formats et formats prioritaires",
      "Rapport d'audit PDF livré sous 72h",
    ],
  },
  {
    emoji: "📅",
    title: "Planning éditorial",
    desc: "Un calendrier de contenu mensuel prêt à l'emploi — quoi poster, quand, dans quel format, avec quels hashtags et quel ton.",
    includes: [
      "Calendrier mensuel complet (30 jours)",
      "Idées de contenu par jour et par plateforme",
      "Templates de légendes et CTAs",
      "Stratégie hashtags optimisée",
      "Créneaux horaires de publication",
      "Mise à jour selon les sorties musicales",
    ],
  },
  {
    emoji: "📈",
    title: "Croissance d'audience",
    desc: "Des stratégies concrètes et éthiques pour faire croître vos abonnés et votre engagement de façon durable sur chaque réseau.",
    includes: [
      "Stratégie de croissance organique",
      "Optimisation des profils et bios",
      "Stratégie de collaborations et features",
      "Techniques d'engagement communautaire",
      "Viral loops et formats à fort potentiel",
      "Suivi mensuel des KPIs et ajustements",
    ],
  },
  {
    emoji: "🚀",
    title: "Stratégie de lancement",
    desc: "Un plan digital complet de J-30 à J+30 pour maximiser l'impact de votre prochaine sortie musicale.",
    includes: [
      "Timeline de lancement semaine par semaine",
      "Teasing et pre-save strategy",
      "Contenu de lancement (Reels, TikTok, Stories)",
      "Coordination avec la distribution",
      "Pitch Spotify Editorial inclus",
      "Rapport de performance post-lancement",
    ],
  },
];

const plateformesStats = [
  { emoji: "📸", name: "Instagram",   desc: "Reels, Stories, Carrousels — le format roi pour les artistes" },
  { emoji: "🎵", name: "TikTok",      desc: "Sons viraux, challenges, duets — l'algorithme le plus puissant" },
  { emoji: "▶️", name: "YouTube",     desc: "Clips, Shorts, lives — la plateforme de référence musicale" },
  { emoji: "🔊", name: "Boomplay",    desc: "La plateforme n°1 en Afrique — incontournable pour le marché local" },
  { emoji: "💙", name: "Facebook",    desc: "Communauté, événements, publicité ciblée Afrique" },
  { emoji: "🎧", name: "Spotify",     desc: "Playlists, Spotify for Artists, pitch éditorial" },
];

const processSteps = [
  { step: "01", icon: "🔍", title: "Audit digital",       desc: "Analyse complète de votre présence actuelle : comptes, stats, contenu, audience et positionnement." },
  { step: "02", icon: "🗺️", title: "Stratégie sur mesure", desc: "Plan d'action personnalisé avec des objectifs chiffrés et un calendrier réaliste." },
  { step: "03", icon: "📅", title: "Planning & contenu",  desc: "Calendrier éditorial mensuel, idées de contenu et templates prêts à utiliser." },
  { step: "04", icon: "🚀", title: "Mise en ligne",       desc: "Publication, optimisation en temps réel et gestion des interactions communautaires." },
  { step: "05", icon: "📊", title: "Analyse & rapport",  desc: "Rapport mensuel de performance avec recommandations pour le mois suivant." },
];

const whyKekeli = [
  { icon: Target,    title: "Stratégie, pas hasard",    desc: "Chaque post est pensé pour servir un objectif précis. Fini de poster dans le vide sans résultat." },
  { icon: Globe,     title: "Connaissance du marché",   desc: "On connaît les codes de l'audience musicale africaine — ce qui fait vibrer, ce qui fait scroller." },
  { icon: BarChart2, title: "Pilotage par les données", desc: "Décisions basées sur vos stats réelles, pas sur des intuitions. On sait ce qui marche pour vous." },
  { icon: Zap,       title: "Contenu prêt à l'emploi",  desc: "Idées, textes, formats, horaires — vous n'avez plus qu'à publier ou on le fait pour vous." },
  { icon: Eye,       title: "Cohérence totale",         desc: "Votre stratégie digitale est alignée avec votre musique, votre branding et vos sorties." },
  { icon: TrendingUp, title: "Résultats mesurables",    desc: "Vous voyez vos progrès mois après mois. Abonnés, vues, streams — tout est suivi et reporté." },
];

const chiffres = [
  { value: "6+",     label: "Plateformes couvertes par notre stratégie" },
  { value: "30j",    label: "Planning éditorial complet livré chaque mois" },
  { value: "J-30",   label: "Préparation avant chaque lancement musical" },
  { value: "24h",    label: "Réponse après votre demande d'audit" },
];

export default function StrategiePage() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────── */}
      <section
        className="relative py-32 overflow-hidden"
        style={{ background: "#0C0B09" }}
      >
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[160px] opacity-22" style={{ background: ACCENT }} />
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-[130px] opacity-16" style={{ background: "#1D6FD8" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full blur-[100px] opacity-10" style={{ background: "#C8A84B" }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="down" className="mb-8">
            <nav className="flex items-center gap-2 text-xs font-body" style={{ color: "rgba(255,255,255,0.45)" }}>
              <Link href="/" className="hover:text-gold transition-colors">Accueil</Link>
              <ChevronRight size={12} />
              <Link href="/artistes" className="hover:text-gold transition-colors">Artistes</Link>
              <ChevronRight size={12} />
              <span style={{ color: "rgba(255,255,255,0.70)" }}>Stratégie Digitale</span>
            </nav>
          </FadeIn>

          <div className="max-w-3xl">
            <FadeIn direction="up" delay={0.05}>
              <span className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full mb-6 font-body text-xs font-semibold uppercase tracking-[0.14em]" style={{ border: "1px solid rgba(76,155,255,0.35)", background: "rgba(76,155,255,0.10)", color: ACCENT_LIGHT }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: ACCENT_LIGHT }} />
                Stratégie Digitale · KEKELI Creative Agency
              </span>
            </FadeIn>

            <FadeIn direction="up" delay={0.12}>
              <h1 className="font-body font-bold text-5xl sm:text-6xl lg:text-[4rem] leading-[1.08] text-white mb-6">
                Votre musique vue<br />
                <span style={{ color: ACCENT_LIGHT }}>par des millions</span>
              </h1>
            </FadeIn>

            <FadeIn direction="up" delay={0.22}>
              <p className="font-body text-lg leading-relaxed mb-8 max-w-xl" style={{ color: "rgba(255,255,255,0.70)" }}>
                Audit réseaux, planning éditorial, croissance d'audience et stratégie de lancement —
                KEKELI Creative Agency transforme votre présence digitale en machine à fans sur Instagram,
                TikTok, YouTube et toutes les plateformes africaines.
              </p>
            </FadeIn>

            <FadeIn direction="up" delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="#formulaire"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-body font-bold text-base text-white transition-all hover:scale-105"
                  style={{ background: "linear-gradient(135deg, #4C9BFF 0%, #1D6FD8 100%)", boxShadow: "0 8px 30px rgba(76,155,255,0.40)" }}
                >
                  <TrendingUp size={18} />
                  Demander mon audit
                </a>
                <a
                  href="#services"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-body font-semibold text-base transition-all"
                  style={{ border: "2px solid rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.85)" }}
                >
                  Voir les services
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── CHIFFRES CLÉS ───────────────────────────────── */}
      <section className="py-16" style={{ background: "#08060F" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInStagger className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {chiffres.map((c) => (
              <FadeInItem key={c.value}>
                <div className="text-center p-6 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <p className="font-body font-bold text-3xl mb-2" style={{ color: ACCENT }}>{c.value}</p>
                  <p className="font-body text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>{c.label}</p>
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* ── PLATEFORMES ─────────────────────────────────── */}
      <section className="py-16" style={{ background: "#0A0618" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" className="text-center mb-10">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-2">Partout où se trouve votre audience</p>
            <h2 className="font-display text-3xl text-white">6 plateformes, 1 stratégie cohérente</h2>
          </FadeIn>
          <FadeInStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {plateformesStats.map((p) => (
              <FadeInItem key={p.name}>
                <div className="flex items-start gap-3 p-4 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <span className="text-2xl shrink-0">{p.emoji}</span>
                  <div>
                    <p className="font-body font-semibold text-white text-sm mb-1">{p.name}</p>
                    <p className="font-body text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.50)" }}>{p.desc}</p>
                  </div>
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* ── NOS SERVICES ────────────────────────────────── */}
      <section id="services" className="py-24" style={{ background: "linear-gradient(160deg, #FBF6EC 0%, #F5EDD8 50%, #FAF4E8 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" className="text-center mb-14">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-3">Ce qu'on fait pour vous</p>
            <h2 className="font-display text-4xl md:text-5xl text-text-primary leading-tight">
              Nos services de <em className="text-gold not-italic">stratégie digitale</em>
            </h2>
            <p className="font-body text-base text-text-muted mt-4 max-w-xl mx-auto">
              Tarifs sur devis après un audit gratuit de votre situation actuelle.
            </p>
          </FadeIn>
          <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((s) => (
              <FadeInItem key={s.title}>
                <div className="h-full bg-white rounded-2xl p-6 flex flex-col" style={{ boxShadow: "0 4px 20px rgba(76,155,255,0.08)" }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0" style={{ background: "rgba(76,155,255,0.10)" }}>
                      {s.emoji}
                    </div>
                    <h3 className="font-body font-bold text-text-primary text-base leading-snug">{s.title}</h3>
                  </div>
                  <p className="font-body text-xs text-text-muted leading-relaxed mb-4">{s.desc}</p>
                  <div className="space-y-1.5 flex-1">
                    {s.includes.map((item) => (
                      <div key={item} className="flex items-start gap-2">
                        <Check size={12} className="mt-0.5 shrink-0" style={{ color: ACCENT }} />
                        <span className="font-body text-xs text-text-secondary">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-border">
                    <a href="#formulaire" className="font-body text-xs font-semibold" style={{ color: ACCENT }}>
                      Demander un devis →
                    </a>
                  </div>
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* ── PROCESSUS ─────────────────────────────────── */}
      <section className="py-24" style={{ background: "#08060F" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" className="text-center mb-14">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-3">Notre méthode</p>
            <h2 className="font-display text-4xl md:text-5xl text-white leading-tight">
              De l'audit à la <em className="text-gold not-italic">croissance réelle</em>
            </h2>
          </FadeIn>
          <FadeInStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {processSteps.map((s) => (
              <FadeInItem key={s.step}>
                <div className="flex flex-col p-5 rounded-2xl h-full" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-body font-bold text-[10px] tracking-[0.2em]" style={{ color: ACCENT_LIGHT }}>{s.step}</span>
                    <span className="text-xl">{s.icon}</span>
                  </div>
                  <h3 className="font-body font-bold text-white text-sm mb-2">{s.title}</h3>
                  <p className="font-body text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.50)" }}>{s.desc}</p>
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* ── POURQUOI KEKELI ────────────────────────────── */}
      <section className="py-24" style={{ background: "linear-gradient(160deg, #FBF6EC 0%, #F5EDD8 50%, #FAF4E8 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" className="text-center mb-14">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-3">Nos atouts</p>
            <h2 className="font-display text-4xl md:text-5xl text-text-primary leading-tight">
              Pourquoi choisir <em className="text-gold not-italic">KEKELI ?</em>
            </h2>
          </FadeIn>
          <FadeInStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whyKekeli.map(({ icon: Icon, title, desc }) => (
              <FadeInItem key={title}>
                <div className="flex gap-4 p-5 rounded-2xl bg-white" style={{ boxShadow: "0 4px 20px rgba(76,155,255,0.07)" }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(76,155,255,0.10)" }}>
                    <Icon size={18} style={{ color: ACCENT }} />
                  </div>
                  <div>
                    <p className="font-body font-semibold text-text-primary text-sm mb-1">{title}</p>
                    <p className="font-body text-xs leading-relaxed text-text-muted">{desc}</p>
                  </div>
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* ── FORMULAIRE ─────────────────────────────────── */}
      <section
        id="formulaire"
        className="py-24 relative overflow-hidden"
        style={{ background: "#0C0B09" }}
      >
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 rounded-full blur-[140px] opacity-18" style={{ background: ACCENT }} />
          <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full blur-[120px] opacity-12" style={{ background: "#1D6FD8" }} />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" className="text-center mb-12">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: ACCENT_LIGHT }}>Audit gratuit</p>
            <h2 className="font-display text-4xl md:text-5xl text-white leading-tight mb-4">
              Accélérez votre <em className="text-gold not-italic">croissance</em>
            </h2>
            <p className="font-body text-base" style={{ color: "rgba(255,255,255,0.60)" }}>
              Partagez votre situation digitale. Notre équipe vous répond sous 24h avec un audit de votre présence et un plan d'action concret.
            </p>
          </FadeIn>

          <FadeIn direction="up" delay={0.15}>
            <div className="rounded-3xl p-6 sm:p-10" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.10)", backdropFilter: "blur(12px)" }}>
              <StrategieForm />
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
