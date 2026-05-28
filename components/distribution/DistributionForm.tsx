"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Loader2, ChevronDown } from "lucide-react";

type ReleaseType = "single" | "ep" | "album" | "mixtape";

const genres = [
  "Afrobeats", "Afropop", "Coupé-décalé", "Mbalax", "Rap/Hip-Hop",
  "R&B/Soul", "Gospel", "Reggae/Dancehall", "Amapiano", "Jazz",
  "Électronique", "Pop", "Rock", "Zouk", "Autre",
];

const languages = ["Français", "Wolof", "Anglais", "Arabe", "Portugais", "Autre"];

const platforms = [
  "Spotify", "Apple Music", "Deezer", "YouTube Music",
  "Boomplay", "Audiomack", "Tidal", "Amazon Music",
  "iTunes", "Shazam", "SoundCloud", "Anghami",
];

const releaseRequirements: Record<ReleaseType, { tracks: string; cover: string; audio: string }> = {
  single:  { tracks: "1 titre",      cover: "1 cover art 3000×3000 px (JPG/PNG)",       audio: "WAV 24bit/44.1kHz" },
  ep:      { tracks: "2 à 6 titres", cover: "1 cover art 3000×3000 px + photos artiste", audio: "WAV 24bit/44.1kHz par titre" },
  album:   { tracks: "7 titres +",   cover: "Cover + photos + artwork intérieur",         audio: "WAV 24bit/44.1kHz + ordre définitif" },
  mixtape: { tracks: "Variable",     cover: "Cover art + crédits samples/features",       audio: "WAV ou MP3 320kbps — droits à clarifier" },
};

interface FormData {
  /* Artiste */
  nomArtiste: string;
  nomLegal: string;
  email: string;
  telephone: string;
  pays: string;
  /* Projet */
  releaseType: ReleaseType | "";
  titreProjet: string;
  genre: string;
  sousGenre: string;
  langue: string;
  nombreTitres: string;
  dateSortie: string;
  featuring: string;
  /* Droits */
  compositeurs: string;
  editeur: string;
  label: string;
  isrcExistant: string;
  upcExistant: string;
  proMembership: string;
  /* Visuels */
  coverPret: string;
  photosPret: string;
  styleVisuel: string;
  /* Audio */
  mastersPrets: string;
  masteringInclus: string;
  /* Plateformes */
  toutesPlateformes: boolean;
  plateformesChoisies: string[];
  /* Droits samples */
  contientSamples: string;
  clearancesSamples: string;
  /* Promotion */
  bioArtiste: string;
  instagram: string;
  tiktok: string;
  youtube: string;
  spotifyExistant: string;
  planPromotion: string;
  /* Formule */
  formule: string;
  message: string;
}

const initial: FormData = {
  nomArtiste: "", nomLegal: "", email: "", telephone: "", pays: "Sénégal",
  releaseType: "", titreProjet: "", genre: "", sousGenre: "", langue: "", nombreTitres: "", dateSortie: "", featuring: "",
  compositeurs: "", editeur: "", label: "", isrcExistant: "non", upcExistant: "non", proMembership: "",
  coverPret: "", photosPret: "", styleVisuel: "",
  mastersPrets: "", masteringInclus: "non",
  toutesPlateformes: true, plateformesChoisies: [],
  contientSamples: "non", clearancesSamples: "",
  bioArtiste: "", instagram: "", tiktok: "", youtube: "", spotifyExistant: "", planPromotion: "",
  formule: "", message: "",
};

function Field({ label, required, children, hint, className }: { label: string; required?: boolean; children: React.ReactNode; hint?: string; className?: string }) {
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

const inputCls = "w-full px-4 py-3 rounded-xl font-body text-sm text-white placeholder-white/30 outline-none transition-colors focus:ring-1 focus:ring-gold/60";
const inputStyle = { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" };

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${inputCls} ${props.className ?? ""}`} style={inputStyle} />;
}
function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${inputCls} resize-none ${props.className ?? ""}`} style={inputStyle} />;
}
function Select({ children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select {...props} className={`${inputCls} appearance-none pr-9 ${props.className ?? ""}`} style={{ ...inputStyle, color: props.value ? "white" : "rgba(255,255,255,0.30)" }}>
        {children}
      </select>
      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "rgba(255,255,255,0.40)" }} />
    </div>
  );
}

