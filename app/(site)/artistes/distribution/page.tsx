import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Check, Music2, Headphones, Globe, TrendingUp, Shield, Clock, Star } from "lucide-react";
import FadeIn, { FadeInStagger, FadeInItem } from "@/components/animations/FadeIn";
import DistributionForm from "@/components/distribution/DistributionForm";

export const metadata: Metadata = {
  title: "Distribution Musicale — Toutes les Plateformes",
  description:
    "Distribuez votre Single, EP, Album ou Mixtape sur Spotify, Apple Music, Boomplay, Deezer, YouTube Music et toutes les plateformes mondiales. KEKELI Creative Agency gère tout.",
  keywords: ["distribution musicale Dakar", "distribuer musique Spotify Sénégal", "Boomplay Afrique", "single EP album distribution", "ISRC UPC Sénégal", "distribution streaming Afrique"],
  alternates: { canonical: "/artistes/distribution" },
  openGraph: {
    title: "Distribution Musicale sur toutes les plateformes — KEKELI Creative Agency",
    description: "Single, EP, Album, Mixtape — Spotify, Apple Music, Boomplay, Deezer, YouTube Music et 40+ plateformes. KEKELI Creative Agency s'occupe de tout.",
    url: "/artistes/distribution",
  },
};

/* ── Données ────────────────────────────────────────── */
const streamingPlatforms = [
  { name: "Spotify",       color: "#1DB954", emoji: "🎧" },
  { name: "Apple Music",   color: "#FC3C44", emoji: "🍎" },
  { name: "Boomplay",      color: "#FF6B35", emoji: "🔊" },
  { name: "Deezer",        color: "#A238FF", emoji: "🎵" },
  { name: "YouTube Music", color: "#FF0000", emoji: "▶️" },
  { name: "Audiomack",     color: "#FFA500", emoji: "🎼" },
  { name: "Tidal",         color: "#00FFFF", emoji: "💿" },
  { name: "Amazon Music",  color: "#00A8E1", emoji: "🛒" },
  { name: "iTunes",        color: "#EA4CC0", emoji: "🎤" },
  { name: "Shazam",        color: "#0080FF", emoji: "🔍" },
  { name: "Anghami",       color: "#B0A0FF", emoji: "🌙" },
  { name: "SoundCloud",    color: "#FF5500", emoji: "☁️" },
];

const releaseTypes = [
  {
    type: "Single",
    emoji: "🎵",
    color: "#C8A84B",
    tracks: "1 titre",
    delay: "5–7 jours",
    desc: "Le format idéal pour tester le marché, créer du buzz et alimenter régulièrement votre fanbase.",
    needs: ["1 fichier WAV 24bit/44.1kHz", "Cover art 3000×3000px", "Métadonnées complètes", "ISRC généré par KEKELI"],
  },
  {
    type: "EP",
    emoji: "💿",
    color: "#8B5CF6",
    tracks: "2 à 6 titres",
    delay: "7–10 jours",
    desc: "Un format court mais percutant pour présenter un univers artistique cohérent.",
    needs: ["2–6 fichiers WAV", "Cover art + photos artiste", "Ordre des titres", "ISRC + UPC"],
  },
  {
    type: "Album",
    emoji: "📀",
    color: "#3B82F6",
    tracks: "7 titres et plus",
    delay: "10–14 jours",
    desc: "Votre œuvre complète. Une sortie albumiale demande une préparation soignée et une communication forte.",
    needs: ["7+ fichiers WAV maîtrisés", "Cover + photos + artwork", "Bio artiste complète", "ISRC + UPC + plan promo"],
  },
  {
    type: "Mixtape",
    emoji: "🎚️",
    color: "#10B981",
    tracks: "Variable",
    delay: "Variable",
    desc: "Format libre, souvent gratuit, idéal pour les rappeurs et producteurs. Nécessite une vérification des droits pour les samples.",
    needs: ["Fichiers audio WAV/MP3", "Vérification droits samples", "Cover art", "Crédits features"],
  },
];

