"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Loader2, ChevronDown } from "lucide-react";

type PackType = "logo" | "templates" | "epk" | "complet";

const PACK_TYPES: { type: PackType; emoji: string; label: string; desc: string }[] = [
  { type: "logo",      emoji: "✏️", label: "Logo & Identité Visuelle",    desc: "Création de votre logo, charte graphique, palette de couleurs et typographies." },
  { type: "templates", emoji: "📱", label: "Templates Réseaux Sociaux",   desc: "Posts Instagram, stories, couvertures YouTube/Facebook — prêts à l'emploi." },
  { type: "epk",       emoji: "📄", label: "Press Kit Artiste (EPK)",     desc: "Dossier de presse numérique professionnel : bio, photos, discographie, contacts." },
  { type: "complet",   emoji: "🎨", label: "Direction Artistique Globale", desc: "Univers visuel complet et cohérent sur tous vos supports. Le pack le plus complet." },
];

const styleOptions = [
  "Moderne & Épuré", "Luxe & Prestige", "Street & Urban",
  "Coloré & Vibrant", "Sombre & Mystérieux", "Traditionnel & Africain",
  "Cinématique", "Minimaliste", "À définir ensemble",
];

const plateformes = ["Instagram", "TikTok", "YouTube", "Facebook", "Twitter / X", "Spotify", "Site web", "Toutes"];

const pays = [
  "Sénégal", "Côte d'Ivoire", "Mali", "Burkina Faso", "Guinée", "Cameroun",
  "Congo", "Gabon", "Bénin", "Togo", "Niger", "France", "Belgique", "Canada", "Autre",
];

interface FormData {
  nomArtiste: string;
  email: string;
  telephone: string;
  paysResidence: string;
  packs: PackType[];
  /* Situation actuelle */
  aLogo: string;
  aCharte: string;
  /* Style & Références */
  styleVisuel: string;
  referencesArtistes: string;
  couleursPref: string;
  /* Utilisation */
  plateformesUtilisees: string[];
  /* Délai */
  delaiSouhaite: string;
  /* Message */
  message: string;
}

const initial: FormData = {
  nomArtiste: "", email: "", telephone: "", paysResidence: "",
  packs: [],
  aLogo: "", aCharte: "",
  styleVisuel: "", referencesArtistes: "", couleursPref: "",
  plateformesUtilisees: [],
  delaiSouhaite: "",
  message: "",
};

