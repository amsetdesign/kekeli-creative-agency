"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Loader2, ChevronDown } from "lucide-react";

type ShootType = "portrait" | "thematique" | "studio" | "exterieur";

const SHOOT_TYPES: { type: ShootType; emoji: string; label: string; desc: string }[] = [
  { type: "portrait",    emoji: "🎭", label: "Portrait Artiste",       desc: "Photos professionnelles pour vos réseaux sociaux, presse, couvertures et promotions." },
  { type: "thematique",  emoji: "🎬", label: "Shooting Thématique",    desc: "Concept visuel élaboré avec décors, costumes et mise en scène — pour un univers fort." },
  { type: "studio",      emoji: "💡", label: "Shooting en Studio",     desc: "Studio professionnel avec fond, éclairage contrôlé et équipement haut de gamme à Dakar." },
  { type: "exterieur",   emoji: "🌅", label: "Shooting en Extérieur",  desc: "Plage, ruelles, toits, paysages — les décors naturels et urbains de Dakar et du Sénégal." },
];

const ambiances = [
  "Cinématique & Dramatique", "Lumineux & Aérien", "Sombre & Mystérieux",
  "Street & Urbain", "Nature & Organique", "Luxe & Prestige",
  "Coloré & Vibrant", "Minimaliste & Épuré", "À définir ensemble",
];

const utilisations = ["Cover art", "Photos presse / EPK", "Instagram & réseaux", "TikTok & Reels", "Affiche concert", "Site web / Bio", "Toutes utilisations"];

const pays = [
  "Sénégal", "Côte d'Ivoire", "Mali", "Burkina Faso", "Guinée", "Cameroun",
  "Congo", "Gabon", "Bénin", "Togo", "Niger", "France", "Belgique", "Canada", "Autre",
];

interface FormData {
  nomArtiste: string;
  email: string;
  telephone: string;
  paysResidence: string;
  shootTypes: ShootType[];
  /* Concept */
  ambianceSouhaitee: string;
  referencesVisuelles: string;
  conceptDescription: string;
  /* Logistique */
  datePreferee: string;
  delaiSouhaite: string;
  nombrePersonnes: string;
  costumesPrevus: string;
  /* Utilisation */
  utilisations: string[];
  /* Message */
  message: string;
}

const initial: FormData = {
  nomArtiste: "", email: "", telephone: "", paysResidence: "",
  shootTypes: [],
  ambianceSouhaitee: "", referencesVisuelles: "", conceptDescription: "",
  datePreferee: "", delaiSouhaite: "", nombrePersonnes: "", costumesPrevus: "",
  utilisations: [],
  message: "",
};

const ACCENT = "#06B6D4";
const inputStyle = { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" };
const inputCls = "w-full px-4 py-3 rounded-xl font-body text-sm text-white placeholder-white/30 outline-none transition-colors focus:ring-1 focus:ring-cyan-500/60";

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
function RadioGroup({ options, value, onChange }: { options: { value: string; label: string }[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button key={o.value} type="button" onClick={() => onChange(o.value)}
          className="px-4 py-2 rounded-full font-body text-xs font-medium transition-all"
          style={value === o.value
            ? { background: ACCENT, color: "#000", border: `1px solid ${ACCENT}` }
            : { background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.65)", border: "1px solid rgba(255,255,255,0.12)" }}>
          {o.label}
        </button>
      ))}
    </div>
  );
}
function Field({ label, required, hint, children, className }: { label: string; required?: boolean; hint?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <label className="block font-body text-sm font-medium text-white mb-1.5">
        {label} {required && <span style={{ color: ACCENT }}>*</span>}
      </label>
      {hint && <p className="font-body text-xs mb-2" style={{ color: "rgba(220,210,255,0.45)" }}>{hint}</p>}
      {children}
    </div>
  );
}

