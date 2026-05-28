"use client";

import { useState } from "react";
import { X, Send, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  open: boolean;
  onClose: () => void;
  clientName: string;
}

const PROJECT_TYPES = [
  "Couverture médiatique (photo/vidéo)",
  "Stratégie digitale",
  "Photo shooting",
  "Développement web / mobile",
  "Gestion réseaux sociaux",
  "Communication artiste / festival",
  "Branding & identité visuelle",
  "Communication e-commerce",
  "Autre",
];

export default function ProjectRequestModal({ open, onClose, clientName }: Props) {
  const [form, setForm] = useState({ type: "", description: "", urgency: "normal" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  function set(k: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.type || !form.description) return;
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/espace-client/request-project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setDone(true);
      } else {
        const j = await res.json();
        setError(j.error ?? "Erreur lors de l'envoi.");
      }
    } catch {
      setError("Erreur de connexion.");
    } finally {
      setLoading(false);
    }
  }

  function handleClose() {
    onClose();
    setTimeout(() => { setDone(false); setForm({ type: "", description: "", urgency: "normal" }); setError(""); }, 300);
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", stiffness: 340, damping: 28 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-[#E7E5E4]">
                <div>
                  <h2 className="font-display text-lg text-[#0C0B09]">Nouveau projet</h2>
                  <p className="font-body text-xs text-[#78716C] mt-0.5">
                    Notre équipe vous répondra rapidement
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[#A8A29E] hover:bg-[#F5F5F4] hover:text-[#0C0B09] transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              {done ? (
                <div className="px-6 py-10 text-center">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="text-emerald-600" size={28} />
                  </div>
                  <h3 className="font-display text-lg text-[#0C0B09] mb-2">Demande envoyée !</h3>
                  <p className="font-body text-sm text-[#78716C] mb-6">
                    L'équipe KEKELI a bien reçu votre demande et vous contactera très prochainement.
                  </p>
                  <button
                    onClick={handleClose}
                    className="px-6 py-2.5 rounded-xl bg-[#0C0B09] text-white font-body text-sm font-medium hover:bg-[#1a1916] transition-colors"
                  >
                    Fermer
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} className="px-6 py-5 space-y-4">
                  {error && (
                    <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 font-body text-sm">
                      {error}
                    </div>
                  )}

                  <div>
                    <label className="block font-body text-xs font-medium text-[#78716C] uppercase tracking-wider mb-1.5">
                      Type de prestation *
                    </label>
                    <select
                      value={form.type}
                      onChange={set("type")}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-[#E7E5E4] bg-[#FAFAF8] font-body text-sm text-[#0C0B09] focus:outline-none focus:ring-2 focus:ring-[#C8A84B]/30 focus:border-[#C8A84B]"
                    >
                      <option value="">Sélectionnez un type...</option>
                      {PROJECT_TYPES.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-body text-xs font-medium text-[#78716C] uppercase tracking-wider mb-1.5">
                      Description du projet *
                    </label>
                    <textarea
                      value={form.description}
                      onChange={set("description")}
                      rows={4}
                      required
                      placeholder="Décrivez votre projet, vos objectifs, votre audience cible..."
                      className="w-full resize-none px-4 py-3 rounded-xl border border-[#E7E5E4] bg-[#FAFAF8] font-body text-sm text-[#0C0B09] placeholder:text-[#A8A29E] focus:outline-none focus:ring-2 focus:ring-[#C8A84B]/30 focus:border-[#C8A84B]"
                    />
                  </div>

                  <div>
                    <label className="block font-body text-xs font-medium text-[#78716C] uppercase tracking-wider mb-1.5">
                      Urgence
                    </label>
                    <div className="flex gap-2">
                      {[
                        { value: "normal", label: "Pas urgent" },
                        { value: "soon", label: "Dans 2-4 semaines" },
                        { value: "urgent", label: "Urgent" },
                      ].map(({ value, label }) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => setForm((f) => ({ ...f, urgency: value }))}
                          className={`flex-1 py-2.5 rounded-xl font-body text-xs font-medium border transition-colors ${
                            form.urgency === value
                              ? "bg-[#0C0B09] text-white border-[#0C0B09]"
                              : "border-[#E7E5E4] text-[#78716C] hover:border-[#0C0B09]"
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading || !form.type || !form.description}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#C8A84B] text-black font-body text-sm font-semibold hover:bg-[#b8963d] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send size={15} />
                        Envoyer la demande
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
