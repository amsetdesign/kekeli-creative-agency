"use client";

import { useState } from "react";
import { Map, Loader2, ArrowRight, RefreshCw, AlertTriangle, CheckCircle2, TrendingUp } from "lucide-react";
import Link from "next/link";

const SECTEURS = ["Commerce / Retail", "Restauration / Food", "Services BtoB", "Formation / Éducation", "Santé / Bien-être", "Mode & Beauté", "Immobilier", "Événementiel", "Tech / Digital", "Autre"];
const ANCIENNETE = ["Moins d'1 an", "1 à 3 ans", "3 à 5 ans", "Plus de 5 ans"];
const EFFECTIF = ["Solo / Auto-entrepreneur", "2 à 5 personnes", "6 à 20 personnes", "Plus de 20 personnes"];
const PRESENCE_OPTIONS = ["Site web", "Instagram", "Facebook", "TikTok", "LinkedIn", "WhatsApp Business", "Google My Business"];
const DELAI_COLOR: Record<string, string> = { "Cette semaine": "#EF4444", "Ce mois": "#F97316", "Dans 3 mois": "#10B981" };
const IMPACT_COLOR: Record<string, string> = { "Très élevé": "#EF4444", Élevé: "#F97316", Moyen: "#C8A84B", Faible: "#10B981" };
const SEVERITE_COLOR: Record<string, string> = { Critique: "#EF4444", Important: "#F97316", Améliorable: "#C8A84B" };

const SERVICE_LABELS: Record<string, string> = {
  branding: "Identité & Branding", "site-web": "Site Web", community: "Community Management",
  publicite: "Campagnes Publicitaires", strategie: "Stratégie", "photo-video": "Photo & Vidéo", coaching: "Business Coach",
};
const URGENCE_COLOR: Record<string, string> = { Urgent: "#EF4444", Recommandé: "#F97316", Optionnel: "#10B981" };

type Results = {
  diagnostic_global: string;
  lacunes_identifiees: { domaine: string; severite: string; description: string; impact_business: string }[];
  points_forts: string[];
  opportunites_manquees: string[];
  plan_action: { priorite: number; action: string; delai: string; impact_estime: string; service_kekeli: string | null }[];
  services_recommandes: { slug: string; raison: string; urgence: string }[];
  score_maturite_digitale: number;
  potentiel_croissance: string;
  message_personnel: string;
};

