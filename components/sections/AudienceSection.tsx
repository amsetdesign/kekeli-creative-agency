"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Music2, BarChart3, Briefcase } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

type Platform = { label: string; color: string; x: number; y: number };
type Audience = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  services: string[];
  cta: string;
  href: string;
  accent: string;
  reverse: boolean;
  Icon: React.ElementType;
  platforms: Platform[];
  bars: number[];
  stats: [string, string];
};

const AUDIENCES: Audience[] = [
  {
    id: "artistes",
    eyebrow: "Artistes & Musiciens",
    title: "Ton talent mérite d'être entendu — et vu.",
    description:
      "Du branding à la distribution sur Spotify, Boomplay et Apple Music, KEKELI te donne la stratégie et les outils pour percer, développer ta fanbase et vivre de ta musique.",
    services: ["Branding Artiste", "Clips & Réels", "Distribution Musicale", "TikTok · Instagram", "Booking & Festivals"],
    cta: "Voir nos services artiste",
    href: "/artistes",
    accent: "#C8A84B",
    reverse: false,
    Icon: Music2,
    bars: [0.80, 0.55, 0.92, 0.48, 0.72, 0.61],
    stats: ["24K", "+38%"],
    platforms: [
      { label: "Spotify",     color: "#1DB954", x: -52, y: -100 },
      { label: "TikTok",      color: "#69C9D0", x:  72, y: -108 },
      { label: "Instagram",   color: "#E1306C", x: -100, y:  12 },
      { label: "YouTube",     color: "#FF0000", x:  92, y:  18 },
      { label: "Boomplay",    color: "#F5A623", x:   8, y: -128 },
      { label: "Apple Music", color: "#FC3C44", x:   8, y:  118 },
    ],
  },
  {
    id: "entrepreneurs",
    eyebrow: "Entrepreneurs & PME",
    title: "Votre marque doit être aussi forte que votre produit.",
    description:
      "Site web, identité visuelle, community management et campagnes Meta & Google — KEKELI construit votre présence digitale et convertit votre audience en clients concrets.",
    services: ["Site Web Pro", "Meta & Google Ads", "Community Management", "Identité Visuelle", "Stratégie Digitale"],
    cta: "Voir nos services entreprise",
    href: "/entreprises",
    accent: "#818CF8",
    reverse: true,
    Icon: BarChart3,
    bars: [0.70, 0.88, 0.52, 0.95, 0.65, 0.78],
    stats: ["3.2x", "+147%"],
    platforms: [
      { label: "Meta Ads",   color: "#1877F2", x: -60, y: -100 },
      { label: "Google Ads", color: "#4285F4", x:  75, y: -108 },
      { label: "LinkedIn",   color: "#0A66C2", x: -100, y:  12 },
      { label: "Analytics",  color: "#E37400", x:  92, y:  18 },
      { label: "TikTok Ads", color: "#69C9D0", x:   8, y: -128 },
      { label: "Site Web",   color: "#818CF8", x:   8, y:  118 },
    ],
  },
  {
    id: "personnalites",
    eyebrow: "Personnalités & Hommes d'Affaires",
    title: "Votre image publique est votre premier atout.",
    description:
      "Personal branding, stratégie d'influence et gestion de réputation — KEKELI vous positionne comme une référence dans votre domaine et construit une image durable qui inspire confiance.",
    services: ["Personal Branding", "Image Digitale", "Stratégie Influence", "Gestion Réputation", "Relations Presse"],
    cta: "Voir nos services personnalités",
    href: "/personnalites",
    accent: "#10B981",
    reverse: false,
    Icon: Briefcase,
    bars: [0.62, 0.78, 0.88, 0.55, 0.82, 0.70],
    stats: ["12K", "+91%"],
    platforms: [
      { label: "LinkedIn",  color: "#0A66C2", x: -60, y: -100 },
      { label: "Presse",    color: "#10B981", x:  75, y: -108 },
      { label: "Instagram", color: "#E1306C", x: -100, y:  12 },
      { label: "Influence", color: "#A78BFA", x:  92, y:  18 },
      { label: "Branding",  color: "#C8A84B", x:   8, y: -128 },
      { label: "Réputation",color: "#10B981", x:   8, y:  118 },
    ],
  },
];

