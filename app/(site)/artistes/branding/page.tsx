import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Check, Palette, Star, Layers, Image, FileText, Eye, Zap, Users } from "lucide-react";
import FadeIn, { FadeInStagger, FadeInItem } from "@/components/animations/FadeIn";
import BrandingForm from "@/components/branding/BrandingForm";

export const metadata: Metadata = {
  title: "Branding Artiste — Logo, Charte Graphique & Identité Visuelle",
  description:
    "Créez une image de marque forte et reconnaissable. Logo, charte graphique, templates réseaux sociaux, Press Kit — KEKELI Creative Agency construit l'identité visuelle des artistes sénégalais.",
  keywords: ["branding artiste Dakar", "logo artiste Sénégal", "charte graphique musique", "identité visuelle artiste africain", "press kit EPK Dakar", "templates Instagram artiste"],
  alternates: { canonical: "/artistes/branding" },
  openGraph: {
    title: "Branding Artiste — Logo & Identité Visuelle — KEKELI Creative Agency",
    description: "Logo, charte graphique, templates réseaux, Press Kit EPK — construisez une image de marque forte avec KEKELI Creative Agency.",
    url: "/artistes/branding",
  },
};

/* ── Données ─────────────────────────────────── */
const ACCENT = "#8B5CF6";

const services = [
  {
    icon: Palette,
    emoji: "✏️",
    title: "Logo & Identité Visuelle",
    desc: "Un logo fort et une charte graphique cohérente qui vous rendent immédiatement reconnaissable.",
    includes: [
      "Création de logo (3 propositions)",
      "Déclinaisons couleur (fond clair/sombre)",
      "Palette de couleurs officielle",
      "Typographies principales et secondaires",
      "Charte graphique complète en PDF",
      "Fichiers sources HD (PNG, SVG, PDF)",
    ],
  },
  {
    icon: Image,
    emoji: "📱",
    title: "Templates Réseaux Sociaux",
    desc: "Des modèles prêts à l'emploi pour vos posts et stories — un feed professionnel sans effort.",
    includes: [
      "Posts Instagram (carrés + portrait)",
      "Stories Instagram / TikTok",
      "Couverture YouTube & bannière Facebook",
      "Vignettes YouTube personnalisées",
      "Templates annonces de sortie",
      "Livraison en format Canva éditable",
    ],
  },
  {
    icon: FileText,
    emoji: "📄",
    title: "Press Kit Artiste (EPK)",
    desc: "Votre dossier de presse numérique — indispensable pour convaincre labels, médias et organisateurs.",
    includes: [
      "Biographie courte et longue",
      "Photos artiste haute résolution",
      "Discographie complète",
      "Revue de presse & citations",
      "Liens streaming & réseaux sociaux",
      "Contacts presse & booking",
    ],
  },
  {
    icon: Layers,
    emoji: "🎨",
    title: "Direction Artistique Globale",
    desc: "Votre univers visuel complet, cohérent sur tous vos supports — le pack le plus impactant.",
    includes: [
      "Tout ce qui est dans les 3 services ci-dessus",
      "Moodboard & direction créative",
      "Concept visuel pour covers & clips",
      "Univers couleur pour les saisons de release",
      "Guide d'utilisation de la marque",
      "Accompagnement sur 3 mois",
    ],
  },
];

const processSteps = [
  { step: "01", icon: "💬", title: "Brief créatif",        desc: "On échange sur votre univers, vos références et ce que vous voulez transmettre à votre audience." },
  { step: "02", icon: "🗂️", title: "Moodboard",            desc: "On crée un moodboard visuel pour valider la direction artistique avant de commencer." },
  { step: "03", icon: "✏️", title: "Création",             desc: "Notre équipe créative produit les éléments dans le style validé ensemble." },
  { step: "04", icon: "🔁", title: "Révisions",            desc: "Vous donnez votre avis, on ajuste jusqu'à ce que vous soyez 100% satisfait." },
  { step: "05", icon: "📦", title: "Livraison & Guide",    desc: "Livraison de tous les fichiers sources + guide d'utilisation de votre identité visuelle." },
];

