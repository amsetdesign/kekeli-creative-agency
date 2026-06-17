import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Film, Check, ArrowRight } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import EntreprisesForm from "@/components/entreprises/EntreprisesForm";

export const metadata: Metadata = {
  title: "Photo & Vidéo Business Entreprise — KEKELI Creative Agency Dakar",
  description: "Shooting corporate, vidéos publicitaires et reels pour les entreprises à Dakar. Contenus visuels professionnels pour vos réseaux sociaux et supports marketing.",
  alternates: { canonical: "/entreprises/photo-video" },
};

const COLOR = "#EC4899";

const services = [
  { title: "Shooting Corporate", desc: "Photos professionnelles de vos équipes, locaux et produits pour une image premium.", items: ["Portrait équipe", "Photos produits", "Ambiance locaux", "Retouche incluse"] },
  { title: "Vidéos Publicitaires", desc: "Spots publicitaires courts et percutants pour vos campagnes en ligne.", items: ["Script & storyboard", "Tournage pro", "Montage cinématique", "Formats multi-plateformes"] },
  { title: "Reels & Contenus", desc: "Vidéos courtes pour Instagram Reels et TikTok adaptées aux tendances.", items: ["Formats 9:16", "Montage dynamique", "Sous-titres", "Musiques tendance"] },
  { title: "Vidéos Institutionnelles", desc: "Présentez votre entreprise, vos valeurs et votre équipe de façon professionnelle.", items: ["Interview dirigeants", "B-roll & ambiance", "Motion graphics", "Version courte & longue"] },
];

const process = [
  { n: "01", title: "Brief créatif", desc: "Définition des objectifs, du message et du ton visuel." },
  { n: "02", title: "Préparation", desc: "Sopraduction : script, storyboard, repérage des lieux." },
  { n: "03", title: "Tournage", desc: "Shooting ou tournage professionnel avec notre équipe." },
  { n: "04", title: "Post-production", desc: "Montage, étalonnage, retouche et motion design." },
  { n: "05", title: "Livraison", desc: "Fichiers HD optimisés pour chaque plateforme." },
];

export default function PhotoVideoPage() {
  return (
    <>
      <section className="relative min-h-[45vh] flex items-end pb-16 overflow-hidden" style={{ background: "#050A14" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full opacity-20" style={{ background: `radial-gradient(circle, ${COLOR} 0%, transparent 70%)`, filter: "blur(80px)" }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <FadeIn direction="down" className="mb-6">
            <nav className="flex items-center gap-2 text-xs font-body text-white/40">
              <Link href="/" className="hover:text-white/70 transition-colors">Accueil</Link>
              <ChevronRight size={12} />
              <Link href="/entreprises" className="hover:text-white/70 transition-colors">Entreprises</Link>
              <ChevronRight size={12} />
              <span className="text-white/70">Photo & Vidéo Business</span>
            </nav>
          </FadeIn>
          <FadeIn direction="up" delay={0.1}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${COLOR}22` }}>
                <Film size={20} style={{ color: COLOR }} />
              </div>
              <p className="font-body text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: COLOR }}>Photo & Vidéo Business</p>
            </div>
            <h1 className="font-display text-5xl sm:text-6xl text-white leading-tight mb-4">
              Une image qui vaut<br /><em className="not-italic" style={{ color: COLOR }}>mille mots.</em>
            </h1>
            <p className="font-body text-lg text-white/50 max-w-xl mb-8">
              Shooting corporate, vidéos publicitaires et reels — des contenus visuels premium qui donnent envie de travailler avec vous.
            </p>
            <Link href="#contact" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-body font-semibold text-sm text-black"
              style={{ background: "linear-gradient(135deg, #C8A84B 0%, #D4A83A 100%)" }}>
              Réserver un shooting <ArrowRight size={16} />
            </Link>
          </FadeIn>
        </div>
      </section>

      <section className="py-20" style={{ background: "#F7F4EE" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" className="mb-12 text-center">
            <h2 className="font-display text-3xl md:text-4xl text-[#0C0B09]">Nos prestations <span style={{ color: COLOR }}>visuelles</span></h2>
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
