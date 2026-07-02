"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import Button from "@/components/ui/Button";
import { useT } from "@/hooks/useT";

export default function AboutQuick() {
  const tr = useT();
  return (
    <section className="bg-bg-dark py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center">
          {/* Image */}
          <FadeIn direction="right">
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src="/images/equipe-kekeli.jpg"
                  alt="Équipe créative KEKELI Creative Agency — Dakar"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent" />
              </div>

              {/* Gold accent border */}
              <div className="absolute -bottom-4 -right-4 w-full h-full rounded-2xl border border-gold/20 -z-10" />

              {/* Floating stat */}
              <div className="absolute -top-5 -right-5 bg-gold rounded-2xl p-4 [box-shadow:var(--shadow-gold)]">
                <p className="font-display text-3xl font-bold text-black leading-none">5+</p>
                <p className="font-body text-xs text-black/70 mt-1">{tr.about.yearsExp}</p>
              </div>
            </div>
          </FadeIn>

          {/* Text */}
          <FadeIn direction="left" delay={0.2}>
            <div>
              <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-4">
                {tr.about.eyebrow}
              </p>

              <h2 className="font-display text-4xl md:text-5xl text-text-on-dark leading-tight mb-6">
                {tr.about.title1}{" "}
                <em className="text-gold not-italic">{tr.about.titleHighlight}</em>
                {" "}{tr.about.title2}
              </h2>

              <p className="font-body text-base text-text-on-dark/70 leading-relaxed mb-5">
                {tr.about.p1}
              </p>

              <p className="font-body text-base text-text-on-dark/70 leading-relaxed mb-8">
                {tr.about.p2}
              </p>

              <div className="flex flex-wrap gap-3 mb-10">
                {[
                  { emoji: "💡", label: tr.about.tag1, color: "#C8A84B" },
                  { emoji: "🎨", label: tr.about.tag2, color: "#EC4899" },
                  { emoji: "📍", label: tr.about.tag3, color: "#3B82F6" },
                  { emoji: "🚀", label: tr.about.tag4, color: "#10B981" },
                ].map(({ emoji, label, color }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 px-4 py-2 rounded-full"
                    style={{ background: `${color}20`, border: `1px solid ${color}40` }}
                  >
                    <span className="text-base">{emoji}</span>
                    <span className="font-body text-sm font-semibold" style={{ color }}>{label}</span>
                  </div>
                ))}
              </div>

              <Button href="/a-propos" variant="outline-gold" size="md">
                {tr.about.learnMore}
                <ArrowRight size={15} />
              </Button>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
