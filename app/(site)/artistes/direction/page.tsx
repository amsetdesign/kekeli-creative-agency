import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Check, Palette, Mic2, Eye, Users, Sparkles, Star, Layers, Compass } from "lucide-react";
import FadeIn, { FadeInStagger, FadeInItem } from "@/components/animations/FadeIn";
import DirectionForm from "@/components/direction/DirectionForm";

export const metadata: Metadata = {
  title: "Direction Artistique — Univers, Scène & Image Artiste",
  description:
    "Développez votre univers artistique, préparez vos concerts et maîtrisez votre image. KEKELI Creative Agency vous accompagne dans la construction d'une identité artistique forte et cohérente.",
  keywords: ["direction artistique Dakar", "univers artistique Sénégal", "scénographie concert Afrique", "coaching image artiste", "direction créative musique Dakar"],
  alternates: { canonical: "/artistes/direction" },
  openGraph: {
    title: "Direction Artistique — Univers, Scène & Image — KEKELI Creative Agency",
    description: "Univers artistique, scénographie, coaching image et coordination créative à Dakar.",
    url: "/artistes/direction",
  },
};

const ACCENT = "#7C3AED";
const ACCENT_LIGHT = "#A78BFA";

const services = [
  {
    emoji: "🌌",
    title: "Développement de l'univers artistique",
    desc: "Définir qui vous êtes artistiquement — votre concept, votre storytelling, votre positionnement. La fondation sur laquelle tout le reste repose.",
    includes: [
      "Audit de votre image actuelle",
      "Définition de votre concept artistique unique",
      "Storytelling & narration de votre identité",
      "Positionnement dans votre genre musical",
      "Bible de marque artistique",
      "Feuille de route créative",
    ],
  },
  {
    emoji: "🎪",
    title: "Scénographie & Concerts",
    desc: "Transformer votre performance en expérience mémorable. Chaque détail de votre entrée scène à votre setlist est pensé pour marquer les esprits.",
    includes: [
      "Conception de la mise en scène",
      "Direction lumières & effets",
      "Setlist & transitions pensées",
      "Chorégraphie & positionnement scène",
      "Répétitions encadrées",
      "Brief technique pour les équipes live",
    ],
  },
  {
    emoji: "🪞",
    title: "Coaching Image & Posture",
    desc: "Votre présence physique est votre premier message. Travaillez votre style, votre posture scénique et votre communication pour être inoubliable.",
    includes: [
      "Analyse de votre style vestimentaire actuel",
      "Direction stylisme & tenues de scène",
      "Travail sur la posture et la gestuelle",
      "Expression corporelle & charisme",
      "Coaching interview & prises de parole",
      "Image sur les réseaux sociaux",
    ],
  },
  {
    emoji: "🎯",
    title: "Coordination des équipes créatives",
    desc: "Un directeur artistique unique qui pilote tous vos prestataires créatifs pour garantir une cohérence totale sur tous vos supports.",
    includes: [
      "Brief & coordination photographe",
      "Direction de clip & équipe vidéo",
      "Cohérence entre visuels, son et scène",
      "Coordination graphiste & branding",
      "Validation créative de tous les livrables",
      "Suivi de projet de A à Z",
    ],
  },
];

const processSteps = [
  { step: "01", icon: "🔍", title: "Audit artistique",     desc: "On analyse votre musique, vos visuels actuels, votre positionnement et ce qui vous distingue pour identifier le potentiel inexploité." },
  { step: "02", icon: "💡", title: "Concept & vision",     desc: "On co-construit votre concept artistique : univers, couleurs, valeurs, storytelling. La base de tout le reste." },
  { step: "03", icon: "🗺️", title: "Plan de déploiement", desc: "Un plan concret pour déployer votre nouvelle identité : shootings, clip, scène, réseaux — dans le bon ordre." },
  { step: "04", icon: "🎬", title: "Production & direction", desc: "On dirige les équipes créatives pour produire des contenus cohérents avec votre vision." },
  { step: "05", icon: "📈", title: "Suivi & évolution",   desc: "On ajuste la direction en fonction des retours de votre audience et de l'évolution de votre carrière." },
];

const impacts = [
  { emoji: "🎯", label: "Identité claire",          desc: "Votre public sait qui vous êtes, ce que vous représentez — dès la première rencontre." },
  { emoji: "🔗", label: "Cohérence totale",         desc: "Du clip au concert en passant par Instagram : un univers visuel et sonore unifié." },
  { emoji: "⬆️", label: "Crédibilité renforcée",   desc: "Une direction artistique pro ouvre des portes : médias, labels, festivals, marques." },
  { emoji: "💎", label: "Image premium",            desc: "Un artiste avec une direction artistique solide se démarque et justifie des cachets plus élevés." },
];

const whyKekeli = [
  { icon: Compass,  title: "Vision stratégique",     desc: "On ne pense pas seulement à aujourd'hui. On construit une image qui dure et qui grandit avec vous." },
  { icon: Eye,      title: "Regard extérieur expert", desc: "Un œil professionnel qui voit ce que vous ne voyez plus vous-même. Objectif, créatif, bienveillant." },
  { icon: Layers,   title: "Approche 360°",          desc: "Musique, visuels, scène, réseaux, presse — on pense tout en même temps pour une cohérence parfaite." },
  { icon: Users,    title: "Réseau créatif solide",  desc: "Accès à nos photographes, réalisateurs, stylistes et graphistes pour exécuter votre vision rapidement." },
  { icon: Sparkles, title: "Créativité africaine",   desc: "Nous créons des univers ancrés dans la culture africaine tout en ayant une portée internationale." },
  { icon: Star,     title: "Résultats mesurables",   desc: "Plus de vues, plus d'engagement, plus d'opportunités — votre image travaille pour vous 24h/24." },
];

