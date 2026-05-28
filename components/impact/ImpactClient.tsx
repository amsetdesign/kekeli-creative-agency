"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { MapPin, Globe, Users, TrendingUp, ChevronRight } from "lucide-react";
import Link from "next/link";
import { CITIES, type City } from "./WorldMapDisplay";

const WorldMapDisplay = dynamic(() => import("./WorldMapDisplay"), {
  ssr: false,
  loading: () => (
    <div
      className="w-full flex items-center justify-center"
      style={{ height: 500, background: "#0D0D0B" }}
    >
      <div className="text-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#C8A84B] border-t-transparent animate-spin mx-auto mb-3" />
        <p className="font-body text-xs text-white/30">Chargement de la carte...</p>
      </div>
    </div>
  ),
});

/* ─── Grouped stats ─────────────────────────────────────── */
const REGIONS = [
  {
    name: "Sénégal",
    flag: "🇸🇳",
    artists: "60+",
    color: "#C8A84B",
    desc: "Le cœur battant de KEKELI — là où tout a commencé.",
    cities: ["Dakar"],
  },
  {
    name: "Afrique de l'Ouest",
    flag: "🌍",
    artists: "33+",
    color: "#10B981",
    desc: "Abidjan, Lagos, Bamako — la scène musicale ouest-africaine.",
    cities: ["Abidjan", "Lagos", "Bamako"],
  },
  {
    name: "Europe",
    flag: "🇪🇺",
    artists: "16+",
    color: "#8B5CF6",
    desc: "La diaspora africaine à Paris et Londres.",
    cities: ["Paris", "Londres"],
  },
  {
    name: "Amériques",
    flag: "🌎",
    artists: "6+",
    color: "#EC4899",
    desc: "Montréal, hub de la créativité africaine en Amérique du Nord.",
    cities: ["Montréal"],
  },
];

/* ─── CountUp hook ──────────────────────────────────────── */
function useCountUp(target: number, active: boolean) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / 1400, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(ease * target));
      if (p < 1) requestAnimationFrame(step);
      else setVal(target);
    };
    requestAnimationFrame(step);
  }, [active, target]);
  return val;
}

function StatBand() {
  const [active, setActive] = useState(false);
  const artists = useCountUp(100, active);
  const cities  = useCountUp(8, active);
  const pays    = useCountUp(7, active);
  const annees  = useCountUp(5, active);

  return (
    <motion.div
      onViewportEnter={() => setActive(true)}
      viewport={{ once: true }}
      className="grid grid-cols-2 md:grid-cols-4 gap-px"
      style={{ background: "rgba(255,255,255,0.06)" }}
    >
      {[
        { val: artists, suffix: "+", label: "Artistes accompagnés", icon: Users },
        { val: cities,        label: "Villes couvertes",         icon: MapPin },
        { val: pays,          label: "Pays représentés",         icon: Globe },
        { val: annees,  suffix: " ans", label: "D'expertise",  icon: TrendingUp },
      ].map(({ val, suffix = "", label, icon: Icon }) => (
        <div
          key={label}
          className="flex flex-col items-center justify-center py-10 text-center"
          style={{ background: "#0C0B09" }}
        >
          <Icon size={18} className="text-[#C8A84B] mb-3 opacity-70" />
          <p className="font-display text-4xl md:text-5xl font-bold text-white">
            {val}{suffix}
          </p>
          <p className="font-body text-xs text-white/30 mt-2 uppercase tracking-[0.15em]">{label}</p>
        </div>
      ))}
    </motion.div>
  );
}

