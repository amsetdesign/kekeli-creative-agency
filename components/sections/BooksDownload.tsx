"use client";

import { useState } from "react";
import { X, Mail, User, Download, CheckCircle, Loader2, BookOpen } from "lucide-react";
import FadeIn, { FadeInStagger, FadeInItem } from "@/components/animations/FadeIn";

const GOLD = "#C8A84B";
const DARK = "#0C0B09";

/* ── 3D Book cover ───────────────────────────────────────────── */
function Book3D({
  title,
  subtitle,
  tag,
  details,
  coverGrad,
  spineColor,
  accentColor,
  hovered,
}: {
  title: string;
  subtitle: string;
  tag: string;
  details: string;
  coverGrad: string;
  spineColor: string;
  accentColor: string;
  hovered: boolean;
}) {
  const W = 160;
  const H = 230;
  const D = 26;

  return (
    <div style={{ perspective: "1400px", display: "inline-block" }}>
      <div
        style={{
          width: W,
          height: H,
          position: "relative",
          transformStyle: "preserve-3d",
          transform: hovered ? "rotateY(-8deg) translateY(-6px)" : "rotateY(-28deg)",
          transition: "transform 0.45s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        {/* Front cover */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: coverGrad,
            borderRadius: "0 3px 3px 0",
            padding: "16px 14px 14px",
            display: "flex",
            flexDirection: "column",
            boxShadow: hovered
              ? `6px 12px 48px rgba(0,0,0,0.7), 0 0 40px ${accentColor}30`
              : "4px 8px 32px rgba(0,0,0,0.6)",
            overflow: "hidden",
          }}
        >
          {/* Top lines */}
          <div style={{ borderTop: `2px solid ${accentColor}`, marginBottom: 4 }} />
          <div style={{ borderTop: `1px solid ${accentColor}`, marginBottom: 10, opacity: 0.4 }} />

          {/* Publisher */}
          <p style={{ color: accentColor, fontSize: 7, letterSpacing: "0.22em", textTransform: "uppercase", margin: "0 0 6px", opacity: 0.8 }}>
            KEKELI Creative Agency
          </p>

          {/* Tag pill */}
          <span style={{
            display: "inline-block", alignSelf: "flex-start",
            background: `${accentColor}22`, color: accentColor,
            fontSize: 7, padding: "2px 7px", borderRadius: 20,
            letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10,
            border: `1px solid ${accentColor}40`,
          }}>
            {tag}
          </span>

          {/* Title */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <h3 style={{
              color: "#fff", fontSize: 16, fontWeight: 800,
              lineHeight: 1.2, margin: "0 0 8px",
              fontFamily: "var(--font-body)",
              textShadow: "0 2px 8px rgba(0,0,0,0.4)",
            }}>
              {title}
            </h3>
            <p style={{ color: `${accentColor}CC`, fontSize: 8.5, lineHeight: 1.5, margin: 0, fontFamily: "var(--font-body)" }}>
              {subtitle}
            </p>
          </div>

          {/* Bottom details */}
          <div style={{ borderTop: `1px solid ${accentColor}30`, paddingTop: 8, marginTop: 10 }}>
            <p style={{ color: `${accentColor}80`, fontSize: 7, letterSpacing: "0.08em", margin: 0 }}>{details}</p>
          </div>

          {/* Watermark circle */}
          <div style={{
            position: "absolute", bottom: -16, right: -16,
            width: 70, height: 70, borderRadius: "50%",
            border: `1px solid ${accentColor}`, opacity: 0.1,
          }} />
          <div style={{
            position: "absolute", bottom: -6, right: -6,
            width: 40, height: 40, borderRadius: "50%",
            border: `1px solid ${accentColor}`, opacity: 0.08,
          }} />

          {/* K watermark */}
          <p style={{
            position: "absolute", bottom: 8, right: 10,
            fontSize: 32, fontWeight: 900, color: `${accentColor}12`,
            margin: 0, fontFamily: "var(--font-display)", lineHeight: 1,
          }}>K</p>
        </div>

        {/* Spine */}
        <div
          style={{
            position: "absolute", left: 0, top: 0,
            width: D, height: "100%",
            background: spineColor,
            transformOrigin: "right center",
            transform: "rotateY(-90deg)",
            display: "flex", alignItems: "center", justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <p style={{
            color: `${accentColor}60`, fontSize: 6,
            writingMode: "vertical-rl", transform: "rotate(180deg)",
            letterSpacing: "0.18em", textTransform: "uppercase",
            whiteSpace: "nowrap", margin: 0,
          }}>
            KEKELI · {title.slice(0, 18)}
          </p>
        </div>

        {/* Pages — right edge */}
        <div
          style={{
            position: "absolute", right: 0, top: 1, bottom: 1, width: D,
            background: "repeating-linear-gradient(90deg,#f5f0eb 0,#f5f0eb 1px,#ece6dc 2px,#f0ebe3 4px,#f5f0eb 5px)",
            transformOrigin: "left center",
            transform: "rotateY(90deg)",
          }}
        />
      </div>
    </div>
  );
}

/* ── Download modal ──────────────────────────────────────────── */
type ModalState = "idle" | "loading" | "success" | "error";

function DownloadModal({
  book,
  onClose,
}: {
  book: { type: "artiste" | "entreprise"; title: string; accentColor: string };
  onClose: () => void;
}) {
  const [name, setName]   = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState<ModalState>("idle");
  const [errMsg, setErrMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setState("loading");
    setErrMsg("");
    try {
      const res = await fetch("/api/guide/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, type: book.type }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.error ?? "Erreur serveur.");
      }
      setState("success");
    } catch (err) {
      setState("error");
      setErrMsg(err instanceof Error ? err.message : "Erreur. Réessayez.");
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.75)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="relative w-full max-w-md rounded-3xl overflow-hidden"
        style={{ background: "#111009", border: "1px solid rgba(200,168,75,0.20)", boxShadow: "0 32px 80px rgba(0,0,0,0.7)" }}
      >
        {/* Top accent */}
        <div style={{ height: 3, background: `linear-gradient(90deg, ${book.accentColor} 0%, transparent 100%)` }} />

        <div className="p-8">
          {/* Close */}
          <button onClick={onClose} className="absolute top-5 right-5 text-white/40 hover:text-white transition-colors">
            <X size={18} />
          </button>

          {state === "success" ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                style={{ background: "rgba(16,185,129,0.12)", border: "2px solid #10B981" }}>
                <CheckCircle size={30} className="text-emerald-400" />
              </div>
              <h3 className="font-body font-bold text-white text-xl mb-2">Guide envoyé !</h3>
              <p className="font-body text-sm mb-1" style={{ color: "rgba(255,255,255,0.55)" }}>
                Vérifiez votre boîte mail — le PDF arrive dans quelques secondes.
              </p>
              <p className="font-body text-xs" style={{ color: "rgba(255,255,255,0.30)" }}>
                (Pensez à vérifier vos spams si vous ne le voyez pas)
              </p>
              <button onClick={onClose}
                className="mt-6 px-6 py-2.5 rounded-full font-body text-sm font-semibold text-black transition-opacity hover:opacity-85"
                style={{ background: book.accentColor }}>
                Fermer
              </button>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <span className="font-body text-xs font-semibold uppercase tracking-[0.18em] mb-2 block" style={{ color: book.accentColor }}>
                  Guide gratuit
                </span>
                <h3 className="font-body font-bold text-white text-xl leading-snug mb-1">{book.title}</h3>
                <p className="font-body text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
                  Entrez votre email — nous vous l&apos;envoyons immédiatement.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="relative">
                  <User size={14} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "rgba(255,255,255,0.35)" }} />
                  <input
                    type="text"
                    placeholder="Votre prénom"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl font-body text-sm text-white placeholder-white/30 outline-none transition-all"
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)" }}
                    onFocus={(e) => (e.target.style.borderColor = `${book.accentColor}60`)}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.10)")}
                  />
                </div>
                <div className="relative">
                  <Mail size={14} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "rgba(255,255,255,0.35)" }} />
                  <input
                    type="email"
                    placeholder="Votre adresse email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl font-body text-sm text-white placeholder-white/30 outline-none transition-all"
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)" }}
                    onFocus={(e) => (e.target.style.borderColor = `${book.accentColor}60`)}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.10)")}
                  />
                </div>

                {state === "error" && (
                  <p className="font-body text-xs text-red-400">{errMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={state === "loading"}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-body font-bold text-sm transition-all hover:opacity-90 active:scale-[.98] disabled:opacity-60"
                  style={{ background: book.accentColor, color: book.accentColor === GOLD ? "#0C0B09" : "#fff" }}
                >
                  {state === "loading" ? (
                    <><Loader2 size={16} className="animate-spin" /> Envoi en cours…</>
                  ) : (
                    <><Download size={15} /> Recevoir le guide gratuitement</>
                  )}
                </button>
              </form>

              <p className="font-body text-[10px] text-center mt-4" style={{ color: "rgba(255,255,255,0.25)" }}>
                Aucun spam · Votre email reste confidentiel
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Book data ───────────────────────────────────────────────── */
const BOOKS = [
  {
    type: "artiste" as const,
    title: "Du Talent au Sommet",
    subtitle: "Guide de l'Artiste Africain Professionnel",
    tag: "Artistes & Musiciens",
    details: "47 modules · 239 pages · Édition 2026",
    description: "De l'identité artistique à la monétisation — tout ce qu'un artiste sénégalais doit maîtriser pour percer : branding, réseaux sociaux, distribution, droits BSDA, booking et bien plus.",
    chips: ["Branding", "TikTok & Instagram", "Distribution", "Droits d'auteur", "Monétisation"],
    coverGrad: "linear-gradient(145deg, #5B21B6 0%, #3B0764 55%, #1E0438 100%)",
    spineColor: "#2D0B52",
    accentColor: GOLD,
  },
  {
    type: "entreprise" as const,
    title: "Le Guide de l'Entrepreneur au Sénégal 2026",
    subtitle: "Stratégie & Communication pour PME Africaines",
    tag: "Entrepreneurs & PME",
    details: "38 modules · 195 pages · Édition 2026",
    description: "Communication digitale, identité visuelle, site web, réseaux sociaux et publicité — le guide complet pour les entrepreneurs sénégalais qui veulent se développer avec impact.",
    chips: ["Identité visuelle", "Site web", "Community management", "Publicité Meta/Google", "Stratégie"],
    coverGrad: "linear-gradient(145deg, #1C1409 0%, #2D1E04 45%, #3D2A06 75%, #1C1409 100%)",
    spineColor: "#1C1409",
    accentColor: GOLD,
  },
] as const;

/* ── Main section ────────────────────────────────────────────── */
export default function BooksDownload() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [modal, setModal]     = useState<(typeof BOOKS)[number] | null>(null);

  return (
    <>
      <section className="relative py-24 overflow-hidden" style={{ background: DARK }}>
        {/* Blobs */}
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[160px] opacity-[0.12]" style={{ background: "#7C3AED" }} />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full blur-[140px] opacity-[0.10]" style={{ background: GOLD }} />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <FadeIn direction="up" className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-body text-xs font-semibold uppercase tracking-[0.18em] mb-5"
              style={{ color: GOLD, border: "1px solid rgba(200,168,75,0.30)", background: "rgba(200,168,75,0.08)" }}>
              <BookOpen size={12} />
              Ressources exclusives · Téléchargement gratuit
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-white leading-tight mb-4">
              Deux guides pour <em className="not-italic" style={{ color: GOLD }}>accélérer</em><br className="hidden sm:block" /> votre succès
            </h2>
            <p className="font-body text-base max-w-lg mx-auto" style={{ color: "rgba(255,255,255,0.50)" }}>
              Des ressources complètes et gratuites, conçues pour le marché africain. Recevez-les directement dans votre boîte mail.
            </p>
          </FadeIn>

          {/* Books grid */}
          <FadeInStagger className="grid md:grid-cols-2 gap-6">
            {BOOKS.map((book) => (
              <FadeInItem key={book.type}>
                <div
                  className="relative rounded-2xl p-7 flex flex-col h-full"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(200,168,75,0.15)",
                    boxShadow: hovered === book.type ? "0 0 60px rgba(200,168,75,0.08)" : "none",
                    transition: "box-shadow 0.3s ease",
                  }}
                  onMouseEnter={() => setHovered(book.type)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {/* Book visual + info side by side */}
                  <div className="flex items-start gap-7 mb-6">
                    {/* 3D Book */}
                    <div className="shrink-0">
                      <Book3D
                        title={book.title}
                        subtitle={book.subtitle}
                        tag={book.tag}
                        details={book.details}
                        coverGrad={book.coverGrad}
                        spineColor={book.spineColor}
                        accentColor={book.accentColor}
                        hovered={hovered === book.type}
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0 pt-1">
                      <span className="inline-block font-body text-[10px] font-semibold uppercase tracking-[0.15em] px-2.5 py-1 rounded-full mb-3"
                        style={{ color: GOLD, background: "rgba(200,168,75,0.10)", border: "1px solid rgba(200,168,75,0.25)" }}>
                        {book.tag}
                      </span>
                      <h3 className="font-body font-bold text-white text-lg leading-snug mb-2">{book.title}</h3>
                      <p className="font-body text-xs mb-3" style={{ color: "rgba(255,255,255,0.35)" }}>{book.details}</p>
                      <p className="font-body text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                        {book.description}
                      </p>
                    </div>
                  </div>

                  {/* Topic chips */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {book.chips.map((chip) => (
                      <span key={chip} className="font-body text-[10px] px-2.5 py-1 rounded-full"
                        style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.45)", border: "1px solid rgba(255,255,255,0.08)" }}>
                        {chip}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <button
                    onClick={() => setModal(book)}
                    className="mt-auto w-full flex items-center justify-center gap-2.5 py-4 rounded-xl font-body font-bold text-sm transition-all duration-200 hover:opacity-90 active:scale-[.98]"
                    style={{ background: `linear-gradient(135deg, ${GOLD} 0%, #b8963d 100%)`, color: "#0C0B09", boxShadow: "0 4px 20px rgba(200,168,75,0.25)" }}
                  >
                    <Download size={15} />
                    Télécharger gratuitement
                  </button>
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>

          {/* Bottom note */}
          <FadeIn direction="up" delay={0.3} className="text-center mt-10">
            <p className="font-body text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
              📧 Livraison immédiate par email · Aucun spam · 100% gratuit
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Modal */}
      {modal && (
        <DownloadModal
          book={{ type: modal.type, title: modal.title, accentColor: modal.accentColor }}
          onClose={() => setModal(null)}
        />
      )}
    </>
  );
}
