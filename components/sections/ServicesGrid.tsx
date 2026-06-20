"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight, Music2, Camera, Video,
  Monitor, MessageSquare, Megaphone, Headphones, Smartphone,
} from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import SectionHeader from "@/components/ui/SectionHeader";
import { useT } from "@/hooks/useT";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const GOLD   = "gold";
const VIOLET = "violet";
const NAVY   = "navy";

type CardTheme = {
  bg: string;
  accentBar: string;
  text: string;
  textMuted: string;
  iconBg: string;
  iconColor: string;
  linkColor: string;
};

function getTheme(accent: string): CardTheme {
  // Gauche — fond sombre chaud (ambré), pour les services Artiste
  if (accent === GOLD) return {
    bg:        "linear-gradient(145deg, #1C1306 0%, #251A00 100%)",
    accentBar: "#C8A84B",
    text:      "#FFFFFF",
    textMuted: "rgba(255,240,200,0.45)",
    iconBg:    "rgba(200,168,75,0.15)",
    iconColor: "#C8A84B",
    linkColor: "#C8A84B",
  };
  // Droite — fond sombre froid (bleu nuit), pour les services Entreprise
  if (accent === VIOLET) return {
    bg:        "linear-gradient(145deg, #07091C 0%, #0C1132 100%)",
    accentBar: "#A78BFA",
    text:      "#FFFFFF",
    textMuted: "rgba(200,210,255,0.45)",
    iconBg:    "rgba(167,139,250,0.13)",
    iconColor: "#A78BFA",
    linkColor: "#A78BFA",
  };
  return {
    bg:        "linear-gradient(145deg, #07091C 0%, #0C1132 100%)",
    accentBar: "#818CF8",
    text:      "#FFFFFF",
    textMuted: "rgba(200,210,255,0.45)",
    iconBg:    "rgba(129,140,248,0.13)",
    iconColor: "#818CF8",
    linkColor: "#818CF8",
  };
}

export default function ServicesGrid() {
  const tr = useT();

  const TOP_SERVICES = [
    { icon: Music2,        label: tr.services.brandingArtiste, desc: tr.services.brandingArtisteDesc, href: "/artistes/branding",        accent: GOLD,   span: "lg:col-span-2" },
    { icon: Camera,        label: tr.services.photo,           desc: tr.services.photoDesc,           href: "/artistes/photo",           accent: VIOLET, span: "" },
    { icon: Smartphone,    label: tr.services.apps,            desc: tr.services.appsDesc,            href: "/entreprises/applications", accent: NAVY,   span: "" },
    { icon: Video,         label: tr.services.clips,           desc: tr.services.clipsDesc,           href: "/artistes/clips",           accent: GOLD,   span: "" },
    { icon: MessageSquare, label: tr.services.community,       desc: tr.services.communityDesc,       href: "/entreprises/community",    accent: GOLD,   span: "" },
    { icon: Monitor,       label: tr.services.website,         desc: tr.services.websiteDesc,         href: "/entreprises/site-web",     accent: NAVY,   span: "lg:col-span-2" },
    { icon: Megaphone,     label: tr.services.ads,             desc: tr.services.adsDesc,             href: "/entreprises/publicite",    accent: GOLD,   span: "lg:col-span-2" },
    { icon: Headphones,    label: tr.services.distribution,    desc: tr.services.distributionDesc,    href: "/artistes/distribution",    accent: VIOLET, span: "" },
    { icon: Smartphone,    label: tr.services.strategy,        desc: tr.services.strategyDesc,        href: "/entreprises/strategie",    accent: NAVY,   span: "" },
  ];

  return (
    <section className="py-20 relative overflow-hidden" style={{ background: "#F0EDE6" }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 25% 50%, rgba(200,168,75,0.06) 0%, transparent 55%), radial-gradient(ellipse at 75% 50%, rgba(100,80,200,0.06) 0%, transparent 55%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <FadeIn direction="up" className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <SectionHeader
            eyebrow={tr.services.eyebrow}
            title={<>{tr.services.title1}<br /><em className="text-gold not-italic">{tr.services.title2}</em></>}
            subtitle={tr.services.subtitle}
          />
          <Link
            href="/services"
            className="shrink-0 self-start md:self-auto inline-flex items-center gap-1.5 font-body text-sm font-semibold text-gold hover:underline"
          >
            {tr.services.seeAll} <ArrowRight size={14} />
          </Link>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TOP_SERVICES.map(({ icon: Icon, label, desc, href, accent, span }, i) => {
            const theme = getTheme(accent);
            return (
              <FadeIn key={href} delay={i * 0.05} direction="up" className={span}>
                <Link href={href} className="block h-full">
                  <motion.div
                    whileHover={{ y: -5, scale: 1.015 }}
                    transition={{ duration: 0.2, ease }}
                    className="group relative rounded-2xl overflow-hidden cursor-pointer flex flex-col h-full min-h-[170px]"
                    style={{
                      background: theme.bg,
                      boxShadow: "0 8px 32px rgba(0,0,0,0.22), 0 2px 6px rgba(0,0,0,0.14)",
                    }}
                  >
                    {/* Colored accent bar */}
                    <div
                      className="absolute top-0 left-0 right-0 h-[3px]"
                      style={{ background: theme.accentBar }}
                    />

                    <div className="relative z-10 p-6 flex flex-col flex-1">
                      {/* Icon */}
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 shrink-0"
                        style={{ background: theme.iconBg }}
                      >
                        <Icon size={18} style={{ color: theme.iconColor }} />
                      </div>

                      {/* Text */}
                      <div className="flex-1">
                        <h3
                          className="font-display text-base font-semibold leading-snug mb-1"
                          style={{ color: theme.text }}
                        >
                          {label}
                        </h3>
                        <p
                          className="font-body text-xs leading-relaxed"
                          style={{ color: theme.textMuted }}
                        >
                          {desc}
                        </p>
                      </div>

                      {/* Arrow link */}
                      <div
                        className="mt-4 flex items-center gap-1 font-body text-xs font-semibold transition-all group-hover:gap-2"
                        style={{ color: theme.linkColor }}
                      >
                        {tr.services.learnMore}
                        <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </FadeIn>
            );
          })}
        </div>

      </div>
    </section>
  );
}
