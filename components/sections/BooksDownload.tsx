"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Mail, User, ShoppingCart, Loader2, BookOpen, Lock, Eye, CheckCircle2 } from "lucide-react";
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

/* ── Preview modal ───────────────────────────────────────────── */
function PreviewModal({
  book,
  onBuy,
  onClose,
}: {
  book: (typeof BOOKS)[number];
  onBuy: () => void;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.82)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="relative w-full max-w-2xl rounded-3xl overflow-hidden flex flex-col"
        style={{
          background: "#111009",
          border: "1px solid rgba(200,168,75,0.20)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.8)",
          maxHeight: "90vh",
        }}
      >
        {/* Top accent */}
        <div style={{ height: 3, background: `linear-gradient(90deg, ${GOLD}, transparent)`, flexShrink: 0 }} />

        {/* Header */}
        <div className="flex items-start gap-5 p-6 pb-0" style={{ flexShrink: 0 }}>
          <div className="shrink-0 hidden sm:block">
            <Image
              src={book.image}
              alt={book.title}
              width={90}
              height={127}
              className="rounded-lg object-cover"
              style={{ filter: "drop-shadow(0 8px 20px rgba(0,0,0,0.6))" }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <span
              className="inline-block font-body text-[9px] font-bold uppercase tracking-[0.18em] px-2 py-0.5 rounded-full mb-2"
              style={{ color: GOLD, background: "rgba(200,168,75,0.10)", border: "1px solid rgba(200,168,75,0.22)" }}
            >
              {book.tag}
            </span>
            <h2 className="font-display text-xl text-white font-bold leading-snug mb-1">{book.title}</h2>
            <p className="font-body text-xs mb-2" style={{ color: "rgba(255,255,255,0.35)" }}>{book.details}</p>
            <p className="font-body text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.58)" }}>
              {book.description}
            </p>
          </div>
          <button onClick={onClose} className="shrink-0 text-white/30 hover:text-white/70 transition-colors mt-0.5">
            <X size={18} />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto px-6 py-5 flex-1">
          <p className="font-body text-xs font-bold uppercase tracking-[0.16em] mb-3" style={{ color: "rgba(255,255,255,0.30)" }}>
            Ce que vous apprendrez
          </p>
          <div className="grid sm:grid-cols-2 gap-2">
            {book.chapters.map((ch) => (
              <div key={ch} className="flex items-start gap-2.5">
                <CheckCircle2 size={13} className="shrink-0 mt-0.5" style={{ color: GOLD }} />
                <span className="font-body text-sm leading-snug" style={{ color: "rgba(255,255,255,0.65)" }}>{ch}</span>
              </div>
            ))}
          </div>

          {/* Key stats */}
          <div className="grid grid-cols-3 gap-3 mt-6">
            {book.stats.map(({ label, value }) => (
              <div
                key={label}
                className="rounded-xl px-3 py-3 text-center"
                style={{ background: "rgba(200,168,75,0.07)", border: "1px solid rgba(200,168,75,0.15)" }}
              >
                <p className="font-body text-lg font-bold" style={{ color: GOLD }}>{value}</p>
                <p className="font-body text-[10px]" style={{ color: "rgba(255,255,255,0.40)" }}>{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <div
          className="px-6 py-4 flex items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)", flexShrink: 0 }}
        >
          <div>
            <p className="font-body text-xl font-bold" style={{ color: GOLD }}>{book.price}</p>
            <p className="font-body text-[10px]" style={{ color: "rgba(255,255,255,0.30)" }}>Wave · Orange Money · PayPal</p>
          </div>
          <button
            onClick={onBuy}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-body font-bold text-sm transition-all hover:opacity-90 active:scale-[.98]"
            style={{ background: `linear-gradient(135deg, ${GOLD} 0%, #b8963d 100%)`, color: "#0C0B09", boxShadow: "0 4px 16px rgba(200,168,75,0.30)" }}
          >
            <ShoppingCart size={14} />
            Acheter — {book.price}
          </button>
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
    chapters: [
      "Construire une identité artistique forte",
      "Maîtriser TikTok, Instagram & YouTube",
      "Distribuer sa musique à l'international",
      "Monétiser : streaming, live, licensing",
      "Droits d'auteur & inscription à la BSDA",
      "Booking, management & contrats",
      "Stratégie de presse & médias",
      "Plan de carrière sur 12 mois",
    ],
    stats: [
      { label: "Modules", value: "47" },
      { label: "Pages", value: "239" },
      { label: "Édition", value: "2026" },
    ],
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
    image: "/images/le guide de l'entrpreneur au Senegal 2026.png",
    accentColor: GOLD,
    chapters: [
      "Créer une identité visuelle professionnelle",
      "Construire un site web qui convertit",
      "Community management & stratégie de contenu",
      "Publicité Facebook & Instagram (Meta Ads)",
      "Google Ads & référencement local",
      "Email marketing & fidélisation client",
      "E-commerce & vente en ligne au Sénégal",
      "Mesurer et optimiser ses performances",
    ],
    stats: [
      { label: "Modules", value: "38" },
      { label: "Pages", value: "195" },
      { label: "Édition", value: "2026" },
    ],
  },
] as const;

