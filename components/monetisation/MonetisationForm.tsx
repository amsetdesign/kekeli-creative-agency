"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Loader2, ChevronDown } from "lucide-react";

type ServiceType = "youtube" | "droits" | "les-deux";

const SERVICE_TYPES: { type: ServiceType; emoji: string; label: string; desc: string; color: string }[] = [
  { type: "youtube",   emoji: "▶️", label: "Monétisation YouTube & Plateformes", desc: "Activation et optimisation de la monétisation sur YouTube, TikTok, Boomplay et autres plateformes.", color: "#16A34A" },
  { type: "droits",    emoji: "⚖️", label: "Droits d'auteur — SODAV / SACEM",    desc: "Inscription, gestion et récupération de vos droits d'auteur et droits voisins auprès des sociétés de gestion.", color: "#16A34A" },
  { type: "les-deux",  emoji: "🚀", label: "Pack complet — YouTube + Droits",    desc: "Les deux services combinés pour maximiser tous vos revenus musicaux. Solution la plus complète.", color: "#16A34A" },
];

const abonnes = [
  "Moins de 1 000 abonnés",
  "1 000 – 10 000 abonnés",
  "10 000 – 50 000 abonnés",
  "50 000 – 100 000 abonnés",
  "Plus de 100 000 abonnés",
  "Pas encore de chaîne",
];

const pays = [
  "Sénégal", "Côte d'Ivoire", "Mali", "Burkina Faso", "Guinée", "Cameroun",
  "Congo", "Gabon", "Bénin", "Togo", "Niger", "Mauritanie", "France", "Belgique", "Canada", "Autre",
];

interface FormData {
  nomArtiste: string;
  email: string;
  telephone: string;
  paysResidence: string;
  serviceType: ServiceType | "";
  /* YouTube */
  chaineYoutube: string;
  abonnesYoutube: string;
  dejaMonetise: string;
  /* Droits */
  dejaSodav: string;
  dejaAffilie: string;
  societeActuelle: string;
  /* Commun */
  nbTitres: string;
  objectif: string;
  message: string;
}

const initial: FormData = {
  nomArtiste: "", email: "", telephone: "", paysResidence: "",
  serviceType: "",
  chaineYoutube: "", abonnesYoutube: "", dejaMonetise: "",
  dejaSodav: "", dejaAffilie: "", societeActuelle: "",
  nbTitres: "", objectif: "", message: "",
};

const inputStyle = { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" };
const inputCls = "w-full px-4 py-3 rounded-xl font-body text-sm text-white placeholder-white/30 outline-none transition-colors focus:ring-1 focus:ring-green-500/60";

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
            ? { background: "#16A34A", color: "#fff", border: "1px solid #16A34A" }
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
        {label} {required && <span className="text-green-400">*</span>}
      </label>
      {hint && <p className="font-body text-xs mb-2" style={{ color: "rgba(220,210,255,0.45)" }}>{hint}</p>}
      {children}
    </div>
  );
}