function PhoneVisual({ audience }: { audience: Audience }) {
  return (
    <div className="relative flex items-center justify-center" style={{ width: 320, height: 440 }}>

      {/* Soft glow behind phone */}
      <div
        aria-hidden
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 260, height: 260,
          background: audience.accent,
          filter: "blur(90px)",
          opacity: 0.18,
        }}
      />

      {/* Phone frame */}
      <div
        className="absolute z-10 rounded-[30px] overflow-hidden"
        style={{
          width: 158, height: 308,
          left: "50%", top: "50%",
          transform: "translate(-50%, -50%)",
          background: "linear-gradient(160deg, #0A0812 0%, #150D28 100%)",
          border: "1.5px solid rgba(255,255,255,0.09)",
          boxShadow: `0 28px 64px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.04), 0 0 48px ${audience.accent}1A`,
        }}
      >
        {/* Notch */}
        <div className="flex justify-center pt-3">
          <div className="w-10 h-1 rounded-full" style={{ background: "rgba(255,255,255,0.10)" }} />
        </div>

        {/* App header row */}
        <div className="flex items-center gap-2 px-4 py-3">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: `${audience.accent}20`, border: `1px solid ${audience.accent}30` }}
          >
            <audience.Icon size={13} style={{ color: audience.accent }} />
          </div>
          <div className="flex-1 space-y-1">
            <div className="h-1.5 rounded-full" style={{ width: "60%", background: audience.accent }} />
            <div className="h-1 rounded-full" style={{ width: "40%", background: "rgba(255,255,255,0.12)" }} />
          </div>
        </div>

        {/* Animated content bars */}
        <div className="px-4 space-y-2.5">
          {audience.bars.map((w, i) => (
            <motion.div
              key={i}
              className="rounded-full"
              style={{ height: i % 3 === 0 ? 6 : 4, background: i % 2 === 0 ? `${audience.accent}CC` : "rgba(255,255,255,0.07)" }}
              initial={{ width: 0 }}
              animate={{ width: `${w * 100}%` }}
              transition={{ duration: 1.0, delay: 0.4 + i * 0.1, ease }}
            />
          ))}
        </div>

        {/* Stats mini-cards */}
        <div className="flex gap-2 px-4 mt-4">
          {audience.stats.map((v, i) => (
            <div
              key={i}
              className="flex-1 rounded-xl p-2"
              style={{
                background: i === 0 ? `${audience.accent}15` : "rgba(255,255,255,0.04)",
                border: `1px solid ${i === 0 ? audience.accent + "30" : "rgba(255,255,255,0.06)"}`,
              }}
            >
              <p
                className="font-bold text-[11px] leading-none"
                style={{ fontFamily: "'Outfit', sans-serif", color: i === 0 ? audience.accent : "rgba(255,255,255,0.45)" }}
              >
                {v}
              </p>
              <div className="h-1 rounded mt-1.5" style={{ width: "65%", background: "rgba(255,255,255,0.07)" }} />
            </div>
          ))}
        </div>

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
          style={{ background: "linear-gradient(to top, #0A0812 0%, transparent 100%)" }}
        />
      </div>

      {/* Floating platform badges */}
      {audience.platforms.map((p, i) => (
        <motion.div
          key={p.label}
          className="absolute z-20 flex items-center gap-1.5 rounded-full text-[10px] font-semibold whitespace-nowrap px-2.5 py-1.5"
          style={{
            background: `${p.color}14`,
            border: `1px solid ${p.color}50`,
            color: p.color,
            boxShadow: `0 4px 14px ${p.color}18`,
            fontFamily: "'Outfit', sans-serif",
            left: `calc(50% + ${p.x}px)`,
            top:  `calc(50% + ${p.y}px)`,
            translateX: "-50%",
            translateY: "-50%",
          }}
          animate={{ y: [0, -9, 0] }}
          transition={{ duration: 3 + i * 0.65, repeat: Infinity, ease: "easeInOut", delay: i * 0.45 }}
        >
          <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: p.color }} />
          {p.label}
        </motion.div>
      ))}
    </div>
  );
}

