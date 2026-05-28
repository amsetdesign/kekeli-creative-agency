"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Download, RefreshCw, Share2, Check } from "lucide-react";

/* ─── Types & constants ─────────────────────────────────── */
interface CertData {
  name: string;
  genre: string;
  level: string;
  levelColor: string;
  levelLabel: string;
  year: string;
}

const LEVELS = [
  { value: "Artiste Émergent",  label: "Artiste Émergent",  color: "#10B981", bg: "rgba(16,185,129,0.12)",  desc: "En route vers la scène" },
  { value: "Rising Artist",     label: "Rising Artist",     color: "#4C9BFF", bg: "rgba(76,155,255,0.12)",  desc: "L'ascension est lancée" },
  { value: "Pro Artist",        label: "Pro Artist",        color: "#8B5CF6", bg: "rgba(139,92,246,0.12)",  desc: "Maîtrise et professionnalisme" },
  { value: "Elite Artist",      label: "Elite Artist",      color: "#C8A84B", bg: "rgba(200,168,75,0.12)",  desc: "Le sommet de l'art" },
];

const GOLD = "#C8A84B";
const BG   = "#0C0B09";

/* ─── Canvas draw ───────────────────────────────────────── */
function drawCertificate(canvas: HTMLCanvasElement, d: CertData) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const W = canvas.width;   // 1200
  const H = canvas.height;  // 800

  // ── Background ──
  ctx.fillStyle = BG;
  ctx.fillRect(0, 0, W, H);

  // ── Subtle radial glow ──
  const grd = ctx.createRadialGradient(W / 2, H * 0.55, 0, W / 2, H * 0.55, 380);
  grd.addColorStop(0, "rgba(200,168,75,0.09)");
  grd.addColorStop(1, "rgba(200,168,75,0)");
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, W, H);

  // ── Outer border ──
  ctx.strokeStyle = GOLD;
  ctx.lineWidth = 2.5;
  ctx.strokeRect(22, 22, W - 44, H - 44);

  // ── Inner border ──
  ctx.strokeStyle = "rgba(200,168,75,0.35)";
  ctx.lineWidth = 1;
  ctx.strokeRect(38, 38, W - 76, H - 76);

  // ── Corner accents ──
  const corners: [number, number, number, number][] = [[22, 22, 1, 1], [W - 22, 22, -1, 1], [22, H - 22, 1, -1], [W - 22, H - 22, -1, -1]];
  ctx.strokeStyle = GOLD;
  ctx.lineWidth = 2.5;
  corners.forEach(([x, y, dx, dy]) => {
    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + dx * 55, y); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + dy * 55); ctx.stroke();
  });

  // ── Header — Agency name ──
  ctx.fillStyle = GOLD;
  ctx.font = "bold 18px Arial";
  ctx.textAlign = "center";
  ctx.letterSpacing = "6px";
  ctx.fillText("KEKELI CREATIVE AGENCY", W / 2, 88);

  ctx.fillStyle = "rgba(200,168,75,0.5)";
  ctx.font = "13px Arial";
  ctx.letterSpacing = "3px";
  ctx.fillText("DAKAR · SÉNÉGAL", W / 2, 112);

  // ── Divider ──
  const drawDivider = (y: number, w = 220, alpha = 0.35) => {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = GOLD;
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(W / 2 - w, y); ctx.lineTo(W / 2 + w, y); ctx.stroke();
    // Small diamond center
    ctx.fillStyle = GOLD;
    ctx.beginPath();
    ctx.moveTo(W / 2, y - 5); ctx.lineTo(W / 2 + 5, y);
    ctx.lineTo(W / 2, y + 5); ctx.lineTo(W / 2 - 5, y); ctx.closePath();
    ctx.fill();
    ctx.restore();
  };
  drawDivider(138);

  // ── "CERTIFIE QUE" ──
  ctx.fillStyle = "rgba(255,255,255,0.35)";
  ctx.font = "14px Arial";
  ctx.letterSpacing = "4px";
  ctx.textAlign = "center";
  ctx.fillText("C E R T I F I E  Q U E", W / 2, 188);

  // ── Artist Name ──
  ctx.fillStyle = "#FFFFFF";
  ctx.letterSpacing = "2px";
  const nameFontSize = d.name.length > 18 ? 52 : d.name.length > 12 ? 62 : 72;
  ctx.font = `bold ${nameFontSize}px Georgia, serif`;
  ctx.fillText(d.name || "Votre Nom", W / 2, 288);

  // ── "EST CERTIFIÉ EN TANT QUE" ──
  ctx.fillStyle = "rgba(255,255,255,0.3)";
  ctx.font = "13px Arial";
  ctx.letterSpacing = "3px";
  ctx.fillText("E S T  C E R T I F I É  E N  T A N T  Q U E", W / 2, 332);

  // ── Level badge (rounded rect) ──
  const badgeW = 260;
  const badgeH = 46;
  const badgeX = W / 2 - badgeW / 2;
  const badgeY = 350;
  const r = 23;

  ctx.fillStyle = `${d.levelColor}22`;
  ctx.strokeStyle = `${d.levelColor}80`;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(badgeX + r, badgeY);
  ctx.lineTo(badgeX + badgeW - r, badgeY);
  ctx.quadraticCurveTo(badgeX + badgeW, badgeY, badgeX + badgeW, badgeY + r);
  ctx.lineTo(badgeX + badgeW, badgeY + badgeH - r);
  ctx.quadraticCurveTo(badgeX + badgeW, badgeY + badgeH, badgeX + badgeW - r, badgeY + badgeH);
  ctx.lineTo(badgeX + r, badgeY + badgeH);
  ctx.quadraticCurveTo(badgeX, badgeY + badgeH, badgeX, badgeY + badgeH - r);
  ctx.lineTo(badgeX, badgeY + r);
  ctx.quadraticCurveTo(badgeX, badgeY, badgeX + r, badgeY);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = d.levelColor;
  ctx.font = "bold 20px Arial";
  ctx.letterSpacing = "2px";
  ctx.textAlign = "center";
  ctx.fillText(d.levelLabel.toUpperCase(), W / 2, badgeY + 31);

  // ── Genre ──
  if (d.genre) {
    ctx.fillStyle = "rgba(255,255,255,0.45)";
    ctx.font = "16px Georgia, serif";
    ctx.letterSpacing = "1px";
    ctx.fillText(`${d.genre}`, W / 2, 444);
  }

  // ── Bottom divider ──
  drawDivider(490, 300, 0.25);

  // ── Bottom section ──
  const bottomY = 540;

  // Left: decorative signature zone
  ctx.fillStyle = "rgba(255,255,255,0.15)";
  ctx.font = "italic 22px Georgia, serif";
  ctx.letterSpacing = "0";
  ctx.textAlign = "left";
  ctx.fillText("Kekeli Creative Agency", 120, bottomY + 10);
  ctx.strokeStyle = "rgba(255,255,255,0.2)";
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(120, bottomY + 18); ctx.lineTo(380, bottomY + 18); ctx.stroke();
  ctx.fillStyle = "rgba(255,255,255,0.3)";
  ctx.font = "11px Arial";
  ctx.letterSpacing = "2px";
  ctx.fillText("DIRECTEUR ARTISTIQUE", 120, bottomY + 36);

  // Center: date
  ctx.textAlign = "center";
  ctx.fillStyle = "rgba(255,255,255,0.3)";
  ctx.font = "11px Arial";
  ctx.letterSpacing = "2px";
  ctx.fillText("CERTIFIÉ EN", W / 2, bottomY + 5);
  ctx.fillStyle = GOLD;
  ctx.font = "bold 24px Georgia, serif";
  ctx.letterSpacing = "2px";
  ctx.fillText(d.year, W / 2, bottomY + 36);

  // Right: K badge
  const kX = W - 120;
  ctx.fillStyle = BG;
  ctx.strokeStyle = GOLD;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(kX, bottomY + 14, 30, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = GOLD;
  ctx.font = "bold 32px Georgia, serif";
  ctx.letterSpacing = "0";
  ctx.textAlign = "center";
  ctx.fillText("K", kX, bottomY + 25);

  // ── Bottom text ──
  ctx.fillStyle = "rgba(200,168,75,0.4)";
  ctx.font = "11px Arial";
  ctx.letterSpacing = "4px";
  ctx.textAlign = "center";
  ctx.fillText("PROPULSER LE TALENT AFRICAIN VERS LE MONDE", W / 2, 750);

  // ── Watermark pattern (subtle diagonal K's) ──
  ctx.save();
  ctx.globalAlpha = 0.025;
  ctx.fillStyle = GOLD;
  ctx.font = "40px Georgia, serif";
  ctx.letterSpacing = "0";
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 9; col++) {
      ctx.save();
      ctx.translate(80 + col * 140, 80 + row * 130);
      ctx.rotate(-0.25);
      ctx.fillText("K", 0, 0);
      ctx.restore();
    }
  }
  ctx.restore();
}

