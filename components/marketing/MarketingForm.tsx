"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Loader2, ChevronDown } from "lucide-react";

type ServiceType = "ads" | "promotion" | "influenceurs";

const SERVICE_TYPES: { type: ServiceType; emoji: string; label: string; desc: string }[] = [
  { type: "ads",          emoji: "📣", label: "Publicité payante (Ads)",      desc: "Campagnes Facebook Ads, Instagram Ads, TikTok Ads et YouTube Ads ciblées sur votre audience." },
  { type: "promotion",    emoji: "🎯", label: "Promotion clips & sorties",    desc: "Boost de vues, streams et téléchargements pour maximiser l'impact de vos sorties musicales." },
  { type: "influenceurs", emoji: "🌟", label: "Influenceurs & placements",    desc: "Mise en relation avec des influenceurs, blogueurs musicaux et pages musicales africaines." },
];

const plateformesAds = ["Facebook / Instagram", "TikTok", "YouTube", "Boomplay", "Spotify Ads", "Google Ads"];

const budgets = [
  "Moins de 50 000 FCFA",
  "50 000 – 150 000 FCFA",
  "150 000 – 500 000 FCFA",
  "500 000 – 1 000 000 FCFA",
  "Plus de 1 000 000 FCFA",
  "À définir ensemble",
];

const objectifsMarketing = [
  "Augmenter les vues du clip",
  "Booster les streams Spotify / Boomplay",
  "Gagner des abonnés réseaux",
  "Promouvoir un concert / événement",
  "Développer ma notoriété en Afrique",
  "Toucher la diaspora africaine",
  "Cibler un pays précis",
];

const genres = [
  "Afrobeats", "Afropop", "Mbalax", "Rap / Hip-Hop", "R&B / Soul",
  "Gospel", "Reggae / Dancehall", "Amapiano", "Pop", "Jazz", "Autre",
];

const pays = [
  "Sénégal", "Côte d'Ivoire", "Mali", "Burkina Faso", "Guinée", "Cameroun",
  "Congo", "Gabon", "Bénin", "Togo", "Niger", "France", "Belgique", "Canada", "Autre",
];

interface FormData {
  nomArtiste: string;
  email: string;
  telephone: string;
  paysResidence: string;
  genre: string;
  services: ServiceType[];
  /* Ads */
  plateformesAds: string[];
  budgetTotal: string;
  /* Promotion */
  lienClip: string;
  lienSpotify: string;
  dateSortie: string;
  /* Influenceurs */
  typeInfluenceurs: string;
  /* Commun */
  objectifs: string[];
  audiencePays: string;
  descriptionCampagne: string;
  delaiSouhaite: string;
  message: string;
}

const initial: FormData = {
  nomArtiste: "", email: "", telephone: "", paysResidence: "", genre: "",
  services: [],
  plateformesAds: [], budgetTotal: "",
  lienClip: "", lienSpotify: "", dateSortie: "",
  typeInfluenceurs: "",
  objectifs: [], audiencePays: "",
  descriptionCampagne: "", delaiSouhaite: "", message: "",
};

const ACCENT = "#F97316";
const inputStyle = { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" };
const inputCls = "w-full px-4 py-3 rounded-xl font-body text-sm text-white placeholder-white/30 outline-none transition-colors focus:ring-1 focus:ring-orange-400/60";

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
        {label} {required && <span style={{ color: "#FED7AA" }}>*</span>}
      </label>
      {hint && <p className="font-body text-xs mb-2" style={{ color: "rgba(220,210,255,0.45)" }}>{hint}</p>}
      {children}
    </div>
  );
}
function ChipToggle({ items, selected, onToggle }: { items: string[]; selected: string[]; onToggle: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <button key={item} type="button" onClick={() => onToggle(item)}
          className="px-3 py-1.5 rounded-full font-body text-xs font-medium transition-all"
          style={selected.includes(item)
            ? { background: "rgba(249,115,22,0.20)", color: ACCENT, border: `1px solid ${ACCENT}` }
            : { background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.10)" }}>
          {item}
        </button>
      ))}
    </div>
  );
}

