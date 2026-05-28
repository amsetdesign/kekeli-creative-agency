"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, ArrowRight, ArrowLeft, Clock, AlertTriangle } from "lucide-react";
import { createBrowserClient } from "@supabase/ssr";

function getSupabaseBrowser() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}

export default function LoginClientForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const next = searchParams.get("next") ?? "/espace-client/dashboard";
  const safeNext = next.startsWith("/") ? next : "/espace-client/dashboard";

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleGoogleSignIn() {
    setGoogleLoading(true);
    setError("");
    try {
      const supabase = getSupabaseBrowser();
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback?mode=login&next=${encodeURIComponent(safeNext)}`,
        },
      });
    } catch {
      setError("Erreur lors de la connexion avec Google.");
      setGoogleLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const supabase = getSupabaseBrowser();
      const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

      if (authError) {
        if (authError.message.includes("Invalid login credentials")) {
          setError("Email ou mot de passe incorrect.");
        } else {
          setError("Erreur de connexion. Veuillez réessayer.");
        }
        return;
      }

      router.push(safeNext);
      router.refresh();
    } catch {
      setError("Erreur de connexion. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 relative overflow-hidden" style={{ background: "linear-gradient(145deg, #F8F7F4 0%, #EDE8F7 55%, #F6F4F0 100%)" }}>
      {/* Decorative blobs */}
      <div aria-hidden className="absolute top-[-8%] right-[-8%] w-[420px] h-[420px] rounded-full blur-[150px] opacity-40 pointer-events-none" style={{ background: "#DDD0FF" }} />
      <div aria-hidden className="absolute bottom-[-5%] left-[-5%] w-[320px] h-[320px] rounded-full blur-[120px] opacity-30 pointer-events-none" style={{ background: "#FFF3C0" }} />
      <div aria-hidden className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[180px] opacity-10 pointer-events-none" style={{ background: "#C8A84B" }} />

      {/* Back to site */}
      <Link
        href="/"
        className="absolute top-5 left-5 flex items-center gap-1.5 px-3 py-2 rounded-xl font-body text-xs font-medium text-[#78716C] hover:text-[#0C0B09] hover:bg-black/5 transition-all group"
      >
        <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
        Retour au site
      </Link>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="mb-8 text-center">
          <Link href="/" className="inline-block mb-6">
            <span className="font-display text-xl font-semibold text-[#0C0B09]">
              KEKELI <span className="text-[#C8A84B]">.</span>
            </span>
          </Link>
          <h1 className="font-display text-2xl text-[#0C0B09] mb-2">Espace client</h1>
          <p className="font-body text-sm text-[#78716C]">
            Connectez-vous pour suivre vos projets
          </p>
        </div>

        {/* Status banners */}
        {status === "pending" && (
          <div className="mb-5 flex items-start gap-3 px-4 py-4 rounded-xl bg-amber-50 border border-amber-200">
            <Clock size={18} className="text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-body text-sm font-medium text-amber-800">Compte en attente de validation</p>
              <p className="font-body text-xs text-amber-700 mt-0.5">
                Notre équipe examine votre demande. Vous recevrez un email dès que votre accès sera activé.
              </p>
            </div>
          </div>
        )}

        {status === "suspended" && (
          <div className="mb-5 flex items-start gap-3 px-4 py-4 rounded-xl bg-red-50 border border-red-200">
            <AlertTriangle size={18} className="text-red-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-body text-sm font-medium text-red-800">Compte suspendu</p>
              <p className="font-body text-xs text-red-700 mt-0.5">
                Votre accès a été suspendu. Contactez-nous à{" "}
                <a href="mailto:kekelicreativeagency@gmail.com" className="underline">kekelicreativeagency@gmail.com</a>
              </p>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl border border-[#E7E5E4] p-8">
          {error && (
            <div className="mb-5 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 font-body text-sm">
              {error}
            </div>
          )}

          {/* Google OAuth */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={googleLoading || loading}
            className="w-full flex items-center justify-center gap-3 px-6 py-3 rounded-xl border border-[#E7E5E4] bg-white font-body text-sm font-medium text-[#0C0B09] hover:bg-[#FAFAF8] transition-colors disabled:opacity-60 disabled:cursor-not-allowed mb-5"
          >
            {googleLoading ? (
              <span className="w-4 h-4 border-2 border-[#78716C]/30 border-t-[#78716C] rounded-full animate-spin" />
            ) : (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
                <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
                <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
              </svg>
            )}
            Continuer avec Google
          </button>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-[#E7E5E4]" />
            <span className="font-body text-xs text-[#A8A29E]">ou</span>
            <div className="flex-1 h-px bg-[#E7E5E4]" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-body text-xs font-medium text-[#78716C] uppercase tracking-wider mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vous@exemple.com"
                required
                autoFocus
                className="w-full px-4 py-3 rounded-xl border border-[#E7E5E4] bg-[#FAFAF8] font-body text-sm text-[#0C0B09] placeholder:text-[#A8A29E] focus:outline-none focus:ring-2 focus:ring-[#C8A84B]/30 focus:border-[#C8A84B]"
              />
            </div>

            <div>
              <label className="block font-body text-xs font-medium text-[#78716C] uppercase tracking-wider mb-1.5">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Votre mot de passe"
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

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#0C0B09] text-white font-body text-sm font-medium hover:bg-[#1a1916] transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Connexion...
                </span>
              ) : (
                <>
                  Se connecter
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center font-body text-sm text-[#78716C] mt-6">
          Pas encore de compte ?{" "}
          <Link href="/espace-client/inscription" className="text-[#C8A84B] hover:underline">
            Créer un compte
          </Link>
        </p>
      </div>
    </div>
  );
}

