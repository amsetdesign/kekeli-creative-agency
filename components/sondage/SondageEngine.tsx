"use client";

import { useReducer, useCallback, useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe, Camera, Megaphone, Users, ShoppingBag, BarChart2, MapPin,
  Music, Monitor, Palette, TrendingUp, Star, CheckCircle2,
  ArrowRight, ArrowLeft, ChevronRight,
} from "lucide-react";
import type { SondageConfig, SondageQuestion, SondageReco, UserInfo } from "@/data/sondages/types";

// ─── Icon map ────────────────────────────────────────────────────────────────
const ICONS: Record<string, React.ElementType> = {
  Globe, Camera, Megaphone, Users, ShoppingBag, BarChart2, MapPin,
  Music, Monitor, Palette, TrendingUp, Star,
};

// ─── State machine ────────────────────────────────────────────────────────────
type Step = "intro" | "questions" | "email-capture" | "result";

interface EngineState {
  step: Step;
  currentQuestion: number;
  answers: Record<number, number | number[]>;
  score: number;
  userInfo: UserInfo | null;
  direction: 1 | -1;
  submitting: boolean;
  submitError: string | null;
}

type Action =
  | { type: "START" }
  | { type: "ANSWER_SINGLE"; questionId: number; index: number; autoAdvance: boolean }
  | { type: "ANSWER_MULTI"; questionId: number; index: number }
  | { type: "NEXT" }
  | { type: "PREV" }
  | { type: "FINISH_QUESTIONS"; score: number }
  | { type: "SUBMIT_EMAIL"; userInfo: UserInfo }
  | { type: "SUBMIT_START" }
  | { type: "SUBMIT_SUCCESS" }
  | { type: "SUBMIT_ERROR"; message: string };

const initialState: EngineState = {
  step: "intro",
  currentQuestion: 0,
  answers: {},
  score: 0,
  userInfo: null,
  direction: 1,
  submitting: false,
  submitError: null,
};

function calcScore(
  answers: Record<number, number | number[]>,
  questions: SondageQuestion[],
  maxScore: number
): number {
  let raw = 0;
  for (const q of questions) {
    const ans = answers[q.id];
    if (ans === undefined) continue;
    if (q.type === "single") {
      raw += q.points[ans as number] ?? 0;
    } else {
      for (const idx of ans as number[]) {
        raw += q.points[idx] ?? 0;
      }
    }
  }
  return Math.min(100, Math.round((raw / maxScore) * 100));
}

function reducer(state: EngineState, action: Action): EngineState {
  switch (action.type) {
    case "START":
      return { ...state, step: "questions", currentQuestion: 0, direction: 1 };

    case "ANSWER_SINGLE": {
      const newAnswers = { ...state.answers, [action.questionId]: action.index };
      if (action.autoAdvance) return { ...state, answers: newAnswers };
      return { ...state, answers: newAnswers };
    }

    case "ANSWER_MULTI": {
      const prev = (state.answers[action.questionId] as number[]) ?? [];
      const next = prev.includes(action.index)
        ? prev.filter((i) => i !== action.index)
        : [...prev, action.index];
      return { ...state, answers: { ...state.answers, [action.questionId]: next } };
    }

    case "NEXT":
      return { ...state, currentQuestion: state.currentQuestion + 1, direction: 1 };

    case "PREV":
      return {
        ...state,
        currentQuestion: Math.max(0, state.currentQuestion - 1),
        direction: -1,
      };

    case "FINISH_QUESTIONS":
      return { ...state, step: "email-capture", score: action.score, direction: 1 };

    case "SUBMIT_EMAIL":
      return { ...state, userInfo: action.userInfo };

    case "SUBMIT_START":
      return { ...state, submitting: true, submitError: null };

    case "SUBMIT_SUCCESS":
      return { ...state, step: "result", submitting: false };

    case "SUBMIT_ERROR":
      return { ...state, submitting: false, submitError: action.message };

    default:
      return state;
  }
}

// ─── Score level ──────────────────────────────────────────────────────────────
function getLevel(score: number) {
  if (score < 20) return { label: "Débutant", color: "#ef4444", desc: "Votre présence digitale est à construire from scratch." };
  if (score < 40) return { label: "En développement", color: "#f97316", desc: "Quelques bases existent, mais des lacunes importantes freinent votre visibilité." };
  if (score < 60) return { label: "Intermédiaire", color: "#eab308", desc: "Vous avez posé des fondations solides. L'heure est à l'optimisation." };
  if (score < 80) return { label: "Avancé", color: "#22c55e", desc: "Votre stratégie digitale est efficace. Passons au niveau supérieur." };
  return { label: "Expert", color: "#6B21A8", desc: "Bravo — vous maîtrisez votre présence digitale. Affinons ensemble la performance." };
}

