import { jsPDF } from "jspdf";

export type GuideType = "artiste" | "entreprise";

interface GuideStep {
  num: string;
  title: string;
  desc: string;
  url: string;
}

interface GuideContent {
  label: string;
  title: string;
  subtitle: string;
  tagline: string;
  steps: GuideStep[];
  benefits: string[];
  aR: number;
  aG: number;
  aB: number;
}

const CONTENT: Record<GuideType, GuideContent> = {
  artiste: {
    label: "Guide Artiste",
    title: "Votre parcours artiste chez KEKELI",
    subtitle: "Musicien · Artiste solo · Groupe · Beatmaker · DJ",
    tagline:
      "Votre musique mérite d'être entendue. Suivez ce parcours pour développer votre visibilité et lancer votre carrière.",
    steps: [
      {
        num: "01",
        title: "Faites l'audit gratuit",
        desc: "10 questions · 3 minutes · Résultats immédiats. Identifiez vos forces et vos points d'amélioration.",
        url: "kekeli.agency/sondage/artiste",
      },
      {
        num: "02",
        title: "Explorez les services artiste",
        desc: "EPK professionnel, shooting photo pro, stratégie TikTok & Reels, plan de sortie musicale sur 6 semaines.",
        url: "kekeli.agency/artistes",
      },
      {
        num: "03",
        title: "Soumettez votre brief",
        desc: "Décrivez votre projet en 4 étapes. Estimation personnalisée sur WhatsApp dans les 30 minutes.",
        url: "kekeli.agency/brief",
      },
      {
        num: "04",
        title: "Recevez votre accompagnement",
        desc: "Stratégie sur mesure, production de contenu, gestion de votre visibilité digitale. KEKELI s'occupe de tout.",
        url: "kekeli.agency/contact",
      },
    ],
    benefits: [
      "EPK professionnel pour vos bookings et vos relations presse",
      "Photos, clips et visuels de qualité professionnelle",
      "Stratégie de sortie musicale planifiée sur 6 semaines",
      "TikTok, Reels et community management actif",
      "Campagnes promotionnelles ciblées sur votre audience",
    ],
    aR: 139,
    aG: 92,
    aB: 246,
  },
  entreprise: {
    label: "Guide Client",
    title: "Votre parcours client chez KEKELI",
    subtitle: "Entreprise · PME · Startup · Marque · Commerce · Événement",
    tagline:
      "Développez votre présence digitale avec une agence qui connaît votre marché et vos défis à Dakar.",
    steps: [
      {
        num: "01",
        title: "Faites l'audit de visibilité",
        desc: "10 questions · 3 minutes · Diagnostic complet. Évaluez votre présence digitale et identifiez les priorités.",
        url: "kekeli.agency/sondage",
      },
      {
        num: "02",
        title: "Découvrez nos services",
        desc: "Site web professionnel, gestion des réseaux sociaux, publicité digitale, branding et identité visuelle.",
        url: "kekeli.agency/services",
      },
      {
        num: "03",
        title: "Soumettez votre brief",
        desc: "Décrivez votre projet en 4 étapes. Recevez un devis personnalisé et un plan d'action sous 24 heures.",
        url: "kekeli.agency/brief",
      },
      {
        num: "04",
        title: "Lancez votre présence digitale",
        desc: "Stratégie sur mesure, production de contenu, campagnes publicitaires, suivi et reporting mensuel.",
        url: "kekeli.agency/contact",
      },
    ],
    benefits: [
      "Site web moderne, responsive et optimisé pour le SEO",
      "Gestion complète de vos réseaux sociaux",
      "Campagnes Facebook & Instagram Ads ciblées à Dakar",
      "Identité visuelle professionnelle et cohérente",
      "Rapports mensuels et suivi des performances",
    ],
    aR: 200,
    aG: 168,
    aB: 75,
  },
};

