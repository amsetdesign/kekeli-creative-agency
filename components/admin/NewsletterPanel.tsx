"use client";

import { useState } from "react";
import { Download, Trash2, Mail, Users, TrendingUp, Calendar } from "lucide-react";

export interface NewsletterSubscriber {
  id: string;
  email: string;
  name: string | null;
  source: string | null;
  subscribed_at: string;
  unsubscribed_at: string | null;
}

interface Props {
  subscribers: NewsletterSubscriber[];
}

export default function NewsletterPanel({ subscribers }: Props) {
  const [filter, setFilter] = useState<"all" | "active" | "unsub">("active");
  const [search, setSearch] = useState("");

  const active = subscribers.filter((s) => !s.unsubscribed_at);
  const unsub  = subscribers.filter((s) => !!s.unsubscribed_at);

  const filtered = subscribers
    .filter((s) => {
      if (filter === "active") return !s.unsubscribed_at;
      if (filter === "unsub")  return !!s.unsubscribed_at;
      return true;
    })
    .filter((s) =>
      !search ||
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      (s.name ?? "").toLowerCase().includes(search.toLowerCase())
    );

  /* Export CSV */
  function exportCSV() {
    const rows = [
      ["Email", "Prénom", "Source", "Date d'abonnement", "Désabonné le"],
      ...active.map((s) => [
        s.email,
        s.name ?? "",
        s.source ?? "footer",
        new Date(s.subscribed_at).toLocaleDateString("fr-FR"),
        s.unsubscribed_at ? new Date(s.unsubscribed_at).toLocaleDateString("fr-FR") : "",
      ]),
    ];
    const csv = rows.map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `kekeli-newsletter-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const sourceStats = active.reduce<Record<string, number>>((acc, s) => {
    const src = s.source ?? "footer";
    acc[src] = (acc[src] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { icon: <Users size={16} />, label: "Abonnés actifs",   value: active.length,            color: "#10B981" },
          { icon: <Mail size={16} />,  label: "Total inscrits",    value: subscribers.length,       color: "#C8A84B" },
          { icon: <Trash2 size={16} />,label: "Désabonnés",        value: unsub.length,             color: "#EF4444" },
          { icon: <TrendingUp size={16} />, label: "Taux rétention", value: subscribers.length > 0 ? `${Math.round((active.length / subscribers.length) * 100)}%` : "—", color: "#8B5CF6" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-4 border border-[#E7E5E4]">
            <div className="flex items-center justify-between mb-3">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: `${s.color}15` }}>
                <span style={{ color: s.color }}>{s.icon}</span>
              </div>
            </div>
            <p className="font-display text-2xl font-bold text-[#0C0B09]">{s.value}</p>
            <p className="font-body text-xs text-[#78716C] mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Sources */}
      {Object.keys(sourceStats).length > 0 && (
        <div className="bg-white rounded-2xl border border-[#E7E5E4] p-4 mb-6">
          <p className="font-body text-xs font-bold uppercase tracking-[0.15em] text-[#A8A29E] mb-3">Sources d&apos;abonnement</p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(sourceStats).map(([src, count]) => (
              <div key={src} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-body"
                style={{ background: "rgba(200,168,75,0.1)", border: "1px solid rgba(200,168,75,0.2)", color: "#C8A84B" }}>
                <span className="font-semibold capitalize">{src}</span>
                <span className="opacity-70">— {count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-1 p-1 rounded-xl" style={{ background: "#F5F2EB" }}>
          {(["active", "all", "unsub"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-3 py-1.5 rounded-lg font-body text-xs font-medium transition-all"
              style={{
                background: filter === f ? "#fff" : "transparent",
                color: filter === f ? "#0C0B09" : "#78716C",
                boxShadow: filter === f ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
              }}
            >
              {f === "active" ? `Actifs (${active.length})` : f === "unsub" ? `Désabonnés (${unsub.length})` : `Tous (${subscribers.length})`}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher..."
            className="px-3 py-2 rounded-xl font-body text-sm border border-[#E7E5E4] outline-none focus:border-[#C8A84B] transition-colors"
            style={{ width: 180 }}
          />
          <button
            onClick={exportCSV}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl font-body text-sm font-medium transition-all hover:opacity-80"
            style={{ background: "#C8A84B", color: "#0C0B09" }}
          >
            <Download size={13} />
            Export CSV
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-[#E7E5E4] overflow-hidden">
        {filtered.length === 0 ? (
          <div className="py-16 text-center">
            <Mail size={32} className="mx-auto mb-3 opacity-20" />
            <p className="font-body text-sm text-[#78716C]">
              {search ? "Aucun résultat pour cette recherche." : "Aucun abonné dans cette catégorie."}
            </p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid #F5F2EB" }}>
                {["Email", "Prénom", "Source", "Abonné le", "Statut"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left font-body text-[10px] font-bold uppercase tracking-[0.15em] text-[#A8A29E]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((sub) => (
                <tr key={sub.id} style={{ borderBottom: "1px solid #F5F2EB" }} className="hover:bg-[#FAFAF8] transition-colors">
                  <td className="px-4 py-3 font-body text-sm text-[#0C0B09]">{sub.email}</td>
                  <td className="px-4 py-3 font-body text-sm text-[#44403C]">{sub.name ?? <span className="text-[#A8A29E]">—</span>}</td>
                  <td className="px-4 py-3">
                    <span className="font-body text-[11px] px-2 py-0.5 rounded-full capitalize"
                      style={{ background: "rgba(200,168,75,0.1)", color: "#C8A84B", border: "1px solid rgba(200,168,75,0.2)" }}>
                      {sub.source ?? "footer"}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-body text-xs text-[#78716C]">
                    <div className="flex items-center gap-1">
                      <Calendar size={11} />
                      {new Date(sub.subscribed_at).toLocaleDateString("fr-FR")}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {sub.unsubscribed_at ? (
                      <span className="font-body text-[11px] px-2 py-0.5 rounded-full"
                        style={{ background: "rgba(239,68,68,0.1)", color: "#EF4444", border: "1px solid rgba(239,68,68,0.2)" }}>
                        Désabonné
                      </span>
                    ) : (
                      <span className="font-body text-[11px] px-2 py-0.5 rounded-full"
                        style={{ background: "rgba(16,185,129,0.1)", color: "#10B981", border: "1px solid rgba(16,185,129,0.2)" }}>
                        Actif
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <p className="font-body text-[11px] text-[#A8A29E] mt-3">
        {filtered.length} abonné{filtered.length !== 1 ? "s" : ""} affiché{filtered.length !== 1 ? "s" : ""}
      </p>
    </div>
  );
}
