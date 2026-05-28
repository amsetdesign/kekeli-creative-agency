"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export interface InfosWeb {
  recherche_effectuee: boolean;
  trouve_en_ligne: boolean;
  abonnes_verifies: Record<string, string | null>;
  streams_verifies?: string | null;
  derniere_sortie?: string | null;
  activite_live?: string | null;
  presence_digitale_score: "Forte" | "Modérée" | "Faible" | "Introuvable";
  insights_web: string;
}

export interface AnalysisResult {
  nom: string;
  niveau: string;
  score_global: number;
  scores: {
    branding: number;
    presence_digitale: number;
    visibilite: number;
    coherence_artistique: number;
    communication: number;
    monetisation: number;
  };
  points_forts: string[];
  points_faibles: string[];
  opportunites: string[];
  roadmap: { periode: string; titre: string; actions: string[] }[];
  analyse_branding: string;
  analyse_visibilite: string;
  strategie_monetisation: string;
  message_personnel: string;
  services_recommandes: string[];
  infos_web?: InfosWeb;
}

const GOLD = "#C8A84B";
const DARK_BG = "linear-gradient(135deg, #08060F 0%, #130A28 35%, #1C0A40 60%, #0A0618 100%)";
const CREAM_BG = "linear-gradient(160deg, #FBF6EC 0%, #F5EDD8 50%, #FAF4E8 100%)";

const SERVICE_MAP: Record<string, { label: string; href: string; color: string }> = {
  clips:          { label: "Clips & Vidéos",       href: "/artistes/clips",          color: "#EC4899" },
  monetisation:   { label: "Monétisation",          href: "/artistes/monetisation",   color: "#16A34A" },
  branding:       { label: "Branding Artiste",      href: "/artistes/branding",       color: "#8B5CF6" },
  photo:          { label: "Photo Shooting",        href: "/artistes/photo",          color: "#06B6D4" },
  direction:      { label: "Direction Artistique",  href: "/artistes/direction",      color: "#7C3AED" },
  accompagnement: { label: "Accompagnement",        href: "/artistes/accompagnement", color: "#10B981" },
  strategie:      { label: "Stratégie Digitale",    href: "/artistes/strategie",      color: "#4C9BFF" },
  marketing:      { label: "Marketing Digital",     href: "/artistes/marketing",      color: "#F97316" },
  identite:       { label: "Identité Digitale",     href: "/artistes/identite",       color: "#FF6B6B" },
  distribution:   { label: "Distribution",          href: "/artistes/distribution",   color: "#F59E0B" },
};

const SCORE_LABELS: Record<string, string> = {
  branding:            "Branding",
  presence_digitale:   "Présence digitale",
  visibilite:          "Visibilité",
  coherence_artistique:"Cohérence artistique",
  communication:       "Communication",
  monetisation:        "Monétisation",
};

function scoreColor(s: number) {
  if (s >= 70) return "#10B981";
  if (s >= 50) return GOLD;
  if (s >= 30) return "#F97316";
  return "#EF4444";
}

function AnimatedCounter({ target, duration = 1600 }: { target: number; duration?: number }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration]);
  return <>{val}</>;
}

