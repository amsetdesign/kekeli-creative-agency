"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Loader2, ChevronDown } from "lucide-react";

type ServiceType = "audit" | "planning" | "croissance" | "lancement";

const SERVICE_TYPES: { type: ServiceType; emoji: string; label: string; desc: string }[] = [
  { type: "audit",      emoji: "🔍", label: "Audit & Stratégie réseaux",   desc: "Analyse complète de votre présence digitale actuelle et plan d'action personnalisé par plateforme." },
  { type: "planning",   emoji: "📅", label: "Planning éditorial",          desc: "Calendrier de contenu mensuel optimisé — quoi poster, quand, sur quelle plateforme et dans quel format." },
  { type: "croissance", emoji: "📈", label: "Croissance d'audience",       desc: "Stratégies concrètes pour augmenter vos abonnés, votre engagement et votre portée organique." },
  { type: "lancement",  emoji: "🚀", label: "Stratégie de lancement",      desc: "Plan digital complet pour la sortie de votre prochain single, EP ou album — de J-30 à J+30." },
];

const plateformes = ["Instagram", "TikTok", "YouTube", "Facebook", "Twitter / X", "Spotify", "Boomplay", "Audiomack"];

const genres = [
  "Afrobeats", "Afropop", "Mbalax", "Rap / Hip-Hop", "R&B / Soul",
  "Gospel", "Reggae / Dancehall", "Amapiano", "Pop", "Jazz", "Autre",
];

const pays = [
  "Sénégal", "Côte d'Ivoire", "Mali", "Burkina Faso", "Guinée", "Cameroun",
  "Congo", "Gabon", "Bénin", "Togo", "Niger", "France", "Belgique", "Canada", "Autre",
];

const audienceCibles = [
  "Sénégal uniquement", "Afrique de l'Ouest", "Afrique francophone",
  "Diaspora africaine", "Marché international", "Toutes les cibles",
];

const abonnesActuels = [
  "Moins de 1 000", "1 000 – 5 000", "5 000 – 20 000",
  "20 000 – 100 000", "Plus de 100 000",
];

interface FormData {
  nomArtiste: string;
  email: string;
  telephone: string;
  paysResidence: string;
  genre: string;
  services: ServiceType[];
  plateformesActives: string[];
  abonnesInstagram: string;
  abonnesTiktok: string;
  abonnesYoutube: string;
  audienceCible: string;
  projetEnCours: string;
  dateLancement: string;
  problematique: string;
  objectifChiffre: string;
  delaiSouhaite: string;
  message: string;
}

const initial: FormData = {
  nomArtiste: "", email: "", telephone: "", paysResidence: "", genre: "",
  services: [],
  plateformesActives: [],
  abonnesInstagram: "", abonnesTiktok: "", abonnesYoutube: "",
  audienceCible: "",
  projetEnCours: "", dateLancement: "",
  problematique: "", objectifChiffre: "",
  delaiSouhaite: "", message: "",
};

const ACCENT = "#4C9BFF";
const inputStyle = { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" };
const inputCls = "w-full px-4 py-3 rounded-xl font-body text-sm text-white placeholder-white/30 outline-none transition-colors focus:ring-1 focus:ring-blue-400/60";

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${inputCls} ${props.className ?? ""}`} style={inputStyle} />;
}
function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${inputCls} resize-none ${props.className ?? ""}`} style={inputStyle} />;
}
function Select({ children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select {...props} className={`${inputCls} appearance-none pr-9`} style={{ ...inputStyle, color: props.value ? "white" : "rgba(255,255,255,0.30)" }}>
        {children}
      </select>
      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "rgba(255,255,255,0.40)" }} />
    </div>
  );
}
function Field({ label, required, hint, children, className }: { label: string; required?: boolean; hint?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <label className="block font-body text-sm font-medium text-white mb-1.5">
        {label} {required && <span style={{ color: "#93C5FD" }}>*</span>}
      </label>
      {hint && <p className="font-body text-xs mb-2" style={{ color: "rgba(220,210,255,0.45)" }}>{hint}</p>}
      {children}
    </div>
  );
}

