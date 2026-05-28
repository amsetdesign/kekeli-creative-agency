"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import FadeIn from "@/components/animations/FadeIn";
import SectionHeader from "@/components/ui/SectionHeader";
import { useT } from "@/hooks/useT";

const PROFILES_STATIC = [
  { emoji: "🏢", href: "/sondage/entreprise", from: "#3B82F6", to: "#1D4ED8", glow: "#60A5FA", tk: "company",  descTk: "companyDesc"  },
  { emoji: "🎤", href: "/sondage/artiste",    from: "#8B5CF6", to: "#6D28D9", glow: "#A78BFA", tk: "artist",   descTk: "artistDesc"   },
  { emoji: "🛒", href: "/sondage/vendeur",    from: "#F97316", to: "#C2410C", glow: "#FB923C", tk: "seller",   descTk: "sellerDesc"   },
  { emoji: "✨", href: "/sondage/marque",     from: "#EC4899", to: "#BE185D", glow: "#F472B6", tk: "brand",    descTk: "brandDesc"    },
  { emoji: "🎪", href: "/sondage/evenement",  from: "#10B981", to: "#065F46", glow: "#34D399", tk: "event",    descTk: "eventDesc"    },
] as const;

export default function SondageTeaser() {
  const tr = useT();

  const profiles = PROFILES_STATIC.map((p) => ({
    ...p,
    title: tr.sondage[p.tk  as keyof typeof tr.sondage] as string,
    desc:  tr.sondage[p.descTk as keyof typeof tr.sondage] as string,
  }));

  return (
    <section className="py-24 bg-bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn direction="up" className="text-center mb-14">
          <SectionHeader
            centered
            eyebrow={tr.sondage.eyebrow}
            title={<>{tr.sondage.title.split("visible")[0]}<em className="text-gold not-italic">visible</em>{tr.sondage.title.split("visible")[1]}</>}
            subtitle={tr.sondage.subtitle}
          />
        </FadeIn>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 mb-10">
          {profiles.map((profile, i) => (
            <FadeIn key={profile.href} delay={i * 0.09} direction="up">
              <Link href={profile.href} className="block h-full">
                <motion.div
                  whileHover={{ y: -10, scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="group relative rounded-2xl p-6 text-center flex flex-col items-center justify-center gap-4 cursor-pointer overflow-hidden h-full min-h-[210px]"
                  style={{
                    background: `linear-gradient(145deg, ${profile.from} 0%, ${profile.to} 100%)`,
                    boxShadow: `0 8px 32px ${profile.glow}40, 0 2px 8px rgba(0,0,0,0.15)`,
                  }}
                >
                  {/* Deco circles */}
                  <div
                    className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-20"
                    style={{ background: "rgba(255,255,255,0.4)" }}
                  />
                  <div
                    className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full opacity-15"
                    style={{ background: "rgba(255,255,255,0.3)" }}
                  />

                  {/* Shine line on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 60%)" }}
                  />

                  {/* Emoji bubble */}
                  <div
                    className="relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{ background: "rgba(255,255,255,0.22)", backdropFilter: "blur(8px)" }}
                  >
                    <span className="text-3xl">{profile.emoji}</span>
                  </div>

                  <div className="relative z-10">
                    <p className="font-body font-bold text-sm text-white mb-1">
                      {profile.title}
                    </p>
                    <p className="font-body text-[11px] leading-tight" style={{ color: "rgba(255,255,255,0.70)" }}>
                      {profile.desc}
                    </p>
                  </div>

                  <span
                    className="relative z-10 px-3 py-1 rounded-full font-body text-[10px] font-bold"
                    style={{ background: "rgba(255,255,255,0.20)", color: "rgba(255,255,255,0.95)" }}
                  >
                    {tr.sondage.startCta}
                  </span>
                </motion.div>
              </Link>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.5} className="text-center">
          <Link
            href="/sondage"
            className="inline-flex items-center gap-2 font-body text-sm font-semibold bg-black text-white px-6 py-3 rounded-full hover:bg-black/80 transition-colors group"
          >
            {tr.sondage.seeAll}
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
