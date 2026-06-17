"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Loader2, ChevronDown } from "lucide-react";

type ServiceType = "univers" | "scenographie" | "coaching" | "coordination";

const SERVICE_TYPES: { type: ServiceType; emoji: string; label: string; desc: string }[] = [
  { type: "univers",       emoji: "🌌", label: "Développement de l'univers artistique", desc: "Définir votre concept global, votre storytelling et votre positionnement unique dans le paysage musical." },
  { type: "scenographie",  emoji: "🎪", label: "Scénographie & Concerts",              desc: "Mise en scène de vos performances live : lumières, décors, entrées scène, chorégraphies et storytelling." },
  { type: "coaching",      emoji: "🪞", label: "Coaching Image & Posture",              desc: "Travailler votre présence scénique, votre style vestimentaire et votre communication publique." },
  { type: "coordination",  emoji: "🎯", label: "Coordination des équipes créatives",    desc: "Direction de vos photographes, réalisateurs, stylistes et graphistes pour un résultat cohérent." },
];

const niveaux = [
  "Je débute ma carrière", "J'ai quelques sorties mais je veux structurer mon image",
  "J'ai déjà une base mais je veux évoluer", "Je suis établi et je veux renouveler mon univers",
];

const genres = [
  "Afrobeats", "Afropop", "Mbalax", "Rap / Hip-Hop", "R&B / Soul",
  "Gospel", "Reggae / Dancehall", "Amapiano", "Pop", "Jazz", "Autre",
];

const pays = [
  "Sénégal", "Côte d'Ivoire", "Mali", "Burkina Faso", "Guinée", "Cameroun",
  "Congo", "Gabon", "Bénin", "Togo", "Niger", "France", "Belgique", "Canada", "Autre",
];

const objectifs = [
  "Préparer un concert / tournée", "Lancer un nouvel album / projet",
  "Refondre complètement mon image", "Me démarquer dans mon genre musical",
  "Développer ma présence scénique", "Créer une cohérence visuelle totale",
];

interface FormData {
  nomArtiste: string;
  email: string;
  telephone: string;
  paysResidence: string;
  genre: string;
  services: ServiceType[];
  niveauCarriere: string;
  objectifPrincipal: string;
  descriptionProjet: string;
  referencesArtistes: string;
  universActuel: string;
  evenement: string;
  delaiSouhaite: string;
  message: string;
}

const initial: FormData = {
  nomArtiste: "", email: "", telephone: "", paysResidence: "", genre: "",
  services: [],
  niveauCarriere: "", objectifPrincipal: "",
  descriptionProjet: "", referencesArtistes: "", universActuel: "",
  evenement: "", delaiSouhaite: "", message: "",
};

const ACCENT = "#7C3AED";
const inputStyle = { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" };
const inputCls = "w-full px-4 py-3 rounded-xl font-body text-sm text-white placeholder-white/30 outline-none transition-colors focus:ring-1 focus:ring-violet-500/60";

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
        {label} {required && <span style={{ color: "#A78BFA" }}>*</span>}
      </label>
      {hint && <p className="font-body text-xs mb-2" style={{ color: "rgba(220,210,255,0.45)" }}>{hint}</p>}
      {children}
    </div>
  );
}

