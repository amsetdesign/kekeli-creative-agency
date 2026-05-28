"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight, ChevronLeft } from "lucide-react";

export interface WizardData {
  nomArtiste: string;
  genre: string;
  anneesActivite: string;
  niveauPercu: string;
  plateformes: string[];
  abonnes: string;
  frequencePublication: string;
  streamsMensuels: string;
  aLogo: string;
  aCharte: string;
  coherenceVisuelle: string;
  qualiteContenu: string;
  aPresenceWeb: string;
  sourcesRevenus: string[];
  sortiesParAn: string;
  strategieContenu: string;
  aBooking: string;
  collaborations: string;
  marchesGeographiques: string[];
  objectif12mois: string;
  blocages: string[];
  messageFree: string;
}

const GOLD = "#C8A84B";

const genres = ["Afrobeats", "Afropop", "Mbalax", "Rap / Hip-Hop", "R&B / Soul", "Gospel", "Reggae / Dancehall", "Amapiano", "Pop", "Jazz", "Autre"];
const plateformesOptions = ["Instagram", "TikTok", "YouTube", "Spotify", "Boomplay", "Facebook", "Twitter / X", "SoundCloud"];
const sourcesRevenusOptions = ["Concerts / Performances", "Streaming (Spotify, Boomplay...)", "Ventes musique (digital)", "Cachets studio", "Placements publicitaires", "Coaching / Cours", "Aucune source pour l'instant"];
const marchesOptions = ["Sénégal", "Côte d'Ivoire", "Mali / Burkina", "Toute l'Afrique de l'Ouest", "Toute l'Afrique", "Diaspora Europe", "Diaspora Amérique", "Marché international"];
const blocagesOptions = ["Budget limité", "Manque de réseau", "Visibilité insuffisante", "Pas de stratégie claire", "Contenu insuffisant", "Manque de temps", "Pas d'équipe", "Mauvais entourage"];

const inputStyle = { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.14)" };
const inputCls = "w-full px-4 py-3 rounded-xl font-body text-sm text-white placeholder-white/30 outline-none transition-colors focus:ring-1";
const focusRing = "focus:ring-[#C8A84B]/50";

function SelectInput({ value, onChange, children }: { value: string; onChange: (v: string) => void; children: React.ReactNode }) {
  return (
    <div className="relative">
      <select value={value} onChange={(e) => onChange(e.target.value)}
        className={`${inputCls} ${focusRing} appearance-none pr-9`}
        style={{ ...inputStyle, color: value ? "white" : "rgba(255,255,255,0.30)" }}>
        {children}
      </select>
      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "rgba(255,255,255,0.40)" }} />
    </div>
  );
}

