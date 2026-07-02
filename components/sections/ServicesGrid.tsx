"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const BLOCKS = [
  {
    id: "artistes",
    eyebrow: "Pour les Artistes",
    title: "Propulsez votre carrière musicale",
    description:
      "De la création de votre identité visuelle à la distribution internationale de votre musique, KEKELI accompagne les artistes africains à chaque étape de leur développement professionnel.",
    services: [
      "Branding & identité visuelle",
      "Distribution musicale internationale",
      "Clips vidéo & contenu réseaux sociaux",
      "Stratégie digitale & promotion",
    ],
    cta: { label: "Découvrir les services artistes", href: "/artistes/branding" },
    image: "/images/artiste.jpg",
    imageAlt: "Artiste musicien au piano — KEKELI Creative Agency",
    imageLeft: true,
    accent: "#C8A84B",
    tag: "Musiciens · Rappeurs · Gospel · Afrobeats",
    bg: "linear-gradient(135deg, #0D0520 0%, #1E0040 50%, #0A0B09 100%)",
    textColor: "#FFFFFF",
    mutedColor: "rgba(255,255,255,0.55)",
  },
  {
    id: "entreprises",
    eyebrow: "Pour les PME & Entreprises",
    title: "Une communication qui génère des résultats",
    description:
      "Sites web professionnels, campagnes publicitaires ciblées, gestion des réseaux sociaux — nous donnons aux PME sénégalaises les outils pour se développer et conquérir leur marché.",
    services: [
      "Site web & e-commerce professionnel",
      "Campagnes Facebook, Instagram & Google Ads",
      "Community management & contenu",
      "Photo & vidéo d'entreprise",
    ],
    cta: { label: "Découvrir les services entreprises", href: "/entreprises/branding" },
    image: "/images/entrepreneur.jpg",
    imageAlt: "Entrepreneur PME en activité — KEKELI Creative Agency",
    imageLeft: false,
    accent: "#C8A84B",
    tag: "PME · Startups · Commerces · ONG",
    bg: "#F8F6F0",
    textColor: "#0C0B09",
    mutedColor: "#6B6459",
  },
  {
    id: "personnalites",
    eyebrow: "Pour les Personnalités Publiques",
    title: "Votre image est votre premier message",
    description:
      "Leaders politiques, chefs religieux, entrepreneurs influents ou célébrités — nous construisons et protégeons votre image digitale pour qu'elle reflète votre autorité et votre vision.",
    services: [
      "Personal branding & positionnement",
      "Gestion de e-réputation",
      "Stratégie d'influence digitale",
      "Shooting photo & image professionnelle",
    ],
    cta: { label: "Découvrir les services personnalités", href: "/personnalites/personal-branding" },
    image: "/images/branding.jpg",
    imageAlt: "Personnalité publique — personal branding KEKELI",
    imageLeft: true,
    accent: "#C8A84B",
    tag: "Politiques · Leaders religieux · Influenceurs",
    bg: "linear-gradient(135deg, #0D0520 0%, #1E0040 50%, #0A0B09 100%)",
    textColor: "#FFFFFF",
    mutedColor: "rgba(255,255,255,0.55)",
  },
] as const;

export default function ServicesGrid() {
  return (
    <section aria-label="Nos services">
      {BLOCKS.map((block) => (
        <div key={block.id} style={{ background: block.bg }}>
          <div
            className={`flex flex-col ${
              block.imageLeft ? "lg:flex-row" : "lg:flex-row-reverse"
            } min-h-[420px]`}
          >
            {/* Image — prend exactement la moitié */}
            <div className="relative w-full lg:w-1/2 min-h-[280px] lg:min-h-0 overflow-hidden">
              <Image
                src={block.image}
                alt={block.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Overlay léger — blends into block background color */}
              <div
                className="absolute inset-0"
                style={{
                  background: (() => {
                    const dir   = block.imageLeft ? "to right" : "to left";
                    const edge  = block.textColor === "#FFFFFF" ? "rgba(13,5,32,0.55)" : "rgba(248,246,240,0.4)";
                    return `linear-gradient(${dir}, transparent 65%, ${edge} 100%)`;
                  })(),
                }}
              />
              {/* Label eyebrow sur l'image */}
              <div className="absolute bottom-6 left-6">
                <span
                  className="font-body text-[10px] font-bold uppercase tracking-[0.22em] px-3 py-1.5 rounded-full"
                  style={{ background: block.accent, color: "#000" }}
                >
                  {block.eyebrow}
                </span>
              </div>
            </div>

            {/* Texte */}
            <div
              className="w-full lg:w-1/2 flex items-center"
              style={{ padding: "clamp(2rem, 5vw, 5rem) clamp(1.5rem, 4vw, 4.5rem)" }}
            >
              <div className="max-w-lg w-full">
                <h2
                  className="font-display font-bold leading-tight mb-4"
                  style={{
                    fontSize: "clamp(1.65rem, 3vw, 2.25rem)",
                    color: block.textColor,
                  }}
                >
                  {block.title}
                </h2>

                <p
                  className="font-body text-sm leading-relaxed mb-6"
                  style={{ color: block.mutedColor }}
                >
                  {block.description}
                </p>

                {/* Services */}
                <ul className="space-y-2 mb-7">
                  {block.services.map((s) => (
                    <li
                      key={s}
                      className="flex items-center gap-2.5 font-body text-[13px]"
                      style={{ color: block.mutedColor }}
                    >
                      <span
                        className="w-1 h-1 rounded-full shrink-0"
                        style={{ background: block.accent }}
                      />
                      {s}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href={block.cta.href}
                  className="inline-flex items-center gap-2 font-body text-sm font-semibold transition-all duration-200 hover:gap-3.5"
                  style={{ color: block.accent }}
                >
                  {block.cta.label}
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Séparateur animé Services → KELIBanner */}
      <div className="relative h-[2px] overflow-hidden" style={{ background: "rgba(255,255,255,0.04)" }}>
        <motion.div
          className="absolute inset-y-0 w-1/2"
          style={{
            background: "linear-gradient(to right, transparent, #C8A84B, rgba(139,92,246,0.6), transparent)",
          }}
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
        />
      </div>
    </section>
  );
}
