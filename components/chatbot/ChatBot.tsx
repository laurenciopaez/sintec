"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, ArrowLeft, ExternalLink, Send } from "lucide-react";
import { FAQ_ITEMS, COMPANY_SHORT_NAME } from "@/lib/constants";
import { analytics } from "@/lib/analytics";

type ChatView = "faq-list" | "faq-answer";

interface ChatMessage {
  id: string;
  type: "bot" | "user";
  text: string;
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<ChatView>("faq-list");
  const [selectedFaq, setSelectedFaq] = useState<(typeof FAQ_ITEMS)[0] | null>(
    null
  );
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [showPulse, setShowPulse] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasAutoOpened = useRef(false);
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, view]);

  // Hide pulse after first open
  useEffect(() => {
    if (isOpen) {
      setShowPulse(false);
    }
  }, [isOpen]);

  // Auto-open after 15s of scroll activity
  useEffect(() => {
    const handleScroll = () => {
      if (hasAutoOpened.current) return;
      if (scrollTimerRef.current) return; // timer already running

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

  const handleOpen = () => {
    hasAutoOpened.current = true;
    if (scrollTimerRef.current) {
      clearTimeout(scrollTimerRef.current);
      scrollTimerRef.current = null;
    }
    setIsOpen(true);
    setView("faq-list");
    setSelectedFaq(null);
    analytics.chatbotOpen();
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleFaqSelect = (faq: (typeof FAQ_ITEMS)[0]) => {
    setSelectedFaq(faq);
    setView("faq-answer");
    analytics.chatbotFaqClick(faq.question);
  };

  const handleBack = () => {
    setSelectedFaq(null);
    setView("faq-list");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      {/* Chat Widget */}
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
                  <h3 className="text-white font-semibold text-sm">
                    {COMPANY_SHORT_NAME} S.A.
                  </h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-white/80 text-xs">
                      Asistente virtual
                    </span>
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
            <div
              className="overflow-y-auto"
              style={{ maxHeight: "420px", minHeight: "300px" }}
            >
              <AnimatePresence mode="wait">
                {/* FAQ List View */}
                {view === "faq-list" && (
                  <motion.div
                    key="faq-list"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="p-5"
                  >
                    {/* Greeting */}
                    <div className="flex gap-3 mb-5">
                      <div className="w-8 h-8 rounded-full bg-[#297373]/10 flex items-center justify-center shrink-0 mt-1">
                        <MessageCircle size={16} className="text-[#297373]" />
                      </div>
                      <div className="bg-[#f5f5f7] rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%]">
                        <p className="text-sm text-[#001514] leading-relaxed">
                          ¡Hola! Soy el asistente de <strong>SINTEC S.A.</strong>{" "}
                          ¿En qué puedo ayudarle hoy?
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

                {/* FAQ Answer View */}
                {view === "faq-answer" && selectedFaq && (
                  <motion.div
                    key="faq-answer"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                    className="p-5"
                  >
                    {/* User question bubble */}
                    <div className="flex justify-end mb-4">
                      <div className="bg-[#297373] text-white rounded-2xl rounded-tr-sm px-4 py-3 max-w-[85%]">
                        <p className="text-sm leading-relaxed">
                          {selectedFaq.question}
                        </p>
                      </div>
                    </div>

                    {/* Bot answer bubble */}
                    <div className="flex gap-3 mb-5">
                      <div className="w-8 h-8 rounded-full bg-[#297373]/10 flex items-center justify-center shrink-0 mt-1">
                        <MessageCircle size={16} className="text-[#297373]" />
                      </div>
                      <div className="bg-[#f5f5f7] rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%]">
                        <p className="text-sm text-[#001514] leading-relaxed">
                          {selectedFaq.answer}
                        </p>
                      </div>
                    </div>

                    {/* CTA button */}
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

                    {/* Back button */}
                    <button
                      onClick={handleBack}
                      className="flex items-center gap-2 text-[#6e6e73] hover:text-[#297373] text-sm transition-colors duration-200 pl-11 cursor-pointer"
                    >
                      <ArrowLeft size={14} />
                      Ver otras preguntas
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {/* Footer */}
            <div className="px-5 py-4 border-t border-[#d2d2d7]/50 bg-[#fbfbfd]">
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-[#f5f5f7] rounded-xl px-4 py-2.5 text-sm text-[#6e6e73] border border-[#d2d2d7]/50">
                  <span>¿Otra pregunta? Contáctenos...</span>
                </div>
                <Link
                  href="/#contacto"
                  onClick={handleClose}
                  className="w-10 h-10 rounded-xl bg-[#297373] hover:bg-[#0A1045] flex items-center justify-center text-white transition-colors duration-200 shrink-0"
                  aria-label="Ir a contacto"
                >
                  <Send size={16} />
                </Link>
              </div>
              <p className="text-center text-xs text-[#6e6e73]/60 mt-3">
                SINTEC S.A. · Ingeniería de Integridad
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Bubble Button */}
      <div className="relative">
        {/* Pulse ring */}
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
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <X size={22} />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <MessageCircle size={22} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Notification dot */}
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
