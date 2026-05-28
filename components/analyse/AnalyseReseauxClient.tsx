"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

/* ───────────────────────────────────── constants */
const ACCENT = "#D946EF";
const DARK_BG = "linear-gradient(135deg, #08060F 0%, #130A28 35%, #1C0A40 60%, #0A0618 100%)";
const CREAM_BG = "linear-gradient(160deg, #FBF6EC 0%, #F5EDD8 50%, #FAF4E8 100%)";

/* ───────────────────────────────────── types */
interface FormData {
  nomArtiste: string;
  instagram: string; abonnesInstagram: string; frequenceInstagram: string;
  tiktok: string;    abonnesTiktok: string;    frequenceTiktok: string;
  youtube: string;   abonnesYoutube: string;   frequenceYoutube: string;
  photoProfil: string; bioOptimisee: string; lienBio: string;
  coherenceVisuelle: string; styleVisuel: string; typesContenu: string[];
  hashtags: string; reponseCommentaires: string; lives: string;
  collaborations: string; objectif: string; ameliorations: string[];
  meilleursPosts: string;
}

interface InfosWeb {
  recherche_effectuee: boolean;
  trouve_en_ligne: boolean;
  abonnes_verifies: Record<string, string | null>;
  meilleure_video?: {
    titre: string;
    vues: string;
    plateforme: string;
    date: string;
    pourquoi_viral: string;
  };
  derniere_sortie_musicale?: string | null;
  presence_digitale_score: "Forte" | "Modérée" | "Faible" | "Introuvable";
  insights_specifiques: string;
}

interface AnalysisResult {
  nom_artiste_confirme?: string;
  plateformes_analysees: string[];
  score_global: number;
  niveau: string;
  scores: Record<string, number>;
  points_forts: string[];
  points_ameliorer: string[];
  analyse_par_plateforme: Record<string, string>;
  plan_action_30_jours: { semaine: string; titre: string; actions: string[] }[];
  format_contenu_recommande: string[];
  conseils_hashtags: string[];
  message_motivation: string;
  infos_web?: InfosWeb;
}

type Phase = "intro" | "form" | "loading" | "results" | "error";

const SCORE_LABELS: Record<string, string> = {
  optimisation_profil:    "Optimisation du profil",
  coherence_visuelle:     "Cohérence visuelle",
  strategie_contenu:      "Stratégie de contenu",
  engagement_communaute:  "Engagement communauté",
  croissance_potentielle: "Potentiel de croissance",
};

const PLATFORM_ICONS: Record<string, string> = {
  Instagram: "📸", TikTok: "🎵", YouTube: "▶️",
};

const LOADING_STEPS = [
  "Recherche des données réelles en ligne...",
  "Analyse de la présence sur les réseaux...",
  "Évaluation de la cohérence visuelle...",
  "Calcul du score branding...",
  "Génération du plan d'action 30 jours...",
  "Personnalisation des recommandations...",
];

const initial: FormData = {
  nomArtiste: "",
  instagram: "", abonnesInstagram: "", frequenceInstagram: "",
  tiktok: "",    abonnesTiktok: "",    frequenceTiktok: "",
  youtube: "",   abonnesYoutube: "",   frequenceYoutube: "",
  photoProfil: "", bioOptimisee: "", lienBio: "",
  coherenceVisuelle: "", styleVisuel: "", typesContenu: [],
  hashtags: "", reponseCommentaires: "", lives: "",
  collaborations: "", objectif: "", ameliorations: [], meilleursPosts: "",
};

