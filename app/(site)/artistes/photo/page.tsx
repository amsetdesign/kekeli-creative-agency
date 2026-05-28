import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Check, Camera, Aperture, Sun, MapPin, Star, Zap, Clock, Eye } from "lucide-react";
import FadeIn, { FadeInStagger, FadeInItem } from "@/components/animations/FadeIn";
import PhotoForm from "@/components/photo/PhotoForm";

export const metadata: Metadata = {
  title: "Photo Shooting Artiste — Portraits & Shooting Thématique Dakar",
  description:
    "Portraits artiste professionnels, shootings thématiques, studio et extérieur à Dakar. KEKELI Creative Agency crée des visuels percutants pour votre image, vos réseaux et votre presse.",
  keywords: ["photo shooting artiste Dakar", "portrait photographe Sénégal", "shooting thématique musique", "photographe artiste africain", "cover art photo Dakar", "shooting studio Sénégal"],
  alternates: { canonical: "/artistes/photo" },
  openGraph: {
    title: "Photo Shooting Artiste — Portraits & Thématique — KEKELI Creative Agency",
    description: "Portraits, shooting thématique, studio et extérieur à Dakar. Des visuels qui posent votre image.",
    url: "/artistes/photo",
  },
};

const ACCENT = "#06B6D4";

const shootTypes = [
  {
    emoji: "🎭",
    title: "Portrait Artiste",
    label: "L'essentiel",
    desc: "Des portraits sobres et puissants qui transmettent votre personnalité. Indispensables pour vos réseaux, votre presse et vos promotions.",
    includes: [
      "Séance photo dédiée",
      "Plusieurs tenues possibles",
      "Retouche professionnelle",
      "Livraison HD toutes utilisations",
      "Formats réseaux + presse",
      "Galerie en ligne privée",
    ],
  },
  {
    emoji: "🎬",
    title: "Shooting Thématique",
    label: "Concept fort",
    desc: "Un univers visuel complet construit autour d'un concept artistique précis : décors, costumes, lumière, mise en scène — pour des photos signature.",
    includes: [
      "Direction artistique complète",
      "Repérage des lieux en amont",
      "Coordination costumes & décors",
      "Équipe photo complète",
      "Retouche avancée + colorimétrie",
      "Livraison galerie HD",
    ],
  },
  {
    emoji: "💡",
    title: "Shooting en Studio",
    label: "Contrôle total",
    desc: "Studio professionnel à Dakar avec fonds, lumières et équipements haut de gamme. Le cadre idéal pour des photos nettes et maîtrisées.",
    includes: [
      "Studio équipé & éclairé",
      "Fond blanc, noir, coloré au choix",
      "Éclairage professionnel (studio flash)",
      "Changements de tenues possibles",
      "Retouche & sélection des meilleurs clichés",
      "Livraison sous 48–72h",
    ],
  },
  {
    emoji: "🌅",
    title: "Shooting en Extérieur",
    label: "Décors naturels",
    desc: "Plages, ruelles, toits de Dakar, marchés, paysages sénégalais — des décors authentiques pour une identité visuelle ancrée dans votre territoire.",
    includes: [
      "Repérage des meilleurs spots",
      "Adaptation à la lumière naturelle",
      "Heure dorée / heure bleue selon demande",
      "Permis de tournage si nécessaire",
      "Retouche colorimétrique",
      "Livraison HD galerie privée",
    ],
  },
];

const processSteps = [
  { step: "01", icon: "💬", title: "Brief visuel",        desc: "On échange sur votre concept, vos références et le message que vous voulez transmettre avec ces photos." },
  { step: "02", icon: "🗺️", title: "Repérage & prep",    desc: "Repérage des lieux, coordination des costumes, planification de l'éclairage et de la logistique." },
  { step: "03", icon: "📸", title: "Jour du shooting",   desc: "Séance photo avec notre équipe. Direction bienveillante pour vous mettre à l'aise devant l'objectif." },
  { step: "04", icon: "🎨", title: "Sélection & retouche", desc: "Sélection des meilleurs clichés et retouche professionnelle avec la colorimétrie de votre univers." },
  { step: "05", icon: "📦", title: "Livraison",           desc: "Galerie en ligne privée + fichiers HD téléchargeables dans tous les formats dont vous avez besoin." },
];

const locations = [
  { emoji: "💡", name: "Studio Dakar",          desc: "Studio professionnel avec fonds et éclairage contrôlé" },
  { emoji: "🏙️", name: "Médina / Plateau",      desc: "Ruelles colorées, murs peints, architecture de Dakar" },
  { emoji: "🌊", name: "Corniche & Plages",     desc: "La mer, les rochers, les couchers de soleil de Dakar" },
  { emoji: "🌍", name: "Tout le Sénégal",       desc: "Saint-Louis, Casamance, Lac Rose — on se déplace" },
];

