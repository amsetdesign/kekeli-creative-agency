"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import VisionWizard, { type WizardData } from "./VisionWizard";
import VisionResults, { type AnalysisResult } from "./VisionResults";

const GOLD = "#C8A84B";
const DARK_BG = "linear-gradient(135deg, #08060F 0%, #130A28 35%, #1C0A40 60%, #0A0618 100%)";

type Phase = "intro" | "wizard" | "loading" | "results" | "error";

const LOADING_STEPS = [
  "Analyse de votre profil artistique...",
  "Évaluation de votre présence digitale...",
  "Calcul de votre score artiste...",
  "Génération de votre roadmap 90 jours...",
  "Personnalisation des recommandations...",
];

const deliverables = [
  { icon: "🎯", label: "Score artiste global", sub: "6 dimensions évaluées" },
  { icon: "✅", label: "Points forts & axes d'amélioration", sub: "Analyse honnête et précise" },
  { icon: "🗓️", label: "Roadmap 90 jours", sub: "Actions concrètes et priorisées" },
  { icon: "💡", label: "Recommandations branding", sub: "Stratégie visuelle personnalisée" },
  { icon: "📈", label: "Stratégie visibilité & monétisation", sub: "Plan de revenus sur mesure" },
  { icon: "🚀", label: "Services adaptés à ton niveau", sub: "Sans pression ni engagement" },
];

function LoadingStep({ text, index }: { text: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.9, duration: 0.4 }}
      className="flex items-center gap-3 font-body text-sm"
      style={{ color: "rgba(255,255,255,0.55)" }}>
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: index * 0.9 + 0.3, type: "spring", stiffness: 300 }}
        className="w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0"
        style={{ background: `${GOLD}20`, color: GOLD }}>
        ✓
      </motion.span>
      {text}
    </motion.div>
  );
}

export default function VisionClient() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleWizardComplete = async (data: WizardData) => {
    setPhase("loading");
    try {
      const res = await fetch("/api/vision-carriere", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data }),
      });
      if (!res.ok) throw new Error("API error");
      const json = await res.json();
      if (!json.analysis) throw new Error("No analysis");
      setAnalysis(json.analysis);
      setPhase("results");
    } catch {
      setErrorMsg("Une erreur est survenue lors de l'analyse. Vérifiez votre connexion et réessayez.");
      setPhase("error");
    }
  };

  return (
    <div style={{ background: DARK_BG }} className="min-h-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 pt-24">

        <AnimatePresence mode="wait">

          {/* ── INTRO ── */}
          {phase === "intro" && (
            <motion.div key="intro" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -24 }} transition={{ duration: 0.4 }}>
              {/* Badge */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-body text-xs font-semibold mb-6"
                  style={{ background: `${GOLD}18`, color: GOLD, border: `1px solid ${GOLD}30` }}>
                  <span>🧠</span> IA Vision de Carrière
                </div>
                <h1 className="font-display text-4xl sm:text-5xl text-white mb-4 leading-tight">
                  Découvre ton potentiel<br />
                  <em className="not-italic" style={{ color: GOLD }}>artistique réel</em>
                </h1>
                <p className="font-body text-base text-white/55 max-w-lg mx-auto leading-relaxed">
                  Notre IA analyse ton profil en 5 minutes et génère une roadmap carrière personnalisée — les mêmes insights qu&apos;un consultant à 500€/heure.
                </p>
              </div>

              {/* Ce que tu obtiens */}
              <div className="rounded-3xl p-6 mb-6" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: GOLD }}>Tu reçois</p>
                <div className="grid grid-cols-1 gap-3">
                  {deliverables.map(({ icon, label, sub }) => (
                    <div key={label} className="flex items-center gap-3">
                      <span className="text-xl shrink-0">{icon}</span>
                      <div>
                        <p className="font-body text-sm font-semibold text-white">{label}</p>
                        <p className="font-body text-xs" style={{ color: "rgba(255,255,255,0.40)" }}>{sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <button onClick={() => setPhase("wizard")}
                className="w-full py-4 rounded-2xl font-body font-bold text-base text-black transition-all hover:scale-[1.02]"
                style={{ background: `linear-gradient(135deg, ${GOLD} 0%, #F5D37A 100%)`, boxShadow: `0 8px 30px ${GOLD}40` }}>
                Commencer mon analyse gratuite →
              </button>

              <p className="text-center font-body text-xs mt-3" style={{ color: "rgba(255,255,255,0.25)" }}>
                100% gratuit · 5 minutes · Résultats immédiats · Sans engagement
              </p>
            </motion.div>
          )}

          {/* ── WIZARD ── */}
          {phase === "wizard" && (
            <motion.div key="wizard" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -24 }} transition={{ duration: 0.3 }}>
              <div className="text-center mb-8">
                <button onClick={() => setPhase("intro")} className="font-body text-xs text-white/30 hover:text-white/50 transition-colors mb-6 block mx-auto">
                  ← Retour
                </button>
                <h2 className="font-display text-2xl text-white">Ton profil artistique</h2>
                <p className="font-body text-sm text-white/40 mt-1">Réponds honnêtement pour une analyse précise</p>
              </div>

              <div className="rounded-3xl p-6 sm:p-8" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.10)" }}>
                <VisionWizard onComplete={handleWizardComplete} />
              </div>
            </motion.div>
          )}

          {/* ── LOADING ── */}
          {phase === "loading" && (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-16">
              {/* Animated ring */}
              <div className="relative w-24 h-24 mx-auto mb-10">
                <svg viewBox="0 0 96 96" className="w-full h-full">
                  <circle cx="48" cy="48" r="40" fill="none" stroke="rgba(200,168,75,0.15)" strokeWidth="4" />
                  <motion.circle cx="48" cy="48" r="40" fill="none" stroke={GOLD} strokeWidth="4"
                    strokeLinecap="round" strokeDasharray="50 201"
                    animate={{ rotate: [0, 360] }} transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                    style={{ transformOrigin: "48px 48px" }} />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl">🧠</span>
                </div>
              </div>

              <h2 className="font-display text-2xl text-white mb-2">Analyse en cours</h2>
              <p className="font-body text-sm text-white/40 mb-8">Notre IA examine chaque dimension de ton profil...</p>

              <div className="text-left max-w-xs mx-auto space-y-3">
                {LOADING_STEPS.map((step, i) => (
                  <LoadingStep key={i} text={step} index={i} />
                ))}
              </div>
            </motion.div>
          )}

          {/* ── RESULTS ── */}
          {phase === "results" && analysis && (
            <motion.div key="results" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <VisionResults analysis={analysis} onRestart={() => { setAnalysis(null); setPhase("intro"); }} />
            </motion.div>
          )}

          {/* ── ERROR ── */}
          {phase === "error" && (
            <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
              <div className="text-5xl mb-4">⚠️</div>
              <h2 className="font-display text-2xl text-white mb-3">Erreur d&apos;analyse</h2>
              <p className="font-body text-sm text-white/50 mb-6 max-w-xs mx-auto">{errorMsg}</p>
              <button onClick={() => setPhase("wizard")}
                className="px-6 py-3 rounded-xl font-body font-bold text-sm text-black"
                style={{ background: `linear-gradient(135deg, ${GOLD}, #F5D37A)` }}>
                Réessayer
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
