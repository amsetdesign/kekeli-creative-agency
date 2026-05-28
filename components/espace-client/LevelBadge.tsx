"use client";

import { motion } from "framer-motion";
export type { ArtistLevel } from "@/lib/computeLevel";
export { computeLevel } from "@/lib/computeLevel";
import type { ArtistLevel } from "@/lib/computeLevel";

export default function LevelBadge({ level, showCriteria = false }: { level: ArtistLevel; showCriteria?: boolean }) {
  return (
    <div className="shrink-0"
      style={{ background: `${level.color}0E`, border: `1px solid ${level.color}25`, borderRadius: 16, padding: "10px 14px" }}>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-base">{level.emoji}</span>
        <div>
          <p className="font-body text-xs font-bold leading-none" style={{ color: level.color }}>{level.label}</p>
          <p className="font-body text-[10px] leading-none mt-0.5" style={{ color: `${level.color}70` }}>Niveau {level.level} / 4</p>
        </div>
      </div>
      <div className="h-1 rounded-full" style={{ background: `${level.color}18` }}>
        <motion.div className="h-1 rounded-full"
          style={{ background: level.color }}
          initial={{ width: 0 }}
          animate={{ width: `${level.progress}%` }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.3 }} />
      </div>
      {level.nextLabel && (
        <p className="font-body text-[10px] mt-1" style={{ color: `${level.color}55` }}>
          {level.progress}% → {level.nextLabel}
        </p>
      )}
      {showCriteria && level.nextCriteria.length > 0 && (
        <div className="mt-3 pt-3" style={{ borderTop: `1px solid ${level.color}15` }}>
          <p className="font-body text-[10px] font-semibold mb-1.5" style={{ color: `${level.color}80` }}>Pour progresser :</p>
          <ul className="space-y-1">
            {level.nextCriteria.slice(0, 3).map((c, i) => (
              <li key={i} className="flex items-start gap-1.5 font-body text-[10px] leading-snug" style={{ color: `${level.color}70` }}>
                <span className="shrink-0 mt-0.5">→</span>
                {c}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