const brandElements = [
  { emoji: "🔤", name: "Nom artistique fort",       desc: "Un nom mémorable qui sonne et s'écrit bien partout" },
  { emoji: "🎨", name: "Palette de couleurs",       desc: "Vos couleurs signature qui créent une reconnaissance immédiate" },
  { emoji: "✍️", name: "Typographies",              desc: "Les polices qui transmettent votre personnalité artistique" },
  { emoji: "📸", name: "Direction photo",           desc: "Un style photo cohérent pour tous vos shoots" },
  { emoji: "🎵", name: "Son de marque",             desc: "Une identité sonore reconnaissable en intro/outro" },
  { emoji: "💬", name: "Ton de communication",      desc: "La façon dont vous parlez à votre audience, toujours cohérente" },
];

const whyKekeli = [
  { icon: Eye,    title: "Vision artistique",        desc: "Nous comprenons l'esthétique musicale africaine et créons des identités qui résonnent avec votre audience." },
  { icon: Star,   title: "Designs originaux",        desc: "Aucun template générique. Chaque logo et charte est créé entièrement sur mesure pour vous." },
  { icon: Zap,    title: "Cohérence totale",         desc: "Votre identité est la même sur tous vos supports : réseaux, clips, press kit, scène." },
  { icon: Users,  title: "Expérience artistes",      desc: "Nous avons construit l'image de marque de dizaines d'artistes sénégalais et africains." },
  { icon: Layers, title: "Fichiers complets",        desc: "Tous les formats dont vous avez besoin : PNG, SVG, PDF, Canva — pour toujours." },
  { icon: Palette, title: "Accompagnement continu",  desc: "Même après la livraison, on reste disponibles pour adapter votre branding à vos nouvelles sorties." },
];

