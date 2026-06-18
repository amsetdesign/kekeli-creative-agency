import { jsPDF } from "jspdf";
import type { SondageConfig, UserInfo } from "@/data/sondages/types";

interface LevelInfo {
  label: string;
  r: number;
  g: number;
  b: number;
  desc: string;
}

function getLevel(score: number): LevelInfo {
  if (score < 20) return { label: "Débutant", r: 239, g: 68, b: 68, desc: "Votre présence digitale est à construire. Un accompagnement complet est recommandé pour poser des bases solides." };
  if (score < 40) return { label: "En développement", r: 249, g: 115, b: 22, desc: "Des lacunes importantes freinent votre visibilité. Des actions ciblées peuvent rapidement changer la donne." };
  if (score < 60) return { label: "Intermédiaire", r: 180, g: 140, b: 0, desc: "Vous avez posé de bonnes bases. L'heure est à l'optimisation et à la montée en puissance." };
  if (score < 80) return { label: "Avancé", r: 22, g: 163, b: 74, desc: "Votre stratégie digitale est solide. Quelques ajustements ciblés peuvent vous propulser au niveau Expert." };
  return { label: "Expert", r: 107, g: 33, b: 168, desc: "Félicitations — vous maîtrisez votre présence digitale. Travaillons ensemble pour affiner les performances." };
}

