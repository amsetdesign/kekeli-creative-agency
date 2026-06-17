import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Check, Video, Film, Zap, Package, Eye, Award, Clock, Users } from "lucide-react";
import FadeIn, { FadeInStagger, FadeInItem } from "@/components/animations/FadeIn";
import ClipsForm from "@/components/clips/ClipsForm";

export const metadata: Metadata = {
  title: "Clips & Vidéos — Production Cinématique",
  description:
    "Clip officiel, Lyric video, Teaser, Pack multi-vidéos — KEKELI Creative Agency produit des vidéos cinématiques pour les artistes à Dakar et partout au Sénégal.",
  keywords: ["clip vidéo Dakar", "réalisation clip musical Sénégal", "lyric video Afrique", "teaser clip Dakar", "production vidéo artiste Sénégal"],
  alternates: { canonical: "/artistes/clips" },
  openGraph: {
    title: "Clips & Vidéos — Production cinématique — KEKELI Creative Agency",
    description: "Clip officiel, Lyric video, Teaser, Pack multi-vidéos à Dakar et dans tout le Sénégal. Devis sur mesure.",
    url: "/artistes/clips",
  },
};

/* ── Données ────────────────────────────────────────── */
const productionTypes = [
  {
    type: "Clip Officiel",
    icon: Film,
    emoji: "🎬",
    color: "#EC4899",
    label: "Format phare",
    desc: "Réalisation cinématique complète : storytelling, décors soignés, équipe professionnelle, étalonnage colorimétrique. Le clip qui pose votre image.",
    includes: [
      "Direction artistique complète",
      "Tournage multi-plans & angles",
      "Éclairage & décors professionnels",
      "Montage cinématique",
      "Étalonnage colorimétrique",
      "Livraison HD/4K selon format",
    ],
  },
  {
    type: "Lyric Video / Visualizer",
    icon: Zap,
    emoji: "✨",
    color: "#8B5CF6",
    label: "Réseaux & streaming",
    desc: "Vidéo animée mettant en valeur vos paroles ou votre univers sonore. Format parfait pour YouTube, Spotify Canvas, Boomplay et les réseaux sociaux.",
    includes: [
      "Animation typographique sur-mesure",
      "Visuels & motion design",
      "Sync paroles à l'audio",
      "Identité visuelle cohérente",
      "Formats YouTube + réseaux",
      "Livraison en 48–72h",
    ],
  },
  {
    type: "Teaser / Trailer",
    icon: Zap,
    emoji: "⚡",
    color: "#F97316",
    label: "Buzz & annonce",
    desc: "Vidéo courte et percutante (15 à 60 secondes) pour annoncer une sortie, un concert ou un projet. Conçue pour la viralité.",
    includes: [
      "Format vertical + horizontal",
      "Montage dynamique & rythmé",
      "Musique + effets sonores",
      "Optimisé TikTok / Reels / Shorts",
      "Livraison rapide",
      "Jusqu'à 2 révisions",
    ],
  },
  {
    type: "Pack Multi-vidéos",
    icon: Package,
    emoji: "🎥",
    color: "#C8A84B",
    label: "Pack complet",
    desc: "Clip officiel + teaser(s) + contenu réseaux sociaux — tout en un seul tournage pour maximiser votre contenu et réduire les coûts.",
    includes: [
      "1 clip officiel complet",
      "2–3 teasers / extraits",
      "Contenu format réseaux (4–6 formats)",
      "Planification tournage optimisée",
      "Cohérence visuelle garantie",
      "Meilleur rapport qualité/prix",
    ],
  },
];

const processSteps = [
  { step: "01", title: "Brief vidéo", desc: "Remplissez le formulaire avec votre concept, vos références et vos contraintes de tournage.", icon: "📋" },
  { step: "02", title: "Devis personnalisé", desc: "Notre équipe revient vers vous sous 24h avec un devis détaillé adapté à votre projet.", icon: "💬" },
  { step: "03", title: "Pré-production", desc: "Storyboard, repérages, casting, costumes — on prépare tout avant le jour J.", icon: "🗂️" },
  { step: "04", title: "Tournage", desc: "Jour de tournage avec notre équipe complète. Réalisation dans les meilleures conditions.", icon: "🎬" },
  { step: "05", title: "Post-production", desc: "Montage, étalonnage colorimétrique, effets visuels, mixage son.", icon: "🎨" },
  { step: "06", title: "Livraison", desc: "Visionnage, révisions incluses et livraison finale en haute définition.", icon: "✅" },
];

