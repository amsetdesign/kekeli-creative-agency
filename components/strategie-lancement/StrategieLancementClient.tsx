"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Rocket, ChevronRight, ChevronLeft, Loader2, AlertCircle,
  Music, Calendar, Users, Target, TrendingUp, CheckCircle2,
  Zap, Clock, BarChart, DollarSign, BookOpen, Star, XCircle,
} from "lucide-react";

/* ─── Types ─────────────────────────────────────────────── */
interface Phase {
  nom: string;
  periode: string;
  objectif: string;
  actions_cles: string[];
  contenu_type: string[];
}
interface Canal {
  canal: string;
  priorite: "Essentiel" | "Important" | "Bonus";
  action: string;
}
interface BudgetPoste {
  poste: string;
  pourcentage: number;
  details: string;
}
interface KPI {
  metrique: string;
  objectif_30j: string;
  objectif_90j: string;
}
interface StrategieResult {
  score_lancement: number;
  niveau_preparatif: string;
  resume_strategie: string;
  phases: Phase[];
  plan_semaine_type: { jour: string; action: string }[];
  canaux_prioritaires: Canal[];
  budget_repartition: BudgetPoste[];
  kpis_objectifs: KPI[];
  contenus_a_preparer: string[];
  erreurs_a_eviter: string[];
  message_lancement: string;
}
interface FormData {
  nomProjet: string;
  typeProjet: string;
  genre: string;
  delaiSortie: string;
  plateformes: string[];
  abonnesInstagram: string;
  abonnesTiktok: string;
  abonnesYoutube: string;
  streamsActuels: string;
  sortiesPrecedentes: string;
  collaboration: string;
  artisteCollab: string;
  budget: string;
  equipe: string;
  objectif: string;
  marches: string[];
  inspirations: string;
}

const ACCENT = "#F43F5E";
const ACCENT_LIGHT = "rgba(244,63,94,0.12)";

/* ─── Chip helpers ───────────────────────────────────────── */
function Chip({
  label, active, onClick,
}: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-4 py-2 rounded-full font-body text-sm transition-all border"
      style={{
        background: active ? ACCENT_LIGHT : "transparent",
        borderColor: active ? ACCENT : "#E7E5E4",
        color: active ? ACCENT : "#78716C",
        fontWeight: active ? 600 : 400,
      }}
    >
      {label}
    </button>
  );
}
function MultiChip({
  label, active, onClick,
}: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-3 py-1.5 rounded-lg font-body text-sm transition-all border"
      style={{
        background: active ? ACCENT_LIGHT : "transparent",
        borderColor: active ? ACCENT : "#E7E5E4",
        color: active ? ACCENT : "#78716C",
        fontWeight: active ? 600 : 400,
      }}
    >
      {label}
    </button>
  );
}

/* ─── Score circle ───────────────────────────────────────── */
function ScoreCircle({ score }: { score: number }) {
  const r = 54;
  const circ = 2 * Math.PI * r;
  const [drawn, setDrawn] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setDrawn(score), 200);
    return () => clearTimeout(t);
  }, [score]);
  const offset = circ - (drawn / 100) * circ;
  const color = score >= 75 ? "#10B981" : score >= 50 ? ACCENT : "#F59E0B";
  return (
    <div className="relative w-32 h-32 flex items-center justify-center">
      <svg className="absolute inset-0 -rotate-90" width="128" height="128" viewBox="0 0 128 128">
        <circle cx="64" cy="64" r={r} fill="none" stroke="#F5F5F4" strokeWidth="10" />
        <circle
          cx="64" cy="64" r={r} fill="none" stroke={color} strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(.4,0,.2,1)" }}
        />
      </svg>
      <div className="text-center z-10">
        <span className="font-display text-3xl font-bold" style={{ color }}>{score}</span>
        <span className="block font-body text-xs text-[#78716C]">/100</span>
      </div>
    </div>
  );
}

/* ─── Phase card colors ──────────────────────────────────── */
const PHASE_COLORS = ["#8B5CF6", "#4C9BFF", ACCENT, "#10B981", "#F59E0B"];

/* ─── Main component ─────────────────────────────────────── */
type Phase_ = "intro" | "form" | "loading" | "results" | "error";