const plans = [
  {
    name: "Single",
    emoji: "🎵",
    price: "10 000",
    currency: "FCFA",
    period: "",
    highlight: false,
    desc: "Sortie rapide et professionnelle sur toutes les plateformes.",
    features: [
      "1 titre distribué",
      "40+ plateformes (Spotify, Apple Music, Boomplay...)",
      "ISRC gratuit",
      "Métadonnées complètes",
      "Délai : 5–7 jours",
      "Rapport de streaming mensuel",
    ],
  },
  {
    name: "EP",
    emoji: "💿",
    price: "20 000",
    currency: "FCFA",
    period: "",
    highlight: false,
    desc: "Parfait pour une sortie courte et impactante.",
    features: [
      "Jusqu'à 6 titres distribués",
      "40+ plateformes",
      "ISRC + UPC gratuits",
      "Vérification cover art",
      "Délai : 7–10 jours",
      "Rapport de streaming mensuel",
    ],
  },
  {
    name: "Album / Mixtape",
    emoji: "📀",
    price: "20 000",
    currency: "FCFA",
    period: "",
    highlight: true,
    desc: "Votre projet complet avec accompagnement personnalisé.",
    features: [
      "Titres illimités",
      "40+ plateformes",
      "ISRC + UPC gratuits",
      "Révision + conseils cover art",
      "Délai : 10–14 jours",
      "Rapport de streaming mensuel",
      "Accompagnement dédié",
    ],
  },
  {
    name: "Pack Premium",
    emoji: "⭐",
    price: "30 000",
    currency: "FCFA/an",
    period: "/an",
    highlight: false,
    desc: "Distribution illimitée + mastering + promotion — abonnement annuel.",
    features: [
      "Singles, EP, Albums illimités",
      "40+ plateformes",
      "Mastering professionnel inclus",
      "Plan de promotion digitale",
      "Pitch Spotify Editorial",
      "Boost réseaux sociaux",
      "Suivi stats en temps réel",
    ],
  },
];

const whyKekeli = [
  { icon: Globe,      title: "40+ plateformes",     desc: "Spotify, Boomplay, Apple Music, Deezer, YouTube Music, Audiomack et bien plus." },
  { icon: Shield,     title: "Droits protégés",      desc: "Génération ISRC/UPC, gestion des métadonnées et vérification des droits." },
  { icon: Clock,      title: "Délais rapides",       desc: "Single mis en ligne en 5 jours. Votre musique disponible dans le monde entier." },
  { icon: TrendingUp, title: "Promotion intégrée",   desc: "Option promotion digitale, pitch editorial Spotify et boost réseaux." },
  { icon: Headphones, title: "Mastering pro",        desc: "Option mastering inclus pour un son professionnel prêt pour les plateformes." },
  { icon: Star,       title: "Suivi & reporting",    desc: "Rapports mensuels avec vos streams, revenus et données par plateforme." },
];

