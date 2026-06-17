import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-ssr";
import { getSupabase, type Project, type ProjectUpdate, type ProjectMessage, type ProjectFinancial } from "@/lib/supabase";
import { ArrowLeft, Paperclip, CreditCard, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";
import MessageThread from "@/components/espace-client/MessageThread";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const { data } = await getSupabase().from("projects").select("title").eq("id", id).single();
  return { title: `${data?.title ?? "Projet"} — Espace Client KEKELI` };
}

/* ── Carte financière ───────────────────────────────────── */
function FinancialCard({ financial }: { financial: ProjectFinancial }) {
  const { quoted, paid, currency } = financial;
  const remaining = Math.max(0, quoted - paid);
  const pct = quoted > 0 ? Math.min(100, Math.round((paid / quoted) * 100)) : 0;
  const fmt = (n: number) => n.toLocaleString("fr-SN") + " " + currency;
  const isPaid = remaining === 0;

  return (
    <div className="bg-white rounded-2xl border border-[#E7E5E4] p-5 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-7 h-7 rounded-lg bg-[#C8A84B]/12 flex items-center justify-center">
          <CreditCard size={14} className="text-[#C8A84B]" />
        </div>
        <h2 className="font-display text-sm font-semibold text-[#0C0B09]">Devis & Paiement</h2>
        {isPaid && (
          <span className="ml-auto flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-body text-[10px] font-semibold">
            <CheckCircle size={10} /> Soldé
          </span>
        )}
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="text-center p-3 rounded-xl" style={{ background: "#FAFAF8", border: "1px solid #F0EDE8" }}>
          <p className="font-body text-[10px] text-[#A8A29E] uppercase tracking-wide mb-1">Devis</p>
          <p className="font-body text-sm font-bold text-[#0C0B09]">{fmt(quoted)}</p>
        </div>
        <div className="text-center p-3 rounded-xl" style={{ background: "#F0FDF4", border: "1px solid #BBF7D0" }}>
          <p className="font-body text-[10px] text-emerald-600 uppercase tracking-wide mb-1">Payé</p>
          <p className="font-body text-sm font-bold text-emerald-700">{fmt(paid)}</p>
        </div>
        <div className="text-center p-3 rounded-xl" style={{ background: isPaid ? "#F0FDF4" : "#FFFBEB", border: `1px solid ${isPaid ? "#BBF7D0" : "#FDE68A"}` }}>
          <p className="font-body text-[10px] uppercase tracking-wide mb-1" style={{ color: isPaid ? "#059669" : "#B45309" }}>
            Reste
          </p>
          <p className="font-body text-sm font-bold" style={{ color: isPaid ? "#059669" : "#D97706" }}>
            {fmt(remaining)}
          </p>
        </div>
      </div>

      {/* Barre de progression paiement */}
      <div className="mb-2">
        <div className="flex justify-between items-center mb-1.5">
          <span className="font-body text-[10px] text-[#A8A29E]">Progression paiement</span>
          <span className="font-body text-xs font-semibold text-[#0C0B09]">{pct}%</span>
        </div>
        <div className="h-2 bg-[#F5F5F4] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${pct}%`, background: isPaid ? "#10B981" : "linear-gradient(90deg, #C8A84B, #D4A83A)" }}
          />
        </div>
      </div>

      {financial.notes && (
        <p className="font-body text-xs text-[#78716C] flex items-start gap-1.5 mt-3">
          <Clock size={11} className="shrink-0 mt-0.5 text-[#A8A29E]" />
          {financial.notes}
        </p>
      )}
    </div>
  );
}

const STATUS_LABELS: Record<Project["status"], string> = {
  en_attente: "En attente",
  en_cours: "En cours",
  termine: "Terminé",
  suspendu: "Suspendu",
};

const STATUS_COLORS: Record<Project["status"], string> = {
  en_attente: "bg-amber-100 text-amber-700",
  en_cours: "bg-blue-100 text-blue-700",
  termine: "bg-emerald-100 text-emerald-700",
  suspendu: "bg-[#E7E5E4] text-[#78716C]",
};

