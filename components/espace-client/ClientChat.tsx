"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, ArrowRight, RefreshCw, FileText, Copy, Check, Download, Mail } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface Props {
  firstName: string;
  userId: string;
  email: string;
}

function getSessionId(userId: string) {
  if (typeof window === "undefined") return "";
  const key = `kekeli_client_chat_${userId}`;
  let id = sessionStorage.getItem(key);
  if (!id) {
    id = `client-${userId}-${Date.now()}`;
    sessionStorage.setItem(key, id);
  }
  return id;
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-2 h-2 rounded-full bg-[#C8A84B]/60"
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </div>
  );
}

function CahierDesChargesCard({
  cdc,
  emailSent,
}: {
  cdc: string;
  emailSent: boolean;
}) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(cdc).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleDownload() {
    const blob = new Blob([cdc], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cahier-des-charges-kekeli.txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl"
    >
      {/* Header */}
      <div
        className="rounded-t-2xl px-5 py-4 flex items-center justify-between"
        style={{ background: "linear-gradient(135deg, #C8A84B, #F59E0B)" }}
      >
        <div className="flex items-center gap-3">
          <FileText size={20} className="text-black" />
          <div>
            <p className="font-display text-sm font-bold text-black leading-none">
              Cahier des charges
            </p>
            <p className="font-body text-[10px] text-black/60 mt-0.5">
              Généré par KELI · KEKELI Creative Agency
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            title="Copier"
            className="w-8 h-8 rounded-lg bg-black/10 hover:bg-black/20 flex items-center justify-center transition-colors"
          >
            {copied ? <Check size={14} className="text-black" /> : <Copy size={14} className="text-black" />}
          </button>
          <button
            onClick={handleDownload}
            title="Télécharger"
            className="w-8 h-8 rounded-lg bg-black/10 hover:bg-black/20 flex items-center justify-center transition-colors"
          >
            <Download size={14} className="text-black" />
          </button>
        </div>
      </div>

      {/* Document body */}
      <div
        className="rounded-b-2xl border border-white/10 overflow-auto"
        style={{ background: "#1A1A18", maxHeight: 420 }}
      >
        <pre className="font-body text-xs leading-relaxed text-white/75 p-5 whitespace-pre-wrap">
          {cdc}
        </pre>
      </div>

      {/* Email confirmation */}
      {emailSent && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 mt-3 px-4 py-2.5 rounded-xl"
          style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.25)" }}
        >
          <Mail size={13} style={{ color: "#10B981" }} />
          <span className="font-body text-xs" style={{ color: "#10B981" }}>
            Document envoyé par email à votre adresse ✓
          </span>
        </motion.div>
      )}
    </motion.div>
  );
}

