"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Mail, User, Download, CheckCircle, Loader2, BookOpen } from "lucide-react";
import FadeIn, { FadeInStagger, FadeInItem } from "@/components/animations/FadeIn";

const GOLD = "#C8A84B";
const DARK = "#0C0B09";

/* ── Book image with hover effect ───────────────────────────── */
function BookCover({
  src,
  alt,
  hovered,
}: {
  src: string;
  alt: string;
  hovered: boolean;
}) {
  return (
    <div
      style={{
        width: 180,
        position: "relative",
        transform: hovered ? "translateY(-8px) scale(1.03)" : "translateY(0) scale(1)",
        transition: "transform 0.45s cubic-bezier(0.22,1,0.36,1)",
        filter: hovered ? "drop-shadow(0 24px 40px rgba(0,0,0,0.7))" : "drop-shadow(0 12px 24px rgba(0,0,0,0.5))",
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={180}
        height={254}
        className="rounded-lg object-cover w-full"
        style={{ aspectRatio: "9/13" }}
      />
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
    image: "/images/book-artiste.jpg",
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
    image: "/images/book-entrepreneur.png",
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
                    {/* Book cover image */}
                    <div className="shrink-0">
                      <BookCover
                        src={book.image}
                        alt={book.title}
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
