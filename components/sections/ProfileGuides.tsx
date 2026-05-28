"use client";

import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { useT } from "@/hooks/useT";

export default function ProfileGuides() {
  const tr = useT();
  const g = tr.guides;

  const profiles = [
    {
      type: "artiste",
      emoji: "🎵",
      title: g.artistProfile,
      subtitle: g.artistSub,
      color: "#8B5CF6",
      borderColor: "rgba(139,92,246,0.25)",
      glowColor: "rgba(139,92,246,0.12)",
      tagBg: "rgba(139,92,246,0.12)",
      steps: [
        { n: "01", title: g.step1, tag: g.step1Duration, desc: g.step1Desc,   href: "/sondage/artiste" },
        { n: "02", title: g.step2, tag: g.step2Sub,      desc: g.step2Desc,   href: "/artistes" },
        { n: "03", title: g.step3, tag: g.step3Sub,      desc: g.step3Desc,   href: "/espace-client" },
        { n: "04", title: g.step4, tag: g.step4Sub,      desc: g.step4Desc,   href: "/contact" },
      ],
      guideHref: "/api/guide/artiste",
      guideFilename: "guide-kekeli-artiste.pdf",
      auditHref: "/sondage/artiste",
    },
    {
      type: "entreprise",
      emoji: "🏢",
      title: g.companyProfile,
      subtitle: g.companySub,
      color: "#C8A84B",
      borderColor: "rgba(200,168,75,0.25)",
      glowColor: "rgba(200,168,75,0.10)",
      tagBg: "rgba(200,168,75,0.12)",
      steps: [
        { n: "01", title: g.step1,   tag: g.step1Duration, desc: g.step1DescEnt, href: "/sondage/entreprise" },
        { n: "02", title: g.step2Ent, tag: g.step2SubEnt,  desc: g.step2DescEnt, href: "/services" },
        { n: "03", title: g.step3,   tag: g.step3Sub,      desc: g.step3DescEnt, href: "/espace-client" },
        { n: "04", title: g.step4,   tag: g.step4Sub,      desc: g.step4DescEnt, href: "/contact" },
      ],
      guideHref: "/api/guide/entreprise",
      guideFilename: "guide-kekeli-client.pdf",
      auditHref: "/sondage/entreprise",
    },
  ];

  return (
    <section
      className="relative py-24 px-6 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0D0820 0%, #0A0618 100%)" }}
    >
      {/* Decorative blobs */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-[160px] opacity-15"
          style={{ background: "#6D28D9" }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full blur-[140px] opacity-10"
          style={{ background: "#C8A84B" }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span
            className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest uppercase rounded-full mb-5"
            style={{
              color: "#C8A84B",
              border: "1px solid rgba(200,168,75,0.30)",
              background: "rgba(200,168,75,0.08)",
            }}
          >
            Guide de démarrage rapide
          </span>
          <h2 className="font-display text-3xl md:text-5xl text-white leading-tight mb-4">
            Par où{" "}
            <span style={{ color: "#C8A84B" }}>commencer</span> ?
          </h2>
          <p
            className="font-body text-base max-w-lg mx-auto leading-relaxed"
            style={{ color: "rgba(220,210,255,0.55)" }}
          >
            Choisissez votre profil. Suivez les 4 étapes. Téléchargez le guide
            PDF pour l&apos;avoir toujours sous la main.
          </p>
        </div>

        {/* Profile cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {profiles.map((p) => (
            <div
              key={p.type}
              className="rounded-2xl p-7 flex flex-col"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: `1px solid ${p.borderColor}`,
                boxShadow: `0 0 80px ${p.glowColor}`,
              }}
            >
              {/* Card header */}
              <div className="flex items-center gap-3 mb-7">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background: p.tagBg }}
                >
                  {p.emoji}
                </div>
                <div>
                  <h3 className="font-body font-bold text-white text-base leading-tight">
                    {p.title}
                  </h3>
                  <p
                    className="text-xs mt-0.5"
                    style={{ color: "rgba(220,210,255,0.40)" }}
                  >
                    {p.subtitle}
                  </p>
                </div>
              </div>

              {/* Steps */}
              <div className="space-y-1.5 mb-7 flex-1">
                {p.steps.map((s) => (
                  <Link
                    key={s.n}
                    href={s.href}
                    className="group flex items-start gap-3.5 px-3 py-3 rounded-xl transition-colors duration-150 hover:bg-white/5"
                  >
                    <span
                      className="font-display text-xs font-bold mt-0.5 w-6 shrink-0 text-right"
                      style={{ color: p.color }}
                    >
                      {s.n}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <span className="font-body font-semibold text-white text-sm">
                          {s.title}
                        </span>
                        <span
                          className="text-[10px] font-medium px-2 py-0.5 rounded-full leading-none"
                          style={{ color: p.color, background: p.tagBg }}
                        >
                          {s.tag}
                        </span>
                      </div>
                      <p
                        className="text-xs leading-snug"
                        style={{ color: "rgba(220,210,255,0.40)" }}
                      >
                        {s.desc}
                      </p>
                    </div>
                    <ArrowRight
                      className="w-3.5 h-3.5 mt-1 shrink-0 transition-opacity duration-150 opacity-0 group-hover:opacity-50"
                      style={{ color: p.color }}
                    />
                  </Link>
                ))}
              </div>

              {/* Actions */}
              <div
                className="flex flex-col gap-2.5 pt-5 border-t"
                style={{ borderColor: `${p.color}20` }}
              >
                <a
                  href={p.guideHref}
                  download={p.guideFilename}
                  className="flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-body font-semibold text-sm transition-all duration-150 hover:opacity-80"
                  style={{
                    background: `${p.color}15`,
                    color: p.color,
                    border: `1px solid ${p.color}35`,
                  }}
                >
                  <Download className="w-4 h-4" />
                  Télécharger le guide PDF
                </a>
                <Link
                  href={p.auditHref}
                  className="flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-body font-semibold text-sm text-white transition-opacity duration-150 hover:opacity-90"
                  style={{ background: p.color }}
                >
                  Commencer l&apos;audit gratuit
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p
          className="text-center text-xs mt-10"
          style={{ color: "rgba(220,210,255,0.30)" }}
        >
          Tous les audits sont gratuits et sans engagement · Réponse KEKELI sous
          30 minutes
        </p>
      </div>
    </section>
  );
}
