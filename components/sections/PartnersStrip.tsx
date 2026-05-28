"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const PARTNERS = [
  { name: "Fee's House", src: "/images/partners/fees-house.png" },
  { name: "Sunu Impact Festival", src: "/images/partners/sunu-impact-festival.png" },
  { name: "Music Gospel Senegal", src: "/images/partners/music-gospel-senegal.png" },
  { name: "Marihélène Production", src: "/images/partners/marihelene-production.png" },
  { name: "Galsen Gospel Urbain", src: "/images/partners/galsen-gospel-urbain.png" },
  { name: "Chaque Maison du Monde Sénégal", src: "/images/partners/chaque-maison-du-monde.png" },
  { name: "Bon Prix Supérette", src: "/images/partners/bon-prix-superette.png" },
];

export default function PartnersStrip() {
  const doubled = [...PARTNERS, ...PARTNERS];

  return (
    <section className="py-14" style={{ background: "#F7F4EE", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Label */}
        <p className="text-center font-body text-xs font-bold uppercase tracking-[0.25em] text-[#A8A29E] mb-8">
          Ils nous font confiance
        </p>

        {/* Marquee */}
        <div className="overflow-hidden">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="flex items-center gap-10 w-max"
          >
            {doubled.map((p, i) => (
              <div
                key={i}
                className="shrink-0 h-12 w-32 relative grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
              >
                <Image
                  src={p.src}
                  alt={p.name}
                  fill
                  className="object-contain"
                  sizes="128px"
                />
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
