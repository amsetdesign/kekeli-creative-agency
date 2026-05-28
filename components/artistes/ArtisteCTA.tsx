"use client";

import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import Button from "@/components/ui/Button";
import { useT } from "@/hooks/useT";

export default function ArtisteCTA() {
  const tr = useT();
  const a = tr.pages.artists;

  return (
    <section className="py-24 relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(135deg, #0C0B09 0%, #1A0A2E 50%, #0C1A2E 100%)" }}
      />
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-[120px] opacity-20 pointer-events-none" style={{ background: "#8B5CF6" }} />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full blur-[100px] opacity-20 pointer-events-none" style={{ background: "#C8A84B" }} />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeIn direction="up">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 bg-gold/10 font-body text-xs font-semibold uppercase tracking-[0.14em] text-gold mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            {a.ctaBadge}
          </span>

          <h2 className="font-display text-5xl md:text-6xl text-white mb-4 leading-tight">
            {a.ctaTitle}{" "}
            <em className="not-italic" style={{ color: "#C8A84B" }}>{a.ctaTitleHL}</em>
          </h2>

          <p className="font-body text-lg mb-3" style={{ color: "rgba(255,255,255,0.6)" }}>
            {a.ctaDesc}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 mb-10">
            {[
              { color: "#8B5CF6", text: a.ctaTag1 },
              { color: "#EC4899", text: a.ctaTag2 },
              { color: "#10B981", text: a.ctaTag3 },
            ].map(({ color, text }) => (
              <div key={text} className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ background: color }} />
                <span className="font-body text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>{text}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="#formulaire" variant="gold" size="lg">
              {a.ctaBtn}
              <ArrowRight size={16} />
            </Button>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 font-body text-sm font-semibold px-6 py-3.5 rounded-xl transition-all"
              style={{ border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.8)" }}
            >
              <Zap size={15} style={{ color: "#C8A84B" }} />
              {a.ctaContactBtn}
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
