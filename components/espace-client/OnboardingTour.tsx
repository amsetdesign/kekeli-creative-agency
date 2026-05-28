"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, ChevronLeft, Check } from "lucide-react";

const STORAGE_KEY = "kekeli_onboarding_v3";
const GOLD = "#C8A84B";
const CARD_W = 300;
const CARD_H = 280; // approximate, used for positioning

/* ── Step definitions ─────────────────────────────────── */
interface Step {
  // desktop sidebar selector, or null for centered modal
  selector: string | null;
  // mobile fallback selector
  mobileSelector?: string | null;
  badge: string;
  badgeColor: string;
  title: string;
  description: string;
  // which side to prefer for the tooltip (auto-computed if not given)
  preferSide?: "right" | "bottom" | "top" | "left";
}

const STEPS: Step[] = [
  {
    selector: null,
    badge: "Bienvenue",
    badgeColor: GOLD,
    title: "Votre portail KEKELI",
    description: "Bienvenue dans votre espace personnel. Ce guide rapide vous présente chaque fonctionnalité — il ne prend que 2 minutes.",
    preferSide: "bottom",
  },
  {
    selector: '[data-tour="nav-dashboard"]',
    mobileSelector: '[data-tour="mob-dashboard"]',
    badge: "Tableau de bord",
    badgeColor: GOLD,
    title: "Votre accueil intelligent",
    description: "Retrouvez ici vos projets actifs, les messages non lus de l'équipe, et votre niveau artiste qui évolue en temps réel.",
    preferSide: "right",
  },
  {
    selector: '[data-tour="nav-projets"]',
    mobileSelector: '[data-tour="mob-projets"]',
    badge: "Mes Projets",
    badgeColor: "#10B981",
    title: "Suivi de vos projets",
    description: "Consultez la progression, les statuts et les mises à jour de chaque projet. Cliquez sur un projet pour voir les échanges et fichiers partagés.",
    preferSide: "right",
  },
  {
    selector: '[data-tour="nav-chat"]',
    mobileSelector: '[data-tour="mob-chat"]',
    badge: "KELI IA",
    badgeColor: "#8B5CF6",
    title: "Votre assistant IA",
    description: "KELI est notre IA dédiée aux artistes. Posez vos questions sur la stratégie musicale, le digital ou la carrière — disponible 24h/24.",
    preferSide: "right",
  },
  {
    selector: '[data-tour="nav-artiste"]',
    mobileSelector: '[data-tour="mob-artiste"]',
    badge: "Profil Artiste",
    badgeColor: "#8B5CF6",
    title: "Votre identité artistique",
    description: "Complétez votre profil pour des recommandations personnalisées. Votre niveau (Émergent → Rising → Pro → Elite) est attribué automatiquement selon vos actions réelles.",
    preferSide: "right",
  },
  {
    selector: '[data-tour="nav-vision"]',
    badge: "Outils IA",
    badgeColor: "#D946EF",
    title: "Vision & Analyse Réseaux",
    description: "Deux outils IA gratuits : la Vision de Carrière évalue votre score artistique global. L'Analyse Réseaux audite votre présence en ligne avec vos vraies données trouvées en temps réel.",
    preferSide: "right",
  },
  {
    selector: '[data-tour="new-project"]',
    badge: "Nouveau projet",
    badgeColor: GOLD,
    title: "Démarrez une collaboration",
    description: "Cliquez ici pour soumettre une demande de projet à l'équipe KEKELI. Précisez le type, votre délai et votre vision — on s'occupe du reste.",
    preferSide: "bottom",
  },
];

/* ── Rect hook ────────────────────────────────────────── */
function useTargetRect(step: Step) {
  const [rect, setRect] = useState<DOMRect | null>(null);

  const compute = useCallback(() => {
    const isMobile = window.innerWidth < 768;
    const sel = isMobile ? (step.mobileSelector ?? step.selector) : step.selector;
    if (!sel) { setRect(null); return; }
    const el = document.querySelector(sel);
    setRect(el ? el.getBoundingClientRect() : null);
  }, [step]);

  useEffect(() => {
    compute();
    window.addEventListener("resize", compute);
    window.addEventListener("scroll", compute, true);
    return () => {
      window.removeEventListener("resize", compute);
      window.removeEventListener("scroll", compute, true);
    };
  }, [compute]);

  return rect;
}

/* ── Tooltip positioning ──────────────────────────────── */
type Side = "right" | "left" | "bottom" | "top";

