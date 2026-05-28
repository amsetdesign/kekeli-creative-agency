"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Loader2, ChevronDown } from "lucide-react";

type ServiceType = "zero-pro" | "mentoring" | "carriere" | "medias";

const SERVICE_TYPES: { type: ServiceType; emoji: string; label: string; desc: string }[] = [
  { type: "zero-pro",  emoji: "🚀", label: "De zéro à professionnel",      desc: "Un suivi complet pour artistes débutants qui veulent se lancer sérieusement dans la musique." },
  { type: "mentoring", emoji: "🧭", label: "Mentoring & Coaching artistique", desc: "Sessions régulières avec un expert KEKELI pour guider vos décisions artistiques et commerciales." },
  { type: "carriere",  emoji: "📊", label: "Gestion de carrière",           desc: "Planification stratégique, agenda, opportunités, négociations de contrats et développement de réseau." },
  { type: "medias",    emoji: "🎙️", label: "Préparation aux médias",        desc: "Coaching pour interviews radio/TV, passages plateau, conférences de presse et communication publique." },
];

const niveaux = [
  "Je n'ai encore rien sorti",
  "J'ai quelques titres mais rien de professionnel",
  "J'ai des sorties et une petite audience",
  "J'ai une base solide mais je veux accélérer",
  "Je suis établi et je cherche à passer au niveau supérieur",
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
  "Lancer ma carrière musicale",
  "Signer avec un label",
  "Vivre de ma musique",
  "Développer ma notoriété",
  "Préparer un album / projet",
  "Intégrer les médias sénégalais",
  "Me développer à l'international",
  "Trouver des partenariats / sponsors",
];

const freins = [
  "Je ne sais pas par où commencer",
  "Manque de réseau professionnel",
  "Difficulté à me vendre / me promouvoir",
  "Pas de budget pour investir",
  "Manque de confiance en moi",
  "Problèmes organisationnels",
  "Mauvaises expériences passées",
];

interface FormData {
  nomArtiste: string;
  email: string;
  telephone: string;
  paysResidence: string;
  genre: string;
  services: ServiceType[];
  niveauCarriere: string;
  objectifs: string[];
  freins: string[];
  descriptionSituation: string;
  realisationsActuelles: string;
  disponibilite: string;
  delaiSouhaite: string;
  message: string;
}

const initial: FormData = {
  nomArtiste: "", email: "", telephone: "", paysResidence: "", genre: "",
  services: [],
  niveauCarriere: "",
  objectifs: [], freins: [],
  descriptionSituation: "", realisationsActuelles: "",
  disponibilite: "", delaiSouhaite: "", message: "",
};

const ACCENT = "#10B981";
const inputStyle = { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" };
const inputCls = "w-full px-4 py-3 rounded-xl font-body text-sm text-white placeholder-white/30 outline-none transition-colors focus:ring-1 focus:ring-emerald-500/60";

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
        {label} {required && <span style={{ color: "#6EE7B7" }}>*</span>}
      </label>
      {hint && <p className="font-body text-xs mb-2" style={{ color: "rgba(220,210,255,0.45)" }}>{hint}</p>}
      {children}
    </div>
  );
}

function ChipToggle({ items, selected, onToggle, accentColor }: { items: string[]; selected: string[]; onToggle: (v: string) => void; accentColor: string }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <button key={item} type="button" onClick={() => onToggle(item)}
          className="px-3 py-1.5 rounded-full font-body text-xs font-medium transition-all"
          style={selected.includes(item)
            ? { background: `${accentColor}22`, color: accentColor, border: `1px solid ${accentColor}` }
            : { background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.10)" }}>
          {item}
        </button>
      ))}
    </div>
  );
}

