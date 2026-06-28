"use client";

import { useRef, useCallback } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { MessageCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import { useT } from "@/hooks/useT";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

function LineReveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <div className="overflow-hidden leading-[1.1]">
      <motion.div
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.85, delay, ease }}
      >
        {children}
      </motion.div>
    </div>
  );
}


export default function Hero() {
  const tr = useT();
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  const rawY = useMotionValue(0.5);
  const springY = useSpring(rawY, { stiffness: 35, damping: 22 });
  const cardY   = useTransform(springY, [0, 1], ["-8px", "8px"]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (prefersReduced) return;
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      rawY.set((e.clientY - rect.top) / rect.height);
    },
    [rawY, prefersReduced]
  );

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] flex items-center overflow-hidden"
    >
      {/* ── Full-bleed concert background ───────────────── */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1600&h=900&q=80&auto=format&fit=crop"
          alt="Concert — KEKELI Creative Agency"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        {/* Main cinematic dark overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(8,6,18,0.96) 0%, rgba(20,8,45,0.88) 30%, rgba(30,10,60,0.78) 55%, rgba(12,8,25,0.82) 100%)",
          }}
        />
        {/* Left-side extra darkening so text is always readable */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to right, rgba(6,4,14,0.60) 0%, rgba(6,4,14,0.20) 45%, transparent 70%)",
          }}
        />
      </div>

      {/* ── Lignes diagonales ──────────────────────────── */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 50px)",
        }}
      />

      {/* ── Étoiles filantes ────────────────────────────── */}
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { top: "8%",  left: "65%", delay: 3,  dur: 1.1, pause: 20 },
          { top: "12%", left: "82%", delay: 11, dur: 0.9, pause: 25 },
          { top: "4%",  left: "50%", delay: 19, dur: 1.2, pause: 22 },
          { top: "6%",  left: "92%", delay: 27, dur: 1.0, pause: 28 },
        ].map((s, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              top: s.top,
              left: s.left,
              width: 110,
              height: 1.5,
              background: "linear-gradient(to right, transparent, rgba(255,255,255,0.85), rgba(200,168,75,0.4))",
              borderRadius: 2,
              rotate: 215,
            }}
            animate={{ x: [0, -360], y: [0, 230], opacity: [0, 1, 1, 0] }}
            transition={{
              duration: s.dur,
              delay: s.delay,
              repeat: Infinity,
              repeatDelay: s.pause,
              ease: "easeIn",
            }}
          />
        ))}
      </div>

      {/* ── Particules flottantes ───────────────────────── */}
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { w: 4, h: 4, top: "15%", left: "12%", dur: 8,  delay: 0,   col: "#C8A84B" },
          { w: 3, h: 3, top: "30%", left: "25%", dur: 11, delay: 1,   col: "#8B5CF6" },
          { w: 5, h: 5, top: "60%", left: "8%",  dur: 9,  delay: 2,   col: "#ffffff" },
          { w: 3, h: 3, top: "75%", left: "35%", dur: 13, delay: 0.5, col: "#C8A84B" },
          { w: 4, h: 4, top: "20%", left: "55%", dur: 10, delay: 3,   col: "#8B5CF6" },
          { w: 3, h: 3, top: "50%", left: "70%", dur: 14, delay: 1.5, col: "#ffffff" },
          { w: 5, h: 5, top: "85%", left: "60%", dur: 7,  delay: 4,   col: "#C8A84B" },
          { w: 3, h: 3, top: "10%", left: "80%", dur: 12, delay: 2.5, col: "#8B5CF6" },
          { w: 4, h: 4, top: "45%", left: "90%", dur: 9,  delay: 5,   col: "#ffffff" },
          { w: 3, h: 3, top: "68%", left: "48%", dur: 15, delay: 0,   col: "#C8A84B" },
          { w: 4, h: 4, top: "40%", left: "18%", dur: 10, delay: 6,   col: "#ffffff" },
          { w: 3, h: 3, top: "88%", left: "82%", dur: 11, delay: 3.5, col: "#8B5CF6" },
        ].map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{ width: p.w, height: p.h, top: p.top, left: p.left, background: p.col }}
            animate={{
              y: [0, -24, -8, 0],
              x: [0, 6, -4, 0],
              opacity: [0.9, 0.5, 0.8, 0.9],
            }}
            transition={{ duration: p.dur, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
          />
        ))}
      </div>

      {/* ── Portrait card — desktop right side ──────────── */}
      <motion.div
        style={prefersReduced ? {} : { y: cardY }}
        initial={{ opacity: 0, x: 50, scale: 0.97 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 1, delay: 0.4, ease }}
        className="absolute right-12 xl:right-20 top-1/2 -translate-y-1/2 hidden lg:block w-[300px] xl:w-[340px] h-[72%]"
      >
        <div
          className="relative w-full h-full rounded-3xl overflow-hidden"
          style={{
            boxShadow: "0 32px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(200,168,75,0.12)",
          }}
        >
          <Image
            src="/images/hero-portrait.jpg"
            alt="Femme professionnelle africaine — KEKELI Creative Agency"
            fill
            className="object-cover object-top"
            priority
            sizes="340px"
          />
          {/* Bottom fade into dark */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to top, rgba(8,4,20,0.80) 0%, rgba(8,4,20,0.20) 35%, transparent 60%)",
            }}
          />
          {/* Subtle violet tint */}
          <div
            className="absolute inset-0 rounded-3xl"
            style={{ background: "rgba(80,20,160,0.18)" }}
          />
        </div>

        {/* Floating project card — bottom */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 1.2, ease }}
          className="absolute -bottom-3 -left-5 bg-white/[0.07] backdrop-blur-xl rounded-2xl p-4 border border-white/10 z-20"
          style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.40)" }}
        >
          <p className="font-body text-[9px] uppercase tracking-[0.2em] text-white/40 mb-0.5">
            {tr.hero.recentWork}
          </p>
          <p className="font-body text-[0.9rem] font-semibold text-white leading-snug">
            Sunu Impact Festival
          </p>
          <p className="font-body text-[11px] text-gold mt-0.5">
            sunuimpactfestival.com →
          </p>
        </motion.div>

        {/* Floating badge — top */}
        <motion.div
          initial={{ opacity: 0, scale: 0, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 240, damping: 18, delay: 1.3 }}
          className="absolute -top-3 -right-4 bg-gold rounded-2xl py-3 px-4 text-center z-20"
          style={{ boxShadow: "0 8px_28px rgba(200,168,75,0.45)" }}
        >
          <p className="font-body text-[1.6rem] font-bold text-black leading-none">50+</p>
          <p className="font-body text-[9px] font-semibold uppercase tracking-wide text-black/60 mt-0.5">
            {tr.hero.projects}
          </p>
        </motion.div>
      </motion.div>

      {/* ── Content ─────────────────────────────────────── */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="lg:max-w-[52%]">

          {/* Animated badge */}
          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-gold/25 bg-gold/[0.06] font-body text-xs font-semibold uppercase tracking-[0.14em] text-gold">
              <motion.span
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full bg-gold shrink-0"
              />
              {tr.hero.badge}
            </span>
          </motion.div>

          {/* H1 */}
          <h1 className="font-body font-bold text-5xl sm:text-6xl lg:text-[4rem] leading-[1.08] mb-6">
            <LineReveal delay={0.12}>
              <span className="block text-white">{tr.hero.line1}</span>
            </LineReveal>
            <LineReveal delay={0.26}>
              <span className="block text-gold">{tr.hero.line2}</span>
            </LineReveal>
            <LineReveal delay={0.4}>
              <span className="block text-white">{tr.hero.line3}</span>
            </LineReveal>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.68 }}
            className="font-body text-lg leading-relaxed mb-5 max-w-lg"
            style={{ color: "rgba(220,210,255,0.70)" }}
          >
            {tr.hero.subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.90 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Button href="/services" variant="gold" size="lg">
              {tr.hero.discoverServices}
            </Button>
            <button
              onClick={() => typeof window !== "undefined" && window.dispatchEvent(new CustomEvent("keli:open-chat"))}
              className="inline-flex items-center gap-2 border-2 border-white/30 text-white/85 px-7 py-[0.9rem] rounded-full font-body font-semibold text-base hover:border-gold hover:text-gold transition-all duration-200"
            >
              <MessageCircle size={16} className="shrink-0" />
              {tr.hero.chatKeli}
            </button>
          </motion.div>

          {/* Mobile image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="lg:hidden mt-10 relative aspect-[4/3] rounded-3xl overflow-hidden"
            style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.50)" }}
          >
            <Image
              src="/images/hero-portrait.jpg"
              alt="Femme professionnelle africaine — KEKELI Creative Agency"
              fill
              className="object-cover"
              priority
            />
            <div
              className="absolute inset-0"
              style={{ background: "rgba(50,15,90,0.30)" }}
            />
          </motion.div>
        </div>
      </div>

      {/* ── Scroll indicator ────────────────────────────── */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="font-body text-[9px] uppercase tracking-[0.25em] text-white/30">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0], opacity: [0.35, 0.85, 0.35] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-white/50 to-transparent"
        />
      </motion.div>

    </section>
  );
}
