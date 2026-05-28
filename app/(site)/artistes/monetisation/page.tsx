import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Check, Coins, TrendingUp, Shield, DollarSign, Music2, Globe, Clock } from "lucide-react";
import FadeIn, { FadeInStagger, FadeInItem } from "@/components/animations/FadeIn";
import MonetisationForm from "@/components/monetisation/MonetisationForm";

export const metadata: Metadata = {
  title: "Monétisation Musicale — YouTube, SODAV, Droits d'auteur",
  description:
    "Activez la monétisation YouTube, récupérez vos droits SODAV/SACEM et vivez de votre musique. KEKELI Creative Agency accompagne les artistes sénégalais dans la gestion de tous leurs revenus musicaux.",
  keywords: ["monétisation YouTube Sénégal", "droits d'auteur SODAV", "SACEM artiste africain", "revenus streaming Dakar", "Content ID YouTube", "vivre de sa musique Afrique"],
  alternates: { canonical: "/artistes/monetisation" },
  openGraph: {
    title: "Monétisation musicale — YouTube & Droits d'auteur — KEKELI Creative Agency",
    description: "YouTube, SODAV, SACEM, Content ID — KEKELI Creative Agency vous aide à activer tous vos revenus musicaux.",
    url: "/artistes/monetisation",
  },
};

/* ── Données ─────────────────────────────────── */
const services = [
  {
    icon: "▶️",
    title: "Monétisation YouTube",
    color: "#16A34A",
    desc: "Activation et optimisation complète de votre chaîne YouTube pour commencer à percevoir des revenus publicitaires.",
    includes: [
      "Vérification des critères d'éligibilité",
      "Activation du Programme Partenaire YouTube",
      "Configuration Content ID pour protéger vos musiques",
      "Optimisation SEO des titres, descriptions et tags",
      "Stratégie de croissance d'abonnés",
      "Suivi des revenus et analytics",
    ],
  },
  {
    icon: "🎵",
    title: "Monétisation Plateformes",
    color: "#16A34A",
    desc: "Activation et suivi des revenus sur toutes les plateformes : Boomplay, TikTok Creator Fund, Facebook Sound Collection.",
    includes: [
      "Activation TikTok Creator Fund",
      "Facebook / Instagram Reels monetization",
      "Boomplay artiste premium",
      "Récupération revenus non collectés",
      "Tableau de bord unifié des revenus",
      "Optimisation des métadonnées par plateforme",
    ],
  },
  {
    icon: "⚖️",
    title: "Inscription SODAV",
    color: "#16A34A",
    desc: "Accompagnement complet pour votre inscription à la SODAV (Société Sénégalaise du Droit d'Auteur et des Droits Voisins).",
    includes: [
      "Constitution du dossier d'inscription",
      "Déclaration de vos œuvres",
      "Suivi du processus d'affiliation",
      "Récupération des droits en attente",
      "Gestion des droits de reproduction",
      "Droits de radiodiffusion et streaming",
    ],
  },
  {
    icon: "🌍",
    title: "Droits internationaux — SACEM & Co.",
    color: "#16A34A",
    desc: "Affiliation aux sociétés de gestion collective internationales pour percevoir vos droits partout dans le monde.",
    includes: [
      "Affiliation SACEM (France / international)",
      "Accords de réciprocité SODAV–SACEM",
      "Droits de synchronisation (films, pubs, séries)",
      "Récupération droits streaming international",
      "Gestion des droits voisins (interprètes)",
      "Conseil sur la structure juridique optimale",
    ],
  },
];

const processSteps = [
  { step: "01", icon: "📋", title: "Audit de votre situation",    desc: "On analyse votre catalogue, vos plateformes actives et les droits déjà enregistrés pour identifier les revenus manquants." },
  { step: "02", icon: "📂", title: "Constitution des dossiers",   desc: "On prépare tous les documents nécessaires : déclarations d'œuvres, demandes d'affiliation, formulaires SODAV/SACEM." },
  { step: "03", icon: "🔗", title: "Activation & enregistrement", desc: "Soumission des dossiers, activation des comptes et mise en place du Content ID pour vos musiques." },
  { step: "04", icon: "💰", title: "Collecte des revenus",        desc: "Vos droits commencent à être collectés. On surveille et on vous reporte tous les revenus perçus." },
  { step: "05", icon: "📈", title: "Optimisation continue",       desc: "Stratégie pour augmenter vos revenus : plus de vues, plus de droits déclarés, plus de plateformes activées." },
];

