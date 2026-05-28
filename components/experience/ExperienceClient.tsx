"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import Link from "next/link";
import {
  Sparkles, BarChart2, Rocket, MessageCircle,
  ArrowDown, ChevronRight, Palette, Music2, Video,
  Camera, Users, TrendingUp, Headphones, Target,
  Globe, Coins, Play,
} from "lucide-react";

/* ─── CountUp hook ──────────────────────────────────────── */
function useCountUp(target: number, duration = 1800, active = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(ease * target));
      if (p < 1) requestAnimationFrame(step);
      else setVal(target);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return val;
}

/* ─── Letter stagger ────────────────────────────────────── */
const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
const letterVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.06, duration: 0.6, ease: EASE_OUT },
  }),
};

function SplitText({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          custom={i + delay / 0.06}
          variants={letterVariants}
          initial="hidden"
          animate="visible"
          style={{ display: ch === " " ? "inline" : "inline-block" }}
        >
          {ch === " " ? " " : ch}
        </motion.span>
      ))}
    </span>
  );
}

/* ─── Word reveal ───────────────────────────────────────── */
function RevealText({ text, className }: { text: string; className?: string }) {
  return (
    <motion.p
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: EASE_OUT }}
    >
      {text}
    </motion.p>
  );
}

/* ─── Stat card ─────────────────────────────────────────── */
function StatCard({ number, suffix = "", label, delay, color }: {
  number: number; suffix?: string; label: string; delay: number; color: string;
}) {
  const [active, setActive] = useState(false);
  const count = useCountUp(number, 1600, active);
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay, duration: 0.7, ease: EASE_OUT }}
      onViewportEnter={() => setActive(true)}
      className="text-center"
    >
      <p className="font-display text-7xl md:text-8xl font-bold leading-none mb-3" style={{ color }}>
        {count}{suffix}
      </p>
      <p className="font-body text-base text-white/40 uppercase tracking-[0.2em]">{label}</p>
    </motion.div>
  );
}

/* ─── AI tool card ──────────────────────────────────────── */
const AI_TOOLS = [
  {
    icon: Sparkles, label: "IA Vision de Carrière",
    desc: "Analyse IA multi-dimensionnelle de ton potentiel artistique. Score sur 6 axes, roadmap 90 jours, plan d'action personnalisé.",
    href: "/artistes/vision", color: "#C8A84B",
    tag: "Analyse · Roadmap · Gratuit",
  },
  {
    icon: BarChart2, label: "Analyse Réseaux Sociaux",
    desc: "Audit IA de ta présence Instagram, TikTok et YouTube. 5 scores, plan d'action 30 jours, hashtags stratégiques.",
    href: "/artistes/analyse-reseaux", color: "#D946EF",
    tag: "Audit · 30 jours · Gratuit",
  },
  {
    icon: Rocket, label: "Stratégie de Lancement",
    desc: "Plan de lancement 90 jours généré par IA pour ton single, EP ou album. Phases, budget, KPIs, calendrier éditorial.",
    href: "/artistes/strategie-lancement", color: "#F43F5E",
    tag: "Plan · Budget · Gratuit",
  },
  {
    icon: MessageCircle, label: "Chat avec KELI",
    desc: "Ton assistant IA spécialisé industrie musicale africaine. Conseils personnalisés, idées créatives, aide à la décision — 24h/24.",
    href: "/espace-client/chat", color: "#4C9BFF",
    tag: "Conseils · 24h · Espace client",
  },
];

/* ─── Service item ──────────────────────────────────────── */
const SERVICES = [
  { icon: Palette,    label: "Direction Artistique", color: "#8B5CF6" },
  { icon: Music2,     label: "Branding Artiste",     color: "#C8A84B" },
  { icon: Video,      label: "Clips & Vidéos",       color: "#EC4899" },
  { icon: Camera,     label: "Photo Shooting",       color: "#06B6D4" },
  { icon: Users,      label: "Accompagnement",       color: "#10B981" },
  { icon: TrendingUp, label: "Stratégie Digitale",   color: "#4C9BFF" },
  { icon: Headphones, label: "Distribution",         color: "#F59E0B" },
  { icon: Target,     label: "Marketing Digital",    color: "#F97316" },
  { icon: Globe,      label: "Identité Digitale",    color: "#FF6B6B" },
  { icon: Coins,      label: "Monétisation",         color: "#16A34A" },
];