function getPlacement(rect: DOMRect, prefer?: Side): {
  style: React.CSSProperties;
  arrowSide: Side;
} {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const PAD = 12;

  const clampTop = (t: number) => Math.min(Math.max(PAD, t), vh - CARD_H - PAD);
  const clampLeft = (l: number) => Math.min(Math.max(PAD, l), vw - CARD_W - PAD);

  // RIGHT of element
  const canRight = rect.right + CARD_W + 24 < vw;
  // LEFT of element
  const canLeft = rect.left - CARD_W - 24 > 0;
  // BELOW element
  const canBottom = rect.bottom + CARD_H + 24 < vh;
  // ABOVE element
  const canTop = rect.top - CARD_H - 24 > 0;

  if ((prefer === "right" || !prefer) && canRight) {
    return {
      style: { left: rect.right + 16, top: clampTop(rect.top + rect.height / 2 - CARD_H / 2) },
      arrowSide: "left",
    };
  }
  if (prefer === "left" && canLeft) {
    return {
      style: { left: clampLeft(rect.left - CARD_W - 16), top: clampTop(rect.top + rect.height / 2 - CARD_H / 2) },
      arrowSide: "right",
    };
  }
  if ((prefer === "bottom" || !prefer) && canBottom) {
    return {
      style: { top: rect.bottom + 14, left: clampLeft(rect.left + rect.width / 2 - CARD_W / 2) },
      arrowSide: "top",
    };
  }
  if (canTop) {
    return {
      style: { top: clampTop(rect.top - CARD_H - 14), left: clampLeft(rect.left + rect.width / 2 - CARD_W / 2) },
      arrowSide: "bottom",
    };
  }
  // fallback: center
  return {
    style: { top: vh / 2 - CARD_H / 2, left: vw / 2 - CARD_W / 2 },
    arrowSide: "top",
  };
}

/* ── Arrow pointer ────────────────────────────────────── */
function Arrow({ side, color }: { side: Side; color: string }) {
  const SIZE = 8;
  const arrowStyle: Record<Side, React.CSSProperties> = {
    left:   { left: -SIZE, top: "50%", transform: "translateY(-50%)",  borderRight: `${SIZE}px solid ${color}`, borderTop: `${SIZE}px solid transparent`, borderBottom: `${SIZE}px solid transparent` },
    right:  { right: -SIZE, top: "50%", transform: "translateY(-50%)", borderLeft: `${SIZE}px solid ${color}`,  borderTop: `${SIZE}px solid transparent`, borderBottom: `${SIZE}px solid transparent` },
    top:    { top: -SIZE, left: "50%", transform: "translateX(-50%)",  borderBottom: `${SIZE}px solid ${color}`, borderLeft: `${SIZE}px solid transparent`, borderRight: `${SIZE}px solid transparent` },
    bottom: { bottom: -SIZE, left: "50%", transform: "translateX(-50%)", borderTop: `${SIZE}px solid ${color}`,    borderLeft: `${SIZE}px solid transparent`, borderRight: `${SIZE}px solid transparent` },
  };
  return <div className="absolute" style={{ width: 0, height: 0, ...arrowStyle[side] }} />;
}