const revenueStreams = [
  { emoji: "📺", name: "Revenus publicitaires YouTube",   desc: "Publicités diffusées avant et pendant vos vidéos" },
  { emoji: "🎧", name: "Royalties streaming",             desc: "Spotify, Apple Music, Boomplay, Deezer et 40+ plateformes" },
  { emoji: "⚖️", name: "Droits SODAV / SACEM",           desc: "Radiodiffusion, exécution publique, reproduction" },
  { emoji: "🎬", name: "Droits de synchronisation",       desc: "Placement de votre musique dans des films, pubs et séries" },
  { emoji: "📱", name: "TikTok & Réseaux sociaux",        desc: "Creator Fund, Brand deals, musiques utilisées en viral" },
  { emoji: "🔒", name: "Content ID & Protection",        desc: "Monétisation des vidéos qui utilisent votre musique sans autorisation" },
];

const whyKekeli = [
  { icon: Shield,     title: "Expertise locale",      desc: "Connaissance approfondie du système SODAV et des procédures sénégalaises. On parle la même langue que les administrations." },
  { icon: Globe,      title: "Portée internationale", desc: "Accords avec SACEM et 120+ sociétés mondiales pour collecter vos droits partout où votre musique est diffusée." },
  { icon: DollarSign, title: "Revenus optimisés",     desc: "On identifie tous les droits non perçus et on met en place les outils pour maximiser chaque source de revenus." },
  { icon: TrendingUp, title: "Croissance durable",    desc: "Stratégie long terme : augmenter votre catalogue, votre audience, et donc vos revenus mois après mois." },
  { icon: Music2,     title: "Tous styles acceptés",  desc: "Mbalax, afrobeats, rap, gospel, jazz — on accompagne tous les genres musicaux sans discrimination." },
  { icon: Clock,      title: "Suivi mensuel",         desc: "Rapport mensuel clair sur tous vos revenus, plateformes et droits collectés. Vous êtes toujours au courant." },
];