/* ─── Main ──────────────────────────────────────────────── */
export default function ExperienceClient() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroY = useTransform(scrollY, [0, 400], [0, -80]);

  useEffect(() => {
    const unsub = scrollY.on("change", (v) => setScrolled(v > 60));
    return unsub;
  }, [scrollY]);

  return (
    <div style={{ background: "#0C0B09" }}>

      {/* ── SECTION 1: HERO ──────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative h-screen flex flex-col items-center justify-center overflow-hidden"
      >
        {/* Radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 60% at 50% 60%, rgba(200,168,75,0.12) 0%, transparent 70%)" }}
        />

        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 4 + (i % 3) * 3,
              height: 4 + (i % 3) * 3,
              background: i % 2 === 0 ? "#C8A84B" : "#ffffff",
              opacity: 0.15 + (i * 0.05),
              left: `${15 + i * 13}%`,
              top: `${20 + (i % 3) * 20}%`,
            }}
            animate={{ y: [0, -18, 0], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 3 + i * 0.7, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
          />
        ))}

        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="text-center px-4 relative z-10"
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-10"
            style={{ borderColor: "rgba(200,168,75,0.3)", background: "rgba(200,168,75,0.08)" }}
          >
            <Play size={10} fill="#C8A84B" style={{ color: "#C8A84B" }} />
            <span className="font-body text-[11px] font-semibold text-[#C8A84B] uppercase tracking-[0.25em]">
              L'Expérience KEKELI
            </span>
          </motion.div>

          {/* Main title */}
          <h1 className="font-display text-6xl sm:text-7xl md:text-9xl text-white leading-none mb-0">
            <SplitText text="KEKELI" className="block" />
            <SplitText
              text="Creative Agency."
              className="block text-4xl sm:text-5xl md:text-6xl mt-2"
              delay={6 * 0.06 + 0.2}
            />
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8, ease: EASE_OUT }}
            className="font-body text-white/40 text-lg md:text-xl mt-8 max-w-xl mx-auto leading-relaxed"
          >
            Dakar. L'agence qui transforme le talent africain<br className="hidden md:block" /> en carrière internationale.
          </motion.p>

          {/* CTA line */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12"
          >
            <Link
              href="/sondage"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-body font-semibold text-sm text-[#0C0B09]"
              style={{ background: "#C8A84B" }}
            >
              Démarrer maintenant <ChevronRight size={16} />
            </Link>
            <Link
              href="/artistes"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-body text-sm text-white/60 hover:text-white transition-colors border border-white/10"
            >
              Voir nos services
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: scrolled ? 0 : 1, y: scrolled ? 10 : 0 }}
          transition={{ duration: 0.4 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown size={18} className="text-white/30" />
          </motion.div>
          <span className="font-body text-[10px] text-white/20 uppercase tracking-[0.25em]">Défiler</span>
        </motion.div>
      </section>

      {/* ── SECTION 2: MANIFESTE ────────────────────────── */}
      <section className="py-32 md:py-48 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="font-body text-[11px] uppercase tracking-[0.3em] text-[#C8A84B] mb-8"
          >
            Notre conviction
          </motion.p>
          {["Le talent africain", "n'a pas besoin d'être", "découvert."].map((line, i) => (
            <motion.h2
              key={line}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.15, duration: 0.8, ease: EASE_OUT }}
              className={`font-display leading-tight block ${
                i === 2
                  ? "text-5xl md:text-7xl text-[#C8A84B]"
                  : "text-5xl md:text-7xl text-white"
              }`}
            >
              {line}
            </motion.h2>
          ))}
          <RevealText
            text="Il a besoin d'être propulsé. Nous sommes l'infrastructure de ta carrière — stratégie, branding, technologie, réseau."
            className="font-body text-white/40 text-lg md:text-xl mt-10 max-w-2xl mx-auto leading-relaxed"
          />
        </div>
      </section>

      {/* ── SECTION 3: STATS ────────────────────────────── */}
      <section
        className="py-24 md:py-32 px-4"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
            <StatCard number={100}  suffix="+"  label="Artistes accompagnés" delay={0}    color="#C8A84B" />
            <StatCard number={10}         label="Expertises uniques"   delay={0.1}  color="white"   />
            <StatCard number={4}          label="Outils IA exclusifs"  delay={0.2}  color="#D946EF" />
            <StatCard number={3}          label="Pays couverts"        delay={0.3}  color="#4C9BFF" />
          </div>
        </div>
      </section>

      {/* ── SECTION 4: INTELLIGENCE ARTIFICIELLE ────────── */}
      <section className="py-32 md:py-48 px-4" style={{ background: "#0D0D0D" }}>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-body text-[11px] uppercase tracking-[0.3em] text-white/30 mb-4"
            >
              Technologie & IA
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.7, ease: EASE_OUT }}
              className="font-display text-4xl md:text-6xl text-white leading-tight"
            >
              Intelligence Artificielle<br />
              <span style={{ color: "#C8A84B" }}>au service de ta carrière.</span>
            </motion.h2>
            <RevealText
              text="4 outils IA développés exclusivement pour les artistes africains. Gratuits. Instantanés. Actionnables."
              className="font-body text-white/40 text-lg mt-6 max-w-xl mx-auto"
            />
          </div>

          {/* Tool cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {AI_TOOLS.map(({ icon: Icon, label, desc, href, color, tag }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 40, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.12, duration: 0.7, ease: EASE_OUT }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <Link
                  href={href}
                  className="group block h-full rounded-3xl p-7 transition-all"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                    style={{ background: `${color}18`, border: `1px solid ${color}30` }}
                  >
                    <Icon size={22} style={{ color }} />
                  </div>
                  <h3 className="font-display text-xl text-white mb-3 group-hover:text-white transition-colors">
                    {label}
                  </h3>
                  <p className="font-body text-sm text-white/40 leading-relaxed mb-5">{desc}</p>
                  <div className="flex items-center justify-between">
                    <span
                      className="font-body text-[11px] font-semibold px-3 py-1 rounded-full"
                      style={{ background: `${color}18`, color }}
                    >
                      {tag}
                    </span>
                    <span className="font-body text-xs text-white/20 group-hover:text-white/50 transition-colors flex items-center gap-1">
                      Accéder <ChevronRight size={12} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 5: SERVICES ─────────────────────────── */}
      <section className="py-32 md:py-48 px-4" style={{ background: "white" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-body text-[11px] uppercase tracking-[0.3em] text-[#A8A29E] mb-4"
            >
              Ce qu'on fait
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.7, ease: EASE_OUT }}
              className="font-display text-4xl md:text-6xl text-[#0C0B09] leading-tight"
            >
              10 expertises.<br />
              <span style={{ color: "#C8A84B" }}>Une seule équipe.</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {SERVICES.map(({ icon: Icon, label, color }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.06, duration: 0.5, ease: EASE_OUT }}
                whileHover={{ y: -4, transition: { duration: 0.15 } }}
                className="flex flex-col items-center gap-3 p-5 rounded-2xl cursor-default"
                style={{ border: "1px solid #F5F5F4" }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{ background: `${color}15` }}
                >
                  <Icon size={20} style={{ color }} />
                </div>
                <p className="font-body text-xs font-medium text-[#44403C] text-center leading-tight">{label}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-center mt-14"
          >
            <Link
              href="/artistes"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-body font-semibold text-sm text-white"
              style={{ background: "#0C0B09" }}
            >
              Voir tous nos services <ChevronRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 6: QUOTE ────────────────────────────── */}
      <section className="py-32 md:py-48 px-4" style={{ background: "#0C0B09" }}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE_OUT }}
            className="h-px w-24 mx-auto mb-16"
            style={{ background: "#C8A84B", transformOrigin: "left" }}
          />
          {["\"Ta musique mérite", "d'être entendue.", "Partout.\""].map((line, i) => (
            <motion.p
              key={line}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.2, duration: 0.8, ease: EASE_OUT }}
              className={`font-display leading-tight block ${
                i === 2
                  ? "text-4xl md:text-6xl text-[#C8A84B]"
                  : "text-4xl md:text-6xl text-white"
              }`}
            >
              {line}
            </motion.p>
          ))}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="font-body text-white/30 text-sm mt-8 uppercase tracking-[0.2em]"
          >
            — L'équipe KEKELI, Dakar
          </motion.p>
        </div>
      </section>

      {/* ── SECTION 7: CTA FINAL ────────────────────────── */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
        style={{ background: "#0C0B09" }}
      >
        {/* Gold radial */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 50% at 50% 60%, rgba(200,168,75,0.15) 0%, transparent 70%)" }}
        />

        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE_OUT }}
          >
            <p className="font-body text-[11px] uppercase tracking-[0.3em] text-[#C8A84B] mb-10">
              Prêt à commencer ?
            </p>
            <h2 className="font-display text-5xl md:text-7xl text-white leading-tight mb-6">
              Ton artiste<br />
              <span style={{ color: "#C8A84B" }}>mérite mieux.</span>
            </h2>
            <p className="font-body text-white/40 text-lg md:text-xl leading-relaxed mb-14 max-w-xl mx-auto">
              Rejoins les artistes qui ont choisi KEKELI Creative Agency pour construire une carrière qui dure.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/sondage"
                className="inline-flex items-center gap-2 px-9 py-4 rounded-full font-body font-bold text-base text-[#0C0B09]"
                style={{ background: "#C8A84B" }}
              >
                Audit gratuit maintenant <ChevronRight size={18} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-9 py-4 rounded-full font-body font-semibold text-base text-white/60 hover:text-white transition-colors border border-white/10"
              >
                Nous contacter
              </Link>
            </div>

            <p className="font-body text-white/20 text-xs mt-8">
              Dakar · Abidjan · Paris
            </p>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
