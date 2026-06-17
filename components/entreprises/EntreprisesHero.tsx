"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { useT } from "@/hooks/useT";

export default function EntreprisesHero() {
  const tr = useT();
  const c = tr.pages.companies;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section ref={ref} className="relative min-h-[92vh] flex items-center overflow-hidden bg-[#050A14]">
      {/* Gradient blobs */}
      <motion.div style={{ y }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[10%] w-[600px] h-[600px] rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #C8A84B 0%, transparent 70%)", filter: "blur(80px)" }} />
        <div className="absolute bottom-[0%] right-[5%] w-[500px] h-[500px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #C8A84B 0%, transparent 70%)", filter: "blur(80px)" }} />
        <div className="absolute top-[40%] left-[50%] w-[400px] h-[400px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #C8A84B 0%, transparent 70%)", filter: "blur(80px)" }} />
      </motion.div>

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-body font-semibold uppercase tracking-[0.2em] mb-8"
              style={{ color: "#C8A84B", border: "1px solid rgba(200,168,75,0.30)", background: "rgba(200,168,75,0.08)" }}>
              <Sparkles size={10} />
              {c.heroBadge}
            </span>
          </motion.div>

          {/* Title */}
          <div className="overflow-hidden mb-2">
            <motion.h1
              initial={{ y: "100%" }} animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.05]"
            >
              {c.heroLine1}
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-6">
            <motion.h1
              initial={{ y: "100%" }} animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.05]"
              style={{ color: "#C8A84B" }}
            >
              {c.heroLine2}
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="font-body text-lg text-white/55 max-w-xl mb-10 leading-relaxed"
          >
            {c.heroSub}
          </motion.p>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="flex flex-wrap gap-8 mb-12"
          >
            {[
              { value: "50+", label: c.heroStat1 },
              { value: "3×", label: c.heroStat2 },
              { value: "24h", label: c.heroStat3 },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="font-display text-3xl text-white font-bold">{value}</p>
                <p className="font-body text-xs text-white/40 mt-0.5">{label}</p>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-body font-semibold text-sm text-black transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg, #C8A84B, #D4A83A)" }}
            >
              {c.heroCta1} <ArrowRight size={16} />
            </Link>
            <Link
              href="#services"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-body font-semibold text-sm text-white/70 border border-white/15 hover:border-white/30 hover:text-white transition-all duration-200"
            >
              {c.heroCta2}
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to top, #F7F4EE, transparent)" }} />
    </section>
  );
}