/* ─── Main ──────────────────────────────────────────────── */
export default function ImpactClient() {
  const [activeCity, setActiveCity] = useState<string | null>(null);

  const activeData: City | undefined = activeCity
    ? CITIES.find((c) => c.name === activeCity)
    : undefined;

  return (
    <div style={{ background: "#0C0B09" }}>
      {/* ── HERO ───────────────────────────────────────── */}
      <div className="relative overflow-hidden py-24 md:py-32 px-4 text-center">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(200,168,75,0.1) 0%, transparent 70%)" }}
        />
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-body text-[11px] uppercase tracking-[0.3em] text-[#C8A84B] mb-5"
        >
          Impact global
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="font-display text-5xl md:text-7xl text-white leading-tight mb-6"
        >
          Dakar.<br />
          <span style={{ color: "#C8A84B" }}>Vers le Monde.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.7 }}
          className="font-body text-white/40 text-lg max-w-xl mx-auto"
        >
          De notre studio à Dakar, nous propulsons des artistes africains sur les scènes mondiales. Survole la carte pour explorer notre réseau.
        </motion.p>
      </div>

      {/* ── MAP ─────────────────────────────────────────── */}
      <div className="relative">
        <WorldMapDisplay activeCity={activeCity} onCityHover={setActiveCity} />

        {/* Active city overlay */}
        {activeData && (
          <motion.div
            key={activeData.name}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute top-4 left-4 px-4 py-3 rounded-2xl z-10"
            style={{ background: "#1C1C1A", border: `1px solid ${activeData.color}40` }}
          >
            <p className="font-body text-sm font-bold text-white">
              {activeData.flag} {activeData.name}
            </p>
            <p className="font-body text-xs text-white/40">{activeData.country}</p>
            <p className="font-body text-sm font-semibold mt-1" style={{ color: activeData.color }}>
              {activeData.artists} artistes
            </p>
          </motion.div>
        )}

        {/* Legend */}
        <div
          className="absolute bottom-4 right-4 px-3 py-2 rounded-xl z-10"
          style={{ background: "rgba(12,11,9,0.8)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-3 h-3 rounded-full" style={{ background: "#C8A84B" }} />
            <span className="font-body text-[10px] text-white/50">Siège — Dakar</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ background: "#4C9BFF" }} />
            <span className="font-body text-[10px] text-white/50">Villes couvertes</span>
          </div>
          <div className="flex items-center gap-2 mt-1.5">
            <div className="border-t border-dashed border-[#C8A84B]/40 w-6" />
            <span className="font-body text-[10px] text-white/50">Connexions actives</span>
          </div>
        </div>
      </div>

      {/* ── STATS ───────────────────────────────────────── */}
      <StatBand />

      {/* ── REGIONS ─────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="font-body text-[11px] uppercase tracking-[0.3em] text-white/30 mb-3">Nos zones</p>
          <h2 className="font-display text-3xl md:text-5xl text-white">
            Une présence sur <span style={{ color: "#C8A84B" }}>4 continents</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {REGIONS.map(({ name, flag, artists, color, desc, cities }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="rounded-2xl p-5"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div className="text-2xl mb-3">{flag}</div>
              <h3 className="font-display text-base text-white mb-1">{name}</h3>
              <p className="font-display text-3xl font-bold mb-3" style={{ color }}>
                {artists}
              </p>
              <p className="font-body text-xs text-white/40 leading-relaxed mb-4">{desc}</p>
              <div className="flex flex-wrap gap-1">
                {cities.map((c) => (
                  <span
                    key={c}
                    className="font-body text-[10px] font-medium px-2 py-0.5 rounded-full"
                    style={{ background: `${color}18`, color }}
                  >
                    {c}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── CITY CARDS ──────────────────────────────────── */}
      <div
        className="py-16"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <p className="font-body text-[11px] uppercase tracking-[0.3em] text-white/30 mb-8 text-center">
            Nos villes
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {CITIES.map((city, i) => (
              <motion.div
                key={city.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                onMouseEnter={() => setActiveCity(city.name)}
                onMouseLeave={() => setActiveCity(null)}
                className="flex flex-col items-center p-4 rounded-2xl text-center transition-all cursor-default"
                style={{
                  background: activeCity === city.name ? `${city.color}12` : "rgba(255,255,255,0.03)",
                  border: `1px solid ${activeCity === city.name ? `${city.color}40` : "rgba(255,255,255,0.07)"}`,
                }}
              >
                <span className="text-xl mb-2">{city.flag}</span>
                <p className="font-body text-sm font-semibold text-white">{city.name}</p>
                <p className="font-body text-[10px] text-white/30 mt-0.5">{city.country}</p>
                <p className="font-body text-sm font-bold mt-2" style={{ color: city.color }}>
                  {city.artists}
                </p>
                {city.isHQ && (
                  <span
                    className="mt-2 font-body text-[9px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider"
                    style={{ background: "rgba(200,168,75,0.15)", color: "#C8A84B" }}
                  >
                    HQ
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA ─────────────────────────────────────────── */}
      <div className="py-24 px-4 text-center" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-display text-3xl md:text-5xl text-white mb-4">
            Ta ville n'est <span style={{ color: "#C8A84B" }}>pas encore sur la carte ?</span>
          </h2>
          <p className="font-body text-white/40 text-base mb-8 max-w-lg mx-auto">
            Peu importe où tu te trouves, KEKELI Creative Agency t'accompagne à distance.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-body font-semibold text-[#0C0B09] text-sm"
            style={{ background: "#C8A84B" }}
          >
            Nous contacter <ChevronRight size={16} />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