function RadioGroup({ name, options, value, onChange }: { name: string; options: { value: string; label: string }[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          className="px-4 py-2 rounded-full font-body text-xs font-medium transition-all"
          style={value === o.value
            ? { background: "#C8A84B", color: "#000", border: "1px solid #C8A84B" }
            : { background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.65)", border: "1px solid rgba(255,255,255,0.12)" }}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

const RELEASE_CARDS: { type: ReleaseType; label: string; emoji: string; color: string }[] = [
  { type: "single",  label: "Single",  emoji: "🎵", color: "#C8A84B" },
  { type: "ep",      label: "EP",      emoji: "💿", color: "#8B5CF6" },
  { type: "album",   label: "Album",   emoji: "📀", color: "#3B82F6" },
  { type: "mixtape", label: "Mixtape", emoji: "🎚️", color: "#10B981" },
];

export default function DistributionForm({ defaultFormule = "" }: { defaultFormule?: string }) {
  const [form, setForm] = useState<FormData>({ ...initial, formule: defaultFormule });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const set = (key: keyof FormData, value: FormData[keyof FormData]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const togglePlatform = (p: string) => {
    setForm((f) => ({
      ...f,
      plateformesChoisies: f.plateformesChoisies.includes(p)
        ? f.plateformesChoisies.filter((x) => x !== p)
        : [...f.plateformesChoisies, p],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/distribution/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Erreur serveur");
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("Une erreur est survenue. Réessayez ou écrivez-nous sur WhatsApp.");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-20 px-8"
      >
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "rgba(200,168,75,0.15)" }}>
          <CheckCircle size={36} className="text-gold" />
        </div>
        <h3 className="font-display text-3xl text-white mb-3">Demande envoyée !</h3>
        <p className="font-body text-base mb-2" style={{ color: "rgba(220,210,255,0.65)" }}>
          Nous avons bien reçu votre dossier de distribution.
        </p>
        <p className="font-body text-sm" style={{ color: "rgba(220,210,255,0.45)" }}>
          Notre équipe vous contacte dans les <strong className="text-gold">24h</strong> pour confirmer et démarrer le processus.
        </p>
      </motion.div>
    );
  }

  const req = form.releaseType ? releaseRequirements[form.releaseType] : null;

  return (
    <form onSubmit={handleSubmit} className="space-y-10">

      {/* ── 1. Type de release ───────────────────────── */}
      <div>
        <h3 className="font-body font-bold text-lg text-white mb-1">Type de release</h3>
        <p className="font-body text-xs mb-4" style={{ color: "rgba(220,210,255,0.45)" }}>Sélectionnez le format de votre projet</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          {RELEASE_CARDS.map(({ type, label, emoji, color }) => (
            <button
              key={type}
              type="button"
              onClick={() => set("releaseType", type)}
              className="flex flex-col items-center gap-2 p-4 rounded-2xl transition-all"
              style={form.releaseType === type
                ? { background: `${color}22`, border: `2px solid ${color}`, boxShadow: `0 4px 20px ${color}30` }
                : { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.10)" }}
            >
              <span className="text-2xl">{emoji}</span>
              <span className="font-body text-sm font-semibold text-white">{label}</span>
            </button>
          ))}
        </div>

        <AnimatePresence>
          {req && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="rounded-xl p-4 grid sm:grid-cols-3 gap-3 text-xs font-body" style={{ background: "rgba(200,168,75,0.08)", border: "1px solid rgba(200,168,75,0.20)" }}>
                <div><p className="text-gold font-semibold mb-0.5">Titres</p><p style={{ color: "rgba(255,255,255,0.65)" }}>{req.tracks}</p></div>
                <div><p className="text-gold font-semibold mb-0.5">Cover art</p><p style={{ color: "rgba(255,255,255,0.65)" }}>{req.cover}</p></div>
                <div><p className="text-gold font-semibold mb-0.5">Audio</p><p style={{ color: "rgba(255,255,255,0.65)" }}>{req.audio}</p></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── 2. Informations artiste ───────────────────── */}
      <div>
        <h3 className="font-body font-bold text-lg text-white mb-4">Informations artiste</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Nom d'artiste" required>
            <Input value={form.nomArtiste} onChange={(e) => set("nomArtiste", e.target.value)} placeholder="Ex: Youssou Ndour" required />
          </Field>
          <Field label="Nom légal" required hint="Utilisé pour les droits d'auteur">
            <Input value={form.nomLegal} onChange={(e) => set("nomLegal", e.target.value)} placeholder="Prénom Nom" required />
          </Field>
          <Field label="Email" required>
            <Input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="artiste@email.com" required />
          </Field>
          <Field label="Téléphone / WhatsApp" required>
            <Input value={form.telephone} onChange={(e) => set("telephone", e.target.value)} placeholder="+221 77 000 00 00" required />
          </Field>
          <Field label="Pays">
            <Input value={form.pays} onChange={(e) => set("pays", e.target.value)} placeholder="Sénégal" />
          </Field>
        </div>
      </div>

      {/* ── 3. Projet musical ────────────────────────── */}
      <div>
        <h3 className="font-body font-bold text-lg text-white mb-4">Projet musical</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Titre du projet" required>
            <Input value={form.titreProjet} onChange={(e) => set("titreProjet", e.target.value)} placeholder="Ex: Mon Premier Single" required />
          </Field>
          <Field label="Nombre de titres" required>
            <Input type="number" min="1" value={form.nombreTitres} onChange={(e) => set("nombreTitres", e.target.value)} placeholder="1" required />
          </Field>
          <Field label="Genre musical" required>
            <Select value={form.genre} onChange={(e) => set("genre", e.target.value)} required>
              <option value="" disabled>Sélectionner un genre</option>
              {genres.map((g) => <option key={g} value={g} style={{ background: "#1C0A40", color: "white" }}>{g}</option>)}
            </Select>
          </Field>
          <Field label="Sous-genre / Style">
            <Input value={form.sousGenre} onChange={(e) => set("sousGenre", e.target.value)} placeholder="Ex: Trap, Drill, Highlife..." />
          </Field>
          <Field label="Langue principale des paroles" required>
            <Select value={form.langue} onChange={(e) => set("langue", e.target.value)} required>
              <option value="" disabled>Sélectionner</option>
              {languages.map((l) => <option key={l} value={l} style={{ background: "#1C0A40", color: "white" }}>{l}</option>)}
            </Select>
          </Field>
          <Field label="Date de sortie souhaitée" required hint="Minimum 2 semaines de délai recommandé">
            <Input type="date" value={form.dateSortie} onChange={(e) => set("dateSortie", e.target.value)} required />
          </Field>
          <Field label="Artistes en featuring" className="sm:col-span-2">
            <Input value={form.featuring} onChange={(e) => set("featuring", e.target.value)} placeholder="Ex: Feat. Burna Boy, Feat. Roseline Layo" />
          </Field>
        </div>
      </div>

      {/* ── 4. Droits & Métadonnées ───────────────────── */}
      <div>
        <h3 className="font-body font-bold text-lg text-white mb-4">Droits & Métadonnées</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Compositeur(s) / Auteur(s)" required hint="Tous les noms séparés par une virgule">
            <Input value={form.compositeurs} onChange={(e) => set("compositeurs", e.target.value)} placeholder="Ex: Prénom Nom, Prénom Nom" required />
          </Field>
          <Field label="Éditeur / Publisher">
            <Input value={form.editeur} onChange={(e) => set("editeur", e.target.value)} placeholder="Éditeur ou Indépendant" />
          </Field>
          <Field label="Label">
            <Input value={form.label} onChange={(e) => set("label", e.target.value)} placeholder="Nom du label ou Indépendant" />
          </Field>
          <Field label="Société de droits d'auteur">
            <Input value={form.proMembership} onChange={(e) => set("proMembership", e.target.value)} placeholder="Ex: BSDA, SACEM, BMI, ASCAP..." />
          </Field>
          <Field label="Avez-vous des ISRC existants ?">
            <RadioGroup name="isrc" options={[{ value: "oui", label: "Oui" }, { value: "non", label: "Non — à générer" }]} value={form.isrcExistant} onChange={(v) => set("isrcExistant", v)} />
          </Field>
          <Field label="Avez-vous un UPC/EAN existant ?">
            <RadioGroup name="upc" options={[{ value: "oui", label: "Oui" }, { value: "non", label: "Non — à générer" }]} value={form.upcExistant} onChange={(v) => set("upcExistant", v)} />
          </Field>
        </div>

        {/* Samples */}
        <div className="mt-4 grid sm:grid-cols-2 gap-4">
          <Field label="Votre musique contient-elle des samples ?">
            <RadioGroup name="samples" options={[{ value: "non", label: "Non" }, { value: "oui", label: "Oui" }]} value={form.contientSamples} onChange={(v) => set("contientSamples", v)} />
          </Field>
          <AnimatePresence>
            {form.contientSamples === "oui" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Field label="Clearances / autorisations obtenues ?">
                  <RadioGroup name="clearances" options={[{ value: "oui", label: "Oui, tout est réglé" }, { value: "non", label: "Non, besoin d'aide" }, { value: "en_cours", label: "En cours" }]} value={form.clearancesSamples} onChange={(v) => set("clearancesSamples", v)} />
                </Field>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── 5. Cover Art & Visuels ───────────────────── */}
      <div>
        <h3 className="font-body font-bold text-lg text-white mb-1">Cover Art & Visuels</h3>
        <p className="font-body text-xs mb-4" style={{ color: "rgba(220,210,255,0.45)" }}>Standard plateformes : 3000×3000 px minimum, JPG ou PNG, sans texte illisible, sans logo de plateforme</p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Votre cover art est-il prêt ?" required>
            <RadioGroup name="cover" options={[{ value: "oui", label: "Oui, prêt" }, { value: "non", label: "Non — besoin d'aide" }, { value: "en_cours", label: "En cours de création" }]} value={form.coverPret} onChange={(v) => set("coverPret", v)} />
          </Field>
          <Field label="Photos artiste disponibles ?">
            <RadioGroup name="photos" options={[{ value: "oui", label: "Oui" }, { value: "non", label: "Non — shooting nécessaire" }]} value={form.photosPret} onChange={(v) => set("photosPret", v)} />
          </Field>
          <Field label="Style / direction artistique souhaitée" className="sm:col-span-2">
            <Textarea rows={3} value={form.styleVisuel} onChange={(e) => set("styleVisuel", e.target.value)} placeholder="Décrivez l'ambiance, les couleurs, les références visuelles souhaitées..." />
          </Field>
        </div>
      </div>

      {/* ── 6. Fichiers Audio ────────────────────────── */}
      <div>
        <h3 className="font-body font-bold text-lg text-white mb-1">Fichiers Audio</h3>
        <p className="font-body text-xs mb-4" style={{ color: "rgba(220,210,255,0.45)" }}>Standard requis : WAV 24 bit / 44.1 kHz (ou 48 kHz) — pas de MP3 pour le master final</p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Vos masters audio sont-ils prêts ?" required>
            <RadioGroup name="masters" options={[{ value: "oui", label: "Oui, prêts" }, { value: "mixage", label: "Mix OK — pas masterisé" }, { value: "non", label: "Pas encore" }]} value={form.mastersPrets} onChange={(v) => set("mastersPrets", v)} />
          </Field>
          <Field label="Souhaitez-vous le mastering KEKELI ?">
            <RadioGroup name="mastering" options={[{ value: "oui", label: "Oui (+option)" }, { value: "non", label: "Non, déjà masterisé" }]} value={form.masteringInclus} onChange={(v) => set("masteringInclus", v)} />
          </Field>
        </div>
      </div>

      {/* ── 7. Plateformes ───────────────────────────── */}
      <div>
        <h3 className="font-body font-bold text-lg text-white mb-4">Plateformes de diffusion</h3>
        <div className="flex items-center gap-3 mb-4">
          <button
            type="button"
            onClick={() => set("toutesPlateformes", !form.toutesPlateformes)}
            className="flex items-center gap-2 px-4 py-2 rounded-full font-body text-sm font-semibold transition-all"
            style={form.toutesPlateformes
              ? { background: "#C8A84B", color: "#000" }
              : { background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.65)", border: "1px solid rgba(255,255,255,0.12)" }}
          >
            Toutes les plateformes (recommandé)
          </button>
        </div>
        <AnimatePresence>
          {!form.toutesPlateformes && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
              <div className="flex flex-wrap gap-2 pt-1">
                {platforms.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => togglePlatform(p)}
                    className="px-3 py-1.5 rounded-full font-body text-xs font-medium transition-all"
                    style={form.plateformesChoisies.includes(p)
                      ? { background: "rgba(200,168,75,0.20)", color: "#C8A84B", border: "1px solid #C8A84B" }
                      : { background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.10)" }}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── 8. Promotion & Réseaux ───────────────────── */}
      <div>
        <h3 className="font-body font-bold text-lg text-white mb-4">Bio & Réseaux sociaux</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Bio artiste courte" hint="Max 300 caractères — utilisée sur les plateformes" className="sm:col-span-2">
            <Textarea rows={3} maxLength={300} value={form.bioArtiste} onChange={(e) => set("bioArtiste", e.target.value)} placeholder="Décrivez votre univers artistique en quelques phrases..." />
          </Field>
          <Field label="Instagram">
            <Input value={form.instagram} onChange={(e) => set("instagram", e.target.value)} placeholder="@nomartiste" />
          </Field>
          <Field label="TikTok">
            <Input value={form.tiktok} onChange={(e) => set("tiktok", e.target.value)} placeholder="@nomartiste" />
          </Field>
          <Field label="YouTube">
            <Input value={form.youtube} onChange={(e) => set("youtube", e.target.value)} placeholder="Lien chaîne YouTube" />
          </Field>
          <Field label="Profil Spotify existant">
            <Input value={form.spotifyExistant} onChange={(e) => set("spotifyExistant", e.target.value)} placeholder="Lien Spotify artiste" />
          </Field>
          <Field label="Plan de promotion prévu ?" className="sm:col-span-2">
            <RadioGroup name="promo" options={[{ value: "oui", label: "Oui" }, { value: "non", label: "Non" }, { value: "aide", label: "Besoin d'aide KEKELI" }]} value={form.planPromotion} onChange={(v) => set("planPromotion", v)} />
          </Field>
        </div>
      </div>

      {/* ── 9. Message ───────────────────────────────── */}
      <div>
        <h3 className="font-body font-bold text-lg text-white mb-4">Message complémentaire</h3>
        <Textarea rows={4} value={form.message} onChange={(e) => set("message", e.target.value)} placeholder="Toute information utile : deadline impérative, contexte du projet, questions spécifiques..." />
      </div>

      {/* ── Submit ───────────────────────────────────── */}
      {status === "error" && (
        <p className="font-body text-sm text-red-400 text-center">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading" || !form.releaseType || !form.nomArtiste || !form.email}
        className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-body font-bold text-base text-black transition-all disabled:opacity-50"
        style={{ background: "linear-gradient(135deg, #C8A84B 0%, #F59E0B 100%)", boxShadow: "0 8px 30px rgba(200,168,75,0.40)" }}
      >
        {status === "loading" ? (
          <><Loader2 size={18} className="animate-spin" /> Envoi en cours...</>
        ) : (
          "Soumettre ma demande de distribution →"
        )}
      </button>

      <p className="text-center font-body text-xs" style={{ color: "rgba(220,210,255,0.35)" }}>
        Réponse de notre équipe sous 24h · Données confidentielles
      </p>
    </form>
  );
}
