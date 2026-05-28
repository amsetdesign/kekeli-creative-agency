"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Palette, Sparkles, ChevronRight, ChevronLeft,
  Loader2, AlertCircle, CheckCircle2, Copy, Check,
  Type, Camera, Film, Shirt, LayoutGrid, Layers,
} from "lucide-react";

/* ─── Types ─────────────────────────────────────────────── */
interface ColorSwatch { hex: string; nom: string; usage: string }
interface MoodboardResult {
  univers_nom: string;
  palette_principale: ColorSwatch[];
  palette_complementaire: ColorSwatch[];
  typographie: {
    titre: { style: string; sensation: string; exemples: string[] };
    corps: { style: string; sensation: string; exemples: string[] };
  };
  direction_visuelle: {
    concept: string;
    mots_cles: string[];
    textures: string[];
    eclairage: string;
    composition: string;
  };
  references_visuelles: { categorie: string; exemples: string[] }[];
  guide_contenu: { posts_instagram: string; stories: string; reels_tiktok: string; cover_spotify: string };
  do_dont: { faire: string[]; eviter: string[] };
  message_creatif: string;
}
interface FormData {
  nomArtiste: string;
  genre: string;
  mood: string;
  moment: string;
  influencesVisuelles: string;
  filmsRef: string;
  couleursAimees: string[];
  couleursEviter: string[];
  publicCible: string;
  message: string;
  plateformes: string[];
}

const ACCENT = "#A855F7";
const ACCENT_LIGHT = "rgba(168,85,247,0.1)";

/* ─── Chip helpers ───────────────────────────────────────── */
function Chip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick}
      className="px-4 py-2 rounded-full font-body text-sm transition-all border"
      style={{
        background: active ? ACCENT_LIGHT : "transparent",
        borderColor: active ? ACCENT : "#E7E5E4",
        color: active ? ACCENT : "#78716C",
        fontWeight: active ? 600 : 400,
      }}>
      {label}
    </button>
  );
}
function ColorChip({ color, active, onClick }: { color: string; active: boolean; onClick: () => void }) {
  const HEX_MAP: Record<string, string> = {
    "Noir": "#0C0B09", "Blanc": "#FAFAF9", "Or": "#C8A84B", "Rouge": "#EF4444",
    "Orange": "#F97316", "Jaune": "#EAB308", "Vert": "#22C55E", "Bleu": "#3B82F6",
    "Violet": "#8B5CF6", "Rose": "#EC4899", "Marron": "#92400E", "Gris": "#6B7280",
  };
  const hex = HEX_MAP[color] || "#E7E5E4";
  return (
    <button type="button" onClick={onClick}
      className="flex items-center gap-2 px-3 py-2 rounded-xl border transition-all font-body text-sm"
      style={{
        background: active ? `${ACCENT}12` : "transparent",
        borderColor: active ? ACCENT : "#E7E5E4",
        color: active ? ACCENT : "#78716C",
        fontWeight: active ? 600 : 400,
      }}>
      <span className="w-4 h-4 rounded-full border border-white/20 shrink-0" style={{ background: hex }} />
      {color}
    </button>
  );
}

