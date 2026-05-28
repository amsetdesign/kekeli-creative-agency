"use client";

import { useState } from "react";
import { Star, Loader2, ArrowRight, RefreshCw, CheckCircle2, AlertTriangle, TrendingUp } from "lucide-react";
import Link from "next/link";

const QUESTIONS = [
  { id: "logo", label: "Avez-vous un logo professionnel ?", options: ["Oui, créé par un designer", "Oui, créé moi-même", "Non, pas encore"] },
  { id: "charte", label: "Avez-vous une charte graphique (couleurs, polices) ?", options: ["Oui, complète", "Partiellement", "Non"] },
  { id: "coherence", label: "Vos supports (Instagram, flyers, cartes) sont-ils cohérents visuellement ?", options: ["Très cohérents", "Partiellement", "Pas du tout"] },
  { id: "site", label: "Avez-vous un site web ?", options: ["Oui, professionnel et à jour", "Oui, mais obsolète", "Non"] },
  { id: "reseaux", label: "Sur combien de réseaux sociaux êtes-vous actif ?", options: ["3 ou plus", "1 ou 2", "Aucun"] },
  { id: "publications", label: "À quelle fréquence publiez-vous ?", options: ["Plusieurs fois/semaine", "1-2 fois/semaine", "Rarement ou jamais"] },
  { id: "avis", label: "Avez-vous des avis/témoignages clients en ligne ?", options: ["Oui, nombreux et positifs", "Quelques-uns", "Non"] },
  { id: "photos", label: "Utilisez-vous des photos professionnelles de votre entreprise ?", options: ["Oui, shooting pro", "Quelques photos ok", "Photos de mauvaise qualité"] },
  { id: "positionnement", label: "Votre positionnement est-il clair ?", options: ["Très clair et unique", "Moyennement clair", "Pas vraiment"] },
  { id: "pub", label: "Faites-vous de la publicité payante (Facebook Ads, etc.) ?", options: ["Oui, régulièrement", "Occasionnellement", "Jamais"] },
];

type Results = {
  score_global: number;
  niveau: string;
  scores: Record<string, number>;
  points_forts: string[];
  points_amelioration: string[];
  recommandations: { priorite: string; action: string; impact: string; service: string }[];
  services_recommandes: string[];
  message_personnel: string;
  plan_action_30j: string[];
};

const SERVICE_LABELS: Record<string, string> = {
  branding: "Identité & Branding",
  "site-web": "Site Web",
  community: "Community Management",
  publicite: "Campagnes Publicitaires",
  strategie: "Stratégie & Croissance",
  "photo-video": "Photo & Vidéo",
  coaching: "Business Coach 2 Mois",
};

const PRIORITE_COLOR: Record<string, string> = {
  Urgente: "#EF4444",
  Importante: "#F97316",
  Optionnelle: "#10B981",
};

