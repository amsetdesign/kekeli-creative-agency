"use client";

import { useEffect, useState } from "react";
import { FolderOpen, RefreshCw, CheckCircle, MessageSquare } from "lucide-react";

interface Props {
  total: number;
  active: number;
  completed: number;
  unread: number;
}

function CountUp({ target, duration = 800 }: { target: number; duration?: number }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (target === 0) return;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setVal(Math.round(p * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration]);
  return <>{val}</>;
}

export default function DashboardStats({ total, active, completed, unread }: Props) {
  const cards = [
    {
      icon: FolderOpen,
      label: "Projets total",
      value: total,
      sub: total === 0 ? "Commencer" : total === 1 ? "1 projet" : `${total} projets`,
      color: "#78716C",
      bg: "#F5F5F4",
    },
    {
      icon: RefreshCw,
      label: "En cours",
      value: active,
      sub: active === 0 ? "Aucun actif" : active === 1 ? "1 actif" : `${active} actifs`,
      color: "#3B82F6",
      bg: "rgba(59,130,246,0.08)",
    },
    {
      icon: CheckCircle,
      label: "Terminés",
      value: completed,
      sub: completed === 0 ? "En progression" : `${completed} livré${completed > 1 ? "s" : ""}`,
      color: "#10B981",
      bg: "rgba(16,185,129,0.08)",
    },
    {
      icon: MessageSquare,
      label: "Messages",
      value: unread,
      sub: unread === 0 ? "Tout lu" : `${unread} non lu${unread > 1 ? "s" : ""}`,
      color: unread > 0 ? "#C8A84B" : "#78716C",
      bg: unread > 0 ? "rgba(200,168,75,0.10)" : "#F5F5F4",
      highlight: unread > 0,
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
      {cards.map(({ icon: Icon, label, value, sub, color, bg, highlight }) => (
        <div key={label}
          className="rounded-2xl p-4 transition-shadow"
          style={{
            background: "white",
            border: highlight ? `1.5px solid ${color}40` : "1px solid #E7E5E4",
            boxShadow: highlight ? `0 0 0 3px ${color}10` : undefined,
          }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3" style={{ background: bg }}>
            <Icon size={15} style={{ color }} />
          </div>
          <p className="font-display text-2xl font-bold text-[#0C0B09]">
            <CountUp target={value} />
          </p>
          <p className="font-body text-xs text-[#78716C] mt-0.5">{label}</p>
          <p className="font-body text-[10px] mt-0.5 font-medium" style={{ color }}>{sub}</p>
        </div>
      ))}
    </div>
  );
}
