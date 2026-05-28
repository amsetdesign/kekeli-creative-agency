"use client";

import { useState } from "react";
import { X, Sparkles, TrendingUp, Clock } from "lucide-react";

interface ConversationMessage {
  role: "user" | "assistant";
  content: string;
}

interface ConversationMetadata {
  name?: string;
  company?: string;
  project_type?: string;
  budget_range?: string;
  urgency?: "high" | "medium" | "low";
  score?: number;
  summary?: string;
}

export interface Conversation {
  id: string;
  session_id: string;
  created_at: string;
  updated_at: string;
  status: "active" | "qualified" | "archived";
  messages: ConversationMessage[];
  metadata: ConversationMetadata;
}

const URGENCY_LABELS = { high: "Urgent", medium: "Normal", low: "Faible" } as const;
const URGENCY_COLORS = {
  high: "bg-red-50 text-red-700 border-red-200",
  medium: "bg-amber-50 text-amber-700 border-amber-200",
  low: "bg-stone-100 text-stone-500 border-stone-200",
} as const;
const STATUS_COLORS = {
  qualified: "bg-emerald-50 text-emerald-700 border-emerald-200",
  active: "bg-blue-50 text-blue-700 border-blue-200",
  archived: "bg-stone-100 text-stone-400 border-stone-200",
} as const;
const STATUS_LABELS = { qualified: "Qualifié", active: "Actif", archived: "Archivé" } as const;

function ScoreBadge({ score }: { score: number }) {
  const color =
    score >= 70 ? "text-emerald-600" : score >= 40 ? "text-amber-600" : "text-stone-400";
  return (
    <span className={`font-display text-2xl font-bold ${color} leading-none`}>
      {score}
      <span className="text-xs font-body font-normal text-stone-400">/100</span>
    </span>
  );
}