/* ── Main section ────────────────────────────────────────────── */
export default function BooksDownload() {
  const [hovered,  setHovered]  = useState<string | null>(null);
  const [preview,  setPreview]  = useState<(typeof BOOKS)[number] | null>(null);
  const [modal,    setModal]    = useState<(typeof BOOKS)[number] | null>(null);

  return (
    <>
      <section className="relative py-16 overflow-hidden" style={{ background: DARK }}>
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[160px] opacity-[0.10]" style={{ background: "#7C3AED" }} />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full blur-[140px] opacity-[0.08]" style={{ background: GOLD }} />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header compact */}
          <FadeIn direction="up" className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8">
            <div>
              <span
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full font-body text-xs font-semibold uppercase tracking-[0.16em] mb-3"
                style={{ color: GOLD, border: "1px solid rgba(200,168,75,0.30)", background: "rgba(200,168,75,0.08)" }}
              >
                <BookOpen size={11} />
                Guides exclusifs
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-white leading-tight">
                Deux guides pour <em className="not-italic" style={{ color: GOLD }}>accélérer</em> votre succès
              </h2>
            </div>
            <p className="font-body text-sm shrink-0" style={{ color: "rgba(255,255,255,0.40)" }}>
              Wave · Orange Money · PayPal
            </p>
          </FadeIn>

          {/* Books — horizontal cards */}
          <FadeInStagger className="grid md:grid-cols-2 gap-5">
            {BOOKS.map((book) => (
              <FadeInItem key={book.type}>
                <div
                  className="rounded-2xl p-5 flex gap-5 h-full"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: `1px solid ${hovered === book.type ? "rgba(200,168,75,0.35)" : "rgba(200,168,75,0.12)"}`,
                    transition: "border-color 0.3s ease",
                  }}
                  onMouseEnter={() => setHovered(book.type)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {/* Cover */}
                  <div className="shrink-0">
                    <BookCover src={book.image} alt={book.title} hovered={hovered === book.type} />
                  </div>

                  {/* Info */}
                  <div className="flex flex-col flex-1 min-w-0">
                    {/* Tag + price */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span
                        className="font-body text-[9px] font-bold uppercase tracking-[0.16em] px-2 py-0.5 rounded-full"
                        style={{ color: GOLD, background: "rgba(200,168,75,0.10)", border: "1px solid rgba(200,168,75,0.22)" }}
                      >
                        {book.tag}
                      </span>
                      <span className="font-body text-base font-bold shrink-0" style={{ color: GOLD }}>
                        {book.price}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-body font-bold text-white text-base leading-snug mb-1">{book.title}</h3>
                    <p className="font-body text-[11px] mb-3" style={{ color: "rgba(255,255,255,0.30)" }}>{book.details}</p>

                    {/* Chips */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {book.chips.slice(0, 3).map((chip) => (
                        <span
                          key={chip}
                          className="font-body text-[9px] px-2 py-0.5 rounded-full"
                          style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.40)", border: "1px solid rgba(255,255,255,0.07)" }}
                        >
                          {chip}
                        </span>
                      ))}
                    </div>

                    {/* CTAs */}
                    <div className="mt-auto flex gap-2">
                      <button
                        onClick={() => setPreview(book)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl font-body font-semibold text-xs transition-all hover:bg-white/10"
                        style={{ border: "1px solid rgba(200,168,75,0.30)", color: GOLD }}
                      >
                        <Eye size={13} />
                        Aperçu
                      </button>
                      <button
                        onClick={() => setModal(book)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl font-body font-bold text-xs transition-all hover:opacity-90 active:scale-[.98]"
                        style={{
                          background: `linear-gradient(135deg, ${GOLD} 0%, #b8963d 100%)`,
                          color: "#0C0B09",
                          boxShadow: "0 4px 14px rgba(200,168,75,0.22)",
                        }}
                      >
                        <ShoppingCart size={13} />
                        Acheter
                      </button>
                    </div>
                  </div>
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>

          <FadeIn direction="up" delay={0.2} className="text-center mt-6">
            <p className="font-body text-[11px]" style={{ color: "rgba(255,255,255,0.22)" }}>
              Paiement sécurisé · Guide PDF envoyé par email après confirmation
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Preview modal */}
      {preview && (
        <PreviewModal
          book={preview}
          onBuy={() => { setModal(preview); setPreview(null); }}
          onClose={() => setPreview(null)}
        />
      )}

      {/* Purchase modal */}
      {modal && (
        <PurchaseModal
          book={{ type: modal.type, title: modal.title, price: modal.price, accentColor: modal.accentColor }}
          onClose={() => setModal(null)}
        />
      )}
    </>
  );
}
