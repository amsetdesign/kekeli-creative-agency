"use client";

import { useLanguage } from "@/providers/LanguageProvider";

export default function LangSwitch({ className = "" }: { className?: string }) {
  const { locale, toggle } = useLanguage();

  return (
    <button
      onClick={toggle}
      aria-label={locale === "fr" ? "Switch to English" : "Passer en français"}
      className={`shrink-0 flex items-center rounded-full overflow-hidden font-body text-xs font-bold transition-all hover:brightness-110 active:scale-95 ${className}`}
      style={{
        border: "1px solid rgba(255,255,255,0.15)",
        background: "#000",
      }}
    >
      <span
        className="px-2.5 py-1.5 transition-all"
        style={{ color: locale === "fr" ? "#fff" : "rgba(255,255,255,0.35)" }}
      >
        FR
      </span>
      <span className="w-px h-4 shrink-0" style={{ background: "rgba(255,255,255,0.15)" }} />
      <span
        className="px-2.5 py-1.5 transition-all"
        style={{ color: locale === "en" ? "#fff" : "rgba(255,255,255,0.35)" }}
      >
        EN
      </span>
    </button>
  );
}