export default function MonetisationForm() {
  const [form, setForm] = useState<FormData>(initial);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const set = (key: keyof FormData, value: FormData[keyof FormData]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/monetisation/contact", {
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
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "rgba(22,163,74,0.15)" }}>
          <CheckCircle size={36} style={{ color: "#16A34A" }} />
        </div>
        <h3 className="font-display text-3xl text-white mb-3">Demande reçue !</h3>
        <p className="font-body text-base mb-2" style={{ color: "rgba(220,210,255,0.65)" }}>
          Nous avons bien reçu votre demande de monétisation.
        </p>
        <p className="font-body text-sm" style={{ color: "rgba(220,210,255,0.45)" }}>
          Notre équipe vous contacte dans les <strong className="text-green-400">24h</strong> avec votre devis personnalisé.
        </p>
      </motion.div>
    );
  }

  const showYoutube = form.serviceType === "youtube" || form.serviceType === "les-deux";
  const showDroits  = form.serviceType === "droits"  || form.serviceType === "les-deux";

  return (
    <form onSubmit={handleSubmit} className="space-y-10">

      {/* ── 1. Type de service ──────────────── */}
      <div>
        <h3 className="font-body font-bold text-lg text-white mb-1">Quel service vous intéresse ?</h3>
        <p className="font-body text-xs mb-4" style={{ color: "rgba(220,210,255,0.45)" }}>Sélectionnez un ou plusieurs services</p>
        <div className="grid grid-cols-1 gap-3">
          {SERVICE_TYPES.map(({ type, emoji, label, desc, color }) => (
            <button key={type} type="button" onClick={() => set("serviceType", type)}
              className="flex items-start gap-3 p-4 rounded-2xl text-left transition-all"
              style={form.serviceType === type
                ? { background: `${color}18`, border: `2px solid ${color}`, boxShadow: `0 4px 20px ${color}25` }
                : { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.10)" }}>
              <span className="text-2xl shrink-0 mt-0.5">{emoji}</span>
              <div>
                <p className="font-body font-semibold text-sm text-white mb-0.5">{label}</p>
                <p className="font-body text-xs leading-relaxed" style={{ color: "rgba(220,210,255,0.55)" }}>{desc}</p>
              </div>
            </button>
          ))}
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

      {/* ── 3. Section YouTube (conditionnelle) ── */}
      <AnimatePresence>
        {showYoutube && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
            <div>
              <h3 className="font-body font-bold text-lg text-white mb-1">YouTube & Plateformes</h3>
              <p className="font-body text-xs mb-4" style={{ color: "rgba(220,210,255,0.45)" }}>Votre situation actuelle sur les plateformes</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Lien de votre chaîne YouTube" hint="Laissez vide si vous n'en avez pas encore" className="sm:col-span-2">
                  <Input value={form.chaineYoutube} onChange={(e) => set("chaineYoutube", e.target.value)} placeholder="https://youtube.com/@votrechaîne" />
                </Field>
                <Field label="Nombre d'abonnés actuels">
                  <Select value={form.abonnesYoutube} onChange={(e) => set("abonnesYoutube", e.target.value)}>
                    <option value="" disabled>Sélectionner</option>
                    {abonnes.map((a) => <option key={a} value={a} style={{ background: "#1C0A40", color: "white" }}>{a}</option>)}
                  </Select>
                </Field>
                <Field label="Votre chaîne est-elle déjà monétisée ?">
                  <RadioGroup options={[{ value: "oui", label: "Oui" }, { value: "non", label: "Non" }, { value: "en-cours", label: "En cours" }]} value={form.dejaMonetise} onChange={(v) => set("dejaMonetise", v)} />
                </Field>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── 4. Section Droits (conditionnelle) ── */}
      <AnimatePresence>
        {showDroits && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
            <div>
              <h3 className="font-body font-bold text-lg text-white mb-1">Droits d'auteur — SODAV / SACEM</h3>
              <p className="font-body text-xs mb-4" style={{ color: "rgba(220,210,255,0.45)" }}>Votre situation actuelle vis-à-vis des droits</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Êtes-vous inscrit à la SODAV ?">
                  <RadioGroup options={[{ value: "oui", label: "Oui" }, { value: "non", label: "Non" }, { value: "ne-sais-pas", label: "Je ne sais pas" }]} value={form.dejaSodav} onChange={(v) => set("dejaSodav", v)} />
                </Field>
                <Field label="Êtes-vous affilié à une autre société (SACEM, ASCAP...) ?">
                  <RadioGroup options={[{ value: "oui", label: "Oui" }, { value: "non", label: "Non" }]} value={form.dejaAffilie} onChange={(v) => set("dejaAffilie", v)} />
                </Field>
                <AnimatePresence>
                  {form.dejaAffilie === "oui" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="sm:col-span-2">
                      <Field label="Laquelle ?">
                        <Input value={form.societeActuelle} onChange={(e) => set("societeActuelle", e.target.value)} placeholder="Ex: SACEM, BSDA, ASCAP..." />
                      </Field>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── 5. Catalogue & Objectif ─────────── */}
      <div>
        <h3 className="font-body font-bold text-lg text-white mb-4">Votre catalogue</h3>
        <div className="space-y-4">
          <Field label="Nombre de titres dans votre catalogue" hint="Titres déjà sortis sur les plateformes">
            <Select value={form.nbTitres} onChange={(e) => set("nbTitres", e.target.value)}>
              <option value="" disabled>Sélectionner</option>
              {["1 titre", "2 à 5 titres", "6 à 15 titres", "16 à 30 titres", "Plus de 30 titres"].map((n) => (
                <option key={n} value={n} style={{ background: "#1C0A40", color: "white" }}>{n}</option>
              ))}
            </Select>
          </Field>
          <Field label="Quel est votre objectif principal ?" hint="Décrivez ce que vous souhaitez accomplir avec la monétisation">
            <Textarea rows={4} value={form.objectif} onChange={(e) => set("objectif", e.target.value)}
              placeholder="Ex: Je veux activer la monétisation YouTube, récupérer mes droits SODAV, et comprendre comment vivre de ma musique..." />
          </Field>
        </div>
      </div>

      {/* ── 6. Message ──────────────────────── */}
      <div>
        <h3 className="font-body font-bold text-lg text-white mb-4">Informations complémentaires</h3>
        <Textarea rows={4} value={form.message} onChange={(e) => set("message", e.target.value)}
          placeholder="Questions spécifiques, situation particulière, deadline, revenus actuels à optimiser..." />
      </div>

      {status === "error" && <p className="font-body text-sm text-red-400 text-center">{errorMsg}</p>}

      <button type="submit" disabled={status === "loading" || !form.serviceType || !form.nomArtiste || !form.email}
        className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-body font-bold text-base text-black transition-all disabled:opacity-50 hover:scale-[1.02]"
        style={{ background: "linear-gradient(135deg, #C8A84B 0%, #D4A83A 100%)", boxShadow: "0 8px 30px rgba(200,168,75,0.35)" }}>
        {status === "loading"
          ? <><Loader2 size={18} className="animate-spin" /> Envoi en cours...</>
          : "Envoyer ma demande →"}
      </button>

      <p className="text-center font-body text-xs" style={{ color: "rgba(220,210,255,0.35)" }}>
        Devis personnalisé sous 24h · Sans engagement
      </p>
    </form>
  );
}