export default function ClientChat({ firstName, userId, email }: Props) {
  const welcome: Message = {
    role: "assistant",
    content: `Bonjour ${firstName} ! 👋

Je suis KELI, votre conseiller stratégique KEKELI Creative Agency.

Voici ce que je vous propose : au fil de notre échange, je vais noter toutes vos réponses pour vous préparer un **cahier des charges complet et gratuit** — un document professionnel qui normalement se facture, et qui vous permettra de démarrer votre projet rapidement et clairement.

Pour commencer : parlez-moi de vous et de ce que vous souhaitez réaliser. Quelle est votre activité et votre projet ?`,
  };

  const [messages, setMessages] = useState<Message[]>([welcome]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [streaming, setStreaming] = useState("");
  const [sessionId] = useState(() => getSessionId(userId));
  const [generatingCdc, setGeneratingCdc] = useState(false);
  const [cdc, setCdc] = useState<string | null>(null);
  const [cdcEmailSent, setCdcEmailSent] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streaming, cdc]);

  function resetChat() {
    const key = `kekeli_client_chat_${userId}`;
    const newId = `client-${userId}-${Date.now()}`;
    sessionStorage.setItem(key, newId);
    setMessages([welcome]);
    setInput("");
    setStreaming("");
    setCdc(null);
    setCdcEmailSent(false);
  }

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: "user", content: text };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);
    setStreaming("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.map((m) => ({ role: m.role, content: m.content })),
          sessionId,
        }),
      });

      if (!res.ok || !res.body) throw new Error();

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let full = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        full += decoder.decode(value, { stream: true });
        setStreaming(full);
      }

      const final = [...next, { role: "assistant" as const, content: full }];
      setMessages(final);
      setStreaming("");

      // Save conversation periodically
      if (final.filter((m) => m.role === "assistant").length % 2 === 0) {
        fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: final, sessionId, action: "save" }),
        }).catch(() => {});
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

  const generateCDC = useCallback(async () => {
    if (generatingCdc || cdc) return;
    setGeneratingCdc(true);

    try {
      const res = await fetch("/api/chat/generate-cdc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages, firstName, email }),
      });

      if (!res.ok) throw new Error();
      const { cdc: generated } = await res.json();
      setCdc(generated);
      setCdcEmailSent(!!email);

      // Add a message from KELI
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Voici votre cahier des charges complet ✨\n\nIl reprend tout ce que vous m'avez partagé. Vous pouvez le copier, le télécharger, ou le transmettre directement à notre équipe pour démarrer.${email ? "\n\nJe vous l'ai également envoyé par email." : ""}`,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Désolé, la génération du cahier des charges a échoué. Réessayez dans un instant.",
        },
      ]);
    } finally {
      setGeneratingCdc(false);
    }
  }, [generatingCdc, cdc, messages, firstName, email]);

  function handleKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  const userMessageCount = messages.filter((m) => m.role === "user").length;
  const showCdcButton = userMessageCount >= 5 && !cdc;

  return (
    <div className="flex flex-col" style={{ height: "calc(100vh - 8rem)" }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4 shrink-0">
        <div>
          <h1 className="font-display text-2xl text-[#0C0B09] mb-1">Discuter avec KELI</h1>
          <p className="font-body text-sm text-[#78716C]">
            Votre conseiller stratégique · Cahier des charges gratuit inclus
          </p>
        </div>
        <button
          onClick={resetChat}
          className="flex items-center gap-2 px-3 py-2 rounded-xl border border-[#E7E5E4] font-body text-xs text-[#78716C] hover:border-[#0C0B09] hover:text-[#0C0B09] transition-colors"
        >
          <RefreshCw size={13} />
          Nouvelle conversation
        </button>
      </div>

      {/* Chat area */}
      <div className="flex-1 rounded-2xl overflow-hidden flex flex-col" style={{ background: "#0F0E0C", minHeight: 0 }}>
        {/* KELI header */}
        <div className="px-5 py-4 border-b border-white/6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl bg-[#C8A84B]/15 border border-[#C8A84B]/30 flex items-center justify-center">
              <Sparkles size={18} className="text-[#C8A84B]" />
              <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#0F0E0C]" />
            </div>
            <div>
              <p className="font-display text-sm font-semibold text-white">KELI</p>
              <p className="font-body text-xs text-white/40">Conseiller stratégique · En ligne</p>
            </div>
          </div>

          {/* CDC progress indicator */}
          {userMessageCount > 0 && !cdc && (
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((step) => (
                  <div
                    key={step}
                    className="w-5 h-1.5 rounded-full transition-colors duration-300"
                    style={{
                      background: userMessageCount >= step ? "#C8A84B" : "rgba(255,255,255,0.1)",
                    }}
                  />
                ))}
              </div>
              <span className="font-body text-[10px] text-white/30">
                {userMessageCount < 5 ? `${5 - userMessageCount} éch. restants` : "Prêt !"}
              </span>
            </div>
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4 min-h-0">
          {messages.map((msg, i) => {
            const isUser = msg.role === "user";
            return (
              <motion.div
                key={i}
                initial={i > 0 ? { opacity: 0, y: 8 } : false}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${isUser ? "justify-end" : "justify-start"}`}
              >
                {!isUser && (
                  <div className="w-7 h-7 rounded-xl bg-[#C8A84B]/20 border border-[#C8A84B]/40 flex items-center justify-center shrink-0 mt-0.5 mr-2.5">
                    <Sparkles size={12} className="text-[#C8A84B]" />
                  </div>
                )}
                <div
                  className={`max-w-[78%] rounded-2xl px-4 py-3 font-body text-sm leading-relaxed whitespace-pre-line ${
                    isUser
                      ? "bg-[#C8A84B] text-black rounded-tr-sm"
                      : "bg-white/8 text-white/90 rounded-tl-sm border border-white/8"
                  }`}
                >
                  {msg.content}
                </div>
              </motion.div>
            );
          })}

          {/* CDC document */}
          {cdc && (
            <div className="flex justify-start">
              <div className="w-7 h-7 rounded-xl bg-[#C8A84B]/20 border border-[#C8A84B]/40 flex items-center justify-center shrink-0 mt-0.5 mr-2.5 self-start">
                <FileText size={12} className="text-[#C8A84B]" />
              </div>
              <CahierDesChargesCard cdc={cdc} emailSent={cdcEmailSent} />
            </div>
          )}

          {/* Streaming */}
          {streaming && (
            <div className="flex justify-start">
              <div className="w-7 h-7 rounded-xl bg-[#C8A84B]/20 border border-[#C8A84B]/40 flex items-center justify-center shrink-0 mt-0.5 mr-2.5">
                <Sparkles size={12} className="text-[#C8A84B]" />
              </div>
              <div className="max-w-[78%] rounded-2xl rounded-tl-sm px-4 py-3 bg-white/8 border border-white/8 font-body text-sm text-white/90 whitespace-pre-line leading-relaxed">
                {streaming}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                  className="inline-block w-0.5 h-3.5 bg-[#C8A84B] ml-0.5 align-middle"
                />
              </div>
            </div>
          )}

          {loading && !streaming && (
            <div className="flex justify-start">
              <div className="w-7 h-7 rounded-xl bg-[#C8A84B]/20 border border-[#C8A84B]/40 flex items-center justify-center shrink-0 mt-0.5 mr-2.5">
                <Sparkles size={12} className="text-[#C8A84B]" />
              </div>
              <div className="rounded-2xl rounded-tl-sm bg-white/8 border border-white/8">
                <TypingDots />
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* CDC generation button + input */}
        <div className="shrink-0 border-t border-white/6">
          {/* CDC button */}
          <AnimatePresence>
            {showCdcButton && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="px-4 pt-3"
              >
                <button
                  onClick={generateCDC}
                  disabled={generatingCdc}
                  className="w-full flex items-center justify-between px-5 py-3.5 rounded-2xl font-body text-sm font-bold text-black transition-all disabled:opacity-60 disabled:cursor-wait"
                  style={{
                    background: generatingCdc
                      ? "rgba(200,168,75,0.4)"
                      : "linear-gradient(135deg, #C8A84B, #F59E0B)",
                    boxShadow: generatingCdc ? "none" : "0 4px 20px rgba(200,168,75,0.35)",
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    {generatingCdc ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <RefreshCw size={16} />
                      </motion.div>
                    ) : (
                      <FileText size={16} />
                    )}
                    {generatingCdc
                      ? "Génération du cahier des charges en cours…"
                      : "✨ Générer mon cahier des charges gratuit"}
                  </div>
                  {!generatingCdc && <ArrowRight size={15} />}
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Text input */}
          <div className="px-4 pb-4 pt-3">
            <div className="flex items-end gap-2.5 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus-within:border-[#C8A84B]/40 transition-colors">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  e.target.style.height = "auto";
                  e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
                }}
                onKeyDown={handleKey}
                placeholder="Posez votre question à KELI…"
                rows={1}
                disabled={loading}
                className="flex-1 bg-transparent font-body text-sm text-white placeholder-white/25 resize-none focus:outline-none min-h-[22px] max-h-[120px] leading-snug disabled:opacity-50"
                style={{ height: "22px" }}
                autoFocus
              />
              <button
                onClick={send}
                disabled={loading || !input.trim()}
                className="w-9 h-9 rounded-xl bg-[#C8A84B] flex items-center justify-center shrink-0 hover:bg-[#b8963d] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={14} className="text-black" />
              </button>
            </div>
            <p className="font-body text-[10px] text-white/20 text-center mt-2">
              Entrée pour envoyer · Maj+Entrée pour nouvelle ligne
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
