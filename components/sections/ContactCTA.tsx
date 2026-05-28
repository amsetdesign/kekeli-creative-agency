"use client";

import Link from "next/link";
import { Zap, ArrowRight } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import Button from "@/components/ui/Button";
import { useT } from "@/hooks/useT";

export default function ContactCTA() {
  const tr = useT();
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Fond violet — même palette que le hero */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #1E0A3C 0%, #3D1278 40%, #1A0530 70%, #0C0B09 100%)",
        }}
      />

      {/* Blobs violet / gold */}
      <div
        className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-[130px] opacity-25 pointer-events-none"
        style={{ background: "#8B5CF6" }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full blur-[110px] opacity-20 pointer-events-none"
        style={{ background: "#6D28D9" }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full blur-[90px] opacity-18 pointer-events-none"
        style={{ background: "#C8A84B" }}
      />
      {/* Accent light top-right */}
      <div
        className="absolute top-0 right-0 w-60 h-60 rounded-full blur-[100px] opacity-15 pointer-events-none"
        style={{ background: "#A855F7" }}
      />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeIn direction="up">
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-body text-xs font-semibold uppercase tracking-[0.14em] mb-6"
            style={{ border: "1px solid rgba(167,139,250,0.4)", background: "rgba(139,92,246,0.15)", color: "#C4B5FD" }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#C4B5FD" }} />
            {tr.contact.badge}
          </span>

          <h2 className="font-display text-5xl md:text-6xl text-white mb-4 leading-tight">
            {tr.contact.title1}&nbsp;{" "}
            <em className="not-italic" style={{ color: "#C8A84B" }}>{tr.contact.titleHighlight}</em>
          </h2>

          <p className="font-body text-lg mb-3" style={{ color: "rgba(220,210,255,0.75)" }}>
            {tr.contact.subtitle}
          </p>

          <div className="flex items-center justify-center gap-6 mb-10">
            {[
              { color: "#EC4899", text: tr.contact.tag1 },
              { color: "#A78BFA", text: tr.contact.tag2 },
              { color: "#10B981", text: tr.contact.tag3 },
            ].map(({ color, text }) => (
              <div key={text} className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ background: color }} />
                <span
                  className="font-body text-xs"
                  style={{ color: "rgba(220,210,255,0.55)" }}
                >
                  {text}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/contact" variant="gold" size="lg">
              {tr.contact.cta}
              <ArrowRight size={16} />
            </Button>
            <Link href="/brief"
              className="inline-flex items-center gap-2 font-body text-sm font-semibold px-6 py-3.5 rounded-xl transition-all group"
              style={{ border: "1px solid rgba(167,139,250,0.35)", color: "rgba(220,210,255,0.85)" }}
            >
              <Zap size={15} style={{ color: "#C8A84B" }} />
              {tr.contact.briefLabel}
              <span className="text-[10px] font-normal" style={{ color: "rgba(196,181,253,0.45)" }}>
                {tr.contact.briefSub}
              </span>
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
