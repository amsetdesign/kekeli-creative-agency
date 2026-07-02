"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const PHONE = "221765289111";

const MESSAGES: Record<string, string> = {
  // ── Artiste services ──────────────────────────────────────────────────────
  "/artistes/branding":         "Bonjour KEKELI 👋 Je veux créer mon identité visuelle (logo, charte graphique). Pouvez-vous m'aider ?",
  "/artistes/clips":            "Bonjour KEKELI 👋 Je veux produire un clip vidéo professionnel. Pouvez-vous m'aider ?",
  "/artistes/accompagnement":   "Bonjour KEKELI 👋 Je cherche un accompagnement artistique personnalisé. Pouvez-vous m'aider ?",
  "/artistes/marketing":        "Bonjour KEKELI 👋 Je veux développer ma stratégie marketing musicale. Pouvez-vous m'aider ?",
  "/artistes/monetisation":     "Bonjour KEKELI 👋 Je veux monétiser ma musique et mes contenus. Pouvez-vous m'aider ?",
  "/artistes/distribution":     "Bonjour KEKELI 👋 Je veux distribuer ma musique sur les plateformes de streaming. Pouvez-vous m'aider ?",
  "/artistes/strategie":        "Bonjour KEKELI 👋 Je veux développer ma stratégie digitale en tant qu'artiste. Pouvez-vous m'aider ?",
  "/artistes/direction":        "Bonjour KEKELI 👋 Je cherche une direction artistique pour mon projet. Pouvez-vous m'aider ?",
  "/artistes/photo":            "Bonjour KEKELI 👋 Je veux un shooting photo professionnel pour artiste. Pouvez-vous m'aider ?",
  "/artistes/analyse-reseaux":  "Bonjour KEKELI 👋 Je veux analyser et améliorer mes réseaux sociaux. Pouvez-vous m'aider ?",
  "/artistes/identite":         "Bonjour KEKELI 👋 Je veux construire mon identité artistique. Pouvez-vous m'aider ?",
  "/artistes/vision":           "Bonjour KEKELI 👋 Je veux définir ma vision artistique à long terme. Pouvez-vous m'aider ?",
  "/artistes/moodboard":        "Bonjour KEKELI 👋 Je veux créer un moodboard pour mon projet artistique. Pouvez-vous m'aider ?",
  "/artistes/strategie-lancement": "Bonjour KEKELI 👋 Je veux lancer mon projet musical avec la bonne stratégie. Pouvez-vous m'aider ?",
  "/artistes":                  "Bonjour KEKELI 👋 Je suis artiste et je veux développer ma carrière musicale. Pouvez-vous m'aider ?",

  // ── Entreprise services ───────────────────────────────────────────────────
  "/entreprises/branding":      "Bonjour KEKELI 👋 Je veux créer l'identité visuelle de mon entreprise (logo, charte graphique). Pouvez-vous m'aider ?",
  "/entreprises/applications":  "Bonjour KEKELI 👋 Je veux développer une application mobile pour mon entreprise. Pouvez-vous m'aider ?",
  "/entreprises/coaching":      "Bonjour KEKELI 👋 Je cherche un coaching en communication digitale pour mon entreprise. Pouvez-vous m'aider ?",
  "/entreprises/community":     "Bonjour KEKELI 👋 Je veux gérer et développer ma communauté en ligne. Pouvez-vous m'aider ?",
  "/entreprises/photo-video":   "Bonjour KEKELI 👋 Je veux un shooting photo/vidéo professionnel pour mon entreprise. Pouvez-vous m'aider ?",
  "/entreprises/publicite":     "Bonjour KEKELI 👋 Je veux lancer des publicités digitales (Meta/Google) pour mon entreprise. Pouvez-vous m'aider ?",
  "/entreprises/site-web":      "Bonjour KEKELI 👋 Je veux créer un site web professionnel pour mon entreprise. Pouvez-vous m'aider ?",
  "/entreprises/strategie":     "Bonjour KEKELI 👋 Je veux développer la stratégie digitale de mon entreprise. Pouvez-vous m'aider ?",
  "/entreprises":               "Bonjour KEKELI 👋 Je veux développer la présence digitale de mon entreprise. Pouvez-vous m'aider ?",

  // ── Autres pages ──────────────────────────────────────────────────────────
  "/sondage":                   "Bonjour KEKELI 👋 J'ai complété votre sondage et j'aimerais en savoir plus sur vos services. Pouvez-vous m'aider ?",
  "/contact":                   "Bonjour KEKELI 👋 Je voudrais discuter d'un projet avec vous. Pouvez-vous m'aider ?",
  "/brief":                     "Bonjour KEKELI 👋 Je souhaite déposer un brief pour mon projet. Pouvez-vous m'aider ?",
};

const DEFAULT_MESSAGE = "Bonjour KEKELI 👋 Je voudrais en savoir plus sur vos services. Pouvez-vous m'aider ?";

export default function WhatsAppButton() {
  const pathname = usePathname();

  // Match exact path first, then try prefix (e.g. /sondage/artiste → /sondage)
  const message =
    MESSAGES[pathname] ??
    MESSAGES[Object.keys(MESSAGES).find((k) => pathname.startsWith(k + "/")) ?? ""] ??
    DEFAULT_MESSAGE;

  const waUrl = `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Nous contacter sur WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-xl"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25 pointer-events-none" />

      {/* Icon + label */}
      <span className="relative flex items-center gap-3 px-5 py-3.5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          className="flex-shrink-0"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        <span className="font-semibold text-sm whitespace-nowrap">WhatsApp</span>
      </span>
    </motion.a>
  );
}
