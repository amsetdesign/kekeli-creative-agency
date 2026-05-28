"use client";

import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import type { ProjectMessage } from "@/lib/supabase";

interface Props {
  projectId: string;
  initialMessages: ProjectMessage[];
  currentUserId: string;
}

export default function MessageThread({ projectId, initialMessages, currentUserId }: Props) {
  const [messages, setMessages] = useState(initialMessages);
  const [content, setContent] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim() || sending) return;
    setError("");
    setSending(true);

    try {
      const res = await fetch("/api/espace-client/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ project_id: projectId, content: content.trim() }),
      });

      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Erreur lors de l'envoi.");
      } else {
        setMessages((prev) => [...prev, json.message]);
        setContent("");
      }
    } catch {
      setError("Erreur de connexion.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-[#E7E5E4] flex flex-col" style={{ height: 480 }}>
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <div className="h-full flex items-center justify-center">
            <p className="font-body text-sm text-[#A8A29E] text-center">
              Aucun message pour le moment.
              <br />
              Envoyez un message à notre équipe.
            </p>
          </div>
        )}

        {messages.map((msg) => {
          const isClient = msg.sender_type === "client";
          return (
            <div key={msg.id} className={`flex ${isClient ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] ${isClient ? "items-end" : "items-start"} flex flex-col`}>
                {!isClient && (
                  <span className="font-body text-xs text-[#A8A29E] mb-1 px-1">
                    {msg.sender_name}
                  </span>
                )}
                <div
                  className={`px-4 py-2.5 rounded-2xl font-body text-sm leading-relaxed ${
                    isClient
                      ? "bg-[#0C0B09] text-white rounded-br-sm"
                      : "bg-[#F5F5F4] text-[#0C0B09] rounded-bl-sm"
                  }`}
                >
                  {msg.content}
                </div>
                <time className="font-body text-[10px] text-[#A8A29E] mt-1 px-1">
                  {new Date(msg.created_at).toLocaleTimeString("fr-FR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                  {" · "}
                  {new Date(msg.created_at).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "short",
                  })}
                </time>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-[#E7E5E4] p-3">
        {error && (
          <p className="font-body text-xs text-red-500 mb-2">{error}</p>
        )}
        <form onSubmit={send} className="flex items-end gap-2">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send(e as unknown as React.FormEvent);
              }
            }}
            placeholder="Écrivez votre message..."
            rows={2}
            className="flex-1 resize-none px-3 py-2.5 rounded-xl border border-[#E7E5E4] bg-[#FAFAF8] font-body text-sm text-[#0C0B09] placeholder:text-[#A8A29E] focus:outline-none focus:ring-2 focus:ring-[#C8A84B]/30 focus:border-[#C8A84B]"
          />
          <button
            type="submit"
            disabled={!content.trim() || sending}
            className="w-10 h-10 rounded-xl bg-[#0C0B09] flex items-center justify-center text-white disabled:opacity-40 hover:bg-[#1a1916] transition-colors shrink-0"
          >
            {sending ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Send size={16} />
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
