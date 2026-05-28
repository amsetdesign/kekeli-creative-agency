"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { X, Mail, Phone, MessageSquare, ChevronRight, Archive, Eye } from "lucide-react";
import type { Lead } from "@/lib/supabase";

const TYPE_LABELS = {
  contact:    "Contact",
  brief:      "Brief",
  sondage:    "Sondage",
  artiste:    "🎤 Artiste",
  entreprise: "🏢 Entreprise",
  projet:     "📋 Projet",
} as const;

const TYPE_COLORS = {
  contact:    "bg-blue-50 text-blue-700 border-blue-200",
  brief:      "bg-amber-50 text-amber-700 border-amber-200",
  sondage:    "bg-violet-50 text-violet-700 border-violet-200",
  artiste:    "bg-pink-50 text-pink-700 border-pink-200",
  entreprise: "bg-sky-50 text-sky-700 border-sky-200",
  projet:     "bg-teal-50 text-teal-700 border-teal-200",
} as const;

const STATUS_COLORS = {
  new: "bg-emerald-50 text-emerald-700 border-emerald-200",
  read: "bg-stone-100 text-stone-500 border-stone-200",
  archived: "bg-stone-50 text-stone-400 border-stone-200",
} as const;

const STATUS_LABELS = {
  new: "Nouveau",
  read: "Lu",
  archived: "Archivé",
} as const;

function getLeadName(lead: Lead): string {
  const d = lead.data;
  if (lead.type === "artiste")    return d.nom_artiste as string ?? "—";
  if (lead.type === "entreprise") return d.nom_entreprise as string ?? "—";
  if (lead.type === "projet")     return d.client_name as string ?? "—";
  if (lead.type === "sondage") {
    const ui = d.userInfo as Record<string, string> | undefined;
    return ui?.prenom ?? "—";
  }
  return `${d.prenom ?? ""} ${d.nom ?? ""}`.trim() || "—";
}