const whyKekeli = [
  { icon: Award,  title: "Équipe créative",    desc: "Réalisateurs, DOP, monteurs et directeurs artistiques — une équipe complète dédiée à votre vision." },
  { icon: Eye,    title: "Vision africaine",    desc: "Nous comprenons l'esthétique et les codes visuels de la musique africaine et mbalax." },
  { icon: Clock,  title: "Délais respectés",   desc: "Nous livrons à la date convenue. Votre sortie ne sera jamais retardée par notre faute." },
  { icon: Users,  title: "Réseau & lieux",     desc: "Accès à des studios, décors naturels et lieux exclusifs à Dakar et dans tout le Sénégal." },
  { icon: Video,  title: "Multi-formats",      desc: "Livraison dans tous les formats : YouTube 4K, Instagram Reels, TikTok, Spotify Canvas." },
  { icon: Package, title: "Packs flexibles",   desc: "Du teaser économique au pack complet multi-vidéos — une formule pour chaque budget." },
];

const locations = [
  { emoji: "🏙️", name: "Studio Dakar",          desc: "Tournage en studio professionnel avec décors et éclairage contrôlé." },
  { emoji: "🌅", name: "Extérieur Dakar",        desc: "Plages, ruelles, quartiers, toits — les décors naturels de Dakar." },
  { emoji: "🌍", name: "Tout le Sénégal",        desc: "Saint-Louis, Ziguinchor, Casamance, Cap-Skirring — on se déplace partout." },
  { emoji: "✈️", name: "International",          desc: "Production à l'étranger sur demande. Devis voyage inclus." },
];

