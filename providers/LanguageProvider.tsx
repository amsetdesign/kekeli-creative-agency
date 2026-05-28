"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n/translations";

interface LangCtx {
  locale: Locale;
  toggle: () => void;
}

const Ctx = createContext<LangCtx>({ locale: "fr", toggle: () => {} });

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("fr");

  useEffect(() => {
    const stored = localStorage.getItem("kekeli_lang") as Locale | null;
    if (stored === "fr" || stored === "en") setLocale(stored);
  }, []);

  const toggle = () => {
    setLocale((prev) => {
      const next = prev === "fr" ? "en" : "fr";
      localStorage.setItem("kekeli_lang", next);
      return next;
    });
  };

  return <Ctx.Provider value={{ locale, toggle }}>{children}</Ctx.Provider>;
}

export function useLanguage() {
  return useContext(Ctx);
}
