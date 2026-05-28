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
import { MessageCircle, Sparkles } from "lucide-react";
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

  const rawX = useMotionValue(0.5);
  const rawY = useMotionValue(0.5);
  const springX = useSpring(rawX, { stiffness: 35, damping: 22 });
  const springY = useSpring(rawY, { stiffness: 35, damping: 22 });

  const blobLeft = useTransform(springX, [0, 1], ["20%", "60%"]);
  const blobTop  = useTransform(springY, [0, 1], ["15%", "65%"]);
  const cardY    = useTransform(springY, [0, 1], ["-8px", "8px"]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (prefersReduced) return;
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      rawX.set((e.clientX - rect.left) / rect.width);
      rawY.set((e.clientY - rect.top)  / rect.height);
    },
    [rawX, rawY, prefersReduced]
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

      {/* ── Decorative blobs ────────────────────────────── */}
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-[-5%] left-[-5%] w-96 h-96 rounded-full blur-[140px] opacity-20"
          style={{ background: "#8B5CF6" }}
        />
        <div
          className="absolute bottom-[-5%] left-[30%] w-72 h-72 rounded-full blur-[120px] opacity-12"
          style={{ background: "#C8A84B" }}
        />
      </div>

      {/* Mouse-tracking blob */}
      <motion.div
        aria-hidden
        className="absolute pointer-events-none rounded-full blur-[130px] opacity-[0.14]"
        style={{
          width: 420,
          height: 420,
          background: "radial-gradient(circle, #8B5CF6 0%, #C8A84B 55%, transparent 75%)",
          left: blobLeft,
          top: blobTop,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

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

          {/* Nudge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.78 }}
            className="mb-8"
          >
            <button
              onClick={() => typeof window !== "undefined" && window.dispatchEvent(new CustomEvent("keli:open-chat"))}
              className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full font-body text-sm transition-all hover:brightness-110 active:scale-95"
              style={{ background: "rgba(200,168,75,0.10)", border: "1px solid rgba(200,168,75,0.28)", color: "rgba(220,210,255,0.75)" }}
            >
              <Sparkles size={13} style={{ color: "#C8A84B", flexShrink: 0 }} />
              {tr.hero.nudge}
              <span className="font-semibold" style={{ color: "#C8A84B" }}>{tr.hero.nudgeCta}</span>
            </button>
          </motion.div>

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

    </section>
  );
}
