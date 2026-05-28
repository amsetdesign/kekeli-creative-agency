"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";

const packs = [
  {
    name: "Pack Starter",
    tagline: "Lancez-vous professionnellement",
    color: "#1E40AF",
    items: ["Logo & charte graphique", "Création page Instagram/Facebook", "10 publications design", "Formation réseaux sociaux"],
    cta: "Démarrer",
    popular: false,
  },
  {
    name: "Pack Visibilité",
    tagline: "Gagnez en audience et notoriété",
    color: "#0EA5E9",
    items: ["Branding complet", "Community management (1 mois)", "Campagne publicité ciblée", "Stratégie contenu", "Rapport mensuel"],
    cta: "Booster ma visibilité",
    popular: true,
  },
  {
    name: "Pack Croissance",
    tagline: "Développez votre business en ligne",
    color: "#059669",
    items: ["Site web professionnel", "Publicité Facebook + Instagram", "Automatisations marketing", "Accompagnement 2 mois", "Analytics & rapports"],
    cta: "Accélérer ma croissance",
    popular: false,
  },
];

export default function EntreprisesPacks() {
  return (
    <section className="py-24" style={{ background: "#F7F4EE" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn direction="up" className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest uppercase rounded-full mb-4"
            style={{ color: "#C8A84B", border: "1px solid rgba(200,168,75,0.3)", background: "rgba(200,168,75,0.08)" }}>
            Offres packagées
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-[#0C0B09] mb-4">
            Des packs simples<br />
            <span style={{ color: "#0EA5E9" }}>pour chaque étape</span>
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packs.map(({ name, tagline, color, items, cta, popular }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative"
            >
              {popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <span className="px-4 py-1 rounded-full text-[11px] font-body font-bold text-white"
                    style={{ background: color }}>
                    Le plus populaire
                  </span>
                </div>
              )}
              <div className={`h-full bg-white rounded-2xl p-8 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
                style={{ border: popular ? `2px solid ${color}` : "1px solid rgba(0,0,0,0.07)", boxShadow: popular ? `0 8px 40px ${color}20` : "0 2px 16px rgba(0,0,0,0.05)" }}>
                <div className="w-12 h-12 rounded-xl mb-5" style={{ background: `${color}15` }}>
                  <div className="w-full h-full rounded-xl flex items-center justify-center">
                    <div className="w-5 h-5 rounded-full" style={{ background: color }} />
                  </div>
                </div>
                <h3 className="font-display text-2xl text-[#0C0B09] mb-1">{name}</h3>
                <p className="font-body text-sm text-[#78716C] mb-6">{tagline}</p>
                <ul className="space-y-3 mb-8 flex-1">
                  {items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: `${color}18` }}>
                        <Check size={10} style={{ color }} />
                      </div>
                      <span className="font-body text-sm text-[#57534E]">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="#contact"
                  className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl font-body font-semibold text-sm transition-all duration-200 hover:opacity-90"
                  style={popular ? { background: color, color: "#fff" } : { border: `1.5px solid ${color}`, color }}>
                  {cta} <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <FadeIn direction="up" delay={0.3} className="text-center mt-10">
          <p className="font-body text-sm text-[#78716C]">
            Vous avez un besoin spécifique ?{" "}
            <Link href="#contact" className="font-semibold underline" style={{ color: "#0EA5E9" }}>
              Demandez un devis sur-mesure →
            </Link>
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
