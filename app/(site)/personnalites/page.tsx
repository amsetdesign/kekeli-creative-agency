import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Check, ArrowRight, Palette, Camera, TrendingUp, Shield, Star, Zap, Target, Users, Award } from "lucide-react";
import FadeIn, { FadeInStagger, FadeInItem } from "@/components/animations/FadeIn";
import PersonnalitesForm from "@/components/personnalites/PersonnalitesForm";

export const metadata: Metadata = {
  title: "Personal Branding Personnalités — Coachs, PDG, Politiciens & Influenceurs",
  description:
    "KEKELI Creative Agency construit l'image de marque des personnalités influentes : coachs, PDG, politiciens, entrepreneurs et influenceurs. Personal branding, image digitale, stratégie d'influence et gestion de réputation à Dakar.",
  keywords: [
    "personal branding Dakar",
    "branding influenceur Sénégal",
    "image digitale coach Afrique",
    "gestion réputation PDG Dakar",
    "stratégie influence entrepreneur",
    "identité visuelle personnalité",
  ],
  alternates: { canonical: "/personnalites" },
  openGraph: {
    title: "Personal Branding Personnalités — KEKELI Creative Agency",
    description: "Image de marque personnelle pour les leaders, coachs, PDG, politiciens et influenceurs. KEKELI Creative Agency, Dakar.",
    url: "/personnalites",
  },
};

const ACCENT = "#10B981";

const PROFILES = [
  { emoji: "🎯", title: "Coachs & Formateurs",       desc: "Positionnez-vous comme l'expert incontournable de votre domaine." },
  { emoji: "🏢", title: "PDG & Dirigeants",           desc: "Une image de leader qui inspire confiance et attire les partenariats." },
  { emoji: "🏛️", title: "Leaders Politiques",         desc: "Une présence digitale crédible, professionnelle et rassurante." },
  { emoji: "🚀", title: "Entrepreneurs",               desc: "Devenez la marque vivante de votre business — votre visage vend." },
  { emoji: "📱", title: "Influenceurs & Créateurs",    desc: "Transformez votre audience en empire et monétisez votre notoriété." },
  { emoji: "⚡", title: "Sportifs & Célébrités",       desc: "Un personal brand à la hauteur de vos performances et partenariats." },
];

const SERVICES = [
  {
    icon: Palette,
    emoji: "🎨",
    href: "/personnalites/personal-branding",
    title: "Personal Branding",
    tag: "Identité visuelle",
    desc: "Logo personnel, monogramme, charte graphique, templates réseaux — votre univers visuel en une identité unique et mémorable.",
    includes: [
      "Logo & monogramme personnalisé",
      "Charte graphique complète",
      "Templates posts & stories",
      "Bannières & couvertures réseaux",
      "Kit de marque personnelle PDF",
    ],
  },
  {
    icon: Camera,
    emoji: "📸",
    href: "/personnalites/image-digitale",
    title: "Image Digitale",
    tag: "Présence en ligne",
    desc: "Bio LinkedIn/Instagram optimisée, shooting photo officiel, profils réseaux harmonisés — une première impression irréprochable.",
    includes: [
      "Audit complet de vos profils",
      "Bio & biographie réseaux optimisées",
      "Shooting photo professionnel",
      "Harmonisation de tous vos profils",
      "Site web / landing page personnelle",
    ],
  },
  {
    icon: TrendingUp,
    emoji: "📈",
    href: "/personnalites/strategie-influence",
    title: "Stratégie d'Influence",
    tag: "Contenu & croissance",
    desc: "Ligne éditoriale, calendrier de contenu, positionnement d'expert — un plan concret pour amplifier votre impact en ligne.",
    includes: [
      "Définition de votre niche & positionnement",
      "Ligne éditoriale sur mesure",
      "Calendrier contenu 30 jours",
      "Formats & sujets adaptés à votre audience",
      "Stratégie de croissance par plateforme",
    ],
  },
  {
    icon: Shield,
    emoji: "🛡️",
    href: "/personnalites/gestion-reputation",
    title: "Gestion de Réputation",
    tag: "E-réputation & crise",
    desc: "Monitoring de votre image en ligne, gestion de crise, community management VIP — protégez et renforcez votre réputation.",
    includes: [
      "Monitoring e-réputation hebdomadaire",
      "Veille médias sociaux & presse",
      "Protocole de gestion de crise",
      "Réponse & modération communauté",
      "Rapport mensuel & recommandations",
    ],
  },
];

