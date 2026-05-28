"use client";

import AnimatedCounter from "@/components/ui/AnimatedCounter";
import FadeIn from "@/components/animations/FadeIn";
import { useT } from "@/hooks/useT";

export default function StatsBar() {
  const tr = useT();

  const stats = [
    { value: 50,  suffix: "+",  label: tr.stats.projects,      bg: "#C8A84B", emoji: "🚀" },
    { value: 30,  suffix: "+",  label: tr.stats.clients,       bg: "#8B5CF6", emoji: "🤝" },
    { value: 8,   suffix: "",   label: tr.stats.servicesLabel,  bg: "#10B981", emoji: "✨" },
    { value: 100, suffix: "%",  label: tr.stats.satisfaction,  bg: "#EC4899", emoji: "⭐" },
  ];

  return (
    <section className="py-16 bg-bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map(({ value, suffix, label, bg, emoji }, i) => (
            <FadeIn key={label} delay={i * 0.1} direction="up">
              <div
                className="rounded-3xl p-7 text-center relative overflow-hidden"
                style={{ background: `${bg}15`, border: `2px solid ${bg}30` }}
              >
                {/* Cercle déco */}
                <div
                  className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-15"
                  style={{ background: bg }}
                />
                <div className="relative">
                  <div className="text-3xl mb-2">{emoji}</div>
                  <p className="font-display text-5xl sm:text-6xl font-bold leading-none mb-2" style={{ color: bg }}>
                    <AnimatedCounter to={value} suffix={suffix} />
                  </p>
                  <p className="font-body text-sm text-text-muted uppercase tracking-widest">
                    {label}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