/* ─── Chip ──────────────────────────────────────────────── */
function LevelChip({ level, active, onClick }: { level: typeof LEVELS[0]; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left px-4 py-3 rounded-xl border transition-all"
      style={{
        background: active ? level.bg : "transparent",
        borderColor: active ? level.color : "#E7E5E4",
      }}
    >
      <p className="font-body text-sm font-semibold" style={{ color: active ? level.color : "#78716C" }}>
        {level.label}
      </p>
      <p className="font-body text-xs text-[#A8A29E] mt-0.5">{level.desc}</p>
    </button>
  );
}

/* ─── Main ──────────────────────────────────────────────── */
export default function CertificationClient() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [data, setData] = useState<CertData>({
    name: "",
    genre: "",
    level: "Artiste Émergent",
    levelColor: "#10B981",
    levelLabel: "Artiste Émergent",
    year: new Date().getFullYear().toString(),
  });
  const [generated, setGenerated] = useState(false);
  const [copied, setCopied] = useState(false);

  const redraw = useCallback(() => {
    if (canvasRef.current) drawCertificate(canvasRef.current, data);
  }, [data]);

  useEffect(() => { redraw(); }, [redraw]);

  const generate = () => {
    if (!data.name.trim()) return;
    redraw();
    setGenerated(true);
  };

  const download = () => {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.download = `certificat-kekeli-${data.name.toLowerCase().replace(/\s+/g, "-")}.png`;
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  };

  const copyLink = async () => {
    const url = `${window.location.origin}/certification?name=${encodeURIComponent(data.name)}&level=${encodeURIComponent(data.level)}&genre=${encodeURIComponent(data.genre)}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const reset = () => { setGenerated(false); setData({ ...data, name: "", genre: "" }); };

  const selectLevel = (l: typeof LEVELS[0]) => {
    setData((d) => ({ ...d, level: l.value, levelColor: l.color, levelLabel: l.label }));
  };

  const canGenerate = data.name.trim().length > 0;

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      {/* Hero */}
      <div className="relative py-20 px-4 text-center" style={{ background: "#0C0B09" }}>
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `radial-gradient(circle at 50% 80%, ${GOLD} 0%, transparent 60%)` }} />
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center relative z-10"
          style={{ background: "rgba(200,168,75,0.12)", border: "1px solid rgba(200,168,75,0.3)" }}
        >
          <Award size={30} style={{ color: GOLD }} />
        </motion.div>
        <motion.h1
          initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15, duration: 0.7 }}
          className="font-display text-4xl md:text-5xl text-white mb-3 relative z-10"
        >
          Certification <span style={{ color: GOLD }}>Artiste</span>
        </motion.h1>
        <motion.p
          initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.25, duration: 0.6 }}
          className="font-body text-white/50 max-w-lg mx-auto relative z-10"
        >
          Génère ton certificat officiel KEKELI Creative Agency — téléchargeable en PNG, partageable partout.
        </motion.p>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid lg:grid-cols-5 gap-10">

          {/* ── Form ── */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence mode="wait">
              {!generated ? (
                <motion.div key="form" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
                  {/* Name */}
                  <div className="mb-6">
                    <label className="font-body text-sm font-semibold text-[#0C0B09] block mb-2">
                      Ton nom artistique <span style={{ color: GOLD }}>*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Ex : Kofi Beats, Aminata Soul..."
                      maxLength={28}
                      value={data.name}
                      onChange={(e) => setData((d) => ({ ...d, name: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border font-body text-sm text-[#0C0B09] outline-none transition-all"
                      style={{
                        borderColor: data.name ? GOLD : "#E7E5E4",
                        boxShadow: data.name ? `0 0 0 3px rgba(200,168,75,0.12)` : "none",
                      }}
                    />
                  </div>

                  {/* Genre */}
                  <div className="mb-6">
                    <label className="font-body text-sm font-semibold text-[#0C0B09] block mb-2">
                      Genre musical <span className="font-normal text-[#78716C]">(optionnel)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Ex : Afrobeats, Mbalax, Rap..."
                      maxLength={24}
                      value={data.genre}
                      onChange={(e) => setData((d) => ({ ...d, genre: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border font-body text-sm text-[#0C0B09] outline-none"
                      style={{ borderColor: "#E7E5E4" }}
                    />
                  </div>

                  {/* Level */}
                  <div className="mb-8">
                    <label className="font-body text-sm font-semibold text-[#0C0B09] block mb-3">
                      Ton niveau artistique
                    </label>
                    <div className="space-y-2">
                      {LEVELS.map((l) => (
                        <LevelChip
                          key={l.value}
                          level={l}
                          active={data.level === l.value}
                          onClick={() => selectLevel(l)}
                        />
                      ))}
                    </div>
                  </div>

                  <motion.button
                    onClick={generate}
                    disabled={!canGenerate}
                    whileHover={canGenerate ? { scale: 1.02 } : {}}
                    whileTap={canGenerate ? { scale: 0.98 } : {}}
                    className="w-full py-4 rounded-2xl font-body font-bold text-sm transition-all flex items-center justify-center gap-2"
                    style={{
                      background: canGenerate ? GOLD : "#D4D4D4",
                      color: canGenerate ? "#0C0B09" : "#A8A29E",
                      cursor: canGenerate ? "pointer" : "not-allowed",
                    }}
                  >
                    <Award size={18} />
                    Générer mon certificat
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div key="actions" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                  <div
                    className="p-5 rounded-2xl mb-6"
                    style={{ background: "rgba(200,168,75,0.08)", border: "1px solid rgba(200,168,75,0.2)" }}
                  >
                    <p className="font-body text-sm font-semibold text-[#0C0B09] mb-1">
                      Certificat généré ✓
                    </p>
                    <p className="font-body text-xs text-[#78716C]">
                      {data.name} · {data.levelLabel} · {data.year}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={download}
                      className="w-full py-3.5 rounded-xl font-body font-semibold text-sm flex items-center justify-center gap-2 text-white"
                      style={{ background: "#0C0B09" }}
                    >
                      <Download size={16} />
                      Télécharger en PNG
                    </button>
                    <button
                      onClick={copyLink}
                      className="w-full py-3.5 rounded-xl font-body font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
                      style={{ border: `1px solid ${GOLD}40`, color: GOLD }}
                    >
                      {copied ? <Check size={16} /> : <Share2 size={16} />}
                      {copied ? "Lien copié !" : "Copier le lien"}
                    </button>
                    <button
                      onClick={reset}
                      className="w-full py-3 rounded-xl font-body text-sm text-[#78716C] hover:text-[#0C0B09] transition-colors flex items-center justify-center gap-2"
                    >
                      <RefreshCw size={14} />
                      Nouveau certificat
                    </button>
                  </div>

                  <p className="font-body text-xs text-[#A8A29E] mt-6 text-center">
                    Partage ton certificat sur Instagram, LinkedIn ou WhatsApp pour montrer ton niveau artistique.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Canvas Preview ── */}
          <div className="lg:col-span-3">
            <p className="font-body text-xs text-[#A8A29E] uppercase tracking-widest mb-4">Aperçu du certificat</p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl"
              style={{ background: "#0C0B09" }}
            >
              <canvas
                ref={canvasRef}
                width={1200}
                height={800}
                className="w-full h-auto block"
                style={{ display: "block" }}
              />
              {!generated && (
                <div
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  style={{ background: "rgba(12,11,9,0.5)" }}
                >
                  <div className="text-center px-6">
                    <Award size={32} style={{ color: GOLD }} className="mx-auto mb-3 opacity-60" />
                    <p className="font-body text-sm text-white/40">
                      Remplis le formulaire et clique sur<br />"Générer mon certificat"
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
            <p className="font-body text-xs text-[#A8A29E] mt-3 text-center">
              PNG haute résolution 1200×800px — prêt pour les réseaux sociaux
            </p>
          </div>
        </div>

        {/* ── Level showcase ── */}
        <div className="mt-20 pt-12" style={{ borderTop: "1px solid #E7E5E4" }}>
          <p className="font-body text-[11px] uppercase tracking-[0.25em] text-[#A8A29E] text-center mb-8">
            4 niveaux de certification
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {LEVELS.map((l, i) => (
              <motion.div
                key={l.value}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="p-5 rounded-2xl text-center"
                style={{ background: l.bg, border: `1px solid ${l.color}30` }}
              >
                <p className="font-body text-base font-bold mb-1" style={{ color: l.color }}>
                  {l.label}
                </p>
                <p className="font-body text-xs text-[#78716C]">{l.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
