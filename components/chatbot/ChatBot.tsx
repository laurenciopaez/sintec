"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  ArrowLeft,
  ExternalLink,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
  UserCircle,
} from "lucide-react";
import { FAQ_ITEMS, COMPANY_SHORT_NAME } from "@/lib/constants";
import { analytics } from "@/lib/analytics";

// ── Types ──────────────────────────────────────────────────────────────────────

type ChatView = "faq-list" | "faq-answer" | "chat" | "contact-form";

interface ChatMessage {
  id: string;
  type: "bot" | "user";
  text: string;
}

interface HistoryItem {
  id: string;
  question: string;
  answer: string;
}

interface CacheData {
  timestamp: number;
  history: HistoryItem[];
}

interface AiMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  noMatch?: boolean;
}

interface MiniForm {
  name: string;
  email: string;
  service: string;
  message: string;
}

// ── FAQ history cache (localStorage, 1 hora) ───────────────────────────────────

const CACHE_KEY = "sintecsa_chat_session";
const CACHE_TTL = 60 * 60 * 1000;

function loadCache(): { history: HistoryItem[]; remaining: number } | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { timestamp, history }: CacheData = JSON.parse(raw);
    const age = Date.now() - timestamp;
    if (age >= CACHE_TTL) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }
    return { history, remaining: CACHE_TTL - age };
  } catch {
    return null;
  }
}

function saveCache(history: HistoryItem[], timestamp: number) {
  localStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp, history }));
}

function clearCache() {
  localStorage.removeItem(CACHE_KEY);
}

// ── Constants ──────────────────────────────────────────────────────────────────

const MINI_SERVICE_OPTIONS = [
  "Integridad de Activos",
  "Inspección Basada en Riesgo (RBI)",
  "Análisis de Falla",
  "Control de Corrosión",
  "Monitoreo Electroquímico",
  "Procedimientos Técnicos",
  "Análisis de Datos y ML",
  "Otro / Consulta general",
];

const SHEETS_URL =
  "https://script.google.com/macros/s/AKfycbzaVNitHsci3MPXaCtUlZbAG5yCIC6voYqfXGyL_7G_grlyTRC8xTOp-sy_mX9vnakG0w/exec";

const EMAIL_RE = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

// ── Component ──────────────────────────────────────────────────────────────────

