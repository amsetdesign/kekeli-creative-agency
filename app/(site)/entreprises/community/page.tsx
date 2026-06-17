import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, MessageSquare, Check, ArrowRight } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import EntreprisesForm from "@/components/entreprises/EntreprisesForm";

export const metadata: Metadata = {
  title: "Community Management Entreprise — KEKELI Creative Agency Dakar",
  description: "Gestion des réseaux sociaux, création de contenus et reels pour les entreprises à Dakar. Développez votre audience Instagram, Facebook et TikTok.",
  alternates: { canonical: "/entreprises/community" },
};

const COLOR = "#7C3AED";

const services = [
  { title: "Gestion Réseaux Sociaux", desc: "Gestion complète de vos pages Instagram, Facebook et TikTok avec un calendrier éditorial mensuel.", items: ["Calendrier éditorial", "Publications quotidiennes", "Réponses commentaires", "Stories & highlights"] },
  { title: "Création de Contenus", desc: "Visuels, textes et formats adaptés à chaque réseau pour maximiser l'engagement.", items: ["Design posts & stories", "Rédaction des captions", "Hashtags stratégiques", "Templates personnalisés"] },
  { title: "Reels & Vidéos Courtes", desc: "Production de vidéos courtes percutantes pour Instagram Reels et TikTok.", items: ["Script & tournage", "Montage professionnel", "Musiques tendance", "Sous-titres inclus"] },
  { title: "Rapport & Analyse", desc: "Rapport mensuel de performance avec recommandations pour améliorer vos résultats.", items: ["Statistiques détaillées", "Analyse engagement", "Recommandations", "Objectifs mensuels"] },
];

const process = [
  { n: "01", title: "Audit", desc: "Analyse de vos réseaux actuels et identification des opportunités d'amélioration." },
  { n: "02", title: "Stratégie", desc: "Définition du ton, des thématiques et du calendrier éditorial mensuel." },
  { n: "03", title: "Création", desc: "Production des visuels, vidéos et textes pour le mois à venir." },
  { n: "04", title: "Publication", desc: "Programmation et publication aux meilleurs horaires pour votre audience." },
  { n: "05", title: "Rapport", desc: "Bilan mensuel, ajustements et nouvelles recommandations." },
];

export default function CommunityPage() {
  return (
    <>
      <section className="relative min-h-[45vh] flex items-end pb-16 overflow-hidden" style={{ background: "#050A14" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-96 h-96 rounded-full opacity-20" style={{ background: `radial-gradient(circle, ${COLOR} 0%, transparent 70%)`, filter: "blur(80px)" }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <FadeIn direction="down" className="mb-6">
            <nav className="flex items-center gap-2 text-xs font-body text-white/40">
              <Link href="/" className="hover:text-white/70 transition-colors">Accueil</Link>
              <ChevronRight size={12} />
              <Link href="/entreprises" className="hover:text-white/70 transition-colors">Entreprises</Link>
              <ChevronRight size={12} />
              <span className="text-white/70">Community Management</span>
            </nav>
          </FadeIn>
          <FadeIn direction="up" delay={0.1}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${COLOR}22` }}>
                <MessageSquare size={20} style={{ color: COLOR }} />
              </div>
              <p className="font-body text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: COLOR }}>Community Management</p>
            </div>
            <h1 className="font-display text-5xl sm:text-6xl text-white leading-tight mb-4">
              Une communauté engagée<br /><em className="not-italic" style={{ color: COLOR }}>autour de votre marque.</em>
            </h1>
            <p className="font-body text-lg text-white/50 max-w-xl mb-8">
              Gestion professionnelle de vos réseaux sociaux, création de contenus et reels pour attirer et fidéliser vos clients.
            </p>
            <Link href="#contact" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-body font-semibold text-sm text-black"
              style={{ background: "linear-gradient(135deg, #C8A84B 0%, #D4A83A 100%)" }}>
              Gérer mes réseaux <ArrowRight size={16} />
            </Link>
          </FadeIn>
        </div>
      </section>

      <section className="py-20" style={{ background: "#F7F4EE" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" className="mb-12 text-center">
            <h2 className="font-display text-3xl md:text-4xl text-[#0C0B09]">Nos services <span style={{ color: COLOR }}>community</span></h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map(({ title, desc, items }) => (
              <div key={title} className="bg-white rounded-2xl p-7" style={{ border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}>
                <h3 className="font-display text-xl text-[#0C0B09] mb-2">{title}</h3>
                <p className="font-body text-sm text-[#78716C] mb-4">{desc}</p>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li key={item} className="flex items-center gap-2 font-body text-sm text-[#57534E]">
                      <Check size={14} style={{ color: COLOR }} />{item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0C0B09]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" className="mb-12 text-center">
            <h2 className="font-display text-3xl md:text-4xl text-white">Notre <span style={{ color: COLOR }}>processus</span></h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
            {process.map(({ n, title, desc }) => (
              <FadeIn key={n} direction="up" delay={parseInt(n) * 0.08}>
                <div className="p-5 rounded-2xl" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
                  <span className="font-display text-3xl font-bold mb-3 block" style={{ color: `${COLOR}60` }}>{n}</span>
                  <h3 className="font-display text-base text-white mb-2">{title}</h3>
                  <p className="font-body text-xs text-white/40 leading-relaxed">{desc}</p>
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
