"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, Loader2, Mic2 } from "lucide-react";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/animations/FadeIn";
import SectionHeader from "@/components/ui/SectionHeader";

const genresMusicaux = [
  "Afro / Afropop",
  "Rap / Hip-hop",
  "R&B / Soul",
  "Gospel",
  "Coupé-Décalé",
  "Variété",
  "Rock",
  "Autre",
];

const niveaux = ["Débutant", "Intermédiaire", "Semi-professionnel", "Professionnel"];

const budgets = [
  "< 100 000 FCFA",
  "100 000 — 500 000 FCFA",
  "500 000 — 1 000 000 FCFA",
  "1 000 000 — 5 000 000 FCFA",
  "> 5 000 000 FCFA",
];

const servicesOptions = [
  "Direction Artistique",
  "Branding Artiste",
  "Clips & Vidéos",
  "Photo Shooting",
  "Accompagnement Artistique",
  "Stratégie Digitale",
  "Distribution Musicale",
  "Marketing Digital",
  "Identité Digitale",
  "Événementiel & Showcase",
  "Monétisation & Business",
];

interface FormData {
  nom_artiste: string;
  email: string;
  telephone: string;
  genre_musical: string;
  niveau: string;
  presence_digitale: string;
  besoins: string[];
  budget: string;
  description: string;
}

const defaultForm: FormData = {
  nom_artiste: "",
  email: "",
  telephone: "",
  genre_musical: "",
  niveau: "",
  presence_digitale: "",
  besoins: [],
  budget: "",
  description: "",
};

type Status = "idle" | "loading" | "success" | "error";

const inputClass =
  "w-full px-4 py-3 rounded-xl border border-white/10 bg-white/[0.05] font-body text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/20 transition-colors";

const selectClass = inputClass + " cursor-pointer";

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block font-body text-sm font-medium text-white/70 mb-1.5">
        {label}
        {required && <span className="text-gold ml-0.5">*</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 font-body text-xs text-red-400 flex items-center gap-1">
          <AlertCircle size={11} /> {error}
        </p>
      )}
    </div>
  );
}

