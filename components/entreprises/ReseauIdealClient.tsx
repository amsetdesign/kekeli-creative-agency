"use client";

import { useState } from "react";
import { Share2, Loader2, ArrowRight, RefreshCw } from "lucide-react";
import Link from "next/link";

const SECTEURS = ["Commerce / Retail", "Restauration / Food", "Services BtoB", "Formation / Éducation", "Santé / Bien-être", "Mode & Beauté", "Immobilier", "Événementiel", "Tech / Digital", "Autre"];
const OBJECTIFS = ["Notoriété & visibilité", "Ventes & commandes", "Acquisition clients", "Fidélisation", "Recrutement", "Lancement produit"];
const BUDGETS = ["Aucun budget pub", "< 50 000 FCFA/mois", "50 000 – 200 000 FCFA/mois", "> 200 000 FCFA/mois"];

const RESEAU_COLORS: Record<string, string> = {
  Instagram: "#E1306C", Facebook: "#1877F2", TikTok: "#010101",
  LinkedIn: "#0A66C2", "WhatsApp Business": "#25D366", YouTube: "#FF0000",
};

type Results = {
  reseau_principal: { nom: string; score_adequation: number; raison: string; strategie: string; frequence_recommandee: string; types_contenus: string[] };
  reseaux_secondaires: { nom: string; score_adequation: number; raison: string; role: string }[];
  reseaux_a_eviter: { nom: string; raison: string }[];
  plan_contenu_30j: { semaine_1: string; semaine_2: string; semaine_3: string; semaine_4: string };
  types_contenus_recommandes: { format: string; frequence: string; exemple: string }[];
  objectifs_3mois: string[];
  message_personnel: string;
};