export default function AccompagnementForm() {
  const [form, setForm] = useState<FormData>(initial);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const set = (key: keyof FormData, value: FormData[keyof FormData]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const toggleService = (s: ServiceType) =>
    setForm((f) => ({ ...f, services: f.services.includes(s) ? f.services.filter((x) => x !== s) : [...f.services, s] }));

  const toggleObjectif = (o: string) =>
    setForm((f) => ({ ...f, objectifs: f.objectifs.includes(o) ? f.objectifs.filter((x) => x !== o) : [...f.objectifs, o] }));

  const toggleFrein = (fr: string) =>
    setForm((f) => ({ ...f, freins: f.freins.includes(fr) ? f.freins.filter((x) => x !== fr) : [...f.freins, fr] }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/accompagnement/contact", {
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
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "rgba(16,185,129,0.15)" }}>
          <CheckCircle size={36} style={{ color: ACCENT }} />
        </div>
        <h3 className="font-display text-3xl text-white mb-3">Demande reçue !</h3>
        <p className="font-body text-base mb-2" style={{ color: "rgba(220,210,255,0.65)" }}>
          Nous avons bien reçu votre demande d'accompagnement.
        </p>
        <p className="font-body text-sm" style={{ color: "rgba(220,210,255,0.45)" }}>
          Notre équipe vous contacte dans les <strong style={{ color: ACCENT }}>24h</strong> pour un premier échange gratuit.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">

      {/* ── 1. Type d'accompagnement ──────── */}
      <div>
        <h3 className="font-body font-bold text-lg text-white mb-1">Quel accompagnement cherchez-vous ?</h3>
        <p className="font-body text-xs mb-4" style={{ color: "rgba(220,210,255,0.45)" }}>Sélectionnez un ou plusieurs services</p>
        <div className="grid grid-cols-1 gap-3">
          {SERVICE_TYPES.map(({ type, emoji, label, desc }) => {
            const selected = form.services.includes(type);
            return (
              <button key={type} type="button" onClick={() => toggleService(type)}
                className="flex items-start gap-3 p-4 rounded-2xl text-left transition-all"
                style={selected
                  ? { background: "rgba(16,185,129,0.14)", border: `2px solid ${ACCENT}`, boxShadow: "0 4px 20px rgba(16,185,129,0.20)" }
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

      {/* ── 3. Niveau de carrière ────────────── */}
      <div>
        <h3 className="font-body font-bold text-lg text-white mb-4">Où en êtes-vous ?</h3>
        <Field label="Votre niveau actuel" hint="Soyez honnête — on est là pour vous aider, pas pour juger">
          <div className="flex flex-col gap-2">
            {niveaux.map((n) => (
              <button key={n} type="button" onClick={() => set("niveauCarriere", n)}
                className="flex items-center gap-3 p-3 rounded-xl text-left transition-all font-body text-xs"
                style={form.niveauCarriere === n
                  ? { background: "rgba(16,185,129,0.14)", border: `1px solid ${ACCENT}`, color: "white" }
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
      </div>

      {/* ── 4. Objectifs & Freins ───────────── */}
      <div>
        <h3 className="font-body font-bold text-lg text-white mb-4">Vos objectifs & vos défis</h3>
        <div className="space-y-5">
          <Field label="Vos objectifs" hint="Sélectionnez tout ce qui correspond à vos ambitions">
            <ChipToggle items={objectifs} selected={form.objectifs} onToggle={toggleObjectif} accentColor={ACCENT} />
          </Field>
          <Field label="Vos principaux freins" hint="Qu'est-ce qui vous bloque aujourd'hui ?">
            <ChipToggle items={freins} selected={form.freins} onToggle={toggleFrein} accentColor="#F59E0B" />
          </Field>
        </div>
      </div>

      {/* ── 5. Situation actuelle ────────────── */}
      <div>
        <h3 className="font-body font-bold text-lg text-white mb-4">Votre situation</h3>
        <div className="space-y-4">
          <Field label="Décrivez votre situation actuelle" required hint="Plus vous partagez, mieux on peut vous accompagner">
            <Textarea rows={5} value={form.descriptionSituation} onChange={(e) => set("descriptionSituation", e.target.value)}
              placeholder="Ex: Je fais de la musique depuis 3 ans, j'ai sorti 2 singles sur Spotify mais je n'arrive pas à développer mon audience. J'ai un bon son mais je ne sais pas comment me vendre ni par où commencer professionnellement..." required />
          </Field>
          <Field label="Ce que vous avez déjà accompli" hint="Sorties, concerts, médias, chiffres — tout ce dont vous êtes fier">
            <Textarea rows={3} value={form.realisationsActuelles} onChange={(e) => set("realisationsActuelles", e.target.value)}
              placeholder="Ex: 2 singles sur Spotify (300 streams), 1 concert au quartier, 500 abonnés Instagram, une interview sur une radio locale..." />
          </Field>
        </div>
      </div>

      {/* ── 6. Disponibilité & Délai ─────────── */}
      <div>
        <h3 className="font-body font-bold text-lg text-white mb-4">Organisation</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Votre disponibilité">
            <Select value={form.disponibilite} onChange={(e) => set("disponibilite", e.target.value)}>
              <option value="" disabled>Sélectionner</option>
              {[
                "Temps plein — je vis pour ma musique",
                "Mi-temps — musique + travail",
                "Week-ends uniquement",
                "Quelques heures par semaine",
              ].map((d) => <option key={d} value={d} style={{ background: "#1C0A40", color: "white" }}>{d}</option>)}
            </Select>
          </Field>
          <Field label="Quand souhaitez-vous démarrer ?">
            <Select value={form.delaiSouhaite} onChange={(e) => set("delaiSouhaite", e.target.value)}>
              <option value="" disabled>Sélectionner</option>
              {["Immédiatement", "Dans 2 à 4 semaines", "Dans 1 à 2 mois", "Dans 3 à 6 mois"].map((d) => (
                <option key={d} value={d} style={{ background: "#1C0A40", color: "white" }}>{d}</option>
              ))}
            </Select>
          </Field>
        </div>
      </div>

      {/* ── 7. Message ──────────────────────── */}
      <div>
        <h3 className="font-body font-bold text-lg text-white mb-4">Questions ou précisions</h3>
        <Textarea rows={4} value={form.message} onChange={(e) => set("message", e.target.value)}
          placeholder="Budget indicatif, questions sur notre méthode, expériences passées avec d'autres accompagnateurs, attentes spécifiques..." />
      </div>

      {status === "error" && <p className="font-body text-sm text-red-400 text-center">{errorMsg}</p>}

      <button type="submit" disabled={status === "loading" || form.services.length === 0 || !form.nomArtiste || !form.email}
        className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-body font-bold text-base text-white transition-all disabled:opacity-50 hover:scale-[1.02]"
        style={{ background: "linear-gradient(135deg, #10B981 0%, #059669 100%)", boxShadow: "0 8px 30px rgba(16,185,129,0.35)" }}>
        {status === "loading"
          ? <><Loader2 size={18} className="animate-spin" /> Envoi en cours...</>
          : "Envoyer ma demande →"}
      </button>

      <p className="text-center font-body text-xs" style={{ color: "rgba(220,210,255,0.35)" }}>
        Premier échange gratuit · Accompagnement sur mesure
      </p>
    </form>
  );
}