const inputStyle = { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" };
const inputCls = "w-full px-4 py-3 rounded-xl font-body text-sm text-white placeholder-white/30 outline-none transition-colors focus:ring-1 focus:ring-purple-500/60";
const ACCENT = "#8B5CF6";

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
            ? { background: ACCENT, color: "#fff", border: `1px solid ${ACCENT}` }
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

export default function BrandingForm() {
  const [form, setForm] = useState<FormData>(initial);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const set = (key: keyof FormData, value: FormData[keyof FormData]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const togglePack = (p: PackType) =>
    setForm((f) => ({
      ...f,
      packs: f.packs.includes(p) ? f.packs.filter((x) => x !== p) : [...f.packs, p],
    }));

  const togglePlatforme = (p: string) =>
    setForm((f) => ({
      ...f,
      plateformesUtilisees: f.plateformesUtilisees.includes(p)
        ? f.plateformesUtilisees.filter((x) => x !== p)
        : [...f.plateformesUtilisees, p],
    }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/branding/contact", {
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
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "rgba(139,92,246,0.15)" }}>
          <CheckCircle size={36} style={{ color: ACCENT }} />
        </div>
        <h3 className="font-display text-3xl text-white mb-3">Brief reçu !</h3>
        <p className="font-body text-base mb-2" style={{ color: "rgba(220,210,255,0.65)" }}>
          Nous avons bien reçu votre demande de branding.
        </p>
        <p className="font-body text-sm" style={{ color: "rgba(220,210,255,0.45)" }}>
          Notre équipe créative vous contacte dans les <strong style={{ color: ACCENT }}>24h</strong> avec votre devis.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">

      {/* ── 1. Packs souhaités ──────────────── */}
      <div>
        <h3 className="font-body font-bold text-lg text-white mb-1">Que souhaitez-vous créer ?</h3>
        <p className="font-body text-xs mb-4" style={{ color: "rgba(220,210,255,0.45)" }}>Sélectionnez un ou plusieurs services</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {PACK_TYPES.map(({ type, emoji, label, desc }) => {
            const selected = form.packs.includes(type);
            return (
              <button key={type} type="button" onClick={() => togglePack(type)}
                className="flex items-start gap-3 p-4 rounded-2xl text-left transition-all"
                style={selected
                  ? { background: "rgba(139,92,246,0.18)", border: `2px solid ${ACCENT}`, boxShadow: "0 4px 20px rgba(139,92,246,0.25)" }
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
        <AnimatePresence>
          {form.packs.includes("complet") && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden mt-3">
              <div className="rounded-xl px-4 py-3 font-body text-xs" style={{ background: "rgba(139,92,246,0.10)", border: "1px solid rgba(139,92,246,0.30)", color: "rgba(220,210,255,0.70)" }}>
                ✓ Direction Artistique Globale — inclut logo, charte, templates, EPK et plus encore.
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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

      {/* ── 3. Situation actuelle ─────────── */}
      <div>
        <h3 className="font-body font-bold text-lg text-white mb-4">Votre situation actuelle</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Avez-vous déjà un logo ?">
            <RadioGroup options={[{ value: "oui", label: "Oui" }, { value: "non", label: "Non" }, { value: "a-refaire", label: "Oui, mais à refaire" }]} value={form.aLogo} onChange={(v) => set("aLogo", v)} />
          </Field>
          <Field label="Avez-vous déjà une charte graphique ?">
            <RadioGroup options={[{ value: "oui", label: "Oui" }, { value: "non", label: "Non" }, { value: "partielle", label: "Partielle" }]} value={form.aCharte} onChange={(v) => set("aCharte", v)} />
          </Field>
        </div>
      </div>

      {/* ── 4. Style & Direction visuelle ──── */}
      <div>
        <h3 className="font-body font-bold text-lg text-white mb-4">Style & Direction visuelle</h3>
        <div className="space-y-4">
          <Field label="Style visuel souhaité" hint="Sélectionnez le style qui correspond à votre univers">
            <div className="flex flex-wrap gap-2">
              {styleOptions.map((s) => (
                <button key={s} type="button" onClick={() => set("styleVisuel", s)}
                  className="px-3 py-1.5 rounded-full font-body text-xs font-medium transition-all"
                  style={form.styleVisuel === s
                    ? { background: "rgba(139,92,246,0.20)", color: ACCENT, border: `1px solid ${ACCENT}` }
                    : { background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.10)" }}>
                  {s}
                </button>
              ))}
            </div>
          </Field>
          <Field label="Références d'artistes / marques" hint="Des artistes ou marques dont vous aimez l'identité visuelle">
            <Textarea rows={3} value={form.referencesArtistes} onChange={(e) => set("referencesArtistes", e.target.value)}
              placeholder="Ex: J'aime l'univers visuel de Burna Boy, les couleurs chaudes de Tiakola, le minimalisme de Drake..." />
          </Field>
          <Field label="Couleurs préférées" hint="Couleurs que vous aimez ou que vous souhaitez éviter">
            <Input value={form.couleursPref} onChange={(e) => set("couleursPref", e.target.value)}
              placeholder="Ex: J'aime le noir, or et bordeaux. J'évite le rose et le vert fluo." />
          </Field>
        </div>
      </div>

      {/* ── 5. Utilisation & Délai ──────────── */}
      <div>
        <h3 className="font-body font-bold text-lg text-white mb-4">Utilisation & Délai</h3>
        <div className="space-y-4">
          <Field label="Où utilisez-vous votre branding ?">
            <div className="flex flex-wrap gap-2">
              {plateformes.map((p) => (
                <button key={p} type="button" onClick={() => togglePlatforme(p)}
                  className="px-3 py-1.5 rounded-full font-body text-xs font-medium transition-all"
                  style={form.plateformesUtilisees.includes(p)
                    ? { background: "rgba(139,92,246,0.20)", color: ACCENT, border: `1px solid ${ACCENT}` }
                    : { background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.10)" }}>
                  {p}
                </button>
              ))}
            </div>
          </Field>
          <Field label="Délai souhaité">
            <Select value={form.delaiSouhaite} onChange={(e) => set("delaiSouhaite", e.target.value)}>
              <option value="" disabled>Sélectionner un délai</option>
              {["Urgent (moins d'une semaine)", "1 à 2 semaines", "2 à 4 semaines", "Plus d'un mois", "Pas de deadline précise"].map((d) => (
                <option key={d} value={d} style={{ background: "#1C0A40", color: "white" }}>{d}</option>
              ))}
            </Select>
          </Field>
        </div>
      </div>

      {/* ── 6. Message ──────────────────────── */}
      <div>
        <h3 className="font-body font-bold text-lg text-white mb-4">Informations complémentaires</h3>
        <Textarea rows={4} value={form.message} onChange={(e) => set("message", e.target.value)}
          placeholder="Décrivez votre univers artistique, vos inspirations, ce que vous voulez transmettre à votre audience, ou toute autre information utile..." />
      </div>

      {status === "error" && <p className="font-body text-sm text-red-400 text-center">{errorMsg}</p>}

      <button type="submit" disabled={status === "loading" || form.packs.length === 0 || !form.nomArtiste || !form.email}
        className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-body font-bold text-base text-white transition-all disabled:opacity-50 hover:scale-[1.02]"
        style={{ background: "linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)", boxShadow: "0 8px 30px rgba(139,92,246,0.35)" }}>
        {status === "loading"
          ? <><Loader2 size={18} className="animate-spin" /> Envoi en cours...</>
          : "Envoyer mon brief →"}
      </button>

      <p className="text-center font-body text-xs" style={{ color: "rgba(220,210,255,0.35)" }}>
        Devis personnalisé sous 24h · Sans engagement
      </p>
    </form>
  );
}