export default function ReseauIdealClient() {
  const [form, setForm] = useState({ nom: "", secteur: "", cible: "", objectifs: [] as string[], budget_pub: "" });
  const [step, setStep] = useState<"form" | "loading" | "results">("form");
  const [results, setResults] = useState<Results | null>(null);
  const [error, setError] = useState("");

  const toggleObjectif = (o: string) =>
    setForm((f) => ({ ...f, objectifs: f.objectifs.includes(o) ? f.objectifs.filter((x) => x !== o) : [...f.objectifs, o] }));

  const handleSubmit = async () => {
    if (!form.secteur || !form.cible) { setError("Secteur et description de la cible requis."); return; }
    setError(""); setStep("loading");
    try {
      const res = await fetch("/api/entreprises/reseau-ideal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nom_entreprise: form.nom, secteur: form.secteur, cible: form.cible, objectifs: form.objectifs.join(", "), budget_pub: form.budget_pub }),
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
          <Loader2 size={48} className="animate-spin mx-auto mb-6" style={{ color: "#8B5CF6" }} />
          <p className="font-display text-2xl text-white mb-2">Analyse en cours...</p>
          <p className="font-body text-white/40">L'IA identifie votre réseau idéal</p>
        </div>
      </div>
    );
  }

  if (step === "results" && results) {
    const mainColor = RESEAU_COLORS[results.reseau_principal.nom] ?? "#8B5CF6";
    return (
      <div className="min-h-screen bg-[#050A14] py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="font-body text-xs uppercase tracking-widest text-white/40 mb-3">Votre réseau idéal</p>
            <p className="font-body text-white/50 max-w-md mx-auto">{results.message_personnel}</p>
          </div>

          {/* Réseau principal */}
          <div className="rounded-2xl p-7 mb-6 text-center" style={{ border: `2px solid ${mainColor}`, background: `${mainColor}10` }}>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: `${mainColor}20` }}>
              <span className="font-display text-2xl font-bold" style={{ color: mainColor }}>{results.reseau_principal.nom.charAt(0)}</span>
            </div>
            <h2 className="font-display text-3xl text-white mb-1">{results.reseau_principal.nom}</h2>
            <p className="font-body text-sm mb-4" style={{ color: mainColor }}>Adéquation : {results.reseau_principal.score_adequation}/100</p>
            <p className="font-body text-sm text-white/65 mb-3">{results.reseau_principal.raison}</p>
            <p className="font-body text-sm text-white/50 italic">{results.reseau_principal.strategie}</p>
            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="font-body text-xs text-white/40 mb-2 uppercase tracking-wider">Fréquence recommandée</p>
              <p className="font-body text-sm text-white/70">{results.reseau_principal.frequence_recommandee}</p>
            </div>
            <div className="mt-3">
              <p className="font-body text-xs text-white/40 mb-2 uppercase tracking-wider">Types de contenus</p>
              <div className="flex flex-wrap justify-center gap-2">
                {results.reseau_principal.types_contenus.map((t) => (
                  <span key={t} className="px-3 py-1 rounded-full font-body text-xs" style={{ background: `${mainColor}20`, color: mainColor }}>{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Réseaux secondaires */}
          {results.reseaux_secondaires.length > 0 && (
            <div className="bg-white/[0.04] rounded-2xl p-6 mb-6" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              <h3 className="font-display text-lg text-white mb-4">Réseaux complémentaires</h3>
              <div className="space-y-3">
                {results.reseaux_secondaires.map((r) => (
                  <div key={r.nom} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03]">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${RESEAU_COLORS[r.nom] ?? "#8B5CF6"}20` }}>
                      <span className="font-body text-xs font-bold" style={{ color: RESEAU_COLORS[r.nom] ?? "#8B5CF6" }}>{r.nom.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-body text-sm font-semibold text-white">{r.nom} <span className="font-normal text-white/40 text-xs">({r.score_adequation}/100)</span></p>
                      <p className="font-body text-xs text-white/50">{r.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Plan 30j */}
          <div className="bg-white/[0.04] rounded-2xl p-6 mb-6" style={{ border: "1px solid rgba(139,92,246,0.2)" }}>
            <h3 className="font-display text-lg text-white mb-4">Plan contenu — 30 jours</h3>
            <div className="space-y-3">
              {Object.entries(results.plan_contenu_30j).map(([sem, desc]) => (
                <div key={sem} className="flex gap-3">
                  <span className="px-3 py-1 rounded-lg font-body text-xs font-bold shrink-0 h-fit" style={{ background: "rgba(139,92,246,0.15)", color: "#8B5CF6" }}>
                    {sem.replace("_", " ")}
                  </span>
                  <p className="font-body text-sm text-white/65">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mb-8">
            <Link href="/entreprises/community"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-body font-semibold text-sm text-white"
              style={{ background: "linear-gradient(135deg, #5B21B6, #8B5CF6)" }}>
              Déléguer ma gestion réseaux <ArrowRight size={14} />
            </Link>
          </div>

          <div className="text-center">
            <button onClick={() => { setStep("form"); setResults(null); }}
              className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors font-body text-sm">
              <RefreshCw size={14} /> Recommencer
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
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ background: "rgba(139,92,246,0.15)" }}>
            <Share2 size={26} style={{ color: "#8B5CF6" }} />
          </div>
          <h1 className="font-display text-4xl text-white mb-3">Réseau Idéal</h1>
          <p className="font-body text-white/45">Décrivez votre entreprise — l'IA vous recommande le meilleur réseau social.</p>
        </div>
        <div className="space-y-4 mb-6">
          <div>
            <label className="block font-body text-xs font-semibold text-white/50 mb-1.5 uppercase tracking-wider">Nom de l'entreprise</label>
            <input value={form.nom} onChange={(e) => setForm((f) => ({ ...f, nom: e.target.value }))} placeholder="Ex : Boutique Mariama"
              className="w-full px-4 py-3 rounded-xl font-body text-sm text-white placeholder-white/20 bg-white/[0.06] border border-white/10 focus:outline-none focus:border-[#8B5CF6]/50 transition-colors" />
          </div>
          <div>
            <label className="block font-body text-xs font-semibold text-white/50 mb-1.5 uppercase tracking-wider">Secteur d'activité *</label>
            <select value={form.secteur} onChange={(e) => setForm((f) => ({ ...f, secteur: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl font-body text-sm text-white bg-white/[0.06] border border-white/10 focus:outline-none focus:border-[#8B5CF6]/50 transition-colors">
              <option value="" className="bg-[#0C0B09]">Choisir...</option>
              {SECTEURS.map((s) => <option key={s} value={s} className="bg-[#0C0B09]">{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block font-body text-xs font-semibold text-white/50 mb-1.5 uppercase tracking-wider">Qui sont vos clients ? *</label>
            <textarea rows={2} value={form.cible} onChange={(e) => setForm((f) => ({ ...f, cible: e.target.value }))}
              placeholder="Ex : Femmes 25-45 ans, Dakar, revenus moyens, aiment la mode..."
              className="w-full px-4 py-3 rounded-xl font-body text-sm text-white placeholder-white/20 bg-white/[0.06] border border-white/10 focus:outline-none focus:border-[#8B5CF6]/50 transition-colors resize-none" />
          </div>
          <div>
            <label className="block font-body text-xs font-semibold text-white/50 mb-2 uppercase tracking-wider">Objectifs (plusieurs choix)</label>
            <div className="flex flex-wrap gap-2">
              {OBJECTIFS.map((o) => (
                <button key={o} type="button" onClick={() => toggleObjectif(o)}
                  className="px-3 py-1.5 rounded-full font-body text-xs font-medium transition-all"
                  style={form.objectifs.includes(o)
                    ? { background: "#8B5CF6", color: "#fff", border: "1.5px solid #8B5CF6" }
                    : { background: "transparent", color: "rgba(255,255,255,0.5)", border: "1.5px solid rgba(255,255,255,0.12)" }}>
                  {o}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block font-body text-xs font-semibold text-white/50 mb-2 uppercase tracking-wider">Budget publicité mensuel</label>
            <div className="flex flex-wrap gap-2">
              {BUDGETS.map((b) => (
                <button key={b} type="button" onClick={() => setForm((f) => ({ ...f, budget_pub: b }))}
                  className="px-3 py-1.5 rounded-full font-body text-xs font-medium transition-all"
                  style={form.budget_pub === b
                    ? { background: "#C8A84B", color: "#fff", border: "1.5px solid #C8A84B" }
                    : { background: "transparent", color: "rgba(255,255,255,0.5)", border: "1.5px solid rgba(255,255,255,0.12)" }}>
                  {b}
                </button>
              ))}
            </div>
          </div>
        </div>
        {error && <p className="text-red-400 text-sm font-body mb-4 text-center">{error}</p>}
        <button onClick={handleSubmit} disabled={!form.secteur || !form.cible}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-body font-semibold text-sm text-white disabled:opacity-40 transition-all hover:opacity-90"
          style={{ background: "linear-gradient(135deg, #5B21B6, #8B5CF6)" }}>
          <Share2 size={16} /> Trouver mon réseau idéal
        </button>
      </div>
    </div>
  );
}