const LOADING_STEPS = [
  "Analyse du profil artistique...",
  "Calcul du score de préparation...",
  "Construction du plan 90 jours...",
  "Optimisation des canaux de distribution...",
  "Finalisation de la stratégie complète...",
];

export default function StrategieLancementClient() {
  const [phase, setPhase] = useState<Phase_>("intro");
  const [step, setStep] = useState(0);
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState<StrategieResult | null>(null);
  const [error, setError] = useState("");
  const topRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState<FormData>({
    nomProjet: "",
    typeProjet: "",
    genre: "",
    delaiSortie: "",
    plateformes: [],
    abonnesInstagram: "",
    abonnesTiktok: "",
    abonnesYoutube: "",
    streamsActuels: "",
    sortiesPrecedentes: "",
    collaboration: "",
    artisteCollab: "",
    budget: "",
    equipe: "",
    objectif: "",
    marches: [],
    inspirations: "",
  });

  const set = (k: keyof FormData, v: string) => setForm((f) => ({ ...f, [k]: v }));
  const toggleArr = (k: "plateformes" | "marches", v: string) =>
    setForm((f) => ({
      ...f,
      [k]: f[k].includes(v) ? f[k].filter((x) => x !== v) : [...f[k], v],
    }));

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [phase, step]);

  async function handleSubmit() {
    setPhase("loading");
    setLoadingStep(0);
    const iv = setInterval(() => setLoadingStep((s) => Math.min(s + 1, LOADING_STEPS.length - 1)), 1200);
    try {
      const res = await fetch("/api/strategie-lancement", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: form }),
      });
      const json = await res.json();
      clearInterval(iv);
      if (!res.ok || !json.strategy) { setError(json.error || "Erreur"); setPhase("error"); return; }
      setResult(json.strategy);
      setPhase("results");
    } catch {
      clearInterval(iv);
      setError("Impossible de contacter le serveur.");
      setPhase("error");
    }
  }

  const canProceedStep0 = form.nomProjet.trim() && form.typeProjet && form.genre.trim() && form.delaiSortie && form.plateformes.length > 0;
  const canProceedStep1 = form.sortiesPrecedentes && form.collaboration;
  const canProceedStep2 = form.budget && form.equipe && form.objectif && form.marches.length > 0;

  return (
    <div ref={topRef} className="min-h-screen bg-[#FAFAF9]">
      <AnimatePresence mode="wait">

        {/* ── INTRO ─────────────────────────────────────────── */}
        {phase === "intro" && (
          <motion.div key="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="relative overflow-hidden" style={{ background: "#0C0B09" }}>
              <div className="absolute inset-0 opacity-10"
                style={{ backgroundImage: `radial-gradient(circle at 30% 50%, ${ACCENT} 0%, transparent 60%)` }} />
              <div className="max-w-4xl mx-auto px-4 sm:px-6 py-24 text-center relative z-10">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-20 h-20 rounded-2xl mx-auto mb-8 flex items-center justify-center"
                  style={{ background: ACCENT_LIGHT, border: `1px solid ${ACCENT}40` }}
                >
                  <Rocket size={36} style={{ color: ACCENT }} />
                </motion.div>
                <motion.h1
                  initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15 }}
                  className="font-display text-4xl md:text-5xl text-white mb-4"
                >
                  Générateur de Stratégie<br />
                  <span style={{ color: ACCENT }}>de Lancement Musical</span>
                </motion.h1>
                <motion.p
                  initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.25 }}
                  className="font-body text-white/60 text-lg max-w-2xl mx-auto mb-12"
                >
                  Décris ton projet et notre IA génère un plan de lancement complet sur 90 jours — phases, canaux, budget, KPIs et calendrier éditorial.
                </motion.p>

                <motion.div
                  initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.35 }}
                  className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-12"
                >
                  {[
                    { icon: Calendar, label: "Plan 90 jours", desc: "5 phases détaillées" },
                    { icon: BarChart, label: "KPIs & objectifs", desc: "Métriques clés" },
                    { icon: DollarSign, label: "Budget optimisé", desc: "Répartition par poste" },
                    { icon: Target, label: "Canaux priorisés", desc: "Stratégie multicanal" },
                  ].map(({ icon: Icon, label, desc }) => (
                    <div
                      key={label}
                      className="p-4 rounded-2xl text-center"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                    >
                      <Icon size={22} style={{ color: ACCENT }} className="mx-auto mb-2" />
                      <p className="font-body text-sm font-semibold text-white">{label}</p>
                      <p className="font-body text-xs text-white/40 mt-0.5">{desc}</p>
                    </div>
                  ))}
                </motion.div>

                <motion.button
                  initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.45 }}
                  onClick={() => setPhase("form")}
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-body font-semibold text-white text-base"
                  style={{ background: ACCENT }}
                >
                  Générer ma stratégie <Rocket size={18} />
                </motion.button>
                <p className="font-body text-white/30 text-sm mt-4">Gratuit · 3 minutes · Résultat instantané</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── FORM ──────────────────────────────────────────── */}
        {phase === "form" && (
          <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
              {/* Progress */}
              <div className="flex items-center gap-3 mb-10">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="flex items-center gap-2 flex-1">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center font-body text-sm font-semibold shrink-0 transition-all"
                      style={{
                        background: i <= step ? ACCENT : "#F5F5F4",
                        color: i <= step ? "white" : "#A8A29E",
                      }}
                    >
                      {i < step ? <CheckCircle2 size={16} /> : i + 1}
                    </div>
                    {i < 2 && (
                      <div className="flex-1 h-0.5 rounded-full transition-all"
                        style={{ background: i < step ? ACCENT : "#E7E5E4" }} />
                    )}
                  </div>
                ))}
              </div>

              <AnimatePresence mode="wait">

                {/* Step 0 — Projet musical */}
                {step === 0 && (
                  <motion.div key="s0" initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -30, opacity: 0 }}>
                    <div className="flex items-center gap-3 mb-2">
                      <Music size={20} style={{ color: ACCENT }} />
                      <h2 className="font-display text-2xl text-[#0C0B09]">Ton projet musical</h2>
                    </div>
                    <p className="font-body text-[#78716C] text-sm mb-8">Parle-nous de ce que tu vas lancer.</p>

                    <div className="space-y-6">
                      {/* Nom */}
                      <div>
                        <label className="font-body text-sm font-semibold text-[#0C0B09] block mb-2">
                          Nom du projet <span style={{ color: ACCENT }}>*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Ex : Mon Bébé, EP Résilience, Album Dakar Soul..."
                          value={form.nomProjet}
                          onChange={(e) => set("nomProjet", e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border font-body text-sm text-[#0C0B09] outline-none transition-all"
                          style={{ borderColor: form.nomProjet ? ACCENT : "#E7E5E4",
                            boxShadow: form.nomProjet ? `0 0 0 3px ${ACCENT}15` : "none" }}
                        />
                      </div>

                      {/* Type */}
                      <div>
                        <label className="font-body text-sm font-semibold text-[#0C0B09] block mb-3">
                          Type de sortie <span style={{ color: ACCENT }}>*</span>
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {["Single", "EP (2-5 titres)", "Album (6+ titres)", "Mixtape"].map((t) => (
                            <Chip key={t} label={t} active={form.typeProjet === t} onClick={() => set("typeProjet", t)} />
                          ))}
                        </div>
                      </div>

                      {/* Genre */}
                      <div>
                        <label className="font-body text-sm font-semibold text-[#0C0B09] block mb-2">
                          Genre musical <span style={{ color: ACCENT }}>*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Ex : Afrobeats, Mbalax, Rap francophone, Afropop..."
                          value={form.genre}
                          onChange={(e) => set("genre", e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border font-body text-sm text-[#0C0B09] outline-none transition-all"
                          style={{ borderColor: form.genre ? ACCENT : "#E7E5E4",
                            boxShadow: form.genre ? `0 0 0 3px ${ACCENT}15` : "none" }}
                        />
                      </div>

                      {/* Délai */}
                      <div>
                        <label className="font-body text-sm font-semibold text-[#0C0B09] block mb-3">
                          Dans combien de temps tu prévois de sortir ? <span style={{ color: ACCENT }}>*</span>
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {["Dans moins de 2 semaines", "Dans 2-4 semaines", "Dans 4-6 semaines", "Dans 6-12 semaines", "Dans 3 mois+"].map((d) => (
                            <Chip key={d} label={d} active={form.delaiSortie === d} onClick={() => set("delaiSortie", d)} />
                          ))}
                        </div>
                      </div>

                      {/* Plateformes */}
                      <div>
                        <label className="font-body text-sm font-semibold text-[#0C0B09] block mb-3">
                          Plateformes de distribution <span style={{ color: ACCENT }}>*</span>
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {["Spotify", "Apple Music", "Boomplay", "Deezer", "YouTube Music", "Audiomack", "TikTok Sound"].map((p) => (
                            <MultiChip key={p} label={p} active={form.plateformes.includes(p)}
                              onClick={() => toggleArr("plateformes", p)} />
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between mt-10">
                      <button
                        onClick={() => setPhase("intro")}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-full font-body text-sm text-[#78716C] hover:bg-[#F5F5F4] transition-colors"
                      >
                        <ChevronLeft size={16} /> Retour
                      </button>
                      <button
                        onClick={() => setStep(1)}
                        disabled={!canProceedStep0}
                        className="flex items-center gap-2 px-6 py-3 rounded-full font-body font-semibold text-sm text-white transition-all"
                        style={{ background: canProceedStep0 ? ACCENT : "#D4D4D4", cursor: canProceedStep0 ? "pointer" : "not-allowed" }}
                      >
                        Suivant <ChevronRight size={16} />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Step 1 — Présence actuelle */}
                {step === 1 && (
                  <motion.div key="s1" initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -30, opacity: 0 }}>
                    <div className="flex items-center gap-3 mb-2">
                      <Users size={20} style={{ color: ACCENT }} />
                      <h2 className="font-display text-2xl text-[#0C0B09]">Ta présence actuelle</h2>
                    </div>
                    <p className="font-body text-[#78716C] text-sm mb-8">Plus tu es précis, plus le plan sera adapté.</p>

                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { label: "Abonnés Instagram", key: "abonnesInstagram" as const, ph: "Ex : 2 500" },
                          { label: "Abonnés TikTok", key: "abonnesTiktok" as const, ph: "Ex : 8 000" },
                          { label: "Abonnés YouTube", key: "abonnesYoutube" as const, ph: "Ex : 500" },
                          { label: "Streams mensuels", key: "streamsActuels" as const, ph: "Ex : 1 200" },
                        ].map(({ label, key, ph }) => (
                          <div key={key}>
                            <label className="font-body text-sm font-medium text-[#0C0B09] block mb-2">{label}</label>
                            <input
                              type="text"
                              placeholder={ph}
                              value={form[key]}
                              onChange={(e) => set(key, e.target.value)}
                              className="w-full px-4 py-3 rounded-xl border font-body text-sm text-[#0C0B09] outline-none transition-all"
                              style={{ borderColor: form[key] ? ACCENT : "#E7E5E4",
                                boxShadow: form[key] ? `0 0 0 3px ${ACCENT}15` : "none" }}
                            />
                          </div>
                        ))}
                      </div>

                      <div>
                        <label className="font-body text-sm font-semibold text-[#0C0B09] block mb-3">
                          Tu as déjà sorti de la musique ? <span style={{ color: ACCENT }}>*</span>
                        </label>
                        <div className="flex gap-3">
                          {["Oui, plusieurs sorties", "Oui, une sortie", "Non, c'est ma première"].map((v) => (
                            <Chip key={v} label={v} active={form.sortiesPrecedentes === v} onClick={() => set("sortiesPrecedentes", v)} />
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="font-body text-sm font-semibold text-[#0C0B09] block mb-3">
                          Une collaboration est prévue ? <span style={{ color: ACCENT }}>*</span>
                        </label>
                        <div className="flex gap-3">
                          {["Oui", "Non", "Pas encore décidé"].map((v) => (
                            <Chip key={v} label={v} active={form.collaboration === v} onClick={() => set("collaboration", v)} />
                          ))}
                        </div>
                      </div>

                      {form.collaboration === "Oui" && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}>
                          <label className="font-body text-sm font-medium text-[#0C0B09] block mb-2">Avec quel artiste ?</label>
                          <input
                            type="text"
                            placeholder="Nom de l'artiste en feat"
                            value={form.artisteCollab}
                            onChange={(e) => set("artisteCollab", e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border font-body text-sm text-[#0C0B09] outline-none"
                            style={{ borderColor: "#E7E5E4" }}
                          />
                        </motion.div>
                      )}
                    </div>

                    <div className="flex justify-between mt-10">
                      <button
                        onClick={() => setStep(0)}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-full font-body text-sm text-[#78716C] hover:bg-[#F5F5F4] transition-colors"
                      >
                        <ChevronLeft size={16} /> Retour
                      </button>
                      <button
                        onClick={() => setStep(2)}
                        disabled={!canProceedStep1}
                        className="flex items-center gap-2 px-6 py-3 rounded-full font-body font-semibold text-sm text-white transition-all"
                        style={{ background: canProceedStep1 ? ACCENT : "#D4D4D4", cursor: canProceedStep1 ? "pointer" : "not-allowed" }}
                      >
                        Suivant <ChevronRight size={16} />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Step 2 — Ressources & Objectifs */}
                {step === 2 && (
                  <motion.div key="s2" initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -30, opacity: 0 }}>
                    <div className="flex items-center gap-3 mb-2">
                      <Target size={20} style={{ color: ACCENT }} />
                      <h2 className="font-display text-2xl text-[#0C0B09]">Ressources & Objectifs</h2>
                    </div>
                    <p className="font-body text-[#78716C] text-sm mb-8">On adapte la stratégie à tes moyens réels.</p>

                    <div className="space-y-6">
                      <div>
                        <label className="font-body text-sm font-semibold text-[#0C0B09] block mb-3">
                          Budget marketing disponible <span style={{ color: ACCENT }}>*</span>
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {["Pas de budget", "Moins de 50 000 FCFA", "50 000 – 200 000 FCFA", "200 000 – 500 000 FCFA", "500 000 FCFA+"].map((b) => (
                            <Chip key={b} label={b} active={form.budget === b} onClick={() => set("budget", b)} />
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="font-body text-sm font-semibold text-[#0C0B09] block mb-3">
                          Ton équipe <span style={{ color: ACCENT }}>*</span>
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {["Je suis seul(e)", "J'ai un manager", "Je suis signé(e) en label", "J'ai une équipe complète"].map((e) => (
                            <Chip key={e} label={e} active={form.equipe === e} onClick={() => set("equipe", e)} />
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="font-body text-sm font-semibold text-[#0C0B09] block mb-3">
                          Objectif principal <span style={{ color: ACCENT }}>*</span>
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {[
                            "Maximum de streams",
                            "Visibilité & notoriété",
                            "Viral sur TikTok",
                            "Booking & concerts",
                            "Conquête diaspora",
                          ].map((o) => (
                            <Chip key={o} label={o} active={form.objectif === o} onClick={() => set("objectif", o)} />
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="font-body text-sm font-semibold text-[#0C0B09] block mb-3">
                          Marchés cibles <span style={{ color: ACCENT }}>*</span> <span className="text-[#78716C] font-normal">(plusieurs possibles)</span>
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {["Sénégal", "Afrique de l'Ouest", "Côte d'Ivoire", "France / Diaspora", "International"].map((m) => (
                            <MultiChip key={m} label={m} active={form.marches.includes(m)}
                              onClick={() => toggleArr("marches", m)} />
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="font-body text-sm font-medium text-[#0C0B09] block mb-2">
                          Artistes similaires / inspirations <span className="text-[#78716C] font-normal">(optionnel)</span>
                        </label>
                        <textarea
                          rows={3}
                          placeholder="Ex : Burna Boy, Youssou N'Dour, Benson Boone, Fireboy DML..."
                          value={form.inspirations}
                          onChange={(e) => set("inspirations", e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border font-body text-sm text-[#0C0B09] outline-none resize-none"
                          style={{ borderColor: "#E7E5E4" }}
                        />
                      </div>
                    </div>

                    <div className="flex justify-between mt-10">
                      <button
                        onClick={() => setStep(1)}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-full font-body text-sm text-[#78716C] hover:bg-[#F5F5F4] transition-colors"
                      >
                        <ChevronLeft size={16} /> Retour
                      </button>
                      <button
                        onClick={handleSubmit}
                        disabled={!canProceedStep2}
                        className="flex items-center gap-2 px-7 py-3 rounded-full font-body font-semibold text-sm text-white transition-all"
                        style={{ background: canProceedStep2 ? ACCENT : "#D4D4D4", cursor: canProceedStep2 ? "pointer" : "not-allowed" }}
                      >
                        Générer ma stratégie <Rocket size={16} />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* ── LOADING ───────────────────────────────────────── */}
        {phase === "loading" && (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="min-h-screen flex flex-col items-center justify-center px-4">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8"
              style={{ background: ACCENT_LIGHT }}>
              <Loader2 size={32} style={{ color: ACCENT }} className="animate-spin" />
            </div>
            <h2 className="font-display text-2xl text-[#0C0B09] mb-3 text-center">Construction de ta stratégie...</h2>
            <p className="font-body text-[#78716C] text-sm mb-10 text-center">L'IA analyse ton profil et prépare ton plan 90 jours</p>
            <div className="w-full max-w-sm space-y-3">
              {LOADING_STEPS.map((s, i) => (
                <motion.div
                  key={s}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: i <= loadingStep ? 1 : 0.3, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl"
                  style={{ background: i <= loadingStep ? ACCENT_LIGHT : "#F5F5F4" }}
                >
                  {i < loadingStep
                    ? <CheckCircle2 size={16} style={{ color: ACCENT }} />
                    : i === loadingStep
                      ? <Loader2 size={16} style={{ color: ACCENT }} className="animate-spin" />
                      : <div className="w-4 h-4 rounded-full border-2 border-[#D4D4D4]" />}
                  <span className="font-body text-sm" style={{ color: i <= loadingStep ? ACCENT : "#A8A29E" }}>{s}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── ERROR ─────────────────────────────────────────── */}
        {phase === "error" && (
          <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
            <AlertCircle size={48} className="text-red-400 mb-4" />
            <h2 className="font-display text-2xl text-[#0C0B09] mb-2">Oups, une erreur s'est produite</h2>
            <p className="font-body text-[#78716C] mb-8">{error}</p>
            <button onClick={() => { setPhase("form"); setStep(0); }}
              className="px-6 py-3 rounded-full font-body font-semibold text-white"
              style={{ background: ACCENT }}>
              Réessayer
            </button>
          </motion.div>
        )}

        {/* ── RESULTS ───────────────────────────────────────── */}
        {phase === "results" && result && (
          <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {/* Header */}
            <div className="relative" style={{ background: "#0C0B09" }}>
              <div className="absolute inset-0 opacity-10"
                style={{ backgroundImage: `radial-gradient(circle at 70% 50%, ${ACCENT} 0%, transparent 60%)` }} />
              <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 relative z-10">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                  <div className="shrink-0">
                    <ScoreCircle score={result.score_lancement} />
                    <p className="font-body text-xs text-white/40 text-center mt-2">Score de préparation</p>
                  </div>
                  <div className="flex-1">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full font-body text-xs font-semibold mb-3"
                      style={{ background: ACCENT_LIGHT, color: ACCENT, border: `1px solid ${ACCENT}30` }}>
                      <Star size={12} /> {result.niveau_preparatif}
                    </div>
                    <h1 className="font-display text-3xl text-white mb-3">
                      Stratégie pour<br /><span style={{ color: ACCENT }}>« {form.nomProjet} »</span>
                    </h1>
                    <p className="font-body text-white/60 text-sm leading-relaxed">{result.resume_strategie}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12">

              {/* Phases */}
              <section>
                <h2 className="font-display text-2xl text-[#0C0B09] mb-6 flex items-center gap-2">
                  <Calendar size={22} style={{ color: ACCENT }} /> Plan 90 Jours — 5 Phases
                </h2>
                <div className="space-y-4">
                  {result.phases.map((p, i) => (
                    <motion.div
                      key={p.nom}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="rounded-2xl overflow-hidden border border-[#E7E5E4]"
                    >
                      <div className="flex items-center gap-4 px-5 py-4"
                        style={{ background: `${PHASE_COLORS[i] || ACCENT}10`, borderLeft: `4px solid ${PHASE_COLORS[i] || ACCENT}` }}>
                        <div className="w-8 h-8 rounded-full flex items-center justify-center font-body font-bold text-sm text-white shrink-0"
                          style={{ background: PHASE_COLORS[i] || ACCENT }}>
                          {i + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                            <h3 className="font-body font-semibold text-[#0C0B09] text-sm">{p.nom}</h3>
                            <span className="font-body text-xs px-2 py-0.5 rounded-full"
                              style={{ background: `${PHASE_COLORS[i] || ACCENT}20`, color: PHASE_COLORS[i] || ACCENT }}>
                              {p.periode}
                            </span>
                          </div>
                          <p className="font-body text-xs text-[#78716C] mt-0.5">{p.objectif}</p>
                        </div>
                      </div>
                      <div className="px-5 py-4 bg-white grid sm:grid-cols-2 gap-4">
                        <div>
                          <p className="font-body text-xs font-semibold text-[#0C0B09] mb-2 uppercase tracking-wider">Actions clés</p>
                          <ul className="space-y-1.5">
                            {p.actions_cles.map((a, j) => (
                              <li key={j} className="flex items-start gap-2 font-body text-sm text-[#44403C]">
                                <CheckCircle2 size={14} style={{ color: PHASE_COLORS[i] || ACCENT }} className="shrink-0 mt-0.5" />
                                {a}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="font-body text-xs font-semibold text-[#0C0B09] mb-2 uppercase tracking-wider">Contenus</p>
                          <div className="flex flex-wrap gap-1.5">
                            {p.contenu_type.map((c) => (
                              <span key={c} className="px-2 py-1 rounded-lg font-body text-xs"
                                style={{ background: `${PHASE_COLORS[i] || ACCENT}15`, color: PHASE_COLORS[i] || ACCENT }}>
                                {c}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* Semaine type + Canaux */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* Semaine type */}
                <section>
                  <h2 className="font-display text-xl text-[#0C0B09] mb-4 flex items-center gap-2">
                    <Clock size={18} style={{ color: ACCENT }} /> Semaine type
                  </h2>
                  <div className="rounded-2xl border border-[#E7E5E4] overflow-hidden bg-white">
                    {result.plan_semaine_type.map(({ jour, action }, i) => (
                      <div key={jour} className={`flex items-start gap-3 px-4 py-3 ${i < result.plan_semaine_type.length - 1 ? "border-b border-[#F5F5F4]" : ""}`}>
                        <span className="font-body text-xs font-semibold shrink-0 w-16" style={{ color: ACCENT }}>{jour}</span>
                        <span className="font-body text-sm text-[#44403C]">{action}</span>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Canaux */}
                <section>
                  <h2 className="font-display text-xl text-[#0C0B09] mb-4 flex items-center gap-2">
                    <Zap size={18} style={{ color: ACCENT }} /> Canaux prioritaires
                  </h2>
                  <div className="space-y-3">
                    {result.canaux_prioritaires.map(({ canal, priorite, action }) => {
                      const pColor = priorite === "Essentiel" ? "#10B981" : priorite === "Important" ? ACCENT : "#F59E0B";
                      return (
                        <div key={canal} className="p-4 rounded-xl border border-[#E7E5E4] bg-white">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-body text-sm font-semibold text-[#0C0B09]">{canal}</span>
                            <span className="font-body text-[10px] font-semibold px-2 py-0.5 rounded-full"
                              style={{ background: `${pColor}15`, color: pColor }}>
                              {priorite}
                            </span>
                          </div>
                          <p className="font-body text-xs text-[#78716C]">{action}</p>
                        </div>
                      );
                    })}
                  </div>
                </section>
              </div>

              {/* Budget + KPIs */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* Budget */}
                <section>
                  <h2 className="font-display text-xl text-[#0C0B09] mb-4 flex items-center gap-2">
                    <DollarSign size={18} style={{ color: ACCENT }} /> Répartition du budget
                  </h2>
                  <div className="space-y-3">
                    {result.budget_repartition.map(({ poste, pourcentage, details }) => (
                      <div key={poste} className="p-4 rounded-xl border border-[#E7E5E4] bg-white">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-body text-sm font-semibold text-[#0C0B09]">{poste}</span>
                          <span className="font-display text-lg font-bold" style={{ color: ACCENT }}>{pourcentage}%</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-[#F5F5F4] mb-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${pourcentage}%` }}
                            transition={{ duration: 1, delay: 0.3 }}
                            className="h-full rounded-full"
                            style={{ background: ACCENT }}
                          />
                        </div>
                        <p className="font-body text-xs text-[#78716C]">{details}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* KPIs */}
                <section>
                  <h2 className="font-display text-xl text-[#0C0B09] mb-4 flex items-center gap-2">
                    <TrendingUp size={18} style={{ color: ACCENT }} /> KPIs & Objectifs
                  </h2>
                  <div className="rounded-2xl border border-[#E7E5E4] overflow-hidden bg-white">
                    <div className="grid grid-cols-3 px-4 py-2 border-b border-[#F5F5F4]">
                      <span className="font-body text-[10px] font-semibold text-[#A8A29E] uppercase tracking-wider">Métrique</span>
                      <span className="font-body text-[10px] font-semibold text-[#A8A29E] uppercase tracking-wider text-center">J+30</span>
                      <span className="font-body text-[10px] font-semibold text-[#A8A29E] uppercase tracking-wider text-right">J+90</span>
                    </div>
                    {result.kpis_objectifs.map(({ metrique, objectif_30j, objectif_90j }, i) => (
                      <div key={metrique} className={`grid grid-cols-3 px-4 py-3 ${i < result.kpis_objectifs.length - 1 ? "border-b border-[#F5F5F4]" : ""}`}>
                        <span className="font-body text-xs text-[#44403C]">{metrique}</span>
                        <span className="font-body text-xs font-medium text-center" style={{ color: ACCENT }}>{objectif_30j}</span>
                        <span className="font-body text-xs font-bold text-right" style={{ color: "#10B981" }}>{objectif_90j}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              {/* Contenus à préparer + Erreurs */}
              <div className="grid md:grid-cols-2 gap-8">
                <section>
                  <h2 className="font-display text-xl text-[#0C0B09] mb-4 flex items-center gap-2">
                    <BookOpen size={18} style={{ color: ACCENT }} /> Contenus à préparer
                  </h2>
                  <ul className="space-y-2">
                    {result.contenus_a_preparer.map((c, i) => (
                      <motion.li
                        key={i}
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: i * 0.07 }}
                        className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-[#E7E5E4]"
                      >
                        <CheckCircle2 size={15} style={{ color: ACCENT }} className="shrink-0 mt-0.5" />
                        <span className="font-body text-sm text-[#44403C]">{c}</span>
                      </motion.li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h2 className="font-display text-xl text-[#0C0B09] mb-4 flex items-center gap-2">
                    <XCircle size={18} className="text-red-400" /> Erreurs à éviter
                  </h2>
                  <ul className="space-y-2">
                    {result.erreurs_a_eviter.map((e, i) => (
                      <motion.li
                        key={i}
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-2.5 p-3 rounded-xl bg-red-50 border border-red-100"
                      >
                        <XCircle size={15} className="text-red-400 shrink-0 mt-0.5" />
                        <span className="font-body text-sm text-red-700">{e}</span>
                      </motion.li>
                    ))}
                  </ul>
                </section>
              </div>

              {/* Message lancement */}
              <section>
                <div className="rounded-2xl p-8 text-center" style={{ background: `linear-gradient(135deg, ${ACCENT}15, ${ACCENT}08)`, border: `1px solid ${ACCENT}25` }}>
                  <Rocket size={32} style={{ color: ACCENT }} className="mx-auto mb-4" />
                  <p className="font-display text-xl text-[#0C0B09] mb-3">Message de ton coach IA</p>
                  <p className="font-body text-[#44403C] leading-relaxed max-w-2xl mx-auto italic">
                    &ldquo;{result.message_lancement}&rdquo;
                  </p>
                </div>
              </section>

              {/* CTA */}
              <section className="rounded-2xl p-8 text-center" style={{ background: "#0C0B09" }}>
                <h2 className="font-display text-2xl text-white mb-3">
                  Prêt pour un accompagnement <span style={{ color: ACCENT }}>professionnel ?</span>
                </h2>
                <p className="font-body text-white/60 text-sm mb-6 max-w-xl mx-auto">
                  Notre équipe peut exécuter cette stratégie avec toi — visuels, contenu, promotion et distribution.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full font-body font-semibold text-sm text-white"
                    style={{ background: ACCENT }}
                  >
                    Travailler avec KEKELI <ChevronRight size={16} />
                  </a>
                  <button
                    onClick={() => { setPhase("form"); setStep(0); }}
                    className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full font-body font-semibold text-sm text-white/60 hover:text-white transition-colors border border-white/10"
                  >
                    Nouvelle stratégie
                  </button>
                </div>
              </section>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