/* ───────────────────────────────────── ui primitives */
const iStyle = { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" };
const iCls = "w-full px-4 py-3 rounded-xl font-body text-sm text-white placeholder-white/30 outline-none focus:ring-1 focus:ring-fuchsia-400/50";

function Inp(p: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...p} className={`${iCls} ${p.className ?? ""}`} style={iStyle} />;
}
function Sel({ children, ...p }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select {...p} className={`${iCls} appearance-none pr-9`}
        style={{ ...iStyle, color: p.value ? "white" : "rgba(255,255,255,0.30)" }}>
        {children}
      </select>
      <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "rgba(255,255,255,0.35)" }} />
    </div>
  );
}
function Lbl({ children, hint }: { children: React.ReactNode; hint?: string }) {
  return (
    <div className="mb-2">
      <p className="font-body text-sm font-medium text-white">{children}</p>
      {hint && <p className="font-body text-xs mt-0.5" style={{ color: "rgba(217,70,239,0.55)" }}>{hint}</p>}
    </div>
  );
}
function Radio({ label, value, sel, onChange }: { label: string; value: string; sel: string; onChange: (v: string) => void }) {
  const active = sel === value;
  return (
    <button type="button" onClick={() => onChange(value)}
      className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-left transition-all font-body text-sm w-full"
      style={active ? { background: `${ACCENT}14`, border: `1.5px solid ${ACCENT}`, color: "white" }
        : { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.10)", color: "rgba(255,255,255,0.55)" }}>
      <span className="w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center"
        style={{ borderColor: active ? ACCENT : "rgba(255,255,255,0.30)" }}>
        {active && <span className="w-2 h-2 rounded-full" style={{ background: ACCENT }} />}
      </span>
      {label}
    </button>
  );
}
function Chip({ label, selected, onToggle }: { label: string; selected: boolean; onToggle: () => void }) {
  return (
    <button type="button" onClick={onToggle}
      className="px-3 py-1.5 rounded-full font-body text-xs font-medium transition-all"
      style={selected
        ? { background: `${ACCENT}20`, color: ACCENT, border: `1px solid ${ACCENT}` }
        : { background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.50)", border: "1px solid rgba(255,255,255,0.10)" }}>
      {label}
    </button>
  );
}

const abonnesOptions = ["0 – 500", "500 – 2 000", "2 000 – 10 000", "10 000 – 50 000", "50 000 – 200 000", "200 000+"];
const freqOptions    = ["Rarement (< 1×/sem)", "1-2× par semaine", "3-4× par semaine", "Quotidien"];
const typesContenuOptions = ["Clips / extraits musicaux", "Reels / TikTok dansés", "Behind the scenes", "Promo de sorties", "Vie quotidienne", "Collaborations", "Lives / Q&A", "Humour / sketches", "Réactions / trends"];
const ameliorationOptions = ["Augmenter mes abonnés", "Améliorer mon engagement", "Créer une vraie identité visuelle", "Publier plus régulièrement", "Trouver ma ligne éditoriale", "Mieux utiliser les hashtags", "Faire croître ma communauté Afrique", "Cibler la diaspora"];

/* ───────────────────────────────────── score helpers */
function scoreColor(s: number) {
  if (s >= 70) return "#10B981";
  if (s >= 50) return ACCENT;
  if (s >= 30) return "#F97316";
  return "#EF4444";
}
function AnimatedCounter({ target }: { target: number }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / 1500, 1);
      setVal(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target]);
  return <>{val}</>;
}

