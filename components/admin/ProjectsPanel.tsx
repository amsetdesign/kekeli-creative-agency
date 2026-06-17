"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Plus, Send, CheckCircle, CreditCard } from "lucide-react";
import type { Project, ClientProfile, ProjectMessage, ProjectFinancial } from "@/lib/supabase";

interface ProjectWithClient extends Omit<Project, "client_profiles"> {
  client_profiles: Pick<ClientProfile, "full_name" | "company" | "email"> | null;
}

interface Props {
  projects: ProjectWithClient[];
  clients: ClientProfile[];
}

const STATUS_OPTIONS: { value: Project["status"]; label: string }[] = [
  { value: "en_attente", label: "En attente" },
  { value: "en_cours",   label: "En cours" },
  { value: "termine",    label: "Terminé" },
  { value: "suspendu",   label: "Suspendu" },
];

const STATUS_COLORS: Record<Project["status"], string> = {
  en_attente: "bg-amber-100 text-amber-700",
  en_cours:   "bg-blue-100 text-blue-700",
  termine:    "bg-emerald-100 text-emerald-700",
  suspendu:   "bg-[#E7E5E4] text-[#78716C]",
};

export default function ProjectsPanel({ projects: initialProjects, clients }: Props) {
  const router = useRouter();
  const [projects, setProjects] = useState(initialProjects);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [activeTab, setActiveTab] = useState<Record<string, "updates" | "messages" | "financier">>({});

  // Create project state
  const [creating, setCreating] = useState(false);
  const [newProject, setNewProject] = useState({
    client_id: "",
    title: "",
    description: "",
    status: "en_attente" as Project["status"],
    progress: 0,
  });

  // Per-project update form state
  const [updateForms, setUpdateForms] = useState<Record<string, {
    title: string; content: string; progress: string; status: string; submitting: boolean;
  }>>({});

  // Per-project message form state
  const [messageForms, setMessageForms] = useState<Record<string, { content: string; submitting: boolean }>>({});

  // Per-project messages data
  const [projectMessages, setProjectMessages] = useState<Record<string, ProjectMessage[]>>({});

  // Per-project financial form state
  const [financialForms, setFinancialForms] = useState<Record<string, {
    quoted: string; paid: string; currency: string; notes: string; submitting: boolean; saved: boolean;
  }>>({});

  function getUpdateForm(id: string) {
    return updateForms[id] ?? { title: "", content: "", progress: "", status: "", submitting: false };
  }

  function setUpdateForm(id: string, patch: Partial<typeof updateForms[string]>) {
    setUpdateForms((prev) => ({ ...prev, [id]: { ...getUpdateForm(id), ...patch } }));
  }

  function getMessageForm(id: string) {
    return messageForms[id] ?? { content: "", submitting: false };
  }

  function setMessageForm(id: string, patch: Partial<typeof messageForms[string]>) {
    setMessageForms((prev) => ({ ...prev, [id]: { ...getMessageForm(id), ...patch } }));
  }

  function getFinancialForm(id: string, existing?: ProjectFinancial | null) {
    return financialForms[id] ?? {
      quoted:   existing ? String(existing.quoted) : "",
      paid:     existing ? String(existing.paid)   : "",
      currency: existing?.currency ?? "FCFA",
      notes:    existing?.notes ?? "",
      submitting: false,
      saved: false,
    };
  }

  function setFinancialForm(id: string, patch: Partial<typeof financialForms[string]>) {
    setFinancialForms((prev) => ({ ...prev, [id]: { ...getFinancialForm(id), ...patch } }));
  }

  async function saveFinancial(projectId: string, existing?: ProjectFinancial | null) {
    const form = getFinancialForm(projectId, existing);
    const quoted = parseFloat(form.quoted);
    const paid   = parseFloat(form.paid);
    if (isNaN(quoted) || isNaN(paid)) return;
    setFinancialForm(projectId, { submitting: true, saved: false });

    try {
      const financial: ProjectFinancial = {
        quoted,
        paid,
        currency: form.currency || "FCFA",
        notes: form.notes.trim() || undefined,
      };
      const res = await fetch("/api/admin/projects", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: projectId, financial }),
      });

      if (res.ok) {
        setProjects((prev) =>
          prev.map((p) => p.id === projectId ? { ...p, financial } : p),
        );
        setFinancialForm(projectId, { submitting: false, saved: true });
        setTimeout(() => setFinancialForm(projectId, { saved: false }), 3000);
      } else {
        setFinancialForm(projectId, { submitting: false });
      }
    } catch {
      setFinancialForm(projectId, { submitting: false });
    }
  }

  async function createProject() {
    if (!newProject.client_id || !newProject.title) return;
    setCreating(true);
    try {
      const res = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "create_project", ...newProject }),
      });
      const json = await res.json();
      if (res.ok) {
        const client = clients.find((c) => c.id === newProject.client_id);
        setProjects((prev) => [{
          ...json.data,
          client_profiles: client
            ? { full_name: client.full_name, company: client.company, email: client.email }
            : null,
        }, ...prev]);
        setNewProject({ client_id: "", title: "", description: "", status: "en_attente", progress: 0 });
        setShowCreateForm(false);
        router.refresh();
      }
    } finally {
      setCreating(false);
    }
  }

  async function loadMessages(projectId: string) {
    if (projectMessages[projectId]) return;
    try {
      const res = await fetch(`/api/admin/projects/${projectId}/messages`);
      if (res.ok) {
        const data = await res.json();
        setProjectMessages((prev) => ({ ...prev, [projectId]: data }));
      }
    } catch {}
  }

  async function submitUpdate(projectId: string) {
    const form = getUpdateForm(projectId);
    if (!form.title || !form.content) return;
    setUpdateForm(projectId, { submitting: true });

    try {
      const res = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "add_update",
          project_id: projectId,
          title: form.title,
          content: form.content,
          progress: form.progress ? parseInt(form.progress) : null,
          status: form.status || null,
        }),
      });

      if (res.ok) {
        if (form.progress) {
          setProjects((prev) =>
            prev.map((p) =>
              p.id === projectId
                ? { ...p, progress: parseInt(form.progress), ...(form.status ? { status: form.status as Project["status"] } : {}) }
                : p,
            ),
          );
        }
        setUpdateForm(projectId, { title: "", content: "", progress: "", status: "", submitting: false });
        router.refresh();
      }
    } catch {
      setUpdateForm(projectId, { submitting: false });
    }
  }

  async function sendMessage(projectId: string) {
    const form = getMessageForm(projectId);
    if (!form.content.trim()) return;
    setMessageForm(projectId, { submitting: true });

    try {
      const res = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "send_message", project_id: projectId, content: form.content }),
      });

      const json = await res.json();
      if (res.ok) {
        setProjectMessages((prev) => ({
          ...prev,
          [projectId]: [...(prev[projectId] ?? []), json.data],
        }));
        setMessageForm(projectId, { content: "", submitting: false });
      }
    } catch {
      setMessageForm(projectId, { submitting: false });
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <span className="font-body text-xs text-[#A8A29E]">
          {projects.length} projet{projects.length !== 1 ? "s" : ""}
        </span>
        <button
          onClick={() => setShowCreateForm((v) => !v)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0C0B09] text-white font-body text-xs font-medium hover:bg-[#1a1916] transition-colors"
        >
          <Plus size={14} />
          Nouveau projet
        </button>
      </div>

      {/* Create project form */}
      {showCreateForm && (
        <div className="bg-white rounded-2xl border border-[#C8A84B]/40 p-5 mb-5">
          <h3 className="font-body text-sm font-semibold text-[#0C0B09] mb-4">Créer un projet</h3>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="col-span-2 sm:col-span-1">
              <label className="block font-body text-xs text-[#78716C] mb-1">Client *</label>
              <select
                value={newProject.client_id}
                onChange={(e) => setNewProject((p) => ({ ...p, client_id: e.target.value }))}
                className="w-full px-3 py-2.5 rounded-xl border border-[#E7E5E4] bg-[#FAFAF8] font-body text-sm text-[#0C0B09] focus:outline-none focus:ring-2 focus:ring-[#C8A84B]/30"
              >
                <option value="">Sélectionner un client</option>
                {clients.filter((c) => c.status === "active").map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.full_name}{c.company ? ` — ${c.company}` : ""}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="block font-body text-xs text-[#78716C] mb-1">Statut</label>
              <select
                value={newProject.status}
                onChange={(e) => setNewProject((p) => ({ ...p, status: e.target.value as Project["status"] }))}
                className="w-full px-3 py-2.5 rounded-xl border border-[#E7E5E4] bg-[#FAFAF8] font-body text-sm text-[#0C0B09] focus:outline-none focus:ring-2 focus:ring-[#C8A84B]/30"
              >
                {STATUS_OPTIONS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>
            <div className="col-span-2">
              <label className="block font-body text-xs text-[#78716C] mb-1">Titre *</label>
              <input
                value={newProject.title}
                onChange={(e) => setNewProject((p) => ({ ...p, title: e.target.value }))}
                placeholder="Ex: Stratégie de communication digitale"
                className="w-full px-3 py-2.5 rounded-xl border border-[#E7E5E4] bg-[#FAFAF8] font-body text-sm text-[#0C0B09] placeholder:text-[#A8A29E] focus:outline-none focus:ring-2 focus:ring-[#C8A84B]/30"
              />
            </div>
            <div className="col-span-2">
              <label className="block font-body text-xs text-[#78716C] mb-1">Description</label>
              <input
                value={newProject.description}
                onChange={(e) => setNewProject((p) => ({ ...p, description: e.target.value }))}
                placeholder="Description courte..."
                className="w-full px-3 py-2.5 rounded-xl border border-[#E7E5E4] bg-[#FAFAF8] font-body text-sm text-[#0C0B09] placeholder:text-[#A8A29E] focus:outline-none focus:ring-2 focus:ring-[#C8A84B]/30"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={createProject}
              disabled={creating || !newProject.client_id || !newProject.title}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0C0B09] text-white font-body text-xs font-medium hover:bg-[#1a1916] disabled:opacity-60 transition-colors"
            >
              <CheckCircle size={13} />
              {creating ? "Création..." : "Créer le projet"}
            </button>
            <button
              onClick={() => setShowCreateForm(false)}
              className="px-4 py-2 rounded-xl border border-[#E7E5E4] font-body text-xs text-[#78716C] hover:border-[#0C0B09] transition-colors"
            >
              Annuler
            </button>
          </div>
        </div>
      )}

      {/* Projects list */}
      {projects.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#E7E5E4] p-12 text-center">
          <p className="font-body text-sm text-[#78716C]">Aucun projet. Créez le premier !</p>
        </div>
      ) : (
        <div className="space-y-3">
          {projects.map((project) => {
            const isExpanded = expandedId === project.id;
            const tab = activeTab[project.id] ?? "updates";
            const updateForm = getUpdateForm(project.id);
            const messageForm = getMessageForm(project.id);
            const msgs = projectMessages[project.id] ?? [];

            return (
              <div key={project.id} className="bg-white rounded-2xl border border-[#E7E5E4] overflow-hidden">
                {/* Row */}
                <button
                  onClick={() => {
                    setExpandedId(isExpanded ? null : project.id);
                    if (!isExpanded) loadMessages(project.id);
                  }}
                  className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-[#FAFAF8] transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="font-body text-sm font-semibold text-[#0C0B09] truncate">{project.title}</p>
                      <span className={`shrink-0 px-2 py-0.5 rounded-full font-body text-[10px] font-medium ${STATUS_COLORS[project.status]}`}>
                        {STATUS_OPTIONS.find((s) => s.value === project.status)?.label}
                      </span>
                    </div>
                    <p className="font-body text-xs text-[#A8A29E] truncate">
                      {project.client_profiles?.full_name ?? "—"}
                      {project.client_profiles?.company ? ` · ${project.client_profiles.company}` : ""}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-1.5 bg-[#F5F5F4] rounded-full overflow-hidden">
                        <div className="h-full bg-[#C8A84B] rounded-full" style={{ width: `${project.progress}%` }} />
                      </div>
                      <span className="font-body text-xs text-[#78716C] w-9 text-right">{project.progress}%</span>
                    </div>
                    <ChevronDown size={16} className={`text-[#A8A29E] transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                  </div>
                </button>

                {/* Expanded */}
                {isExpanded && (
                  <div className="border-t border-[#E7E5E4]">
                    {/* Tab switcher */}
                    <div className="flex border-b border-[#E7E5E4] px-5">
                      {(["updates", "messages", "financier"] as const).map((t) => (
                        <button
                          key={t}
                          onClick={() => setActiveTab((p) => ({ ...p, [project.id]: t }))}
                          className={`px-4 py-3 font-body text-xs font-medium border-b-2 -mb-px transition-colors ${
                            tab === t
                              ? "border-[#0C0B09] text-[#0C0B09]"
                              : "border-transparent text-[#A8A29E] hover:text-[#78716C]"
                          }`}
                        >
                          {t === "updates" ? "Mise à jour" : t === "messages" ? "Messages" : "Devis & Paiement"}
                        </button>
                      ))}
                    </div>

                    <div className="p-5">
                      {/* Updates form */}
                      {tab === "updates" && (
                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-3">
                            <div className="col-span-2">
                              <input
                                value={updateForm.title}
                                onChange={(e) => setUpdateForm(project.id, { title: e.target.value })}
                                placeholder="Titre de la mise à jour *"
                                className="w-full px-3 py-2.5 rounded-xl border border-[#E7E5E4] bg-[#FAFAF8] font-body text-sm text-[#0C0B09] placeholder:text-[#A8A29E] focus:outline-none focus:ring-2 focus:ring-[#C8A84B]/30"
                              />
                            </div>
                            <div>
                              <input
                                type="number"
                                min={0}
                                max={100}
                                value={updateForm.progress}
                                onChange={(e) => setUpdateForm(project.id, { progress: e.target.value })}
                                placeholder="Avancement % (optionnel)"
                                className="w-full px-3 py-2.5 rounded-xl border border-[#E7E5E4] bg-[#FAFAF8] font-body text-sm text-[#0C0B09] placeholder:text-[#A8A29E] focus:outline-none focus:ring-2 focus:ring-[#C8A84B]/30"
                              />
                            </div>
                            <div>
                              <select
                                value={updateForm.status}
                                onChange={(e) => setUpdateForm(project.id, { status: e.target.value })}
                                className="w-full px-3 py-2.5 rounded-xl border border-[#E7E5E4] bg-[#FAFAF8] font-body text-sm text-[#0C0B09] focus:outline-none focus:ring-2 focus:ring-[#C8A84B]/30"
                              >
                                <option value="">Statut (optionnel)</option>
                                {STATUS_OPTIONS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                              </select>
                            </div>
                            <div className="col-span-2">
                              <textarea
                                rows={3}
                                value={updateForm.content}
                                onChange={(e) => setUpdateForm(project.id, { content: e.target.value })}
                                placeholder="Détails de la mise à jour... *"
                                className="w-full resize-none px-3 py-2.5 rounded-xl border border-[#E7E5E4] bg-[#FAFAF8] font-body text-sm text-[#0C0B09] placeholder:text-[#A8A29E] focus:outline-none focus:ring-2 focus:ring-[#C8A84B]/30"
                              />
                            </div>
                          </div>
                          <button
                            disabled={!updateForm.title || !updateForm.content || updateForm.submitting}
                            onClick={() => submitUpdate(project.id)}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0C0B09] text-white font-body text-xs font-medium hover:bg-[#1a1916] disabled:opacity-60 transition-colors"
                          >
                            <CheckCircle size={13} />
                            {updateForm.submitting ? "Envoi..." : "Publier la mise à jour"}
                          </button>
                        </div>
                      )}

                      {/* Financial tab */}
                      {tab === "financier" && (() => {
                        const fin = project.financial;
                        const form = getFinancialForm(project.id, fin);
                        const quoted = parseFloat(form.quoted) || 0;
                        const paid   = parseFloat(form.paid)   || 0;
                        const remaining = Math.max(0, quoted - paid);
                        const pct = quoted > 0 ? Math.min(100, Math.round((paid / quoted) * 100)) : 0;
                        const fmt = (n: number) => n.toLocaleString("fr-SN") + " " + (form.currency || "FCFA");

                        return (
                          <div className="space-y-4">
                            {/* Preview card */}
                            {quoted > 0 && (
                              <div className="grid grid-cols-3 gap-2 text-center mb-1">
                                <div className="p-3 rounded-xl bg-[#FAFAF8] border border-[#F0EDE8]">
                                  <p className="font-body text-[10px] text-[#A8A29E] uppercase tracking-wide mb-0.5">Devis</p>
                                  <p className="font-body text-xs font-bold text-[#0C0B09]">{fmt(quoted)}</p>
                                </div>
                                <div className="p-3 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0]">
                                  <p className="font-body text-[10px] text-emerald-600 uppercase tracking-wide mb-0.5">Payé</p>
                                  <p className="font-body text-xs font-bold text-emerald-700">{fmt(paid)}</p>
                                </div>
                                <div className="p-3 rounded-xl bg-[#FFFBEB] border border-[#FDE68A]">
                                  <p className="font-body text-[10px] text-amber-600 uppercase tracking-wide mb-0.5">Reste</p>
                                  <p className="font-body text-xs font-bold text-amber-700">{fmt(remaining)}</p>
                                </div>
                              </div>
                            )}
                            {quoted > 0 && (
                              <div className="mb-1">
                                <div className="flex justify-between mb-1">
                                  <span className="font-body text-[10px] text-[#A8A29E]">Progression paiement</span>
                                  <span className="font-body text-[10px] font-semibold text-[#0C0B09]">{pct}%</span>
                                </div>
                                <div className="h-1.5 bg-[#F5F5F4] rounded-full overflow-hidden">
                                  <div
                                    className="h-full rounded-full transition-all duration-500"
                                    style={{ width: `${pct}%`, background: pct >= 100 ? "#10B981" : "linear-gradient(90deg, #C8A84B, #D4A83A)" }}
                                  />
                                </div>
                              </div>
                            )}

                            {/* Form */}
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="block font-body text-xs text-[#78716C] mb-1">Montant devis *</label>
                                <input
                                  type="number"
                                  min={0}
                                  value={form.quoted}
                                  onChange={(e) => setFinancialForm(project.id, { quoted: e.target.value })}
                                  placeholder="Ex: 350000"
                                  className="w-full px-3 py-2.5 rounded-xl border border-[#E7E5E4] bg-[#FAFAF8] font-body text-sm text-[#0C0B09] placeholder:text-[#A8A29E] focus:outline-none focus:ring-2 focus:ring-[#C8A84B]/30"
                                />
                              </div>
                              <div>
                                <label className="block font-body text-xs text-[#78716C] mb-1">Montant payé *</label>
                                <input
                                  type="number"
                                  min={0}
                                  value={form.paid}
                                  onChange={(e) => setFinancialForm(project.id, { paid: e.target.value })}
                                  placeholder="Ex: 175000"
                                  className="w-full px-3 py-2.5 rounded-xl border border-[#E7E5E4] bg-[#FAFAF8] font-body text-sm text-[#0C0B09] placeholder:text-[#A8A29E] focus:outline-none focus:ring-2 focus:ring-[#C8A84B]/30"
                                />
                              </div>
                              <div>
                                <label className="block font-body text-xs text-[#78716C] mb-1">Devise</label>
                                <select
                                  value={form.currency}
                                  onChange={(e) => setFinancialForm(project.id, { currency: e.target.value })}
                                  className="w-full px-3 py-2.5 rounded-xl border border-[#E7E5E4] bg-[#FAFAF8] font-body text-sm text-[#0C0B09] focus:outline-none focus:ring-2 focus:ring-[#C8A84B]/30"
                                >
                                  <option value="FCFA">FCFA</option>
                                  <option value="EUR">EUR</option>
                                  <option value="USD">USD</option>
                                </select>
                              </div>
                              <div>
                                <label className="block font-body text-xs text-[#78716C] mb-1">Note interne (visible client)</label>
                                <input
                                  value={form.notes}
                                  onChange={(e) => setFinancialForm(project.id, { notes: e.target.value })}
                                  placeholder="Ex: Solde à régler à la livraison"
                                  className="w-full px-3 py-2.5 rounded-xl border border-[#E7E5E4] bg-[#FAFAF8] font-body text-sm text-[#0C0B09] placeholder:text-[#A8A29E] focus:outline-none focus:ring-2 focus:ring-[#C8A84B]/30"
                                />
                              </div>
                            </div>
                            <button
                              disabled={!form.quoted || !form.paid || form.submitting}
                              onClick={() => saveFinancial(project.id, fin)}
                              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0C0B09] text-white font-body text-xs font-medium hover:bg-[#1a1916] disabled:opacity-60 transition-colors"
                            >
                              {form.submitting ? (
                                <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              ) : form.saved ? (
                                <CheckCircle size={13} />
                              ) : (
                                <CreditCard size={13} />
                              )}
                              {form.submitting ? "Sauvegarde..." : form.saved ? "Enregistré !" : "Enregistrer"}
                            </button>
                          </div>
                        );
                      })()}

                      {/* Messages tab */}
                      {tab === "messages" && (
                        <div>
                          {msgs.length === 0 ? (
                            <p className="font-body text-xs text-[#A8A29E] mb-4">Aucun message pour ce projet.</p>
                          ) : (
                            <div className="space-y-2 mb-4 max-h-64 overflow-y-auto">
                              {msgs.map((msg) => (
                                <div
                                  key={msg.id}
                                  className={`flex ${msg.sender_type === "agency" ? "justify-end" : "justify-start"}`}
                                >
                                  <div className={`max-w-[80%] flex flex-col ${msg.sender_type === "agency" ? "items-end" : "items-start"}`}>
                                    <span className="font-body text-[10px] text-[#A8A29E] mb-0.5 px-1">{msg.sender_name}</span>
                                    <div className={`px-3 py-2 rounded-xl font-body text-xs leading-relaxed ${
                                      msg.sender_type === "agency"
                                        ? "bg-[#0C0B09] text-white"
                                        : "bg-[#F5F5F4] text-[#0C0B09]"
                                    }`}>
                                      {msg.content}
                                    </div>
                                    <time className="font-body text-[10px] text-[#A8A29E] mt-0.5 px-1">
                                      {new Date(msg.created_at).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}
                                    </time>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          <div className="flex gap-2">
                            <textarea
                              rows={2}
                              value={messageForm.content}
                              onChange={(e) => setMessageForm(project.id, { content: e.target.value })}
                              placeholder="Votre réponse..."
                              className="flex-1 resize-none px-3 py-2.5 rounded-xl border border-[#E7E5E4] bg-[#FAFAF8] font-body text-sm text-[#0C0B09] placeholder:text-[#A8A29E] focus:outline-none focus:ring-2 focus:ring-[#C8A84B]/30"
                            />
                            <button
                              disabled={!messageForm.content.trim() || messageForm.submitting}
                              onClick={() => sendMessage(project.id)}
                              className="w-10 h-10 self-end rounded-xl bg-[#0C0B09] flex items-center justify-center text-white disabled:opacity-40 hover:bg-[#1a1916] transition-colors"
                            >
                              {messageForm.submitting ? (
                                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              ) : (
                                <Send size={15} />
                              )}
                            </button>
                          </div>
                        </div>
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