function getLeadEmail(lead: Lead): string {
  const d = lead.data;
  if (lead.type === "projet") return d.client_email as string ?? "—";
  if (lead.type === "sondage") {
    const ui = d.userInfo as Record<string, string> | undefined;
    return ui?.email as string ?? "—";
  }
  return d.email as string ?? "—";
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-SN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// ── Lead detail drawer ────────────────────────────────────────────────
function LeadDrawer({ lead, onClose }: { lead: Lead; onClose: () => void }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  async function updateStatus(status: "read" | "archived") {
    await fetch("/api/admin/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: lead.id, status }),
    });
    startTransition(() => { router.refresh(); onClose(); });
  }

  const d = lead.data;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white h-full overflow-y-auto [box-shadow:-8px_0_32px_rgba(0,0,0,0.1)] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#E7E5E4] shrink-0">
          <div className="flex items-center gap-2.5">
            <span
              className={`px-2 py-0.5 rounded-full text-[11px] font-body font-semibold border ${TYPE_COLORS[lead.type]}`}
            >
              {TYPE_LABELS[lead.type]}
            </span>
            <span
              className={`px-2 py-0.5 rounded-full text-[11px] font-body font-semibold border ${STATUS_COLORS[lead.status]}`}
            >
              {STATUS_LABELS[lead.status]}
            </span>
          </div>
          <button onClick={onClose} className="text-[#78716C] hover:text-[#0C0B09] transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-5 space-y-5">
          {/* Date */}
          <p className="font-body text-xs text-[#A8A29E]">{formatDate(lead.created_at)}</p>

          {/* Contact info */}
          <div className="bg-[#F5F5F4] rounded-xl p-4 space-y-3">
            <Row icon={<Mail size={14} />} label="Email" value={getLeadEmail(lead)} />
            {(() => {
              const phone = lead.type === "sondage"
                ? (d.userInfo as Record<string, string>)?.telephone
                : d.telephone as string | undefined;
              return phone ? <Row icon={<Phone size={14} />} label="Téléphone" value={phone} /> : null;
            })()}
          </div>

          {/* Specific fields */}
          {lead.type === "contact" && (
            <div className="space-y-3">
              <Field label="Prénom & Nom" value={`${d.prenom} ${d.nom}`} />
              <Field label="Type de projet" value={d.typeProjet as string} />
              {!!d.message && <Field label="Message" value={d.message as string} multiline />}
            </div>
          )}

          {lead.type === "brief" && (
            <div className="space-y-3">
              <Field label="Prénom" value={d.prenom as string} />
              <Field label="Type de projet" value={d.projet as string} />
              <Field label="Budget" value={d.budget as string} />
              <Field label="Délai" value={d.delai as string} />
              {!!d.description && <Field label="Description" value={d.description as string} multiline />}
            </div>
          )}

          {lead.type === "artiste" && (
            <div className="space-y-3">
              <Field label="Genre musical" value={d.genre_musical as string} />
              <Field label="Niveau" value={d.niveau as string} />
              <Field label="Présence digitale" value={d.presence_digitale as string} />
              <Field label="Budget" value={d.budget as string} />
              {Array.isArray(d.besoins) && (d.besoins as string[]).length > 0 && (
                <div>
                  <p className="font-body text-xs text-[#A8A29E] mb-2">Services souhaités</p>
                  <div className="flex flex-wrap gap-1.5">
                    {(d.besoins as string[]).map((b) => (
                      <span key={b} className="px-2 py-1 rounded-full bg-pink-50 border border-pink-200 font-body text-[11px] text-pink-700">
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {!!d.description && <Field label="Vision & projet" value={d.description as string} multiline />}
            </div>
          )}

          {lead.type === "sondage" && (() => {
            const ui = d.userInfo as Record<string, string>;
            return (
              <div className="space-y-3">
                <Field label="Prénom" value={ui?.prenom} />
                {ui?.entreprise && <Field label="Entreprise" value={ui.entreprise} />}
                <Field label="Type de profil" value={d.type as string} />
                <div className="flex items-center justify-between bg-[#C8A84B]/10 border border-[#C8A84B]/20 rounded-xl px-4 py-3">
                  <span className="font-body text-sm text-[#78716C]">Score</span>
                  <span className="font-display text-2xl font-bold text-[#C8A84B]">
                    {d.score as number}/100
                  </span>
                </div>
              </div>
            );
          })()}

          {lead.type === "projet" && (
            <div className="space-y-3">
              <Field label="Client" value={d.client_name as string} />
              <Field label="Type de prestation" value={d.type as string} />
              <Field label="Urgence" value={d.urgency as string} />
              <Field label="Description" value={d.description as string} multiline />
            </div>
          )}

          {/* Quick contact */}
          <div className="flex gap-2 pt-2">
            <a
              href={`mailto:${getLeadEmail(lead)}`}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-[#E7E5E4] font-body text-xs text-[#78716C] hover:border-[#C8A84B] hover:text-[#C8A84B] transition-colors"
            >
              <Mail size={12} /> Envoyer un email
            </a>
            <a
              href={`https://wa.me/221781672819`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-[#E7E5E4] font-body text-xs text-[#78716C] hover:border-emerald-400 hover:text-emerald-600 transition-colors"
            >
              <Phone size={12} /> WhatsApp
            </a>
          </div>
        </div>

        {/* Actions */}
        {lead.status !== "archived" && (
          <div className="p-5 border-t border-[#E7E5E4] flex gap-3 shrink-0">
            {lead.status === "new" && (
              <button
                onClick={() => updateStatus("read")}
                disabled={pending}
                className="flex-1 flex items-center justify-center gap-2 bg-[#0C0B09] text-white font-body text-sm font-medium py-2.5 rounded-xl hover:bg-[#1a1917] disabled:opacity-50 transition-colors"
              >
                <Eye size={14} /> Marquer comme lu
              </button>
            )}
            <button
              onClick={() => updateStatus("archived")}
              disabled={pending}
              className="flex items-center justify-center gap-2 border border-[#E7E5E4] text-[#78716C] font-body text-sm py-2.5 px-4 rounded-xl hover:border-red-200 hover:text-red-500 disabled:opacity-50 transition-colors"
            >
              <Archive size={14} /> Archiver
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Row({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="text-[#C8A84B] shrink-0">{icon}</span>
      <span className="font-body text-xs text-[#A8A29E] w-16 shrink-0">{label}</span>
      <span className="font-body text-sm text-[#0C0B09] truncate">{value}</span>
    </div>
  );
}

function Field({
  label,
  value,
  multiline = false,
}: {
  label: string;
  value: string | undefined;
  multiline?: boolean;
}) {
  if (!value) return null;
  return (
    <div>
      <p className="font-body text-xs text-[#A8A29E] mb-1">{label}</p>
      {multiline ? (
        <p className="font-body text-sm text-[#0C0B09] leading-relaxed whitespace-pre-wrap">{value}</p>
      ) : (
        <p className="font-body text-sm text-[#0C0B09]">{value}</p>
      )}
    </div>
  );
}

// ── Main table ────────────────────────────────────────────────────────
const TYPES = ["all", "contact", "brief", "sondage", "artiste", "projet"] as const;
const STATUSES = ["all", "new", "read", "archived"] as const;

export default function LeadsTable({ leads }: { leads: Lead[] }) {
  const [typeFilter, setTypeFilter] = useState<(typeof TYPES)[number]>("all");
  const [statusFilter, setStatusFilter] = useState<(typeof STATUSES)[number]>("all");
  const [selected, setSelected] = useState<Lead | null>(null);

  const filtered = leads.filter((l) => {
    if (typeFilter !== "all" && l.type !== typeFilter) return false;
    if (statusFilter !== "all" && l.status !== statusFilter) return false;
    return true;
  });

  const newCount = leads.filter((l) => l.status === "new").length;

  return (
    <>
      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="flex rounded-xl border border-[#E7E5E4] bg-white overflow-hidden">
          {TYPES.map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-3 py-2 font-body text-xs font-medium transition-colors ${
                typeFilter === t
                  ? "bg-[#0C0B09] text-white"
                  : "text-[#78716C] hover:bg-[#F5F5F4]"
              }`}
            >
              {t === "all" ? "Tous" : TYPE_LABELS[t as keyof typeof TYPE_LABELS]}
            </button>
          ))}
        </div>

        <div className="flex rounded-xl border border-[#E7E5E4] bg-white overflow-hidden">
          {STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-2 font-body text-xs font-medium transition-colors ${
                statusFilter === s
                  ? "bg-[#0C0B09] text-white"
                  : "text-[#78716C] hover:bg-[#F5F5F4]"
              }`}
            >
              {s === "all"
                ? "Tous statuts"
                : STATUS_LABELS[s as keyof typeof STATUS_LABELS]}
            </button>
          ))}
        </div>

        <span className="ml-auto self-center font-body text-xs text-[#A8A29E]">
          {filtered.length} résultat{filtered.length !== 1 ? "s" : ""}
          {newCount > 0 && (
            <span className="ml-2 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              {newCount} nouveau{newCount !== 1 ? "x" : ""}
            </span>
          )}
        </span>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="font-body text-[#A8A29E]">Aucun lead pour ces filtres.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-[#E7E5E4] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#E7E5E4] bg-[#F5F5F4]">
                  <th className="text-left px-5 py-3 font-body text-xs font-semibold text-[#A8A29E] uppercase tracking-wide">Date</th>
                  <th className="text-left px-5 py-3 font-body text-xs font-semibold text-[#A8A29E] uppercase tracking-wide">Type</th>
                  <th className="text-left px-5 py-3 font-body text-xs font-semibold text-[#A8A29E] uppercase tracking-wide">Contact</th>
                  <th className="text-left px-5 py-3 font-body text-xs font-semibold text-[#A8A29E] uppercase tracking-wide hidden md:table-cell">Email</th>
                  <th className="text-left px-5 py-3 font-body text-xs font-semibold text-[#A8A29E] uppercase tracking-wide">Statut</th>
                  <th className="w-10" />
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F5F5F4]">
                {filtered.map((lead) => (
                  <tr
                    key={lead.id}
                    onClick={() => setSelected(lead)}
                    className={`cursor-pointer hover:bg-[#FAFAF8] transition-colors ${
                      lead.status === "new" ? "bg-white" : "bg-white/60"
                    }`}
                  >
                    <td className="px-5 py-3.5 font-body text-xs text-[#A8A29E] whitespace-nowrap">
                      {new Date(lead.created_at).toLocaleDateString("fr-SN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-body font-semibold border ${TYPE_COLORS[lead.type]}`}
                      >
                        {TYPE_LABELS[lead.type]}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 font-body text-sm font-medium text-[#0C0B09]">
                      {getLeadName(lead)}
                    </td>
                    <td className="px-5 py-3.5 font-body text-sm text-[#78716C] hidden md:table-cell">
                      {getLeadEmail(lead)}
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-body font-semibold border ${STATUS_COLORS[lead.status]}`}
                      >
                        {STATUS_LABELS[lead.status]}
                      </span>
                    </td>
                    <td className="px-3 py-3.5 text-[#A8A29E]">
                      <ChevronRight size={14} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Drawer */}
      {selected && <LeadDrawer lead={selected} onClose={() => setSelected(null)} />}
    </>
  );
}
