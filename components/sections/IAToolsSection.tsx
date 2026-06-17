"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, BarChart2, Rocket, Wand2, Star, Search, Share2, Map, ArrowRight } from "lucide-react";
import { useT } from "@/hooks/useT";

const ARTISTE_TOOLS_STATIC = [
  { icon: Sparkles,  href: "/artistes/vision",              color: "#C8A84B", tk: "vision" },
  { icon: BarChart2, href: "/artistes/analyse-reseaux",     color: "#D946EF", tk: "network" },
  { icon: Rocket,    href: "/artistes/strategie-lancement", color: "#F43F5E", tk: "launch" },
  { icon: Wand2,     href: "/artistes/moodboard",           color: "#A855F7", tk: "moodboard" },
] as const;

const ENT_TOOLS_STATIC = [
  { icon: Star,   href: "/entreprises/brand-score",      color: "#C8A84B", tk: "brandScore" },
  { icon: Search, href: "/entreprises/audit-visibilite", color: "#3B82F6", tk: "audit" },
  { icon: Share2, href: "/entreprises/reseau-ideal",     color: "#8B5CF6", tk: "idealNetwork" },
  { icon: Map,    href: "/entreprises/diagnostic",       color: "#10B981", tk: "diagnostic" },
] as const;

interface ToolCardProps { icon: React.ElementType; label: string; desc: string; href: string; color: string; tag: string }
function ToolCard({ icon: Icon, label, desc, href, color, tag }: ToolCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <Link
        href={href}
        className="group block h-full rounded-2xl p-5 transition-all"
        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
      >
        <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
          style={{ background: `${color}18`, border: `1px solid ${color}25` }}>
          <Icon size={18} style={{ color }} />
        </div>
        <p className="font-body text-sm font-semibold text-white mb-1.5 leading-tight">{label}</p>
        <p className="font-body text-xs text-white/40 leading-relaxed mb-4">{desc}</p>
        <span className="font-body text-[10px] font-semibold px-2.5 py-1 rounded-full"
          style={{ background: `${color}18`, color }}>
          {tag}
        </span>
      </Link>
    </motion.div>
  );
}

export default function IAToolsSection() {
  const tr = useT();

  const ARTISTE_TOOLS = ARTISTE_TOOLS_STATIC.map((s) => ({
    ...s,
    label: tr.ia.tools[s.tk as keyof typeof tr.ia.tools].label,
    desc:  tr.ia.tools[s.tk as keyof typeof tr.ia.tools].desc,
    tag:   tr.ia.tools[s.tk as keyof typeof tr.ia.tools].tag,
  }));
  const ENT_TOOLS = ENT_TOOLS_STATIC.map((s) => ({
    ...s,
    label: tr.ia.tools[s.tk as keyof typeof tr.ia.tools].label,
    desc:  tr.ia.tools[s.tk as keyof typeof tr.ia.tools].desc,
    tag:   tr.ia.tools[s.tk as keyof typeof tr.ia.tools].tag,
  }));

  return (
    <section className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background — festival image + violet gradient */}
      <div className="absolute inset-0">
        <Image
          src="/images/bg-ia-violet.jpg"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Light tint to preserve text readability over the geometric image */}
        <div
          className="absolute inset-0"
          style={{ background: "rgba(6,2,16,0.55)" }}
        />
      </div>

      {/* Violet blobs */}
      <div
        className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[160px] opacity-25 pointer-events-none"
        style={{ background: "#4B0082" }}
      />
      <div
        className="absolute bottom-0 right-1/3 w-80 h-80 rounded-full blur-[130px] opacity-20 pointer-events-none"
        style={{ background: "#6B21A8" }}
      />
      <div
        className="absolute top-1/2 right-0 w-72 h-72 rounded-full blur-[120px] opacity-15 pointer-events-none"
        style={{ background: "#C8A84B" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-4"
              style={{ borderColor: "rgba(200,168,75,0.3)", background: "rgba(200,168,75,0.07)" }}
            >
              <Sparkles size={10} style={{ color: "#C8A84B" }} />
              <span className="font-body text-[10px] font-semibold text-[#C8A84B] uppercase tracking-[0.2em]">
                {tr.ia.badge}
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="font-display text-3xl md:text-4xl text-white leading-tight"
            >
              {tr.ia.title}<br />
              <span style={{ color: "#C8A84B" }}>{tr.ia.titleHighlight}</span>
            </motion.h2>
          </div>
        </div>

        {/* Artistes */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <p className="font-body text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "#C8A84B" }}>
              {tr.ia.artistLabel}
            </p>
            <Link href="/artistes" className="inline-flex items-center gap-1 font-body text-xs text-white/30 hover:text-white transition-colors">
              {tr.ia.seeAll} <ArrowRight size={12} />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ARTISTE_TOOLS.map((tool, i) => (
              <motion.div
                key={tool.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
              >
                <ToolCard {...tool} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Séparateur */}
        <div className="h-px mb-10" style={{ background: "rgba(255,255,255,0.06)" }} />

        {/* Entreprises */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <p className="font-body text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "#C8A84B" }}>
              {tr.ia.companyLabel}
            </p>
            <Link href="/entreprises" className="inline-flex items-center gap-1 font-body text-xs text-white/30 hover:text-white transition-colors">
              {tr.ia.seeAll} <ArrowRight size={12} />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ENT_TOOLS.map((tool, i) => (
              <motion.div
                key={tool.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
              >
                <ToolCard {...tool} />
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
