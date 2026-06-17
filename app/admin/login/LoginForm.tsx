"use client";

import { useState, FormEvent, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Lock, ArrowLeft, Shield, RotateCw } from "lucide-react";

type Step = "password" | "otp";

export default function LoginForm() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const from         = searchParams.get("from") ?? "/admin";

  const [step, setStep]         = useState<Step>("password");
  const [password, setPassword] = useState("");
  const [show, setShow]         = useState(false);
  const [otp, setOtp]           = useState(["", "", "", "", "", ""]);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
  const inputRefs               = useRef<(HTMLInputElement | null)[]>([]);

  /* ── Étape 1 : mot de passe ── */
  async function handlePassword(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res  = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const body = await res.json();
      if (!res.ok) {
        setError(body.error ?? "Mot de passe incorrect");
      } else {
        setStep("otp");
        setPassword("");
      }
    } catch {
      setError("Erreur réseau, réessayez.");
    } finally {
      setLoading(false);
    }
  }

  /* ── Étape 2 : OTP ── */
  function handleOtpChange(index: number, value: string) {
    const digit = value.replace(/\D/g, "").slice(-1);
    const next  = [...otp];
    next[index] = digit;
    setOtp(next);
    if (digit && index < 5) inputRefs.current[index + 1]?.focus();
  }

  function handleOtpKey(index: number, e: React.KeyboardEvent) {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  async function handleOtp(e: FormEvent) {
    e.preventDefault();
    const code = otp.join("");
    if (code.length < 6) return;
    setLoading(true);
    setError("");
    try {
      const res  = await fetch("/api/admin/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const body = await res.json();
      if (!res.ok) {
        setError(body.error ?? "Code incorrect");
        setOtp(["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();
      } else {
        router.push(from);
      }
    } catch {
      setError("Erreur réseau, réessayez.");
    } finally {
      setLoading(false);
    }
  }

  async function resendCode() {
    setError("");
    setOtp(["", "", "", "", "", ""]);
    setStep("password");
  }

  return (
    <div className="flex-1 min-h-screen flex items-center justify-center bg-[#0C0B09] px-4">
      <div className="w-full max-w-sm">

        {/* ── Étape 1 : mot de passe ── */}
        {step === "password" && (
          <>
            <div className="text-center mb-8">
              <div className="inline-flex w-12 h-12 rounded-2xl bg-[#C8A84B]/15 border border-[#C8A84B]/30 items-center justify-center mb-4">
                <Lock size={20} className="text-[#C8A84B]" />
              </div>
              <h1 className="font-display text-2xl text-white">KEKELI Admin</h1>
              <p className="font-body text-sm text-white/40 mt-1">Accès réservé</p>
            </div>

            <form onSubmit={handlePassword} className="space-y-4">
              <div>
                <label className="block font-body text-xs text-white/50 mb-2 uppercase tracking-wider">
                  Mot de passe
                </label>
                <div className="relative">
                  <input
                    type={show ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoFocus
                    placeholder="••••••••"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-body text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#C8A84B]/50 transition-colors pr-11"
                  />
                  <button type="button" onClick={() => setShow((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
                    {show ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {error && (
                <p className="font-body text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}

              <button type="submit" disabled={loading || !password}
                className="w-full bg-[#C8A84B] text-black font-body font-semibold text-sm py-3 rounded-xl hover:bg-[#b8963d] disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                {loading ? "Envoi du code…" : "Continuer"}
              </button>
            </form>
          </>
        )}

        {/* ── Étape 2 : code OTP ── */}
        {step === "otp" && (
          <>
            <div className="text-center mb-8">
              <div className="inline-flex w-12 h-12 rounded-2xl bg-[#C8A84B]/15 border border-[#C8A84B]/30 items-center justify-center mb-4">
                <Shield size={20} className="text-[#C8A84B]" />
              </div>
              <h1 className="font-display text-2xl text-white">Vérification</h1>
              <p className="font-body text-sm text-white/40 mt-1">
                Code envoyé à votre adresse email.<br />
                <span className="text-white/25 text-xs">Valable 10 minutes.</span>
              </p>
            </div>

            <form onSubmit={handleOtp} className="space-y-6">
              {/* 6 chiffres */}
              <div className="flex justify-center gap-3">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => { inputRefs.current[i] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    autoFocus={i === 0}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKey(i, e)}
                    className="w-11 h-14 text-center bg-white/5 border border-white/10 rounded-xl font-display text-xl text-white focus:outline-none focus:border-[#C8A84B]/60 focus:bg-white/8 transition-colors"
                  />
                ))}
              </div>

              {error && (
                <p className="font-body text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2 text-center">
                  {error}
                </p>
              )}

              <button type="submit" disabled={loading || otp.join("").length < 6}
                className="w-full bg-[#C8A84B] text-black font-body font-semibold text-sm py-3 rounded-xl hover:bg-[#b8963d] disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                {loading ? "Vérification…" : "Accéder au dashboard"}
              </button>
            </form>

            <button onClick={resendCode}
              className="mt-4 w-full flex items-center justify-center gap-1.5 font-body text-xs text-white/30 hover:text-white/60 transition-colors py-2">
              <RotateCw size={11} />
              Recommencer avec un nouveau code
            </button>
          </>
        )}

        <div className="mt-6 text-center">
          <Link href="/"
            className="inline-flex items-center gap-1.5 font-body text-xs text-white/30 hover:text-white/60 transition-colors">
            <ArrowLeft size={12} />
            Retour sur le site
          </Link>
        </div>
      </div>
    </div>
  );
}
