"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Search, Share2, Map, ArrowRight, Lock } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";

const outils = [
  {
    icon: Star,
    title: "Brand Score",
    desc: "Répondez à 10 questions et obtenez votre score d'image de marque avec un rapport détaillé et des recommandations personnalisées.",
    href: "/entreprises/brand-score",
    color: "#C8A84B",
    tag: "Score · Gratuit",
  },
  {
    icon: Search,
    title: "Audit Visibilité",
    desc: "Entrez le nom de votre entreprise et notre IA analyse votre présence digitale complète : site, réseaux, Google, visibilité locale.",
    href: "/entreprises/audit-visibilite",
    color: "#3B82F6",
    tag: "Analyse IA · Gratuit",
  },
  {
    icon: Share2,
    title: "Réseau Idéal",
    desc: "Décrivez votre activité et votre cible — l'IA vous recommande les meilleurs réseaux sociaux et une stratégie adaptée à votre secteur.",
    href: "/entreprises/reseau-ideal",
    color: "#8B5CF6",
    tag: "Recommandation · Gratuit",
  },
  {
    icon: Map,
    title: "Diagnostic Entreprise",
    desc: "\"Que manque-t-il à mon entreprise ?\" — l'IA détecte vos lacunes digitales et vous propose un plan d'action priorisé.",
    href: "/entreprises/diagnostic",
    color: "#10B981",
    tag: "Diagnostic · Gratuit",
  },
];

export default function EntreprisesOutils() {
  return (
    <section className="py-24 bg-[#0C0B09]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn direction="up" className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-widest uppercase rounded-full mb-4"
            style={{ color: "#C8A84B", border: "1px solid rgba(200,168,75,0.3)", background: "rgba(200,168,75,0.08)" }}>
            <Star size={10} />
            Outils IA Gratuits
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-white mb-4">
            Analysez votre entreprise<br />
            <em className="not-italic" style={{ color: "#C8A84B" }}>en quelques minutes</em>
          </h2>
          <p className="font-body text-base text-white/50 max-w-xl mx-auto">
            4 outils gratuits propulsés par l'IA pour diagnostiquer, scorer et planifier votre croissance digitale.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {outils.map(({ icon: Icon, title, desc, href, color, tag }, i) => (
            <motion.div
              key={href}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link href={href} className="group flex gap-5 p-6 rounded-2xl transition-all duration-300 hover:bg-white/[0.04]"
                style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${color}18` }}>
                  <Icon size={22} style={{ color }} />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <h3 className="font-display text-lg text-white leading-tight">{title}</h3>
                    <span className="shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-body font-semibold"
                      style={{ color, background: `${color}18` }}>
                      <Lock size={8} />
                      {tag}
                    </span>
                  </div>
                  <p className="font-body text-sm text-white/45 mb-3 leading-relaxed">{desc}</p>
                  <span className="inline-flex items-center gap-1.5 font-body text-xs font-semibold transition-all duration-200 group-hover:gap-2.5"
                    style={{ color }}>
                    Lancer l'outil <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
