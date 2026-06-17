import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Check, Users, TrendingUp, Mic2, BookOpen, Heart, Shield, Star, Zap } from "lucide-react";
import FadeIn, { FadeInStagger, FadeInItem } from "@/components/animations/FadeIn";
import AccompagnementForm from "@/components/accompagnement/AccompagnementForm";

export const metadata: Metadata = {
  title: "Accompagnement Artiste — De zéro à professionnel",
  description:
    "Mentoring, gestion de carrière, coaching et préparation aux médias. KEKELI Creative Agency accompagne les artistes sénégalais à chaque étape de leur parcours professionnel.",
  keywords: ["accompagnement artiste Sénégal", "mentoring musicien Dakar", "gestion carrière artiste africain", "coaching artiste Dakar", "développement carrière musicale Sénégal"],
  alternates: { canonical: "/artistes/accompagnement" },
  openGraph: {
    title: "Accompagnement Artiste — De zéro à professionnel — KEKELI Creative Agency",
    description: "Mentoring, gestion de carrière, coaching image et préparation aux médias à Dakar.",
    url: "/artistes/accompagnement",
  },
};

const ACCENT = "#10B981";
const ACCENT_LIGHT = "#6EE7B7";

const services = [
  {
    emoji: "🚀",
    title: "De zéro à professionnel",
    desc: "Le programme complet pour les artistes qui partent de zéro et veulent bâtir une carrière musicale solide, étape par étape.",
    includes: [
      "Audit de vos forces et potentiel",
      "Plan de carrière personnalisé sur 12 mois",
      "Accompagnement distribution & droits",
      "Stratégie de lancement sur les réseaux",
      "Introduction au réseau professionnel KEKELI",
      "Sessions de suivi bimensuelles",
    ],
  },
  {
    emoji: "🧭",
    title: "Mentoring & Coaching artistique",
    desc: "Sessions régulières avec un expert KEKELI qui vous guide dans vos décisions artistiques, stratégiques et commerciales.",
    includes: [
      "Sessions individuelles (1h à 1h30)",
      "Feedback sur vos projets en cours",
      "Conseils sur vos choix artistiques",
      "Analyse de votre audience et de vos stats",
      "Accès à notre réseau de professionnels",
      "Support WhatsApp entre les sessions",
    ],
  },
  {
    emoji: "📊",
    title: "Gestion de carrière",
    desc: "On prend en charge la planification stratégique de votre carrière : opportunités, négociations, agenda et développement de réseau.",
    includes: [
      "Stratégie de développement à court et long terme",
      "Recherche et négociation d'opportunités",
      "Gestion des collaborations et features",
      "Représentation auprès des médias et labels",
      "Suivi des contrats et des droits",
      "Agenda et planning éditorial",
    ],
  },
  {
    emoji: "🎙️",
    title: "Préparation aux médias",
    desc: "Soyez à l'aise et impactant face aux médias. Interview radio, plateau TV, conférence de presse — on vous prépare à tout.",
    includes: [
      "Coaching interview radio & podcast",
      "Préparation passage plateau TV",
      "Messages clés et storytelling personnel",
      "Gestion du stress et de la présence caméra",
      "Simulation d'interviews difficiles",
      "Relations presse & communiqués",
    ],
  },
];

const etapes = [
  { step: "01", icon: "🔍", title: "Bilan de carrière",      desc: "On évalue ensemble votre situation, vos forces, vos faiblesses et les opportunités disponibles pour vous." },
  { step: "02", icon: "🗺️", title: "Plan d'action",          desc: "On co-construit un plan de carrière réaliste et ambitieux avec des étapes claires et mesurables." },
  { step: "03", icon: "🤝", title: "Mise en action",         desc: "On active les premiers leviers : distribution, réseaux, droits, réseau professionnel, communication." },
  { step: "04", icon: "📈", title: "Suivi régulier",         desc: "Sessions de suivi régulières pour ajuster la stratégie, célébrer les avancées et surmonter les obstacles." },
  { step: "05", icon: "⭐", title: "Montée en puissance",    desc: "Opportunités, collaborations, médias, concerts — on vous ouvre les portes et on vous prépare à les franchir." },
];

