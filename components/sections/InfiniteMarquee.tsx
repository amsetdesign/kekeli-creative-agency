"use client";

import { motion } from "framer-motion";
import { useT } from "@/hooks/useT";

function Strip({ items, reverse = false }: { items: readonly string[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="flex overflow-hidden">
      <motion.div
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="flex shrink-0 gap-0"
      >
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center shrink-0">
            <span className="font-body text-[11px] font-semibold uppercase tracking-[0.22em] text-gold/45 whitespace-nowrap px-6">
              {item}
            </span>
            <span className="w-1 h-1 rounded-full bg-gold/20 shrink-0" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function InfiniteMarquee() {
  const tr = useT();
  return (
    <div className="bg-bg-dark border-y border-gold/10 py-4 overflow-hidden select-none">
      <Strip items={tr.marquee} />
    </div>
  );
}
