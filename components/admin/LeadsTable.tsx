"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { X, Mail, Phone, ChevronRight, Archive, Eye, Download, CheckSquare, Square, CheckCheck } from "lucide-react";
import type { Lead } from "@/lib/supabase";

const TYPE_LABELS = {
  contact:        "Contact",
  brief:          "Brief",
  sondage:        "Sondage",
  artiste:        "🎤 Artiste",
  entreprise:     "🏢 Entreprise",
  projet:         "📋 Projet",
  guide_download: "📥 Téléchargement",
} as const;

const TYPE_COLORS = {
  contact:        "bg-blue-50 text-blue-700 border-blue-200",
  brief:          "bg-amber-50 text-amber-700 border-amber-200",
  sondage:        "bg-violet-50 text-violet-700 border-violet-200",
  artiste:        "bg-pink-50 text-pink-700 border-pink-200",
  entreprise:     "bg-sky-50 text-sky-700 border-sky-200",
  projet:         "bg-teal-50 text-teal-700 border-teal-200",
  guide_download: "bg-purple-50 text-purple-700 border-purple-200",
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
  if (lead.type === "artiste")        return d.nom_artiste as string ?? "—";
  if (lead.type === "entreprise")     return d.nom_entreprise as string ?? "—";
  if (lead.type === "projet")         return d.client_name as string ?? "—";
  if (lead.type === "guide_download") return d.name as string ?? "—";
  if (lead.type === "sondage") {
    const ui = d.userInfo as Record<string, string> | undefined;
    return ui?.prenom ?? "—";
  }
  return `${d.prenom ?? ""} ${d.nom ?? ""}`.trim() || "—";
}

