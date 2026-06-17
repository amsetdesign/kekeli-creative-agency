"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Loader2, ChevronDown } from "lucide-react";

type ProfileType = "coach" | "pDG" | "politicien" | "entrepreneur" | "influenceur" | "sportif" | "media" | "autre";
type ServiceType = "personal-branding" | "image-digitale" | "strategie-influence" | "gestion-reputation";

const PROFILE_TYPES: { type: ProfileType; emoji: string; label: string }[] = [
  { type: "coach",        emoji: "🎯", label: "Coach / Formateur" },
  { type: "pDG",         emoji: "🏢", label: "PDG / Dirigeant" },
  { type: "politicien",  emoji: "🏛️", label: "Politicien / Leader" },
  { type: "entrepreneur",emoji: "🚀", label: "Entrepreneur" },
  { type: "influenceur", emoji: "📱", label: "Influenceur / Créateur" },
  { type: "sportif",     emoji: "⚡", label: "Sportif Professionnel" },
  { type: "media",       emoji: "🎙️", label: "Personnalité Médiatique" },
  { type: "autre",       emoji: "✨", label: "Autre" },
];

const SERVICES: { type: ServiceType; emoji: string; label: string; desc: string }[] = [
  { type: "personal-branding",     emoji: "🎨", label: "Personal Branding",       desc: "Logo, monogramme, charte graphique personnelle" },
  { type: "image-digitale",        emoji: "📸", label: "Image Digitale",           desc: "Bio optimisée, photo officielle, profils harmonisés" },
  { type: "strategie-influence",   emoji: "📈", label: "Stratégie d'Influence",    desc: "Ligne éditoriale, calendrier contenu, positionnement" },
  { type: "gestion-reputation",    emoji: "🛡️", label: "Gestion de Réputation",   desc: "Monitoring, crise, community management VIP" },
];

const PLATFORMS = ["Instagram", "LinkedIn", "YouTube", "TikTok", "Twitter / X", "Facebook", "Site web", "Toutes"];

const FOLLOWER_RANGES = [
  "Moins de 1 000",
  "1 000 — 10 000",
  "10 000 — 50 000",
  "50 000 — 200 000",
  "200 000 — 1 million",
  "Plus de 1 million",
];

const PAYS = [
  "Sénégal", "Côte d'Ivoire", "Mali", "Burkina Faso", "Guinée", "Cameroun",
  "Congo", "Gabon", "Bénin", "Togo", "Niger", "France", "Belgique", "Canada", "Autre",
];

interface FormData {
  nom: string;
  email: string;
  telephone: string;
  pays: string;
  profileType: ProfileType | "";
  services: ServiceType[];
  platforms: string[];
  followersRange: string;
  objectif: string;
  delai: string;
  message: string;
}

const initial: FormData = {
  nom: "", email: "", telephone: "", pays: "",
  profileType: "",
  services: [],
  platforms: [],
  followersRange: "",
  objectif: "",
  delai: "",
  message: "",
};

