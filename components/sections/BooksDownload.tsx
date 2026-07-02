"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Mail, User, ShoppingCart, Loader2, BookOpen, Lock } from "lucide-react";
import FadeIn, { FadeInStagger, FadeInItem } from "@/components/animations/FadeIn";

const GOLD = "#C8A84B";
const DARK = "#0C0B09";

/* ── Book cover ──────────────────────────────────────────────── */
function BookCover({ src, alt, hovered }: { src: string; alt: string; hovered: boolean }) {
  return (
    <div
      style={{
        width: 180,
        position: "relative",
        transform: hovered ? "translateY(-8px) scale(1.03)" : "translateY(0) scale(1)",
        transition: "transform 0.45s cubic-bezier(0.22,1,0.36,1)",
        filter: hovered
          ? "drop-shadow(0 24px 40px rgba(0,0,0,0.7))"
          : "drop-shadow(0 12px 24px rgba(0,0,0,0.5))",
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

/* ── Purchase modal (PayTech) ────────────────────────────────── */
type ModalState = "idle" | "loading" | "error";

function PurchaseModal({
  book,
  onClose,
}: {
  book: { type: "artiste" | "entreprise"; title: string; price: string; accentColor: string };
  onClose: () => void;
}) {
  const [name, setName]     = useState("");
  const [email, setEmail]   = useState("");
  const [state, setState]   = useState<ModalState>("idle");
  const [errMsg, setErrMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setState("loading");
    setErrMsg("");
    try {
      const res = await fetch("/api/guide/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, type: book.type }),
      });
      const data = await res.json();
      if (!res.ok || !data.redirect_url) {
        throw new Error(data.error ?? "Erreur serveur.");
      }
      // Redirect to PayTech payment page
      window.location.href = data.redirect_url;
    } catch (err) {
      setState("error");
      setErrMsg(err instanceof Error ? err.message : "Erreur. Réessayez.");
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.80)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="relative w-full max-w-md rounded-3xl overflow-hidden"
        style={{
          background: "#111009",
          border: "1px solid rgba(200,168,75,0.20)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.7)",
        }}
      >
        <div style={{ height: 3, background: `linear-gradient(90deg, ${book.accentColor} 0%, transparent 100%)` }} />

        <div className="p-8">
          <button onClick={onClose} className="absolute top-5 right-5 text-white/40 hover:text-white transition-colors">
            <X size={18} />
          </button>

          {/* Price + title */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="font-body text-2xl font-bold" style={{ color: GOLD }}>{book.price}</span>
              <span
                className="inline-flex items-center gap-1.5 font-body text-xs px-2.5 py-1 rounded-full"
                style={{ background: "rgba(200,168,75,0.12)", color: GOLD, border: "1px solid rgba(200,168,75,0.25)" }}
              >
                <Lock size={9} /> Paiement sécurisé
              </span>
            </div>
            <h3 className="font-body font-bold text-white text-lg leading-snug mb-1">{book.title}</h3>
            <p className="font-body text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
              Entrez vos informations — vous serez redirigé vers PayTech pour payer en toute sécurité.
            </p>
          </div>

          {/* Payment methods */}
          <div
            className="flex flex-wrap items-center gap-2 px-4 py-3 rounded-xl mb-5"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <span className="font-body text-xs" style={{ color: "rgba(255,255,255,0.40)" }}>Paiement via :</span>
            {["Wave", "Orange Money", "Carte bancaire", "PayPal"].map((m) => (
              <span
                key={m}
                className="font-body text-[10px] font-semibold px-2 py-0.5 rounded"
                style={{ background: "rgba(200,168,75,0.10)", color: GOLD }}
              >
                {m}
              </span>
            ))}
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
              style={{ background: GOLD, color: "#0C0B09", boxShadow: "0 4px 20px rgba(200,168,75,0.30)" }}
            >
              {state === "loading" ? (
                <><Loader2 size={16} className="animate-spin" /> Redirection vers PayTech…</>
              ) : (
                <><ShoppingCart size={15} /> Payer {book.price} avec PayTech</>
              )}
            </button>
          </form>

          <p className="font-body text-[10px] text-center mt-4" style={{ color: "rgba(255,255,255,0.25)" }}>
            Paiement 100% sécurisé · Guide envoyé par email après confirmation
          </p>
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
    price: "5 000 F CFA",
    description:
      "De l'identité artistique à la monétisation — tout ce qu'un artiste sénégalais doit maîtriser pour percer : branding, réseaux sociaux, distribution, droits BSDA, booking et bien plus.",
    chips: ["Branding", "TikTok & Instagram", "Distribution", "Droits d'auteur", "Monétisation"],
    image: "/images/Du talent au sommet.png",
    accentColor: GOLD,
  },
  {
    type: "entreprise" as const,
    title: "Le Guide de l'Entrepreneur au Sénégal 2026",
    subtitle: "Stratégie & Communication pour PME Africaines",
    tag: "Entrepreneurs & PME",
    details: "38 modules · 195 pages · Édition 2026",
    price: "5 000 F CFA",
    description:
      "Communication digitale, identité visuelle, site web, réseaux sociaux et publicité — le guide complet pour les entrepreneurs sénégalais qui veulent se développer avec impact.",
    chips: ["Identité visuelle", "Site web", "Community management", "Publicité Meta/Google", "Stratégie"],
    image: "/images/guide de l'entrpreneur au Senegal 2026.png",
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
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-body text-xs font-semibold uppercase tracking-[0.18em] mb-5"
              style={{ color: GOLD, border: "1px solid rgba(200,168,75,0.30)", background: "rgba(200,168,75,0.08)" }}
            >
              <BookOpen size={12} />
              Ressources exclusives · 5 000 F CFA
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-white leading-tight mb-4">
              Deux guides pour <em className="not-italic" style={{ color: GOLD }}>accélérer</em>
              <br className="hidden sm:block" /> votre succès
            </h2>
            <p className="font-body text-base max-w-lg mx-auto" style={{ color: "rgba(255,255,255,0.50)" }}>
              Des ressources complètes conçues pour le marché africain. Paiement simple via Wave ou Orange Money.
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
                  {/* Price tag */}
                  <div className="absolute top-5 right-5">
                    <span
                      className="font-body text-sm font-bold px-3 py-1 rounded-full"
                      style={{ background: "rgba(200,168,75,0.15)", color: GOLD, border: "1px solid rgba(200,168,75,0.30)" }}
                    >
                      {book.price}
                    </span>
                  </div>

                  {/* Book visual + info */}
                  <div className="flex items-start gap-7 mb-6">
                    <div className="shrink-0">
                      <BookCover src={book.image} alt={book.title} hovered={hovered === book.type} />
                    </div>
                    <div className="flex-1 min-w-0 pt-1">
                      <span
                        className="inline-block font-body text-[10px] font-semibold uppercase tracking-[0.15em] px-2.5 py-1 rounded-full mb-3"
                        style={{ color: GOLD, background: "rgba(200,168,75,0.10)", border: "1px solid rgba(200,168,75,0.25)" }}
                      >
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
                      <span
                        key={chip}
                        className="font-body text-[10px] px-2.5 py-1 rounded-full"
                        style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.45)", border: "1px solid rgba(255,255,255,0.08)" }}
                      >
                        {chip}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <button
                    onClick={() => setModal(book)}
                    className="mt-auto w-full flex items-center justify-center gap-2.5 py-4 rounded-xl font-body font-bold text-sm transition-all duration-200 hover:opacity-90 active:scale-[.98]"
                    style={{
                      background: `linear-gradient(135deg, ${GOLD} 0%, #b8963d 100%)`,
                      color: "#0C0B09",
                      boxShadow: "0 4px 20px rgba(200,168,75,0.25)",
                    }}
                  >
                    <ShoppingCart size={15} />
                    Acheter — {book.price}
                  </button>
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>

          {/* Bottom note */}
          <FadeIn direction="up" delay={0.3} className="text-center mt-10">
            <p className="font-body text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
              💳 Wave · Orange Money · PayPal · Virement · Livraison par email après paiement
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Modal */}
      {modal && (
        <PurchaseModal
          book={{ type: modal.type, title: modal.title, price: modal.price, accentColor: modal.accentColor }}
          onClose={() => setModal(null)}
        />
      )}
    </>
  );
}