export default function PhotoForm() {
  const [form, setForm] = useState<FormData>(initial);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const set = (key: keyof FormData, value: FormData[keyof FormData]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const toggleShoot = (t: ShootType) =>
    setForm((f) => ({
      ...f,
      shootTypes: f.shootTypes.includes(t) ? f.shootTypes.filter((x) => x !== t) : [...f.shootTypes, t],
    }));

  const toggleUtilisation = (u: string) =>
    setForm((f) => ({
      ...f,
      utilisations: f.utilisations.includes(u) ? f.utilisations.filter((x) => x !== u) : [...f.utilisations, u],
    }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/photo/contact", {
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
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "rgba(6,182,212,0.15)" }}>
          <CheckCircle size={36} style={{ color: ACCENT }} />
        </div>
        <h3 className="font-display text-3xl text-white mb-3">Brief reçu !</h3>
        <p className="font-body text-base mb-2" style={{ color: "rgba(220,210,255,0.65)" }}>
          Nous avons bien reçu votre demande de shooting.
        </p>
        <p className="font-body text-sm" style={{ color: "rgba(220,210,255,0.45)" }}>
          Notre équipe vous contacte dans les <strong style={{ color: ACCENT }}>24h</strong> avec votre devis personnalisé.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">

      {/* ── 1. Type de shooting ─────────────── */}
      <div>
        <h3 className="font-body font-bold text-lg text-white mb-1">Quel type de shooting ?</h3>
        <p className="font-body text-xs mb-4" style={{ color: "rgba(220,210,255,0.45)" }}>Sélectionnez un ou plusieurs formats</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {SHOOT_TYPES.map(({ type, emoji, label, desc }) => {
            const selected = form.shootTypes.includes(type);
            return (
              <button key={type} type="button" onClick={() => toggleShoot(type)}
                className="flex items-start gap-3 p-4 rounded-2xl text-left transition-all"
                style={selected
                  ? { background: "rgba(6,182,212,0.14)", border: `2px solid ${ACCENT}`, boxShadow: "0 4px 20px rgba(6,182,212,0.20)" }
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
        </div>
      </div>

      {/* ── 3. Concept & Ambiance ───────────── */}
      <div>
        <h3 className="font-body font-bold text-lg text-white mb-4">Concept & Ambiance</h3>
        <div className="space-y-4">
          <Field label="Ambiance souhaitée">
            <div className="flex flex-wrap gap-2">
              {ambiances.map((a) => (
                <button key={a} type="button" onClick={() => set("ambianceSouhaitee", a)}
                  className="px-3 py-1.5 rounded-full font-body text-xs font-medium transition-all"
                  style={form.ambianceSouhaitee === a
                    ? { background: "rgba(6,182,212,0.18)", color: ACCENT, border: `1px solid ${ACCENT}` }
                    : { background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.10)" }}>
                  {a}
                </button>
              ))}
            </div>
          </Field>
          <Field label="Références visuelles" hint="Artistes, photographes ou shootings dont vous aimez le style">
            <Textarea rows={3} value={form.referencesVisuelles} onChange={(e) => set("referencesVisuelles", e.target.value)}
              placeholder="Ex: J'aime les shootings de Burna Boy — tons chauds, éclairage cinématique. Ou le style studio de Beyoncé..." />
          </Field>
          <Field label="Description du concept" hint="Décrivez l'univers, l'histoire ou le message que vous souhaitez transmettre">
            <Textarea rows={4} value={form.conceptDescription} onChange={(e) => set("conceptDescription", e.target.value)}
              placeholder="Ex: Je veux un shooting en extérieur à Dakar la nuit, ambiance mystérieuse, lumières néon de la ville, tenues sombres..." />
          </Field>
        </div>
      </div>

      {/* ── 4. Logistique ───────────────────── */}
      <div>
        <h3 className="font-body font-bold text-lg text-white mb-4">Logistique</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Date préférée pour le shooting">
            <Input type="date" value={form.datePreferee} onChange={(e) => set("datePreferee", e.target.value)} />
          </Field>
          <Field label="Délai de livraison souhaité">
            <Select value={form.delaiSouhaite} onChange={(e) => set("delaiSouhaite", e.target.value)}>
              <option value="" disabled>Sélectionner</option>
              {["Urgent (moins de 5 jours)", "1 semaine", "2 semaines", "1 mois", "Pas de deadline"].map((d) => (
                <option key={d} value={d} style={{ background: "#1C0A40", color: "white" }}>{d}</option>
              ))}
            </Select>
          </Field>
          <Field label="Nombre de personnes à shooter">
            <Select value={form.nombrePersonnes} onChange={(e) => set("nombrePersonnes", e.target.value)}>
              <option value="" disabled>Sélectionner</option>
              {["Solo (1 personne)", "Duo (2 personnes)", "Groupe (3–5)", "Groupe nombreux (6+)"].map((n) => (
                <option key={n} value={n} style={{ background: "#1C0A40", color: "white" }}>{n}</option>
              ))}
            </Select>
          </Field>
          <Field label="Costumes / Stylisme prévu ?">
            <RadioGroup
              options={[{ value: "oui", label: "Oui, j'ai mes tenues" }, { value: "aide", label: "Besoin d'aide stylisme" }, { value: "non", label: "Non / Simple" }]}
              value={form.costumesPrevus}
              onChange={(v) => set("costumesPrevus", v)}
            />
          </Field>
        </div>
      </div>

      {/* ── 5. Utilisation des photos ──────── */}
      <div>
        <h3 className="font-body font-bold text-lg text-white mb-4">Utilisation des photos</h3>
        <Field label="À quoi serviront ces photos ?" hint="Sélectionnez tout ce qui s'applique">
          <div className="flex flex-wrap gap-2">
            {utilisations.map((u) => (
              <button key={u} type="button" onClick={() => toggleUtilisation(u)}
                className="px-3 py-1.5 rounded-full font-body text-xs font-medium transition-all"
                style={form.utilisations.includes(u)
                  ? { background: "rgba(6,182,212,0.18)", color: ACCENT, border: `1px solid ${ACCENT}` }
                  : { background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.10)" }}>
                {u}
              </button>
            ))}
          </div>
        </Field>
      </div>

      {/* ── 6. Message ──────────────────────── */}
      <div>
        <h3 className="font-body font-bold text-lg text-white mb-4">Informations complémentaires</h3>
        <Textarea rows={4} value={form.message} onChange={(e) => set("message", e.target.value)}
          placeholder="Contraintes particulières, questions sur les lieux, équipements souhaités, nombre de photos retouchées attendues..." />
      </div>

      {status === "error" && <p className="font-body text-sm text-red-400 text-center">{errorMsg}</p>}

      <button type="submit" disabled={status === "loading" || form.shootTypes.length === 0 || !form.nomArtiste || !form.email}
        className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-body font-bold text-base text-black transition-all disabled:opacity-50 hover:scale-[1.02]"
        style={{ background: "linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)", boxShadow: "0 8px 30px rgba(6,182,212,0.35)" }}>
        {status === "loading"
          ? <><Loader2 size={18} className="animate-spin text-white" /> Envoi en cours...</>
          : "Envoyer mon brief shooting →"}
      </button>

      <p className="text-center font-body text-xs" style={{ color: "rgba(220,210,255,0.35)" }}>
        Devis personnalisé sous 24h · Sans engagement
      </p>
    </form>
  );
}