export function generateGuide(type: GuideType): ArrayBuffer {
  const g = CONTENT[type];
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  const W = 210;
  const ml = 18;
  const mr = 18;
  const cw = W - ml - mr;

  // ── DARK HEADER ──────────────────────────────────────────────────────────────
  doc.setFillColor(12, 11, 9);
  doc.rect(0, 0, W, 52, "F");

  // Gold accent stripe
  doc.setFillColor(200, 168, 75);
  doc.rect(0, 52, W, 2.5, "F");

  // "K" logo circle
  doc.setFillColor(40, 35, 10);
  doc.circle(ml + 6, 13, 5.5, "F");
  doc.setTextColor(200, 168, 75);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("K", ml + 6, 14.8, { align: "center" });

  // Brand name
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("KEKELI", ml + 15, 14.5);
  doc.setTextColor(200, 168, 75);
  doc.text(".", ml + 35.5, 14.5);
  doc.setTextColor(255, 255, 255);
  doc.text("AGENCY", ml + 37.5, 14.5);

  // Guide type tag (top right)
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(200, 168, 75);
  doc.text(g.label.toUpperCase(), W - mr, 13, { align: "right" });

  // Main title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(255, 255, 255);
  doc.text(g.title, ml, 30);

  // Profile subtitle
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(g.aR, g.aG, g.aB);
  doc.text(g.subtitle, ml, 42);

  // ── TAGLINE ──────────────────────────────────────────────────────────────────
  let y = 62;
  doc.setFont("helvetica", "italic");
  doc.setFontSize(9.5);
  doc.setTextColor(80, 70, 100);
  const tagLines = doc.splitTextToSize(g.tagline, cw);
  doc.text(tagLines, ml, y);
  y += tagLines.length * 5.5 + 9;

  // ── STEPS ────────────────────────────────────────────────────────────────────
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12.5);
  doc.setTextColor(12, 11, 9);
  doc.text("Votre parcours en 4 étapes", ml, y);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(130, 120, 110);
  doc.text("Suivez ces étapes dans l'ordre pour un accompagnement optimal", ml, y + 6);
  y += 13;

  const scw = (cw - 5) / 2;
  const sh = 44;

  g.steps.forEach((step, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const sx = ml + col * (scw + 5);
    const sy = y + row * (sh + 4);

    // Card background
    doc.setFillColor(250, 248, 245);
    doc.roundedRect(sx, sy, scw, sh, 3, 3, "F");
    doc.setDrawColor(228, 222, 210);
    doc.setLineWidth(0.25);
    doc.roundedRect(sx, sy, scw, sh, 3, 3, "D");

    // Number badge
    doc.setFillColor(g.aR, g.aG, g.aB);
    doc.roundedRect(sx + 4, sy + 4, 13, 7.5, 1.5, 1.5, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(255, 255, 255);
    doc.text(step.num, sx + 10.5, sy + 9.3, { align: "center" });

    // Step title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(12, 11, 9);
    const titleW = doc.splitTextToSize(step.title, scw - 10);
    doc.text(titleW, sx + 5, sy + 18);

    // Step description
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(100, 90, 80);
    const descW = doc.splitTextToSize(step.desc, scw - 10);
    doc.text(descW, sx + 5, sy + 26);

    // URL
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(g.aR, g.aG, g.aB);
    doc.text("→ " + step.url, sx + 5, sy + sh - 4.5);
  });

  y += Math.ceil(g.steps.length / 2) * (sh + 4) + 8;

  // ── BENEFITS ─────────────────────────────────────────────────────────────────
  doc.setFillColor(g.aR, g.aG, g.aB);
  doc.roundedRect(ml, y, cw, 10, 2, 2, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(12, 11, 9);
  doc.text("Ce que vous obtenez avec KEKELI", W / 2, y + 6.8, { align: "center" });
  y += 14;

  g.benefits.forEach((b) => {
    doc.setFillColor(g.aR, g.aG, g.aB);
    doc.circle(ml + 3.5, y + 2, 1.5, "F");
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(25, 20, 35);
    doc.text(b, ml + 8, y + 3.5);
    y += 8;
  });

  // ── FOOTER ───────────────────────────────────────────────────────────────────
  const footY = 272;

  doc.setDrawColor(215, 208, 195);
  doc.setLineWidth(0.3);
  doc.line(ml, footY, W - mr, footY);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(120, 113, 108);
  doc.text(
    "KEKELI Creative Agency  ·  Dakar, Sénégal  ·  kekelicreativeagency@gmail.com  ·  kekeli.agency",
    W / 2,
    footY + 6,
    { align: "center" }
  );

  doc.setFillColor(g.aR, g.aG, g.aB);
  doc.roundedRect(ml, footY + 11, cw, 11, 3, 3, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(12, 11, 9);
  doc.text(
    "Démarrez maintenant → kekeli.agency/brief",
    W / 2,
    footY + 18,
    { align: "center" }
  );

  return doc.output("arraybuffer");
}
