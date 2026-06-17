"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import FadeIn from "@/components/animations/FadeIn";
import SectionHeader from "@/components/ui/SectionHeader";
import { useT } from "@/hooks/useT";

const PROFILES_STATIC = [
  { emoji: "🏢", href: "/sondage/entreprise", accent: "#3B82F6", tk: "company",  descTk: "companyDesc"  },
  { emoji: "🎤", href: "/sondage/artiste",    accent: "#C8A84B", tk: "artist",   descTk: "artistDesc"   },
  { emoji: "🛒", href: "/sondage/vendeur",    accent: "#F97316", tk: "seller",   descTk: "sellerDesc"   },
  { emoji: "✨", href: "/sondage/marque",     accent: "#EC4899", tk: "brand",    descTk: "brandDesc"    },
  { emoji: "🎪", href: "/sondage/evenement",  accent: "#10B981", tk: "event",    descTk: "eventDesc"    },
] as const;

export default function SondageTeaser() {
  const tr = useT();

  const profiles = PROFILES_STATIC.map((p) => ({
    ...p,
    title: tr.sondage[p.tk as keyof typeof tr.sondage] as string,
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
                  whileHover={{ y: -5, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="group relative rounded-2xl overflow-hidden cursor-pointer h-full min-h-[210px] flex flex-col"
                  style={{
                    border: `1px solid ${profile.accent}30`,
                    boxShadow: `0 4px 24px rgba(0,0,0,0.30), 0 0 0 1px ${profile.accent}12`,
                  }}
                >
                  {/* Background image — geometric violet */}
                  <div className="absolute inset-0">
                    <Image
                      src="/images/bg-ia-violet.jpg"
                      alt=""
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    />
                    {/* Overlay léger — laisse les formes géométriques visibles */}
                    <div
                      className="absolute inset-0"
                      style={{ background: "rgba(6,2,16,0.45)" }}
                    />
                    {/* Tint coloré subtil selon l'accent de chaque carte */}
                    <div
                      className="absolute inset-0"
                      style={{ background: `${profile.accent}0D` }}
                    />
                  </div>

                  {/* Colored top bar */}
                  <div
                    className="relative h-0.5 w-full shrink-0"
                    style={{ background: `linear-gradient(90deg, ${profile.accent} 0%, transparent 100%)` }}
                  />

                  <div className="relative flex-1 p-5 flex flex-col items-center justify-center gap-4 text-center">
                    {/* Emoji bubble */}
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center backdrop-blur-sm"
                      style={{ background: `${profile.accent}25`, border: `1px solid ${profile.accent}35` }}
                    >
                      <span className="text-2xl">{profile.emoji}</span>
                    </div>

                    <div>
                      <p className="font-body font-bold text-sm text-white mb-1">{profile.title}</p>
                      <p className="font-body text-[11px] leading-tight" style={{ color: "rgba(255,255,255,0.55)" }}>
                        {profile.desc}
                      </p>
                    </div>

                    <span
                      className="px-3 py-1 rounded-full font-body text-[10px] font-bold backdrop-blur-sm"
                      style={{ background: `${profile.accent}25`, color: profile.accent, border: `1px solid ${profile.accent}30` }}
                    >
                      {tr.sondage.startCta}
                    </span>
                  </div>
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
