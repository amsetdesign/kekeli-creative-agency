"use client";

import { useState } from "react";
import { Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

type State = "idle" | "loading" | "success" | "error";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [name, setName]   = useState("");
  const [gdpr, setGdpr]   = useState(false);
  const [state, setState] = useState<State>("idle");
  const [msg, setMsg]     = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!gdpr) { setMsg("Veuillez accepter de recevoir nos emails."); setState("error"); return; }

    setState("loading");
    setMsg("");

    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name: name || undefined, source: "footer" }),
      });
      const json = await res.json();

      if (!res.ok) {
        setState("error");
        setMsg(json.error ?? "Une erreur s'est produite. Réessayez.");
      } else {
        setState("success");
        setMsg(json.alreadySubscribed
          ? "Vous êtes déjà abonné(e) à notre newsletter !"
          : "Parfait ! Confirmez votre inscription via l'email envoyé."
        );
        setEmail(""); setName(""); setGdpr(false);
      }
    } catch {
      setState("error");
      setMsg("Erreur réseau. Vérifiez votre connexion et réessayez.");
    }
  }

  if (state === "success") {
    return (
      <div className="flex flex-col items-center gap-3 py-6">
        <div className="w-14 h-14 rounded-full flex items-center justify-center"
          style={{ background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.35)" }}>
          <CheckCircle2 size={24} style={{ color: "#10B981" }} />
        </div>
        <p className="font-body text-sm text-center" style={{ color: "#10B981" }}>{msg}</p>
        <button
          onClick={() => { setState("idle"); setMsg(""); }}
          className="font-body text-xs underline underline-offset-2 transition-opacity hover:opacity-70"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          S&apos;inscrire avec une autre adresse
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full">
      {/* Name (optionnel) */}
      <div className="flex flex-col sm:flex-row gap-3 mb-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Votre prénom (optionnel)"
          maxLength={80}
          className="flex-1 font-body text-sm px-4 py-3 rounded-xl outline-none transition-all"
          style={{
            background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "#fff",
          }}
          onFocus={(e) => { e.currentTarget.style.border = "1px solid rgba(200,168,75,0.5)"; }}
          onBlur={(e) => { e.currentTarget.style.border = "1px solid rgba(255,255,255,0.12)"; }}
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Votre adresse email *"
          required
          maxLength={150}
          className="flex-1 font-body text-sm px-4 py-3 rounded-xl outline-none transition-all"
          style={{
            background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "#fff",
          }}
          onFocus={(e) => { e.currentTarget.style.border = "1px solid rgba(200,168,75,0.5)"; }}
          onBlur={(e) => { e.currentTarget.style.border = "1px solid rgba(255,255,255,0.12)"; }}
        />
        <button
          type="submit"
          disabled={state === "loading" || !email}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-body text-sm font-semibold transition-all shrink-0 disabled:opacity-50"
          style={{ background: "#C8A84B", color: "#0C0B09" }}
        >
          {state === "loading" ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <>
              <Send size={14} />
              S&apos;abonner
            </>
          )}
        </button>
      </div>

      {/* RGPD */}
      <label className="flex items-start gap-2.5 cursor-pointer group mb-3">
        <div
          role="checkbox"
          aria-checked={gdpr}
          tabIndex={0}
          onClick={() => setGdpr(!gdpr)}
          onKeyDown={(e) => e.key === " " && setGdpr(!gdpr)}
          className="mt-0.5 w-4 h-4 rounded flex items-center justify-center shrink-0 transition-all"
          style={{
            background: gdpr ? "#C8A84B" : "rgba(255,255,255,0.08)",
            border: gdpr ? "1px solid #C8A84B" : "1px solid rgba(255,255,255,0.2)",
          }}
        >
          {gdpr && <span style={{ color: "#0C0B09", fontSize: 10, fontWeight: 800 }}>✓</span>}
        </div>
        <span className="font-body text-[11px] leading-relaxed" style={{ color: "rgba(255,255,255,0.40)" }}>
          J&apos;accepte de recevoir la newsletter KEKELI Creative Agency. Pas de spam — désinscription possible à tout moment en un clic.
        </span>
      </label>

      {/* Error */}
      {state === "error" && msg && (
        <div className="flex items-center gap-2 mt-2">
          <AlertCircle size={13} style={{ color: "#F87171", flexShrink: 0 }} />
          <p className="font-body text-xs" style={{ color: "#F87171" }}>{msg}</p>
        </div>
      )}
    </form>
  );
}
