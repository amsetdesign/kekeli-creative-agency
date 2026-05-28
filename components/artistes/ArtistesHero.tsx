"use client";

import { useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
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


export default function ArtistesHero() {
  const tr = useT();
  const a = tr.pages.artists;

  const floatingStats = [
    { value: "50+", label: a.heroStat1 },
    { value: "200+", label: a.heroStat2 },
    { value: "15+", label: a.heroStat3 },
  ];
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  const rawX = useMotionValue(0.5);
  const rawY = useMotionValue(0.5);
  const springX = useSpring(rawX, { stiffness: 35, damping: 22 });
  const springY = useSpring(rawY, { stiffness: 35, damping: 22 });

  const blobLeft = useTransform(springX, [0, 1], ["15%", "55%"]);
  const blobTop  = useTransform(springY, [0, 1], ["10%", "60%"]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (prefersReduced) return;
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      rawX.set((e.clientX - rect.left) / rect.width);
      rawY.set((e.clientY - rect.top) / rect.height);
    },
    [rawX, rawY, prefersReduced],
  );

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative h-screen flex items-center overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1600&h=900&q=80&auto=format&fit=crop"
          alt="Concert lights — KEKELI Creative Agency Artistes"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        {/* Cinematic overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(12,11,9,0.92) 0%, rgba(26,10,46,0.80) 50%, rgba(12,11,9,0.70) 100%)",
          }}
        />
      </div>

      {/* Animated blobs */}
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-[-5%] left-[-5%] w-96 h-96 rounded-full blur-[140px] opacity-25"
          style={{ background: "#8B5CF6" }}
        />
        <div
          className="absolute bottom-[-5%] right-[-5%] w-80 h-80 rounded-full blur-[120px] opacity-20"
          style={{ background: "#C8A84B" }}
        />
      </div>

      {/* Mouse-tracking blob */}
      <motion.div
        aria-hidden
        className="absolute pointer-events-none rounded-full blur-[120px] opacity-[0.15]"
        style={{
          width: 400,
          height: 400,
          background: "radial-gradient(circle, #8B5CF6 0%, #C8A84B 60%, transparent 80%)",
          left: blobLeft,
          top: blobTop,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl">
          {/* Animated badge */}
          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-gold/30 bg-gold/[0.08] font-body text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              <motion.span
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full bg-gold shrink-0"
              />
              {a.heroBadge}
            </span>
          </motion.div>

          {/* H1 */}
          <h1 className="font-display text-5xl sm:text-6xl lg:text-[4.75rem] mb-6 text-white">
            <LineReveal delay={0.12}>
              <span className="block">{a.heroLine1}</span>
            </LineReveal>
            <LineReveal delay={0.26}>
              <em className="block text-gold not-italic">{a.heroLine2}</em>
            </LineReveal>
            <LineReveal delay={0.4}>
              <span className="block">{a.heroLine3}</span>
            </LineReveal>
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.68 }}
            className="font-body text-lg text-white/60 leading-relaxed mb-8 max-w-xl"
          >
            {a.heroSub}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.85 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Button href="#direction" variant="dark" size="lg">
              {a.heroCta1}
            </Button>
            <Link
              href="#formulaire"
              className="group inline-flex items-center gap-2 border-2 border-gold text-gold px-7 py-[0.9rem] rounded-full font-body font-semibold text-base hover:bg-gold hover:text-black transition-all duration-200"
            >
              {a.heroCta2}
              <span className="text-[11px] font-normal text-gold/60 group-hover:text-black/50 transition-colors ml-0.5">
                {a.heroCta2sub}
              </span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Floating stats cards */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 1.0, ease }}
        className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4"
      >
        {floatingStats.map(({ value, label }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1.1 + i * 0.1, ease }}
            className="flex flex-col items-center justify-center w-24 h-24 rounded-2xl border border-gold/20 bg-black/40 backdrop-blur-md"
          >
            <p className="font-display text-2xl font-bold text-gold leading-none">{value}</p>
            <p className="font-body text-[10px] text-white/50 mt-1 uppercase tracking-wider">{label}</p>
          </motion.div>
        ))}
      </motion.div>

    </section>
  );
}