/* ───────────────────────────────────── main component */
export default function AnalyseReseauxClient() {
  const [phase, setPhase]       = useState<Phase>("intro");
  const [step, setStep]         = useState(1);
  const [dir, setDir]           = useState(1);
  const [form, setForm]         = useState<FormData>(initial);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [errMsg, setErrMsg]     = useState("");
  const topRef = useRef<HTMLDivElement>(null);

  const set = <K extends keyof FormData>(k: K, v: FormData[K]) => setForm((f) => ({ ...f, [k]: v }));
  const toggleArr = (key: keyof FormData, val: string) =>
    setForm((f) => { const a = f[key] as string[]; return { ...f, [key]: a.includes(val) ? a.filter((x) => x !== val) : [...a, val] }; });

  const hasAny = !!(form.instagram || form.tiktok || form.youtube);
  const canNext = () => {
    if (step === 1) return !!(form.nomArtiste.trim()) && hasAny;
    if (step === 2) return !!(form.photoProfil && form.coherenceVisuelle);
    return true;
  };

  const go = (n: number) => { setDir(n > step ? 1 : -1); setStep(n); };

  const handleSubmit = async () => {
    setPhase("loading");
    try {
      const res = await fetch("/api/analyse-reseaux", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: form }),
      });
      if (!res.ok) throw new Error();
      const json = await res.json();
      if (!json.analysis) throw new Error();
      setAnalysis(json.analysis);
      setPhase("results");
      setTimeout(() => topRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    } catch {
      setErrMsg("Erreur d'analyse. Vérifiez votre connexion et réessayez.");
      setPhase("error");
    }
  };

  const slideVariants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 32 : -32 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -32 : 32 }),
  };

  return (
    <div style={{ background: DARK_BG }} className="min-h-screen" ref={topRef}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 pt-24">
        <AnimatePresence mode="wait">

          {/* ── INTRO ── */}
          {phase === "intro" && (
            <motion.div key="intro" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -24 }} transition={{ duration: 0.4 }}>
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-body text-xs font-semibold mb-6"
                  style={{ background: `${ACCENT}18`, color: ACCENT, border: `1px solid ${ACCENT}30` }}>
                  <span>📊</span> IA Analyse Réseaux Sociaux
                </div>
                <h1 className="font-display text-4xl sm:text-5xl text-white mb-4 leading-tight">
                  Votre branding en ligne<br />
                  <em className="not-italic" style={{ color: ACCENT }}>passé au scanner IA</em>
                </h1>
                <p className="font-body text-base text-white/55 max-w-lg mx-auto leading-relaxed">
                  Notre IA analyse votre présence sur Instagram, TikTok et YouTube — cohérence visuelle, stratégie contenu, engagement — et génère un plan 30 jours personnalisé.
                </p>
              </div>
              <div className="rounded-3xl p-6 mb-6" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: ACCENT }}>L&apos;analyse inclut</p>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { icon: "🎯", label: "Score branding global",         sub: "5 dimensions évaluées" },
                    { icon: "👁️", label: "Audit visuel & identité",        sub: "Cohérence, style, profil" },
                    { icon: "📈", label: "Stratégie de contenu",           sub: "Formats, fréquence, hashtags" },
                    { icon: "🤝", label: "Engagement & communauté",        sub: "Interactions, lives, collabs" },
                    { icon: "🗓️", label: "Plan d'action 30 jours",        sub: "4 semaines, semaine par semaine" },
                    { icon: "💡", label: "Recommandations par plateforme", sub: "Instagram, TikTok, YouTube" },
                  ].map(({ icon, label, sub }) => (
                    <div key={label} className="flex items-center gap-3">
                      <span className="text-xl shrink-0">{icon}</span>
                      <div>
                        <p className="font-body text-sm font-semibold text-white">{label}</p>
                        <p className="font-body text-xs text-white/40">{sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <button onClick={() => { setPhase("form"); setStep(1); }}
                className="w-full py-4 rounded-2xl font-body font-bold text-base text-white transition-all hover:scale-[1.02]"
                style={{ background: `linear-gradient(135deg, ${ACCENT} 0%, #A21CAF 100%)`, boxShadow: `0 8px 30px ${ACCENT}40` }}>
                Analyser mes réseaux gratuitement →
              </button>
              <p className="text-center font-body text-xs mt-3" style={{ color: "rgba(255,255,255,0.25)" }}>
                100% gratuit · 3 minutes · Sans engagement
              </p>
            </motion.div>
          )}

          {/* ── FORM ── */}
          {phase === "form" && (
            <motion.div key="form" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -24 }} transition={{ duration: 0.3 }}>
              <div className="text-center mb-6">
                <button onClick={() => setPhase("intro")} className="font-body text-xs text-white/30 hover:text-white/50 transition-colors mb-4 block mx-auto">← Retour</button>
                <h2 className="font-display text-2xl text-white">Audit de vos réseaux</h2>
                <p className="font-body text-sm text-white/40 mt-1">Répondez honnêtement pour un audit précis</p>
              </div>

              {/* Progress */}
              <div className="mb-6">
                <div className="flex justify-between mb-1.5">
                  <span className="font-body text-xs font-medium" style={{ color: ACCENT }}>
                    {["Vos comptes", "Identité visuelle", "Stratégie & objectifs"][step - 1]}
                  </span>
                  <span className="font-body text-xs text-white/30">Étape {step}/3</span>
                </div>
                <div className="h-1 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }}>
                  <motion.div className="h-1 rounded-full"
                    style={{ background: `linear-gradient(90deg, ${ACCENT}, #A21CAF)` }}
                    animate={{ width: `${(step / 3) * 100}%` }}
                    transition={{ duration: 0.4 }} />
                </div>
              </div>

              <div className="rounded-3xl p-6 sm:p-8" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.10)" }}>
                <AnimatePresence mode="wait" custom={dir}>
                  <motion.div key={step} custom={dir} variants={slideVariants}
                    initial="enter" animate="center" exit="exit"
                    transition={{ duration: 0.25 }}>

                    {/* STEP 1 */}
                    {step === 1 && (
                      <div className="space-y-6">
                        <p className="font-body text-xs text-white/40">Renseigne ton nom d'artiste et tes comptes actifs. L'IA recherchera tes vraies données en ligne.</p>

                        {/* Nom d'artiste — used for web search */}
                        <div>
                          <Lbl hint="Utilisé pour rechercher tes vraies stats en ligne">Ton nom d&apos;artiste <span style={{ color: ACCENT }}>*</span></Lbl>
                          <Inp value={form.nomArtiste} onChange={(e) => set("nomArtiste", e.target.value)}
                            placeholder="Ex: Wally Seck, Viviane Chidid, Dip Doundou Guiss..." />
                        </div>

                        {/* Instagram */}
                        <div className="rounded-2xl p-4 space-y-3" style={{ background: "rgba(225,48,108,0.06)", border: "1px solid rgba(225,48,108,0.15)" }}>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-lg">📸</span>
                            <span className="font-body text-sm font-bold text-white">Instagram</span>
                          </div>
                          <Inp value={form.instagram} onChange={(e) => set("instagram", e.target.value)} placeholder="@ton_compte (sans le @)" />
                          {form.instagram && (
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <p className="font-body text-xs text-white/50 mb-1.5">Abonnés</p>
                                <Sel value={form.abonnesInstagram} onChange={(e) => set("abonnesInstagram", e.target.value)}>
                                  <option value="" disabled>Sélectionner</option>
                                  {abonnesOptions.map((o) => <option key={o} value={o} style={{ background: "#1C0A40" }}>{o}</option>)}
                                </Sel>
                              </div>
                              <div>
                                <p className="font-body text-xs text-white/50 mb-1.5">Fréquence</p>
                                <Sel value={form.frequenceInstagram} onChange={(e) => set("frequenceInstagram", e.target.value)}>
                                  <option value="" disabled>Sélectionner</option>
                                  {freqOptions.map((o) => <option key={o} value={o} style={{ background: "#1C0A40" }}>{o}</option>)}
                                </Sel>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* TikTok */}
                        <div className="rounded-2xl p-4 space-y-3" style={{ background: "rgba(105,201,208,0.06)", border: "1px solid rgba(105,201,208,0.15)" }}>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-lg">🎵</span>
                            <span className="font-body text-sm font-bold text-white">TikTok</span>
                          </div>
                          <Inp value={form.tiktok} onChange={(e) => set("tiktok", e.target.value)} placeholder="@ton_compte (sans le @)" />
                          {form.tiktok && (
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <p className="font-body text-xs text-white/50 mb-1.5">Abonnés</p>
                                <Sel value={form.abonnesTiktok} onChange={(e) => set("abonnesTiktok", e.target.value)}>
                                  <option value="" disabled>Sélectionner</option>
                                  {abonnesOptions.map((o) => <option key={o} value={o} style={{ background: "#1C0A40" }}>{o}</option>)}
                                </Sel>
                              </div>
                              <div>
                                <p className="font-body text-xs text-white/50 mb-1.5">Fréquence</p>
                                <Sel value={form.frequenceTiktok} onChange={(e) => set("frequenceTiktok", e.target.value)}>
                                  <option value="" disabled>Sélectionner</option>
                                  {freqOptions.map((o) => <option key={o} value={o} style={{ background: "#1C0A40" }}>{o}</option>)}
                                </Sel>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* YouTube */}
                        <div className="rounded-2xl p-4 space-y-3" style={{ background: "rgba(255,0,0,0.06)", border: "1px solid rgba(255,0,0,0.15)" }}>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-lg">▶️</span>
                            <span className="font-body text-sm font-bold text-white">YouTube</span>
                          </div>
                          <Inp value={form.youtube} onChange={(e) => set("youtube", e.target.value)} placeholder="Nom de ta chaîne" />
                          {form.youtube && (
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <p className="font-body text-xs text-white/50 mb-1.5">Abonnés</p>
                                <Sel value={form.abonnesYoutube} onChange={(e) => set("abonnesYoutube", e.target.value)}>
                                  <option value="" disabled>Sélectionner</option>
                                  {abonnesOptions.map((o) => <option key={o} value={o} style={{ background: "#1C0A40" }}>{o}</option>)}
                                </Sel>
                              </div>
                              <div>
                                <p className="font-body text-xs text-white/50 mb-1.5">Fréquence</p>
                                <Sel value={form.frequenceYoutube} onChange={(e) => set("frequenceYoutube", e.target.value)}>
                                  <option value="" disabled>Sélectionner</option>
                                  {freqOptions.map((o) => <option key={o} value={o} style={{ background: "#1C0A40" }}>{o}</option>)}
                                </Sel>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* STEP 2 */}
                    {step === 2 && (
                      <div className="space-y-5">
                        <div>
                          <Lbl>Photo de profil professionnelle ? <span style={{ color: ACCENT }}>*</span></Lbl>
                          <div className="grid grid-cols-3 gap-2">
                            {["Oui, pro", "Correct", "Non / Amateur"].map((v) => (
                              <Radio key={v} label={v} value={v} sel={form.photoProfil} onChange={(v) => set("photoProfil", v)} />
                            ))}
                          </div>
                        </div>
                        <div>
                          <Lbl>Bio optimisée et claire ?</Lbl>
                          <div className="grid grid-cols-3 gap-2">
                            {["Oui, complète", "Partielle", "Non / Vide"].map((v) => (
                              <Radio key={v} label={v} value={v} sel={form.bioOptimisee} onChange={(v) => set("bioOptimisee", v)} />
                            ))}
                          </div>
                        </div>
                        <div>
                          <Lbl>Lien actif dans ta bio ?</Lbl>
                          <div className="grid grid-cols-3 gap-2">
                            {["Oui (Linktree...)", "Oui (direct)", "Non"].map((v) => (
                              <Radio key={v} label={v} value={v} sel={form.lienBio} onChange={(v) => set("lienBio", v)} />
                            ))}
                          </div>
                        </div>
                        <div>
                          <Lbl>Cohérence visuelle entre tes posts <span style={{ color: ACCENT }}>*</span></Lbl>
                          <div className="grid grid-cols-2 gap-2">
                            {["Excellente", "Bonne", "Moyenne", "Faible / Nulle"].map((v) => (
                              <Radio key={v} label={v} value={v} sel={form.coherenceVisuelle} onChange={(v) => set("coherenceVisuelle", v)} />
                            ))}
                          </div>
                        </div>
                        <div>
                          <Lbl>Style visuel dominant de tes contenus</Lbl>
                          <div className="flex flex-wrap gap-2">
                            {["Noir & Blanc", "Couleurs vives", "Tons chauds", "Tons froids", "Minimaliste", "Afrocentrique", "Pas de style défini"].map((v) => (
                              <Chip key={v} label={v} selected={form.styleVisuel === v} onToggle={() => set("styleVisuel", form.styleVisuel === v ? "" : v)} />
                            ))}
                          </div>
                        </div>
                        <div>
                          <Lbl hint="Sélectionne tout ce que tu publies">Types de contenu que tu publies</Lbl>
                          <div className="flex flex-wrap gap-2">
                            {typesContenuOptions.map((v) => (
                              <Chip key={v} label={v} selected={form.typesContenu.includes(v)} onToggle={() => toggleArr("typesContenu", v)} />
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* STEP 3 */}
                    {step === 3 && (
                      <div className="space-y-5">
                        <div>
                          <Lbl>Tu utilises des hashtags ?</Lbl>
                          <div className="grid grid-cols-1 gap-2">
                            {["Oui, de manière stratégique", "Parfois, sans stratégie", "Rarement / Jamais"].map((v) => (
                              <Radio key={v} label={v} value={v} sel={form.hashtags} onChange={(v) => set("hashtags", v)} />
                            ))}
                          </div>
                        </div>
                        <div>
                          <Lbl>Tu réponds aux commentaires ?</Lbl>
                          <div className="grid grid-cols-3 gap-2">
                            {["Toujours", "Parfois", "Rarement"].map((v) => (
                              <Radio key={v} label={v} value={v} sel={form.reponseCommentaires} onChange={(v) => set("reponseCommentaires", v)} />
                            ))}
                          </div>
                        </div>
                        <div>
                          <Lbl>Tu fais des Lives ?</Lbl>
                          <div className="grid grid-cols-3 gap-2">
                            {["Régulièrement", "Parfois", "Jamais"].map((v) => (
                              <Radio key={v} label={v} value={v} sel={form.lives} onChange={(v) => set("lives", v)} />
                            ))}
                          </div>
                        </div>
                        <div>
                          <Lbl>Collaborations sur tes réseaux ?</Lbl>
                          <div className="grid grid-cols-3 gap-2">
                            {["Régulièrement", "Parfois", "Jamais"].map((v) => (
                              <Radio key={v} label={v} value={v} sel={form.collaborations} onChange={(v) => set("collaborations", v)} />
                            ))}
                          </div>
                        </div>
                        <div>
                          <Lbl>Ton objectif principal sur les réseaux</Lbl>
                          <div className="grid grid-cols-1 gap-2">
                            {["Augmenter mes abonnés rapidement", "Créer une communauté engagée", "Promouvoir mes sorties musicales", "Attirer des opportunités (features, booking)", "Toucher la diaspora africaine", "Rayonner en Afrique de l'Ouest"].map((v) => (
                              <Radio key={v} label={v} value={v} sel={form.objectif} onChange={(v) => set("objectif", v)} />
                            ))}
                          </div>
                        </div>
                        <div>
                          <Lbl hint="Sélectionne tes priorités">Ce que tu veux améliorer en priorité</Lbl>
                          <div className="flex flex-wrap gap-2">
                            {ameliorationOptions.map((v) => (
                              <Chip key={v} label={v} selected={form.ameliorations.includes(v)} onToggle={() => toggleArr("ameliorations", v)} />
                            ))}
                          </div>
                        </div>
                        <div>
                          <Lbl hint="Optionnel — aide l'IA à comprendre ce qui fonctionne pour toi">Décris 1-2 de tes posts qui ont le mieux marché</Lbl>
                          <textarea value={form.meilleursPosts} onChange={(e) => set("meilleursPosts", e.target.value)}
                            placeholder="Ex: Une photo de studio avec un filtre Mbalax a eu 3× plus d'engagement que d'habitude..."
                            rows={3} className={`${iCls} resize-none`} style={iStyle} />
                        </div>
                      </div>
                    )}

                  </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex gap-3 mt-8">
                  {step > 1 && (
                    <button onClick={() => go(step - 1)} type="button"
                      className="flex items-center gap-2 px-5 py-3 rounded-xl font-body text-sm font-medium text-white/60 hover:text-white transition-all"
                      style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)" }}>
                      <ChevronLeft size={15} /> Retour
                    </button>
                  )}
                  {step < 3 ? (
                    <button onClick={() => go(step + 1)} disabled={!canNext()} type="button"
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-body font-bold text-sm text-white transition-all disabled:opacity-40 hover:scale-[1.02]"
                      style={{ background: `linear-gradient(135deg, ${ACCENT}, #A21CAF)` }}>
                      <ChevronRight size={15} /> Continuer
                    </button>
                  ) : (
                    <button onClick={handleSubmit} disabled={!hasAny} type="button"
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-body font-bold text-sm text-white transition-all disabled:opacity-40 hover:scale-[1.02]"
                      style={{ background: `linear-gradient(135deg, ${ACCENT}, #A21CAF)` }}>
                      Générer mon audit →
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* ── LOADING ── */}
          {phase === "loading" && (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
              <div className="relative w-24 h-24 mx-auto mb-10">
                <svg viewBox="0 0 96 96" className="w-full h-full">
                  <circle cx="48" cy="48" r="40" fill="none" stroke={`${ACCENT}20`} strokeWidth="4" />
                  <motion.circle cx="48" cy="48" r="40" fill="none" stroke={ACCENT} strokeWidth="4"
                    strokeLinecap="round" strokeDasharray="50 201"
                    animate={{ rotate: [0, 360] }} transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                    style={{ transformOrigin: "48px 48px" }} />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-2xl">📊</div>
              </div>
              <h2 className="font-display text-2xl text-white mb-2">Analyse en cours</h2>
              <p className="font-body text-sm text-white/40 mb-8">Notre IA recherche tes données réelles et analyse ta présence...</p>
              <div className="text-left max-w-xs mx-auto space-y-3">
                {LOADING_STEPS.map((s, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.9, duration: 0.4 }}
                    className="flex items-center gap-3 font-body text-sm" style={{ color: "rgba(255,255,255,0.50)" }}>
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}
                      transition={{ delay: i * 0.9 + 0.3, type: "spring", stiffness: 300 }}
                      className="w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0"
                      style={{ background: `${ACCENT}20`, color: ACCENT }}>✓</motion.span>
                    {s}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── RESULTS ── */}
          {phase === "results" && analysis && (
            <motion.div key="results" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>

              {/* Score Hero */}
              <div className="rounded-3xl overflow-hidden mb-5" style={{ background: DARK_BG, border: `1px solid ${ACCENT}20` }}>
                <div className="px-6 pt-8 pb-4 text-center">
                  <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] mb-2" style={{ color: ACCENT }}>Audit Réseaux Sociaux</p>
                  {(analysis.nom_artiste_confirme || form.nomArtiste) && (
                    <h2 className="font-display text-2xl text-white mb-3">
                      {analysis.nom_artiste_confirme || form.nomArtiste}
                    </h2>
                  )}
                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    {analysis.plateformes_analysees.map((p) => (
                      <span key={p} className="px-3 py-1 rounded-full font-body text-xs font-medium text-white/70"
                        style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)" }}>
                        {PLATFORM_ICONS[p] ?? "📱"} {p}
                      </span>
                    ))}
                  </div>
                  {/* Circle */}
                  <div className="relative w-40 h-40 mx-auto mb-2">
                    <svg viewBox="0 0 160 160" className="w-full h-full -rotate-90">
                      <circle cx="80" cy="80" r="64" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="9" />
                      <motion.circle cx="80" cy="80" r="64" fill="none" stroke={ACCENT} strokeWidth="9"
                        strokeLinecap="round"
                        initial={{ strokeDasharray: `0 ${2 * Math.PI * 64}` }}
                        animate={{ strokeDasharray: `${(analysis.score_global / 100) * 2 * Math.PI * 64} ${2 * Math.PI * 64}` }}
                        transition={{ duration: 1.6, ease: "easeOut", delay: 0.3 }} />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="font-display text-4xl font-bold text-white"><AnimatedCounter target={analysis.score_global} /></span>
                      <span className="font-body text-xs text-white/40">/ 100</span>
                    </div>
                  </div>
                  <p className="font-body text-sm font-semibold" style={{ color: ACCENT }}>{analysis.niveau}</p>
                </div>
                {/* Score bars */}
                <div className="px-6 pb-8 space-y-3">
                  {Object.entries(analysis.scores).map(([key, val], i) => {
                    const color = scoreColor(val as number);
                    return (
                      <div key={key}>
                        <div className="flex justify-between mb-1">
                          <span className="font-body text-xs text-white/60">{SCORE_LABELS[key] ?? key}</span>
                          <span className="font-body text-xs font-bold" style={{ color }}>{val}</span>
                        </div>
                        <div className="h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                          <motion.div className="h-1.5 rounded-full"
                            style={{ background: `linear-gradient(90deg, ${color}80, ${color})` }}
                            initial={{ width: 0 }}
                            animate={{ width: `${val}%` }}
                            transition={{ duration: 0.9, ease: "easeOut", delay: 0.4 + i * 0.08 }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Infos web — real data found online */}
              {analysis.infos_web && (
                <div className="rounded-3xl overflow-hidden mb-5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="px-6 pt-5 pb-3">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-body text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: ACCENT }}>Données trouvées en ligne</p>
                      <span className="font-body text-xs px-2.5 py-1 rounded-full font-medium"
                        style={analysis.infos_web.presence_digitale_score === "Forte"
                          ? { background: "rgba(16,185,129,0.12)", color: "#10B981", border: "1px solid rgba(16,185,129,0.25)" }
                          : analysis.infos_web.presence_digitale_score === "Modérée"
                          ? { background: `${ACCENT}12`, color: ACCENT, border: `1px solid ${ACCENT}30` }
                          : analysis.infos_web.presence_digitale_score === "Faible"
                          ? { background: "rgba(249,115,22,0.12)", color: "#F97316", border: "1px solid rgba(249,115,22,0.25)" }
                          : { background: "rgba(239,68,68,0.12)", color: "#EF4444", border: "1px solid rgba(239,68,68,0.25)" }}>
                        {analysis.infos_web.presence_digitale_score === "Forte" ? "🌐 " : ""}
                        Présence {analysis.infos_web.presence_digitale_score}
                      </span>
                    </div>

                    {/* Verified follower counts */}
                    {analysis.infos_web.abonnes_verifies && Object.entries(analysis.infos_web.abonnes_verifies).some(([, v]) => v) && (
                      <div className="mt-4 mb-3">
                        <p className="font-body text-xs text-white/40 mb-2">Abonnés vérifiés</p>
                        <div className="flex flex-wrap gap-2">
                          {Object.entries(analysis.infos_web.abonnes_verifies).filter(([, v]) => v).map(([platform, count]) => (
                            <div key={platform} className="flex items-center gap-2 px-3 py-1.5 rounded-xl"
                              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)" }}>
                              <span className="text-sm">{PLATFORM_ICONS[platform] ?? "📱"}</span>
                              <div>
                                <p className="font-body text-xs font-bold text-white leading-none">{count}</p>
                                <p className="font-body text-[10px] text-white/35">{platform}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Best viral video */}
                    {analysis.infos_web.meilleure_video && (
                      <div className="mt-4 rounded-2xl p-4" style={{ background: `${ACCENT}0A`, border: `1px solid ${ACCENT}20` }}>
                        <p className="font-body text-xs font-semibold mb-2" style={{ color: ACCENT }}>
                          🔥 Meilleure vidéo — {analysis.infos_web.meilleure_video.plateforme}
                        </p>
                        <p className="font-body text-sm font-bold text-white leading-snug mb-1">
                          {analysis.infos_web.meilleure_video.titre}
                        </p>
                        <div className="flex items-center gap-3 mb-3">
                          <span className="font-body text-xs text-white/60">{analysis.infos_web.meilleure_video.vues}</span>
                          <span className="font-body text-[10px] text-white/30">·</span>
                          <span className="font-body text-xs text-white/40">{analysis.infos_web.meilleure_video.date}</span>
                        </div>
                        <p className="font-body text-xs text-white/65 leading-relaxed">
                          <span className="font-semibold text-white/80">Pourquoi ça a marché : </span>
                          {analysis.infos_web.meilleure_video.pourquoi_viral}
                        </p>
                      </div>
                    )}

                    {/* Last release + insights */}
                    <div className="mt-4 space-y-2">
                      {analysis.infos_web.derniere_sortie_musicale && (
                        <div className="flex items-start gap-2">
                          <span className="text-sm shrink-0">🎵</span>
                          <div>
                            <p className="font-body text-xs text-white/40">Dernière sortie</p>
                            <p className="font-body text-sm text-white/80">{analysis.infos_web.derniere_sortie_musicale}</p>
                          </div>
                        </div>
                      )}
                      {analysis.infos_web.insights_specifiques && (
                        <div className="flex items-start gap-2 mt-3 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                          <span className="text-sm shrink-0">💡</span>
                          <p className="font-body text-xs text-white/55 leading-relaxed">{analysis.infos_web.insights_specifiques}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Forces / Améliorer */}
              <div className="grid grid-cols-1 gap-4 mb-5">
                {[
                  { title: "✅ Ce qui fonctionne", items: analysis.points_forts, color: "#10B981", bg: "rgba(16,185,129,0.07)", border: "rgba(16,185,129,0.18)" },
                  { title: "⚠️ À améliorer en priorité", items: analysis.points_ameliorer, color: "#F97316", bg: "rgba(249,115,22,0.07)", border: "rgba(249,115,22,0.18)" },
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

              {/* Par plateforme */}
              {Object.entries(analysis.analyse_par_plateforme ?? {}).filter(([, v]) => v).length > 0 && (
                <div className="rounded-3xl overflow-hidden mb-5" style={{ background: CREAM_BG, border: "1px solid rgba(28,10,64,0.08)" }}>
                  <div className="px-6 pt-6 pb-4">
                    <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] mb-1" style={{ color: ACCENT }}>Par plateforme</p>
                    <h3 className="font-display text-xl text-[#1C0A40] mb-4">Analyse détaillée</h3>
                    <div className="space-y-4">
                      {Object.entries(analysis.analyse_par_plateforme).filter(([, v]) => v).map(([platform, text]) => (
                        <div key={platform} className="flex gap-3">
                          <span className="text-xl shrink-0 mt-0.5">{PLATFORM_ICONS[platform] ?? "📱"}</span>
                          <div>
                            <p className="font-body text-sm font-bold text-[#1C0A40] mb-1">{platform}</p>
                            <p className="font-body text-sm text-[#44403C] leading-relaxed">{text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Plan 30 jours */}
              <div className="rounded-3xl overflow-hidden mb-5" style={{ background: DARK_BG, border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="px-6 pt-6 pb-2">
                  <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] mb-1" style={{ color: ACCENT }}>Roadmap</p>
                  <h3 className="font-display text-xl text-white">Plan d&apos;action 30 jours</h3>
                </div>
                <div className="px-4 py-4 space-y-3">
                  {(analysis.plan_action_30_jours ?? []).map(({ semaine, titre, actions }, i) => (
                    <div key={i} className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="font-display text-2xl font-bold" style={{ color: `${ACCENT}50` }}>0{i + 1}</span>
                        <div>
                          <p className="font-body text-xs" style={{ color: `${ACCENT}80` }}>{semaine}</p>
                          <p className="font-body font-bold text-sm text-white">{titre}</p>
                        </div>
                      </div>
                      <ul className="space-y-1.5 ml-10">
                        {actions.map((a, j) => (
                          <li key={j} className="flex items-start gap-2 font-body text-xs text-white/60 leading-relaxed">
                            <span className="w-1 h-1 rounded-full mt-1.5 shrink-0" style={{ background: ACCENT }} />
                            {a}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Formats & Hashtags */}
              <div className="rounded-3xl overflow-hidden mb-5" style={{ background: CREAM_BG, border: "1px solid rgba(28,10,64,0.08)" }}>
                <div className="px-6 py-5 space-y-5">
                  {(analysis.format_contenu_recommande ?? []).length > 0 && (
                    <div>
                      <p className="font-body font-bold text-sm text-[#1C0A40] mb-3">🎬 Formats de contenu recommandés</p>
                      <div className="flex flex-wrap gap-2">
                        {analysis.format_contenu_recommande.map((f) => (
                          <span key={f} className="px-3 py-1.5 rounded-full font-body text-xs font-medium text-[#1C0A40]"
                            style={{ background: `${ACCENT}14`, border: `1px solid ${ACCENT}25` }}>{f}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  {(analysis.conseils_hashtags ?? []).length > 0 && (
                    <div>
                      <p className="font-body font-bold text-sm text-[#1C0A40] mb-3"># Hashtags suggérés</p>
                      <div className="flex flex-wrap gap-2">
                        {analysis.conseils_hashtags.map((h) => (
                          <span key={h} className="px-3 py-1.5 rounded-full font-body text-xs font-mono font-medium text-[#44403C]"
                            style={{ background: "rgba(28,10,64,0.06)", border: "1px solid rgba(28,10,64,0.10)" }}>{h}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Message motivation */}
              {analysis.message_motivation && (
                <div className="rounded-3xl p-6 mb-5" style={{ background: `${ACCENT}0E`, border: `1px solid ${ACCENT}25` }}>
                  <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: ACCENT }}>Message de l&apos;équipe KEKELI</p>
                  <p className="font-body text-sm text-white/80 leading-relaxed italic">&ldquo;{analysis.message_motivation}&rdquo;</p>
                </div>
              )}

              {/* CTA */}
              <div className="rounded-3xl p-6 text-center mb-4" style={{ background: "linear-gradient(135deg, #130A28, #1C0A40)", border: `1px solid ${ACCENT}25` }}>
                <p className="font-display text-lg text-white mb-2">Passer à l&apos;action maintenant ?</p>
                <p className="font-body text-sm text-white/50 mb-5">Notre équipe peut mettre en place votre stratégie social media complète.</p>
                <Link href="/artistes/strategie"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-body font-bold text-sm text-white transition-all hover:scale-[1.02] mr-3"
                  style={{ background: `linear-gradient(135deg, ${ACCENT}, #A21CAF)` }}>
                  Stratégie Digitale →
                </Link>
                <Link href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-body text-sm text-white/60 hover:text-white transition-colors"
                  style={{ border: "1px solid rgba(255,255,255,0.15)" }}>
                  Parler à un expert
                </Link>
              </div>

              <button onClick={() => { setAnalysis(null); setForm(initial); setStep(1); setPhase("intro"); }}
                className="w-full font-body text-xs text-white/30 hover:text-white/50 transition-colors py-2">
                ↺ Nouvelle analyse
              </button>
            </motion.div>
          )}

          {/* ── ERROR ── */}
          {phase === "error" && (
            <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
              <div className="text-5xl mb-4">⚠️</div>
              <h2 className="font-display text-2xl text-white mb-3">Erreur d&apos;analyse</h2>
              <p className="font-body text-sm text-white/50 mb-6 max-w-xs mx-auto">{errMsg}</p>
              <button onClick={() => setPhase("form")}
                className="px-6 py-3 rounded-xl font-body font-bold text-sm text-white"
                style={{ background: `linear-gradient(135deg, ${ACCENT}, #A21CAF)` }}>
                Réessayer
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