export default function ArtistesForm() {
  const [form, setForm] = useState<FormData>(defaultForm);
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const set = (key: keyof FormData, value: string | string[]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const toggleBesoin = (label: string) => {
    setForm((prev) => {
      const besoins = prev.besoins.includes(label)
        ? prev.besoins.filter((b) => b !== label)
        : [...prev.besoins, label];
      return { ...prev, besoins };
    });
  };

  const validate = (): boolean => {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!form.nom_artiste.trim()) e.nom_artiste = "Le nom d'artiste est requis.";
    if (!form.email.trim()) e.email = "L'email est requis.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Email invalide.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    setServerError("");

    try {
      const res = await fetch("/api/artistes/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        setServerError(json.error ?? "Une erreur s'est produite.");
        setStatus("error");
        return;
      }

      setStatus("success");
      setForm(defaultForm);
    } catch {
      setServerError("Impossible de contacter le serveur. Vérifiez votre connexion.");
      setStatus("error");
    }
  };

  return (
    <section id="formulaire" className="scroll-mt-24 py-24 relative overflow-hidden bg-bg-dark">
      {/* Background blobs */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 right-0 w-80 h-80 rounded-full blur-[140px] opacity-10"
          style={{ background: "#8B5CF6" }}
        />
        <div
          className="absolute bottom-0 left-0 w-72 h-72 rounded-full blur-[120px] opacity-10"
          style={{ background: "#C8A84B" }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="mb-12 text-center">
          <SectionHeader
            eyebrow="Parlons de votre projet"
            title={
              <>
                Brief Artiste{" "}
                <em className="text-gold not-italic">gratuit</em>
              </>
            }
            subtitle="Remplissez ce formulaire pour qu'on comprenne vos besoins et vous proposer un accompagnement sur-mesure. Réponse sous 24h."
            centered
            light
          />
        </FadeIn>

        <FadeIn delay={0.1}>
          <div
            className="rounded-3xl p-8 sm:p-10"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(200,168,75,0.15)" }}
          >
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center text-center py-16 px-6"
                >
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
                    style={{ background: "rgba(200,168,75,0.15)", border: "1px solid rgba(200,168,75,0.3)" }}
                  >
                    <CheckCircle2 size={36} className="text-gold" />
                  </div>
                  <h3 className="font-display text-3xl text-white mb-3">
                    Brief reçu !
                  </h3>
                  <p className="font-body text-white/60 mb-2">
                    Merci {form.nom_artiste || ""}. Notre équipe artiste vous contactera sous 24h.
                  </p>
                  <p className="font-body text-sm text-white/40 mb-8">
                    Nous avons hâte de travailler ensemble sur votre carrière.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="font-body text-sm text-gold hover:text-gold-light transition-colors underline"
                  >
                    Envoyer un autre brief
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={onSubmit}
                  noValidate
                  className="space-y-6"
                >
                  {/* Nom artiste + Email */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Nom d'artiste" required error={errors.nom_artiste}>
                      <input
                        type="text"
                        value={form.nom_artiste}
                        onChange={(e) => set("nom_artiste", e.target.value)}
                        className={inputClass}
                        placeholder="Votre nom de scène"
                      />
                    </Field>
                    <Field label="Email" required error={errors.email}>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => set("email", e.target.value)}
                        className={inputClass}
                        placeholder="artiste@exemple.com"
                        autoComplete="email"
                      />
                    </Field>
                  </div>

                  {/* Téléphone + Genre musical */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Téléphone / WhatsApp">
                      <input
                        type="tel"
                        value={form.telephone}
                        onChange={(e) => set("telephone", e.target.value)}
                        className={inputClass}
                        placeholder="+221 77 000 00 00"
                        autoComplete="tel"
                      />
                    </Field>
                    <Field label="Genre musical">
                      <select
                        value={form.genre_musical}
                        onChange={(e) => set("genre_musical", e.target.value)}
                        className={selectClass}
                      >
                        <option value="">Sélectionner votre genre...</option>
                        {genresMusicaux.map((g) => (
                          <option key={g} value={g}>{g}</option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  {/* Niveau */}
                  <Field label="Votre niveau actuel">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {niveaux.map((n) => (
                        <label key={n} className="cursor-pointer">
                          <input
                            type="radio"
                            name="niveau"
                            value={n}
                            checked={form.niveau === n}
                            onChange={() => set("niveau", n)}
                            className="sr-only"
                          />
                          <div
                            className={`
                              text-center px-3 py-2.5 rounded-xl border font-body text-xs font-medium transition-all duration-150
                              ${form.niveau === n
                                ? "border-gold bg-gold/15 text-gold"
                                : "border-white/10 bg-white/[0.03] text-white/50 hover:border-white/25 hover:text-white/70"
                              }
                            `}
                          >
                            {n}
                          </div>
                        </label>
                      ))}
                    </div>
                  </Field>

                  {/* Présence digitale */}
                  <Field label="Vos réseaux & présence digitale actuelle">
                    <input
                      type="text"
                      value={form.presence_digitale}
                      onChange={(e) => set("presence_digitale", e.target.value)}
                      className={inputClass}
                      placeholder="Instagram @artiste, 5K abonnés / Site web / TikTok..."
                    />
                  </Field>

                  {/* Besoins */}
                  <Field label="Services qui vous intéressent (multi-choix)">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {servicesOptions.map((s) => (
                        <label key={s} className="cursor-pointer flex items-center gap-3 p-3 rounded-xl border border-white/10 bg-white/[0.02] hover:border-white/20 transition-colors">
                          <div
                            className={`
                              w-4 h-4 rounded flex items-center justify-center shrink-0 transition-all
                              ${form.besoins.includes(s)
                                ? "bg-gold border-gold"
                                : "bg-transparent border border-white/30"
                              }
                            `}
                          >
                            {form.besoins.includes(s) && (
                              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                <path d="M1 4l2.5 2.5L9 1" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )}
                          </div>
                          <input
                            type="checkbox"
                            checked={form.besoins.includes(s)}
                            onChange={() => toggleBesoin(s)}
                            className="sr-only"
                          />
                          <span className="font-body text-sm text-white/70">{s}</span>
                        </label>
                      ))}
                    </div>
                  </Field>

                  {/* Budget */}
                  <Field label="Budget estimé">
                    <select
                      value={form.budget}
                      onChange={(e) => set("budget", e.target.value)}
                      className={selectClass}
                    >
                      <option value="">Non précisé</option>
                      {budgets.map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </Field>

                  {/* Description */}
                  <Field label="Votre vision & projet">
                    <textarea
                      value={form.description}
                      onChange={(e) => set("description", e.target.value)}
                      className={inputClass + " min-h-[120px] resize-y"}
                      placeholder="Décrivez votre projet musical, vos objectifs, votre vision artistique, vos délais..."
                      rows={5}
                    />
                  </Field>

                  {/* Server error */}
                  <AnimatePresence>
                    {status === "error" && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-3 p-4 rounded-xl bg-red-900/20 border border-red-500/30"
                      >
                        <AlertCircle size={16} className="text-red-400 shrink-0" />
                        <p className="font-body text-sm text-red-300">{serverError}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submit */}
                  <div className="pt-2">
                    <Button
                      type="submit"
                      variant="gold"
                      size="lg"
                      disabled={status === "loading"}
                      className="w-full justify-center"
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          <Mic2 size={16} />
                          Envoyer mon brief artiste
                        </>
                      )}
                    </Button>
                    <p className="font-body text-xs text-white/30 text-center mt-3">
                      Réponse garantie sous 24h · Vos données restent confidentielles
                    </p>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
