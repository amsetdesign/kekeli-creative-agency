"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Loader2, ChevronDown } from "lucide-react";

type ServiceType = "site" | "epk" | "bio" | "reseaux";

const SERVICE_TYPES: { type: ServiceType; emoji: string; label: string; desc: string }[] = [
  { type: "site",    emoji: "🌐", label: "Site web artiste",            desc: "Site vitrine ou portfolio professionnel qui présente votre univers, vos projets et vos contacts presse." },
  { type: "epk",     emoji: "📁", label: "EPK (Electronic Press Kit)",  desc: "Dossier de presse numérique complet pour décrocher des médias, festivals et collaborations." },
  { type: "bio",     emoji: "✍️", label: "Bio & Textes",                desc: "Biographie artiste percutante, textes de présentation et contenus adaptés à chaque support." },
  { type: "reseaux", emoji: "📱", label: "Pack réseaux sociaux",        desc: "Templates, bannières et visuels cohérents pour un profil professionnel sur toutes les plateformes." },
];

const styleVisuels = [
  "Minimaliste", "Coloré & Vibrant", "Sombre & Mystérieux", "Élégant & Luxe",
  "Afrocentrique", "Moderne & Épuré", "Vintage / Rétro", "Artistique", "À définir ensemble",
];

const typesSite = ["Vitrine simple (1 page)", "Portfolio complet", "Avec espace presse", "Avec formulaire contact", "Avec intégration streaming"];

const contenuEPK = [
  "Biographie artiste", "Photos professionnelles", "Discographie complète",
  "Liens streaming", "Revue de presse", "Contacts booking", "Rider technique", "Vidéos live",
];

const genres = [
  "Afrobeats", "Afropop", "Mbalax", "Rap / Hip-Hop", "R&B / Soul",
  "Gospel", "Reggae / Dancehall", "Amapiano", "Pop", "Jazz", "Autre",
];

const pays = [
  "Sénégal", "Côte d'Ivoire", "Mali", "Burkina Faso", "Guinée", "Cameroun",
  "Congo", "Gabon", "Bénin", "Togo", "Niger", "France", "Belgique", "Canada", "Autre",
];

const plateformesReseaux = ["Instagram", "Facebook", "TikTok", "YouTube", "Twitter / X", "LinkedIn"];
const elementsReseaux    = ["Photo de profil", "Bannière / Cover", "Templates stories", "Templates posts", "Highlights covers", "Bio optimisée"];

interface FormData {
  nomArtiste: string;
  email: string;
  telephone: string;
  paysResidence: string;
  genre: string;
  services: ServiceType[];
  /* Site */
  typesSiteChoisis: string[];
  styleVisuel: string;
  urlActuelle: string;
  /* EPK */
  formatEPK: string;
  langueEPK: string;
  contenuEPKChoisi: string[];
  /* Bio */
  longueurBio: string;
  langueBio: string;
  tonBio: string;
  /* Réseaux */
  plateformesChoisies: string[];
  elementsChoisis: string[];
  /* Commun */
  couleursUnivers: string;
  references: string;
  delaiSouhaite: string;
  message: string;
}

const initial: FormData = {
  nomArtiste: "", email: "", telephone: "", paysResidence: "", genre: "",
  services: [],
  typesSiteChoisis: [], styleVisuel: "", urlActuelle: "",
  formatEPK: "", langueEPK: "", contenuEPKChoisi: [],
  longueurBio: "", langueBio: "", tonBio: "",
  plateformesChoisies: [], elementsChoisis: [],
  couleursUnivers: "", references: "", delaiSouhaite: "", message: "",
};

