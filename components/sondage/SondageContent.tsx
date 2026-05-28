"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useT } from "@/hooks/useT";

const PROFILE_STATIC = [
  { type: "entreprise", emoji: "🏢", from: "#3B82F6", to: "#1D4ED8", glow: "#60A5FA", tk: "company",  descTk: "companyDesc"  },
  { type: "artiste",    emoji: "🎵", from: "#8B5CF6", to: "#6D28D9", glow: "#A78BFA", tk: "artist",   descTk: "artistDesc"   },
  { type: "vendeur",    emoji: "🛍️", from: "#10B981", to: "#065F46", glow: "#34D399", tk: "seller",   descTk: "sellerDesc"   },
  { type: "marque",     emoji: "✨", from: "#EC4899", to: "#BE185D", glow: "#F472B6", tk: "brand",    descTk: "brandDesc"    },
  { type: "evenement",  emoji: "🎪", from: "#F97316", to: "#C2410C", glow: "#FB923C", tk: "event",    descTk: "eventDesc"    },
] as const;

export default function SondageContent() {
  const tr = useT();
  const s = tr.pages.sondage;
  const sond = tr.sondage;

  const profiles = PROFILE_STATIC.map((p) => ({
    ...p,
    title: sond[p.tk as keyof typeof sond] as string,
    subtitle: sond[p.descTk as keyof typeof sond] as string,
  }));

  const trustItems = [s.free, s.instant, s.confidential, s.counter];

  return (
    <main className="min-h-screen" style={{ background: "linear-gradient(160deg, #08060F 0%, #130A28 50%, #0A0618 100%)" }}>
      {/* Hero */}
      <section className="relative max-w-4xl mx-auto px-6 pt-28 pb-16 text-center">
        <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[140px] opacity-20" style={{ background: "#6D28D9" }} />
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-[120px] opacity-15" style={{ background: "#C8A84B" }} />
        </div>
        <div className="relative z-10">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest uppercase rounded-full mb-6"
            style={{ color: "#C8A84B", border: "1px solid rgba(200,168,75,0.30)", background: "rgba(200,168,75,0.08)" }}>
            {s.auditheader}
          </span>
          <h1 className="font-display text-4xl md:text-6xl text-white leading-tight mb-6">
            {s.heroLine1}
            <br />
            <span style={{ color: "#C8A84B" }}>{s.heroLine2}</span>
          </h1>
          <p className="font-body text-lg max-w-xl mx-auto leading-relaxed" style={{ color: "rgba(220,210,255,0.65)" }}>
            {s.heroSub}
          </p>
        </div>
      </section>

      {/* Profile grid */}
      <section className="max-w-4xl mx-auto px-6 pb-28">
        <p className="font-body text-xs text-center mb-8 uppercase tracking-widest" style={{ color: "rgba(220,210,255,0.35)" }}>
          {s.chooseProfile}
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {profiles.map((p) => (
            <Link
              key={p.type}
              href={`/sondage/${p.type}`}
              className="group relative flex flex-col p-6 rounded-2xl transition-all duration-200 hover:-translate-y-2 hover:scale-[1.02]"
              style={{
                background: `linear-gradient(145deg, ${p.from} 0%, ${p.to} 100%)`,
                boxShadow: `0 8px 32px ${p.glow}40`,
              }}
            >
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-20" style={{ background: "rgba(255,255,255,0.4)" }} />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full opacity-15" style={{ background: "rgba(255,255,255,0.3)" }} />
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 60%)" }} />

              <div className="relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center mb-4" style={{ background: "rgba(255,255,255,0.20)" }}>
                <span className="text-2xl">{p.emoji}</span>
              </div>
              <h2 className="font-body font-bold text-base text-white mb-1 relative z-10">{p.title}</h2>
              <p className="font-body text-sm mb-6 leading-snug relative z-10" style={{ color: "rgba(255,255,255,0.70)" }}>{p.subtitle}</p>
              <div className="mt-auto flex items-center gap-2 font-body text-sm font-semibold text-white relative z-10 group-hover:gap-3 transition-all">
                {s.startBtn}
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>

        {/* Trust row */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-8 font-body text-sm" style={{ color: "rgba(220,210,255,0.40)" }}>
          {trustItems.map((item) => (
            <span key={item} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
              {item}
            </span>
          ))}
        </div>
      </section>
    </main>
  );
}