export function generateSondageReport(
  config: SondageConfig,
  score: number,
  userInfo: UserInfo,
  date: string
): ArrayBuffer {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  const W = 210;
  const ml = 18;
  const cw = W - ml * 2;
  const level = getLevel(score);

  // ── DARK HEADER ─────────────────────────────────────────────────────────────
  doc.setFillColor(12, 11, 9);
  doc.rect(0, 0, W, 56, "F");

  // Gold accent line
  doc.setFillColor(200, 168, 75);
  doc.rect(0, 56, W, 2.5, "F");

  // "K" circle
  doc.setFillColor(40, 35, 10);
  doc.circle(ml + 6, 13, 5.5, "F");
  doc.setTextColor(200, 168, 75);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("K", ml + 6, 14.8, { align: "center" });

  // KEKELI.AGENCY
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("KEKELI", ml + 15, 14.5);
  doc.setTextColor(200, 168, 75);
  doc.text(".", ml + 35.5, 14.5);
  doc.setTextColor(255, 255, 255);
  doc.text("AGENCY", ml + 37.5, 14.5);

  // AUDIT GRATUIT tag
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(200, 168, 75);
  doc.text("AUDIT GRATUIT", W - ml, 13, { align: "right" });

  // Report title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(255, 255, 255);
  doc.text("Audit de visibilité digitale", ml, 31);

  // Subtitle
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(190, 190, 185);
  const subtitle = `Profil : ${config.title}  ·  ${userInfo.prenom}${userInfo.structure ? "  ·  " + userInfo.structure : ""}  ·  ${date}`;
  doc.text(subtitle, ml, 42);

  // ── SCORE CARD ──────────────────────────────────────────────────────────────
  let y = 70;

  doc.setFillColor(255, 255, 255);
  doc.roundedRect(ml, y, cw, 46, 4, 4, "F");
  doc.setDrawColor(231, 229, 228);
  doc.setLineWidth(0.3);
  doc.roundedRect(ml, y, cw, 46, 4, 4, "D");

  // Score number
  doc.setFont("helvetica", "bold");
  doc.setFontSize(44);
  doc.setTextColor(level.r, level.g, level.b);
  doc.text(`${score}`, ml + 22, y + 30, { align: "center" });

  // /100
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.setTextColor(120, 113, 108);
  doc.text("/ 100", ml + 36, y + 30);

  // Score bar (background)
  doc.setFillColor(231, 229, 228);
  doc.roundedRect(ml + 8, y + 37, 34, 3.5, 1.5, 1.5, "F");
  // Score bar (fill)
  doc.setFillColor(level.r, level.g, level.b);
  const barW = Math.max(3, 34 * (score / 100));
  doc.roundedRect(ml + 8, y + 37, barW, 3.5, 1.5, 1.5, "F");

  // Level badge
  doc.setFillColor(level.r, level.g, level.b);
  doc.roundedRect(ml + 52, y + 8, 48, 9, 2, 2, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text(level.label.toUpperCase(), ml + 76, y + 14, { align: "center" });

  // Level description
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(55, 65, 81);
  const descWrapped = doc.splitTextToSize(level.desc, cw - 60);
  doc.text(descWrapped, ml + 52, y + 24);

  y += 56;

  // ── PROFIL DÉMOGRAPHIQUE ─────────────────────────────────────────────────────
  const profileFields: { label: string; value: string }[] = [];

  if (userInfo.sexe) {
    const sexeMap: Record<string, string> = { homme: "Homme", femme: "Femme", non_precise: "Non précisé" };
    profileFields.push({ label: "Genre", value: sexeMap[userInfo.sexe] ?? userInfo.sexe });
  }
  if (userInfo.age) {
    const ageMap: Record<string, string> = { moins_25: "Moins de 25 ans", "25_35": "25–35 ans", "35_45": "35–45 ans", "45_plus": "45 ans et plus" };
    profileFields.push({ label: "Âge", value: ageMap[userInfo.age] ?? userInfo.age });
  }
  if (userInfo.ville) profileFields.push({ label: "Ville", value: userInfo.ville });
  if (userInfo.budget) {
    const budgetMap: Record<string, string> = { moins_50k: "< 50 000 FCFA", "50k_150k": "50 000–150 000 FCFA", "150k_500k": "150 000–500 000 FCFA", "500k_2M": "500 000–2 000 000 FCFA", "plus_2M": "> 2 000 000 FCFA" };
    profileFields.push({ label: "Budget", value: budgetMap[userInfo.budget] ?? userInfo.budget });
  }
  if (userInfo.urgence) {
    const urgenceMap: Record<string, string> = { immediat: "Immédiat", "1_mois": "Dans 1 mois", "1_3_mois": "1–3 mois", "plus_3_mois": "3 mois ou plus" };
    profileFields.push({ label: "Délai", value: urgenceMap[userInfo.urgence] ?? userInfo.urgence });
  }
  if (userInfo.source) {
    const sourceMap: Record<string, string> = { instagram: "Instagram", facebook: "Facebook", tiktok: "TikTok", youtube: "YouTube", bouche_a_oreille: "Bouche à oreille", google: "Google", evenement: "Événement", autre: "Autre" };
    profileFields.push({ label: "Source", value: sourceMap[userInfo.source] ?? userInfo.source });
  }

  if (profileFields.length > 0) {
    const profileH = 14 + profileFields.length * 9;
    doc.setFillColor(250, 248, 243);
    doc.roundedRect(ml, y, cw, profileH, 4, 4, "F");
    doc.setDrawColor(200, 168, 75);
    doc.setLineWidth(0.4);
    doc.roundedRect(ml, y, cw, profileH, 4, 4, "D");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(200, 168, 75);
    doc.text("PROFIL", ml + 5, y + 8);

    profileFields.forEach((f, i) => {
      const fy = y + 14 + i * 9;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(120, 113, 108);
      doc.text(f.label, ml + 5, fy);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(12, 11, 9);
      doc.text(f.value, ml + 40, fy);
    });

    y += profileH + 8;
  }

  // ── RECOMMENDATIONS ─────────────────────────────────────────────────────────
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(12, 11, 9);
  doc.text("Nos recommandations", ml, y + 8);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(120, 113, 108);
  doc.text("Plan d'action personnalisé pour améliorer votre visibilité digitale", ml, y + 15);

  y += 22;

  const colW = (cw - 5) / 2;
  const cardH = 33;

  config.recommendations.forEach((reco, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const rx = ml + col * (colW + 5);
    const ry = y + row * (cardH + 4);

    // Card background
    doc.setFillColor(250, 248, 243);
    doc.roundedRect(rx, ry, colW, cardH, 3, 3, "F");
    doc.setDrawColor(231, 229, 228);
    doc.setLineWidth(0.25);
    doc.roundedRect(rx, ry, colW, cardH, 3, 3, "D");

    // Gold dot
    doc.setFillColor(200, 168, 75);
    doc.circle(rx + 7, ry + 8, 2.5, "F");

    // Reco title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(12, 11, 9);
    const titleW = doc.splitTextToSize(reco.title, colW - 20);
    doc.text(titleW, rx + 13, ry + 9.5);

    // Reco description
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(120, 113, 108);
    const descW = doc.splitTextToSize(reco.desc, colW - 10);
    doc.text(descW, rx + 5, ry + 19);
  });

  const rows = Math.ceil(config.recommendations.length / 2);
  y += rows * (cardH + 4) + 6;

  // ── FOOTER ──────────────────────────────────────────────────────────────────
  const footY = 275;

  doc.setDrawColor(231, 229, 228);
  doc.setLineWidth(0.3);
  doc.line(ml, footY, W - ml, footY);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(120, 113, 108);
  doc.text(
    "KEKELI Creative Agency  ·  Dakar, Sénégal  ·  kekelicreativeagency@gmail.com  ·  kekelicreativeagency.com",
    W / 2,
    footY + 6,
    { align: "center" }
  );

  // CTA bar
  doc.setFillColor(200, 168, 75);
  doc.roundedRect(ml, footY + 11, cw, 11, 3, 3, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(12, 11, 9);
  doc.text(
    "Prêt à passer à l'action ? Contactez-nous → kekelicreativeagency.com/contact",
    W / 2,
    footY + 18,
    { align: "center" }
  );

  return doc.output("arraybuffer");
}