function getLeadEmail(lead: Lead): string {
  const d = lead.data;
  if (lead.type === "projet")         return d.client_email as string ?? "—";
  if (lead.type === "guide_download") return d.email as string ?? "—";
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
            const ui = d.userInfo as Record<string, string | undefined>;
            const sexeMap: Record<string, string> = { homme: "Homme", femme: "Femme", non_precise: "Non précisé" };
            const ageMap: Record<string, string> = { moins_25: "< 25 ans", "25_35": "25–35 ans", "35_45": "35–45 ans", "45_plus": "45+ ans" };
            const budgetMap: Record<string, string> = { moins_50k: "< 50k FCFA", "50k_150k": "50–150k FCFA", "150k_500k": "150–500k FCFA", "500k_2M": "500k–2M FCFA", "plus_2M": "> 2M FCFA" };
            const urgenceMap: Record<string, string> = { immediat: "🔥 Immédiat", "1_mois": "1 mois", "1_3_mois": "1–3 mois", "plus_3_mois": "3 mois+" };
            const sourceMap: Record<string, string> = { instagram: "Instagram", facebook: "Facebook", tiktok: "TikTok", youtube: "YouTube", bouche_a_oreille: "Bouche à oreille", google: "Google", evenement: "Événement", autre: "Autre" };
            return (
              <div className="space-y-3">
                {ui?.structure && <Field label="Structure" value={ui.structure} />}
                <Field label="Type de profil" value={(d.sondage_type ?? d.type) as string} />
                {/* Score badge */}
                <div className="flex items-center justify-between bg-[#C8A84B]/10 border border-[#C8A84B]/20 rounded-xl px-4 py-3">
                  <span className="font-body text-sm text-[#78716C]">Score</span>
                  <span className="font-display text-2xl font-bold text-[#C8A84B]">
                    {d.score as number}/100
                  </span>
                </div>
                {/* Données démographiques */}
                {(ui?.sexe || ui?.age || ui?.ville || ui?.budget || ui?.urgence || ui?.source) && (
                  <div className="bg-[#F5F5F4] rounded-xl p-4 space-y-2">
                    <p className="font-body text-[10px] font-bold uppercase tracking-[0.15em] text-[#A8A29E] mb-3">Profil démographique</p>
                    {ui.sexe && <Field label="Genre" value={sexeMap[ui.sexe] ?? ui.sexe} />}
                    {ui.age && <Field label="Âge" value={ageMap[ui.age] ?? ui.age} />}
                    {ui.ville && <Field label="Ville" value={ui.ville} />}
                    {ui.budget && <Field label="Budget" value={budgetMap[ui.budget] ?? ui.budget} />}
                    {ui.urgence && <Field label="Délai" value={urgenceMap[ui.urgence] ?? ui.urgence} />}
                    {ui.source && <Field label="Source" value={sourceMap[ui.source] ?? ui.source} />}
                  </div>
                )}
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
            {(() => {
              const phone = lead.type === "sondage"
                ? (lead.data.userInfo as Record<string, string>)?.telephone
                : lead.data.telephone as string | undefined;
              const name = getLeadName(lead);
              const waPhone = phone
                ? phone.replace(/\D/g, "").replace(/^00/, "").replace(/^0/, "221")
                : "221765289111";
              const msg = encodeURIComponent(
                `Bonjour ${name} 👋, je suis KEKELI Creative Agency. Suite à votre ${lead.type === "sondage" ? "audit de visibilité" : "demande"}, je voulais vous contacter pour en discuter. Avez-vous un moment ?`
              );
              return (
                <a
                  href={`https://wa.me/${waPhone}?text=${msg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-[#E7E5E4] font-body text-xs text-[#78716C] hover:border-emerald-400 hover:text-emerald-600 transition-colors"
                >
                  <Phone size={12} /> WhatsApp
                </a>
              );
            })()}
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
  const router = useRouter();
  const [typeFilter, setTypeFilter] = useState<(typeof TYPES)[number]>("all");
  const [statusFilter, setStatusFilter] = useState<(typeof STATUSES)[number]>("all");
  const [selected, setSelected] = useState<Lead | null>(null);
  const [exporting, setExporting] = useState(false);
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [bulkLoading, setBulkLoading] = useState(false);

  async function exportCSV() {
    setExporting(true);
    try {
      const params = new URLSearchParams({ format: "csv" });
      if (typeFilter !== "all")   params.set("type", typeFilter);
      if (statusFilter !== "all") params.set("status", statusFilter);
      const res = await fetch(`/api/admin/leads?${params}`);
      if (!res.ok) throw new Error("Export échoué");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `leads-kekeli-${new Date().toISOString().split("T")[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } finally {
      setExporting(false);
    }
  }

  const filtered = leads.filter((l) => {
    if (typeFilter !== "all" && l.type !== typeFilter) return false;
    if (statusFilter !== "all" && l.status !== statusFilter) return false;
    return true;
  });

  const newCount = leads.filter((l) => l.status === "new").length;
  const allChecked = filtered.length > 0 && filtered.every((l) => checked.has(l.id));
  const someChecked = filtered.some((l) => checked.has(l.id));

  function toggleAll() {
    if (allChecked) {
      setChecked(new Set());
    } else {
      setChecked(new Set(filtered.map((l) => l.id)));
    }
  }

  function toggleOne(id: string) {
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  async function bulkMarkRead() {
    const ids = [...checked].filter((id) => {
      const lead = leads.find((l) => l.id === id);
      return lead?.status === "new";
    });
    if (!ids.length) return;
    setBulkLoading(true);
    try {
      await Promise.all(
        ids.map((id) =>
          fetch("/api/admin/leads", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, status: "read" }),
          })
        )
      );
      setChecked(new Set());
      router.refresh();
    } finally {
      setBulkLoading(false);
    }
  }

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

        <div className="ml-auto flex items-center gap-3">
          {someChecked && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-emerald-200 bg-emerald-50">
              <span className="font-body text-xs text-emerald-700 font-medium">
                {checked.size} sélectionné{checked.size > 1 ? "s" : ""}
              </span>
              <button
                onClick={bulkMarkRead}
                disabled={bulkLoading}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-body text-xs font-medium hover:bg-emerald-700 disabled:opacity-50 transition-colors"
              >
                <CheckCheck size={12} />
                {bulkLoading ? "…" : "Marquer lus"}
              </button>
              <button
                onClick={() => setChecked(new Set())}
                className="text-emerald-400 hover:text-emerald-700 transition-colors"
              >
                <X size={13} />
              </button>
            </div>
          )}
          <span className="font-body text-xs text-[#A8A29E]">
            {filtered.length} résultat{filtered.length !== 1 ? "s" : ""}
            {newCount > 0 && (
              <span className="ml-2 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                {newCount} nouveau{newCount !== 1 ? "x" : ""}
              </span>
            )}
          </span>
          <button
            onClick={exportCSV}
            disabled={exporting}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[#C8A84B] bg-[#FFFBEB] text-[#92400E] font-body text-xs font-medium hover:bg-[#FEF3C7] transition-colors disabled:opacity-50"
          >
            <Download size={13} />
            {exporting ? "Export…" : "CSV"}
          </button>
        </div>
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
                  <th className="px-4 py-3 w-10">
                    <button onClick={toggleAll} className="text-[#A8A29E] hover:text-[#0C0B09] transition-colors">
                      {allChecked ? <CheckSquare size={15} /> : <Square size={15} />}
                    </button>
                  </th>
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
                    className={`hover:bg-[#FAFAF8] transition-colors ${
                      lead.status === "new" ? "bg-white" : "bg-white/60"
                    } ${checked.has(lead.id) ? "bg-emerald-50/40" : ""}`}
                  >
                    <td className="px-4 py-3.5" onClick={(e) => e.stopPropagation()}>
                      <button onClick={() => toggleOne(lead.id)} className="text-[#A8A29E] hover:text-emerald-600 transition-colors">
                        {checked.has(lead.id) ? <CheckSquare size={15} className="text-emerald-600" /> : <Square size={15} />}
                      </button>
                    </td>
                    <td className="px-5 py-3.5 font-body text-xs text-[#A8A29E] whitespace-nowrap cursor-pointer" onClick={() => setSelected(lead)}>
                      {new Date(lead.created_at).toLocaleDateString("fr-SN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-5 py-3.5 cursor-pointer" onClick={() => setSelected(lead)}>
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-body font-semibold border ${TYPE_COLORS[lead.type]}`}>
                        {TYPE_LABELS[lead.type]}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 font-body text-sm font-medium text-[#0C0B09] cursor-pointer" onClick={() => setSelected(lead)}>
                      {getLeadName(lead)}
                    </td>
                    <td className="px-5 py-3.5 font-body text-sm text-[#78716C] hidden md:table-cell cursor-pointer" onClick={() => setSelected(lead)}>
                      {getLeadEmail(lead)}
                    </td>
                    <td className="px-5 py-3.5 cursor-pointer" onClick={() => setSelected(lead)}>
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-body font-semibold border ${STATUS_COLORS[lead.status]}`}>
                        {STATUS_LABELS[lead.status]}
                      </span>
                    </td>
                    <td className="px-3 py-3.5 text-[#A8A29E] cursor-pointer" onClick={() => setSelected(lead)}>
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