function ConversationDrawer({
  conv,
  onClose,
}: {
  conv: Conversation;
  onClose: () => void;
}) {
  const m = conv.metadata;
  const userCount = conv.messages.filter((msg) => msg.role === "user").length;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-white h-full overflow-y-auto [box-shadow:-8px_0_32px_rgba(0,0,0,0.1)] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#E7E5E4] shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#C8A84B]/15 flex items-center justify-center">
              <Sparkles size={14} className="text-[#C8A84B]" />
            </div>
            <div>
              <p className="font-body text-sm font-semibold text-[#0C0B09]">
                {m.name ?? "Visiteur anonyme"}
              </p>
              {m.company && (
                <p className="font-body text-xs text-[#78716C]">{m.company}</p>
              )}
            </div>
          </div>
          <button onClick={onClose} className="text-[#78716C] hover:text-[#0C0B09] transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Metadata */}
        <div className="p-5 border-b border-[#E7E5E4] space-y-4 shrink-0">
          {/* Score + Status */}
          <div className="flex items-center gap-4">
            {m.score !== undefined && <ScoreBadge score={m.score} />}
            <span
              className={`px-2 py-0.5 rounded-full text-[11px] font-body font-semibold border ${STATUS_COLORS[conv.status]}`}
            >
              {STATUS_LABELS[conv.status]}
            </span>
            {m.urgency && (
              <span
                className={`px-2 py-0.5 rounded-full text-[11px] font-body font-semibold border ${URGENCY_COLORS[m.urgency]}`}
              >
                {URGENCY_LABELS[m.urgency]}
              </span>
            )}
          </div>

          {/* Summary */}
          {m.summary && (
            <p className="font-body text-sm text-[#44403C] leading-relaxed bg-[#F5F5F4] rounded-xl px-4 py-3 italic">
              "{m.summary}"
            </p>
          )}

          {/* Details grid */}
          <div className="grid grid-cols-2 gap-3">
            {m.project_type && (
              <div className="bg-[#F5F5F4] rounded-xl p-3">
                <p className="font-body text-[10px] text-[#A8A29E] uppercase tracking-wide mb-1">Projet</p>
                <p className="font-body text-sm font-medium text-[#0C0B09]">{m.project_type}</p>
              </div>
            )}
            {m.budget_range && (
              <div className="bg-[#F5F5F4] rounded-xl p-3">
                <p className="font-body text-[10px] text-[#A8A29E] uppercase tracking-wide mb-1">Budget</p>
                <p className="font-body text-sm font-medium text-[#0C0B09]">{m.budget_range}</p>
              </div>
            )}
            <div className="bg-[#F5F5F4] rounded-xl p-3">
              <p className="font-body text-[10px] text-[#A8A29E] uppercase tracking-wide mb-1">Messages</p>
              <p className="font-body text-sm font-medium text-[#0C0B09]">{userCount} de l'utilisateur</p>
            </div>
            <div className="bg-[#F5F5F4] rounded-xl p-3">
              <p className="font-body text-[10px] text-[#A8A29E] uppercase tracking-wide mb-1">Dernière activité</p>
              <p className="font-body text-sm font-medium text-[#0C0B09]">
                {new Date(conv.updated_at).toLocaleDateString("fr-SN", { day: "2-digit", month: "short" })}
              </p>
            </div>
          </div>
        </div>

        {/* Conversation transcript */}
        <div className="flex-1 p-5 space-y-3">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.15em] text-[#A8A29E] mb-4">
            Transcript
          </p>
          {conv.messages.map((msg, i) => (
            <div key={i} className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
              <div
                className={`w-5 h-5 rounded-full shrink-0 mt-0.5 flex items-center justify-center text-[9px] font-bold ${
                  msg.role === "assistant"
                    ? "bg-[#C8A84B]/20 text-[#C8A84B]"
                    : "bg-[#0C0B09] text-white"
                }`}
              >
                {msg.role === "assistant" ? "K" : "C"}
              </div>
              <div
                className={`max-w-[85%] rounded-xl px-3 py-2 font-body text-xs leading-relaxed whitespace-pre-line ${
                  msg.role === "assistant"
                    ? "bg-[#F5F5F4] text-[#44403C]"
                    : "bg-[#0C0B09] text-white"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ConversationsPanel({ conversations }: { conversations: Conversation[] }) {
  const [selected, setSelected] = useState<Conversation | null>(null);
  const [statusFilter, setStatusFilter] = useState<"all" | "qualified" | "active" | "archived">("all");

  const filtered = conversations.filter(
    (c) => statusFilter === "all" || c.status === statusFilter,
  );

  const qualifiedCount = conversations.filter((c) => c.status === "qualified").length;

  return (
    <>
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="flex rounded-xl border border-[#E7E5E4] bg-white overflow-hidden">
          {(["all", "qualified", "active", "archived"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-2 font-body text-xs font-medium transition-colors ${
                statusFilter === s
                  ? "bg-[#0C0B09] text-white"
                  : "text-[#78716C] hover:bg-[#F5F5F4]"
              }`}
            >
              {s === "all" ? "Tous" : STATUS_LABELS[s]}
            </button>
          ))}
        </div>
        <span className="ml-auto font-body text-xs text-[#A8A29E] self-center">
          {filtered.length} conversation{filtered.length !== 1 ? "s" : ""}
          {qualifiedCount > 0 && (
            <span className="ml-2 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              {qualifiedCount} qualifié{qualifiedCount !== 1 ? "s" : ""}
            </span>
          )}
        </span>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-[#A8A29E] font-body text-sm">
          Aucune conversation pour l'instant.
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((conv) => {
            const m = conv.metadata;
            const msgCount = conv.messages.length;
            return (
              <button
                key={conv.id}
                onClick={() => setSelected(conv)}
                className="text-left bg-white rounded-2xl border border-[#E7E5E4] p-5 hover:[box-shadow:0_4px_20px_rgba(12,11,9,0.08)] hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#C8A84B]/12 flex items-center justify-center">
                      <Sparkles size={14} className="text-[#C8A84B]" />
                    </div>
                    <div>
                      <p className="font-body text-sm font-semibold text-[#0C0B09] leading-snug">
                        {m.name ?? "Visiteur"}
                      </p>
                      {m.company && (
                        <p className="font-body text-[11px] text-[#A8A29E]">{m.company}</p>
                      )}
                    </div>
                  </div>
                  {m.score !== undefined && (
                    <div className="flex items-center gap-1">
                      <TrendingUp size={11} className={m.score >= 70 ? "text-emerald-500" : "text-stone-400"} />
                      <span className={`font-body text-xs font-bold ${m.score >= 70 ? "text-emerald-600" : "text-[#A8A29E]"}`}>
                        {m.score}
                      </span>
                    </div>
                  )}
                </div>

                {m.summary && (
                  <p className="font-body text-xs text-[#78716C] leading-relaxed line-clamp-2 mb-3">
                    {m.summary}
                  </p>
                )}

                {m.project_type && (
                  <p className="font-body text-xs text-[#C8A84B] mb-3 truncate">{m.project_type}</p>
                )}

                <div className="flex items-center justify-between">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-body font-semibold border ${STATUS_COLORS[conv.status]}`}
                  >
                    {STATUS_LABELS[conv.status]}
                  </span>
                  <div className="flex items-center gap-1 text-[#A8A29E]">
                    <Clock size={11} />
                    <span className="font-body text-[10px]">
                      {msgCount} msg
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {selected && <ConversationDrawer conv={selected} onClose={() => setSelected(null)} />}
    </>
  );
}