export default function AudienceSection() {
  return (
    <section className="relative overflow-hidden" style={{ background: "#06040E" }}>

      {/* Section header */}
      <FadeIn direction="up" className="text-center pt-24 pb-4 px-4">
        <span
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-body text-xs font-semibold uppercase tracking-[0.18em] mb-5"
          style={{ color: "#C8A84B", border: "1px solid rgba(200,168,75,0.30)", background: "rgba(200,168,75,0.07)" }}
        >
          Nos cibles
        </span>
        <h2 className="font-body font-bold text-white leading-tight" style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}>
          Qui que vous soyez,{" "}
          <em className="not-italic" style={{ color: "#C8A84B" }}>nous avons votre solution</em>
        </h2>
        <p className="font-body text-base mt-4 max-w-xl mx-auto" style={{ color: "rgba(220,210,255,0.50)" }}>
          KEKELI accompagne trois profils distincts avec des stratégies sur-mesure.
        </p>
      </FadeIn>

      {/* Three audience blocks */}
      {AUDIENCES.map((audience, idx) => (
        <div
          key={audience.id}
          className="relative border-t"
          style={{ borderColor: "rgba(255,255,255,0.04)", marginTop: idx === 0 ? "3rem" : 0 }}
        >
          {/* Subtle background accent glow */}
          <div
            aria-hidden
            className="absolute pointer-events-none"
            style={{
              width: 700, height: 700,
              borderRadius: "50%",
              background: `radial-gradient(ellipse, ${audience.accent}07 0%, transparent 65%)`,
              [audience.reverse ? "right" : "left"]: "-150px",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
            <div
              className={`flex flex-col ${audience.reverse ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-12 lg:gap-16`}
            >
              {/* ── Text side ── */}
              <FadeIn direction={audience.reverse ? "right" : "left"} className="flex-1 max-w-lg">

                {/* Eyebrow tag */}
                <span
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full font-body text-xs font-semibold uppercase tracking-[0.14em] mb-6"
                  style={{ color: audience.accent, border: `1px solid ${audience.accent}30`, background: `${audience.accent}08` }}
                >
                  <audience.Icon size={11} />
                  {audience.eyebrow}
                </span>

                {/* Title */}
                <h3
                  className="font-body font-bold text-white leading-[1.15] mb-5"
                  style={{ fontSize: "clamp(1.5rem, 2.8vw, 2.1rem)" }}
                >
                  {audience.title}
                </h3>

                {/* Description */}
                <p className="font-body text-[0.97rem] leading-relaxed mb-7" style={{ color: "rgba(220,210,255,0.55)" }}>
                  {audience.description}
                </p>

                {/* Service chips */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {audience.services.map((s) => (
                    <span
                      key={s}
                      className="font-body text-[11px] px-3 py-1.5 rounded-full"
                      style={{ background: `${audience.accent}10`, color: audience.accent, border: `1px solid ${audience.accent}25` }}
                    >
                      {s}
                    </span>
                  ))}
                </div>

                {/* CTA button */}
                <Link
                  href={audience.href}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full font-body font-semibold text-sm transition-all duration-200 hover:brightness-110 active:scale-95 group"
                  style={{
                    background: `linear-gradient(135deg, ${audience.accent}, ${audience.accent}CC)`,
                    color: audience.accent === "#C8A84B" ? "#0C0B09" : "#fff",
                    boxShadow: `0 8px 24px ${audience.accent}35`,
                  }}
                >
                  {audience.cta}
                  <ArrowRight size={14} className="shrink-0 transition-transform group-hover:translate-x-1" />
                </Link>
              </FadeIn>

              {/* ── Visual side ── */}
              <FadeIn direction={audience.reverse ? "left" : "right"} delay={0.15} className="flex-1 flex justify-center">
                <PhoneVisual audience={audience} />
              </FadeIn>
            </div>
          </div>
        </div>
      ))}

      {/* Bottom separator */}
      <div className="h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(200,168,75,0.12), transparent)" }} />
    </section>
  );
}
