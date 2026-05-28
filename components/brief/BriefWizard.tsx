"use client";

import { useReducer, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, MessageCircle, Sparkles, CheckCircle2 } from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────
const PROJETS = [
  { id: "site-web",    emoji: "🌐", title: "Site web",       desc: "Vitrine, e-commerce, app" },
  { id: "photo-video", emoji: "📸", title: "Photo / Vidéo",  desc: "Shooting, événement, clips" },
  { id: "reseaux",     emoji: "📱", title: "Réseaux sociaux",desc: "Gestion, contenu, ads" },
  { id: "artiste",     emoji: "🎵", title: "Artiste",        desc: "EPK, sortie, promo musicale" },
  { id: "evenement",   emoji: "🎪", title: "Événement",      desc: "Concert, festival, conférence" },
  { id: "branding",    emoji: "✨", title: "Branding",       desc: "Logo, identité, charte graphique" },
];

const BUDGETS = [
  { id: "moins-200k",  label: "Moins de 200k",  sub: "FCFA",  color: "#22c55e" },
  { id: "200k-500k",   label: "200k — 500k",    sub: "FCFA",  color: "#C8A84B" },
  { id: "500k-1500k",  label: "500k — 1,5M",    sub: "FCFA",  color: "#6B21A8" },
  { id: "plus-1500k",  label: "Plus de 1,5M",   sub: "FCFA",  color: "#0ea5e9" },
];

const DELAIS = [
  { id: "urgent",     emoji: "⚡", label: "Urgent",      desc: "Moins d'un mois" },
  { id: "normal",     emoji: "📅", label: "Normal",      desc: "1 à 3 mois" },
  { id: "tranquille", emoji: "🌱", label: "Pas pressé",  desc: "3 mois et plus" },
  { id: "indefini",   emoji: "🤝", label: "À définir",   desc: "On en parle ensemble" },
];

const PROJET_LABELS: Record<string, string> = {
  "site-web": "Site web / Application", "photo-video": "Photo / Vidéo",
  "reseaux": "Réseaux sociaux", "artiste": "Artiste / Musique",
  "evenement": "Événement", "branding": "Branding / Identité visuelle",
};

const BUDGET_LABELS: Record<string, string> = {
  "moins-200k": "Moins de 200 000 FCFA", "200k-500k": "200 000 — 500 000 FCFA",
  "500k-1500k": "500 000 — 1 500 000 FCFA", "plus-1500k": "Plus de 1 500 000 FCFA",
};

const DELAI_LABELS: Record<string, string> = {
  "urgent": "Urgent — < 1 mois", "normal": "Normal — 1 à 3 mois",
  "tranquille": "Pas pressé — 3 mois+", "indefini": "À définir ensemble",
};

// ─── State machine ─────────────────────────────────────────────────────────────
type Step = 1 | 2 | 3 | 4 | "success";

interface State {
  step: Step;
  projet: string;
  budget: string;
  delai: string;
  waUrl: string;
  submitting: boolean;
  error: string | null;
  dir: 1 | -1;
}

type Action =
  | { type: "SET_PROJET"; v: string }
  | { type: "SET_BUDGET"; v: string }
  | { type: "SET_DELAI"; v: string }
  | { type: "NEXT" }
  | { type: "PREV" }
  | { type: "SUBMITTING" }
  | { type: "SUCCESS"; waUrl: string }
  | { type: "ERROR"; msg: string };

const init: State = { step: 1, projet: "", budget: "", delai: "", waUrl: "", submitting: false, error: null, dir: 1 };

function reducer(s: State, a: Action): State {
  switch (a.type) {
    case "SET_PROJET": return { ...s, projet: a.v };
    case "SET_BUDGET": return { ...s, budget: a.v };
    case "SET_DELAI":  return { ...s, delai: a.v };
    case "NEXT":       return { ...s, step: ((s.step as number) + 1) as Step, dir: 1 };
    case "PREV":       return { ...s, step: ((s.step as number) - 1) as Step, dir: -1 };
    case "SUBMITTING": return { ...s, submitting: true, error: null };
    case "SUCCESS":    return { ...s, step: "success", submitting: false, waUrl: a.waUrl };
    case "ERROR":      return { ...s, submitting: false, error: a.msg };
    default:           return s;
  }
}

