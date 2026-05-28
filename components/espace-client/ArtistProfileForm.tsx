"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic2, CheckCircle2, AlertCircle, Loader2, Save } from "lucide-react";
import type { ArtistProfile } from "@/lib/supabase";

const genresMusicaux = [
  "Afro / Afropop", "Rap / Hip-hop", "R&B / Soul", "Gospel",
  "Coupé-Décalé", "Variété", "Rock", "Autre",
];
const budgets = [
  "< 100 000 FCFA", "100 000 — 500 000 FCFA", "500 000 — 1 000 000 FCFA",
  "1 000 000 — 5 000 000 FCFA", "> 5 000 000 FCFA",
];
const servicesOptions = [
  "Direction Artistique", "Branding Artiste", "Clips & Vidéos",
  "Photo Shooting", "Accompagnement Artistique", "Stratégie Digitale",
  "Distribution Musicale", "Marketing Digital", "Identité Digitale",
  "Événementiel & Showcase", "Monétisation & Business",
];

interface Props {
  initialData: ArtistProfile | null;
  clientName: string;
}

type Status = "idle" | "loading" | "success" | "error";

const defaultForm: ArtistProfile = {
  nom_artiste: "", genre_musical: "", niveau: "",
  presence_digitale: "", besoins: [], budget: "", description: "",
};

const inputClass =
  "w-full px-4 py-3 rounded-xl border border-[#E7E5E4] bg-white font-body text-sm text-[#0C0B09] placeholder:text-[#A8A29E] focus:outline-none focus:border-[#C8A84B]/60 focus:ring-2 focus:ring-[#C8A84B]/15 transition-colors";

function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <div>
      <label className="block font-body text-sm font-medium text-[#292524] mb-1.5">{label}</label>
      {children}
      {hint && <p className="mt-1 font-body text-xs text-[#A8A29E]">{hint}</p>}
    </div>
  );
}

