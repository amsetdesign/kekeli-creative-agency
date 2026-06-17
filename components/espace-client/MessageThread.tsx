"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Paperclip, X, FileText, Image, Download, Film, ChevronUp, Loader2 } from "lucide-react";
import type { ProjectMessage, MessageAttachment } from "@/lib/supabase";

/* ── Helpers ──────────────────────────────────────────────── */
function fmtSize(bytes: number) {
  if (bytes < 1024) return `${bytes} o`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} Ko`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`;
}

function FileIcon({ mime }: { mime: string }) {
  if (mime.startsWith("image/")) return <Image size={11} />;
  if (mime.startsWith("video/")) return <Film size={11} />;
  return <FileText size={11} />;
}

function AttachChip({ att, dark }: { att: MessageAttachment; dark?: boolean }) {
  const isImage = att.type.startsWith("image/");
  return (
    <a
      href={att.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg font-body text-xs transition-colors"
      style={dark
        ? { background: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.85)" }
        : { background: "#F5F5F4", border: "1px solid #E7E5E4", color: "#57534E" }
      }
    >
      <FileIcon mime={att.type} />
      {isImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={att.url} alt={att.name} className="w-6 h-6 rounded object-cover shrink-0" />
      )}
      <span className="max-w-[110px] truncate">{att.name}</span>
      <Download size={10} className="shrink-0 opacity-50 group-hover:opacity-100 transition-opacity" />
    </a>
  );
}

type PendingFile = { file: File; error?: string };

/* ── Props ────────────────────────────────────────────────── */
interface Props {
  projectId: string;
  initialMessages: ProjectMessage[];
  currentUserId: string;
  totalMessages?: number;
}

