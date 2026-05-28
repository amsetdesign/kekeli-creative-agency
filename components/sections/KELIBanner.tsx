"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, MessageCircle, Zap, ArrowRight } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import { useT } from "@/hooks/useT";

export default function KELIBanner() {
  const tr = useT();

  const bubbles = [
    { text: tr.keli.bubble1, delay: 0 },
    { text: tr.keli.bubble2, delay: 0.15 },
    { text: tr.keli.bubble3, delay: 0.3 },
  ];

  return (
    <section
      className="relative py-16 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0C0B09 0%, #1A0A2E 55%, #0D1B2E 100%)",
      }}
    >
      {/* Background blobs */}
      <div
        className="absolute top-0 left-1/3 w-72 h-72 rounded-full blur-[90px] opacity-25 pointer-events-none"
        style={{ background: "#8B5CF6" }}
      />
      <div
        className="absolute bottom-0 right-1/3 w-60 h-60 rounded-full blur-[70px] opacity-20 pointer-events-none"
        style={{ background: "#4C9BFF" }}
      />
      <div
        className="absolute top-1/2 -translate-y-1/2 right-8 w-48 h-48 rounded-full blur-[60px] opacity-15 pointer-events-none"
        style={{ background: "#C8A84B" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn direction="up">
          <div className="flex flex-col lg:flex-row items-center gap-8">

                {/* Left — icon + text */}
                <div className="flex items-start gap-6 flex-1">
                  {/* Pulsing icon */}
                  <div className="relative shrink-0">
                    <motion.div
                      animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0.0, 0.4] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
                      className="absolute inset-0 rounded-2xl"
                      style={{ background: "rgba(200,168,75,0.4)" }}
                    />
                    <div
                      className="relative w-16 h-16 rounded-2xl flex items-center justify-center"
                      style={{ background: "linear-gradient(135deg, #C8A84B 0%, #F59E0B 100%)" }}
                    >
                      <Sparkles size={30} color="black" />
                    </div>
                  </div>

                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3" style={{ background: "rgba(200,168,75,0.12)", border: "1px solid rgba(200,168,75,0.3)" }}>
                      <Zap size={11} style={{ color: "#C8A84B" }} />
                      <span className="font-body text-[10px] font-bold uppercase tracking-widest" style={{ color: "#C8A84B" }}>
                        {tr.keli.badge}
                      </span>
                    </div>

                    <h2 className="font-display text-3xl md:text-4xl text-white mb-2 leading-snug">
                      {tr.keli.title1}{" "}
                      <em className="not-italic" style={{ color: "#C8A84B" }}>{tr.keli.titleHighlight}</em>
                      {" "}{tr.keli.title2}
                    </h2>
                    <p className="font-body text-base leading-relaxed max-w-md" style={{ color: "rgba(255,255,255,0.55)" }}>
                      {tr.keli.subtitle}
                    </p>

                    {/* Chat bubbles preview */}
                    <div className="flex flex-wrap gap-2 mt-5">
                      {bubbles.map(({ text, delay }) => (
                        <motion.span
                          key={text}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 + delay, duration: 0.4 }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-body text-xs"
                          style={{
                            background: "rgba(255,255,255,0.07)",
                            border: "1px solid rgba(255,255,255,0.12)",
                            color: "rgba(255,255,255,0.7)",
                          }}
                        >
                          <MessageCircle size={10} style={{ color: "#C8A84B" }} />
                          {text}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right — CTAs */}
                <div className="shrink-0 flex flex-col items-center gap-3 lg:items-end">
                  <Link href="/espace-client">
                    <motion.div
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex items-center gap-2.5 px-7 py-4 rounded-2xl font-body font-bold text-base text-black cursor-pointer"
                      style={{ background: "linear-gradient(135deg, #C8A84B 0%, #F59E0B 100%)", boxShadow: "0 8px 30px rgba(200,168,75,0.4)" }}
                    >
                      <MessageCircle size={18} />
                      {tr.keli.cta}
                      <ArrowRight size={16} />
                    </motion.div>
                  </Link>
                  <p className="font-body text-[11px]" style={{ color: "rgba(255,255,255,0.3)" }}>
                    {tr.keli.noAccount}{" "}
                    <Link href="/espace-client/inscription" className="underline hover:text-white/50 transition-colors">
                      {tr.keli.signup}
                    </Link>
                  </p>
                </div>

          </div>
        </FadeIn>
      </div>
    </section>
  );
}
