"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

const BESOINS = [
  "Logo & Branding", "Site Web", "Community Management", "Publicité (Ads)",
  "Stratégie Digitale", "Photo & Vidéo", "Accompagnement", "E-commerce",
];
const BUDGETS = ["< 200 000 FCFA", "200 000 – 500 000 FCFA", "500 000 – 1 M FCFA", "> 1 M FCFA", "À définir"];
const SECTEURS = ["Commerce / Retail", "Restauration / Food", "Services BtoB", "Formation / Éducation", "Santé / Bien-être", "Mode & Beauté", "Immobilier", "Événementiel", "Tech / Digital", "Autre"];

export default function EntreprisesForm() {
  const [form, setForm] = useState({
    nom_entreprise: "", secteur: "", email: "", telephone: "",
    besoins: [] as string[], budget: "", description: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const toggleBesoin = (b: string) =>
    setForm((f) => ({ ...f, besoins: f.besoins.includes(b) ? f.besoins.filter((x) => x !== b) : [...f.besoins, b] }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nom_entreprise || !form.email || form.besoins.length === 0) {
      setError("Veuillez renseigner le nom, l'email et au moins un besoin.");
      return;
    }
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/entreprises/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
      setError("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  if (status === "success") {
    return (
      <section id="contact" className="py-24 bg-[#0C0B09]">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="w-16 h-16 rounded-full bg-[#059669]/15 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={32} className="text-[#059669]" />
          </div>
          <h3 className="font-display text-3xl text-white mb-3">Message envoyé !</h3>
          <p className="font-body text-white/50">Nous vous répondons dans les 24h. À très bientôt !</p>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-24 bg-[#0C0B09]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest uppercase rounded-full mb-4"
            style={{ color: "#0EA5E9", border: "1px solid rgba(14,165,233,0.3)", background: "rgba(14,165,233,0.08)" }}>
            Brief Entreprise
          </span>
          <h2 className="font-display text-4xl text-white mb-3">
            Parlons de votre <em className="not-italic" style={{ color: "#0EA5E9" }}>projet</em>
          </h2>
          <p className="font-body text-white/45 text-sm">Réponse garantie sous 24h</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-body text-xs font-semibold text-white/50 mb-1.5 uppercase tracking-wider">Nom de l'entreprise *</label>
              <input
                value={form.nom_entreprise}
                onChange={(e) => setForm((f) => ({ ...f, nom_entreprise: e.target.value }))}
                placeholder="Ex : Boutique Mariama"
                className="w-full px-4 py-3 rounded-xl font-body text-sm text-white placeholder-white/20 bg-white/[0.06] border border-white/10 focus:outline-none focus:border-[#C8A84B]/50 transition-colors"
              />
            </div>
            <div>
              <label className="block font-body text-xs font-semibold text-white/50 mb-1.5 uppercase tracking-wider">Secteur d'activité</label>
              <select
                value={form.secteur}
                onChange={(e) => setForm((f) => ({ ...f, secteur: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl font-body text-sm text-white bg-white/[0.06] border border-white/10 focus:outline-none focus:border-[#C8A84B]/50 transition-colors"
              >
                <option value="" className="bg-[#0C0B09]">Choisir...</option>
                {SECTEURS.map((s) => <option key={s} value={s} className="bg-[#0C0B09]">{s}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-body text-xs font-semibold text-white/50 mb-1.5 uppercase tracking-wider">Email *</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                placeholder="votre@email.com"
                className="w-full px-4 py-3 rounded-xl font-body text-sm text-white placeholder-white/20 bg-white/[0.06] border border-white/10 focus:outline-none focus:border-[#C8A84B]/50 transition-colors"
              />
            </div>
            <div>
              <label className="block font-body text-xs font-semibold text-white/50 mb-1.5 uppercase tracking-wider">Téléphone</label>
              <input
                value={form.telephone}
                onChange={(e) => setForm((f) => ({ ...f, telephone: e.target.value }))}
                placeholder="+221 XX XXX XX XX"
                className="w-full px-4 py-3 rounded-xl font-body text-sm text-white placeholder-white/20 bg-white/[0.06] border border-white/10 focus:outline-none focus:border-[#C8A84B]/50 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block font-body text-xs font-semibold text-white/50 mb-2 uppercase tracking-wider">Vos besoins * (plusieurs choix)</label>
            <div className="flex flex-wrap gap-2">
              {BESOINS.map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => toggleBesoin(b)}
                  className="px-3 py-1.5 rounded-full font-body text-xs font-medium transition-all duration-150"
                  style={form.besoins.includes(b)
                    ? { background: "#C8A84B", color: "#000", border: "1.5px solid #C8A84B" }
                    : { background: "transparent", color: "rgba(255,255,255,0.5)", border: "1.5px solid rgba(255,255,255,0.12)" }}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-body text-xs font-semibold text-white/50 mb-1.5 uppercase tracking-wider">Budget envisagé</label>
            <div className="flex flex-wrap gap-2">
              {BUDGETS.map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, budget: b }))}
                  className="px-3 py-1.5 rounded-full font-body text-xs font-medium transition-all duration-150"
                  style={form.budget === b
                    ? { background: "#C8A84B", color: "#fff", border: "1.5px solid #C8A84B" }
                    : { background: "transparent", color: "rgba(255,255,255,0.5)", border: "1.5px solid rgba(255,255,255,0.12)" }}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-body text-xs font-semibold text-white/50 mb-1.5 uppercase tracking-wider">Décrivez votre projet</label>
            <textarea
              rows={4}
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              placeholder="Parlez-nous de votre entreprise, vos objectifs, vos défis..."
              className="w-full px-4 py-3 rounded-xl font-body text-sm text-white placeholder-white/20 bg-white/[0.06] border border-white/10 focus:outline-none focus:border-[#C8A84B]/50 transition-colors resize-none"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-400 text-sm font-body">
              <AlertCircle size={15} />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-body font-semibold text-sm text-black transition-all duration-200 hover:opacity-90 disabled:opacity-60"
            style={{ background: "linear-gradient(135deg, #C8A84B, #D4A83A)" }}
          >
            {status === "loading" ? <><Loader2 size={16} className="animate-spin" /> Envoi en cours...</> : <><Send size={16} /> Envoyer ma demande</>}
          </button>
        </form>
      </div>
    </section>
  );
}