// ─── Slide variants ────────────────────────────────────────────────────────────
const slide = {
  enter:  (d: number) => ({ x: d > 0 ? 70 : -70, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:   (d: number) => ({ x: d > 0 ? -70 : 70, opacity: 0 }),
};
const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ─── Component ─────────────────────────────────────────────────────────────────
export default function BriefWizard() {
  const [s, dispatch] = useReducer(reducer, init);
  const autoTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const autoAdvance = useCallback((delay = 350) => {
    if (autoTimer.current) clearTimeout(autoTimer.current);
    autoTimer.current = setTimeout(() => dispatch({ type: "NEXT" }), delay);
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const prenom   = fd.get("prenom") as string;
    const whatsapp = fd.get("whatsapp") as string;
    const email    = (fd.get("email") as string) || undefined;

    // Build WhatsApp deep link immediately (no API dependency)
    const msg = [
      `Bonjour KEKELI Creative Agency ! 👋`,
      ``,
      `Je viens de remplir un brief express.`,
      ``,
      `📋 Projet : ${PROJET_LABELS[s.projet] ?? s.projet}`,
      `💰 Budget : ${BUDGET_LABELS[s.budget] ?? s.budget}`,
      `⏱️ Délai : ${DELAI_LABELS[s.delai] ?? s.delai}`,
      ``,
      `Mon prénom : ${prenom}`,
    ].join("\n");
    const waUrl = `https://wa.me/221781672819?text=${encodeURIComponent(msg)}`;

    dispatch({ type: "SUBMITTING" });

    // Fire email (non-blocking — success regardless)
    fetch("/api/brief", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ projet: s.projet, budget: s.budget, delai: s.delai, prenom, whatsapp, email }),
    }).catch(() => {});

    dispatch({ type: "SUCCESS", waUrl });
  }, [s.projet, s.budget, s.delai]);

  const stepNum = s.step === "success" ? 4 : s.step as number;

  return (
    <div className="relative min-h-[calc(100vh-80px)] flex flex-col">

      {/* Progress bar */}
      {s.step !== "success" && (
        <div className="w-full h-1 bg-[#E5E7EB]">
          <motion.div
            className="h-full bg-gradient-to-r from-[#C8A84B] to-[#6B21A8] rounded-full"
            animate={{ width: `${(stepNum / 4) * 100}%` }}
            transition={{ duration: 0.5, ease }}
          />
        </div>
      )}

      {/* Step label */}
      {s.step !== "success" && (
        <div className="text-center pt-8 pb-2">
          <span className="text-xs text-[#9CA3AF] uppercase tracking-widest">
            Étape {stepNum} sur 4
          </span>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 flex items-start justify-center px-4 pb-16 pt-6 overflow-hidden">
        <AnimatePresence mode="wait" custom={s.dir}>
          {s.step === 1 && (
            <Step1
              key="s1"
              dir={s.dir}
              selected={s.projet}
              onSelect={(v) => {
                dispatch({ type: "SET_PROJET", v });
                autoAdvance(400);
              }}
              onNext={() => dispatch({ type: "NEXT" })}
            />
          )}
          {s.step === 2 && (
            <Step2
              key="s2"
              dir={s.dir}
              selected={s.budget}
              onSelect={(v) => {
                dispatch({ type: "SET_BUDGET", v });
                autoAdvance(350);
              }}
              onPrev={() => dispatch({ type: "PREV" })}
            />
          )}
          {s.step === 3 && (
            <Step3
              key="s3"
              dir={s.dir}
              selected={s.delai}
              onSelect={(v) => {
                dispatch({ type: "SET_DELAI", v });
                autoAdvance(350);
              }}
              onPrev={() => dispatch({ type: "PREV" })}
            />
          )}
          {s.step === 4 && (
            <Step4
              key="s4"
              dir={s.dir}
              projet={s.projet}
              budget={s.budget}
              delai={s.delai}
              submitting={s.submitting}
              error={s.error}
              onSubmit={handleSubmit}
              onPrev={() => dispatch({ type: "PREV" })}
            />
          )}
          {s.step === "success" && (
            <StepSuccess key="success" waUrl={s.waUrl} dir={s.dir} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── Step 1 — Type de projet ──────────────────────────────────────────────────
function Step1({ dir, selected, onSelect, onNext }: {
  dir: number; selected: string;
  onSelect: (v: string) => void;
  onNext: () => void;
}) {
  return (
    <motion.div
      custom={dir} variants={slide} initial="enter" animate="center" exit="exit"
      transition={{ duration: 0.38, ease }}
      className="w-full max-w-2xl"
    >
      <h2 className="font-display text-3xl md:text-4xl text-[#0C0B09] text-center mb-2">
        Quel type de projet ?
      </h2>
      <p className="text-[#9CA3AF] text-center text-sm mb-8">Sélectionnez votre besoin principal</p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {PROJETS.map((p) => {
          const active = selected === p.id;
          return (
            <motion.button
              key={p.id}
              onClick={() => onSelect(p.id)}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={`relative flex flex-col items-center text-center p-5 rounded-2xl border-2 transition-all duration-150 ${
                active
                  ? "border-[#C8A84B] bg-[#C8A84B]/8 shadow-[0_0_20px_rgba(200,168,75,0.15)]"
                  : "border-[#E5E7EB] bg-white hover:border-[#C8A84B]/40"
              }`}
            >
              {active && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-2 right-2 w-5 h-5 bg-[#C8A84B] rounded-full flex items-center justify-center"
                >
                  <CheckCircle2 className="w-3 h-3 text-white" />
                </motion.div>
              )}
              <span className="text-4xl mb-3">{p.emoji}</span>
              <span className={`font-semibold text-sm ${active ? "text-[#0C0B09]" : "text-[#374151]"}`}>
                {p.title}
              </span>
              <span className="text-xs text-[#9CA3AF] mt-1 leading-tight">{p.desc}</span>
            </motion.button>
          );
        })}
      </div>

      {selected && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mt-6"
        >
          <button
            onClick={onNext}
            className="inline-flex items-center gap-2 bg-[#0C0B09] text-white px-7 py-3.5 rounded-xl font-semibold text-sm hover:bg-[#1c1917] transition-colors"
          >
            Suivant
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}

// ─── Step 2 — Budget ──────────────────────────────────────────────────────────
function Step2({ dir, selected, onSelect, onPrev }: {
  dir: number; selected: string;
  onSelect: (v: string) => void;
  onPrev: () => void;
}) {
  return (
    <motion.div
      custom={dir} variants={slide} initial="enter" animate="center" exit="exit"
      transition={{ duration: 0.38, ease }}
      className="w-full max-w-lg"
    >
      <h2 className="font-display text-3xl md:text-4xl text-[#0C0B09] text-center mb-2">
        Quel est votre budget ?
      </h2>
      <p className="text-[#9CA3AF] text-center text-sm mb-8">Aucun engagement — juste pour mieux vous orienter</p>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {BUDGETS.map((b) => {
          const active = selected === b.id;
          return (
            <motion.button
              key={b.id}
              onClick={() => onSelect(b.id)}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={`flex flex-col items-center justify-center py-6 px-4 rounded-2xl border-2 transition-all duration-150 ${
                active
                  ? "bg-[#0C0B09] border-[#0C0B09]"
                  : "bg-white border-[#E5E7EB] hover:border-[#C8A84B]/40"
              }`}
            >
              <span
                className={`text-xl font-bold mb-1 ${active ? "text-[#C8A84B]" : "text-[#0C0B09]"}`}
                style={{ color: active ? "#C8A84B" : b.color }}
              >
                {b.label}
              </span>
              <span className={`text-xs ${active ? "text-[#9CA3AF]" : "text-[#6B7280]"}`}>
                {b.sub}
              </span>
            </motion.button>
          );
        })}
      </div>

      <BackButton onClick={onPrev} />
    </motion.div>
  );
}

// ─── Step 3 — Délai ───────────────────────────────────────────────────────────
function Step3({ dir, selected, onSelect, onPrev }: {
  dir: number; selected: string;
  onSelect: (v: string) => void;
  onPrev: () => void;
}) {
  return (
    <motion.div
      custom={dir} variants={slide} initial="enter" animate="center" exit="exit"
      transition={{ duration: 0.38, ease }}
      className="w-full max-w-md"
    >
      <h2 className="font-display text-3xl md:text-4xl text-[#0C0B09] text-center mb-2">
        Quel est votre délai ?
      </h2>
      <p className="text-[#9CA3AF] text-center text-sm mb-8">Cela nous aide à planifier votre projet</p>

      <div className="space-y-3 mb-6">
        {DELAIS.map((d) => {
          const active = selected === d.id;
          return (
            <motion.button
              key={d.id}
              onClick={() => onSelect(d.id)}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.99 }}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl border-2 transition-all duration-150 ${
                active
                  ? "border-[#C8A84B] bg-[#C8A84B]/8"
                  : "border-[#E5E7EB] bg-white hover:border-[#C8A84B]/40"
              }`}
            >
              <span className="text-3xl flex-shrink-0">{d.emoji}</span>
              <div className="text-left">
                <p className={`font-semibold text-sm ${active ? "text-[#0C0B09]" : "text-[#374151]"}`}>
                  {d.label}
                </p>
                <p className="text-xs text-[#9CA3AF]">{d.desc}</p>
              </div>
              {active && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="ml-auto w-5 h-5 bg-[#C8A84B] rounded-full flex items-center justify-center flex-shrink-0"
                >
                  <CheckCircle2 className="w-3 h-3 text-white" />
                </motion.span>
              )}
            </motion.button>
          );
        })}
      </div>

      <BackButton onClick={onPrev} />
    </motion.div>
  );
}

// ─── Step 4 — Contact ─────────────────────────────────────────────────────────
function Step4({ dir, projet, budget, delai, submitting, error, onSubmit, onPrev }: {
  dir: number; projet: string; budget: string; delai: string;
  submitting: boolean; error: string | null;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onPrev: () => void;
}) {
  return (
    <motion.div
      custom={dir} variants={slide} initial="enter" animate="center" exit="exit"
      transition={{ duration: 0.38, ease }}
      className="w-full max-w-md"
    >
      <h2 className="font-display text-3xl md:text-4xl text-[#0C0B09] text-center mb-2">
        Dernière étape !
      </h2>
      <p className="text-[#9CA3AF] text-center text-sm mb-6">
        On vous envoie une estimation sur WhatsApp dans la minute
      </p>

      {/* Brief summary chips */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {[
          PROJET_LABELS[projet] ?? projet,
          BUDGET_LABELS[budget] ?? budget,
          DELAI_LABELS[delai] ?? delai,
        ].map((label) => (
          <span
            key={label}
            className="px-3 py-1 bg-[#C8A84B]/10 border border-[#C8A84B]/20 text-[#0C0B09] text-xs font-medium rounded-full"
          >
            {label}
          </span>
        ))}
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-[#374151] mb-1.5">Prénom *</label>
          <input
            name="prenom"
            required
            className="w-full px-4 py-3.5 rounded-xl border-2 border-[#E5E7EB] text-sm focus:outline-none focus:border-[#C8A84B] transition-colors"
            placeholder="Votre prénom"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-[#374151] mb-1.5">
            WhatsApp *
          </label>
          <input
            name="whatsapp"
            type="tel"
            required
            className="w-full px-4 py-3.5 rounded-xl border-2 border-[#E5E7EB] text-sm focus:outline-none focus:border-[#C8A84B] transition-colors"
            placeholder="+221 77 XXX XX XX"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-[#374151] mb-1.5">Email (optionnel)</label>
          <input
            name="email"
            type="email"
            className="w-full px-4 py-3.5 rounded-xl border-2 border-[#E5E7EB] text-sm focus:outline-none focus:border-[#C8A84B] transition-colors"
            placeholder="votre@email.com"
          />
        </div>

        {error && (
          <p className="text-sm text-red-500 bg-red-50 px-4 py-3 rounded-xl">{error}</p>
        )}

        <motion.button
          type="submit"
          disabled={submitting}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="w-full bg-[#25D366] text-white py-4 rounded-xl font-semibold text-base flex items-center justify-center gap-3 hover:bg-[#1ebe59] transition-colors disabled:opacity-60"
        >
          {submitting ? (
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <MessageCircle className="w-5 h-5" />
              Voir mon brief sur WhatsApp
            </>
          )}
        </motion.button>

        <p className="text-xs text-center text-[#9CA3AF]">
          Votre numéro ne sera utilisé que pour ce projet.
        </p>
      </form>

      <div className="mt-4">
        <BackButton onClick={onPrev} />
      </div>
    </motion.div>
  );
}

// ─── Success ──────────────────────────────────────────────────────────────────
function StepSuccess({ waUrl, dir }: { waUrl: string; dir: number }) {
  return (
    <motion.div
      custom={dir} variants={slide} initial="enter" animate="center" exit="exit"
      transition={{ duration: 0.5, ease }}
      className="w-full max-w-md text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
        className="w-20 h-20 bg-[#C8A84B] rounded-full flex items-center justify-center mx-auto mb-6"
      >
        <Sparkles className="w-10 h-10 text-white" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="font-display text-3xl text-[#0C0B09] mb-3"
      >
        Votre brief est prêt !
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-[#6B7280] mb-8 leading-relaxed"
      >
        Cliquez sur le bouton ci-dessous pour envoyer votre brief
        directement à notre équipe sur WhatsApp.
        <br />
        <strong className="text-[#0C0B09]">Réponse sous 30 minutes.</strong>
      </motion.p>

      <motion.a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-xl font-semibold text-base shadow-lg hover:bg-[#1ebe59] transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        Envoyer sur WhatsApp
      </motion.a>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-6 text-xs text-[#9CA3AF]"
      >
        Un email de récapitulatif a également été envoyé à notre équipe.
      </motion.p>
    </motion.div>
  );
}

// ─── Back button ──────────────────────────────────────────────────────────────
function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 text-sm text-[#9CA3AF] hover:text-[#374151] transition-colors mx-auto mt-2"
    >
      <ArrowLeft className="w-4 h-4" />
      Étape précédente
    </button>
  );
}