export default function ArtistProfileForm({ initialData, clientName }: Props) {
  const isNew = !initialData;
  const [form, setForm] = useState<ArtistProfile>(initialData ?? { ...defaultForm, nom_artiste: clientName });
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");

  const set = (key: keyof ArtistProfile, value: string | string[]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const toggleBesoin = (label: string) =>
    setForm((prev) => ({
      ...prev,
      besoins: prev.besoins.includes(label)
        ? prev.besoins.filter((b) => b !== label)
        : [...prev.besoins, label],
    }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setServerError("");
    try {
      const res = await fetch("/api/espace-client/artist-profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error((await res.json()).error ?? "Erreur");
      setStatus("success");
      setTimeout(() => setStatus("idle"), 3000);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Erreur serveur");
      setStatus("error");
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(139,92,246,0.12)" }}>
              <Mic2 size={18} style={{ color: "#8B5CF6" }} />
            </div>
            <h1 className="font-display text-2xl text-[#0C0B09]">
              {isNew ? "Créer mon profil artiste" : "Mon profil artiste"}
            </h1>
          </div>
          <p className="font-body text-sm text-[#78716C]">
            {isNew
              ? "Complétez votre profil pour que notre équipe puisse vous accompagner au mieux."
              : "Vos informations artistiques — mises à jour à tout moment."}
          </p>
        </div>

      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        {/* Nom artiste + Genre */}
        <div className="bg-white rounded-2xl border border-[#E7E5E4] p-6 space-y-5">
          <h2 className="font-display text-base font-semibold text-[#0C0B09] pb-3 border-b border-[#F5F5F4]">
            Identité artistique
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Nom d'artiste (scène)" hint="Peut être différent de votre nom de compte">
              <input
                type="text"
                value={form.nom_artiste}
                onChange={(e) => set("nom_artiste", e.target.value)}
                className={inputClass}
                placeholder="Votre nom de scène"
              />
            </Field>
            <Field label="Genre musical">
              <select
                value={form.genre_musical}
                onChange={(e) => set("genre_musical", e.target.value)}
                className={inputClass + " cursor-pointer"}
              >
                <option value="">Sélectionner...</option>
                {genresMusicaux.map((g) => <option key={g} value={g}>{g}</option>)}
              </select>
            </Field>
          </div>

          <Field label="Présence digitale actuelle" hint="Réseaux, site web, nombre d'abonnés...">
            <input
              type="text"
              value={form.presence_digitale}
              onChange={(e) => set("presence_digitale", e.target.value)}
              className={inputClass}
              placeholder="Instagram @artiste, 5K abonnés / TikTok 10K / Site..."
            />
          </Field>
        </div>

        {/* Besoins */}
        <div className="bg-white rounded-2xl border border-[#E7E5E4] p-6">
          <h2 className="font-display text-base font-semibold text-[#0C0B09] pb-3 border-b border-[#F5F5F4] mb-5">
            Services souhaités
            {form.besoins.length > 0 && (
              <span className="ml-2 px-2 py-0.5 rounded-full bg-[#C8A84B]/10 text-[#C8A84B] font-body text-xs">
                {form.besoins.length} sélectionné{form.besoins.length > 1 ? "s" : ""}
              </span>
            )}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {servicesOptions.map((s) => {
              const active = form.besoins.includes(s);
              return (
                <label key={s} className="cursor-pointer">
                  <input type="checkbox" checked={active} onChange={() => toggleBesoin(s)} className="sr-only" />
                  <div className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                    active
                      ? "border-[#C8A84B]/40 bg-[#C8A84B]/5"
                      : "border-[#E7E5E4] hover:border-[#C8A84B]/25"
                  }`}>
                    <div className={`w-4 h-4 rounded flex items-center justify-center shrink-0 transition-all ${
                      active ? "bg-[#C8A84B] border-[#C8A84B]" : "border border-[#D6D3D1] bg-white"
                    }`}>
                      {active && (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4l2.5 2.5L9 1" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    <span className={`font-body text-sm ${active ? "text-[#0C0B09] font-medium" : "text-[#78716C]"}`}>{s}</span>
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        {/* Budget + Description */}
        <div className="bg-white rounded-2xl border border-[#E7E5E4] p-6 space-y-5">
          <h2 className="font-display text-base font-semibold text-[#0C0B09] pb-3 border-b border-[#F5F5F4]">
            Projet & vision
          </h2>
          <Field label="Budget estimé">
            <select value={form.budget} onChange={(e) => set("budget", e.target.value)}
              className={inputClass + " cursor-pointer"}>
              <option value="">Non précisé</option>
              {budgets.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
          </Field>
          <Field label="Votre vision artistique & projet">
            <textarea value={form.description} onChange={(e) => set("description", e.target.value)}
              className={inputClass + " min-h-[120px] resize-y"}
              placeholder="Décrivez votre projet musical, vos objectifs, votre vision, vos délais..."
              rows={5}
            />
          </Field>
        </div>

        {/* Error */}
        <AnimatePresence>
          {status === "error" && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="flex items-center gap-3 p-4 rounded-xl bg-red-50 border border-red-200">
              <AlertCircle size={16} className="text-red-500 shrink-0" />
              <p className="font-body text-sm text-red-700">{serverError}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit */}
        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={status === "loading"}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-body text-sm font-semibold text-black disabled:opacity-50 transition-all"
            style={{ background: "linear-gradient(135deg, #C8A84B, #F59E0B)", boxShadow: "0 4px 16px rgba(200,168,75,0.3)" }}
          >
            {status === "loading" ? (
              <><Loader2 size={16} className="animate-spin" /> Enregistrement...</>
            ) : (
              <><Save size={16} /> {isNew ? "Créer mon profil artiste" : "Enregistrer les modifications"}</>
            )}
          </button>

          <AnimatePresence>
            {status === "success" && (
              <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                className="flex items-center gap-2 text-emerald-600 font-body text-sm font-medium">
                <CheckCircle2 size={16} />
                Profil enregistré !
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </form>
    </div>
  );
}