const inputStyle = { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" };
const ACCENT = "#10B981";

export default function PersonnalitesForm() {
  const [form, setForm] = useState<FormData>(initial);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const toggle = <T extends string>(arr: T[], val: T): T[] =>
    arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nom || !form.email || !form.profileType || form.services.length === 0) {
      setError("Veuillez remplir au moins : nom, email, profil et services souhaités.");
      return;
    }
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/personnalites/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Erreur serveur");
      setStatus("success");
    } catch {
      setStatus("error");
      setError("Une erreur est survenue. Veuillez réessayer ou nous contacter directement.");
    }
  };

  if (status === "success") {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: `${ACCENT}22` }}>
          <CheckCircle size={32} style={{ color: ACCENT }} />
        </div>
        <h3 className="font-display text-2xl text-white mb-2">Demande reçue !</h3>
        <p className="font-body text-sm" style={{ color: "rgba(255,255,255,0.60)" }}>
          Notre équipe revient vers vous dans les <strong className="text-white">24 heures</strong> avec une proposition personnalisée.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Profil */}
      <div>
        <label className="font-body text-xs font-semibold uppercase tracking-[0.15em] mb-3 block" style={{ color: ACCENT }}>
          Votre profil *
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {PROFILE_TYPES.map(({ type, emoji, label }) => (
            <button
              key={type}
              type="button"
              onClick={() => setForm((f) => ({ ...f, profileType: type }))}
              className="flex flex-col items-center gap-1.5 p-3 rounded-xl font-body text-xs font-medium transition-all"
              style={
                form.profileType === type
                  ? { background: `${ACCENT}22`, border: `1px solid ${ACCENT}`, color: ACCENT }
                  : { ...inputStyle, color: "rgba(255,255,255,0.60)" }
              }
            >
              <span className="text-lg">{emoji}</span>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Services */}
      <div>
        <label className="font-body text-xs font-semibold uppercase tracking-[0.15em] mb-3 block" style={{ color: ACCENT }}>
          Services souhaités * (plusieurs possibles)
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {SERVICES.map(({ type, emoji, label, desc }) => (
            <button
              key={type}
              type="button"
              onClick={() => setForm((f) => ({ ...f, services: toggle(f.services, type) }))}
              className="flex items-start gap-3 p-3 rounded-xl text-left transition-all"
              style={
                form.services.includes(type)
                  ? { background: `${ACCENT}22`, border: `1px solid ${ACCENT}` }
                  : { ...inputStyle }
              }
            >
              <span className="text-xl shrink-0 mt-0.5">{emoji}</span>
              <div>
                <p className="font-body text-xs font-semibold text-white">{label}</p>
                <p className="font-body text-[11px]" style={{ color: "rgba(255,255,255,0.45)" }}>{desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Infos personnelles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[
          { id: "nom",       label: "Nom complet *",    placeholder: "Votre nom ou nom de scène",     type: "text" },
          { id: "email",     label: "Email *",           placeholder: "votre@email.com",               type: "email" },
          { id: "telephone", label: "Téléphone",         placeholder: "+221 XX XXX XX XX",             type: "tel" },
        ].map(({ id, label, placeholder, type }) => (
          <div key={id} className={id === "nom" ? "sm:col-span-2" : ""}>
            <label className="font-body text-xs text-white/60 mb-1.5 block">{label}</label>
            <input
              type={type}
              placeholder={placeholder}
              value={form[id as keyof FormData] as string}
              onChange={(e) => setForm((f) => ({ ...f, [id]: e.target.value }))}
              className="w-full rounded-xl px-4 py-3 font-body text-sm text-white placeholder-white/30 outline-none focus:ring-1 transition-all"
              style={{ ...inputStyle, outline: "none" }}
              onFocus={(e) => (e.target.style.borderColor = ACCENT)}
              onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.12)")}
            />
          </div>
        ))}

        {/* Pays */}
        <div>
          <label className="font-body text-xs text-white/60 mb-1.5 block">Pays de résidence</label>
          <div className="relative">
            <select
              value={form.pays}
              onChange={(e) => setForm((f) => ({ ...f, pays: e.target.value }))}
              className="w-full rounded-xl px-4 py-3 font-body text-sm text-white appearance-none outline-none transition-all"
              style={{ ...inputStyle }}
            >
              <option value="" style={{ background: "#0C0B09" }}>Choisir un pays</option>
              {PAYS.map((p) => <option key={p} value={p} style={{ background: "#0C0B09" }}>{p}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "rgba(255,255,255,0.40)" }} />
          </div>
        </div>

        {/* Audience */}
        <div>
          <label className="font-body text-xs text-white/60 mb-1.5 block">Taille de votre audience</label>
          <div className="relative">
            <select
              value={form.followersRange}
              onChange={(e) => setForm((f) => ({ ...f, followersRange: e.target.value }))}
              className="w-full rounded-xl px-4 py-3 font-body text-sm text-white appearance-none outline-none transition-all"
              style={{ ...inputStyle }}
            >
              <option value="" style={{ background: "#0C0B09" }}>Nombre d&apos;abonnés</option>
              {FOLLOWER_RANGES.map((r) => <option key={r} value={r} style={{ background: "#0C0B09" }}>{r}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "rgba(255,255,255,0.40)" }} />
          </div>
        </div>
      </div>

      {/* Plateformes */}
      <div>
        <label className="font-body text-xs text-white/60 mb-2 block">Vos plateformes actives</label>
        <div className="flex flex-wrap gap-2">
          {PLATFORMS.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setForm((f) => ({ ...f, platforms: toggle(f.platforms, p) }))}
              className="px-3 py-1.5 rounded-full font-body text-xs font-medium transition-all"
              style={
                form.platforms.includes(p)
                  ? { background: `${ACCENT}22`, border: `1px solid ${ACCENT}`, color: ACCENT }
                  : { ...inputStyle, color: "rgba(255,255,255,0.55)" }
              }
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Objectif + Délai */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="font-body text-xs text-white/60 mb-1.5 block">Objectif principal</label>
          <div className="relative">
            <select
              value={form.objectif}
              onChange={(e) => setForm((f) => ({ ...f, objectif: e.target.value }))}
              className="w-full rounded-xl px-4 py-3 font-body text-sm text-white appearance-none outline-none transition-all"
              style={{ ...inputStyle }}
            >
              <option value="" style={{ background: "#0C0B09" }}>Choisir un objectif</option>
              {["Développer ma notoriété", "Attirer plus de clients/mandats", "Lancer ma marque personnelle", "Améliorer mon image existante", "Monétiser mon audience", "Gestion de crise", "Autre"].map((o) =>
                <option key={o} value={o} style={{ background: "#0C0B09" }}>{o}</option>
              )}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "rgba(255,255,255,0.40)" }} />
          </div>
        </div>
        <div>
          <label className="font-body text-xs text-white/60 mb-1.5 block">Délai souhaité</label>
          <div className="relative">
            <select
              value={form.delai}
              onChange={(e) => setForm((f) => ({ ...f, delai: e.target.value }))}
              className="w-full rounded-xl px-4 py-3 font-body text-sm text-white appearance-none outline-none transition-all"
              style={{ ...inputStyle }}
            >
              <option value="" style={{ background: "#0C0B09" }}>Dans combien de temps ?</option>
              {["Urgent (< 1 semaine)", "Dans 2 semaines", "Dans 1 mois", "Dans 2–3 mois", "Pas de délai précis"].map((d) =>
                <option key={d} value={d} style={{ background: "#0C0B09" }}>{d}</option>
              )}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "rgba(255,255,255,0.40)" }} />
          </div>
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="font-body text-xs text-white/60 mb-1.5 block">Parlez-nous de vous (facultatif)</label>
        <textarea
          rows={3}
          placeholder="Votre activité, vos ambitions, ce que vous souhaitez accomplir avec votre image..."
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          className="w-full rounded-xl px-4 py-3 font-body text-sm text-white placeholder-white/30 resize-none outline-none transition-all"
          style={{ ...inputStyle }}
          onFocus={(e) => (e.target.style.borderColor = ACCENT)}
          onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.12)")}
        />
      </div>

      <AnimatePresence>
        {error && (
          <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="font-body text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-full font-body font-bold text-base text-black transition-all hover:scale-[1.02] disabled:opacity-60"
        style={{ background: `linear-gradient(135deg, ${ACCENT} 0%, #059669 100%)`, boxShadow: `0 8px 30px ${ACCENT}40` }}
      >
        {status === "loading" ? <><Loader2 size={18} className="animate-spin" /> Envoi en cours…</> : "Demander une consultation gratuite"}
      </button>

      <p className="font-body text-[11px] text-center" style={{ color: "rgba(255,255,255,0.30)" }}>
        Réponse sous 24h · Confidentiel · Sans engagement
      </p>
    </form>
  );
}
