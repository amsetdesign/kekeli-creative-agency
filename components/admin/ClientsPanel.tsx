"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, XCircle, Clock, ChevronDown, Mail, Phone, Building } from "lucide-react";
import type { ClientProfile } from "@/lib/supabase";

interface Props {
  clients: ClientProfile[];
}

const STATUS_CONFIG = {
  pending:   { label: "En attente", color: "bg-amber-100 text-amber-700", icon: <Clock size={12} /> },
  active:    { label: "Actif",       color: "bg-emerald-100 text-emerald-700", icon: <CheckCircle size={12} /> },
  suspended: { label: "Suspendu",   color: "bg-red-100 text-red-600", icon: <XCircle size={12} /> },
};

type Filter = "all" | ClientProfile["status"];

export default function ClientsPanel({ clients: initialClients }: Props) {
  const router = useRouter();
  const [clients, setClients] = useState(initialClients);
  const [filter, setFilter] = useState<Filter>("all");
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = filter === "all" ? clients : clients.filter((c) => c.status === filter);
  const pendingCount = clients.filter((c) => c.status === "pending").length;

  async function updateStatus(id: string, status: ClientProfile["status"]) {
    setLoadingId(id);
    try {
      const res = await fetch("/api/admin/clients", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        setClients((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)));
        router.refresh();
      }
    } finally {
      setLoadingId(null);
    }
  }

  return (
    <div>
      {/* Filter bar */}
      <div className="flex items-center gap-2 mb-5 flex-wrap">
        {(["all", "pending", "active", "suspended"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-full font-body text-xs font-medium transition-colors ${
              filter === f
                ? "bg-[#0C0B09] text-white"
                : "bg-white border border-[#E7E5E4] text-[#78716C] hover:border-[#0C0B09]"
            }`}
          >
            {f === "all" ? "Tous" : STATUS_CONFIG[f].label}
            {f === "pending" && pendingCount > 0 && (
              <span className="ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] bg-amber-200 text-amber-800">
                {pendingCount}
              </span>
            )}
          </button>
        ))}
        <span className="ml-auto font-body text-xs text-[#A8A29E]">
          {filtered.length} client{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#E7E5E4] p-12 text-center">
          <p className="font-body text-sm text-[#78716C]">Aucun client dans cette catégorie.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((client) => {
            const conf = STATUS_CONFIG[client.status];
            const isExpanded = expandedId === client.id;
            const isLoading = loadingId === client.id;

            return (
              <div
                key={client.id}
                className="bg-white rounded-2xl border border-[#E7E5E4] overflow-hidden"
              >
                {/* Row */}
                <button
                  onClick={() => setExpandedId(isExpanded ? null : client.id)}
                  className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-[#FAFAF8] transition-colors"
                >
                  {/* Avatar */}
                  <div className="w-9 h-9 rounded-full bg-[#C8A84B]/15 flex items-center justify-center shrink-0">
                    <span className="font-display font-bold text-sm text-[#C8A84B]">
                      {client.full_name.charAt(0).toUpperCase()}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-body text-sm font-medium text-[#0C0B09] truncate">
                      {client.full_name}
                    </p>
                    <p className="font-body text-xs text-[#78716C] truncate">{client.email}</p>
                  </div>

                  {client.company && (
                    <span className="hidden sm:block font-body text-xs text-[#A8A29E] truncate max-w-[140px]">
                      {client.company}
                    </span>
                  )}

                  <span className={`shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-full font-body text-xs font-medium ${conf.color}`}>
                    {conf.icon}
                    {conf.label}
                  </span>

                  <ChevronDown
                    size={16}
                    className={`shrink-0 text-[#A8A29E] transition-transform ${isExpanded ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Expanded */}
                {isExpanded && (
                  <div className="border-t border-[#E7E5E4] px-5 py-4">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                      <div className="flex items-center gap-2 text-[#78716C]">
                        <Mail size={13} className="shrink-0" />
                        <span className="font-body text-xs truncate">{client.email}</span>
                      </div>
                      {client.phone && (
                        <div className="flex items-center gap-2 text-[#78716C]">
                          <Phone size={13} className="shrink-0" />
                          <span className="font-body text-xs">{client.phone}</span>
                        </div>
                      )}
                      {client.company && (
                        <div className="flex items-center gap-2 text-[#78716C]">
                          <Building size={13} className="shrink-0" />
                          <span className="font-body text-xs truncate">{client.company}</span>
                        </div>
                      )}
                    </div>

                    <p className="font-body text-xs text-[#A8A29E] mb-4">
                      Inscription le{" "}
                      {new Date(client.created_at).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>

                    <div className="flex items-center gap-2 flex-wrap">
                      {client.status !== "active" && (
                        <button
                          disabled={isLoading}
                          onClick={() => updateStatus(client.id, "active")}
                          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 text-white font-body text-xs font-medium hover:bg-emerald-700 transition-colors disabled:opacity-60"
                        >
                          <CheckCircle size={13} />
                          {isLoading ? "..." : "Activer"}
                        </button>
                      )}
                      {client.status !== "suspended" && (
                        <button
                          disabled={isLoading}
                          onClick={() => updateStatus(client.id, "suspended")}
                          className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[#E7E5E4] text-[#78716C] font-body text-xs hover:border-red-300 hover:text-red-500 transition-colors disabled:opacity-60"
                        >
                          <XCircle size={13} />
                          {isLoading ? "..." : "Suspendre"}
                        </button>
                      )}
                      {client.status !== "pending" && (
                        <button
                          disabled={isLoading}
                          onClick={() => updateStatus(client.id, "pending")}
                          className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[#E7E5E4] text-[#78716C] font-body text-xs hover:border-amber-300 hover:text-amber-600 transition-colors disabled:opacity-60"
                        >
                          <Clock size={13} />
                          {isLoading ? "..." : "Mettre en attente"}
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