export default function BrandingPage() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────── */}
      <section
        className="relative py-32 overflow-hidden"
        style={{ background: "#0C0B09" }}
      >
        {/* Blobs */}
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[160px] opacity-22" style={{ background: ACCENT }} />
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-[130px] opacity-18" style={{ background: "#6D28D9" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full blur-[100px] opacity-10" style={{ background: "#C8A84B" }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <FadeIn direction="down" className="mb-8">
            <nav className="flex items-center gap-2 text-xs font-body" style={{ color: "rgba(255,255,255,0.45)" }}>
              <Link href="/" className="hover:text-gold transition-colors">Accueil</Link>
              <ChevronRight size={12} />
              <Link href="/artistes" className="hover:text-gold transition-colors">Artistes</Link>
              <ChevronRight size={12} />
              <span style={{ color: "rgba(255,255,255,0.70)" }}>Branding Artiste</span>
            </nav>
          </FadeIn>

          <div className="max-w-3xl">
            <FadeIn direction="up" delay={0.05}>
              <span className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full mb-6 font-body text-xs font-semibold uppercase tracking-[0.14em]" style={{ border: `1px solid rgba(139,92,246,0.35)`, background: "rgba(139,92,246,0.10)", color: "#A78BFA" }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#A78BFA" }} />
                Branding & Identité Visuelle · KEKELI Creative Agency
              </span>
            </FadeIn>

            <FadeIn direction="up" delay={0.12}>
              <h1 className="font-body font-bold text-5xl sm:text-6xl lg:text-[4rem] leading-[1.08] text-white mb-6">
                Une image qui vous<br />
                <span style={{ color: "#A78BFA" }}>rend inoubliable</span>
              </h1>
            </FadeIn>

            <FadeIn direction="up" delay={0.22}>
              <p className="font-body text-lg leading-relaxed mb-8 max-w-xl" style={{ color: "rgba(255,255,255,0.70)" }}>
                Logo, charte graphique, templates réseaux, Press Kit — KEKELI Creative Agency construit une
                identité visuelle forte et cohérente qui fait reconnaître votre talent au premier coup d'œil.
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
                  Créer mon identité
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

      {/* ── ÉLÉMENTS D'UNE MARQUE ───────────────────────── */}
      <section className="py-16" style={{ background: "#08060F" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" className="text-center mb-10">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-2">Les piliers de votre marque</p>
            <h2 className="font-display text-3xl text-white">Ce qui fait une image de marque forte</h2>
          </FadeIn>
          <FadeInStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {brandElements.map((b) => (
              <FadeInItem key={b.name}>
                <div
                  className="flex items-start gap-3 p-4 rounded-2xl"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <span className="text-2xl shrink-0">{b.emoji}</span>
                  <div>
                    <p className="font-body font-semibold text-white text-sm mb-1">{b.name}</p>
                    <p className="font-body text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.50)" }}>{b.desc}</p>
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
            <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-3">Ce qu'on crée pour vous</p>
            <h2 className="font-display text-4xl md:text-5xl text-text-primary leading-tight">
              Nos services de <em className="text-gold not-italic">branding</em>
            </h2>
            <p className="font-body text-base text-text-muted mt-4 max-w-xl mx-auto">
              Tarifs sur devis — chaque projet est unique. Remplissez le formulaire pour un devis sous 24h.
            </p>
          </FadeIn>
          <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((s) => {
              const Icon = s.icon;
              return (
                <FadeInItem key={s.title}>
                  <div className="h-full bg-white rounded-2xl p-6 flex flex-col" style={{ boxShadow: "0 4px 20px rgba(139,92,246,0.08)" }}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl" style={{ background: "rgba(139,92,246,0.10)" }}>
                        {s.emoji}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-body font-bold text-text-primary text-base leading-snug">{s.title}</h3>
                      </div>
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
                      <a href="#formulaire" className="font-body text-xs font-semibold transition-colors" style={{ color: ACCENT }}>
                        Demander un devis →
                      </a>
                    </div>
                  </div>
                </FadeInItem>
              );
            })}
          </FadeInStagger>
        </div>
      </section>

      {/* ── PROCESSUS ─────────────────────────────────── */}
      <section className="py-24" style={{ background: "#0A0618" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" className="text-center mb-14">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-3">Notre méthode</p>
            <h2 className="font-display text-4xl md:text-5xl text-white leading-tight">
              Du brief à votre <em className="text-gold not-italic">identité finale</em>
            </h2>
          </FadeIn>
          <FadeInStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {processSteps.map((s) => (
              <FadeInItem key={s.step}>
                <div className="flex flex-col p-5 rounded-2xl h-full" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-body font-bold text-[10px] tracking-[0.2em]" style={{ color: ACCENT }}>{s.step}</span>
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
                <div className="flex gap-4 p-5 rounded-2xl bg-white" style={{ boxShadow: "0 4px 20px rgba(139,92,246,0.08)" }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(139,92,246,0.10)" }}>
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
        {/* Blobs */}
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 rounded-full blur-[140px] opacity-18" style={{ background: ACCENT }} />
          <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full blur-[120px] opacity-12" style={{ background: "#6D28D9" }} />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" className="text-center mb-12">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: "#A78BFA" }}>Brief créatif</p>
            <h2 className="font-display text-4xl md:text-5xl text-white leading-tight mb-4">
              Construisons votre <em className="text-gold not-italic">marque</em>
            </h2>
            <p className="font-body text-base" style={{ color: "rgba(255,255,255,0.60)" }}>
              Partagez votre univers et vos ambitions. Notre équipe créative vous répond sous 24h avec des idées et un devis personnalisé.
            </p>
          </FadeIn>

          <FadeIn direction="up" delay={0.15}>
            <div className="rounded-3xl p-6 sm:p-10" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.10)", backdropFilter: "blur(12px)" }}>
              <BrandingForm />
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