export default function StrategieForm() {
  const [form, setForm] = useState<FormData>(initial);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const set = (key: keyof FormData, value: FormData[keyof FormData]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const toggleService = (s: ServiceType) =>
    setForm((f) => ({ ...f, services: f.services.includes(s) ? f.services.filter((x) => x !== s) : [...f.services, s] }));

  const togglePlatforme = (p: string) =>
    setForm((f) => ({ ...f, plateformesActives: f.plateformesActives.includes(p) ? f.plateformesActives.filter((x) => x !== p) : [...f.plateformesActives, p] }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/strategie/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("Une erreur est survenue. Réessayez ou contactez-nous sur WhatsApp.");
    }
  };

  if (status === "success") {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-20 px-8">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "rgba(76,155,255,0.15)" }}>
          <CheckCircle size={36} style={{ color: ACCENT }} />
        </div>
        <h3 className="font-display text-3xl text-white mb-3">Brief reçu !</h3>
        <p className="font-body text-base mb-2" style={{ color: "rgba(220,210,255,0.65)" }}>
          Nous avons bien reçu votre demande de stratégie digitale.
        </p>
        <p className="font-body text-sm" style={{ color: "rgba(220,210,255,0.45)" }}>
          Notre équipe vous contacte dans les <strong style={{ color: ACCENT }}>24h</strong> avec votre plan d'action personnalisé.
        </p>
      </motion.div>
    );
  }

  const showLancement = form.services.includes("lancement");

  return (
    <form onSubmit={handleSubmit} className="space-y-10">

      {/* ── 1. Services ──────────────────────── */}
      <div>
        <h3 className="font-body font-bold text-lg text-white mb-1">Quel service vous intéresse ?</h3>
        <p className="font-body text-xs mb-4" style={{ color: "rgba(220,210,255,0.45)" }}>Sélectionnez un ou plusieurs services</p>
        <div className="grid grid-cols-1 gap-3">
          {SERVICE_TYPES.map(({ type, emoji, label, desc }) => {
            const selected = form.services.includes(type);
            return (
              <button key={type} type="button" onClick={() => toggleService(type)}
                className="flex items-start gap-3 p-4 rounded-2xl text-left transition-all"
                style={selected
                  ? { background: "rgba(76,155,255,0.14)", border: `2px solid ${ACCENT}`, boxShadow: "0 4px 20px rgba(76,155,255,0.20)" }
                  : { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.10)" }}>
                <span className="text-2xl shrink-0 mt-0.5">{emoji}</span>
                <div>
                  <p className="font-body font-semibold text-sm text-white mb-0.5">{label}</p>
                  <p className="font-body text-xs leading-relaxed" style={{ color: "rgba(220,210,255,0.55)" }}>{desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── 2. Informations artiste ─────────── */}
      <div>
        <h3 className="font-body font-bold text-lg text-white mb-4">Vos informations</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Nom d'artiste" required>
            <Input value={form.nomArtiste} onChange={(e) => set("nomArtiste", e.target.value)} placeholder="Ex: Youssou Ndour" required />
          </Field>
          <Field label="Email" required>
            <Input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="artiste@email.com" required />
          </Field>
          <Field label="Téléphone / WhatsApp">
            <Input value={form.telephone} onChange={(e) => set("telephone", e.target.value)} placeholder="+221 77 000 00 00" />
          </Field>
          <Field label="Pays de résidence">
            <Select value={form.paysResidence} onChange={(e) => set("paysResidence", e.target.value)}>
              <option value="" disabled>Sélectionner votre pays</option>
              {pays.map((p) => <option key={p} value={p} style={{ background: "#1C0A40", color: "white" }}>{p}</option>)}
            </Select>
          </Field>
          <Field label="Genre musical" className="sm:col-span-2">
            <Select value={form.genre} onChange={(e) => set("genre", e.target.value)}>
              <option value="" disabled>Sélectionner votre genre</option>
              {genres.map((g) => <option key={g} value={g} style={{ background: "#1C0A40", color: "white" }}>{g}</option>)}
            </Select>
          </Field>
        </div>
      </div>

      {/* ── 3. Présence digitale actuelle ────── */}
      <div>
        <h3 className="font-body font-bold text-lg text-white mb-4">Votre présence digitale actuelle</h3>
        <div className="space-y-4">
          <Field label="Plateformes sur lesquelles vous êtes actif">
            <div className="flex flex-wrap gap-2">
              {plateformes.map((p) => (
                <button key={p} type="button" onClick={() => togglePlatforme(p)}
                  className="px-3 py-1.5 rounded-full font-body text-xs font-medium transition-all"
                  style={form.plateformesActives.includes(p)
                    ? { background: "rgba(76,155,255,0.18)", color: ACCENT, border: `1px solid ${ACCENT}` }
                    : { background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.10)" }}>
                  {p}
                </button>
              ))}
            </div>
          </Field>
          <div className="grid sm:grid-cols-3 gap-4">
            <Field label="Abonnés Instagram">
              <Select value={form.abonnesInstagram} onChange={(e) => set("abonnesInstagram", e.target.value)}>
                <option value="" disabled>Sélectionner</option>
                {abonnesActuels.map((a) => <option key={a} value={a} style={{ background: "#1C0A40", color: "white" }}>{a}</option>)}
              </Select>
            </Field>
            <Field label="Abonnés TikTok">
              <Select value={form.abonnesTiktok} onChange={(e) => set("abonnesTiktok", e.target.value)}>
                <option value="" disabled>Sélectionner</option>
                {abonnesActuels.map((a) => <option key={a} value={a} style={{ background: "#1C0A40", color: "white" }}>{a}</option>)}
              </Select>
            </Field>
            <Field label="Abonnés YouTube">
              <Select value={form.abonnesYoutube} onChange={(e) => set("abonnesYoutube", e.target.value)}>
                <option value="" disabled>Sélectionner</option>
                {abonnesActuels.map((a) => <option key={a} value={a} style={{ background: "#1C0A40", color: "white" }}>{a}</option>)}
              </Select>
            </Field>
          </div>
          <Field label="Audience cible principale">
            <div className="flex flex-wrap gap-2">
              {audienceCibles.map((a) => (
                <button key={a} type="button" onClick={() => set("audienceCible", a)}
                  className="px-3 py-1.5 rounded-full font-body text-xs font-medium transition-all"
                  style={form.audienceCible === a
                    ? { background: "rgba(76,155,255,0.18)", color: ACCENT, border: `1px solid ${ACCENT}` }
                    : { background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.10)" }}>
                  {a}
                </button>
              ))}
            </div>
          </Field>
        </div>
      </div>

      {/* ── 4. Projet & Objectif ──────────────── */}
      <div>
        <h3 className="font-body font-bold text-lg text-white mb-4">Votre projet</h3>
        <div className="space-y-4">
          <Field label="Projet en cours ou à venir" hint="Single, EP, album, concert, collaboration...">
            <Input value={form.projetEnCours} onChange={(e) => set("projetEnCours", e.target.value)}
              placeholder="Ex: Je sors un single en juillet et un EP en décembre..." />
          </Field>
          {showLancement && (
            <Field label="Date de lancement prévue">
              <Input type="date" value={form.dateLancement} onChange={(e) => set("dateLancement", e.target.value)} />
            </Field>
          )}
          <Field label="Votre problématique principale" required hint="Qu'est-ce qui ne fonctionne pas en ce moment sur vos réseaux ?">
            <Textarea rows={4} value={form.problematique} onChange={(e) => set("problematique", e.target.value)}
              placeholder="Ex: Je poste régulièrement mais je n'arrive pas à gagner d'abonnés. Mon engagement baisse depuis 3 mois. Je ne sais pas quoi poster ni à quelle heure..." required />
          </Field>
          <Field label="Objectif chiffré à 3 mois" hint="Soyez précis — un objectif chiffré se travaille mieux">
            <Input value={form.objectifChiffre} onChange={(e) => set("objectifChiffre", e.target.value)}
              placeholder="Ex: Passer de 2 000 à 10 000 abonnés Instagram, atteindre 50k vues sur mon prochain clip..." />
          </Field>
        </div>
      </div>

      {/* ── 5. Délai ────────────────────────── */}
      <Field label="Quand souhaitez-vous démarrer ?">
        <Select value={form.delaiSouhaite} onChange={(e) => set("delaiSouhaite", e.target.value)}>
          <option value="" disabled>Sélectionner</option>
          {["Immédiatement", "Dans 2 à 4 semaines", "Dans 1 à 2 mois", "Dans 3 à 6 mois"].map((d) => (
            <option key={d} value={d} style={{ background: "#1C0A40", color: "white" }}>{d}</option>
          ))}
        </Select>
      </Field>

      {/* ── 6. Message ──────────────────────── */}
      <div>
        <h3 className="font-body font-bold text-lg text-white mb-4">Informations complémentaires</h3>
        <Textarea rows={4} value={form.message} onChange={(e) => set("message", e.target.value)}
          placeholder="Budget indicatif, outils que vous utilisez déjà (Later, Canva...), contraintes de temps, questions sur notre méthode..." />
      </div>

      {status === "error" && <p className="font-body text-sm text-red-400 text-center">{errorMsg}</p>}

      <button type="submit" disabled={status === "loading" || form.services.length === 0 || !form.nomArtiste || !form.email}
        className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-body font-bold text-base text-white transition-all disabled:opacity-50 hover:scale-[1.02]"
        style={{ background: "linear-gradient(135deg, #4C9BFF 0%, #1D6FD8 100%)", boxShadow: "0 8px 30px rgba(76,155,255,0.35)" }}>
        {status === "loading"
          ? <><Loader2 size={18} className="animate-spin" /> Envoi en cours...</>
          : "Envoyer mon brief →"}
      </button>

      <p className="text-center font-body text-xs" style={{ color: "rgba(220,210,255,0.35)" }}>
        Audit gratuit · Devis personnalisé sous 24h
      </p>
    </form>
  );
}