export default function DirectionForm() {
  const [form, setForm] = useState<FormData>(initial);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const set = (key: keyof FormData, value: FormData[keyof FormData]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const toggleService = (s: ServiceType) =>
    setForm((f) => ({
      ...f,
      services: f.services.includes(s) ? f.services.filter((x) => x !== s) : [...f.services, s],
    }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/direction/contact", {
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
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "rgba(124,58,237,0.15)" }}>
          <CheckCircle size={36} style={{ color: "#A78BFA" }} />
        </div>
        <h3 className="font-display text-3xl text-white mb-3">Demande reçue !</h3>
        <p className="font-body text-base mb-2" style={{ color: "rgba(220,210,255,0.65)" }}>
          Nous avons bien reçu votre brief de direction artistique.
        </p>
        <p className="font-body text-sm" style={{ color: "rgba(220,210,255,0.45)" }}>
          Notre directeur artistique vous contacte dans les <strong style={{ color: "#A78BFA" }}>24h</strong>.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">

      {/* ── 1. Services souhaités ─────────── */}
      <div>
        <h3 className="font-body font-bold text-lg text-white mb-1">De quoi avez-vous besoin ?</h3>
        <p className="font-body text-xs mb-4" style={{ color: "rgba(220,210,255,0.45)" }}>Sélectionnez un ou plusieurs services</p>
        <div className="grid grid-cols-1 gap-3">
          {SERVICE_TYPES.map(({ type, emoji, label, desc }) => {
            const selected = form.services.includes(type);
            return (
              <button key={type} type="button" onClick={() => toggleService(type)}
                className="flex items-start gap-3 p-4 rounded-2xl text-left transition-all"
                style={selected
                  ? { background: "rgba(124,58,237,0.18)", border: `2px solid ${ACCENT}`, boxShadow: "0 4px 20px rgba(124,58,237,0.25)" }
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

      {/* ── 3. Situation & Objectif ──────────── */}
      <div>
        <h3 className="font-body font-bold text-lg text-white mb-4">Votre situation actuelle</h3>
        <div className="space-y-4">
          <Field label="Où en êtes-vous dans votre carrière ?">
            <div className="flex flex-col gap-2">
              {niveaux.map((n) => (
                <button key={n} type="button" onClick={() => set("niveauCarriere", n)}
                  className="flex items-center gap-3 p-3 rounded-xl text-left transition-all font-body text-xs"
                  style={form.niveauCarriere === n
                    ? { background: "rgba(124,58,237,0.18)", border: `1px solid ${ACCENT}`, color: "white" }
                    : { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.10)", color: "rgba(255,255,255,0.65)" }}>
                  <span className="w-3 h-3 rounded-full shrink-0 border-2 flex items-center justify-center"
                    style={{ borderColor: form.niveauCarriere === n ? ACCENT : "rgba(255,255,255,0.30)" }}>
                    {form.niveauCarriere === n && <span className="w-1.5 h-1.5 rounded-full" style={{ background: ACCENT }} />}
                  </span>
                  {n}
                </button>
              ))}
            </div>
          </Field>
          <Field label="Votre objectif principal">
            <div className="flex flex-wrap gap-2">
              {objectifs.map((o) => (
                <button key={o} type="button" onClick={() => set("objectifPrincipal", o)}
                  className="px-3 py-1.5 rounded-full font-body text-xs font-medium transition-all"
                  style={form.objectifPrincipal === o
                    ? { background: "rgba(124,58,237,0.20)", color: "#A78BFA", border: `1px solid ${ACCENT}` }
                    : { background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.10)" }}>
                  {o}
                </button>
              ))}
            </div>
          </Field>
        </div>
      </div>

      {/* ── 4. Projet & Références ──────────── */}
      <div>
        <h3 className="font-body font-bold text-lg text-white mb-4">Votre projet</h3>
        <div className="space-y-4">
          <Field label="Décrivez votre projet ou votre besoin" required hint="Plus vous êtes précis, mieux on peut vous accompagner">
            <Textarea rows={5} value={form.descriptionProjet} onChange={(e) => set("descriptionProjet", e.target.value)}
              placeholder="Ex: Je prépare la sortie de mon premier album en septembre. Je veux développer un univers visuel cohérent entre ma musique et mon image (clip, shooting, réseaux). Je cherche quelqu'un pour coordonner tout ça..." required />
          </Field>
          <Field label="Événement ou deadline précise" hint="Concert, sortie d'album, tournée, interview média...">
            <Input value={form.evenement} onChange={(e) => set("evenement", e.target.value)}
              placeholder="Ex: Concert au Grand Théâtre le 15 octobre 2026" />
          </Field>
          <Field label="Références artistiques" hint="Artistes dont vous aimez la direction artistique, le style ou l'univers">
            <Textarea rows={3} value={form.referencesArtistes} onChange={(e) => set("referencesArtistes", e.target.value)}
              placeholder="Ex: J'aime l'univers mystique de The Weeknd, la cohérence visuelle de Burna Boy, et l'élégance scénique de Stromae..." />
          </Field>
          <Field label="Décrivez votre univers actuel" hint="Ce que vous faites déjà, ce qui fonctionne, ce que vous voulez changer">
            <Textarea rows={3} value={form.universActuel} onChange={(e) => set("universActuel", e.target.value)}
              placeholder="Ex: Pour l'instant j'ai un logo mais pas de charte graphique. Mes photos sont faites par des amis. Je veux quelque chose de plus professionnel et cohérent..." />
          </Field>
        </div>
      </div>

      {/* ── 5. Délai ────────────────────────── */}
      <div>
        <h3 className="font-body font-bold text-lg text-white mb-4">Délai & Urgence</h3>
        <Field label="Quand souhaitez-vous démarrer ?">
          <Select value={form.delaiSouhaite} onChange={(e) => set("delaiSouhaite", e.target.value)}>
            <option value="" disabled>Sélectionner</option>
            {["Immédiatement", "Dans 2 à 4 semaines", "Dans 1 à 2 mois", "Dans 3 à 6 mois", "Pas de deadline précise"].map((d) => (
              <option key={d} value={d} style={{ background: "#1C0A40", color: "white" }}>{d}</option>
            ))}
          </Select>
        </Field>
      </div>

      {/* ── 6. Message ──────────────────────── */}
      <div>
        <h3 className="font-body font-bold text-lg text-white mb-4">Questions ou précisions</h3>
        <Textarea rows={4} value={form.message} onChange={(e) => set("message", e.target.value)}
          placeholder="Budget indicatif, questions sur notre méthode de travail, contraintes particulières, collaborations en cours..." />
      </div>

      {status === "error" && <p className="font-body text-sm text-red-400 text-center">{errorMsg}</p>}

      <button type="submit" disabled={status === "loading" || form.services.length === 0 || !form.nomArtiste || !form.email}
        className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-body font-bold text-base text-black transition-all disabled:opacity-50 hover:scale-[1.02]"
        style={{ background: "linear-gradient(135deg, #C8A84B 0%, #D4A83A 100%)", boxShadow: "0 8px 30px rgba(200,168,75,0.35)" }}>
        {status === "loading"
          ? <><Loader2 size={18} className="animate-spin" /> Envoi en cours...</>
          : "Envoyer mon brief →"}
      </button>

      <p className="text-center font-body text-xs" style={{ color: "rgba(220,210,255,0.35)" }}>
        Premier échange gratuit · Devis personnalisé sous 24h
      </p>
    </form>
  );
}