export default function ClipsPage() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────── */}
      <section
        className="relative py-32 overflow-hidden"
        style={{ background: "#0C0B09" }}
      >
        {/* Blobs */}
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[160px] opacity-25" style={{ background: "#EC4899" }} />
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-[130px] opacity-20" style={{ background: "#8B5CF6" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full blur-[100px] opacity-12" style={{ background: "#F97316" }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <FadeIn direction="down" className="mb-8">
            <nav className="flex items-center gap-2 text-xs font-body" style={{ color: "rgba(255,255,255,0.45)" }}>
              <Link href="/" className="hover:text-gold transition-colors">Accueil</Link>
              <ChevronRight size={12} />
              <Link href="/artistes" className="hover:text-gold transition-colors">Artistes</Link>
              <ChevronRight size={12} />
              <span style={{ color: "rgba(255,255,255,0.70)" }}>Clips & Vidéos</span>
            </nav>
          </FadeIn>

          <div className="max-w-3xl">
            <FadeIn direction="up" delay={0.05}>
              <span className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full mb-6 font-body text-xs font-semibold uppercase tracking-[0.14em]" style={{ border: "1px solid rgba(236,72,153,0.30)", background: "rgba(236,72,153,0.08)", color: "#EC4899" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                Production vidéo · KEKELI Creative Agency
              </span>
            </FadeIn>

            <FadeIn direction="up" delay={0.12}>
              <h1 className="font-body font-bold text-5xl sm:text-6xl lg:text-[4rem] leading-[1.08] text-white mb-6">
                Des clips qui font<br />
                <span style={{ color: "#EC4899" }}>parler de vous</span>
              </h1>
            </FadeIn>

            <FadeIn direction="up" delay={0.22}>
              <p className="font-body text-lg leading-relaxed mb-8 max-w-xl" style={{ color: "rgba(255,255,255,0.70)" }}>
                Clip officiel, Lyric video, Teaser, Pack complet — KEKELI Creative Agency réalise des
                vidéos cinématiques qui portent votre univers artistique et explosent sur les réseaux.
                Devis personnalisé sous 24h.
              </p>
            </FadeIn>

            <FadeIn direction="up" delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="#formulaire"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-body font-bold text-base text-black transition-all hover:scale-105"
                  style={{ background: "linear-gradient(135deg, #C8A84B 0%, #D4A83A 100%)", boxShadow: "0 8px 30px rgba(200,168,75,0.40)" }}
                >
                  <Film size={18} />
                  Demander un devis
                </a>
                <a
                  href="#productions"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-body font-semibold text-base transition-all"
                  style={{ border: "2px solid rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.85)" }}
                >
                  Voir les formats
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── TYPES DE PRODUCTION ─────────────────────────── */}
      <section id="productions" className="py-24" style={{ background: "linear-gradient(160deg, #FBF6EC 0%, #F5EDD8 50%, #FAF4E8 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" className="text-center mb-14">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-3">Formats disponibles</p>
            <h2 className="font-display text-4xl md:text-5xl text-text-primary leading-tight">
              Quel type de vidéo <em className="text-gold not-italic">vous faut-il ?</em>
            </h2>
          </FadeIn>
          <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {productionTypes.map((p) => {
              const Icon = p.icon;
              return (
                <FadeInItem key={p.type}>
                  <div className="h-full bg-white rounded-2xl p-6 flex flex-col" style={{ boxShadow: "0 4px 20px rgba(180,140,20,0.10)" }}>
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0" style={{ background: `${p.color}18` }}>
                        {p.emoji}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-body font-bold text-lg text-text-primary">{p.type}</h3>
                          <span className="font-body text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: `${p.color}18`, color: p.color }}>{p.label}</span>
                        </div>
                        <p className="font-body text-xs text-text-muted leading-relaxed">{p.desc}</p>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      {p.includes.map((item) => (
                        <div key={item} className="flex items-start gap-2">
                          <Check size={12} className="mt-0.5 shrink-0" style={{ color: p.color }} />
                          <span className="font-body text-xs text-text-secondary">{item}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-border">
                      <a
                        href="#formulaire"
                        className="font-body text-xs font-semibold transition-colors"
                        style={{ color: p.color }}
                      >
                        Demander un devis pour ce format →
                      </a>
                    </div>
                  </div>
                </FadeInItem>
              );
            })}
          </FadeInStagger>

          <FadeIn direction="up" delay={0.3} className="text-center mt-10">
            <p className="font-body text-sm text-text-muted">
              Tous nos tarifs sont sur devis — chaque projet est unique. Remplissez le formulaire pour recevoir votre devis personnalisé sous 24h.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── LIEUX DE TOURNAGE ──────────────────────────── */}
      <section className="py-20" style={{ background: "#08060F" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" className="text-center mb-12">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-3">Lieux de tournage</p>
            <h2 className="font-display text-3xl md:text-4xl text-white leading-tight">
              On tourne <em className="text-gold not-italic">partout</em>
            </h2>
          </FadeIn>
          <FadeInStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {locations.map((loc) => (
              <FadeInItem key={loc.name}>
                <div className="flex flex-col items-center text-center p-6 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <span className="text-4xl mb-3">{loc.emoji}</span>
                  <h3 className="font-body font-bold text-white text-sm mb-2">{loc.name}</h3>
                  <p className="font-body text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.50)" }}>{loc.desc}</p>
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* ── PROCESSUS ─────────────────────────────────── */}
      <section className="py-24" style={{ background: "linear-gradient(160deg, #FBF6EC 0%, #F5EDD8 50%, #FAF4E8 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" className="text-center mb-14">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-3">Comment ça marche</p>
            <h2 className="font-display text-4xl md:text-5xl text-text-primary leading-tight">
              De l'idée au <em className="text-gold not-italic">clip final</em>
            </h2>
          </FadeIn>
          <FadeInStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {processSteps.map((s) => (
              <FadeInItem key={s.step}>
                <div className="bg-white rounded-2xl p-6" style={{ boxShadow: "0 4px 20px rgba(180,140,20,0.08)" }}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-body font-bold text-[10px] tracking-[0.2em]" style={{ color: "#C8A84B" }}>{s.step}</span>
                    <span className="text-2xl">{s.icon}</span>
                  </div>
                  <h3 className="font-body font-bold text-text-primary text-sm mb-2">{s.title}</h3>
                  <p className="font-body text-xs text-text-muted leading-relaxed">{s.desc}</p>
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* ── POURQUOI KEKELI ────────────────────────────── */}
      <section className="py-24" style={{ background: "#0A0618" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" className="text-center mb-14">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-3">Nos atouts</p>
            <h2 className="font-display text-4xl md:text-5xl text-white leading-tight">
              Pourquoi choisir <em className="text-gold not-italic">KEKELI ?</em>
            </h2>
          </FadeIn>
          <FadeInStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whyKekeli.map(({ icon: Icon, title, desc }) => (
              <FadeInItem key={title}>
                <div className="flex gap-4 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(236,72,153,0.15)" }}>
                    <Icon size={18} style={{ color: "#EC4899" }} />
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

      {/* ── FORMULAIRE ─────────────────────────────────── */}
      <section
        id="formulaire"
        className="py-24 relative overflow-hidden"
        style={{ background: "#0C0B09" }}
      >
        {/* Blobs */}
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 rounded-full blur-[140px] opacity-20" style={{ background: "#EC4899" }} />
          <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full blur-[120px] opacity-15" style={{ background: "#8B5CF6" }} />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" className="text-center mb-12">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: "#EC4899" }}>Votre brief vidéo</p>
            <h2 className="font-display text-4xl md:text-5xl text-white leading-tight mb-4">
              Parlons de votre <em className="text-gold not-italic">clip</em>
            </h2>
            <p className="font-body text-base" style={{ color: "rgba(255,255,255,0.60)" }}>
              Remplissez le formulaire ci-dessous. Notre équipe vous répond dans les 24h avec un devis détaillé et sur-mesure.
            </p>
          </FadeIn>

          <FadeIn direction="up" delay={0.15}>
            <div className="rounded-3xl p-6 sm:p-10" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.10)", backdropFilter: "blur(12px)" }}>
              <ClipsForm />
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