function ScoreCircle({ score }: { score: number }) {
  const r = 72;
  const circ = 2 * Math.PI * r;
  const color = scoreColor(score);
  return (
    <div className="relative w-48 h-48 mx-auto">
      <svg viewBox="0 0 180 180" className="w-full h-full -rotate-90">
        <circle cx="90" cy="90" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
        <motion.circle cx="90" cy="90" r={r} fill="none" stroke={color} strokeWidth="10"
          strokeLinecap="round"
          initial={{ strokeDasharray: `0 ${circ}` }}
          animate={{ strokeDasharray: `${(score / 100) * circ} ${circ}` }}
          transition={{ duration: 1.6, ease: "easeOut", delay: 0.3 }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-5xl font-bold text-white">
          <AnimatedCounter target={score} />
        </span>
        <span className="font-body text-xs text-white/40 mt-1">/ 100</span>
      </div>
    </div>
  );
}

function ScoreBar({ label, score, delay }: { label: string; score: number; delay: number }) {
  const color = scoreColor(score);
  return (
    <div>
      <div className="flex justify-between mb-1.5">
        <span className="font-body text-sm text-white/70">{label}</span>
        <span className="font-body text-sm font-bold" style={{ color }}>{score}</span>
      </div>
      <div className="h-2 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
        <motion.div className="h-2 rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}90, ${color})` }}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1, ease: "easeOut", delay }} />
      </div>
    </div>
  );
}

interface Props {
  analysis: AnalysisResult;
  onRestart: () => void;
}

export default function VisionResults({ analysis, onRestart }: Props) {
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const recServices = (analysis.services_recommandes ?? []).filter((s) => SERVICE_MAP[s]);

  return (
    <div ref={topRef}>

      {/* ── Score Hero ──────────────────────────────────────── */}
      <div className="rounded-3xl overflow-hidden mb-6" style={{ background: DARK_BG, border: "1px solid rgba(200,168,75,0.15)" }}>
        <div className="px-6 pt-8 pb-6 text-center">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] mb-2" style={{ color: GOLD }}>Vision de Carrière</p>
          <h2 className="font-display text-2xl text-white mb-1">{analysis.nom}</h2>
          <p className="font-body text-sm mb-6" style={{ color: "rgba(200,168,75,0.70)" }}>{analysis.niveau}</p>

          <ScoreCircle score={analysis.score_global} />

          <p className="font-body text-sm mt-4 text-white/40">Score artistique global</p>
        </div>

        {/* Score bars */}
        <div className="px-6 pb-8 space-y-3">
          {Object.entries(analysis.scores).map(([key, val], i) => (
            <ScoreBar key={key} label={SCORE_LABELS[key] ?? key} score={val} delay={0.4 + i * 0.08} />
          ))}
        </div>
      </div>

      {/* ── Données web trouvées ────────────────────────────── */}
      {analysis.infos_web && (
        <div className="rounded-3xl overflow-hidden mb-6" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="px-6 pt-5 pb-5">
            <div className="flex items-center justify-between mb-4">
              <p className="font-body text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: GOLD }}>Données trouvées en ligne</p>
              <span className="font-body text-xs px-2.5 py-1 rounded-full font-medium"
                style={analysis.infos_web.presence_digitale_score === "Forte"
                  ? { background: "rgba(16,185,129,0.12)", color: "#10B981", border: "1px solid rgba(16,185,129,0.25)" }
                  : analysis.infos_web.presence_digitale_score === "Modérée"
                  ? { background: `${GOLD}12`, color: GOLD, border: `1px solid ${GOLD}30` }
                  : analysis.infos_web.presence_digitale_score === "Faible"
                  ? { background: "rgba(249,115,22,0.12)", color: "#F97316", border: "1px solid rgba(249,115,22,0.25)" }
                  : { background: "rgba(239,68,68,0.12)", color: "#EF4444", border: "1px solid rgba(239,68,68,0.25)" }}>
                Présence {analysis.infos_web.presence_digitale_score}
              </span>
            </div>

            {/* Verified follower counts */}
            {Object.entries(analysis.infos_web.abonnes_verifies).some(([, v]) => v) && (
              <div className="mb-4">
                <p className="font-body text-xs text-white/40 mb-2">Abonnés vérifiés</p>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(analysis.infos_web.abonnes_verifies).filter(([, v]) => v).map(([platform, count]) => (
                    <div key={platform} className="flex items-center gap-2 px-3 py-2 rounded-xl"
                      style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)" }}>
                      <span className="font-body text-sm font-bold text-white">{count}</span>
                      <span className="font-body text-xs text-white/40">{platform}</span>
                    </div>
                  ))}
                  {analysis.infos_web.streams_verifies && (
                    <div className="flex items-center gap-2 px-3 py-2 rounded-xl"
                      style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)" }}>
                      <span className="font-body text-sm font-bold text-white">{analysis.infos_web.streams_verifies}</span>
                      <span className="font-body text-xs text-white/40">Streams</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Quick facts */}
            <div className="space-y-2">
              {analysis.infos_web.derniere_sortie && (
                <div className="flex items-start gap-2">
                  <span className="text-sm shrink-0">🎵</span>
                  <div>
                    <p className="font-body text-xs text-white/40">Dernière sortie</p>
                    <p className="font-body text-sm text-white/80">{analysis.infos_web.derniere_sortie}</p>
                  </div>
                </div>
              )}
              {analysis.infos_web.activite_live && (
                <div className="flex items-start gap-2">
                  <span className="text-sm shrink-0">🎤</span>
                  <div>
                    <p className="font-body text-xs text-white/40">Activité live</p>
                    <p className="font-body text-sm text-white/80">{analysis.infos_web.activite_live}</p>
                  </div>
                </div>
              )}
              {analysis.infos_web.insights_web && (
                <div className="flex items-start gap-2 pt-2 mt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <span className="text-sm shrink-0">💡</span>
                  <p className="font-body text-xs text-white/55 leading-relaxed">{analysis.infos_web.insights_web}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Forces / Faiblesses / Opportunités ─────────────── */}
      <div className="grid grid-cols-1 gap-4 mb-6">
        {[
          { title: "✅ Points forts", items: analysis.points_forts, color: "#10B981", bg: "rgba(16,185,129,0.08)", border: "rgba(16,185,129,0.20)" },
          { title: "⚠️ Axes à renforcer", items: analysis.points_faibles, color: "#F97316", bg: "rgba(249,115,22,0.08)", border: "rgba(249,115,22,0.20)" },
          { title: "🚀 Opportunités", items: analysis.opportunites, color: GOLD, bg: `${GOLD}10`, border: `${GOLD}30` },
        ].map(({ title, items, color, bg, border }) => (
          <div key={title} className="rounded-2xl p-5" style={{ background: bg, border: `1px solid ${border}` }}>
            <p className="font-body font-bold text-sm mb-3" style={{ color }}>{title}</p>
            <ul className="space-y-2">
              {(items ?? []).map((item, i) => (
                <li key={i} className="flex items-start gap-2 font-body text-sm text-white/75 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: color }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* ── Roadmap 90 jours ────────────────────────────────── */}
      <div className="rounded-3xl overflow-hidden mb-6" style={{ background: DARK_BG, border: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="px-6 pt-6 pb-2">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] mb-1" style={{ color: GOLD }}>Roadmap</p>
          <h3 className="font-display text-xl text-white">Plan d&apos;action 90 jours</h3>
        </div>
        <div className="px-4 py-4 space-y-3">
          {(analysis.roadmap ?? []).map(({ periode, titre, actions }, i) => (
            <div key={i} className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="flex items-center gap-3 mb-3">
                <span className="font-display text-2xl font-bold" style={{ color: `${GOLD}60` }}>0{i + 1}</span>
                <div>
                  <p className="font-body text-xs" style={{ color: `${GOLD}80` }}>{periode}</p>
                  <p className="font-body font-bold text-sm text-white">{titre}</p>
                </div>
              </div>
              <ul className="space-y-1.5 ml-10">
                {actions.map((a, j) => (
                  <li key={j} className="flex items-start gap-2 font-body text-xs text-white/60 leading-relaxed">
                    <span className="w-1 h-1 rounded-full mt-1.5 shrink-0" style={{ background: GOLD }} />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── Analyses IA ─────────────────────────────────────── */}
      <div className="rounded-3xl overflow-hidden mb-6" style={{ background: CREAM_BG, border: "1px solid rgba(28,10,64,0.08)" }}>
        <div className="px-6 pt-6 pb-2">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] mb-1" style={{ color: GOLD }}>Analyse IA</p>
          <h3 className="font-display text-xl text-[#1C0A40]">Recommandations personnalisées</h3>
        </div>
        <div className="px-6 py-4 space-y-5">
          {[
            { title: "🎨 Branding & Image", text: analysis.analyse_branding },
            { title: "📈 Visibilité & Croissance", text: analysis.analyse_visibilite },
            { title: "💰 Stratégie de monétisation", text: analysis.strategie_monetisation },
          ].map(({ title, text }) => text ? (
            <div key={title}>
              <p className="font-body font-bold text-sm text-[#1C0A40] mb-1.5">{title}</p>
              <p className="font-body text-sm text-[#44403C] leading-relaxed">{text}</p>
            </div>
          ) : null)}
        </div>
      </div>

      {/* ── Message personnel ───────────────────────────────── */}
      {analysis.message_personnel && (
        <div className="rounded-3xl p-6 mb-6" style={{ background: `${GOLD}12`, border: `1px solid ${GOLD}30` }}>
          <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: GOLD }}>Message de l&apos;équipe KEKELI</p>
          <p className="font-body text-sm text-white/80 leading-relaxed italic">&ldquo;{analysis.message_personnel}&rdquo;</p>
        </div>
      )}

      {/* ── Services recommandés ────────────────────────────── */}
      {recServices.length > 0 && (
        <div className="rounded-3xl overflow-hidden mb-6" style={{ background: DARK_BG, border: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="px-6 pt-6 pb-4">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] mb-1" style={{ color: GOLD }}>Services recommandés</p>
            <h3 className="font-display text-xl text-white mb-4">Ce dont tu as besoin</h3>
            <div className="grid grid-cols-2 gap-3">
              {recServices.map((slug) => {
                const svc = SERVICE_MAP[slug];
                return (
                  <Link key={slug} href={svc.href}
                    className="flex items-center gap-2 p-3 rounded-xl font-body text-sm font-semibold text-white transition-all hover:scale-[1.02]"
                    style={{ background: `${svc.color}16`, border: `1px solid ${svc.color}30`, color: svc.color }}>
                    {svc.label} →
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── CTA ─────────────────────────────────────────────── */}
      <div className="rounded-3xl p-6 text-center mb-4" style={{ background: "linear-gradient(135deg, #130A28, #1C0A40)", border: `1px solid ${GOLD}25` }}>
        <p className="font-display text-lg text-white mb-2">Prêt à passer à l&apos;action ?</p>
        <p className="font-body text-sm text-white/50 mb-5">Notre équipe analyse votre Vision et vous propose un accompagnement sur mesure.</p>
        <Link href="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-body font-bold text-sm text-black transition-all hover:scale-[1.02]"
          style={{ background: `linear-gradient(135deg, ${GOLD}, #F5D37A)` }}>
          Parler à un expert KEKELI →
        </Link>
      </div>

      <button onClick={onRestart} className="w-full font-body text-xs text-white/30 hover:text-white/50 transition-colors py-2">
        ↺ Recommencer l&apos;analyse
      </button>
    </div>
  );
}
