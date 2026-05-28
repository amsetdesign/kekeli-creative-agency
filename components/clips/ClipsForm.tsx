"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Loader2, ChevronDown } from "lucide-react";

const genres = [
  "Afrobeats", "Afropop", "Coupé-décalé", "Mbalax", "Rap/Hip-Hop",
  "R&B/Soul", "Gospel", "Reggae/Dancehall", "Amapiano", "Jazz",
  "Électronique", "Pop", "Zouk", "Autre",
];

const lieux = [
  "Studio professionnel Dakar",
  "Extérieur Dakar (plage, rue, quartier...)",
  "Intérieur / décor naturel",
  "Les deux (studio + extérieur)",
  "Région (hors Dakar)",
  "International",
];

const diffusions = ["YouTube", "TikTok", "Instagram", "Facebook", "Toutes plateformes"];

const budgets = [
  "Moins de 200 000 FCFA",
  "200 000 – 500 000 FCFA",
  "500 000 – 1 000 000 FCFA",
  "1 000 000 – 2 000 000 FCFA",
  "Plus de 2 000 000 FCFA",
  "À définir ensemble",
];

type ProductionType = "clip" | "lyric" | "teaser" | "multi";

const PROD_TYPES: { type: ProductionType; emoji: string; label: string; desc: string; color: string }[] = [
  { type: "clip",   emoji: "🎬", label: "Clip Officiel",        desc: "Réalisation cinématique complète avec storytelling, décors et équipe",  color: "#EC4899" },
  { type: "lyric",  emoji: "✨", label: "Lyric Video / Visualizer", desc: "Vidéo animée avec paroles ou visuels musicaux — idéal pour les réseaux", color: "#8B5CF6" },
  { type: "teaser", emoji: "⚡", label: "Teaser / Trailer",     desc: "Courte vidéo percutante pour annoncer une sortie ou un événement",      color: "#F97316" },
  { type: "multi",  emoji: "🎥", label: "Pack Multi-vidéos",    desc: "Clip officiel + teaser + contenu réseaux — pack complet",               color: "#C8A84B" },
];

interface FormData {
  /* Artiste */
  nomArtiste: string;
  email: string;
  telephone: string;
  /* Production */
  productionType: ProductionType | "";
  titreSon: string;
  genre: string;
  /* Concept */
  concept: string;
  references: string;
  ambianceColorimetrie: string;
  /* Tournage */
  lieu: string;
  dateTournage: string;
  dateSortie: string;
  joursTournage: string;
  /* Besoins techniques */
  acteursFigurants: string;
  drone: string;
  costumes: string;
  /* Diffusion & Budget */
  diffusion: string[];
  budget: string;
  /* Message */
  message: string;
}

const initial: FormData = {
  nomArtiste: "", email: "", telephone: "",
  productionType: "", titreSon: "", genre: "",
  concept: "", references: "", ambianceColorimetrie: "",
  lieu: "", dateTournage: "", dateSortie: "", joursTournage: "",
  acteursFigurants: "non", drone: "non", costumes: "non",
  diffusion: [], budget: "",
  message: "",
};

const inputStyle = { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" };
const inputCls = "w-full px-4 py-3 rounded-xl font-body text-sm text-white placeholder-white/30 outline-none transition-colors focus:ring-1 focus:ring-gold/60";

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
            ? { background: "#C8A84B", color: "#000", border: "1px solid #C8A84B" }
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
        {label} {required && <span className="text-gold">*</span>}
      </label>
      {hint && <p className="font-body text-xs mb-2" style={{ color: "rgba(220,210,255,0.45)" }}>{hint}</p>}
      {children}
    </div>
  );
}