/* ─── Color swatch card ─────────────────────────────────── */
function SwatchCard({ swatch, size = "lg" }: { swatch: ColorSwatch; size?: "lg" | "sm" }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(swatch.hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const textColor = isLight(swatch.hex) ? "#0C0B09" : "#FFFFFF";

  if (size === "sm") {
    return (
      <div className="rounded-2xl overflow-hidden border border-white/10 group cursor-pointer" onClick={copy}>
        <div className="h-16" style={{ background: swatch.hex }} />
        <div className="p-3 bg-white">
          <p className="font-body text-xs font-semibold text-[#0C0B09]">{swatch.nom}</p>
          <p className="font-mono text-[10px] text-[#A8A29E]">{swatch.hex}</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      onClick={copy}
      className="rounded-2xl overflow-hidden cursor-pointer group"
      style={{ border: "1px solid rgba(0,0,0,0.06)" }}
    >
      <div className="h-32 relative flex items-end p-4" style={{ background: swatch.hex }}>
        <div
          className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity w-7 h-7 rounded-full flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.25)" }}
        >
          {copied ? <Check size={12} color="white" /> : <Copy size={12} color="white" />}
        </div>
        <p className="font-mono text-xs font-bold" style={{ color: textColor, opacity: 0.8 }}>
          {swatch.hex}
        </p>
      </div>
      <div className="p-4 bg-white">
        <p className="font-body text-sm font-semibold text-[#0C0B09]">{swatch.nom}</p>
        <p className="font-body text-xs text-[#78716C] mt-1">{swatch.usage}</p>
      </div>
    </motion.div>
  );
}

function isLight(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 128;
}

const LOADING_STEPS = [
  "Analyse de ton univers musical...",
  "Génération de ta palette de couleurs...",
  "Définition de ta direction visuelle...",
  "Sélection des références esthétiques...",
  "Création de ton guide de contenu...",
];

const MOODS = ["Mélancolique", "Énergique", "Sensuel", "Spirituel / Mystique", "Festif", "Introspectif", "Romantic", "Sombre / Dramatique"];
const MOMENTS = ["Nuit urbaine", "Journée solaire", "Coucher de soleil", "Aube / Brume", "Studio sombre", "Nature sauvage"];
const COULEURS = ["Noir", "Blanc", "Or", "Rouge", "Orange", "Jaune", "Vert", "Bleu", "Violet", "Rose", "Marron", "Gris"];
const PUBLICS = ["Jeunes 18-25", "Trentenaires", "Famille / Tous publics", "Hip-hop fans", "Afrobeats fans", "Élite / Luxe"];
const PLATEFORMES = ["LayoutGrid", "TikTok / Reels", "YouTube", "Spotify Canvas", "Scène / Affiches"];

type Phase_ = "intro" | "form" | "loading" | "results" | "error";

const GUIDE_ICONS: Record<string, React.ReactNode> = {
  posts_instagram: <LayoutGrid size={16} />,
  stories: <Layers size={16} />,
  reels_tiktok: <Camera size={16} />,
  cover_spotify: <Palette size={16} />,
};
const GUIDE_LABELS: Record<string, string> = {
  posts_instagram: "Posts LayoutGrid",
  stories: "Stories",
  reels_tiktok: "Reels & TikTok",
  cover_spotify: "Cover Spotify",
};
const REF_ICONS: Record<string, React.ReactNode> = {
  "Cinéma & Séries": <Film size={15} />,
  "Photographie": <Camera size={15} />,
  "Art visuel & Peinture": <Palette size={15} />,
  "Mode & Fashion": <Shirt size={15} />,
};

export default function MoodboardClient() {
  const [phase, setPhase] = useState<Phase_>("intro");
  const [step, setStep] = useState(0);
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState<MoodboardResult | null>(null);
  const [error, setError] = useState("");
  const topRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState<FormData>({
    nomArtiste: "", genre: "", mood: "", moment: "",
    influencesVisuelles: "", filmsRef: "",
    couleursAimees: [], couleursEviter: [],
    publicCible: "", message: "", plateformes: [],
  });

  const set = (k: keyof FormData, v: string) => setForm((f) => ({ ...f, [k]: v }));
  const toggleArr = (k: "couleursAimees" | "couleursEviter" | "plateformes", v: string) =>
    setForm((f) => ({ ...f, [k]: f[k].includes(v) ? f[k].filter((x) => x !== v) : [...f[k], v] }));

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [phase, step]);

  async function handleSubmit() {
    setPhase("loading");
    setLoadingStep(0);
    const iv = setInterval(() => setLoadingStep((s) => Math.min(s + 1, LOADING_STEPS.length - 1)), 1300);
    try {
      const res = await fetch("/api/moodboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: form }),
      });
      const json = await res.json();
      clearInterval(iv);
      if (!res.ok || !json.moodboard) { setError(json.error || "Erreur"); setPhase("error"); return; }
      setResult(json.moodboard);
      setPhase("results");
    } catch {
      clearInterval(iv);
      setError("Impossible de contacter le serveur.");
      setPhase("error");
    }
  }

  const canStep0 = form.genre.trim() && form.mood;
  const canStep1 = form.influencesVisuelles.trim() && form.couleursAimees.length > 0;
  const canStep2 = form.publicCible && form.message.trim() && form.plateformes.length > 0;

  return (
    <div ref={topRef} className="min-h-screen bg-[#FAFAF9]">
      <AnimatePresence mode="wait">

        {/* ── INTRO ─────────────────────────────────────────── */}
        {phase === "intro" && (
          <motion.div key="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="relative overflow-hidden py-24 px-4 text-center" style={{ background: "#0C0B09" }}>
              <div className="absolute inset-0 opacity-15"
                style={{ backgroundImage: `radial-gradient(ellipse 80% 60% at 50% 60%, ${ACCENT} 0%, transparent 65%)` }} />
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}
                className="w-20 h-20 rounded-2xl mx-auto mb-8 flex items-center justify-center relative z-10"
                style={{ background: ACCENT_LIGHT, border: `1px solid ${ACCENT}40` }}>
                <Palette size={36} style={{ color: ACCENT }} />
              </motion.div>
              <motion.h1
                initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15 }}
                className="font-display text-4xl md:text-5xl text-white mb-4 relative z-10">
                Moodboard <span style={{ color: ACCENT }}>& Direction Visuelle IA</span>
              </motion.h1>
              <motion.p
                initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.25 }}
                className="font-body text-white/50 text-lg max-w-2xl mx-auto mb-12 relative z-10">
                Décris ton univers musical et notre IA génère ta direction artistique visuelle complète — palette, typographie, références et guide de contenu.
              </motion.p>
              <motion.div
                initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.35 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-12 relative z-10">
                {[
                  { label: "Palette couleurs", desc: "5+3 teintes personnalisées" },
                  { label: "Typographie", desc: "Polices recommandées" },
                  { label: "Références visuelles", desc: "Cinéma, photo, mode" },
                  { label: "Guide de contenu", desc: "Par plateforme" },
                ].map(({ label, desc }) => (
                  <div key={label} className="p-4 rounded-2xl text-center"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <p className="font-body text-sm font-semibold text-white">{label}</p>
                    <p className="font-body text-xs text-white/30 mt-1">{desc}</p>
                  </div>
                ))}
              </motion.div>
              <motion.button
                initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.45 }}
                onClick={() => setPhase("form")}
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-body font-semibold text-white relative z-10"
                style={{ background: ACCENT }}>
                Créer mon moodboard <Sparkles size={18} />
              </motion.button>
              <p className="font-body text-white/25 text-sm mt-4 relative z-10">Gratuit · 3 minutes · Résultat visuel</p>
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
                    <div className="w-8 h-8 rounded-full flex items-center justify-center font-body text-sm font-semibold shrink-0 transition-all"
                      style={{ background: i <= step ? ACCENT : "#F5F5F4", color: i <= step ? "white" : "#A8A29E" }}>
                      {i < step ? <CheckCircle2 size={16} /> : i + 1}
                    </div>
                    {i < 2 && <div className="flex-1 h-0.5 rounded-full transition-all"
                      style={{ background: i < step ? ACCENT : "#E7E5E4" }} />}
                  </div>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {/* Step 0 — Style & Ambiance */}
                {step === 0 && (
                  <motion.div key="s0" initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -30, opacity: 0 }}>
                    <div className="flex items-center gap-3 mb-2">
                      <Palette size={20} style={{ color: ACCENT }} />
                      <h2 className="font-display text-2xl text-[#0C0B09]">Style & Ambiance</h2>
                    </div>
                    <p className="font-body text-[#78716C] text-sm mb-8">L'essence de ton univers musical.</p>
                    <div className="space-y-6">
                      <div>
                        <label className="font-body text-sm font-semibold text-[#0C0B09] block mb-2">Nom artistique</label>
                        <input type="text" placeholder="Ton nom d'artiste" value={form.nomArtiste}
                          onChange={(e) => set("nomArtiste", e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border font-body text-sm text-[#0C0B09] outline-none transition-all"
                          style={{ borderColor: "#E7E5E4" }} />
                      </div>
                      <div>
                        <label className="font-body text-sm font-semibold text-[#0C0B09] block mb-2">
                          Genre musical <span style={{ color: ACCENT }}>*</span>
                        </label>
                        <input type="text" placeholder="Ex : Afrobeats, Mbalax, Drill africain..."
                          value={form.genre} onChange={(e) => set("genre", e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border font-body text-sm text-[#0C0B09] outline-none transition-all"
                          style={{ borderColor: form.genre ? ACCENT : "#E7E5E4",
                            boxShadow: form.genre ? `0 0 0 3px ${ACCENT}12` : "none" }} />
                      </div>
                      <div>
                        <label className="font-body text-sm font-semibold text-[#0C0B09] block mb-3">
                          Mood dominant <span style={{ color: ACCENT }}>*</span>
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {MOODS.map((m) => <Chip key={m} label={m} active={form.mood === m} onClick={() => set("mood", m)} />)}
                        </div>
                      </div>
                      <div>
                        <label className="font-body text-sm font-semibold text-[#0C0B09] block mb-3">
                          Moment / Atmosphère
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {MOMENTS.map((m) => <Chip key={m} label={m} active={form.moment === m} onClick={() => set("moment", m)} />)}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between mt-10">
                      <button onClick={() => setPhase("intro")}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-full font-body text-sm text-[#78716C] hover:bg-[#F5F5F4] transition-colors">
                        <ChevronLeft size={16} /> Retour
                      </button>
                      <button onClick={() => setStep(1)} disabled={!canStep0}
                        className="flex items-center gap-2 px-6 py-3 rounded-full font-body font-semibold text-sm text-white transition-all"
                        style={{ background: canStep0 ? ACCENT : "#D4D4D4", cursor: canStep0 ? "pointer" : "not-allowed" }}>
                        Suivant <ChevronRight size={16} />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Step 1 — Références & Couleurs */}
                {step === 1 && (
                  <motion.div key="s1" initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -30, opacity: 0 }}>
                    <div className="flex items-center gap-3 mb-2">
                      <Film size={20} style={{ color: ACCENT }} />
                      <h2 className="font-display text-2xl text-[#0C0B09]">Références & Couleurs</h2>
                    </div>
                    <p className="font-body text-[#78716C] text-sm mb-8">Ce qui t'inspire visuellement.</p>
                    <div className="space-y-6">
                      <div>
                        <label className="font-body text-sm font-semibold text-[#0C0B09] block mb-2">
                          Artistes qui t'inspirent visuellement <span style={{ color: ACCENT }}>*</span>
                        </label>
                        <textarea rows={3} placeholder="Ex : Burna Boy, Rihanna, Tyler the Creator, Solange Knowles..."
                          value={form.influencesVisuelles}
                          onChange={(e) => set("influencesVisuelles", e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border font-body text-sm text-[#0C0B09] outline-none resize-none transition-all"
                          style={{ borderColor: form.influencesVisuelles ? ACCENT : "#E7E5E4",
                            boxShadow: form.influencesVisuelles ? `0 0 0 3px ${ACCENT}12` : "none" }} />
                      </div>
                      <div>
                        <label className="font-body text-sm font-medium text-[#0C0B09] block mb-2">
                          Films / Séries qui correspondent à ton univers <span className="text-[#78716C] font-normal">(optionnel)</span>
                        </label>
                        <textarea rows={2} placeholder="Ex : Black Panther, Atlanta, Moonlight, No Time To Die..."
                          value={form.filmsRef} onChange={(e) => set("filmsRef", e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border font-body text-sm text-[#0C0B09] outline-none resize-none"
                          style={{ borderColor: "#E7E5E4" }} />
                      </div>
                      <div>
                        <label className="font-body text-sm font-semibold text-[#0C0B09] block mb-3">
                          Couleurs que tu aimes <span style={{ color: ACCENT }}>*</span>
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {COULEURS.map((c) => (
                            <ColorChip key={c} color={c} active={form.couleursAimees.includes(c)}
                              onClick={() => toggleArr("couleursAimees", c)} />
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="font-body text-sm font-semibold text-[#0C0B09] block mb-3">
                          Couleurs à éviter <span className="font-normal text-[#78716C]">(optionnel)</span>
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {COULEURS.map((c) => (
                            <ColorChip key={c} color={c} active={form.couleursEviter.includes(c)}
                              onClick={() => toggleArr("couleursEviter", c)} />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between mt-10">
                      <button onClick={() => setStep(0)}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-full font-body text-sm text-[#78716C] hover:bg-[#F5F5F4] transition-colors">
                        <ChevronLeft size={16} /> Retour
                      </button>
                      <button onClick={() => setStep(2)} disabled={!canStep1}
                        className="flex items-center gap-2 px-6 py-3 rounded-full font-body font-semibold text-sm text-white transition-all"
                        style={{ background: canStep1 ? ACCENT : "#D4D4D4", cursor: canStep1 ? "pointer" : "not-allowed" }}>
                        Suivant <ChevronRight size={16} />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Step 2 — Public & Objectifs */}
                {step === 2 && (
                  <motion.div key="s2" initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -30, opacity: 0 }}>
                    <div className="flex items-center gap-3 mb-2">
                      <Sparkles size={20} style={{ color: ACCENT }} />
                      <h2 className="font-display text-2xl text-[#0C0B09]">Public & Message</h2>
                    </div>
                    <p className="font-body text-[#78716C] text-sm mb-8">À qui tu t'adresses et ce que tu veux transmettre.</p>
                    <div className="space-y-6">
                      <div>
                        <label className="font-body text-sm font-semibold text-[#0C0B09] block mb-3">
                          Public cible <span style={{ color: ACCENT }}>*</span>
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {PUBLICS.map((p) => <Chip key={p} label={p} active={form.publicCible === p} onClick={() => set("publicCible", p)} />)}
                        </div>
                      </div>
                      <div>
                        <label className="font-body text-sm font-semibold text-[#0C0B09] block mb-2">
                          Message principal que tu veux transmettre <span style={{ color: ACCENT }}>*</span>
                        </label>
                        <textarea rows={3}
                          placeholder="Ex : La fierté africaine, l'amour, la résilience, la fête, le luxe discret..."
                          value={form.message} onChange={(e) => set("message", e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border font-body text-sm text-[#0C0B09] outline-none resize-none transition-all"
                          style={{ borderColor: form.message ? ACCENT : "#E7E5E4",
                            boxShadow: form.message ? `0 0 0 3px ${ACCENT}12` : "none" }} />
                      </div>
                      <div>
                        <label className="font-body text-sm font-semibold text-[#0C0B09] block mb-3">
                          Plateformes visuelles prioritaires <span style={{ color: ACCENT }}>*</span>
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {PLATEFORMES.map((p) => (
                            <Chip key={p} label={p} active={form.plateformes.includes(p)}
                              onClick={() => toggleArr("plateformes", p)} />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between mt-10">
                      <button onClick={() => setStep(1)}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-full font-body text-sm text-[#78716C] hover:bg-[#F5F5F4] transition-colors">
                        <ChevronLeft size={16} /> Retour
                      </button>
                      <button onClick={handleSubmit} disabled={!canStep2}
                        className="flex items-center gap-2 px-7 py-3 rounded-full font-body font-semibold text-sm text-white transition-all"
                        style={{ background: canStep2 ? ACCENT : "#D4D4D4", cursor: canStep2 ? "pointer" : "not-allowed" }}>
                        Générer mon moodboard <Palette size={16} />
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
            <h2 className="font-display text-2xl text-[#0C0B09] mb-3 text-center">Création de ton univers visuel...</h2>
            <p className="font-body text-[#78716C] text-sm mb-10 text-center">L'IA compose ta palette et ton guide de direction artistique</p>
            <div className="w-full max-w-sm space-y-3">
              {LOADING_STEPS.map((s, i) => (
                <motion.div key={s} initial={{ opacity: 0, x: -10 }} animate={{ opacity: i <= loadingStep ? 1 : 0.3, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl"
                  style={{ background: i <= loadingStep ? ACCENT_LIGHT : "#F5F5F4" }}>
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
            <h2 className="font-display text-2xl text-[#0C0B09] mb-2">Une erreur s'est produite</h2>
            <p className="font-body text-[#78716C] mb-8">{error}</p>
            <button onClick={() => { setPhase("form"); setStep(0); }}
              className="px-6 py-3 rounded-full font-body font-semibold text-white"
              style={{ background: ACCENT }}>Réessayer</button>
          </motion.div>
        )}

        {/* ── RESULTS ───────────────────────────────────────── */}
        {phase === "results" && result && (
          <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

            {/* Header with palette preview */}
            <div className="relative" style={{ background: "#0C0B09" }}>
              {/* Color strip from palette */}
              <div className="flex h-2">
                {result.palette_principale.map((s) => (
                  <div key={s.hex} className="flex-1" style={{ background: s.hex }} />
                ))}
              </div>
              <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
                <motion.p
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                  className="font-body text-[11px] uppercase tracking-[0.3em] text-white/30 mb-3">
                  Ton univers visuel
                </motion.p>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.7 }}
                  className="font-display text-4xl md:text-6xl text-white mb-4">
                  {result.univers_nom}
                </motion.h1>
                <motion.div
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                  className="flex flex-wrap gap-2 mt-5">
                  {result.direction_visuelle.mots_cles.map((k) => (
                    <span key={k} className="font-body text-xs font-medium px-3 py-1 rounded-full"
                      style={{ background: ACCENT_LIGHT, color: ACCENT, border: `1px solid ${ACCENT}30` }}>
                      {k}
                    </span>
                  ))}
                </motion.div>
              </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-14">

              {/* Palette principale */}
              <section>
                <h2 className="font-display text-2xl text-[#0C0B09] mb-6 flex items-center gap-2">
                  <Palette size={22} style={{ color: ACCENT }} /> Palette principale
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                  {result.palette_principale.map((s, i) => (
                    <motion.div key={s.hex}
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08, duration: 0.5 }}>
                      <SwatchCard swatch={s} />
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6">
                  <p className="font-body text-xs text-[#A8A29E] uppercase tracking-wider mb-3">Palette complémentaire</p>
                  <div className="grid grid-cols-3 sm:grid-cols-3 gap-3">
                    {result.palette_complementaire.map((s, i) => (
                      <motion.div key={s.hex}
                        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + i * 0.07 }}>
                        <SwatchCard swatch={s} size="sm" />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Direction visuelle */}
              <section>
                <h2 className="font-display text-2xl text-[#0C0B09] mb-6 flex items-center gap-2">
                  <Camera size={22} style={{ color: ACCENT }} /> Direction Visuelle
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="md:col-span-3 p-6 rounded-2xl"
                    style={{ background: ACCENT_LIGHT, border: `1px solid ${ACCENT}25` }}>
                    <p className="font-body text-[#0C0B09] leading-relaxed">{result.direction_visuelle.concept}</p>
                  </div>
                  {[
                    { label: "Éclairage", value: result.direction_visuelle.eclairage },
                    { label: "Composition", value: result.direction_visuelle.composition },
                    { label: "Textures", value: result.direction_visuelle.textures.join(" · ") },
                  ].map(({ label, value }) => (
                    <div key={label} className="p-5 rounded-2xl bg-white border border-[#E7E5E4]">
                      <p className="font-body text-xs font-semibold text-[#A8A29E] uppercase tracking-wider mb-2">{label}</p>
                      <p className="font-body text-sm text-[#44403C] leading-relaxed">{value}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Typographie */}
              <section>
                <h2 className="font-display text-2xl text-[#0C0B09] mb-6 flex items-center gap-2">
                  <Type size={22} style={{ color: ACCENT }} /> Typographie
                </h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  {[
                    { key: "titre", label: "Titres & Noms", data: result.typographie.titre },
                    { key: "corps", label: "Corps de texte", data: result.typographie.corps },
                  ].map(({ label, data }) => (
                    <div key={label} className="p-6 rounded-2xl bg-white border border-[#E7E5E4]">
                      <p className="font-body text-xs font-semibold text-[#A8A29E] uppercase tracking-wider mb-3">{label}</p>
                      <p className="font-body text-sm font-semibold text-[#0C0B09] mb-1">{data.style}</p>
                      <p className="font-body text-xs text-[#78716C] italic mb-4">{data.sensation}</p>
                      <div className="flex flex-wrap gap-2">
                        {data.exemples.map((e) => (
                          <span key={e} className="font-body text-xs px-2.5 py-1 rounded-lg bg-[#F5F5F4] text-[#44403C]">{e}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Références visuelles */}
              <section>
                <h2 className="font-display text-2xl text-[#0C0B09] mb-6 flex items-center gap-2">
                  <Film size={22} style={{ color: ACCENT }} /> Références Visuelles
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {result.references_visuelles.map(({ categorie, exemples }, i) => (
                    <motion.div key={categorie}
                      initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}
                      className="p-5 rounded-2xl bg-white border border-[#E7E5E4]">
                      <div className="flex items-center gap-2 mb-3">
                        <span style={{ color: ACCENT }}>{REF_ICONS[categorie]}</span>
                        <p className="font-body text-xs font-semibold text-[#0C0B09] uppercase tracking-wider">{categorie}</p>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        {exemples.map((e) => (
                          <div key={e} className="flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full shrink-0" style={{ background: ACCENT }} />
                            <span className="font-body text-sm text-[#44403C]">{e}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* Guide contenu */}
              <section>
                <h2 className="font-display text-2xl text-[#0C0B09] mb-6 flex items-center gap-2">
                  <LayoutGrid size={22} style={{ color: ACCENT }} /> Guide de Contenu
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {Object.entries(result.guide_contenu).map(([key, value], i) => (
                    <motion.div key={key}
                      initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                      className="p-5 rounded-2xl bg-white border border-[#E7E5E4]">
                      <div className="flex items-center gap-2 mb-3" style={{ color: ACCENT }}>
                        {GUIDE_ICONS[key]}
                        <p className="font-body text-xs font-semibold text-[#0C0B09] uppercase tracking-wider">
                          {GUIDE_LABELS[key]}
                        </p>
                      </div>
                      <p className="font-body text-sm text-[#44403C] leading-relaxed">{value}</p>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* Do & Don't */}
              <section>
                <h2 className="font-display text-2xl text-[#0C0B09] mb-6">À Faire & À Éviter</h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="p-6 rounded-2xl" style={{ background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.2)" }}>
                    <p className="font-body text-xs font-semibold text-[#10B981] uppercase tracking-wider mb-4">À FAIRE ✓</p>
                    <ul className="space-y-3">
                      {result.do_dont.faire.map((f) => (
                        <li key={f} className="flex items-start gap-2.5">
                          <CheckCircle2 size={15} className="text-[#10B981] shrink-0 mt-0.5" />
                          <span className="font-body text-sm text-[#44403C]">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-6 rounded-2xl" style={{ background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.15)" }}>
                    <p className="font-body text-xs font-semibold text-red-400 uppercase tracking-wider mb-4">À ÉVITER ✗</p>
                    <ul className="space-y-3">
                      {result.do_dont.eviter.map((e) => (
                        <li key={e} className="flex items-start gap-2.5">
                          <div className="w-3.5 h-3.5 rounded-full border-2 border-red-300 shrink-0 mt-0.5 flex items-center justify-center">
                            <div className="w-1 h-1 rounded-full bg-red-300" />
                          </div>
                          <span className="font-body text-sm text-[#44403C]">{e}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              {/* Message créatif */}
              <section>
                <div className="rounded-2xl p-8 text-center"
                  style={{ background: `linear-gradient(135deg, ${ACCENT}10, ${ACCENT}05)`, border: `1px solid ${ACCENT}20` }}>
                  <Sparkles size={28} style={{ color: ACCENT }} className="mx-auto mb-4" />
                  <p className="font-display text-xl text-[#0C0B09] mb-3">Message de ton directeur artistique IA</p>
                  <p className="font-body text-[#44403C] leading-relaxed max-w-2xl mx-auto italic">
                    &ldquo;{result.message_creatif}&rdquo;
                  </p>
                </div>
              </section>

              {/* CTA */}
              <section className="rounded-2xl p-8 text-center" style={{ background: "#0C0B09" }}>
                <h2 className="font-display text-2xl text-white mb-3">
                  Prêt à donner vie à cet univers <span style={{ color: ACCENT }}>visuellement ?</span>
                </h2>
                <p className="font-body text-white/50 text-sm mb-6 max-w-xl mx-auto">
                  Notre équipe de direction artistique peut créer tous tes visuels en accord avec ce moodboard — photos, clips, identité digitale.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full font-body font-semibold text-sm text-white"
                    style={{ background: ACCENT }}>
                    Concrétiser mon univers <ChevronRight size={16} />
                  </a>
                  <button onClick={() => { setPhase("form"); setStep(0); }}
                    className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full font-body font-semibold text-sm text-white/50 hover:text-white transition-colors border border-white/10">
                    Nouveau moodboard
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
