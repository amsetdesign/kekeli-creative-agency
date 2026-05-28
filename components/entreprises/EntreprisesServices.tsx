"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Building2, Monitor, MessageSquare, Megaphone, TrendingUp, Film, GraduationCap, ArrowRight } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import { useT } from "@/hooks/useT";
import { useLanguage } from "@/providers/LanguageProvider";

const SERVICE_STATIC = [
  { icon: Building2,     href: "/entreprises/branding",    color: "#1E40AF" },
  { icon: Monitor,       href: "/entreprises/site-web",    color: "#0EA5E9" },
  { icon: MessageSquare, href: "/entreprises/community",   color: "#7C3AED" },
  { icon: Megaphone,     href: "/entreprises/publicite",   color: "#F97316" },
  { icon: TrendingUp,    href: "/entreprises/strategie",   color: "#059669" },
  { icon: Film,          href: "/entreprises/photo-video", color: "#EC4899" },
  { icon: GraduationCap, href: "/entreprises/coaching",    color: "#0891B2" },
];

const SERVICE_TEXT_FR = [
  { title: "Identité Visuelle & Branding", desc: "Logo professionnel, charte graphique, cartes de visite, flyers et templates réseaux sociaux — une image de marque cohérente qui inspire confiance.", includes: ["Logo & variantes", "Charte graphique", "Templates réseaux", "Flyers & brochures"] },
  { title: "Site Web & Digitalisation", desc: "Site vitrine, e-commerce ou landing page — une présence digitale professionnelle avec formulaires intelligents et intégration paiement mobile (Wave, Orange Money).", includes: ["Site vitrine", "E-commerce", "Landing pages", "Intégration Wave/OM"] },
  { title: "Community Management", desc: "Gestion complète de vos réseaux sociaux, création de contenus engageants, reels et vidéos courtes pour développer votre audience et fidéliser vos clients.", includes: ["Gestion Instagram/Facebook", "Création contenus", "Reels & TikTok", "Calendrier éditorial"] },
  { title: "Campagnes Publicitaires", desc: "Facebook Ads, Instagram Ads, TikTok Ads et Google Ads — campagnes ciblées, visuels sur-mesure et optimisation continue pour maximiser votre retour sur investissement.", includes: ["Facebook & Instagram Ads", "TikTok & Google Ads", "Ciblage audience", "Rapports ROI"] },
  { title: "Stratégie & Croissance", desc: "Stratégie digitale complète, plan de visibilité, audit de marque et roadmap de croissance pour positionner votre entreprise comme leader dans votre secteur.", includes: ["Audit digital", "Stratégie contenu", "Branding réseaux", "Growth roadmap"] },
  { title: "Photo & Vidéo Business", desc: "Shooting corporate, vidéos publicitaires, reels entreprise et contenus visuels premium pour une image professionnelle sur tous vos supports.", includes: ["Shooting corporate", "Vidéos publicitaires", "Reels & contenus", "Montage professionnel"] },
  { title: "Business Coach 2 Mois", desc: "Accompagnement complet sur 2 mois : formation pratique, suivi hebdomadaire, coaching visibilité et conseils quotidiens pour maîtriser votre communication digitale.", includes: ["Formation Instagram/TikTok", "Suivi hebdomadaire", "Coaching quotidien", "Stratégie personnalisée"] },
];

const SERVICE_TEXT_EN = [
  { title: "Visual Identity & Branding", desc: "Professional logo, brand guidelines, business cards, flyers and social media templates — a coherent brand image that inspires trust.", includes: ["Logo & variations", "Brand guidelines", "Social templates", "Flyers & brochures"] },
  { title: "Website & Digitalization", desc: "Showcase site, e-commerce or landing page — a professional digital presence with smart forms and mobile payment integration (Wave, Orange Money).", includes: ["Showcase site", "E-commerce", "Landing pages", "Wave/OM integration"] },
  { title: "Community Management", desc: "Full management of your social networks, creation of engaging content, reels and short videos to grow your audience and retain clients.", includes: ["Instagram/Facebook management", "Content creation", "Reels & TikTok", "Editorial calendar"] },
  { title: "Advertising Campaigns", desc: "Facebook Ads, Instagram Ads, TikTok Ads and Google Ads — targeted campaigns, custom visuals and continuous optimization to maximize your return on investment.", includes: ["Facebook & Instagram Ads", "TikTok & Google Ads", "Audience targeting", "ROI reports"] },
  { title: "Strategy & Growth", desc: "Complete digital strategy, visibility plan, brand audit and growth roadmap to position your company as a leader in your sector.", includes: ["Digital audit", "Content strategy", "Social branding", "Growth roadmap"] },
  { title: "Photo & Video Business", desc: "Corporate shooting, advertising videos, business reels and premium visual content for a professional image across all your media.", includes: ["Corporate shooting", "Advertising videos", "Reels & content", "Professional editing"] },
  { title: "Business Coach 2 Months", desc: "Complete 2-month support: practical training, weekly follow-up, visibility coaching and daily advice to master your digital communication.", includes: ["Instagram/TikTok training", "Weekly follow-up", "Daily coaching", "Personalized strategy"] },
];

export default function EntreprisesServices() {
  const tr = useT();
  const c = tr.pages.companies;
  const { locale } = useLanguage();
  const textArr = locale === "fr" ? SERVICE_TEXT_FR : SERVICE_TEXT_EN;
  const services = SERVICE_STATIC.map((s, i) => ({ ...s, ...textArr[i] }));

  return (
    <section id="services" className="py-24" style={{ background: "#F7F4EE" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn direction="up" className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest uppercase rounded-full mb-4"
            style={{ color: "#0EA5E9", border: "1px solid rgba(14,165,233,0.25)", background: "rgba(14,165,233,0.06)" }}>
            {c.servicesEyebrow}
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-[#0C0B09] mb-4">
            {c.servicesTitle1}<br />
            <span style={{ color: "#0EA5E9" }}>{c.servicesTitleHL}</span>
          </h2>
          <p className="font-body text-base text-[#78716C] max-w-xl mx-auto">
            {c.servicesSub}
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(({ icon: Icon, title, desc, href, color, includes }, i) => (
            <motion.div
              key={href}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
            >
              <Link href={href} className="group block h-full bg-white rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                style={{ border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${color}15` }}>
                  <Icon size={22} style={{ color }} />
                </div>
                <h3 className="font-display text-lg text-[#0C0B09] mb-2 leading-tight">{title}</h3>
                <p className="font-body text-sm text-[#78716C] mb-4 leading-relaxed">{desc}</p>
                <ul className="space-y-1.5 mb-5">
                  {includes.map((item) => (
                    <li key={item} className="flex items-center gap-2 font-body text-xs text-[#57534E]">
                      <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: color }} />
                      {item}
                    </li>
                  ))}
                </ul>
                <span className="inline-flex items-center gap-1.5 font-body text-xs font-semibold transition-colors duration-200 group-hover:gap-2.5"
                  style={{ color }}>
                  {c.servicesLearnMore} <ArrowRight size={13} />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