const whyKekeli = [
  { icon: Eye,      title: "Regard artistique",      desc: "Nous comprenons l'esthétique musicale africaine. Chaque photo raconte quelque chose de vous." },
  { icon: Star,     title: "Retouche haut de gamme", desc: "Colorimétrie professionnelle, retouche peau respectueuse et livraison dans tous les formats." },
  { icon: MapPin,   title: "Décors exclusifs",       desc: "Accès à des lieux uniques à Dakar et dans tout le Sénégal — des spots que vous n'auriez pas trouvés seul." },
  { icon: Aperture, title: "Équipement pro",         desc: "Appareils plein format, objectifs premium, éclairages studio et flash portable pour l'extérieur." },
  { icon: Zap,      title: "Mise à l'aise garantie", desc: "Notre équipe dirige avec bienveillance — même les artistes peu à l'aise devant l'objectif ressortent avec de belles photos." },
  { icon: Clock,    title: "Livraison rapide",       desc: "Premières photos sous 48h après la séance. Urgences possibles sur demande." },
];

const deliverables = [
  { emoji: "🖼️", label: "Photos retouchées HD",     desc: "Minimum 20 photos sélectionnées et retouchées" },
  { emoji: "📱", label: "Formats réseaux sociaux",  desc: "Instagram carré/portrait, stories, YouTube" },
  { emoji: "🗞️", label: "Format presse",            desc: "Haute résolution pour impression et EPK" },
  { emoji: "🔗", label: "Galerie privée en ligne",  desc: "Lien de téléchargement sécurisé pendant 30 jours" },
];