const temoignages = [
  { quote: "Avant KEKELI, je ne savais pas comment monétiser ma musique ni comment approcher les médias. Maintenant j'ai une vraie stratégie.", name: "Artiste Rap", ville: "Dakar" },
  { quote: "Grâce à l'accompagnement, j'ai signé mon premier contrat de distribution et décroché une interview sur la RTS en 3 mois.", name: "Artiste Afropop", ville: "Thiès" },
  { quote: "Le mentoring m'a aidé à comprendre le business de la musique, pas seulement l'artistique. C'est ce qui manquait.", name: "Artiste Gospel", ville: "Dakar" },
];

const whyKekeli = [
  { icon: Heart,     title: "Accompagnement humain",    desc: "On croit en chaque artiste qu'on accompagne. Pas un numéro — une relation de confiance sur le long terme." },
  { icon: Shield,    title: "Expérience du terrain",    desc: "Nos accompagnateurs ont eux-mêmes évolué dans le milieu musical sénégalais. Ils connaissent les réalités du terrain." },
  { icon: TrendingUp, title: "Résultats concrets",      desc: "Pas de discours vague. Des actions mesurables, des objectifs clairs et un suivi de vos progrès semaine après semaine." },
  { icon: Users,     title: "Réseau ouvert",            desc: "Intégrer KEKELI, c'est accéder à un réseau de journalistes, labels, photographes, réalisateurs et programmateurs." },
  { icon: BookOpen,  title: "Formation continue",       desc: "En plus du suivi, on partage des ressources, des guides et des outils pour que vous montiez en compétences." },
  { icon: Star,      title: "Adapté à vous",            desc: "Chaque plan d'accompagnement est unique. On s'adapte à votre genre, votre budget, votre rythme et vos objectifs." },
];

const chiffres = [
  { value: "3 mois", label: "Pour voir les premiers résultats mesurables" },
  { value: "360°",   label: "Artistique, stratégique, commercial et médiatique" },
  { value: "24h",    label: "Délai de réponse après votre demande" },
  { value: "100%",   label: "Personnalisé selon votre profil et vos objectifs" },
];