/* ── Main component ───────────────────────────────────── */
export default function OnboardingTour() {
  const [visible, setVisible] = useState(false);
  const [step, setStep]       = useState(0);
  const [dir, setDir]         = useState(1);

  const current = STEPS[step];
  const rect    = useTargetRect(current);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      const t = setTimeout(() => setVisible(true), 700);
      return () => clearTimeout(t);
    }
  }, []);

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  }

  function next() {
    if (step === STEPS.length - 1) { dismiss(); return; }
    setDir(1);
    setStep((s) => s + 1);
  }

  function prev() {
    if (step === 0) return;
    setDir(-1);
    setStep((s) => s - 1);
  }

  // Compute tooltip placement
  const placement = rect
    ? getPlacement(rect, current.preferSide)
    : null;

  // Spotlight padding
  const PAD = 7;

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* ── Spotlight overlay ── */}
          {rect ? (
            // Punched-out spotlight using SVG mask
            <motion.svg
              key="spotlight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 w-full h-full pointer-events-none"
              style={{ zIndex: 8990 }}
            >
              <defs>
                <mask id="tour-spotlight-mask">
                  <rect x="0" y="0" width="100%" height="100%" fill="white" />
                  <rect
                    x={rect.left - PAD}
                    y={rect.top - PAD}
                    width={rect.width + PAD * 2}
                    height={rect.height + PAD * 2}
                    rx="10"
                    fill="black"
                  />
                </mask>
              </defs>
              <rect x="0" y="0" width="100%" height="100%"
                fill="rgba(12,11,9,0.82)" mask="url(#tour-spotlight-mask)" />

              {/* Glowing border around highlighted element */}
              <motion.rect
                x={rect.left - PAD}
                y={rect.top - PAD}
                width={rect.width + PAD * 2}
                height={rect.height + PAD * 2}
                rx="10"
                fill="none"
                stroke={current.badgeColor}
                strokeWidth="2"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.svg>
          ) : (
            // Solid overlay when no target
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 pointer-events-none"
              style={{ zIndex: 8990, background: "rgba(12,11,9,0.78)", backdropFilter: "blur(3px)" }}
            />
          )}

          {/* ── Tooltip card ── */}
          <motion.div
            key={`card-${step}`}
            ref={cardRef}
            custom={dir}
            initial={{ opacity: 0, scale: 0.95, x: dir > 0 ? 20 : -20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.95, x: dir > 0 ? -20 : 20 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed bg-white rounded-2xl shadow-2xl overflow-visible"
            style={{
              zIndex: 9000,
              width: CARD_W,
              border: `1.5px solid ${current.badgeColor}30`,
              // Centered when no target, or positioned near target
              ...(placement
                ? placement.style
                : { top: "50%", left: "50%", transform: "translate(-50%, -50%)" }
              ),
            }}
            // Block clicks from dismissing overlay
            onClick={(e) => e.stopPropagation()}
          >
            {/* Arrow pointer toward element */}
            {placement && (
              <Arrow side={placement.arrowSide} color="white" />
            )}

            {/* Dismiss */}
            <button onClick={dismiss}
              className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center"
              style={{ background: "rgba(0,0,0,0.07)", zIndex: 1 }}>
              <X size={11} className="text-[#78716C]" />
            </button>

            {/* Step dots */}
            <div className="flex justify-center gap-1.5 pt-4 pb-3">
              {STEPS.map((_, i) => (
                <button key={i}
                  onClick={() => { setDir(i > step ? 1 : -1); setStep(i); }}
                  className="rounded-full transition-all duration-200"
                  style={{
                    width: i === step ? 18 : 5,
                    height: 5,
                    background: i === step ? current.badgeColor : "rgba(0,0,0,0.12)",
                  }}
                />
              ))}
            </div>

            {/* Content */}
            <div className="px-5 pb-4">
              <span className="inline-block px-2 py-0.5 rounded-full font-body text-[10px] font-bold uppercase tracking-wider mb-2"
                style={{ background: `${current.badgeColor}15`, color: current.badgeColor }}>
                {current.badge}
              </span>
              <h3 className="font-display text-lg text-[#0C0B09] leading-snug mb-1.5">
                {current.title}
              </h3>
              <p className="font-body text-xs text-[#78716C] leading-relaxed">
                {current.description}
              </p>
            </div>

            {/* Navigation */}
            <div className="px-4 pb-4 flex items-center gap-2">
              {step > 0 ? (
                <button onClick={prev}
                  className="flex items-center gap-1 px-3 py-2 rounded-xl font-body text-xs font-medium text-[#78716C] hover:text-[#0C0B09] transition-colors"
                  style={{ background: "#F5F5F4", border: "1px solid #E7E5E4" }}>
                  <ChevronLeft size={12} /> Retour
                </button>
              ) : (
                <button onClick={dismiss}
                  className="font-body text-[11px] text-[#A8A29E] hover:text-[#78716C] transition-colors px-1">
                  Ignorer
                </button>
              )}

              <button onClick={next}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl font-body text-sm font-bold transition-all hover:scale-[1.02] active:scale-[0.98]"
                style={step === STEPS.length - 1
                  ? { background: `linear-gradient(135deg, ${GOLD}, #F5D37A)`, color: "#0C0B09" }
                  : { background: `linear-gradient(135deg, #0C0B09, #2A2522)`, color: "white" }
                }>
                {step === STEPS.length - 1
                  ? <><Check size={13} /> C&apos;est parti !</>
                  : <>Suivant <ChevronRight size={13} /></>
                }
              </button>
            </div>

            {/* Counter */}
            <p className="text-center font-body text-[10px] text-[#C2BDB8] pb-3 -mt-1">
              {step + 1} / {STEPS.length}
            </p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