export default function PhotoPage() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────── */}
      <section
        className="relative py-32 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #08060F 0%, #130A28 35%, #1C0A40 60%, #0A0618 100%)" }}
      >
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[160px] opacity-20" style={{ background: ACCENT }} />
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-[130px] opacity-16" style={{ background: "#0891B2" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full blur-[100px] opacity-10" style={{ background: "#C8A84B" }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="down" className="mb-8">
            <nav className="flex items-center gap-2 text-xs font-body" style={{ color: "rgba(220,210,255,0.45)" }}>
              <Link href="/" className="hover:text-gold transition-colors">Accueil</Link>
              <ChevronRight size={12} />
              <Link href="/artistes" className="hover:text-gold transition-colors">Artistes</Link>
              <ChevronRight size={12} />
              <span style={{ color: "rgba(220,210,255,0.70)" }}>Photo Shooting</span>
            </nav>
          </FadeIn>

          <div className="max-w-3xl">
            <FadeIn direction="up" delay={0.05}>
              <span className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full mb-6 font-body text-xs font-semibold uppercase tracking-[0.14em]" style={{ border: `1px solid rgba(6,182,212,0.35)`, background: "rgba(6,182,212,0.10)", color: "#22D3EE" }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#22D3EE" }} />
                Photo Shooting · KEKELI Creative Agency
              </span>
            </FadeIn>

            <FadeIn direction="up" delay={0.12}>
              <h1 className="font-body font-bold text-5xl sm:text-6xl lg:text-[4rem] leading-[1.08] text-white mb-6">
                Des photos qui<br />
                <span style={{ color: "#22D3EE" }}>posent votre image</span>
              </h1>
            </FadeIn>

            <FadeIn direction="up" delay={0.22}>
              <p className="font-body text-lg leading-relaxed mb-8 max-w-xl" style={{ color: "rgba(220,210,255,0.70)" }}>
                Portraits artiste, shootings thématiques, studio ou extérieur à Dakar —
                KEKELI Creative Agency crée des visuels percutants qui racontent qui vous êtes
                et captivent votre audience au premier regard.
              </p>
            </FadeIn>

            <FadeIn direction="up" delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="#formulaire"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-body font-bold text-base text-black transition-all hover:scale-105"
                  style={{ background: "linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)", boxShadow: "0 8px 30px rgba(6,182,212,0.40)" }}
                >
                  <Camera size={18} />
                  Demander un devis
                </a>
                <a
                  href="#services"
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

      {/* ── CE QU'ON LIVRE ──────────────────────────────── */}
      <section className="py-16" style={{ background: "#08060F" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" className="text-center mb-10">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-2">Ce que vous recevez</p>
            <h2 className="font-display text-3xl text-white">Tout ce qu'il vous faut</h2>
          </FadeIn>
          <FadeInStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {deliverables.map((d) => (
              <FadeInItem key={d.label}>
                <div className="flex flex-col items-center text-center p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <span className="text-3xl mb-3">{d.emoji}</span>
                  <p className="font-body font-semibold text-white text-sm mb-1">{d.label}</p>
                  <p className="font-body text-xs leading-relaxed" style={{ color: "rgba(220,210,255,0.50)" }}>{d.desc}</p>
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* ── TYPES DE SHOOTING ───────────────────────────── */}
      <section id="services" className="py-24" style={{ background: "linear-gradient(160deg, #FBF6EC 0%, #F5EDD8 50%, #FAF4E8 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" className="text-center mb-14">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-3">Formats disponibles</p>
            <h2 className="font-display text-4xl md:text-5xl text-text-primary leading-tight">
              Quel shooting <em className="text-gold not-italic">vous correspond ?</em>
            </h2>
            <p className="font-body text-base text-text-muted mt-4 max-w-xl mx-auto">
              Tarifs sur devis — chaque projet est unique. Remplissez le formulaire pour un devis sous 24h.
            </p>
          </FadeIn>
          <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {shootTypes.map((s) => (
              <FadeInItem key={s.title}>
                <div className="h-full bg-white rounded-2xl p-6 flex flex-col" style={{ boxShadow: "0 4px 20px rgba(6,182,212,0.08)" }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl" style={{ background: "rgba(6,182,212,0.10)" }}>
                      {s.emoji}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-body font-bold text-text-primary text-base">{s.title}</h3>
                        <span className="font-body text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: "rgba(6,182,212,0.12)", color: ACCENT }}>{s.label}</span>
                      </div>
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

      {/* ── LIEUX ───────────────────────────────────────── */}
      <section className="py-20" style={{ background: "#08060F" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" className="text-center mb-12">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-3">Nos terrains</p>
            <h2 className="font-display text-3xl md:text-4xl text-white leading-tight">
              On shoote <em className="text-gold not-italic">partout</em>
            </h2>
          </FadeIn>
          <FadeInStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {locations.map((loc) => (
              <FadeInItem key={loc.name}>
                <div className="flex flex-col items-center text-center p-6 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <span className="text-4xl mb-3">{loc.emoji}</span>
                  <h3 className="font-body font-bold text-white text-sm mb-2">{loc.name}</h3>
                  <p className="font-body text-xs leading-relaxed" style={{ color: "rgba(220,210,255,0.50)" }}>{loc.desc}</p>
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
            <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-3">Notre méthode</p>
            <h2 className="font-display text-4xl md:text-5xl text-text-primary leading-tight">
              Du brief aux <em className="text-gold not-italic">photos finales</em>
            </h2>
          </FadeIn>
          <FadeInStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {processSteps.map((s) => (
              <FadeInItem key={s.step}>
                <div className="flex flex-col p-5 rounded-2xl h-full bg-white" style={{ boxShadow: "0 4px 20px rgba(6,182,212,0.07)" }}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-body font-bold text-[10px] tracking-[0.2em]" style={{ color: ACCENT }}>{s.step}</span>
                    <span className="text-xl">{s.icon}</span>
                  </div>
                  <h3 className="font-body font-bold text-text-primary text-sm mb-2">{s.title}</h3>
                  <p className="font-body text-xs leading-relaxed text-text-muted">{s.desc}</p>
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
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(6,182,212,0.14)" }}>
                    <Icon size={18} style={{ color: ACCENT }} />
                  </div>
                  <div>
                    <p className="font-body font-semibold text-white text-sm mb-1">{title}</p>
                    <p className="font-body text-xs leading-relaxed" style={{ color: "rgba(220,210,255,0.55)" }}>{desc}</p>
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
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 rounded-full blur-[140px] opacity-18" style={{ background: ACCENT }} />
          <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full blur-[120px] opacity-12" style={{ background: "#0891B2" }} />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" className="text-center mb-12">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: "#22D3EE" }}>Brief shooting</p>
            <h2 className="font-display text-4xl md:text-5xl text-white leading-tight mb-4">
              Parlons de votre <em className="text-gold not-italic">shooting</em>
            </h2>
            <p className="font-body text-base" style={{ color: "rgba(220,210,255,0.60)" }}>
              Décrivez votre vision. Notre photographe vous répond sous 24h avec un devis personnalisé et des suggestions de lieux.
            </p>
          </FadeIn>

          <FadeIn direction="up" delay={0.15}>
            <div className="rounded-3xl p-6 sm:p-10" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.10)", backdropFilter: "blur(12px)" }}>
              <PhotoForm />
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