function Radio({ label, value, selected, onChange }: { label: string; value: string; selected: string; onChange: (v: string) => void }) {
  const active = selected === value;
  return (
    <button type="button" onClick={() => onChange(value)}
      className="flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all font-body text-sm w-full"
      style={active
        ? { background: `${GOLD}18`, border: `1.5px solid ${GOLD}`, color: "white" }
        : { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.10)", color: "rgba(255,255,255,0.60)" }}>
      <span className="w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center"
        style={{ borderColor: active ? GOLD : "rgba(255,255,255,0.30)" }}>
        {active && <span className="w-2 h-2 rounded-full" style={{ background: GOLD }} />}
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
        ? { background: `${GOLD}20`, color: GOLD, border: `1px solid ${GOLD}` }
        : { background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.10)" }}>
      {label}
    </button>
  );
}

function FieldLabel({ children, hint }: { children: React.ReactNode; hint?: string }) {
  return (
    <div className="mb-2">
      <p className="font-body text-sm font-medium text-white">{children}</p>
      {hint && <p className="font-body text-xs mt-0.5" style={{ color: "rgba(200,168,75,0.60)" }}>{hint}</p>}
    </div>
  );
}

const TOTAL_STEPS = 5;

const stepTitles = [
  "Qui es-tu ?",
  "Ta présence digitale",
  "Branding & Image",
  "Stratégie & Business",
  "Vision & Ambition",
];

interface Props {
  onComplete: (data: WizardData) => void;
}

const initial: WizardData = {
  nomArtiste: "", genre: "", anneesActivite: "", niveauPercu: "",
  plateformes: [], abonnes: "", frequencePublication: "", streamsMensuels: "",
  aLogo: "", aCharte: "", coherenceVisuelle: "", qualiteContenu: "", aPresenceWeb: "",
  sourcesRevenus: [], sortiesParAn: "", strategieContenu: "", aBooking: "", collaborations: "",
  marchesGeographiques: [], objectif12mois: "", blocages: [], messageFree: "",
};

export default function VisionWizard({ onComplete }: Props) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<WizardData>(initial);
  const [direction, setDirection] = useState(1);

  const set = <K extends keyof WizardData>(k: K, v: WizardData[K]) => setData((d) => ({ ...d, [k]: v }));

  const toggleArr = (key: keyof WizardData, val: string) => {
    setData((d) => {
      const arr = d[key] as string[];
      return { ...d, [key]: arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val] };
    });
  };

  const canProceed = () => {
    if (step === 1) return !!(data.nomArtiste && data.genre && data.anneesActivite && data.niveauPercu);
    if (step === 2) return !!(data.plateformes.length > 0 && data.frequencePublication);
    if (step === 3) return !!(data.aLogo && data.coherenceVisuelle && data.qualiteContenu);
    if (step === 4) return !!(data.sourcesRevenus.length >= 0 && data.strategieContenu && data.aBooking);
    return true;
  };

  const go = (next: number) => {
    setDirection(next > step ? 1 : -1);
    setStep(next);
  };

  const handleNext = () => {
    if (step < TOTAL_STEPS) go(step + 1);
    else onComplete(data);
  };

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 32 : -32 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -32 : 32 }),
  };

  return (
    <div>
      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className="font-body text-xs font-medium" style={{ color: GOLD }}>
            Étape {step} / {TOTAL_STEPS} — {stepTitles[step - 1]}
          </span>
          <span className="font-body text-xs text-white/30">{Math.round((step / TOTAL_STEPS) * 100)}%</span>
        </div>
        <div className="h-1 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }}>
          <motion.div className="h-1 rounded-full" style={{ background: `linear-gradient(90deg, ${GOLD}, #F5D37A)` }}
            animate={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }} />
        </div>
      </div>

      {/* Step content */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div key={step} custom={direction} variants={variants}
          initial="enter" animate="center" exit="exit"
          transition={{ duration: 0.25, ease: "easeInOut" }}>

          {/* ── STEP 1: Profil ── */}
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <FieldLabel>Ton nom d&apos;artiste <span style={{ color: GOLD }}>*</span></FieldLabel>
                <input value={data.nomArtiste} onChange={(e) => set("nomArtiste", e.target.value)}
                  placeholder="Ex: Wally Seck, Tiakola, Aya Nakamura..."
                  className={`${inputCls} ${focusRing}`} style={inputStyle} />
              </div>
              <div>
                <FieldLabel>Ton genre musical <span style={{ color: GOLD }}>*</span></FieldLabel>
                <SelectInput value={data.genre} onChange={(v) => set("genre", v)}>
                  <option value="" disabled>Sélectionner ton genre</option>
                  {genres.map((g) => <option key={g} value={g} style={{ background: "#1C0A40" }}>{g}</option>)}
                </SelectInput>
              </div>
              <div>
                <FieldLabel>Depuis combien de temps es-tu actif ? <span style={{ color: GOLD }}>*</span></FieldLabel>
                <div className="grid grid-cols-2 gap-2">
                  {["Moins d'1 an", "1 à 3 ans", "3 à 5 ans", "5 ans et plus"].map((v) => (
                    <Radio key={v} label={v} value={v} selected={data.anneesActivite} onChange={(v) => set("anneesActivite", v)} />
                  ))}
                </div>
              </div>
              <div>
                <FieldLabel>Comment tu évalues ton niveau actuel ? <span style={{ color: GOLD }}>*</span></FieldLabel>
                <div className="grid grid-cols-2 gap-2">
                  {["Débutant", "Émergent", "Confirmé", "Établi"].map((v) => (
                    <Radio key={v} label={v} value={v} selected={data.niveauPercu} onChange={(v) => set("niveauPercu", v)} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 2: Présence digitale ── */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <FieldLabel hint="Sélectionne toutes tes plateformes actives">Tes plateformes actives <span style={{ color: GOLD }}>*</span></FieldLabel>
                <div className="flex flex-wrap gap-2">
                  {plateformesOptions.map((p) => (
                    <Chip key={p} label={p} selected={data.plateformes.includes(p)} onToggle={() => toggleArr("plateformes", p)} />
                  ))}
                </div>
              </div>
              <div>
                <FieldLabel>Nombre d&apos;abonnés sur ta plateforme principale</FieldLabel>
                <div className="grid grid-cols-2 gap-2">
                  {["Moins de 500", "500 – 2 000", "2 000 – 10 000", "10 000 – 50 000", "50 000 – 200 000", "Plus de 200 000"].map((v) => (
                    <Radio key={v} label={v} value={v} selected={data.abonnes} onChange={(v) => set("abonnes", v)} />
                  ))}
                </div>
              </div>
              <div>
                <FieldLabel>Fréquence de publication <span style={{ color: GOLD }}>*</span></FieldLabel>
                <div className="grid grid-cols-2 gap-2">
                  {["Rarement", "1-2× / semaine", "3-4× / semaine", "Quotidien"].map((v) => (
                    <Radio key={v} label={v} value={v} selected={data.frequencePublication} onChange={(v) => set("frequencePublication", v)} />
                  ))}
                </div>
              </div>
              <div>
                <FieldLabel>Streams mensuels (Spotify / Boomplay)</FieldLabel>
                <div className="grid grid-cols-2 gap-2">
                  {["Aucun / très peu", "Moins de 5 000", "5 000 – 50 000", "50 000 – 200 000", "Plus de 200 000"].map((v) => (
                    <Radio key={v} label={v} value={v} selected={data.streamsMensuels} onChange={(v) => set("streamsMensuels", v)} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 3: Branding ── */}
          {step === 3 && (
            <div className="space-y-5">
              <div>
                <FieldLabel>As-tu un logo professionnel ? <span style={{ color: GOLD }}>*</span></FieldLabel>
                <div className="grid grid-cols-3 gap-2">
                  {["Oui, pro", "Non", "En cours"].map((v) => (
                    <Radio key={v} label={v} value={v} selected={data.aLogo} onChange={(v) => set("aLogo", v)} />
                  ))}
                </div>
              </div>
              <div>
                <FieldLabel>As-tu une charte graphique ?</FieldLabel>
                <div className="grid grid-cols-3 gap-2">
                  {["Oui, complète", "Partielle", "Non"].map((v) => (
                    <Radio key={v} label={v} value={v} selected={data.aCharte} onChange={(v) => set("aCharte", v)} />
                  ))}
                </div>
              </div>
              <div>
                <FieldLabel>Cohérence visuelle sur tes réseaux <span style={{ color: GOLD }}>*</span></FieldLabel>
                <div className="grid grid-cols-2 gap-2">
                  {["Excellente", "Bonne", "Moyenne", "Faible / Nulle"].map((v) => (
                    <Radio key={v} label={v} value={v} selected={data.coherenceVisuelle} onChange={(v) => set("coherenceVisuelle", v)} />
                  ))}
                </div>
              </div>
              <div>
                <FieldLabel>Qualité de tes contenus visuels <span style={{ color: GOLD }}>*</span></FieldLabel>
                <div className="grid grid-cols-3 gap-2">
                  {["Professionnelle", "Correcte", "Amateur"].map((v) => (
                    <Radio key={v} label={v} value={v} selected={data.qualiteContenu} onChange={(v) => set("qualiteContenu", v)} />
                  ))}
                </div>
              </div>
              <div>
                <FieldLabel>EPK et / ou site web</FieldLabel>
                <div className="grid grid-cols-2 gap-2">
                  {["J'ai les deux", "Site web seulement", "EPK seulement", "Ni l'un ni l'autre"].map((v) => (
                    <Radio key={v} label={v} value={v} selected={data.aPresenceWeb} onChange={(v) => set("aPresenceWeb", v)} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 4: Stratégie ── */}
          {step === 4 && (
            <div className="space-y-5">
              <div>
                <FieldLabel hint="Sélectionne tout ce qui te rapporte actuellement">Tes sources de revenus actuelles</FieldLabel>
                <div className="flex flex-wrap gap-2">
                  {sourcesRevenusOptions.map((s) => (
                    <Chip key={s} label={s} selected={data.sourcesRevenus.includes(s)} onToggle={() => toggleArr("sourcesRevenus", s)} />
                  ))}
                </div>
              </div>
              <div>
                <FieldLabel>Sorties musicales par an</FieldLabel>
                <div className="grid grid-cols-3 gap-2">
                  {["Aucune", "1 par an", "2 à 3", "4 à 6", "6 et plus"].map((v) => (
                    <Radio key={v} label={v} value={v} selected={data.sortiesParAn} onChange={(v) => set("sortiesParAn", v)} />
                  ))}
                </div>
              </div>
              <div>
                <FieldLabel>Ta stratégie de contenu est... <span style={{ color: GOLD }}>*</span></FieldLabel>
                <div className="grid grid-cols-1 gap-2">
                  {["Définie et suivie régulièrement", "Vague, j'improvise souvent", "Je n'ai pas de stratégie"].map((v) => (
                    <Radio key={v} label={v} value={v} selected={data.strategieContenu} onChange={(v) => set("strategieContenu", v)} />
                  ))}
                </div>
              </div>
              <div>
                <FieldLabel>As-tu un booking manager ou un agent ? <span style={{ color: GOLD }}>*</span></FieldLabel>
                <div className="grid grid-cols-3 gap-2">
                  {["Oui", "Non", "En recherche"].map((v) => (
                    <Radio key={v} label={v} value={v} selected={data.aBooking} onChange={(v) => set("aBooking", v)} />
                  ))}
                </div>
              </div>
              <div>
                <FieldLabel>Collaborations avec d&apos;autres artistes</FieldLabel>
                <div className="grid grid-cols-3 gap-2">
                  {["Régulièrement", "Occasionnellement", "Jamais"].map((v) => (
                    <Radio key={v} label={v} value={v} selected={data.collaborations} onChange={(v) => set("collaborations", v)} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 5: Vision ── */}
          {step === 5 && (
            <div className="space-y-5">
              <div>
                <FieldLabel hint="Sélectionne tes marchés prioritaires">Marchés géographiques cibles</FieldLabel>
                <div className="flex flex-wrap gap-2">
                  {marchesOptions.map((m) => (
                    <Chip key={m} label={m} selected={data.marchesGeographiques.includes(m)} onToggle={() => toggleArr("marchesGeographiques", m)} />
                  ))}
                </div>
              </div>
              <div>
                <FieldLabel>Ton objectif principal dans 12 mois</FieldLabel>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    "Sortir un album ou EP marquant",
                    "Faire une tournée / multiplier les concerts",
                    "Atteindre 50k+ abonnés sur une plateforme",
                    "Vivre entièrement de ma musique",
                    "Signer avec un label ou une agence",
                    "Collaborer avec des artistes reconnus",
                  ].map((v) => (
                    <Radio key={v} label={v} value={v} selected={data.objectif12mois} onChange={(v) => set("objectif12mois", v)} />
                  ))}
                </div>
              </div>
              <div>
                <FieldLabel hint="Sélectionne les principaux obstacles">Ce qui te bloque le plus</FieldLabel>
                <div className="flex flex-wrap gap-2">
                  {blocagesOptions.map((b) => (
                    <Chip key={b} label={b} selected={data.blocages.includes(b)} onToggle={() => toggleArr("blocages", b)} />
                  ))}
                </div>
              </div>
              <div>
                <FieldLabel>Autre chose à partager ?</FieldLabel>
                <textarea value={data.messageFree} onChange={(e) => set("messageFree", e.target.value)}
                  placeholder="Contexte particulier, projet en cours, rêve ou ambition spécifique..."
                  rows={3} className={`${inputCls} ${focusRing} resize-none`} style={inputStyle} />
              </div>
            </div>
          )}

        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex gap-3 mt-8">
        {step > 1 && (
          <button onClick={() => go(step - 1)} type="button"
            className="flex items-center gap-2 px-5 py-3 rounded-xl font-body text-sm font-medium text-white/60 transition-all hover:text-white"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)" }}>
            <ChevronLeft size={16} /> Retour
          </button>
        )}
        <button onClick={handleNext} disabled={!canProceed()} type="button"
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-body font-bold text-sm text-black transition-all disabled:opacity-40 hover:scale-[1.02]"
          style={{ background: `linear-gradient(135deg, ${GOLD} 0%, #F5D37A 100%)` }}>
          {step === TOTAL_STEPS ? "Générer ma Vision de Carrière →" : (
            <><ChevronRight size={16} /> Continuer</>
          )}
        </button>
      </div>
    </div>
  );
}