export function ChatBot() {
  // ── View state ───────────────────────────────────────────────────────────────
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<ChatView>("faq-list");
  const [showPulse, setShowPulse] = useState(true);

  // ── FAQ history (cached) ─────────────────────────────────────────────────────
  const [selectedFaq, setSelectedFaq] = useState<(typeof FAQ_ITEMS)[0] | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // ── AI chat ──────────────────────────────────────────────────────────────────
  const [inputValue, setInputValue] = useState("");
  const [aiMessages, setAiMessages] = useState<AiMessage[]>([]);
  const [isChatLoading, setIsChatLoading] = useState(false);

  // ── Mini contact form ────────────────────────────────────────────────────────
  const [miniForm, setMiniForm] = useState<MiniForm>({ name: "", email: "", service: "", message: "" });
  const [miniErrors, setMiniErrors] = useState<Partial<MiniForm>>({});
  const [miniStatus, setMiniStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [miniServerError, setMiniServerError] = useState("");

  // ── Refs ─────────────────────────────────────────────────────────────────────
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const hasAutoOpened = useRef(false);
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sessionTimestampRef = useRef<number | null>(null);
  const cacheExpiryTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastMiniSubmitRef = useRef<number>(0);

  // ── Load FAQ history cache on mount ──────────────────────────────────────────
  useEffect(() => {
    const cached = loadCache();
    if (cached && cached.history.length > 0) {
      setHistory(cached.history);
      cacheExpiryTimerRef.current = setTimeout(() => {
        clearCache();
        setHistory([]);
      }, cached.remaining);
    }
    return () => {
      if (cacheExpiryTimerRef.current) clearTimeout(cacheExpiryTimerRef.current);
    };
  }, []);

  // ── Auto-scroll ───────────────────────────────────────────────────────────────
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [aiMessages, view, history, isChatLoading]);

  // ── Hide pulse after first open ───────────────────────────────────────────────
  useEffect(() => {
    if (isOpen) setShowPulse(false);
  }, [isOpen]);

  // ── Focus input when switching to chat view ───────────────────────────────────
  useEffect(() => {
    if (isOpen && (view === "chat" || view === "faq-list")) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen, view]);

  // ── Auto-open after 15s of scroll activity ────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      if (hasAutoOpened.current) return;
      if (scrollTimerRef.current) return;

      scrollTimerRef.current = setTimeout(() => {
        if (!hasAutoOpened.current) {
          hasAutoOpened.current = true;
          setIsOpen(true);
          setView("faq-list");
          setSelectedFaq(null);
        }
      }, 15000);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    };
  }, []);

  // ── Handlers ──────────────────────────────────────────────────────────────────

  const handleOpen = () => {
    hasAutoOpened.current = true;
    if (scrollTimerRef.current) { clearTimeout(scrollTimerRef.current); scrollTimerRef.current = null; }
    setIsOpen(true);
    setView("faq-list");
    setSelectedFaq(null);
    analytics.chatbotOpen();
  };

  const handleClose = () => setIsOpen(false);

  const handleFaqSelect = (faq: (typeof FAQ_ITEMS)[0]) => {
    setSelectedFaq(faq);
    setView("faq-answer");
    analytics.chatbotFaqClick(faq.question);

    const newItem: HistoryItem = { id: faq.id, question: faq.question, answer: faq.answer };
    setHistory((prev) => {
      if (prev.length > 0 && prev[prev.length - 1].id === faq.id) return prev;
      const updated = [...prev, newItem];
      const now = sessionTimestampRef.current ?? Date.now();
      if (!sessionTimestampRef.current) {
        sessionTimestampRef.current = now;
        if (cacheExpiryTimerRef.current) clearTimeout(cacheExpiryTimerRef.current);
        cacheExpiryTimerRef.current = setTimeout(() => { clearCache(); setHistory([]); }, CACHE_TTL);
      }
      saveCache(updated, now);
      return updated;
    });
  };

  const handleBack = () => {
    setSelectedFaq(null);
    setView("faq-list");
  };

  // ── AI chat send ──────────────────────────────────────────────────────────────

  const handleSendMessage = async () => {
    const msg = inputValue.trim();
    if (!msg || isChatLoading) return;

    const userMsg: AiMessage = { id: Date.now().toString(), role: "user", content: msg };
    setAiMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setView("chat");
    setIsChatLoading(true);

    try {
      const apiHistory = aiMessages.map((m) => ({ role: m.role, content: m.content }));
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg, history: apiHistory }),
      });
      const data = (await res.json()) as { answer: string; noMatch: boolean };
      const botMsg: AiMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.answer,
        noMatch: data.noMatch,
      };
      setAiMessages((prev) => [...prev, botMsg]);
    } catch {
      setAiMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: "assistant", content: "Lo siento, hubo un error de conexión. Por favor, intente nuevamente." },
      ]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // ── Mini form ─────────────────────────────────────────────────────────────────

  const handleMiniFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setMiniForm((prev) => ({ ...prev, [name]: value }));
    if (miniErrors[name as keyof MiniForm]) {
      setMiniErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateMiniForm = (): Partial<MiniForm> => {
    const err: Partial<MiniForm> = {};
    if (!miniForm.name.trim() || miniForm.name.trim().length < 2) err.name = "Nombre requerido (mín. 2 caracteres)";
    if (!miniForm.email.trim() || !EMAIL_RE.test(miniForm.email.trim())) err.email = "Email inválido";
    if (!miniForm.message.trim() || miniForm.message.trim().length < 10) err.message = "Mensaje requerido (mín. 10 caracteres)";
    return err;
  };

  const handleMiniFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMiniServerError("");

    const errs = validateMiniForm();
    if (Object.keys(errs).length > 0) { setMiniErrors(errs); return; }

    const now = Date.now();
    if (now - lastMiniSubmitRef.current < 3000) return;
    lastMiniSubmitRef.current = now;

    setMiniStatus("loading");

    try {
      void fetch(SHEETS_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({
          name: miniForm.name, email: miniForm.email,
          company: "", phone: "",
          service: miniForm.service || "Consulta desde chatbot",
          message: miniForm.message,
        }),
      }).catch(() => null);

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          name: miniForm.name,
          email: miniForm.email,
          subject: `Consulta SINTEC (chatbot): ${miniForm.service || "Consulta general"}`,
          message: miniForm.message,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setMiniStatus("success");
        setMiniForm({ name: "", email: "", service: "", message: "" });
      } else {
        setMiniServerError(data.message ?? "Error al enviar. Intente nuevamente.");
        setMiniStatus("error");
      }
    } catch {
      setMiniServerError("Error de conexión. Verifique su internet e intente nuevamente.");
      setMiniStatus("error");
    }
  };

  // ── Derived values ────────────────────────────────────────────────────────────

  const isReturningUser = history.length > 0;
  const historyWithoutCurrent = selectedFaq
    ? history.filter((h) => h.id !== selectedFaq.id)
    : history;
  const showFooterInput = view !== "contact-form";

  // ── Render ─────────────────────────────────────────────────────────────────────

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      {/* ── Chat Widget ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-widget"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-[360px] sm:w-[380px] bg-white rounded-3xl shadow-2xl border border-[#d2d2d7]/50 overflow-hidden"
            style={{ maxHeight: "calc(100vh - 120px)" }}
          >
            {/* Header */}
            <div className="bg-gradient-to-br from-[#297373] to-[#0A1045] p-5 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageCircle size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">{COMPANY_SHORT_NAME} S.A.</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-white/80 text-xs">Asistente virtual</span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors duration-200"
                aria-label="Cerrar chat"
              >
                <X size={16} />
              </button>
            </div>

            {/* Body */}
            <div className="overflow-y-auto" style={{ maxHeight: "420px", minHeight: "300px" }}>
              <AnimatePresence mode="wait">

                {/* ── FAQ List View ── */}
                {view === "faq-list" && (
                  <motion.div
                    key="faq-list"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="p-5"
                  >
                    {/* Historial previo */}
                    {isReturningUser && (
                      <div className="mb-4 pb-4 border-b border-[#d2d2d7]/40">
                        <p className="text-[10px] text-[#6e6e73]/60 font-medium uppercase tracking-wide text-center mb-3">
                          Conversación anterior
                        </p>
                        <div className="space-y-3">
                          {history.map((item) => (
                            <div key={item.id} className="space-y-2 opacity-60">
                              <div className="flex justify-end">
                                <div className="bg-[#297373]/70 text-white rounded-2xl rounded-tr-sm px-3 py-2 max-w-[85%]">
                                  <p className="text-xs leading-relaxed">{item.question}</p>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <div className="w-6 h-6 rounded-full bg-[#297373]/10 flex items-center justify-center shrink-0 mt-0.5">
                                  <MessageCircle size={12} className="text-[#297373]" />
                                </div>
                                <div className="bg-[#f5f5f7] rounded-2xl rounded-tl-sm px-3 py-2 max-w-[85%]">
                                  <p className="text-xs text-[#001514] leading-relaxed line-clamp-2">{item.answer}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Saludo */}
                    <div className="flex gap-3 mb-5">
                      <div className="w-8 h-8 rounded-full bg-[#297373]/10 flex items-center justify-center shrink-0 mt-1">
                        <MessageCircle size={16} className="text-[#297373]" />
                      </div>
                      <div className="bg-[#f5f5f7] rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%]">
                        <p className="text-sm text-[#001514] leading-relaxed">
                          {isReturningUser
                            ? "¡Bienvenido nuevamente! ¿Hay algo más en lo que pueda ayudarle?"
                            : <>¡Hola! Soy el asistente de <strong>SINTEC S.A.</strong> ¿En qué puedo ayudarle hoy?</>}
                        </p>
                      </div>
                    </div>

                    {/* FAQ Options */}
                    <div>
                      <p className="text-xs text-[#6e6e73] font-medium uppercase tracking-wide mb-3 pl-1">
                        Preguntas frecuentes
                      </p>
                      <div className="space-y-2">
                        {FAQ_ITEMS.map((faq, index) => (
                          <motion.button
                            key={faq.id}
                            onClick={() => handleFaqSelect(faq)}
                            className="w-full text-left px-4 py-3 rounded-xl bg-[#f5f5f7] hover:bg-[#297373]/10 hover:text-[#297373] border border-transparent hover:border-[#297373]/20 text-sm text-[#001514] transition-all duration-150 cursor-pointer"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 + 0.1 }}
                          >
                            {faq.question}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ── FAQ Answer View ── */}
                {view === "faq-answer" && selectedFaq && (
                  <motion.div
                    key="faq-answer"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                    className="p-5"
                  >
                    {historyWithoutCurrent.length > 0 && (
                      <div className="mb-4 pb-4 border-b border-[#d2d2d7]/40 space-y-3">
                        {historyWithoutCurrent.map((item) => (
                          <div key={item.id} className="space-y-2 opacity-50">
                            <div className="flex justify-end">
                              <div className="bg-[#297373]/70 text-white rounded-2xl rounded-tr-sm px-3 py-2 max-w-[85%]">
                                <p className="text-xs leading-relaxed">{item.question}</p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <div className="w-6 h-6 rounded-full bg-[#297373]/10 flex items-center justify-center shrink-0 mt-0.5">
                                <MessageCircle size={12} className="text-[#297373]" />
                              </div>
                              <div className="bg-[#f5f5f7] rounded-2xl rounded-tl-sm px-3 py-2 max-w-[85%]">
                                <p className="text-xs text-[#001514] leading-relaxed line-clamp-2">{item.answer}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex justify-end mb-4">
                      <div className="bg-[#297373] text-white rounded-2xl rounded-tr-sm px-4 py-3 max-w-[85%]">
                        <p className="text-sm leading-relaxed">{selectedFaq.question}</p>
                      </div>
                    </div>

                    <div className="flex gap-3 mb-5">
                      <div className="w-8 h-8 rounded-full bg-[#297373]/10 flex items-center justify-center shrink-0 mt-1">
                        <MessageCircle size={16} className="text-[#297373]" />
                      </div>
                      <div className="bg-[#f5f5f7] rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%]">
                        <p className="text-sm text-[#001514] leading-relaxed">{selectedFaq.answer}</p>
                      </div>
                    </div>

                    <div className="flex gap-3 mb-4">
                      <div className="w-8 shrink-0" />
                      <Link
                        href={selectedFaq.cta.href}
                        onClick={handleClose}
                        className="flex items-center gap-2 bg-[#297373] hover:bg-[#0A1045] text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors duration-200"
                      >
                        {selectedFaq.cta.label}
                        <ExternalLink size={13} />
                      </Link>
                    </div>

                    <button
                      onClick={handleBack}
                      className="flex items-center gap-2 text-[#6e6e73] hover:text-[#297373] text-sm transition-colors duration-200 pl-11 cursor-pointer"
                    >
                      <ArrowLeft size={14} />
                      Ver otras preguntas
                    </button>
                  </motion.div>
                )}

                {/* ── AI Chat View ── */}
                {view === "chat" && (
                  <motion.div
                    key="chat"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                    className="p-5 space-y-4"
                  >
                    {aiMessages.map((msg) => (
                      <div key={msg.id}>
                        {msg.role === "user" ? (
                          <div className="flex justify-end">
                            <div className="flex items-end gap-2">
                              <div className="bg-[#297373] text-white rounded-2xl rounded-tr-sm px-4 py-3 max-w-[85%]">
                                <p className="text-sm leading-relaxed">{msg.content}</p>
                              </div>
                              <UserCircle size={20} className="text-[#297373]/40 shrink-0 mb-1" />
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <div className="flex gap-3">
                              <div className="w-8 h-8 rounded-full bg-[#297373]/10 flex items-center justify-center shrink-0 mt-1">
                                <MessageCircle size={16} className="text-[#297373]" />
                              </div>
                              <div className="bg-[#f5f5f7] rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%]">
                                <p className="text-sm text-[#001514] leading-relaxed">{msg.content}</p>
                              </div>
                            </div>

                            {/* noMatch: CTAs para hablar con especialista */}
                            {msg.noMatch && (
                              <div className="flex gap-3">
                                <div className="w-8 shrink-0" />
                                <div className="flex flex-col gap-2 w-full">
                                  <Link
                                    href="/#contacto"
                                    onClick={handleClose}
                                    className="flex items-center justify-center gap-2 bg-[#297373] hover:bg-[#0A1045] text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors duration-200"
                                  >
                                    Hablar con un especialista
                                    <ExternalLink size={13} />
                                  </Link>
                                  <button
                                    onClick={() => {
                                      setMiniStatus("idle");
                                      setMiniForm({ name: "", email: "", service: "", message: "" });
                                      setMiniErrors({});
                                      setView("contact-form");
                                    }}
                                    className="flex items-center justify-center gap-2 bg-[#f5f5f7] hover:bg-[#297373]/10 border border-[#d2d2d7] hover:border-[#297373]/30 text-[#001514] hover:text-[#297373] px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer"
                                  >
                                    <Send size={13} />
                                    Completar formulario aquí
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}

                    {/* Loading indicator */}
                    {isChatLoading && (
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#297373]/10 flex items-center justify-center shrink-0">
                          <Loader2 size={16} className="text-[#297373] animate-spin" />
                        </div>
                        <div className="bg-[#f5f5f7] rounded-2xl rounded-tl-sm px-4 py-3">
                          <div className="flex gap-1 items-center h-5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#297373]/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                            <span className="w-1.5 h-1.5 rounded-full bg-[#297373]/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                            <span className="w-1.5 h-1.5 rounded-full bg-[#297373]/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                          </div>
                        </div>
                      </div>
                    )}

                    <button
                      onClick={handleBack}
                      className="flex items-center gap-2 text-[#6e6e73] hover:text-[#297373] text-xs transition-colors duration-200 cursor-pointer pt-1"
                    >
                      <ArrowLeft size={12} />
                      Ver preguntas frecuentes
                    </button>
                  </motion.div>
                )}

                {/* ── Mini Contact Form View ── */}
                {view === "contact-form" && (
                  <motion.div
                    key="contact-form"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                    className="p-5"
                  >
                    {/* Bot intro */}
                    <div className="flex gap-3 mb-5">
                      <div className="w-8 h-8 rounded-full bg-[#297373]/10 flex items-center justify-center shrink-0 mt-1">
                        <MessageCircle size={16} className="text-[#297373]" />
                      </div>
                      <div className="bg-[#f5f5f7] rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%]">
                        <p className="text-sm text-[#001514] leading-relaxed">
                          Completá tus datos y un especialista de SINTEC te contactará en las próximas 24 hs hábiles.
                        </p>
                      </div>
                    </div>

                    <AnimatePresence mode="wait">
                      {miniStatus === "success" ? (
                        <motion.div
                          key="success"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="flex flex-col items-center text-center py-6 gap-3"
                        >
                          <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center">
                            <CheckCircle size={28} className="text-green-500" />
                          </div>
                          <p className="text-sm font-semibold text-[#001514]">¡Mensaje enviado!</p>
                          <p className="text-xs text-[#6e6e73]">Nos pondremos en contacto a la brevedad.</p>
                          <button
                            onClick={handleClose}
                            className="text-xs text-[#297373] hover:underline mt-1 cursor-pointer"
                          >
                            Cerrar
                          </button>
                        </motion.div>
                      ) : (
                        <motion.form
                          key="form"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          onSubmit={handleMiniFormSubmit}
                          noValidate
                          className="space-y-3"
                        >
                          {/* Name */}
                          <div>
                            <input
                              type="text"
                              name="name"
                              value={miniForm.name}
                              onChange={handleMiniFormChange}
                              placeholder="Nombre y apellido *"
                              maxLength={100}
                              autoComplete="name"
                              className={`w-full px-3 py-2.5 text-sm bg-[#f5f5f7] border rounded-xl text-[#001514] placeholder-[#6e6e73] focus:outline-none focus:ring-2 focus:bg-white transition-all duration-200 ${
                                miniErrors.name ? "border-red-400 focus:ring-red-200" : "border-[#d2d2d7] focus:ring-[#297373]/30 focus:border-[#297373]"
                              }`}
                            />
                            {miniErrors.name && (
                              <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                                <AlertCircle size={11} /> {miniErrors.name}
                              </p>
                            )}
                          </div>

                          {/* Email */}
                          <div>
                            <input
                              type="email"
                              name="email"
                              value={miniForm.email}
                              onChange={handleMiniFormChange}
                              placeholder="Email *"
                              maxLength={254}
                              autoComplete="email"
                              className={`w-full px-3 py-2.5 text-sm bg-[#f5f5f7] border rounded-xl text-[#001514] placeholder-[#6e6e73] focus:outline-none focus:ring-2 focus:bg-white transition-all duration-200 ${
                                miniErrors.email ? "border-red-400 focus:ring-red-200" : "border-[#d2d2d7] focus:ring-[#297373]/30 focus:border-[#297373]"
                              }`}
                            />
                            {miniErrors.email && (
                              <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                                <AlertCircle size={11} /> {miniErrors.email}
                              </p>
                            )}
                          </div>

                          {/* Service */}
                          <div>
                            <select
                              name="service"
                              value={miniForm.service}
                              onChange={handleMiniFormChange}
                              className="w-full px-3 py-2.5 text-sm bg-[#f5f5f7] border border-[#d2d2d7] rounded-xl text-[#001514] focus:outline-none focus:ring-2 focus:ring-[#297373]/30 focus:border-[#297373] focus:bg-white transition-all duration-200"
                            >
                              <option value="">Servicio de interés (opcional)</option>
                              {MINI_SERVICE_OPTIONS.map((opt) => (
                                <option key={opt} value={opt}>{opt}</option>
                              ))}
                            </select>
                          </div>

                          {/* Message */}
                          <div>
                            <textarea
                              name="message"
                              value={miniForm.message}
                              onChange={handleMiniFormChange}
                              rows={3}
                              placeholder="Describa brevemente su consulta *"
                              maxLength={500}
                              className={`w-full px-3 py-2.5 text-sm bg-[#f5f5f7] border rounded-xl text-[#001514] placeholder-[#6e6e73] focus:outline-none focus:ring-2 focus:bg-white transition-all duration-200 resize-none ${
                                miniErrors.message ? "border-red-400 focus:ring-red-200" : "border-[#d2d2d7] focus:ring-[#297373]/30 focus:border-[#297373]"
                              }`}
                            />
                            {miniErrors.message && (
                              <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                                <AlertCircle size={11} /> {miniErrors.message}
                              </p>
                            )}
                          </div>

                          {/* Server error */}
                          {miniServerError && (
                            <p className="text-xs text-red-500 flex items-center gap-1">
                              <AlertCircle size={11} /> {miniServerError}
                            </p>
                          )}

                          {/* Submit */}
                          <button
                            type="submit"
                            disabled={miniStatus === "loading"}
                            className="w-full flex items-center justify-center gap-2 bg-[#297373] hover:bg-[#0A1045] disabled:bg-[#297373]/50 text-white py-3 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer disabled:cursor-not-allowed"
                          >
                            {miniStatus === "loading" ? (
                              <><Loader2 size={15} className="animate-spin" /> Enviando...</>
                            ) : (
                              <><Send size={15} /> Enviar consulta</>
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={() => setView(aiMessages.length > 0 ? "chat" : "faq-list")}
                            className="flex items-center gap-2 text-[#6e6e73] hover:text-[#297373] text-xs transition-colors duration-200 cursor-pointer"
                          >
                            <ArrowLeft size={12} />
                            Volver
                          </button>
                        </motion.form>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {/* Footer */}
            <div className="px-5 py-4 border-t border-[#d2d2d7]/50 bg-[#fbfbfd]">
              {showFooterInput ? (
                <div className="flex items-center gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleInputKeyDown}
                    placeholder="Escriba su consulta..."
                    maxLength={500}
                    disabled={isChatLoading}
                    className="flex-1 bg-[#f5f5f7] border border-[#d2d2d7]/50 rounded-xl px-4 py-2.5 text-sm text-[#001514] placeholder-[#6e6e73] focus:outline-none focus:ring-2 focus:ring-[#297373]/30 focus:border-[#297373] focus:bg-white transition-all duration-200 disabled:opacity-50"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isChatLoading}
                    className="w-10 h-10 rounded-xl bg-[#297373] hover:bg-[#0A1045] disabled:bg-[#297373]/30 flex items-center justify-center text-white transition-colors duration-200 shrink-0 cursor-pointer disabled:cursor-not-allowed"
                    aria-label="Enviar mensaje"
                  >
                    {isChatLoading ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Send size={16} />
                    )}
                  </button>
                </div>
              ) : null}
              <p className="text-center text-xs text-[#6e6e73]/60 mt-3">
                SINTEC S.A. · Ingeniería de Integridad
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating Bubble ── */}
      <div className="relative">
        {showPulse && !isOpen && (
          <span className="absolute inset-0 rounded-full bg-[#297373] animate-ping opacity-30" />
        )}

        <motion.button
          onClick={isOpen ? handleClose : handleOpen}
          className="relative w-14 h-14 bg-[#297373] hover:bg-[#0A1045] rounded-full flex items-center justify-center text-white shadow-lg shadow-[#297373]/30 hover:shadow-[#297373]/50 transition-all duration-200 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={isOpen ? "Cerrar chat" : "Abrir chat"}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <X size={22} />
              </motion.div>
            ) : (
              <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <MessageCircle size={22} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {!isOpen && showPulse && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
            <span className="text-white text-[8px] font-bold">1</span>
          </span>
        )}
      </div>
    </div>
  );
}

export default ChatBot;