export default function MessageThread({ projectId, initialMessages, totalMessages = 0 }: Props) {
  const [messages, setMessages] = useState(initialMessages);
  const [content, setContent] = useState("");
  const [pending, setPending] = useState<PendingFile[]>([]);
  const [sending, setSending] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const hasMore = messages.length < totalMessages;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function loadMore() {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    const oldest = messages[0]?.created_at;
    try {
      const params = new URLSearchParams({ project_id: projectId, limit: "30" });
      if (oldest) params.set("before", oldest);
      const res  = await fetch(`/api/espace-client/messages?${params}`);
      const json = await res.json();
      if (res.ok && json.messages?.length > 0) {
        const prevHeight = scrollRef.current?.scrollHeight ?? 0;
        setMessages((prev) => [...json.messages, ...prev]);
        requestAnimationFrame(() => {
          if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight - prevHeight;
          }
        });
      }
    } finally {
      setLoadingMore(false);
    }
  }

  function addFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    setPending((prev) => [...prev, ...files.map((f) => ({ file: f }))]);
    e.target.value = "";
  }

  function removeFile(i: number) {
    setPending((prev) => prev.filter((_, idx) => idx !== i));
  }

  async function uploadOne(pf: PendingFile, idx: number): Promise<MessageAttachment | null> {
    const fd = new FormData();
    fd.append("file", pf.file);
    fd.append("project_id", projectId);
    const res = await fetch("/api/espace-client/upload", { method: "POST", body: fd });
    const json = await res.json();
    if (!res.ok) {
      setPending((prev) =>
        prev.map((f, i) => (i === idx ? { ...f, error: json.error ?? "Erreur upload" } : f))
      );
      return null;
    }
    return json as MessageAttachment;
  }

  async function send(e: React.FormEvent) {
    e.preventDefault();
    const hasText = content.trim().length > 0;
    const hasFiles = pending.length > 0;
    if ((!hasText && !hasFiles) || sending) return;
    setError("");
    setSending(true);

    try {
      // Upload files in parallel
      const results = await Promise.all(pending.map((pf, i) => uploadOne(pf, i)));
      if (results.some((r) => r === null)) {
        setError("Certains fichiers n'ont pas pu être uploadés. Corrigez les erreurs et réessayez.");
        setSending(false);
        return;
      }
      const attachments = results as MessageAttachment[];

      const res = await fetch("/api/espace-client/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          project_id: projectId,
          content: hasText ? content.trim() : "",
          attachments,
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Erreur lors de l'envoi.");
      } else {
        setMessages((prev) => [...prev, json.message]);
        setContent("");
        setPending([]);
      }
    } catch {
      setError("Erreur de connexion.");
    } finally {
      setSending(false);
    }
  }

  const canSend = (content.trim().length > 0 || pending.length > 0) && !sending;

  return (
    <div className="bg-white rounded-2xl border border-[#E7E5E4] flex flex-col" style={{ height: 520 }}>

      {/* ── Zone messages ─────────────────────────────────── */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">

        {/* Bouton charger plus */}
        {hasMore && (
          <div className="flex justify-center pb-2">
            <button
              onClick={loadMore}
              disabled={loadingMore}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl font-body text-xs font-medium transition-colors disabled:opacity-50"
              style={{ background: "#F5F5F4", border: "1px solid #E7E5E4", color: "#78716C" }}
            >
              {loadingMore
                ? <Loader2 size={12} className="animate-spin" />
                : <ChevronUp size={12} />
              }
              {loadingMore ? "Chargement…" : `Voir les messages précédents (${totalMessages - messages.length})`}
            </button>
          </div>
        )}

        {messages.length === 0 && (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <div className="w-10 h-10 rounded-xl bg-[#F5F5F4] flex items-center justify-center mx-auto mb-3">
                <Paperclip size={16} className="text-[#A8A29E]" />
              </div>
              <p className="font-body text-sm text-[#A8A29E]">Aucun message pour le moment.</p>
              <p className="font-body text-xs text-[#C8C8C8] mt-1">Envoyez un message ou joignez des fichiers.</p>
            </div>
          </div>
        )}

        {messages.map((msg) => {
          const isClient = msg.sender_type === "client";
          const atts = msg.attachments ?? [];
          const hasText = msg.content && msg.content.trim().length > 0;

          return (
            <div key={msg.id} className={`flex ${isClient ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] flex flex-col gap-1 ${isClient ? "items-end" : "items-start"}`}>
                {!isClient && (
                  <span className="font-body text-xs text-[#A8A29E] px-1">{msg.sender_name}</span>
                )}

                {hasText && (
                  <div
                    className={`px-4 py-2.5 rounded-2xl font-body text-sm leading-relaxed ${
                      isClient
                        ? "bg-[#0C0B09] text-white rounded-br-sm"
                        : "bg-[#F5F5F4] text-[#0C0B09] rounded-bl-sm"
                    }`}
                  >
                    {msg.content}
                  </div>
                )}

                {atts.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {atts.map((att) => (
                      <AttachChip key={att.url} att={att} dark={isClient} />
                    ))}
                  </div>
                )}

                <time className="font-body text-[10px] text-[#A8A29E] px-1">
                  {new Date(msg.created_at).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                  {" · "}
                  {new Date(msg.created_at).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}
                </time>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* ── Prévisualisation fichiers en attente ──────────── */}
      {pending.length > 0 && (
        <div className="border-t border-[#E7E5E4] px-3 pt-2.5 pb-1">
          <p className="font-body text-[10px] text-[#A8A29E] mb-1.5">Fichiers à envoyer :</p>
          <div className="flex flex-wrap gap-2">
            {pending.map((pf, i) => (
              <div
                key={i}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border font-body text-xs"
                style={{
                  borderColor: pf.error ? "#FCA5A5" : "#E7E5E4",
                  background: pf.error ? "#FEF2F2" : "#F5F5F4",
                  color: pf.error ? "#DC2626" : "#57534E",
                }}
              >
                <FileIcon mime={pf.file.type} />
                <span className="max-w-[100px] truncate">{pf.file.name}</span>
                <span className="opacity-50 shrink-0">{fmtSize(pf.file.size)}</span>
                {pf.error && <span className="text-red-500 shrink-0">!</span>}
                <button
                  type="button"
                  onClick={() => removeFile(i)}
                  className="ml-0.5 opacity-50 hover:opacity-100 transition-opacity"
                  aria-label="Retirer le fichier"
                >
                  <X size={11} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Zone saisie ───────────────────────────────────── */}
      <div className="border-t border-[#E7E5E4] p-3">
        {error && <p className="font-body text-xs text-red-500 mb-2">{error}</p>}

        <form onSubmit={send} className="flex items-end gap-2">
          {/* Bouton pièce jointe */}
          <input
            ref={fileRef}
            type="file"
            multiple
            accept="image/*,.pdf,.doc,.docx,.zip"
            onChange={addFiles}
            className="sr-only"
            aria-label="Joindre un fichier"
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            title="Joindre un fichier (image, PDF, document)"
            className="w-10 h-10 rounded-xl border border-[#E7E5E4] bg-[#F5F5F4] flex items-center justify-center text-[#78716C] hover:text-[#C8A84B] hover:border-[#C8A84B]/40 transition-colors shrink-0"
          >
            <Paperclip size={16} />
          </button>

          {/* Textarea */}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send(e as unknown as React.FormEvent);
              }
            }}
            placeholder="Votre message... (Entrée pour envoyer, Shift+Entrée pour un saut de ligne)"
            rows={2}
            className="flex-1 resize-none px-3 py-2.5 rounded-xl border border-[#E7E5E4] bg-[#FAFAF8] font-body text-sm text-[#0C0B09] placeholder:text-[#A8A29E] focus:outline-none focus:ring-2 focus:ring-[#C8A84B]/30 focus:border-[#C8A84B] transition-colors"
          />

          {/* Bouton envoyer */}
          <button
            type="submit"
            disabled={!canSend}
            className="w-10 h-10 rounded-xl bg-[#0C0B09] flex items-center justify-center text-white disabled:opacity-35 hover:bg-[#1a1916] transition-colors shrink-0"
          >
            {sending
              ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              : <Send size={16} />
            }
          </button>
        </form>

        <p className="font-body text-[10px] text-[#C8C8C8] mt-1.5 pl-12">
          Formats acceptés : images, PDF, Word, ZIP · Max 10 Mo par fichier
        </p>
      </div>
    </div>
  );
}
