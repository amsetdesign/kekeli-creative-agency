"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const WELCOME: Message = {
  role: "assistant",
  content:
    "🚀 Bienvenue chez KEKELI Creative Agency.\n\nJe suis KELI, votre conseiller stratégique digital. Parlez-moi de votre projet — ensemble, nous allons construire quelque chose d'exceptionnel.",
};

function getSessionId(): string {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem("kekeli_chat_session");
  if (!id) {
    id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    localStorage.setItem("kekeli_chat_session", id);
  }
  return id;
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-[#C8A84B]/60"
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function MessageBubble({ message, isNew }: { message: Message; isNew?: boolean }) {
  const isUser = message.role === "user";
  return (
    <motion.div
      initial={isNew ? { opacity: 0, y: 10 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}
    >
      {!isUser && (
        <div className="w-6 h-6 rounded-full bg-[#C8A84B]/20 border border-[#C8A84B]/40 flex items-center justify-center shrink-0 mt-0.5 mr-2">
          <Sparkles size={10} className="text-[#C8A84B]" />
        </div>
      )}
      <div
        className={`max-w-[82%] rounded-2xl px-4 py-2.5 font-body text-sm leading-relaxed whitespace-pre-line ${
          isUser
            ? "bg-[#C8A84B] text-black rounded-tr-sm"
            : "bg-white/8 text-white/90 rounded-tl-sm border border-white/8"
        }`}
      >
        {message.content}
      </div>
    </motion.div>
  );
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [streaming, setStreaming] = useState("");
  const [sessionId] = useState(() => getSessionId());
  const [hasNew, setHasNew] = useState(false);
  const [notifDismissed, setNotifDismissed] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streaming]);

  // Show a notification bubble after 8 seconds if chat not opened
  useEffect(() => {
    const t = setTimeout(() => {
      if (!open && !notifDismissed) setHasNew(true);
    }, 8000);
    return () => clearTimeout(t);
  }, [open, notifDismissed]);

  // Open chat when triggered from another component (e.g. Hero nudge)
  useEffect(() => {
    const handler = () => { setOpen(true); setHasNew(false); };
    window.addEventListener("keli:open-chat", handler);
    return () => window.removeEventListener("keli:open-chat", handler);
  }, []);

  const saveConversation = useCallback(
    async (msgs: Message[]) => {
      if (msgs.length < 3 || !sessionId) return;
      try {
        await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: msgs, sessionId, action: "save" }),
        });
      } catch {
        // non-critical
      }
    },
    [sessionId],
  );

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: "user", content: text };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    setStreaming("");

    const apiMessages = nextMessages.map((m) => ({ role: m.role, content: m.content }));

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages, sessionId }),
      });

      if (!res.ok || !res.body) throw new Error("API error");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let full = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        full += decoder.decode(value, { stream: true });
        setStreaming(full);
      }

      const assistantMsg: Message = { role: "assistant", content: full };
      const finalMessages = [...nextMessages, assistantMsg];
      setMessages(finalMessages);
      setStreaming("");

      // Auto-save after every 2nd assistant reply
      if (finalMessages.filter((m) => m.role === "assistant").length % 2 === 0) {
        saveConversation(finalMessages);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Désolé, une erreur s'est produite. Veuillez réessayer." },
      ]);
      setStreaming("");
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  function handleKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  function openChat() {
    setOpen(true);
    setHasNew(false);
    setNotifDismissed(true);
    setTimeout(() => inputRef.current?.focus(), 300);
  }

  function closeChat() {
    setOpen(false);
    // Final save on close
    saveConversation(messages);
  }

  return (
    <>
      {/* ── Floating button ──────────────────────────────── */}
      <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-2">

        {/* Notification bubble */}
        <AnimatePresence>
          {hasNew && !open && (
            <motion.div
              initial={{ opacity: 0, x: -10, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -10, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 [box-shadow:0_8px_32px_rgba(12,11,9,0.18)] max-w-[220px] cursor-pointer"
              onClick={openChat}
            >
              <p className="font-body text-xs font-semibold text-[#0C0B09] leading-snug">
                💡 Un projet en tête ?
              </p>
              <p className="font-body text-[11px] text-[#78716C] mt-0.5">
                Parlez-en à KELI maintenant →
              </p>
              <button
                onClick={(e) => { e.stopPropagation(); setHasNew(false); setNotifDismissed(true); }}
                className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#A8A29E] flex items-center justify-center"
              >
                <X size={8} className="text-white" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main button */}
        <motion.button
          onClick={open ? closeChat : openChat}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-14 h-14 rounded-full bg-[#C8A84B] [box-shadow:0_4px_20px_rgba(200,168,75,0.5)] flex items-center justify-center"
          aria-label="Ouvrir le conseiller KELI"
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <X size={22} className="text-black" />
              </motion.div>
            ) : (
              <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <Sparkles size={22} className="text-black" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pulse ring */}
          {!open && (
            <motion.div
              className="absolute inset-0 rounded-full bg-[#C8A84B]"
              animate={{ scale: [1, 1.5], opacity: [0.4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            />
          )}
        </motion.button>
      </div>

      {/* ── Chat panel ───────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 340, damping: 28 }}
            className="fixed bottom-24 left-6 z-50 w-[90vw] sm:w-96 rounded-3xl overflow-hidden flex flex-col [box-shadow:0_24px_80px_rgba(12,11,9,0.5),0_0_0_1px_rgba(200,168,75,0.15)]"
            style={{ maxHeight: "min(560px, calc(100vh - 140px))", background: "#0F0E0C" }}
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-white/6 flex items-center gap-3 shrink-0">
              <div className="relative w-9 h-9 rounded-xl bg-[#C8A84B]/15 border border-[#C8A84B]/30 flex items-center justify-center">
                <Sparkles size={16} className="text-[#C8A84B]" />
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#0F0E0C]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-display text-sm font-semibold text-white leading-none">KELI</p>
                <p className="font-body text-[11px] text-white/40 mt-0.5">Conseiller stratégique KEKELI Creative Agency</p>
              </div>
              <button onClick={closeChat} className="text-white/30 hover:text-white/70 transition-colors">
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 min-h-0">
              {messages.map((msg, i) => (
                <MessageBubble key={i} message={msg} isNew={i === messages.length - 1 && i > 0} />
              ))}

              {/* Streaming preview */}
              {streaming && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start mb-3"
                >
                  <div className="w-6 h-6 rounded-full bg-[#C8A84B]/20 border border-[#C8A84B]/40 flex items-center justify-center shrink-0 mt-0.5 mr-2">
                    <Sparkles size={10} className="text-[#C8A84B]" />
                  </div>
                  <div className="max-w-[82%] rounded-2xl rounded-tl-sm px-4 py-2.5 bg-white/8 border border-white/8 font-body text-sm text-white/90 whitespace-pre-line leading-relaxed">
                    {streaming}
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity }}
                      className="inline-block w-0.5 h-3.5 bg-[#C8A84B] ml-0.5 align-middle"
                    />
                  </div>
                </motion.div>
              )}

              {/* Loading dots */}
              {loading && !streaming && (
                <div className="flex justify-start mb-3">
                  <div className="w-6 h-6 rounded-full bg-[#C8A84B]/20 border border-[#C8A84B]/40 flex items-center justify-center shrink-0 mt-0.5 mr-2">
                    <Sparkles size={10} className="text-[#C8A84B]" />
                  </div>
                  <div className="rounded-2xl rounded-tl-sm bg-white/8 border border-white/8">
                    <TypingDots />
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Brief CTA (shows after 5+ messages) */}
            {messages.length >= 7 && (
              <div className="px-4 pb-2 shrink-0">
                <Link
                  href="/brief"
                  onClick={closeChat}
                  className="flex items-center justify-between w-full bg-[#C8A84B]/10 border border-[#C8A84B]/25 rounded-xl px-4 py-2.5 hover:bg-[#C8A84B]/18 transition-colors"
                >
                  <span className="font-body text-xs font-semibold text-[#C8A84B]">
                    Formalisez votre projet en 4 étapes
                  </span>
                  <ArrowRight size={13} className="text-[#C8A84B] shrink-0" />
                </Link>
              </div>
            )}

            {/* Input */}
            <div className="px-4 pb-4 pt-2 border-t border-white/6 shrink-0">
              <div className="flex items-end gap-2.5 bg-white/5 border border-white/10 rounded-2xl px-3.5 py-2.5 focus-within:border-[#C8A84B]/40 transition-colors">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    e.target.style.height = "auto";
                    e.target.style.height = `${Math.min(e.target.scrollHeight, 100)}px`;
                  }}
                  onKeyDown={handleKey}
                  placeholder="Parlez-moi de votre projet…"
                  rows={1}
                  disabled={loading}
                  className="flex-1 bg-transparent font-body text-sm text-white placeholder-white/25 resize-none focus:outline-none min-h-[22px] max-h-[100px] leading-snug disabled:opacity-50"
                  style={{ height: "22px" }}
                />
                <button
                  onClick={sendMessage}
                  disabled={loading || !input.trim()}
                  className="w-8 h-8 rounded-xl bg-[#C8A84B] flex items-center justify-center shrink-0 hover:bg-[#b8963d] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <Send size={13} className="text-black" />
                </button>
              </div>
              <p className="font-body text-[10px] text-white/20 text-center mt-2">
                KEKELI Creative Agency · Dakar, Sénégal
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