export default function MarketingForm() {
  const [form, setForm] = useState<FormData>(initial);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const set = (key: keyof FormData, value: FormData[keyof FormData]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const toggleService = (s: ServiceType) =>
    setForm((f) => ({ ...f, services: f.services.includes(s) ? f.services.filter((x) => x !== s) : [...f.services, s] }));

  const togglePlatforme = (p: string) =>
    setForm((f) => ({ ...f, plateformesAds: f.plateformesAds.includes(p) ? f.plateformesAds.filter((x) => x !== p) : [...f.plateformesAds, p] }));

  const toggleObjectif = (o: string) =>
    setForm((f) => ({ ...f, objectifs: f.objectifs.includes(o) ? f.objectifs.filter((x) => x !== o) : [...f.objectifs, o] }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/marketing/contact", {
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
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "rgba(249,115,22,0.15)" }}>
          <CheckCircle size={36} style={{ color: ACCENT }} />
        </div>
        <h3 className="font-display text-3xl text-white mb-3">Brief reçu !</h3>
        <p className="font-body text-base mb-2" style={{ color: "rgba(220,210,255,0.65)" }}>
          Nous avons bien reçu votre demande de marketing digital.
        </p>
        <p className="font-body text-sm" style={{ color: "rgba(220,210,255,0.45)" }}>
          Notre équipe vous contacte dans les <strong style={{ color: ACCENT }}>24h</strong> avec votre plan de campagne.
        </p>
      </motion.div>
    );
  }

  const showAds         = form.services.includes("ads");
  const showPromotion   = form.services.includes("promotion");
  const showInfluenceurs = form.services.includes("influenceurs");

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
                  ? { background: "rgba(249,115,22,0.14)", border: `2px solid ${ACCENT}`, boxShadow: "0 4px 20px rgba(249,115,22,0.20)" }
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

      {/* ── 3. Section Ads (conditionnelle) ─── */}
      <AnimatePresence>
        {showAds && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
            <div>
              <h3 className="font-body font-bold text-lg text-white mb-4">Publicité payante</h3>
              <div className="space-y-4">
                <Field label="Plateformes pour les campagnes Ads">
                  <ChipToggle items={plateformesAds} selected={form.plateformesAds} onToggle={togglePlatforme} />
                </Field>
                <Field label="Budget total pour la campagne" hint="Budget publicitaire total (hors honoraires KEKELI)">
                  <Select value={form.budgetTotal} onChange={(e) => set("budgetTotal", e.target.value)}>
                    <option value="" disabled>Sélectionner une fourchette</option>
                    {budgets.map((b) => <option key={b} value={b} style={{ background: "#1C0A40", color: "white" }}>{b}</option>)}
                  </Select>
                </Field>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── 4. Section Promotion (conditionnelle) ── */}
      <AnimatePresence>
        {showPromotion && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
            <div>
              <h3 className="font-body font-bold text-lg text-white mb-4">Promotion clips & sorties</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Lien YouTube / TikTok du clip" className="sm:col-span-2">
                  <Input value={form.lienClip} onChange={(e) => set("lienClip", e.target.value)} placeholder="https://youtube.com/watch?v=..." />
                </Field>
                <Field label="Lien Spotify / Boomplay">
                  <Input value={form.lienSpotify} onChange={(e) => set("lienSpotify", e.target.value)} placeholder="https://open.spotify.com/track/..." />
                </Field>
                <Field label="Date de sortie">
                  <Input type="date" value={form.dateSortie} onChange={(e) => set("dateSortie", e.target.value)} />
                </Field>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── 5. Section Influenceurs (conditionnelle) ── */}
      <AnimatePresence>
        {showInfluenceurs && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
            <div>
              <h3 className="font-body font-bold text-lg text-white mb-4">Influenceurs & placements</h3>
              <Field label="Type d'influenceurs recherchés">
                <div className="flex flex-wrap gap-2">
                  {["Pages musicales africaines", "Influenceurs lifestyle Dakar", "Blogueurs / critiques musicaux", "DJs & animateurs radio", "Créateurs TikTok musicaux", "Mix des profils"].map((t) => (
                    <button key={t} type="button" onClick={() => set("typeInfluenceurs", t)}
                      className="px-3 py-1.5 rounded-full font-body text-xs font-medium transition-all"
                      style={form.typeInfluenceurs === t
                        ? { background: "rgba(249,115,22,0.20)", color: ACCENT, border: `1px solid ${ACCENT}` }
                        : { background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.10)" }}>
                      {t}
                    </button>
                  ))}
                </div>
              </Field>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── 6. Objectifs & Audience ─────────── */}
      <div>
        <h3 className="font-body font-bold text-lg text-white mb-4">Objectifs & Audience</h3>
        <div className="space-y-4">
          <Field label="Vos objectifs marketing" hint="Sélectionnez tout ce qui correspond">
            <ChipToggle items={objectifsMarketing} selected={form.objectifs} onToggle={toggleObjectif} />
          </Field>
          <Field label="Pays / zones géographiques à cibler" hint="Soyez précis pour de meilleures performances">
            <Input value={form.audiencePays} onChange={(e) => set("audiencePays", e.target.value)}
              placeholder="Ex: Sénégal, Côte d'Ivoire, Mali, France (diaspora)..." />
          </Field>
          <Field label="Décrivez votre campagne" required hint="Ce que vous voulez promouvoir et l'effet attendu">
            <Textarea rows={4} value={form.descriptionCampagne} onChange={(e) => set("descriptionCampagne", e.target.value)}
              placeholder="Ex: Je sors un single le 15 juillet et je veux 100 000 vues en 30 jours. Je veux cibler le Sénégal et la diaspora en France. J'ai déjà le clip prêt..." required />
          </Field>
        </div>
      </div>

      {/* ── 7. Délai ────────────────────────── */}
      <Field label="Quand souhaitez-vous lancer la campagne ?">
        <Select value={form.delaiSouhaite} onChange={(e) => set("delaiSouhaite", e.target.value)}>
          <option value="" disabled>Sélectionner</option>
          {["Immédiatement", "Dans 1 à 2 semaines", "Dans 1 mois", "Dans 2 à 3 mois"].map((d) => (
            <option key={d} value={d} style={{ background: "#1C0A40", color: "white" }}>{d}</option>
          ))}
        </Select>
      </Field>

      {/* ── 8. Message ──────────────────────── */}
      <div>
        <h3 className="font-body font-bold text-lg text-white mb-4">Informations complémentaires</h3>
        <Textarea rows={4} value={form.message} onChange={(e) => set("message", e.target.value)}
          placeholder="Expériences passées avec des campagnes Ads, résultats déjà obtenus, contraintes particulières, questions..." />
      </div>

      {status === "error" && <p className="font-body text-sm text-red-400 text-center">{errorMsg}</p>}

      <button type="submit" disabled={status === "loading" || form.services.length === 0 || !form.nomArtiste || !form.email}
        className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-body font-bold text-base text-white transition-all disabled:opacity-50 hover:scale-[1.02]"
        style={{ background: "linear-gradient(135deg, #F97316 0%, #C2410C 100%)", boxShadow: "0 8px 30px rgba(249,115,22,0.35)" }}>
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