const WHY = [
  { icon: Star,   title: "Approche premium",         desc: "Des livrables pensés pour les profils à haute visibilité — rien de générique, tout sur mesure." },
  { icon: Zap,    title: "Rapidité d'exécution",     desc: "Nous comprenons l'urgence. La plupart des projets sont livrés en 7 à 14 jours ouvrables." },
  { icon: Target, title: "Résultats mesurables",     desc: "Chaque service est orienté objectif : plus de crédibilité, plus d'opportunités, plus d'impact." },
  { icon: Users,  title: "Discrétion garantie",      desc: "Confidentialité totale sur tous vos projets — NDA disponible sur demande." },
  { icon: Award,  title: "Expérience terrain",        desc: "Nous avons accompagné des coaches, dirigeants et influenceurs au Sénégal et en Afrique de l'Ouest." },
  { icon: Check,  title: "Accompagnement continu",   desc: "Même après la livraison, notre équipe reste disponible pour ajuster, adapter et faire évoluer." },
];

export default function PersonnalitesPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section
        className="relative py-32 overflow-hidden"
        style={{ background: "#080D0B" }}
      >
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[170px] opacity-20" style={{ background: ACCENT }} />
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-[140px] opacity-15" style={{ background: "#059669" }} />
          <div className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full blur-[100px] opacity-10" style={{ background: "#C8A84B" }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="down" className="mb-8">
            <nav className="flex items-center gap-2 text-xs font-body" style={{ color: "rgba(255,255,255,0.45)" }}>
              <Link href="/" className="hover:text-gold transition-colors">Accueil</Link>
              <ChevronRight size={12} />
              <span style={{ color: "rgba(255,255,255,0.70)" }}>Personnalités & Influenceurs</span>
            </nav>
          </FadeIn>

          <div className="max-w-3xl">
            <FadeIn direction="up" delay={0.05}>
              <span
                className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full mb-6 font-body text-xs font-semibold uppercase tracking-[0.14em]"
                style={{ border: `1px solid ${ACCENT}55`, background: `${ACCENT}12`, color: ACCENT }}
              >
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: ACCENT }} />
                Personal Branding · Personnalités & Influenceurs
              </span>
            </FadeIn>

            <FadeIn direction="up" delay={0.12}>
              <h1 className="font-body font-bold text-5xl sm:text-6xl lg:text-[4rem] leading-[1.08] text-white mb-6">
                Votre image.<br />
                Votre impact.<br />
                <span style={{ color: ACCENT }}>Votre légende.</span>
              </h1>
            </FadeIn>

            <FadeIn direction="up" delay={0.22}>
              <p className="font-body text-lg leading-relaxed mb-8 max-w-xl" style={{ color: "rgba(255,255,255,0.68)" }}>
                Pour les coaches, PDG, politiciens, entrepreneurs et influenceurs qui veulent une présence digitale
                à la hauteur de leur ambition — KEKELI construit votre marque personnelle de A à Z.
              </p>
            </FadeIn>

            <FadeIn direction="up" delay={0.30}>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="#consultation"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-body font-bold text-base text-black transition-all hover:scale-105"
                  style={{ background: `linear-gradient(135deg, ${ACCENT} 0%, #059669 100%)`, boxShadow: `0 8px 30px ${ACCENT}40` }}
                >
                  Demander une consultation
                </a>
                <a
                  href="#services"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-body font-semibold text-base transition-all hover:bg-white/5"
                  style={{ border: "2px solid rgba(255,255,255,0.22)", color: "rgba(255,255,255,0.82)" }}
                >
                  Voir nos services
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── PROFILS CIBLÉS ───────────────────────────────── */}
      <section className="py-20" style={{ background: "#06100C" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" className="text-center mb-12">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] mb-2" style={{ color: ACCENT }}>Fait pour vous</p>
            <h2 className="font-display text-4xl text-white">
              Vous êtes <em className="not-italic" style={{ color: ACCENT }}>une personnalité influente</em> ?
            </h2>
            <p className="font-body text-sm mt-3 max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.50)" }}>
              Que vous ayez 1 000 ou 1 million de followers, votre image mérite d&apos;être construite avec soin.
            </p>
          </FadeIn>
          <FadeInStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PROFILES.map((p) => (
              <FadeInItem key={p.title}>
                <div
                  className="flex items-start gap-4 p-5 rounded-2xl transition-all hover:-translate-y-1 duration-300"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <span className="text-3xl shrink-0">{p.emoji}</span>
                  <div>
                    <h3 className="font-body font-bold text-white text-sm mb-1">{p.title}</h3>
                    <p className="font-body text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.48)" }}>{p.desc}</p>
                  </div>
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────── */}
      <section id="services" className="py-24" style={{ background: "linear-gradient(160deg, #F0FDF4 0%, #ECFDF5 50%, #F0FDF4 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" className="text-center mb-14">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: "#059669" }}>Nos expertises</p>
            <h2 className="font-display text-4xl md:text-5xl text-gray-900 leading-tight">
              4 services pour{" "}
              <em className="not-italic" style={{ color: ACCENT }}>construire votre image</em>
            </h2>
            <p className="font-body text-base text-gray-500 mt-4 max-w-xl mx-auto">
              Chaque service est pensé pour les personnalités publiques. Tarifs sur devis — réponse sous 24h.
            </p>
          </FadeIn>

          <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SERVICES.map((s) => {
              const Icon = s.icon;
              return (
                <FadeInItem key={s.title}>
                  <div className="h-full bg-white rounded-2xl p-6 flex flex-col" style={{ boxShadow: `0 4px 24px ${ACCENT}14` }}>
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0" style={{ background: `${ACCENT}15` }}>
                        {s.emoji}
                      </div>
                      <div>
                        <span className="inline-block px-2 py-0.5 rounded-full font-body text-[10px] font-semibold uppercase tracking-wide mb-1" style={{ background: `${ACCENT}15`, color: "#059669" }}>
                          {s.tag}
                        </span>
                        <h3 className="font-body font-bold text-gray-900 text-base leading-snug">{s.title}</h3>
                      </div>
                    </div>
                    <p className="font-body text-xs text-gray-500 leading-relaxed mb-4">{s.desc}</p>
                    <div className="space-y-1.5 flex-1">
                      {s.includes.map((item) => (
                        <div key={item} className="flex items-start gap-2">
                          <Check size={12} className="mt-0.5 shrink-0" style={{ color: ACCENT }} />
                          <span className="font-body text-xs text-gray-600">{item}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-5 pt-4 border-t border-gray-100">
                      <Link
                        href={s.href}
                        className="inline-flex items-center gap-1.5 font-body text-xs font-semibold transition-colors group"
                        style={{ color: ACCENT }}
                      >
                        En savoir plus
                        <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </FadeInItem>
              );
            })}
          </FadeInStagger>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────── */}
      <section className="py-16" style={{ background: "#06100C" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInStagger className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              { value: "48h",  label: "Délai de première réponse" },
              { value: "+300", label: "Personnalités accompagnées" },
              { value: "97%",  label: "Clients satisfaits" },
              { value: "×3",   label: "Engagement moyen après branding" },
            ].map(({ value, label }) => (
              <FadeInItem key={label}>
                <div className="p-6 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <p className="font-display text-4xl font-bold mb-2" style={{ color: ACCENT }}>{value}</p>
                  <p className="font-body text-xs" style={{ color: "rgba(255,255,255,0.50)" }}>{label}</p>
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* ── POURQUOI KEKELI ──────────────────────────────── */}
      <section className="py-24" style={{ background: "linear-gradient(160deg, #F0FDF4 0%, #ECFDF5 50%, #F0FDF4 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" className="text-center mb-14">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: "#059669" }}>Nos atouts</p>
            <h2 className="font-display text-4xl md:text-5xl text-gray-900">
              Pourquoi choisir{" "}
              <em className="not-italic" style={{ color: ACCENT }}>KEKELI ?</em>
            </h2>
          </FadeIn>
          <FadeInStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {WHY.map(({ icon: Icon, title, desc }) => (
              <FadeInItem key={title}>
                <div className="flex gap-4 p-5 rounded-2xl bg-white" style={{ boxShadow: `0 4px 20px ${ACCENT}12` }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${ACCENT}15` }}>
                    <Icon size={18} style={{ color: ACCENT }} />
                  </div>
                  <div>
                    <p className="font-body font-semibold text-gray-900 text-sm mb-1">{title}</p>
                    <p className="font-body text-xs leading-relaxed text-gray-500">{desc}</p>
                  </div>
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* ── FORMULAIRE ───────────────────────────────────── */}
      <section
        id="consultation"
        className="py-24 relative overflow-hidden"
        style={{ background: "#080D0B" }}
      >
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 rounded-full blur-[150px] opacity-15" style={{ background: ACCENT }} />
          <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full blur-[120px] opacity-10" style={{ background: "#059669" }} />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" className="text-center mb-12">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: ACCENT }}>Consultation gratuite</p>
            <h2 className="font-display text-4xl md:text-5xl text-white leading-tight mb-4">
              Construisons votre <em className="not-italic" style={{ color: ACCENT }}>marque personnelle</em>
            </h2>
            <p className="font-body text-base" style={{ color: "rgba(255,255,255,0.55)" }}>
              Partagez votre profil et vos ambitions. Notre équipe vous répond en moins de 24h avec une proposition sur mesure.
            </p>
          </FadeIn>

          <FadeIn direction="up" delay={0.15}>
            <div className="rounded-3xl p-6 sm:p-10" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", backdropFilter: "blur(12px)" }}>
              <PersonnalitesForm />
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