export default function DiagnosticClient() {
  const [form, setForm] = useState({
    nom: "", secteur: "", anciennete: "", effectif: "",
    presence: [] as string[], problemes: "", objectifs: "",
  });
  const [step, setStep] = useState<"form" | "loading" | "results">("form");
  const [results, setResults] = useState<Results | null>(null);
  const [error, setError] = useState("");

  const togglePresence = (p: string) =>
    setForm((f) => ({ ...f, presence: f.presence.includes(p) ? f.presence.filter((x) => x !== p) : [...f.presence, p] }));

  const handleSubmit = async () => {
    if (!form.secteur) { setError("Secteur requis."); return; }
    setError(""); setStep("loading");
    try {
      const res = await fetch("/api/entreprises/diagnostic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom_entreprise: form.nom, secteur: form.secteur, anciennete: form.anciennete,
          effectif: form.effectif, presence_actuelle: form.presence, problemes: form.problemes, objectifs: form.objectifs,
        }),
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
          <Loader2 size={48} className="animate-spin mx-auto mb-6" style={{ color: "#10B981" }} />
          <p className="font-display text-2xl text-white mb-2">Diagnostic en cours...</p>
          <p className="font-body text-white/40">L'IA analyse les lacunes de votre entreprise</p>
        </div>
      </div>
    );
  }

  if (step === "results" && results) {
    const matColor = results.score_maturite_digitale >= 70 ? "#10B981" : results.score_maturite_digitale >= 40 ? "#F97316" : "#EF4444";
    return (
      <div className="min-h-screen bg-[#050A14] py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="font-body text-xs uppercase tracking-widest text-white/40 mb-4">Diagnostic — {form.nom || "Votre entreprise"}</p>
            <div className="relative inline-flex items-center justify-center w-36 h-36 rounded-full mb-5"
              style={{ border: `5px solid ${matColor}`, boxShadow: `0 0 40px ${matColor}30` }}>
              <div className="text-center">
                <span className="font-display text-4xl font-bold text-white">{results.score_maturite_digitale}</span>
                <span className="font-body text-xs text-white/50 block">/100</span>
              </div>
            </div>
            <h2 className="font-display text-2xl text-white mb-1">Maturité Digitale</h2>
            <p className="font-body text-sm text-white/50 mb-4">Potentiel de croissance : <span style={{ color: "#C8A84B" }}>{results.potentiel_croissance}</span></p>
            <p className="font-body text-white/60 max-w-lg mx-auto text-sm">{results.diagnostic_global}</p>
          </div>

          {/* Lacunes */}
          <div className="bg-white/[0.04] rounded-2xl p-6 mb-6" style={{ border: "1px solid rgba(239,68,68,0.15)" }}>
            <h3 className="font-display text-lg text-white mb-4 flex items-center gap-2">
              <AlertTriangle size={18} className="text-[#EF4444]" /> Ce qui manque
            </h3>
            <div className="space-y-3">
              {results.lacunes_identifiees.map((l, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.03]">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-body font-bold shrink-0 mt-0.5"
                    style={{ background: `${SEVERITE_COLOR[l.severite]}20`, color: SEVERITE_COLOR[l.severite] }}>{l.severite}</span>
                  <div>
                    <p className="font-body text-sm font-medium text-white/80 mb-0.5">{l.domaine}</p>
                    <p className="font-body text-xs text-white/50 mb-1">{l.description}</p>
                    <p className="font-body text-xs text-[#F97316]">Impact : {l.impact_business}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Points forts & Opportunités manquées */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-white/[0.04] rounded-2xl p-5" style={{ border: "1px solid rgba(16,185,129,0.2)" }}>
              <h3 className="font-display text-base text-white mb-3 flex items-center gap-2"><CheckCircle2 size={15} className="text-[#10B981]" /> Points forts</h3>
              <ul className="space-y-2">{results.points_forts.map((p, i) => <li key={i} className="font-body text-sm text-white/60 flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#10B981] mt-1.5 shrink-0" />{p}</li>)}</ul>
            </div>
            <div className="bg-white/[0.04] rounded-2xl p-5" style={{ border: "1px solid rgba(200,168,75,0.2)" }}>
              <h3 className="font-display text-base text-white mb-3 flex items-center gap-2"><TrendingUp size={15} style={{ color: "#C8A84B" }} /> Opportunités manquées</h3>
              <ul className="space-y-2">{results.opportunites_manquees.map((p, i) => <li key={i} className="font-body text-sm text-white/60 flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: "#C8A84B" }} />{p}</li>)}</ul>
            </div>
          </div>

          {/* Plan d'action */}
          <div className="bg-white/[0.04] rounded-2xl p-6 mb-6" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
            <h3 className="font-display text-lg text-white mb-4">Plan d'action priorisé</h3>
            <div className="space-y-3">
              {results.plan_action.map((a, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.03]">
                  <span className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 font-display font-bold text-black text-sm"
                    style={{ background: "#C8A84B" }}>{a.priorite}</span>
                  <div className="flex-1">
                    <p className="font-body text-sm text-white/80 mb-1">{a.action}</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-body"
                        style={{ background: `${DELAI_COLOR[a.delai]}20`, color: DELAI_COLOR[a.delai] }}>{a.delai}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-body"
                        style={{ background: `${IMPACT_COLOR[a.impact_estime]}20`, color: IMPACT_COLOR[a.impact_estime] }}>Impact {a.impact_estime}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="bg-white/[0.04] rounded-2xl p-6 mb-8" style={{ border: "1px solid rgba(14,165,233,0.2)" }}>
            <h3 className="font-display text-lg text-white mb-4">Services KEKELI recommandés</h3>
            <div className="space-y-3">
              {results.services_recommandes.map((s) => (
                <div key={s.slug} className="flex items-start justify-between gap-3 p-4 rounded-xl bg-white/[0.03]">
                  <div>
                    <p className="font-body text-sm font-semibold text-white mb-0.5">{SERVICE_LABELS[s.slug] ?? s.slug}</p>
                    <p className="font-body text-xs text-white/45">{s.raison}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-body font-bold"
                      style={{ background: `${URGENCE_COLOR[s.urgence]}20`, color: URGENCE_COLOR[s.urgence] }}>{s.urgence}</span>
                    <Link href={`/entreprises/${s.slug}`} className="font-body text-xs font-semibold transition-colors" style={{ color: "#0EA5E9" }}>
                      Voir <ArrowRight size={10} className="inline" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <button onClick={() => { setStep("form"); setResults(null); }}
              className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors font-body text-sm">
              <RefreshCw size={14} /> Nouveau diagnostic
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050A14] py-16">
      <div className="max-w-lg w-full mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ background: "rgba(16,185,129,0.15)" }}>
            <Map size={26} style={{ color: "#10B981" }} />
          </div>
          <h1 className="font-display text-4xl text-white mb-3">Diagnostic Entreprise</h1>
          <p className="font-body text-white/45">Que manque-t-il à votre entreprise pour se développer ?</p>
        </div>
        <div className="space-y-4 mb-6">
          <div>
            <label className="block font-body text-xs font-semibold text-white/50 mb-1.5 uppercase tracking-wider">Nom de l'entreprise</label>
            <input value={form.nom} onChange={(e) => setForm((f) => ({ ...f, nom: e.target.value }))} placeholder="Ex : Boutique Mariama"
              className="w-full px-4 py-3 rounded-xl font-body text-sm text-white placeholder-white/20 bg-white/[0.06] border border-white/10 focus:outline-none focus:border-[#10B981]/50 transition-colors" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-body text-xs font-semibold text-white/50 mb-1.5 uppercase tracking-wider">Secteur *</label>
              <select value={form.secteur} onChange={(e) => setForm((f) => ({ ...f, secteur: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl font-body text-sm text-white bg-white/[0.06] border border-white/10 focus:outline-none focus:border-[#10B981]/50 transition-colors">
                <option value="" className="bg-[#0C0B09]">Choisir...</option>
                {SECTEURS.map((s) => <option key={s} value={s} className="bg-[#0C0B09]">{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block font-body text-xs font-semibold text-white/50 mb-1.5 uppercase tracking-wider">Ancienneté</label>
              <select value={form.anciennete} onChange={(e) => setForm((f) => ({ ...f, anciennete: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl font-body text-sm text-white bg-white/[0.06] border border-white/10 focus:outline-none focus:border-[#10B981]/50 transition-colors">
                <option value="" className="bg-[#0C0B09]">Choisir...</option>
                {ANCIENNETE.map((a) => <option key={a} value={a} className="bg-[#0C0B09]">{a}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block font-body text-xs font-semibold text-white/50 mb-2 uppercase tracking-wider">Présence digitale actuelle</label>
            <div className="flex flex-wrap gap-2">
              {PRESENCE_OPTIONS.map((p) => (
                <button key={p} type="button" onClick={() => togglePresence(p)}
                  className="px-3 py-1.5 rounded-full font-body text-xs font-medium transition-all"
                  style={form.presence.includes(p)
                    ? { background: "#10B981", color: "#fff", border: "1.5px solid #10B981" }
                    : { background: "transparent", color: "rgba(255,255,255,0.5)", border: "1.5px solid rgba(255,255,255,0.12)" }}>
                  {p}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block font-body text-xs font-semibold text-white/50 mb-1.5 uppercase tracking-wider">Principaux problèmes ressentis</label>
            <textarea rows={3} value={form.problemes} onChange={(e) => setForm((f) => ({ ...f, problemes: e.target.value }))}
              placeholder="Ex : Pas assez de clients, mauvaise visibilité, peu de ventes en ligne..."
              className="w-full px-4 py-3 rounded-xl font-body text-sm text-white placeholder-white/20 bg-white/[0.06] border border-white/10 focus:outline-none focus:border-[#10B981]/50 transition-colors resize-none" />
          </div>
          <div>
            <label className="block font-body text-xs font-semibold text-white/50 mb-1.5 uppercase tracking-wider">Objectifs pour les 6 prochains mois</label>
            <textarea rows={2} value={form.objectifs} onChange={(e) => setForm((f) => ({ ...f, objectifs: e.target.value }))}
              placeholder="Ex : Doubler mes ventes, ouvrir une 2e boutique, lancer en ligne..."
              className="w-full px-4 py-3 rounded-xl font-body text-sm text-white placeholder-white/20 bg-white/[0.06] border border-white/10 focus:outline-none focus:border-[#10B981]/50 transition-colors resize-none" />
          </div>
        </div>
        {error && <p className="text-red-400 text-sm font-body mb-4 text-center">{error}</p>}
        <button onClick={handleSubmit} disabled={!form.secteur}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-body font-semibold text-sm text-white disabled:opacity-40 transition-all hover:opacity-90"
          style={{ background: "linear-gradient(135deg, #C8A84B, #D4A83A)", color: "#000" }}>
          <Map size={16} /> Lancer le diagnostic
        </button>
      </div>
    </div>
  );
}
