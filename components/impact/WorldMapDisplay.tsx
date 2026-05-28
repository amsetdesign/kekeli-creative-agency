"use client";

import { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Line,
  ZoomableGroup,
} from "react-simple-maps";
import { motion, AnimatePresence } from "framer-motion";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const DAKAR: [number, number] = [-17.44, 14.69];

export interface City {
  name: string;
  country: string;
  flag: string;
  coords: [number, number];
  isHQ: boolean;
  color: string;
  artists: string;
  region: string;
}

export const CITIES: City[] = [
  { name: "Dakar",    country: "Sénégal",         flag: "🇸🇳", coords: DAKAR,               isHQ: true,  color: "#C8A84B", artists: "60+", region: "Siège" },
  { name: "Abidjan",  country: "Côte d'Ivoire",   flag: "🇨🇮", coords: [-4.03, 5.35],        isHQ: false, color: "#10B981", artists: "20+", region: "Afrique de l'Ouest" },
  { name: "Lagos",    country: "Nigeria",          flag: "🇳🇬", coords: [3.38, 6.45],         isHQ: false, color: "#4C9BFF", artists: "8+",  region: "Afrique de l'Ouest" },
  { name: "Bamako",   country: "Mali",             flag: "🇲🇱", coords: [-7.99, 12.65],       isHQ: false, color: "#F59E0B", artists: "5+",  region: "Afrique de l'Ouest" },
  { name: "Douala",   country: "Cameroun",         flag: "🇨🇲", coords: [9.70, 4.05],         isHQ: false, color: "#F97316", artists: "4+",  region: "Afrique Centrale" },
  { name: "Paris",    country: "France",           flag: "🇫🇷", coords: [2.35, 48.86],        isHQ: false, color: "#8B5CF6", artists: "12+", region: "Europe" },
  { name: "Montréal", country: "Canada",           flag: "🇨🇦", coords: [-73.56, 45.51],      isHQ: false, color: "#EC4899", artists: "6+",  region: "Amériques" },
  { name: "Londres",  country: "Royaume-Uni",      flag: "🇬🇧", coords: [-0.12, 51.51],       isHQ: false, color: "#06B6D4", artists: "4+",  region: "Europe" },
];

/* Highlight these countries */
const HIGHLIGHTED_COUNTRIES: Record<string, string> = {
  "Senegal":      "rgba(200,168,75,0.35)",
  "Ivory Coast":  "rgba(16,185,129,0.18)",
  "Nigeria":      "rgba(76,155,255,0.15)",
  "Mali":         "rgba(245,158,11,0.15)",
  "Cameroon":     "rgba(249,115,22,0.15)",
  "France":       "rgba(139,92,246,0.15)",
  "Canada":       "rgba(236,72,153,0.12)",
  "United Kingdom": "rgba(6,182,212,0.12)",
};

export default function WorldMapDisplay({
  activeCity,
  onCityHover,
}: {
  activeCity: string | null;
  onCityHover: (name: string | null) => void;
}) {
  const [tooltip, setTooltip] = useState<{ city: City; x: number; y: number } | null>(null);

  return (
    <div className="relative w-full" style={{ background: "#0D0D0B" }}>
      <ComposableMap
        projectionConfig={{ scale: 160, center: [10, 18] }}
        style={{ width: "100%", height: "auto" }}
        height={500}
      >
        <ZoomableGroup>
          {/* Countries */}
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const name = geo.properties?.name as string | undefined;
                const highlight = name ? HIGHLIGHTED_COUNTRIES[name] : undefined;
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={highlight ?? "#171715"}
                    stroke="#242420"
                    strokeWidth={0.4}
                    style={{ default: { outline: "none" }, hover: { outline: "none" }, pressed: { outline: "none" } }}
                  />
                );
              })
            }
          </Geographies>

          {/* Connection lines from Dakar */}
          {CITIES.filter((c) => !c.isHQ).map((city) => (
            <Line
              key={`line-${city.name}`}
              from={DAKAR}
              to={city.coords}
              stroke={activeCity === city.name ? city.color : "rgba(200,168,75,0.2)"}
              strokeWidth={activeCity === city.name ? 1.5 : 0.8}
              strokeLinecap="round"
              strokeDasharray="3 5"
            />
          ))}

          {/* City markers */}
          {CITIES.map((city) => (
            <Marker
              key={city.name}
              coordinates={city.coords}
              onMouseEnter={(e) => {
                const rect = (e.target as SVGElement).closest("svg")?.getBoundingClientRect();
                if (rect) {
                  setTooltip({ city, x: e.clientX - rect.left, y: e.clientY - rect.top });
                }
                onCityHover(city.name);
              }}
              onMouseLeave={() => {
                setTooltip(null);
                onCityHover(null);
              }}
            >
              {/* Pulse rings — HQ only */}
              {city.isHQ && (
                <>
                  {[1, 2, 3].map((ring) => (
                    <motion.circle
                      key={ring}
                      r={6 + ring * 7}
                      fill="none"
                      stroke="#C8A84B"
                      strokeWidth={0.6}
                      initial={{ opacity: 0.6, scale: 0.8 }}
                      animate={{ opacity: 0, scale: 1.6 }}
                      transition={{ duration: 2.5, delay: ring * 0.6, repeat: Infinity, ease: "easeOut" }}
                    />
                  ))}
                </>
              )}
              {/* Non-HQ pulse */}
              {!city.isHQ && activeCity === city.name && (
                <motion.circle
                  r={12}
                  fill="none"
                  stroke={city.color}
                  strokeWidth={0.8}
                  initial={{ opacity: 0.5, scale: 0.8 }}
                  animate={{ opacity: 0, scale: 2 }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
              {/* Main dot */}
              <circle
                r={city.isHQ ? 5 : 3.5}
                fill={city.color}
                stroke={city.isHQ ? "#0D0D0B" : "transparent"}
                strokeWidth={city.isHQ ? 2 : 0}
              />
              {/* HQ label */}
              {city.isHQ && (
                <text
                  y={-10}
                  textAnchor="middle"
                  style={{
                    fontFamily: "var(--font-body, sans-serif)",
                    fontSize: "6px",
                    fill: "#C8A84B",
                    fontWeight: 600,
                    letterSpacing: "0.05em",
                  }}
                >
                  DAKAR — HQ
                </text>
              )}
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>

      {/* SVG tooltip */}
      <AnimatePresence>
        {tooltip && (
          <motion.div
            key={tooltip.city.name}
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute pointer-events-none z-20 px-3 py-2 rounded-xl shadow-lg"
            style={{
              left: tooltip.x + 12,
              top: tooltip.y - 40,
              background: "#1C1C1A",
              border: `1px solid ${tooltip.city.color}40`,
              minWidth: 130,
            }}
          >
            <p className="font-body text-xs font-bold text-white">
              {tooltip.city.flag} {tooltip.city.name}
            </p>
            <p className="font-body text-[10px] text-white/40">{tooltip.city.country}</p>
            <p className="font-body text-[10px] mt-1" style={{ color: tooltip.city.color }}>
              {tooltip.city.artists} artistes
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