export default function MonetisationPage() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────── */}
      <section
        className="relative py-32 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #08060F 0%, #130A28 35%, #1C0A40 60%, #0A0618 100%)" }}
      >
        {/* Blobs */}
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[160px] opacity-22" style={{ background: "#16A34A" }} />
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-[130px] opacity-18" style={{ background: "#059669" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full blur-[100px] opacity-12" style={{ background: "#C8A84B" }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <FadeIn direction="down" className="mb-8">
            <nav className="flex items-center gap-2 text-xs font-body" style={{ color: "rgba(220,210,255,0.45)" }}>
              <Link href="/" className="hover:text-gold transition-colors">Accueil</Link>
              <ChevronRight size={12} />
              <Link href="/artistes" className="hover:text-gold transition-colors">Artistes</Link>
              <ChevronRight size={12} />
              <span style={{ color: "rgba(220,210,255,0.70)" }}>Monétisation</span>
            </nav>
          </FadeIn>

          <div className="max-w-3xl">
            <FadeIn direction="up" delay={0.05}>
              <span className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full mb-6 font-body text-xs font-semibold uppercase tracking-[0.14em]" style={{ border: "1px solid rgba(22,163,74,0.35)", background: "rgba(22,163,74,0.10)", color: "#4ADE80" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                Monétisation musicale · KEKELI Creative Agency
              </span>
            </FadeIn>

            <FadeIn direction="up" delay={0.12}>
              <h1 className="font-body font-bold text-5xl sm:text-6xl lg:text-[4rem] leading-[1.08] text-white mb-6">
                Vivez enfin de<br />
                <span style={{ color: "#4ADE80" }}>votre musique</span>
              </h1>
            </FadeIn>

            <FadeIn direction="up" delay={0.22}>
              <p className="font-body text-lg leading-relaxed mb-8 max-w-xl" style={{ color: "rgba(220,210,255,0.70)" }}>
                YouTube, SODAV, SACEM, Content ID — KEKELI Creative Agency active et optimise toutes vos
                sources de revenus musicaux. Récupérez les droits que vous perdez chaque jour.
              </p>
            </FadeIn>

            <FadeIn direction="up" delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="#formulaire"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-body font-bold text-base text-white transition-all hover:scale-105"
                  style={{ background: "linear-gradient(135deg, #16A34A 0%, #059669 100%)", boxShadow: "0 8px 30px rgba(22,163,74,0.40)" }}
                >
                  <Coins size={18} />
                  Activer mes revenus
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

      {/* ── SOURCES DE REVENUS ─────────────────────────── */}
      <section className="py-16" style={{ background: "#08060F" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" className="text-center mb-10">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-2">Ce que vous manquez peut-être</p>
            <h2 className="font-display text-3xl text-white">6 sources de revenus à activer</h2>
          </FadeIn>
          <FadeInStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {revenueStreams.map((r) => (
              <FadeInItem key={r.name}>
                <div
                  className="flex items-start gap-3 p-4 rounded-2xl"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <span className="text-2xl shrink-0">{r.emoji}</span>
                  <div>
                    <p className="font-body font-semibold text-white text-sm mb-1">{r.name}</p>
                    <p className="font-body text-xs leading-relaxed" style={{ color: "rgba(220,210,255,0.50)" }}>{r.desc}</p>
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
              Nos services de <em className="text-gold not-italic">monétisation</em>
            </h2>
            <p className="font-body text-base text-text-muted mt-4 max-w-xl mx-auto">
              Tarifs sur devis — chaque situation est unique. Remplissez le formulaire pour un audit gratuit.
            </p>
          </FadeIn>
          <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((s) => (
              <FadeInItem key={s.title}>
                <div className="h-full bg-white rounded-2xl p-6 flex flex-col" style={{ boxShadow: "0 4px 20px rgba(180,140,20,0.10)" }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl" style={{ background: `${s.color}15` }}>
                      {s.icon}
                    </div>
                    <h3 className="font-body font-bold text-text-primary text-base leading-snug">{s.title}</h3>
                  </div>
                  <p className="font-body text-xs text-text-muted leading-relaxed mb-4">{s.desc}</p>
                  <div className="space-y-1.5 flex-1">
                    {s.includes.map((item) => (
                      <div key={item} className="flex items-start gap-2">
                        <Check size={12} className="mt-0.5 shrink-0" style={{ color: s.color }} />
                        <span className="font-body text-xs text-text-secondary">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-border">
                    <a href="#formulaire" className="font-body text-xs font-semibold transition-colors" style={{ color: s.color }}>
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
      <section className="py-24" style={{ background: "#0A0618" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" className="text-center mb-14">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-3">Comment on travaille</p>
            <h2 className="font-display text-4xl md:text-5xl text-white leading-tight">
              De zéro à des <em className="text-gold not-italic">revenus réguliers</em>
            </h2>
          </FadeIn>
          <FadeInStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {processSteps.map((s) => (
              <FadeInItem key={s.step}>
                <div className="flex flex-col p-5 rounded-2xl h-full" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-body font-bold text-[10px] tracking-[0.2em]" style={{ color: "#16A34A" }}>{s.step}</span>
                    <span className="text-xl">{s.icon}</span>
                  </div>
                  <h3 className="font-body font-bold text-white text-sm mb-2">{s.title}</h3>
                  <p className="font-body text-xs leading-relaxed" style={{ color: "rgba(220,210,255,0.50)" }}>{s.desc}</p>
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
                <div className="flex gap-4 p-5 rounded-2xl bg-white" style={{ boxShadow: "0 4px 20px rgba(180,140,20,0.08)" }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(22,163,74,0.12)" }}>
                    <Icon size={18} style={{ color: "#16A34A" }} />
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
        style={{ background: "linear-gradient(135deg, #08060F 0%, #130A28 35%, #1C0A40 60%, #0A0618 100%)" }}
      >
        {/* Blobs */}
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 rounded-full blur-[140px] opacity-18" style={{ background: "#16A34A" }} />
          <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full blur-[120px] opacity-12" style={{ background: "#059669" }} />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" className="text-center mb-12">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: "#4ADE80" }}>Audit gratuit</p>
            <h2 className="font-display text-4xl md:text-5xl text-white leading-tight mb-4">
              Commencez à <em className="text-gold not-italic">gagner</em>
            </h2>
            <p className="font-body text-base" style={{ color: "rgba(220,210,255,0.60)" }}>
              Remplissez le formulaire pour un audit gratuit de votre situation. Notre équipe vous répond sous 24h avec un plan d'action et un devis personnalisé.
            </p>
          </FadeIn>

          <FadeIn direction="up" delay={0.15}>
            <div className="rounded-3xl p-6 sm:p-10" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.10)", backdropFilter: "blur(12px)" }}>
              <MonetisationForm />
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