export default function DirectionPage() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────── */}
      <section
        className="relative py-32 overflow-hidden"
        style={{ background: "#0C0B09" }}
      >
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[160px] opacity-22" style={{ background: ACCENT }} />
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-[130px] opacity-16" style={{ background: "#5B21B6" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full blur-[100px] opacity-10" style={{ background: "#C8A84B" }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="down" className="mb-8">
            <nav className="flex items-center gap-2 text-xs font-body" style={{ color: "rgba(255,255,255,0.45)" }}>
              <Link href="/" className="hover:text-gold transition-colors">Accueil</Link>
              <ChevronRight size={12} />
              <Link href="/artistes" className="hover:text-gold transition-colors">Artistes</Link>
              <ChevronRight size={12} />
              <span style={{ color: "rgba(255,255,255,0.70)" }}>Direction Artistique</span>
            </nav>
          </FadeIn>

          <div className="max-w-3xl">
            <FadeIn direction="up" delay={0.05}>
              <span className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full mb-6 font-body text-xs font-semibold uppercase tracking-[0.14em]" style={{ border: "1px solid rgba(124,58,237,0.40)", background: "rgba(124,58,237,0.10)", color: ACCENT_LIGHT }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: ACCENT_LIGHT }} />
                Direction Artistique · KEKELI Creative Agency
              </span>
            </FadeIn>

            <FadeIn direction="up" delay={0.12}>
              <h1 className="font-body font-bold text-5xl sm:text-6xl lg:text-[4rem] leading-[1.08] text-white mb-6">
                Donnez une âme<br />
                <span style={{ color: ACCENT_LIGHT }}>à votre musique</span>
              </h1>
            </FadeIn>

            <FadeIn direction="up" delay={0.22}>
              <p className="font-body text-lg leading-relaxed mb-8 max-w-xl" style={{ color: "rgba(255,255,255,0.70)" }}>
                Univers artistique, scénographie, coaching image, coordination créative —
                KEKELI Creative Agency construit autour de vous une identité forte qui vous rend
                inoubliable sur scène, à l'écran et dans les esprits.
              </p>
            </FadeIn>

            <FadeIn direction="up" delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="#formulaire"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-body font-bold text-base text-black transition-all hover:scale-105"
                  style={{ background: "linear-gradient(135deg, #C8A84B 0%, #D4A83A 100%)", boxShadow: "0 8px 30px rgba(200,168,75,0.40)" }}
                >
                  <Palette size={18} />
                  Démarrer mon accompagnement
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

      {/* ── IMPACTS ─────────────────────────────────────── */}
      <section className="py-16" style={{ background: "#08060F" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" className="text-center mb-10">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-2">Ce que ça change</p>
            <h2 className="font-display text-3xl text-white">L'impact d'une direction artistique forte</h2>
          </FadeIn>
          <FadeInStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {impacts.map((i) => (
              <FadeInItem key={i.label}>
                <div className="flex flex-col items-center text-center p-6 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <span className="text-3xl mb-3">{i.emoji}</span>
                  <p className="font-body font-semibold text-white text-sm mb-2">{i.label}</p>
                  <p className="font-body text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.50)" }}>{i.desc}</p>
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
              Nos services de <em className="text-gold not-italic">direction artistique</em>
            </h2>
            <p className="font-body text-base text-text-muted mt-4 max-w-xl mx-auto">
              Chaque artiste est unique. Tarifs sur devis après un premier échange gratuit.
            </p>
          </FadeIn>
          <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((s) => (
              <FadeInItem key={s.title}>
                <div className="h-full bg-white rounded-2xl p-6 flex flex-col" style={{ boxShadow: "0 4px 20px rgba(124,58,237,0.08)" }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0" style={{ background: "rgba(124,58,237,0.10)" }}>
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
      <section className="py-24" style={{ background: "#0A0618" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" className="text-center mb-14">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-3">Notre méthode</p>
            <h2 className="font-display text-4xl md:text-5xl text-white leading-tight">
              De l'audit à votre <em className="text-gold not-italic">identité complète</em>
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
                <div className="flex gap-4 p-5 rounded-2xl bg-white" style={{ boxShadow: "0 4px 20px rgba(124,58,237,0.07)" }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(124,58,237,0.10)" }}>
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
          <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full blur-[120px] opacity-12" style={{ background: "#5B21B6" }} />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" className="text-center mb-12">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: ACCENT_LIGHT }}>Premier échange gratuit</p>
            <h2 className="font-display text-4xl md:text-5xl text-white leading-tight mb-4">
              Parlons de votre <em className="text-gold not-italic">vision</em>
            </h2>
            <p className="font-body text-base" style={{ color: "rgba(255,255,255,0.60)" }}>
              Décrivez votre projet et votre situation. Notre directeur artistique vous répond sous 24h pour un premier échange gratuit, sans engagement.
            </p>
          </FadeIn>

          <FadeIn direction="up" delay={0.15}>
            <div className="rounded-3xl p-6 sm:p-10" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.10)", backdropFilter: "blur(12px)" }}>
              <DirectionForm />
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