export default async function ProjetDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const db = getSupabase();

  const PAGE_SIZE = 30;

  const [projectRes, updatesRes, messagesRes, countRes] = await Promise.all([
    db.from("projects").select("*").eq("id", id).eq("client_id", user.id).single(),
    db.from("project_updates").select("*").eq("project_id", id).order("created_at", { ascending: false }),
    db.from("project_messages").select("*").eq("project_id", id).order("created_at", { ascending: false }).limit(PAGE_SIZE),
    db.from("project_messages").select("*", { count: "exact", head: true }).eq("project_id", id),
  ]);

  if (!projectRes.data) notFound();

  const project = projectRes.data as Project;
  const updates = (updatesRes.data ?? []) as ProjectUpdate[];
  const messages = ((messagesRes.data ?? []) as ProjectMessage[]).reverse();
  const totalMessages = countRes.count ?? 0;

  // Mark unread agency messages as read
  const unreadIds = messages
    .filter((m) => m.sender_type === "agency" && !m.read_at)
    .map((m) => m.id);

  if (unreadIds.length > 0) {
    db.from("project_messages")
      .update({ read_at: new Date().toISOString() })
      .in("id", unreadIds)
      .then(() => {});
  }

  return (
    <div>
      {/* Back */}
      <Link
        href="/espace-client/projets"
        className="inline-flex items-center gap-2 font-body text-sm text-[#78716C] hover:text-[#0C0B09] mb-6 transition-colors"
      >
        <ArrowLeft size={16} />
        Mes projets
      </Link>

      {/* Project header */}
      <div className="bg-white rounded-2xl border border-[#E7E5E4] p-6 mb-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h1 className="font-display text-xl text-[#0C0B09] mb-1">{project.title}</h1>
            {project.description && (
              <p className="font-body text-sm text-[#78716C]">{project.description}</p>
            )}
          </div>
          <span
            className={`shrink-0 px-3 py-1.5 rounded-full font-body text-xs font-medium ${STATUS_COLORS[project.status]}`}
          >
            {STATUS_LABELS[project.status]}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex-1 h-2.5 bg-[#F5F5F4] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#C8A84B] rounded-full transition-all duration-700"
              style={{ width: `${project.progress}%` }}
            />
          </div>
          <span className="font-display text-sm font-semibold text-[#0C0B09] shrink-0">
            {project.progress}%
          </span>
        </div>
      </div>

      {/* ── Devis & Paiement ─────────────────────────────── */}
      {project.financial ? (
        <FinancialCard financial={project.financial} />
      ) : null}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Updates timeline */}
        <div>
          <h2 className="font-display text-base font-semibold text-[#0C0B09] mb-4">
            Mises à jour ({updates.length})
          </h2>

          {updates.length === 0 ? (
            <div className="bg-white rounded-2xl border border-[#E7E5E4] p-8 text-center">
              <p className="font-body text-sm text-[#78716C]">Aucune mise à jour pour le moment.</p>
            </div>
          ) : (
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 top-4 bottom-4 w-px bg-[#E7E5E4]" />

              <div className="space-y-4">
                {updates.map((update, i) => (
                  <div key={update.id} className="relative pl-10">
                    {/* Dot */}
                    <div
                      className={`absolute left-2.5 top-4 w-3 h-3 rounded-full border-2 ${
                        i === 0
                          ? "bg-[#C8A84B] border-[#C8A84B]"
                          : "bg-white border-[#E7E5E4]"
                      }`}
                    />

                    <div className="bg-white rounded-2xl border border-[#E7E5E4] p-4">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-body text-sm font-semibold text-[#0C0B09]">
                          {update.title}
                        </h3>
                        {update.progress !== null && (
                          <span className="shrink-0 font-body text-xs text-[#C8A84B] font-medium">
                            {update.progress}%
                          </span>
                        )}
                      </div>

                      <p className="font-body text-sm text-[#78716C] leading-relaxed mb-3">
                        {update.content}
                      </p>

                      {update.status && (
                        <span className={`inline-block px-2 py-0.5 rounded-full font-body text-xs font-medium mb-3 ${
                          STATUS_COLORS[update.status as Project["status"]] ?? "bg-[#F5F5F4] text-[#78716C]"
                        }`}>
                          {STATUS_LABELS[update.status as Project["status"]] ?? update.status}
                        </span>
                      )}

                      {update.attachments?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {update.attachments.map((att) => (
                            <a
                              key={att.url}
                              href={att.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F5F5F4] border border-[#E7E5E4] font-body text-xs text-[#78716C] hover:text-[#0C0B09] hover:border-[#C8A84B]/40 transition-colors"
                            >
                              <Paperclip size={11} />
                              {att.name}
                            </a>
                          ))}
                        </div>
                      )}

                      <time className="font-body text-xs text-[#A8A29E]">
                        {new Date(update.created_at).toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </time>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Messages */}
        <div>
          <h2 className="font-display text-base font-semibold text-[#0C0B09] mb-4">
            Messages ({messages.length})
          </h2>
          <MessageThread
            projectId={project.id}
            initialMessages={messages}
            currentUserId={user.id}
            totalMessages={totalMessages}
          />
        </div>
      </div>
    </div>
  );
}
