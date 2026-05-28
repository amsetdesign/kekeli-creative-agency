"use client";

import { useState, useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { CheckCircle, Eye, EyeOff } from "lucide-react";

export default function ParametresForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user?.email) setEmail(data.user.email);
    });
  }, []);

  async function handlePasswordChange(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
    if (newPassword.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }

    setLoading(true);
    try {
      const { error: authError } = await supabase.auth.updateUser({ password: newPassword });
      if (authError) {
        setError(authError.message);
      } else {
        setSuccess("Mot de passe mis à jour avec succès.");
        setNewPassword("");
        setConfirmPassword("");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-lg space-y-6">
      {/* Account info */}
      <div className="bg-white rounded-2xl border border-[#E7E5E4] p-6">
        <h2 className="font-display text-base font-semibold text-[#0C0B09] mb-4">
          Informations du compte
        </h2>
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#F5F5F4]">
          <div className="w-10 h-10 rounded-full bg-[#C8A84B]/20 flex items-center justify-center shrink-0">
            <span className="text-[#C8A84B] font-display font-bold">
              {email.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <p className="font-body text-sm font-medium text-[#0C0B09]">{email}</p>
            <p className="font-body text-xs text-[#78716C]">Adresse email</p>
          </div>
        </div>
      </div>

      {/* Change password */}
      <div className="bg-white rounded-2xl border border-[#E7E5E4] p-6">
        <h2 className="font-display text-base font-semibold text-[#0C0B09] mb-4">
          Changer le mot de passe
        </h2>

        {success && (
          <div className="mb-4 flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 font-body text-sm">
            <CheckCircle size={16} />
            {success}
          </div>
        )}

        {error && (
          <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 font-body text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div>
            <label className="block font-body text-xs font-medium text-[#78716C] uppercase tracking-wider mb-1.5">
              Nouveau mot de passe
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Minimum 8 caractères"
                required
                className="w-full px-4 py-3 pr-11 rounded-xl border border-[#E7E5E4] bg-[#FAFAF8] font-body text-sm text-[#0C0B09] placeholder:text-[#A8A29E] focus:outline-none focus:ring-2 focus:ring-[#C8A84B]/30 focus:border-[#C8A84B]"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A8A29E] hover:text-[#78716C]"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block font-body text-xs font-medium text-[#78716C] uppercase tracking-wider mb-1.5">
              Confirmer le mot de passe
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Répétez le mot de passe"
              required
              className="w-full px-4 py-3 rounded-xl border border-[#E7E5E4] bg-[#FAFAF8] font-body text-sm text-[#0C0B09] placeholder:text-[#A8A29E] focus:outline-none focus:ring-2 focus:ring-[#C8A84B]/30 focus:border-[#C8A84B]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#0C0B09] text-white font-body text-sm font-medium hover:bg-[#1a1916] transition-colors disabled:opacity-60"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Mise à jour...
              </span>
            ) : (
              "Mettre à jour le mot de passe"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