const ACCENT = "#FF6B6B";
const inputStyle = { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" };
const inputCls = "w-full px-4 py-3 rounded-xl font-body text-sm text-white placeholder-white/30 outline-none transition-colors focus:ring-1 focus:ring-red-400/60";

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
        {label} {required && <span style={{ color: "#FECACA" }}>*</span>}
      </label>
      {hint && <p className="font-body text-xs mb-2" style={{ color: "rgba(255,200,200,0.45)" }}>{hint}</p>}
      {children}
    </div>
  );
}
function ChipToggle({ items, selected, onToggle, single }: { items: string[]; selected: string[]; onToggle: (v: string) => void; single?: boolean }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <button key={item} type="button" onClick={() => onToggle(item)}
          className="px-3 py-1.5 rounded-full font-body text-xs font-medium transition-all"
          style={selected.includes(item)
            ? { background: "rgba(255,107,107,0.20)", color: ACCENT, border: `1px solid ${ACCENT}` }
            : { background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.10)" }}>
          {item}
        </button>
      ))}
    </div>
  );
}

export default function IdentiteForm() {
  const [form, setForm] = useState<FormData>(initial);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const set = (key: keyof FormData, value: FormData[keyof FormData]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const toggleService = (s: ServiceType) =>
    setForm((f) => ({ ...f, services: f.services.includes(s) ? f.services.filter((x) => x !== s) : [...f.services, s] }));

  const toggleArr = (key: keyof FormData, val: string) =>
    setForm((f) => {
      const arr = f[key] as string[];
      return { ...f, [key]: arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val] };
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/identite/contact", {
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
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "rgba(255,107,107,0.15)" }}>
          <CheckCircle size={36} style={{ color: ACCENT }} />
        </div>
        <h3 className="font-display text-3xl text-white mb-3">Demande reçue !</h3>
        <p className="font-body text-base mb-2" style={{ color: "rgba(255,200,200,0.65)" }}>
          Nous avons bien reçu votre demande d&apos;identité digitale.
        </p>
        <p className="font-body text-sm" style={{ color: "rgba(255,200,200,0.45)" }}>
          Notre équipe vous contacte dans les <strong style={{ color: ACCENT }}>24h</strong> avec une proposition personnalisée.
        </p>
      </motion.div>
    );
  }

  const showSite    = form.services.includes("site");
  const showEPK     = form.services.includes("epk");
  const showBio     = form.services.includes("bio");
  const showReseaux = form.services.includes("reseaux");

  return (
    <form onSubmit={handleSubmit} className="space-y-10">

      {/* ── 1. Services ──────────────────────── */}
      <div>
        <h3 className="font-body font-bold text-lg text-white mb-1">Que souhaitez-vous créer ?</h3>
        <p className="font-body text-xs mb-4" style={{ color: "rgba(255,200,200,0.45)" }}>Sélectionnez un ou plusieurs services</p>
        <div className="grid grid-cols-1 gap-3">
          {SERVICE_TYPES.map(({ type, emoji, label, desc }) => {
            const selected = form.services.includes(type);
            return (
              <button key={type} type="button" onClick={() => toggleService(type)}
                className="flex items-start gap-3 p-4 rounded-2xl text-left transition-all"
                style={selected
                  ? { background: "rgba(255,107,107,0.14)", border: `2px solid ${ACCENT}`, boxShadow: "0 4px 20px rgba(255,107,107,0.20)" }
                  : { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.10)" }}>
                <span className="text-2xl shrink-0 mt-0.5">{emoji}</span>
                <div>
                  <p className="font-body font-semibold text-sm text-white mb-0.5">{label}</p>
                  <p className="font-body text-xs leading-relaxed" style={{ color: "rgba(255,200,200,0.55)" }}>{desc}</p>
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

      {/* ── 3. Site web (conditionnel) ───────── */}
      <AnimatePresence>
        {showSite && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
            <div>
              <h3 className="font-body font-bold text-lg text-white mb-4">Site web artiste</h3>
              <div className="space-y-4">
                <Field label="Type de site souhaité" hint="Sélectionnez tout ce qui correspond">
                  <ChipToggle items={typesSite} selected={form.typesSiteChoisis} onToggle={(v) => toggleArr("typesSiteChoisis", v)} />
                </Field>
                <Field label="Avez-vous déjà un site ?">
                  <Input value={form.urlActuelle} onChange={(e) => set("urlActuelle", e.target.value)} placeholder="https://monsite.com (ou laissez vide)" />
                </Field>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── 4. EPK (conditionnel) ────────────── */}
      <AnimatePresence>
        {showEPK && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
            <div>
              <h3 className="font-body font-bold text-lg text-white mb-4">Electronic Press Kit</h3>
              <div className="space-y-4">
                <Field label="Format souhaité">
                  <div className="flex flex-wrap gap-2">
                    {["PDF", "Web (lien en ligne)", "PDF + Web"].map((f) => (
                      <button key={f} type="button" onClick={() => set("formatEPK", f)}
                        className="px-3 py-1.5 rounded-full font-body text-xs font-medium transition-all"
                        style={form.formatEPK === f
                          ? { background: "rgba(255,107,107,0.20)", color: ACCENT, border: `1px solid ${ACCENT}` }
                          : { background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.10)" }}>
                        {f}
                      </button>
                    ))}
                  </div>
                </Field>
                <Field label="Langue(s)">
                  <div className="flex flex-wrap gap-2">
                    {["Français", "English", "Français + English"].map((l) => (
                      <button key={l} type="button" onClick={() => set("langueEPK", l)}
                        className="px-3 py-1.5 rounded-full font-body text-xs font-medium transition-all"
                        style={form.langueEPK === l
                          ? { background: "rgba(255,107,107,0.20)", color: ACCENT, border: `1px solid ${ACCENT}` }
                          : { background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.10)" }}>
                        {l}
                      </button>
                    ))}
                  </div>
                </Field>
                <Field label="Contenu à inclure" hint="Sélectionnez les éléments que vous souhaitez intégrer">
                  <ChipToggle items={contenuEPK} selected={form.contenuEPKChoisi} onToggle={(v) => toggleArr("contenuEPKChoisi", v)} />
                </Field>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── 5. Bio & Textes (conditionnel) ───── */}
      <AnimatePresence>
        {showBio && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
            <div>
              <h3 className="font-body font-bold text-lg text-white mb-4">Bio & Textes</h3>
              <div className="space-y-4">
                <Field label="Longueur souhaitée">
                  <div className="flex flex-wrap gap-2">
                    {["Courte (150 mots)", "Standard (300 mots)", "Longue (500+ mots)", "Les trois formats"].map((l) => (
                      <button key={l} type="button" onClick={() => set("longueurBio", l)}
                        className="px-3 py-1.5 rounded-full font-body text-xs font-medium transition-all"
                        style={form.longueurBio === l
                          ? { background: "rgba(255,107,107,0.20)", color: ACCENT, border: `1px solid ${ACCENT}` }
                          : { background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.10)" }}>
                        {l}
                      </button>
                    ))}
                  </div>
                </Field>
                <Field label="Langue(s)">
                  <div className="flex flex-wrap gap-2">
                    {["Français", "English", "Français + English"].map((l) => (
                      <button key={l} type="button" onClick={() => set("langueBio", l)}
                        className="px-3 py-1.5 rounded-full font-body text-xs font-medium transition-all"
                        style={form.langueBio === l
                          ? { background: "rgba(255,107,107,0.20)", color: ACCENT, border: `1px solid ${ACCENT}` }
                          : { background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.10)" }}>
                        {l}
                      </button>
                    ))}
                  </div>
                </Field>
                <Field label="Ton de la biographie">
                  <div className="flex flex-wrap gap-2">
                    {["Storytelling émotionnel", "Professionnel & factuel", "Créatif & poétique", "À définir ensemble"].map((t) => (
                      <button key={t} type="button" onClick={() => set("tonBio", t)}
                        className="px-3 py-1.5 rounded-full font-body text-xs font-medium transition-all"
                        style={form.tonBio === t
                          ? { background: "rgba(255,107,107,0.20)", color: ACCENT, border: `1px solid ${ACCENT}` }
                          : { background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.10)" }}>
                        {t}
                      </button>
                    ))}
                  </div>
                </Field>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── 6. Pack réseaux (conditionnel) ───── */}
      <AnimatePresence>
        {showReseaux && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
            <div>
              <h3 className="font-body font-bold text-lg text-white mb-4">Pack réseaux sociaux</h3>
              <div className="space-y-4">
                <Field label="Plateformes à couvrir">
                  <ChipToggle items={plateformesReseaux} selected={form.plateformesChoisies} onToggle={(v) => toggleArr("plateformesChoisies", v)} />
                </Field>
                <Field label="Éléments à créer">
                  <ChipToggle items={elementsReseaux} selected={form.elementsChoisis} onToggle={(v) => toggleArr("elementsChoisis", v)} />
                </Field>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── 7. Univers & Références ───────────── */}
      <div>
        <h3 className="font-body font-bold text-lg text-white mb-4">Votre univers artistique</h3>
        <div className="space-y-4">
          <Field label="Style visuel souhaité">
            <ChipToggle items={styleVisuels} selected={form.styleVisuel ? [form.styleVisuel] : []} onToggle={(v) => set("styleVisuel", form.styleVisuel === v ? "" : v)} single />
          </Field>
          <Field label="Couleurs & univers" hint="Décrivez vos couleurs, ambiances, inspirations visuelles">
            <Input value={form.couleursUnivers} onChange={(e) => set("couleursUnivers", e.target.value)}
              placeholder="Ex: Tons chauds, orangé et doré, ambiance coucher de soleil..." />
          </Field>
          <Field label="Références" hint="Sites, EPK ou profils que vous appréciez">
            <Textarea rows={3} value={form.references} onChange={(e) => set("references", e.target.value)}
              placeholder="Ex: J'aime l'univers de Burna Boy, le site de Tayc, l'EPK d'Aya Nakamura..." />
          </Field>
        </div>
      </div>

      {/* ── 8. Délai ────────────────────────── */}
      <Field label="Délai souhaité">
        <Select value={form.delaiSouhaite} onChange={(e) => set("delaiSouhaite", e.target.value)}>
          <option value="" disabled>Sélectionner</option>
          {["Urgent (moins de 2 semaines)", "Dans 1 mois", "Dans 2 à 3 mois", "Pas de contrainte"].map((d) => (
            <option key={d} value={d} style={{ background: "#1C0A40", color: "white" }}>{d}</option>
          ))}
        </Select>
      </Field>

      {/* ── 9. Message ──────────────────────── */}
      <div>
        <h3 className="font-body font-bold text-lg text-white mb-4">Informations complémentaires</h3>
        <Textarea rows={4} value={form.message} onChange={(e) => set("message", e.target.value)}
          placeholder="Contexte de votre projet, événement à venir, contraintes particulières, questions..." />
      </div>

      {status === "error" && <p className="font-body text-sm text-red-400 text-center">{errorMsg}</p>}

      <button type="submit" disabled={status === "loading" || form.services.length === 0 || !form.nomArtiste || !form.email}
        className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-body font-bold text-base text-white transition-all disabled:opacity-50 hover:scale-[1.02]"
        style={{ background: "linear-gradient(135deg, #FF6B6B 0%, #E63946 100%)", boxShadow: "0 8px 30px rgba(255,107,107,0.35)" }}>
        {status === "loading"
          ? <><Loader2 size={18} className="animate-spin" /> Envoi en cours...</>
          : "Envoyer ma demande →"}
      </button>

      <p className="text-center font-body text-xs" style={{ color: "rgba(255,200,200,0.35)" }}>
        Devis personnalisé sous 24h · Sans engagement
      </p>
    </form>
  );
}