export default function DistributionPage() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────── */}
      <section
        className="relative py-32 overflow-hidden"
        style={{ background: "#0C0B09" }}
      >
        {/* Blobs */}
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[160px] opacity-25" style={{ background: "#6D28D9" }} />
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-[130px] opacity-20" style={{ background: "#C8A84B" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full blur-[100px] opacity-15" style={{ background: "#3B82F6" }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <FadeIn direction="down" className="mb-8">
            <nav className="flex items-center gap-2 text-xs font-body" style={{ color: "rgba(255,255,255,0.45)" }}>
              <Link href="/" className="hover:text-gold transition-colors">Accueil</Link>
              <ChevronRight size={12} />
              <Link href="/artistes" className="hover:text-gold transition-colors">Artistes</Link>
              <ChevronRight size={12} />
              <span style={{ color: "rgba(255,255,255,0.70)" }}>Distribution</span>
            </nav>
          </FadeIn>

          <div className="max-w-3xl">
            <FadeIn direction="up" delay={0.05}>
              <span className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full mb-6 font-body text-xs font-semibold uppercase tracking-[0.14em] text-gold" style={{ border: "1px solid rgba(200,168,75,0.25)", background: "rgba(200,168,75,0.06)" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                Distribution musicale · KEKELI Creative Agency
              </span>
            </FadeIn>

            <FadeIn direction="up" delay={0.12}>
              <h1 className="font-body font-bold text-5xl sm:text-6xl lg:text-[4rem] leading-[1.08] text-white mb-6">
                Votre musique sur<br />
                <span style={{ color: "#C8A84B" }}>toutes les plateformes</span>
              </h1>
            </FadeIn>

            <FadeIn direction="up" delay={0.22}>
              <p className="font-body text-lg leading-relaxed mb-8 max-w-xl" style={{ color: "rgba(255,255,255,0.70)" }}>
                Single, EP, Album ou Mixtape — KEKELI Creative Agency distribue votre musique sur Spotify,
                Apple Music, Boomplay, Deezer et 40+ plateformes mondiales. ISRC, UPC,
                métadonnées, cover art : on s'occupe de tout.
              </p>
            </FadeIn>

            <FadeIn direction="up" delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="#formulaire"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-body font-bold text-base text-black transition-all hover:scale-105"
                  style={{ background: "linear-gradient(135deg, #C8A84B 0%, #F59E0B 100%)", boxShadow: "0 8px 30px rgba(200,168,75,0.40)" }}
                >
                  <Music2 size={18} />
                  Soumettre mon projet
                </a>
                <a
                  href="#tarifs"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-body font-semibold text-base transition-all"
                  style={{ border: "2px solid rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.85)" }}
                >
                  Voir les tarifs
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── PLATEFORMES ────────────────────────────────────── */}
      <section className="py-16" style={{ background: "#08060F" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" className="text-center mb-10">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-2">Distribution mondiale</p>
            <h2 className="font-display text-3xl text-white">40+ plateformes de streaming</h2>
          </FadeIn>
          <FadeInStagger className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            {streamingPlatforms.map((p) => (
              <FadeInItem key={p.name}>
                <div
                  className="flex flex-col items-center gap-2 p-4 rounded-2xl text-center"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <span className="text-2xl">{p.emoji}</span>
                  <p className="font-body text-xs font-medium text-white/80">{p.name}</p>
                </div>
              </FadeInItem>
            ))}
            <FadeInItem>
              <div
                className="flex flex-col items-center gap-2 p-4 rounded-2xl text-center"
                style={{ background: "rgba(200,168,75,0.08)", border: "1px solid rgba(200,168,75,0.20)" }}
              >
                <span className="text-2xl">🌍</span>
                <p className="font-body text-xs font-medium text-gold">+ 30 autres</p>
              </div>
            </FadeInItem>
          </FadeInStagger>
        </div>
      </section>

      {/* ── TYPES DE RELEASE ───────────────────────────────── */}
      <section className="py-24" style={{ background: "linear-gradient(160deg, #FBF6EC 0%, #F5EDD8 50%, #FAF4E8 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" className="text-center mb-14">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-3">Formats acceptés</p>
            <h2 className="font-display text-4xl md:text-5xl text-text-primary leading-tight">
              Quel est votre <em className="text-gold not-italic">format de sortie ?</em>
            </h2>
          </FadeIn>
          <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {releaseTypes.map((r) => (
              <FadeInItem key={r.type}>
                <div className="h-full bg-white rounded-2xl p-6 flex flex-col" style={{ boxShadow: "0 4px 20px rgba(180,140,20,0.10)" }}>
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4" style={{ background: `${r.color}18` }}>
                    {r.emoji}
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-body font-bold text-lg text-text-primary">{r.type}</h3>
                    <span className="font-body text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: `${r.color}18`, color: r.color }}>{r.tracks}</span>
                  </div>
                  <p className="font-body text-xs text-text-muted leading-relaxed mb-4 flex-1">{r.desc}</p>
                  <div className="space-y-1.5 mb-4">
                    {r.needs.map((n) => (
                      <div key={n} className="flex items-start gap-2">
                        <Check size={12} className="mt-0.5 shrink-0" style={{ color: r.color }} />
                        <span className="font-body text-xs text-text-secondary">{n}</span>
                      </div>
                    ))}
                  </div>
                  <p className="font-body text-[10px] text-text-muted">
                    Délai estimé : <strong style={{ color: r.color }}>{r.delay}</strong>
                  </p>
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* ── POURQUOI KEKELI ────────────────────────────────── */}
      <section className="py-24" style={{ background: "#0A0618" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" className="text-center mb-14">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-3">Nos avantages</p>
            <h2 className="font-display text-4xl md:text-5xl text-white leading-tight">
              Pourquoi distribuer avec <em className="text-gold not-italic">KEKELI ?</em>
            </h2>
          </FadeIn>
          <FadeInStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whyKekeli.map(({ icon: Icon, title, desc }) => (
              <FadeInItem key={title}>
                <div className="flex gap-4 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(200,168,75,0.15)" }}>
                    <Icon size={18} className="text-gold" />
                  </div>
                  <div>
                    <p className="font-body font-semibold text-white text-sm mb-1">{title}</p>
                    <p className="font-body text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>{desc}</p>
                  </div>
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* ── TARIFS ────────────────────────────────────────── */}
      <section id="tarifs" className="py-24" style={{ background: "linear-gradient(160deg, #FBF6EC 0%, #F5EDD8 50%, #FAF4E8 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" className="text-center mb-14">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-3">Tarifs clairs</p>
            <h2 className="font-display text-4xl md:text-5xl text-text-primary leading-tight">
              Choisissez votre <em className="text-gold not-italic">formule</em>
            </h2>
            <p className="font-body text-base text-text-muted mt-4 max-w-lg mx-auto">
              Pas de commission sur vos royalties. Vous gardez 100% de vos revenus de streaming.
            </p>
          </FadeIn>

          <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {plans.map((plan) => (
              <FadeInItem key={plan.name}>
                <div
                  className="relative flex flex-col h-full rounded-2xl p-7"
                  style={plan.highlight
                    ? { background: "linear-gradient(135deg, #1C0A40 0%, #2D0E60 100%)", border: "2px solid rgba(200,168,75,0.40)", boxShadow: "0 8px 40px rgba(200,168,75,0.15)" }
                    : { background: "white", border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}
                >
                  {plan.highlight && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="px-3 py-1 rounded-full font-body text-[10px] font-bold text-black" style={{ background: "linear-gradient(135deg, #C8A84B, #F59E0B)" }}>
                        Le plus choisi
                      </span>
                    </div>
                  )}
                  <div className="text-3xl mb-3">{plan.emoji}</div>
                  <h3 className={`font-body font-bold text-lg mb-1 ${plan.highlight ? "text-white" : "text-text-primary"}`}>{plan.name}</h3>
                  <p className={`font-body text-xs mb-4 ${plan.highlight ? "text-white/55" : "text-text-muted"}`}>{plan.desc}</p>
                  <div className="mb-5">
                    <span className={`font-body font-bold text-2xl ${plan.highlight ? "text-gold" : "text-text-primary"}`}>{plan.price}</span>
                    <span className={`font-body text-xs ml-1 ${plan.highlight ? "text-white/50" : "text-text-muted"}`}>FCFA{plan.period}</span>
                  </div>
                  <ul className="space-y-2.5 flex-1 mb-6">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <Check size={13} className={`mt-0.5 shrink-0 ${plan.highlight ? "text-gold" : "text-gold"}`} />
                        <span className={`font-body text-xs ${plan.highlight ? "text-white/70" : "text-text-secondary"}`}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#formulaire"
                    className="block text-center py-3 rounded-xl font-body font-bold text-sm transition-all"
                    style={plan.highlight
                      ? { background: "linear-gradient(135deg, #C8A84B, #F59E0B)", color: "#000" }
                      : { background: "#0C0B09", color: "white" }}
                  >
                    Choisir cette formule
                  </a>
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>

          <FadeIn delay={0.4} className="text-center mt-8">
            <p className="font-body text-sm text-text-muted">
              100% de vos royalties vous appartiennent · Aucune commission KEKELI sur vos streams
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── FORMULAIRE ─────────────────────────────────────── */}
      <section
        id="formulaire"
        className="py-24 relative overflow-hidden"
        style={{ background: "#0C0B09" }}
      >
        {/* Blobs */}
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 rounded-full blur-[140px] opacity-20" style={{ background: "#6D28D9" }} />
          <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full blur-[120px] opacity-15" style={{ background: "#C8A84B" }} />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" className="text-center mb-12">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-3">Soumettre votre projet</p>
            <h2 className="font-display text-4xl md:text-5xl text-white leading-tight mb-4">
              Prêt à lancer votre <em className="text-gold not-italic">release ?</em>
            </h2>
            <p className="font-body text-base" style={{ color: "rgba(255,255,255,0.60)" }}>
              Remplissez le formulaire ci-dessous. Notre équipe vous contacte dans les 24h pour confirmer votre dossier et démarrer la distribution.
            </p>
          </FadeIn>

          <FadeIn direction="up" delay={0.15}>
            <div className="rounded-3xl p-6 sm:p-10" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.10)", backdropFilter: "blur(12px)" }}>
              <DistributionForm />
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
