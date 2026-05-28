"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { contactSchema, type ContactFormData } from "@/lib/validations/contact";
import Button from "@/components/ui/Button";

const typesProjet = [
  "Site web ou application",
  "Campagne réseaux sociaux",
  "Photo shooting",
  "Couverture événement / concert",
  "Communication artiste",
  "Stratégie digitale complète",
  "Autre",
];

const budgets = [
  "Moins de 200 000 FCFA",
  "200 000 — 500 000 FCFA",
  "500 000 — 1 500 000 FCFA",
  "Plus de 1 500 000 FCFA",
  "À définir ensemble",
];

type Status = "idle" | "loading" | "success" | "error";

/* ── Field wrapper ─────────────────────────────────────── */
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
      <label className="block font-body text-sm font-medium text-text-secondary mb-1.5">
        {label}
        {required && <span className="text-gold ml-0.5">*</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 font-body text-xs text-red-500 flex items-center gap-1">
          <AlertCircle size={11} /> {error}
        </p>
      )}
    </div>
  );
}

/* ── Input styles ──────────────────────────────────────── */
const inputClass =
  "w-full px-4 py-3 rounded-xl border border-border bg-bg-primary font-body text-sm text-text-primary placeholder:text-text-subtle focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-colors";

const selectClass = inputClass + " cursor-pointer";

/* ── Form ──────────────────────────────────────────────── */
export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (data: ContactFormData) => {
    setStatus("loading");
    setServerError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        setServerError(json.error ?? "Une erreur s'est produite.");
        setStatus("error");
        return;
      }

      setStatus("success");
      reset();
    } catch {
      setServerError("Impossible de contacter le serveur. Vérifiez votre connexion.");
      setStatus("error");
    }
  };

  /* ── Success state ───────────────────────────────────── */
  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center text-center py-16 px-6 bg-gold-pale rounded-2xl border border-[var(--border-gold)]"
      >
        <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mb-6">
          <CheckCircle2 size={32} className="text-gold" />
        </div>
        <h3 className="font-display text-3xl text-text-primary mb-3">
          Message envoyé !
        </h3>
        <p className="font-body text-text-muted mb-2">
          Merci pour votre message. Notre équipe vous répondra sous 24h.
        </p>
        <p className="font-body text-sm text-text-subtle mb-8">
          Un email de confirmation a été envoyé à votre adresse.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="font-body text-sm text-gold hover:text-gold-dark transition-colors underline"
        >
          Envoyer un autre message
        </button>
      </motion.div>
    );
  }

  /* ── Form ────────────────────────────────────────────── */
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">

      {/* Prénom + Nom */}
      <div className="grid grid-cols-2 gap-4">
        <Field label="Prénom" required error={errors.prenom?.message}>
          <input
            {...register("prenom")}
            className={inputClass}
            placeholder="Awa"
            autoComplete="given-name"
          />
        </Field>
        <Field label="Nom" required error={errors.nom?.message}>
          <input
            {...register("nom")}
            className={inputClass}
            placeholder="Diallo"
            autoComplete="family-name"
          />
        </Field>
      </div>

      {/* Email */}
      <Field label="Adresse email" required error={errors.email?.message}>
        <input
          {...register("email")}
          type="email"
          className={inputClass}
          placeholder="vous@exemple.com"
          autoComplete="email"
        />
      </Field>

      {/* Téléphone */}
      <Field label="Téléphone / WhatsApp" error={errors.telephone?.message}>
        <input
          {...register("telephone")}
          type="tel"
          className={inputClass}
          placeholder="+221 77 000 00 00"
          autoComplete="tel"
        />
      </Field>

      {/* Structure */}
      <Field label="Entreprise / Structure" error={errors.structure?.message}>
        <input
          {...register("structure")}
          className={inputClass}
          placeholder="Nom de votre entreprise ou projet"
        />
      </Field>

      {/* Type de projet */}
      <Field label="Type de projet" required error={errors.typeProjet?.message}>
        <select {...register("typeProjet")} className={selectClass} defaultValue="">
          <option value="" disabled>Sélectionner...</option>
          {typesProjet.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </Field>

      {/* Budget */}
      <Field label="Budget estimé" error={errors.budget?.message}>
        <select {...register("budget")} className={selectClass} defaultValue="">
          <option value="">Non précisé</option>
          {budgets.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </Field>

      {/* Message */}
      <Field label="Votre message" required error={errors.message?.message}>
        <textarea
          {...register("message")}
          className={inputClass + " min-h-[120px] resize-y"}
          placeholder="Décrivez votre projet, vos objectifs et vos délais..."
          rows={5}
        />
      </Field>

      {/* Erreur serveur */}
      <AnimatePresence>
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-3 p-4 rounded-xl bg-red-50 border border-red-200"
          >
            <AlertCircle size={16} className="text-red-500 shrink-0" />
            <p className="font-body text-sm text-red-700">{serverError}</p>
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
            "Envoyer le message"
          )}
        </Button>
        <p className="font-body text-xs text-text-subtle text-center mt-3">
          Réponse garantie sous 24h · Vos données restent confidentielles
        </p>
      </div>
    </form>
  );
}
