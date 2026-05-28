import { useLanguage } from "@/providers/LanguageProvider";
import t from "@/lib/i18n/translations";

export function useT() {
  const { locale } = useLanguage();
  return t[locale];
}
