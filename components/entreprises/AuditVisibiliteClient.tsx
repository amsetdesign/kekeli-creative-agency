"use client";

import { useState } from "react";
import { Search, Loader2, ArrowRight, RefreshCw, Globe, AlertTriangle, CheckCircle2, TrendingUp } from "lucide-react";
import Link from "next/link";

const SECTEURS = ["Commerce / Retail", "Restauration / Food", "Services BtoB", "Formation / Éducation", "Santé / Bien-être", "Mode & Beauté", "Immobilier", "Événementiel", "Tech / Digital", "Autre"];

type Results = {
  score_global: number;
  niveau: string;
  infos_trouvees: Record<string, string | null>;
  scores: Record<string, number>;
  opportunites: string[];
  problemes_detectes: string[];
  recommandations: { priorite: string; action: string; impact: string }[];
  services_recommandes: string[];
  message_personnel: string;
  plan_action_30j: string[];
};

const PRIORITE_COLOR: Record<string, string> = { Urgente: "#EF4444", Importante: "#F97316", Optionnelle: "#10B981" };

export default function AuditVisibiliteClient() {
  const [nom, setNom] = useState("");
  const [secteur, setSecteur] = useState("");
  const [step, setStep] = useState<"form" | "loading" | "results">("form");
  const [results, setResults] = useState<Results | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!nom) { setError("Entrez le nom de votre entreprise."); return; }
    setError(""); setStep("loading");
    try {
      const res = await fetch("/api/entreprises/audit-visibilite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nom_entreprise: nom, secteur }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setResults(data); setStep("results");
    } catch {
      setError("Une erreur est survenue. Réessayez."); setStep("form");
    }
  };

  if (step === "loading") {
    return (
      <div className="min-h-screen bg-[#050A14] flex items-center justify-center">
        <div className="text-center">
          <Loader2 size={48} className="animate-spin mx-auto mb-6" style={{ color: "#3B82F6" }} />
          <p className="font-display text-2xl text-white mb-2">Audit de votre visibilité en cours...</p>
          <p className="font-body text-white/40">Notre IA recherche votre entreprise sur le web</p>
        </div>
      </div>
    );
  }

  if (step === "results" && results) {
    const scoreColor = results.score_global >= 70 ? "#10B981" : results.score_global >= 40 ? "#F97316" : "#EF4444";
    return (
      <div className="min-h-screen bg-[#050A14] py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="font-body text-xs uppercase tracking-widest text-white/40 mb-4">Audit Visibilité — {nom}</p>
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

          {/* Ce qu'on a trouvé */}
          <div className="bg-white/[0.04] rounded-2xl p-6 mb-6" style={{ border: "1px solid rgba(59,130,246,0.2)" }}>
            <h3 className="font-display text-lg text-white mb-4 flex items-center gap-2">
              <Globe size={18} style={{ color: "#3B82F6" }} /> Ce qu'on a trouvé en ligne
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(results.infos_trouvees).map(([key, val]) => (
                <div key={key} className="flex items-start gap-2">
                  {val ? <CheckCircle2 size={14} className="text-[#10B981] mt-0.5 shrink-0" /> : <AlertTriangle size={14} className="text-[#EF4444] mt-0.5 shrink-0" />}
                  <div>
                    <p className="font-body text-xs text-white/40 capitalize">{key.replace(/_/g, " ")}</p>
                    <p className="font-body text-xs text-white/70">{val ?? "Non trouvé"}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scores */}
          <div className="bg-white/[0.04] rounded-2xl p-6 mb-6" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
            <h3 className="font-display text-lg text-white mb-5">Scores par domaine</h3>
            <div className="space-y-4">
              {Object.entries(results.scores).map(([key, val]) => (
                <div key={key}>
                  <div className="flex justify-between mb-1.5">
                    <span className="font-body text-sm text-white/70 capitalize">{key.replace(/_/g, " ")}</span>
                    <span className="font-body text-sm font-semibold text-white">{val}/100</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${val}%`, background: val >= 70 ? "#10B981" : val >= 40 ? "#F97316" : "#EF4444" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Problèmes & Opportunités */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-white/[0.04] rounded-2xl p-5" style={{ border: "1px solid rgba(239,68,68,0.2)" }}>
              <h3 className="font-display text-base text-white mb-3 flex items-center gap-2"><AlertTriangle size={15} className="text-[#EF4444]" /> Problèmes détectés</h3>
              <ul className="space-y-2">{results.problemes_detectes.map((p, i) => <li key={i} className="font-body text-sm text-white/60 flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#EF4444] mt-1.5 shrink-0" />{p}</li>)}</ul>
            </div>
            <div className="bg-white/[0.04] rounded-2xl p-5" style={{ border: "1px solid rgba(16,185,129,0.2)" }}>
              <h3 className="font-display text-base text-white mb-3 flex items-center gap-2"><TrendingUp size={15} className="text-[#10B981]" /> Opportunités</h3>
              <ul className="space-y-2">{results.opportunites.map((p, i) => <li key={i} className="font-body text-sm text-white/60 flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#10B981] mt-1.5 shrink-0" />{p}</li>)}</ul>
            </div>
          </div>

          {/* Recommandations */}
          <div className="bg-white/[0.04] rounded-2xl p-6 mb-8" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
            <h3 className="font-display text-lg text-white mb-4">Plan d'action prioritaire</h3>
            <div className="space-y-3">
              {results.recommandations.map((r, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.03]">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-body font-bold shrink-0"
                    style={{ background: `${PRIORITE_COLOR[r.priorite]}20`, color: PRIORITE_COLOR[r.priorite] }}>{r.priorite}</span>
                  <div><p className="font-body text-sm text-white/80 mb-0.5">{r.action}</p><p className="font-body text-xs text-white/40">{r.impact}</p></div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mb-8">
            <h3 className="font-display text-xl text-white mb-4">Services recommandés</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {results.services_recommandes.map((slug) => (
                <Link key={slug} href={`/entreprises/${slug}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full font-body text-sm font-semibold text-black"
                  style={{ background: "linear-gradient(135deg, #C8A84B, #D4A83A)" }}>
                  {slug} <ArrowRight size={13} />
                </Link>
              ))}
            </div>
          </div>

          <div className="text-center">
            <button onClick={() => { setStep("form"); setResults(null); }}
              className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors font-body text-sm">
              <RefreshCw size={14} /> Analyser une autre entreprise
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050A14] flex items-center justify-center py-16">
      <div className="max-w-lg w-full mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ background: "rgba(59,130,246,0.15)" }}>
            <Search size={26} style={{ color: "#3B82F6" }} />
          </div>
          <h1 className="font-display text-4xl text-white mb-3">Audit Visibilité</h1>
          <p className="font-body text-white/45">Entrez votre nom d'entreprise — notre IA analyse votre présence digitale complète en temps réel.</p>
        </div>
        <div className="space-y-4 mb-6">
          <div>
            <label className="block font-body text-xs font-semibold text-white/50 mb-1.5 uppercase tracking-wider">Nom de votre entreprise *</label>
            <input value={nom} onChange={(e) => setNom(e.target.value)} placeholder="Ex : Boutique Mariama, Restaurant Le Dakarois..."
              className="w-full px-4 py-3 rounded-xl font-body text-sm text-white placeholder-white/20 bg-white/[0.06] border border-white/10 focus:outline-none focus:border-[#3B82F6]/50 transition-colors" />
          </div>
          <div>
            <label className="block font-body text-xs font-semibold text-white/50 mb-1.5 uppercase tracking-wider">Secteur d'activité</label>
            <select value={secteur} onChange={(e) => setSecteur(e.target.value)}
              className="w-full px-4 py-3 rounded-xl font-body text-sm text-white bg-white/[0.06] border border-white/10 focus:outline-none focus:border-[#3B82F6]/50 transition-colors">
              <option value="" className="bg-[#0C0B09]">Choisir...</option>
              {SECTEURS.map((s) => <option key={s} value={s} className="bg-[#0C0B09]">{s}</option>)}
            </select>
          </div>
        </div>
        {error && <p className="text-red-400 text-sm font-body mb-4 text-center">{error}</p>}
        <button onClick={handleSubmit} disabled={!nom}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-body font-semibold text-sm text-white disabled:opacity-40 transition-all hover:opacity-90"
          style={{ background: "linear-gradient(135deg, #C8A84B, #D4A83A)", color: "#000" }}>
          <Search size={16} /> Analyser ma visibilité
        </button>
      </div>
    </div>
  );
}