// ─── Dynamic recommendations ─────────────────────────────────────────────────
function computeRelevance(
  reco: SondageReco,
  answers: Record<number, number | number[]>,
  questions: SondageQuestion[]
): number {
  if (!reco.relatedQuestions?.length) return 0;
  let totalWeakness = 0;
  let count = 0;
  for (const qId of reco.relatedQuestions) {
    const q = questions.find((q) => q.id === qId);
    if (!q) continue;
    const ans = answers[qId];
    if (ans === undefined) continue;
    const maxPoints = q.type === "multi"
      ? q.points.filter((p) => p > 0).reduce((a, b) => a + b, 0) || 1
      : Math.max(...q.points.filter((p) => p > 0), 1);
    const userPoints =
      q.type === "single"
        ? (q.points[ans as number] ?? 0)
        : (ans as number[]).reduce((sum, idx) => sum + (q.points[idx] ?? 0), 0);
    totalWeakness += 1 - Math.min(userPoints / maxPoints, 1);
    count++;
  }
  return count > 0 ? totalWeakness / count : 0;
}

// ─── Slide variants ───────────────────────────────────────────────────────────
const slide = {
  enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
};

// ─── Main component ───────────────────────────────────────────────────────────
export default function SondageEngine({ config }: { config: SondageConfig }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const autoAdvanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentQ = config.questions[state.currentQuestion];
  const isLastQuestion = state.currentQuestion === config.questions.length - 1;
  const currentAnswer = state.answers[currentQ?.id];

  const handleSingleAnswer = useCallback(
    (qId: number, index: number) => {
      dispatch({ type: "ANSWER_SINGLE", questionId: qId, index, autoAdvance: true });
      if (autoAdvanceTimer.current) clearTimeout(autoAdvanceTimer.current);
      autoAdvanceTimer.current = setTimeout(() => {
        if (isLastQuestion) {
          const score = calcScore(
            { ...state.answers, [qId]: index },
            config.questions,
            config.maxScore
          );
          dispatch({ type: "FINISH_QUESTIONS", score });
        } else {
          dispatch({ type: "NEXT" });
        }
      }, 350);
    },
    [isLastQuestion, state.answers, config.questions, config.maxScore]
  );

  const handleMultiNext = useCallback(() => {
    if (isLastQuestion) {
      const score = calcScore(state.answers, config.questions, config.maxScore);
      dispatch({ type: "FINISH_QUESTIONS", score });
    } else {
      dispatch({ type: "NEXT" });
    }
  }, [isLastQuestion, state.answers, config.questions, config.maxScore]);

  const handleEmailSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const fd = new FormData(e.currentTarget);
      const userInfo: UserInfo = {
        prenom: fd.get("prenom") as string,
        email: fd.get("email") as string,
        telephone: (fd.get("telephone") as string) || undefined,
        structure: (fd.get("structure") as string) || undefined,
      };
      dispatch({ type: "SUBMIT_EMAIL", userInfo });
      dispatch({ type: "SUBMIT_START" });

      try {
        const res = await fetch("/api/sondage", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: config.id,
            score: state.score,
            answers: state.answers,
            userInfo,
          }),
        });
        if (!res.ok) throw new Error("Erreur serveur");
        dispatch({ type: "SUBMIT_SUCCESS" });
      } catch {
        // API not yet implemented — still show results
        dispatch({ type: "SUBMIT_SUCCESS" });
      }
    },
    [config.id, state.score, state.answers]
  );

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <AnimatePresence mode="wait" custom={state.direction}>
        {state.step === "intro" && (
          <IntroView key="intro" config={config} onStart={() => dispatch({ type: "START" })} />
        )}
        {state.step === "questions" && currentQ && (
          <QuestionView
            key={`q-${state.currentQuestion}`}
            question={currentQ}
            questionIndex={state.currentQuestion}
            totalQuestions={config.questions.length}
            answer={currentAnswer}
            direction={state.direction}
            tone={config.tone}
            onSingleAnswer={handleSingleAnswer}
            onMultiToggle={(qId, idx) =>
              dispatch({ type: "ANSWER_MULTI", questionId: qId, index: idx })
            }
            onMultiNext={handleMultiNext}
            onPrev={() => dispatch({ type: "PREV" })}
            canGoBack={state.currentQuestion > 0}
          />
        )}
        {state.step === "email-capture" && (
          <EmailCaptureView
            key="email"
            score={state.score}
            config={config}
            answers={state.answers}
            onSubmit={handleEmailSubmit}
            submitting={state.submitting}
            error={state.submitError}
            direction={state.direction}
          />
        )}
        {state.step === "result" && state.userInfo && (
          <ResultView
            key="result"
            config={config}
            score={state.score}
            userInfo={state.userInfo}
            direction={state.direction}
            answers={state.answers}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Intro view ───────────────────────────────────────────────────────────────
function IntroView({ config, onStart }: { config: SondageConfig; onStart: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-4xl mx-auto px-6 py-20"
    >
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-block px-3 py-1 text-xs font-medium tracking-widest uppercase text-[#C8A84B] border border-[#C8A84B]/30 rounded-full mb-6">
            Audit gratuit
          </span>
          <h1 className="font-display text-4xl md:text-5xl text-[#0C0B09] leading-tight mb-4">
            {config.heroTitle}
          </h1>
          <p className="text-[#6B7280] text-lg mb-8 leading-relaxed">
            {config.heroSubtitle}
          </p>
          <ul className="space-y-3 mb-10">
            {[
              `${config.questions.length} questions — 3 minutes`,
              "Résultats immédiats + recommandations personnalisées",
              "Rapport PDF offert par email",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-[#374151]">
                <CheckCircle2 className="w-4 h-4 text-[#C8A84B] flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <motion.button
            onClick={onStart}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 bg-[#C8A84B] text-white px-8 py-4 rounded-xl font-semibold text-base hover:bg-[#b8963d] transition-colors"
          >
            Commencer l'audit
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>
        <div className="relative hidden md:block">
          <div className="aspect-[4/3] rounded-2xl overflow-hidden">
            <img
              src={config.image}
              alt={config.imageAlt}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-4 -left-4 bg-white rounded-xl p-4 shadow-lg">
            <p className="text-xs text-[#6B7280] mb-1">Profil</p>
            <p className="font-semibold text-[#0C0B09]">{config.title}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Question view ────────────────────────────────────────────────────────────
interface QuestionViewProps {
  question: SondageQuestion;
  questionIndex: number;
  totalQuestions: number;
  answer: number | number[] | undefined;
  direction: number;
  tone: "vous" | "tu";
  onSingleAnswer: (qId: number, idx: number) => void;
  onMultiToggle: (qId: number, idx: number) => void;
  onMultiNext: () => void;
  onPrev: () => void;
  canGoBack: boolean;
}

function QuestionView({
  question,
  questionIndex,
  totalQuestions,
  answer,
  direction,
  onSingleAnswer,
  onMultiToggle,
  onMultiNext,
  onPrev,
  canGoBack,
}: QuestionViewProps) {
  const progress = ((questionIndex + 1) / totalQuestions) * 100;
  const selectedMulti = (answer as number[]) ?? [];
  const isProfileQuestion = question.points.every((p) => p === 0);

  return (
    <motion.div
      custom={direction}
      variants={slide}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-2xl mx-auto px-6 py-16"
    >
      {/* Progress */}
      <div className="mb-10">
        <div className="flex items-center justify-between text-sm text-[#9CA3AF] mb-3">
          <span>
            Question {questionIndex + 1} / {totalQuestions}
          </span>
          {!isProfileQuestion && (
            <span className="text-[#C8A84B] font-medium">
              {Math.round(progress)}%
            </span>
          )}
        </div>
        <div className="h-1.5 bg-[#E5E7EB] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#C8A84B] to-[#6B21A8] rounded-full"
            initial={{ width: `${((questionIndex) / totalQuestions) * 100}%` }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Question text */}
      <h2 className="font-display text-2xl md:text-3xl text-[#0C0B09] mb-8 leading-snug">
        {question.text}
      </h2>

      {/* Options */}
      <div className="space-y-3">
        {question.options.map((option, idx) => {
          const isSelected =
            question.type === "single"
              ? answer === idx
              : selectedMulti.includes(idx);

          return (
            <motion.button
              key={idx}
              onClick={() =>
                question.type === "single"
                  ? onSingleAnswer(question.id, idx)
                  : onMultiToggle(question.id, idx)
              }
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.99 }}
              className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-150 flex items-center gap-4 ${
                isSelected
                  ? "border-[#C8A84B] bg-[#C8A84B]/8 text-[#0C0B09]"
                  : "border-[#E5E7EB] bg-white text-[#374151] hover:border-[#C8A84B]/50"
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
                  isSelected
                    ? "border-[#C8A84B] bg-[#C8A84B]"
                    : "border-[#D1D5DB]"
                }`}
              >
                {isSelected && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-2 h-2 bg-white rounded-full block"
                  />
                )}
              </span>
              <span className="text-sm md:text-base leading-snug">{option}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Multi-select continue button */}
      {question.type === "multi" && (
        <div className="mt-8 flex items-center gap-4">
          {canGoBack && (
            <button
              onClick={onPrev}
              className="flex items-center gap-2 text-sm text-[#9CA3AF] hover:text-[#374151] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour
            </button>
          )}
          <motion.button
            onClick={onMultiNext}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={selectedMulti.length === 0}
            className="ml-auto inline-flex items-center gap-2 bg-[#0C0B09] text-white px-6 py-3 rounded-xl font-medium text-sm disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
          >
            Continuer
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </div>
      )}

      {/* Single: back button */}
      {question.type === "single" && canGoBack && (
        <div className="mt-6">
          <button
            onClick={onPrev}
            className="flex items-center gap-2 text-sm text-[#9CA3AF] hover:text-[#374151] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour
          </button>
        </div>
      )}
    </motion.div>
  );
}

// ─── Email capture view ───────────────────────────────────────────────────────
interface EmailCaptureViewProps {
  score: number;
  config: SondageConfig;
  answers: Record<number, number | number[]>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  submitting: boolean;
  error: string | null;
  direction: number;
}

function EmailCaptureView({
  score,
  config,
  answers,
  onSubmit,
  submitting,
  error,
  direction,
}: EmailCaptureViewProps) {
  const level = getLevel(score);
  const circumference = 2 * Math.PI * 80;
  const offset = circumference * (1 - score / 100);
  const topReco = [...config.recommendations].sort(
    (a, b) => computeRelevance(b, answers, config.questions) - computeRelevance(a, answers, config.questions)
  )[0];

  return (
    <motion.div
      custom={direction}
      variants={slide}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-2xl mx-auto px-6 py-16"
    >
      <div className="text-center mb-10">
        <p className="text-sm text-[#9CA3AF] uppercase tracking-widest mb-6">
          Audit terminé
        </p>

        {/* Score circle — arc visible, score masqué */}
        <div className="relative inline-flex items-center justify-center mb-6">
          <svg width="200" height="200" className="-rotate-90">
            <circle cx="100" cy="100" r="80" fill="none" stroke="#E5E7EB" strokeWidth="10" />
            <motion.circle
              cx="100" cy="100" r="80" fill="none"
              stroke={level.color} strokeWidth="10" strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            />
          </svg>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            <div className="w-12 h-12 rounded-full flex items-center justify-center mb-1" style={{ background: `${level.color}20` }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={level.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
            <span className="text-xs text-[#9CA3AF] font-medium">Score masqué</span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-xl font-semibold mb-2" style={{ color: level.color }}>
            Niveau : {level.label}
          </p>
          <p className="text-[#6B7280] max-w-sm mx-auto text-sm">
            {level.desc}
          </p>
        </motion.div>
      </div>

      {/* Weakness teaser */}
      {topReco && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mb-5 flex items-center gap-3 px-4 py-3.5 rounded-xl"
          style={{ background: "rgba(200,168,75,0.07)", border: "1px solid rgba(200,168,75,0.22)" }}
        >
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(200,168,75,0.15)" }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#C8A84B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] text-[#C8A84B] uppercase tracking-widest font-semibold mb-0.5">Point prioritaire détecté</p>
            <p className="text-[#374151] text-sm font-medium truncate">{topReco.title}</p>
          </div>
          <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "rgba(200,168,75,0.12)" }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#C8A84B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
        </motion.div>
      )}

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="bg-white rounded-2xl border-2 border-[#C8A84B]/30 p-8"
        style={{ boxShadow: "0 0 0 4px rgba(200,168,75,0.06)" }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-full bg-[#C8A84B]/15 flex items-center justify-center shrink-0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C8A84B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
            </svg>
          </div>
          <div>
            <h3 className="font-display text-xl text-[#0C0B09] leading-tight">
              Déverrouillez votre score
            </h3>
            <p className="text-xs text-[#9CA3AF]">Score exact + recommandations prioritaires + PDF offert</p>
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#374151] mb-1.5">
                Prénom *
              </label>
              <input
                name="prenom"
                required
                className="w-full px-4 py-3 rounded-lg border border-[#E5E7EB] text-sm focus:outline-none focus:border-[#C8A84B] transition-colors"
                placeholder="Votre prénom"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#374151] mb-1.5">
                Email *
              </label>
              <input
                name="email"
                type="email"
                required
                className="w-full px-4 py-3 rounded-lg border border-[#E5E7EB] text-sm focus:outline-none focus:border-[#C8A84B] transition-colors"
                placeholder="votre@email.com"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#374151] mb-1.5">
                Téléphone
              </label>
              <input
                name="telephone"
                className="w-full px-4 py-3 rounded-lg border border-[#E5E7EB] text-sm focus:outline-none focus:border-[#C8A84B] transition-colors"
                placeholder="+221 77..."
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#374151] mb-1.5">
                {config.id === "artiste" ? "Nom d'artiste" : "Structure / Marque"}
              </label>
              <input
                name="structure"
                className="w-full px-4 py-3 rounded-lg border border-[#E5E7EB] text-sm focus:outline-none focus:border-[#C8A84B] transition-colors"
                placeholder="Optionnel"
              />
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-500 bg-red-50 px-4 py-3 rounded-lg">{error}</p>
          )}

          <motion.button
            type="submit"
            disabled={submitting}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full bg-[#C8A84B] text-white py-4 rounded-xl font-semibold text-base disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3 hover:bg-[#b8963d] transition-colors"
          >
            {submitting ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Génération de votre rapport…
              </>
            ) : (
              <>
                Révéler mon score et mes recommandations
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </motion.button>

          <p className="text-xs text-center text-[#9CA3AF]">
            Données confidentielles · Rapport PDF envoyé immédiatement
          </p>
        </form>
      </motion.div>
    </motion.div>
  );
}

// ─── Result view ──────────────────────────────────────────────────────────────
function ResultView({
  config,
  score,
  userInfo,
  direction,
  answers,
}: {
  config: SondageConfig;
  score: number;
  userInfo: UserInfo;
  direction: number;
  answers: Record<number, number | number[]>;
}) {
  const level = getLevel(score);
  const circumference = 2 * Math.PI * 80;
  const offset = circumference * (1 - score / 100);
  const tone = config.tone;

  const sortedRecos = [...config.recommendations].sort(
    (a, b) => computeRelevance(b, answers, config.questions) - computeRelevance(a, answers, config.questions)
  );

  const [displayScore, setDisplayScore] = useState(0);
  useEffect(() => {
    const steps = 40;
    const stepMs = 1400 / steps;
    let i = 0;
    const id = setInterval(() => {
      i++;
      const ease = 1 - Math.pow(1 - i / steps, 2);
      setDisplayScore(Math.round(score * ease));
      if (i >= steps) { setDisplayScore(score); clearInterval(id); }
    }, stepMs);
    return () => clearInterval(id);
  }, [score]);

  return (
    <motion.div
      custom={direction}
      variants={slide}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-3xl mx-auto px-6 py-16"
    >
      {/* Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C8A84B]/40 bg-[#C8A84B]/8 mb-4"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#C8A84B] animate-pulse" />
          <span className="text-xs font-semibold text-[#C8A84B] uppercase tracking-widest">
            Score déverrouillé
          </span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-display text-3xl md:text-4xl text-[#0C0B09] mb-3"
        >
          {tone === "tu"
            ? `${userInfo.prenom}, voici ton résultat`
            : `${userInfo.prenom}, voici votre résultat`}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-[#6B7280] text-sm"
        >
          {tone === "tu"
            ? "Rapport PDF envoyé à ton adresse email."
            : "Rapport PDF envoyé à votre adresse email."}
        </motion.p>
      </div>

      {/* Score + level */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl border border-[#E5E7EB] p-8 mb-8 flex flex-col md:flex-row items-center gap-8"
      >
        <div className="relative flex-shrink-0">
          <svg width="180" height="180" className="-rotate-90">
            <circle cx="90" cy="90" r="80" fill="none" stroke="#E5E7EB" strokeWidth="10" />
            <motion.circle
              cx="90"
              cy="90"
              r="80"
              fill="none"
              stroke={level.color}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display text-5xl font-bold text-[#0C0B09]">{displayScore}</span>
            <span className="text-xs text-[#9CA3AF]">/ 100</span>
          </div>
        </div>
        <div>
          <p
            className="text-2xl font-bold mb-2"
            style={{ color: level.color }}
          >
            {level.label}
          </p>
          <p className="text-[#6B7280] leading-relaxed mb-4">{level.desc}</p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#C8A84B] hover:text-[#b8963d] transition-colors"
          >
            Discutons de votre stratégie
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </motion.div>

      {/* Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="font-display text-2xl text-[#0C0B09] mb-2">
          {tone === "tu" ? "Nos recommandations pour toi" : "Nos recommandations"}
        </h2>
        <p className="text-sm text-[#9CA3AF] mb-6">
          {tone === "tu"
            ? "Classées selon tes points faibles détectés."
            : "Classées selon vos points faibles détectés."}
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          {sortedRecos.map((reco, i) => {
            const Icon = ICONS[reco.icon] ?? Globe;
            const isPriority = i === 0;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className={`rounded-xl border p-5 flex gap-4 transition-colors ${
                  isPriority
                    ? "bg-[#C8A84B]/6 border-[#C8A84B]/50 hover:border-[#C8A84B]"
                    : "bg-white border-[#E5E7EB] hover:border-[#C8A84B]/40"
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  isPriority ? "bg-[#C8A84B]/20" : "bg-[#C8A84B]/10"
                }`}>
                  <Icon className="w-5 h-5 text-[#C8A84B]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-sm text-[#0C0B09]">{reco.title}</p>
                    {isPriority && (
                      <span className="shrink-0 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-[#C8A84B] text-white">
                        Priorité n°1
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#6B7280] leading-relaxed">{reco.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* CTA personnalisé WhatsApp */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        className="mt-10 bg-[#0C0B09] rounded-2xl p-8"
      >
        {/* Point faible principal */}
        <div className="flex items-start gap-3 mb-6 p-4 rounded-xl bg-white/5 border border-white/10">
          <div className="w-8 h-8 rounded-lg bg-[#C8A84B]/20 flex items-center justify-center shrink-0 mt-0.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C8A84B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          </div>
          <div>
            <p className="text-[10px] text-[#C8A84B] uppercase tracking-widest font-semibold mb-1">
              {tone === "tu" ? "Ton point faible prioritaire" : "Votre point faible prioritaire"}
            </p>
            <p className="text-white text-sm font-medium leading-snug">
              {sortedRecos[0]?.title ?? "Stratégie digitale"}
            </p>
          </div>
        </div>

        <p className="text-[#C8A84B] text-xs uppercase tracking-widest mb-2">
          KEKELI Creative Agency
        </p>
        <h3 className="font-display text-2xl text-white mb-2">
          {tone === "tu"
            ? `${userInfo.prenom}, on peut t'aider sur ce point`
            : `${userInfo.prenom}, nous pouvons vous aider`}
        </h3>
        <p className="text-[#9CA3AF] text-sm mb-6">
          {tone === "tu"
            ? "Discutons directement sur WhatsApp — réponse en moins de 30 minutes."
            : "Discutons directement sur WhatsApp — réponse en moins de 30 minutes."}
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={`https://wa.me/221781672819?text=${encodeURIComponent(
              tone === "tu"
                ? `Bonjour KEKELI ! Je suis ${userInfo.prenom} et j'ai obtenu ${score}/100 à l'audit (niveau : ${getLevel(score).label}). Mon point faible principal : "${sortedRecos[0]?.title ?? "stratégie digitale"}". J'aimerais qu'on en discute.`
                : `Bonjour KEKELI ! Je m'appelle ${userInfo.prenom} et j'ai obtenu ${score}/100 à l'audit de visibilité (niveau : ${getLevel(score).label}). Mon point prioritaire : "${sortedRecos[0]?.title ?? "stratégie digitale"}". J'aimerais en discuter avec vous.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-3 bg-[#25D366] text-white px-6 py-4 rounded-xl font-semibold hover:bg-[#1fba59] transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            {tone === "tu" ? "Écrire sur WhatsApp" : "Écrire sur WhatsApp"}
          </a>
          <a
            href="/contact"
            className="flex-1 inline-flex items-center justify-center gap-2 border border-white/20 text-white/80 px-6 py-4 rounded-xl font-medium text-sm hover:border-white/40 hover:text-white transition-colors"
          >
            Formulaire de contact
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="mt-8 text-center"
      >
        <a
          href="/sondage"
          className="inline-flex items-center gap-2 text-sm transition-colors"
          style={{ color: "rgba(107,114,128,0.7)" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Tester un autre profil
        </a>
      </motion.div>
    </motion.div>
  );
}