export default function AccompagnementPage() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────── */}
      <section
        className="relative py-32 overflow-hidden"
        style={{ background: "#0C0B09" }}
      >
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[160px] opacity-20" style={{ background: ACCENT }} />
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-[130px] opacity-15" style={{ background: "#059669" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full blur-[100px] opacity-10" style={{ background: "#C8A84B" }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="down" className="mb-8">
            <nav className="flex items-center gap-2 text-xs font-body" style={{ color: "rgba(255,255,255,0.45)" }}>
              <Link href="/" className="hover:text-gold transition-colors">Accueil</Link>
              <ChevronRight size={12} />
              <Link href="/artistes" className="hover:text-gold transition-colors">Artistes</Link>
              <ChevronRight size={12} />
              <span style={{ color: "rgba(255,255,255,0.70)" }}>Accompagnement</span>
            </nav>
          </FadeIn>

          <div className="max-w-3xl">
            <FadeIn direction="up" delay={0.05}>
              <span className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full mb-6 font-body text-xs font-semibold uppercase tracking-[0.14em]" style={{ border: "1px solid rgba(16,185,129,0.35)", background: "rgba(16,185,129,0.10)", color: ACCENT_LIGHT }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: ACCENT_LIGHT }} />
                Accompagnement Artiste · KEKELI Creative Agency
              </span>
            </FadeIn>

            <FadeIn direction="up" delay={0.12}>
              <h1 className="font-body font-bold text-5xl sm:text-6xl lg:text-[4rem] leading-[1.08] text-white mb-6">
                De zéro à<br />
                <span style={{ color: ACCENT_LIGHT }}>professionnel</span>
              </h1>
            </FadeIn>

            <FadeIn direction="up" delay={0.22}>
              <p className="font-body text-lg leading-relaxed mb-8 max-w-xl" style={{ color: "rgba(255,255,255,0.70)" }}>
                Mentoring, gestion de carrière, coaching image, préparation aux médias —
                KEKELI Creative Agency marche à vos côtés à chaque étape de votre parcours
                pour faire de votre passion une carrière professionnelle.
              </p>
            </FadeIn>

            <FadeIn direction="up" delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="#formulaire"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-body font-bold text-base text-black transition-all hover:scale-105"
                  style={{ background: "linear-gradient(135deg, #C8A84B 0%, #D4A83A 100%)", boxShadow: "0 8px 30px rgba(200,168,75,0.40)" }}
                >
                  <Users size={18} />
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

      {/* ── NOS SERVICES ────────────────────────────────── */}
      <section id="services" className="py-24" style={{ background: "linear-gradient(160deg, #FBF6EC 0%, #F5EDD8 50%, #FAF4E8 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" className="text-center mb-14">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-3">Ce qu'on fait pour vous</p>
            <h2 className="font-display text-4xl md:text-5xl text-text-primary leading-tight">
              Nos services <em className="text-gold not-italic">d'accompagnement</em>
            </h2>
            <p className="font-body text-base text-text-muted mt-4 max-w-xl mx-auto">
              Chaque artiste a un parcours unique. Tarifs sur devis après un premier échange gratuit.
            </p>
          </FadeIn>
          <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((s) => (
              <FadeInItem key={s.title}>
                <div className="h-full bg-white rounded-2xl p-6 flex flex-col" style={{ boxShadow: "0 4px 20px rgba(16,185,129,0.08)" }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0" style={{ background: "rgba(16,185,129,0.10)" }}>
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
              Comment on vous <em className="text-gold not-italic">accompagne</em>
            </h2>
          </FadeIn>
          <FadeInStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {etapes.map((s) => (
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

      {/* ── TÉMOIGNAGES ─────────────────────────────────── */}
      <section className="py-20" style={{ background: "linear-gradient(160deg, #FBF6EC 0%, #F5EDD8 50%, #FAF4E8 100%)" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" className="text-center mb-12">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-3">Ils nous font confiance</p>
            <h2 className="font-display text-4xl text-text-primary">Ce qu'ils en disent</h2>
          </FadeIn>
          <FadeInStagger className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {temoignages.map((t) => (
              <FadeInItem key={t.name}>
                <div className="bg-white rounded-2xl p-6 flex flex-col gap-4" style={{ boxShadow: "0 4px 20px rgba(16,185,129,0.08)" }}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(16,185,129,0.12)" }}>
                    <span className="font-display text-xl" style={{ color: ACCENT, lineHeight: 1 }}>"</span>
                  </div>
                  <p className="font-body text-sm leading-relaxed text-text-secondary flex-1 italic">{t.quote}</p>
                  <div>
                    <p className="font-body font-semibold text-text-primary text-xs">{t.name}</p>
                    <p className="font-body text-xs text-text-muted">{t.ville}</p>
                  </div>
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
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(16,185,129,0.14)" }}>
                    <Icon size={18} style={{ color: ACCENT }} />
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
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 rounded-full blur-[140px] opacity-18" style={{ background: ACCENT }} />
          <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full blur-[120px] opacity-12" style={{ background: "#059669" }} />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" className="text-center mb-12">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: ACCENT_LIGHT }}>Premier échange gratuit</p>
            <h2 className="font-display text-4xl md:text-5xl text-white leading-tight mb-4">
              Commencez votre <em className="text-gold not-italic">parcours</em>
            </h2>
            <p className="font-body text-base" style={{ color: "rgba(255,255,255,0.60)" }}>
              Partagez votre situation et vos ambitions. Notre équipe vous répond sous 24h pour un premier échange sans engagement.
            </p>
          </FadeIn>

          <FadeIn direction="up" delay={0.15}>
            <div className="rounded-3xl p-6 sm:p-10" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.10)", backdropFilter: "blur(12px)" }}>
              <AccompagnementForm />
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
