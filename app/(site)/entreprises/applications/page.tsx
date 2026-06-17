import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronRight, Smartphone, Check, ArrowRight,
  Globe, Layout, Zap, Code2, ShieldCheck, RefreshCw,
} from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import EntreprisesForm from "@/components/entreprises/EntreprisesForm";

export const metadata: Metadata = {
  title: "Applications Mobile & Web — Développement App iOS, Android, PWA — KEKELI Creative Agency Dakar",
  description: "Développement d'applications mobiles iOS et Android, applications web progressives (PWA), tableaux de bord et intégrations API pour entreprises à Dakar, Sénégal.",
  alternates: { canonical: "/entreprises/applications" },
};

const COLOR = "#6366F1";

const services = [
  {
    icon: Smartphone,
    title: "App Mobile iOS & Android",
    desc: "Applications natives ou cross-platform développées avec les meilleures technologies pour offrir une expérience utilisateur fluide et performante.",
    items: ["React Native / Flutter", "Design UX/UI sur mesure", "Publication App Store & Play Store", "Notifications push & analytics"],
  },
  {
    icon: Globe,
    title: "Application Web (PWA)",
    desc: "Progressive Web Apps installables depuis le navigateur : rapides, disponibles hors-ligne, sans passer par les stores.",
    items: ["Chargement instantané", "Mode hors-ligne", "Installable sur mobile & desktop", "SEO-friendly"],
  },
  {
    icon: Layout,
    title: "Tableau de Bord & Back-Office",
    desc: "Interfaces d'administration et dashboards pour piloter votre activité, gérer vos données et suivre vos KPIs en temps réel.",
    items: ["Gestion utilisateurs & rôles", "Graphiques & rapports", "Export données", "Interface 100% sur mesure"],
  },
  {
    icon: Code2,
    title: "API & Intégrations",
    desc: "Connexion de vos outils existants : CRM, ERP, plateformes de paiement, réseaux sociaux, systèmes de gestion interne.",
    items: ["API REST & GraphQL", "Intégration Stripe / Wave / Orange Money", "Webhooks & automatisations", "Documentation technique"],
  },
];

const process = [
  { step: "01", title: "Découverte & Cahier des charges", desc: "Ateliers pour comprendre vos besoins, définir les fonctionnalités et cadrer le projet." },
  { step: "02", title: "Maquettes & Prototypage", desc: "Wireframes interactifs, charte UI, validation du parcours utilisateur avant tout développement." },
  { step: "03", title: "Développement Agile", desc: "Sprints de développement avec démonstrations régulières pour ajuster et valider chaque étape." },
  { step: "04", title: "Tests & Recette", desc: "Tests fonctionnels, tests utilisateurs et corrections avant la mise en production." },
  { step: "05", title: "Lancement & Déploiement", desc: "Mise en production, soumission aux stores (si mobile) et formation de vos équipes." },
  { step: "06", title: "Maintenance & Évolution", desc: "Suivi post-lancement, mises à jour, nouvelles fonctionnalités selon vos retours terrain." },
];

const avantages = [
  { icon: Zap, label: "Performances optimisées", desc: "Applications rapides et légères, optimisées pour les connexions africaines." },
  { icon: ShieldCheck, label: "Sécurité & fiabilité", desc: "Authentification sécurisée, chiffrement des données, hébergement robuste." },
  { icon: RefreshCw, label: "Évolutif & maintenable", desc: "Code propre et documenté, facilement adaptable à votre croissance." },
];

export default function ApplicationsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[45vh] flex items-end pb-16 overflow-hidden" style={{ background: "#050A14" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-20"
            style={{ background: `radial-gradient(circle, ${COLOR} 0%, transparent 70%)`, filter: "blur(80px)" }} />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full opacity-15"
            style={{ background: `radial-gradient(circle, #8B5CF6 0%, transparent 70%)`, filter: "blur(60px)" }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <FadeIn direction="down" className="mb-6">
            <nav className="flex items-center gap-2 text-xs font-body text-white/40">
              <Link href="/" className="hover:text-white/70 transition-colors">Accueil</Link>
              <ChevronRight size={12} />
              <Link href="/entreprises" className="hover:text-white/70 transition-colors">Entreprises</Link>
              <ChevronRight size={12} />
              <span className="text-white/70">Applications Mobile & Web</span>
            </nav>
          </FadeIn>
          <FadeIn direction="up" delay={0.1}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${COLOR}22` }}>
                <Smartphone size={20} style={{ color: COLOR }} />
              </div>
              <p className="font-body text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: COLOR }}>
                Applications Mobile & Web
              </p>
            </div>
            <h1 className="font-display text-5xl sm:text-6xl text-white leading-tight mb-4">
              Votre idée,<br /><em className="not-italic" style={{ color: COLOR }}>transformée en application.</em>
            </h1>
            <p className="font-body text-lg text-white/50 max-w-xl mb-8">
              Du concept à la mise en production : nous développons des applications mobiles et web sur mesure, pensées pour vos clients et adaptées au marché africain.
            </p>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-body font-semibold text-sm text-black"
              style={{ background: "linear-gradient(135deg, #C8A84B 0%, #D4A83A 100%)" }}
            >
              Démarrer votre projet <ArrowRight size={16} />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Services */}
      <section className="py-20" style={{ background: "#F7F4EE" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" className="mb-12 text-center">
            <h2 className="font-display text-3xl md:text-4xl text-[#0C0B09]">
              Ce que nous <span style={{ color: COLOR }}>développons</span>
            </h2>
            <p className="font-body text-base text-[#78716C] mt-3 max-w-lg mx-auto">
              Des solutions digitales complètes pour digitaliser, automatiser et développer votre activité.
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map(({ icon: Icon, title, desc, items }) => (
              <div
                key={title}
                className="bg-white rounded-2xl p-7"
                style={{ border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: `${COLOR}15` }}>
                  <Icon size={20} style={{ color: COLOR }} />
                </div>
                <h3 className="font-display text-xl text-[#0C0B09] mb-2">{title}</h3>
                <p className="font-body text-sm text-[#78716C] mb-4">{desc}</p>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li key={item} className="flex items-center gap-2 font-body text-sm text-[#57534E]">
                      <Check size={14} style={{ color: COLOR }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="py-16 bg-[#0C0B09]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {avantages.map(({ icon: Icon, label, desc }) => (
              <FadeIn key={label} direction="up">
                <div className="rounded-2xl p-6 text-center" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
                  <div className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center" style={{ background: `${COLOR}20` }}>
                    <Icon size={22} style={{ color: COLOR }} />
                  </div>
                  <h3 className="font-display text-lg text-white mb-2">{label}</h3>
                  <p className="font-body text-sm text-white/45">{desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20" style={{ background: "#F7F4EE" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" className="mb-12 text-center">
            <h2 className="font-display text-3xl md:text-4xl text-[#0C0B09]">
              Notre <span style={{ color: COLOR }}>processus</span>
            </h2>
          </FadeIn>
          <div className="space-y-4">
            {process.map(({ step, title, desc }, i) => (
              <FadeIn key={step} direction="up" delay={i * 0.08}>
                <div
                  className="flex gap-5 p-6 rounded-2xl bg-white"
                  style={{ border: "1px solid rgba(0,0,0,0.07)" }}
                >
                  <div
                    className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-display text-lg font-bold"
                    style={{ background: `${COLOR}15`, color: COLOR }}
                  >
                    {step}
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-[#0C0B09] mb-1">{title}</h3>
                    <p className="font-body text-sm text-[#78716C]">{desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <EntreprisesForm />
    </>
  );
}