export default function ClipsForm() {
  const [form, setForm] = useState<FormData>(initial);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const set = (key: keyof FormData, value: FormData[keyof FormData]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const toggleDiffusion = (p: string) =>
    setForm((f) => ({
      ...f,
      diffusion: f.diffusion.includes(p) ? f.diffusion.filter((x) => x !== p) : [...f.diffusion, p],
    }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/clips/contact", {
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
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "rgba(236,72,153,0.15)" }}>
          <CheckCircle size={36} className="text-gold" />
        </div>
        <h3 className="font-display text-3xl text-white mb-3">Brief reçu !</h3>
        <p className="font-body text-base mb-2" style={{ color: "rgba(220,210,255,0.65)" }}>
          Nous avons bien reçu votre demande de production vidéo.
        </p>
        <p className="font-body text-sm" style={{ color: "rgba(220,210,255,0.45)" }}>
          Notre équipe vous contacte dans les <strong className="text-gold">24h</strong> avec un devis personnalisé.
        </p>
      </motion.div>
    );
  }

  const selectedProd = PROD_TYPES.find((p) => p.type === form.productionType);

  return (
    <form onSubmit={handleSubmit} className="space-y-10">

      {/* ── 1. Type de production ───────── */}
      <div>
        <h3 className="font-body font-bold text-lg text-white mb-1">Type de production</h3>
        <p className="font-body text-xs mb-4" style={{ color: "rgba(220,210,255,0.45)" }}>Quel format vidéo souhaitez-vous ?</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {PROD_TYPES.map(({ type, emoji, label, desc, color }) => (
            <button key={type} type="button" onClick={() => set("productionType", type)}
              className="flex items-start gap-3 p-4 rounded-2xl text-left transition-all"
              style={form.productionType === type
                ? { background: `${color}20`, border: `2px solid ${color}`, boxShadow: `0 4px 20px ${color}25` }
                : { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.10)" }}>
              <span className="text-2xl shrink-0 mt-0.5">{emoji}</span>
              <div>
                <p className="font-body font-semibold text-sm text-white mb-0.5">{label}</p>
                <p className="font-body text-xs leading-relaxed" style={{ color: "rgba(220,210,255,0.55)" }}>{desc}</p>
              </div>
            </button>
          ))}
        </div>
        <AnimatePresence>
          {selectedProd && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden mt-3">
              <div className="rounded-xl px-4 py-3 font-body text-xs" style={{ background: `${selectedProd.color}12`, border: `1px solid ${selectedProd.color}30`, color: "rgba(220,210,255,0.65)" }}>
                ✓ {selectedProd.label} sélectionné — remplissez les détails ci-dessous pour recevoir votre devis.
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── 2. Informations artiste ────── */}
      <div>
        <h3 className="font-body font-bold text-lg text-white mb-4">Informations artiste</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Nom d'artiste" required>
            <Input value={form.nomArtiste} onChange={(e) => set("nomArtiste", e.target.value)} placeholder="Ex: Youssou Ndour" required />
          </Field>
          <Field label="Email" required>
            <Input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="artiste@email.com" required />
          </Field>
          <Field label="Téléphone / WhatsApp" required>
            <Input value={form.telephone} onChange={(e) => set("telephone", e.target.value)} placeholder="+221 77 000 00 00" required />
          </Field>
          <Field label="Genre musical">
            <Select value={form.genre} onChange={(e) => set("genre", e.target.value)}>
              <option value="" disabled>Sélectionner un genre</option>
              {genres.map((g) => <option key={g} value={g} style={{ background: "#1C0A40", color: "white" }}>{g}</option>)}
            </Select>
          </Field>
          <Field label="Titre du son / projet" required className="sm:col-span-2">
            <Input value={form.titreSon} onChange={(e) => set("titreSon", e.target.value)} placeholder="Titre du son pour lequel vous voulez un clip" required />
          </Field>
        </div>
      </div>

      {/* ── 3. Concept & Direction artistique ── */}
      <div>
        <h3 className="font-body font-bold text-lg text-white mb-4">Concept & Direction artistique</h3>
        <div className="space-y-4">
          <Field label="Concept / Synopsis" required hint="Décrivez l'histoire, l'ambiance, les idées que vous avez pour le clip">
            <Textarea rows={5} value={form.concept} onChange={(e) => set("concept", e.target.value)}
              placeholder="Ex: Un clip qui raconte l'histoire d'un jeune de Dakar qui réalise son rêve. Ambiance rue, coucher de soleil, teintes chaudes... Scènes de danse, plans sur le visage de l'artiste..." required />
          </Field>
          <Field label="Références" hint="Nommez des clips, films ou artistes dont vous aimez le style visuel">
            <Textarea rows={3} value={form.references} onChange={(e) => set("references", e.target.value)}
              placeholder="Ex: Style visuel de Burna Boy 'Last Last', couleurs de Drake 'God's Plan', ambiance sombre de The Weeknd..." />
          </Field>
          <Field label="Ambiance / Colorimétrie souhaitée">
            <Input value={form.ambianceColorimetrie} onChange={(e) => set("ambianceColorimetrie", e.target.value)}
              placeholder="Ex: Teintes chaudes, noir et blanc, couleurs vives, cinématique sombre..." />
          </Field>
        </div>
      </div>

      {/* ── 4. Tournage ─────────────────── */}
      <div>
        <h3 className="font-body font-bold text-lg text-white mb-4">Tournage</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Lieu de tournage souhaité" required>
            <Select value={form.lieu} onChange={(e) => set("lieu", e.target.value)} required>
              <option value="" disabled>Sélectionner un lieu</option>
              {lieux.map((l) => <option key={l} value={l} style={{ background: "#1C0A40", color: "white" }}>{l}</option>)}
            </Select>
          </Field>
          <Field label="Nombre de jours de tournage envisagé">
            <Select value={form.joursTournage} onChange={(e) => set("joursTournage", e.target.value)}>
              <option value="" disabled>Sélectionner</option>
              {["Demi-journée", "1 jour", "2 jours", "3 jours et plus", "À définir"].map((d) => (
                <option key={d} value={d} style={{ background: "#1C0A40", color: "white" }}>{d}</option>
              ))}
            </Select>
          </Field>
          <Field label="Date de tournage souhaitée">
            <Input type="date" value={form.dateTournage} onChange={(e) => set("dateTournage", e.target.value)} />
          </Field>
          <Field label="Date de sortie prévue">
            <Input type="date" value={form.dateSortie} onChange={(e) => set("dateSortie", e.target.value)} />
          </Field>
        </div>
      </div>

      {/* ── 5. Besoins techniques ─────── */}
      <div>
        <h3 className="font-body font-bold text-lg text-white mb-4">Besoins techniques</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <Field label="Acteurs / Figurants nécessaires ?">
            <RadioGroup options={[{ value: "oui", label: "Oui" }, { value: "non", label: "Non" }, { value: "casting", label: "Besoin casting" }]} value={form.acteursFigurants} onChange={(v) => set("acteursFigurants", v)} />
          </Field>
          <Field label="Prise de vue drone / aérien ?">
            <RadioGroup options={[{ value: "oui", label: "Oui" }, { value: "non", label: "Non" }]} value={form.drone} onChange={(v) => set("drone", v)} />
          </Field>
          <Field label="Costumes / Stylisme prévu ?">
            <RadioGroup options={[{ value: "oui", label: "Oui" }, { value: "non", label: "Non" }, { value: "aide", label: "Besoin aide" }]} value={form.costumes} onChange={(v) => set("costumes", v)} />
          </Field>
        </div>
      </div>

      {/* ── 6. Diffusion & Budget ────────── */}
      <div>
        <h3 className="font-body font-bold text-lg text-white mb-4">Diffusion & Budget</h3>
        <div className="space-y-4">
          <Field label="Plateformes de diffusion prévues">
            <div className="flex flex-wrap gap-2">
              {diffusions.map((p) => (
                <button key={p} type="button" onClick={() => toggleDiffusion(p)}
                  className="px-3 py-1.5 rounded-full font-body text-xs font-medium transition-all"
                  style={form.diffusion.includes(p)
                    ? { background: "rgba(200,168,75,0.20)", color: "#C8A84B", border: "1px solid #C8A84B" }
                    : { background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.10)" }}>
                  {p}
                </button>
              ))}
            </div>
          </Field>
          <Field label="Budget approximatif">
            <Select value={form.budget} onChange={(e) => set("budget", e.target.value)}>
              <option value="" disabled>Sélectionner une fourchette</option>
              {budgets.map((b) => <option key={b} value={b} style={{ background: "#1C0A40", color: "white" }}>{b}</option>)}
            </Select>
          </Field>
        </div>
      </div>

      {/* ── 7. Message ──────────────────── */}
      <div>
        <h3 className="font-body font-bold text-lg text-white mb-4">Informations complémentaires</h3>
        <Textarea rows={4} value={form.message} onChange={(e) => set("message", e.target.value)}
          placeholder="Tout autre détail : deadline impérative, contraintes particulières, inspirations supplémentaires, questions..." />
      </div>

      {status === "error" && <p className="font-body text-sm text-red-400 text-center">{errorMsg}</p>}

      <button type="submit" disabled={status === "loading" || !form.productionType || !form.nomArtiste || !form.email}
        className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-body font-bold text-base text-black transition-all disabled:opacity-50"
        style={{ background: "linear-gradient(135deg, #EC4899 0%, #C2185B 100%)", boxShadow: "0 8px 30px rgba(236,72,153,0.35)" }}>
        {status === "loading"
          ? <><Loader2 size={18} className="animate-spin" /> Envoi en cours...</>
          : "Envoyer mon brief vidéo →"}
      </button>

      <p className="text-center font-body text-xs" style={{ color: "rgba(220,210,255,0.35)" }}>
        Devis personnalisé sous 24h · Sans engagement
      </p>
    </form>
  );
}