export default function BrandScoreClient() {
  const [step, setStep] = useState<"form" | "loading" | "results">("form");
  const [nom, setNom] = useState("");
  const [secteur, setSecteur] = useState("");
  const [reponses, setReponses] = useState<Record<string, string>>({});
  const [results, setResults] = useState<Results | null>(null);
  const [error, setError] = useState("");

  const allAnswered = QUESTIONS.every((q) => reponses[q.id]);

  const handleSubmit = async () => {
    if (!nom || !allAnswered) {
      setError("Veuillez renseigner votre nom d'entreprise et répondre à toutes les questions.");
      return;
    }
    setError("");
    setStep("loading");
    try {
      const res = await fetch("/api/entreprises/brand-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nom_entreprise: nom, secteur, reponses }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setResults(data);
      setStep("results");
    } catch {
      setError("Une erreur est survenue. Réessayez.");
      setStep("form");
    }
  };

  if (step === "loading") {
    return (
      <div className="min-h-screen bg-[#050A14] flex items-center justify-center">
        <div className="text-center">
          <Loader2 size={48} className="animate-spin mx-auto mb-6" style={{ color: "#C8A84B" }} />
          <p className="font-display text-2xl text-white mb-2">Calcul de votre Brand Score...</p>
          <p className="font-body text-white/40">Notre IA analyse votre image de marque</p>
        </div>
      </div>
    );
  }

  if (step === "results" && results) {
    const scoreColor = results.score_global >= 70 ? "#10B981" : results.score_global >= 40 ? "#F97316" : "#EF4444";
    return (
      <div className="min-h-screen bg-[#050A14] py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {/* Score global */}
          <div className="text-center mb-12">
            <p className="font-body text-xs uppercase tracking-widest text-white/40 mb-4">Brand Score — {nom}</p>
            <div className="relative inline-flex items-center justify-center w-40 h-40 rounded-full mb-6"
              style={{ border: `6px solid ${scoreColor}`, boxShadow: `0 0 40px ${scoreColor}30` }}>
              <div className="text-center">
                <span className="font-display text-5xl font-bold text-white">{results.score_global}</span>
                <span className="font-body text-sm text-white/50 block">/100</span>
              </div>
            </div>
            <h2 className="font-display text-3xl text-white mb-2">{results.niveau}</h2>
            <p className="font-body text-white/50 max-w-md mx-auto">{results.message_personnel}</p>
          </div>

          {/* Scores détaillés */}
          <div className="bg-white/[0.04] rounded-2xl p-6 mb-6" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
            <h3 className="font-display text-lg text-white mb-5">Scores détaillés</h3>
            <div className="space-y-4">
              {Object.entries(results.scores).map(([key, val]) => (
                <div key={key}>
                  <div className="flex justify-between mb-1.5">
                    <span className="font-body text-sm text-white/70 capitalize">{key.replace(/_/g, " ")}</span>
                    <span className="font-body text-sm font-semibold text-white">{val}/100</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${val}%`, background: val >= 70 ? "#10B981" : val >= 40 ? "#F97316" : "#EF4444" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Points forts & améliorations */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-white/[0.04] rounded-2xl p-5" style={{ border: "1px solid rgba(16,185,129,0.2)" }}>
              <h3 className="font-display text-base text-white mb-3 flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#10B981]" /> Points forts
              </h3>
              <ul className="space-y-2">
                {results.points_forts.map((p, i) => (
                  <li key={i} className="font-body text-sm text-white/60 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] mt-1.5 shrink-0" />{p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white/[0.04] rounded-2xl p-5" style={{ border: "1px solid rgba(239,68,68,0.2)" }}>
              <h3 className="font-display text-base text-white mb-3 flex items-center gap-2">
                <AlertTriangle size={16} className="text-[#EF4444]" /> À améliorer
              </h3>
              <ul className="space-y-2">
                {results.points_amelioration.map((p, i) => (
                  <li key={i} className="font-body text-sm text-white/60 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444] mt-1.5 shrink-0" />{p}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Plan 30j */}
          <div className="bg-white/[0.04] rounded-2xl p-6 mb-6" style={{ border: "1px solid rgba(200,168,75,0.2)" }}>
            <h3 className="font-display text-lg text-white mb-4 flex items-center gap-2">
              <TrendingUp size={18} style={{ color: "#C8A84B" }} /> Plan d'action 30 jours
            </h3>
            <ol className="space-y-3">
              {results.plan_action_30j.map((action, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 font-body text-xs font-bold text-black"
                    style={{ background: "#C8A84B" }}>{i + 1}</span>
                  <span className="font-body text-sm text-white/70">{action}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Recommandations */}
          <div className="bg-white/[0.04] rounded-2xl p-6 mb-8" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
            <h3 className="font-display text-lg text-white mb-4">Recommandations</h3>
            <div className="space-y-3">
              {results.recommandations.map((r, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.03]">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-body font-bold shrink-0"
                    style={{ background: `${PRIORITE_COLOR[r.priorite]}20`, color: PRIORITE_COLOR[r.priorite] }}>
                    {r.priorite}
                  </span>
                  <div>
                    <p className="font-body text-sm text-white/80 mb-0.5">{r.action}</p>
                    <p className="font-body text-xs text-white/40">{r.impact}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Services recommandés */}
          <div className="text-center mb-8">
            <h3 className="font-display text-xl text-white mb-4">Services recommandés pour vous</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {results.services_recommandes.map((slug) => (
                <Link key={slug} href={`/entreprises/${slug}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full font-body text-sm font-semibold text-white transition-all hover:opacity-90"
                  style={{ background: "linear-gradient(135deg, #1E40AF, #0EA5E9)" }}>
                  {SERVICE_LABELS[slug] ?? slug} <ArrowRight size={13} />
                </Link>
              ))}
            </div>
          </div>

          <div className="text-center">
            <button onClick={() => { setStep("form"); setResults(null); setReponses({}); }}
              className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors font-body text-sm">
              <RefreshCw size={14} /> Recommencer
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050A14] py-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ background: "rgba(200,168,75,0.15)" }}>
            <Star size={26} style={{ color: "#C8A84B" }} />
          </div>
          <h1 className="font-display text-4xl text-white mb-3">Brand Score</h1>
          <p className="font-body text-white/45">10 questions · 2 minutes · Résultats instantanés</p>
        </div>

        <div className="space-y-4 mb-8">
          <div>
            <label className="block font-body text-xs font-semibold text-white/50 mb-1.5 uppercase tracking-wider">Nom de votre entreprise *</label>
            <input value={nom} onChange={(e) => setNom(e.target.value)} placeholder="Ex : Boutique Mariama"
              className="w-full px-4 py-3 rounded-xl font-body text-sm text-white placeholder-white/20 bg-white/[0.06] border border-white/10 focus:outline-none focus:border-[#C8A84B]/50 transition-colors" />
          </div>
          <div>
            <label className="block font-body text-xs font-semibold text-white/50 mb-1.5 uppercase tracking-wider">Secteur d'activité</label>
            <input value={secteur} onChange={(e) => setSecteur(e.target.value)} placeholder="Ex : Commerce, Restauration, Services..."
              className="w-full px-4 py-3 rounded-xl font-body text-sm text-white placeholder-white/20 bg-white/[0.06] border border-white/10 focus:outline-none focus:border-[#C8A84B]/50 transition-colors" />
          </div>
        </div>

        <div className="space-y-5 mb-8">
          {QUESTIONS.map((q, i) => (
            <div key={q.id} className="p-5 rounded-2xl" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
              <p className="font-body text-sm font-medium text-white mb-3">
                <span className="text-white/30 mr-2">{i + 1}.</span>{q.label}
              </p>
              <div className="space-y-2">
                {q.options.map((opt) => (
                  <button key={opt} type="button" onClick={() => setReponses((r) => ({ ...r, [q.id]: opt }))}
                    className="w-full text-left px-4 py-2.5 rounded-xl font-body text-sm transition-all duration-150"
                    style={reponses[q.id] === opt
                      ? { background: "rgba(200,168,75,0.15)", border: "1.5px solid #C8A84B", color: "#C8A84B" }
                      : { background: "transparent", border: "1.5px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.55)" }}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {error && <p className="text-red-400 text-sm font-body mb-4 text-center">{error}</p>}

        <button onClick={handleSubmit} disabled={!nom || !allAnswered}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-body font-semibold text-sm text-white transition-all hover:opacity-90 disabled:opacity-40"
          style={{ background: "linear-gradient(135deg, #92400E, #C8A84B)" }}>
          <Star size={16} /> Calculer mon Brand Score
        </button>
      </div>
    </div>
  );
}
