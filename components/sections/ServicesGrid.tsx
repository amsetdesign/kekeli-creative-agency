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

export default function ServicesGrid() {
  const tr = useT();

  const TOP_SERVICES = [
    { icon: Music2,       label: tr.services.brandingArtiste, desc: tr.services.brandingArtisteDesc, href: "/artistes/branding",        from: "#C8A84B", to: "#D4A83A", span: "lg:col-span-2" },
    { icon: Camera,       label: tr.services.photo,           desc: tr.services.photoDesc,           href: "/artistes/photo",           from: "#0891B2", to: "#0EA5E9", span: "" },
    { icon: Smartphone,   label: tr.services.apps,            desc: tr.services.appsDesc,            href: "/entreprises/applications", from: "#6366F1", to: "#8B5CF6", span: "" },
    { icon: Video,        label: tr.services.clips,           desc: tr.services.clipsDesc,           href: "/artistes/clips",           from: "#EC4899", to: "#F43F5E", span: "" },
    { icon: MessageSquare,label: tr.services.community,       desc: tr.services.communityDesc,       href: "/entreprises/community",    from: "#7C3AED", to: "#6D28D9", span: "" },
    { icon: Monitor,      label: tr.services.website,         desc: tr.services.websiteDesc,         href: "/entreprises/site-web",     from: "#1D4ED8", to: "#2563EB", span: "lg:col-span-2" },
    { icon: Megaphone,    label: tr.services.ads,             desc: tr.services.adsDesc,             href: "/entreprises/publicite",    from: "#F97316", to: "#EA580C", span: "lg:col-span-2" },
    { icon: Headphones,   label: tr.services.distribution,    desc: tr.services.distributionDesc,    href: "/artistes/distribution",    from: "#10B981", to: "#059669", span: "" },
    { icon: Smartphone,   label: tr.services.strategy,        desc: tr.services.strategyDesc,        href: "/entreprises/strategie",    from: "#0891B2", to: "#0E7490", span: "" },
  ];

  return (
    <section className="py-20" style={{ background: "#F7F4EE" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

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
          {TOP_SERVICES.map(({ icon: Icon, label, desc, href, from, to, span }, i) => (
            <FadeIn key={href} delay={i * 0.05} direction="up" className={span}>
              <Link href={href} className="block h-full">
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ duration: 0.2, ease }}
                  className="group relative rounded-2xl overflow-hidden cursor-pointer p-6 flex flex-col h-full min-h-[160px]"
                  style={{
                    background: `linear-gradient(135deg, ${from} 0%, ${to} 100%)`,
                    boxShadow: `0 8px 32px ${from}35`,
                  }}
                >
                  {/* Deco circle */}
                  <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full opacity-20 pointer-events-none"
                    style={{ background: "rgba(255,255,255,0.5)" }} />
                  <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full opacity-10 pointer-events-none"
                    style={{ background: "rgba(255,255,255,0.5)" }} />

                  {/* Icon */}
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 shrink-0 relative z-10"
                    style={{ background: "rgba(255,255,255,0.22)" }}>
                    <Icon size={18} color="white" />
                  </div>

                  {/* Text */}
                  <div className="relative z-10 flex-1">
                    <h3 className="font-display text-lg font-semibold text-white leading-snug mb-1">
                      {label}
                    </h3>
                    <p className="font-body text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.72)" }}>
                      {desc}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="relative z-10 mt-4 flex items-center gap-1 font-body text-xs font-semibold text-white/80 group-hover:text-white transition-colors">
                    {tr.services.learnMore}
                    <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                  </div>
                </motion.div>
              </Link>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  );
}
