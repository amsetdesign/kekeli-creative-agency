"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "kekeli_splash_v1";

export default function SplashScreen() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      setVisible(true);
      localStorage.setItem(STORAGE_KEY, "1");
      const t = setTimeout(() => setVisible(false), 2000);
      return () => clearTimeout(t);
    }
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.55, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center select-none pointer-events-none"
          style={{ background: "#0C0B09" }}
        >
          {/* Outer glow */}
          <div className="absolute w-64 h-64 rounded-full opacity-20 blur-3xl"
            style={{ background: "radial-gradient(circle, #C8A84B 0%, transparent 70%)" }} />

          {/* Rotating arc + K */}
          <div className="relative w-28 h-28 mb-7">
            {/* Slow outer ring */}
            <svg viewBox="0 0 112 112" className="absolute inset-0 w-full h-full">
              <circle cx="56" cy="56" r="52" fill="none"
                stroke="rgba(200,168,75,0.12)" strokeWidth="2" />
            </svg>

            {/* Fast inner spinner */}
            <motion.svg viewBox="0 0 112 112" className="absolute inset-0 w-full h-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}>
              <circle cx="56" cy="56" r="52" fill="none"
                stroke="#C8A84B" strokeWidth="2.5"
                strokeLinecap="round" strokeDasharray="55 272" />
            </motion.svg>

            {/* K letter */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, delay: 0.1, ease: [0.34, 1.56, 0.64, 1] }}>
              <span className="font-display text-6xl font-bold leading-none"
                style={{ color: "#C8A84B" }}>
                K
              </span>
            </motion.div>
          </div>

          {/* Brand name */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.4 }}>
            <p className="font-display text-2xl font-semibold text-white tracking-[0.35em] mb-1">
              KEKELI
            </p>
            <p className="font-body text-xs text-white/30 tracking-[0.25em] uppercase">
              Creative Agency
            </p>
          </motion.div>

          {/* Bottom dots */}
          <motion.div
            className="absolute bottom-12 flex gap-1.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}>
            {[0, 1, 2].map((i) => (
              <motion.span key={i}
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "#C8A84B" }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.2 }} />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
