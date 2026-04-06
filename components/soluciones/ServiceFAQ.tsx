"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowLeft, MessageCircle } from "lucide-react";
import { SERVICES } from "@/lib/constants";
import { useConstants } from "@/lib/use-translations";
import { analytics } from "@/lib/analytics";

type FaqItem = { id: string; question: string; answer: string };

function FaqCard({ item, index }: { item: FaqItem; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      id={item.id}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="rounded-2xl border border-[#e5e5ea] bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      <button
        onClick={() => {
          analytics.chatbotFaqClick(item.question);
          setOpen((v) => !v);
        }}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left group"
        aria-expanded={open}
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="shrink-0 w-7 h-7 rounded-lg bg-[#A33400]/10 flex items-center justify-center text-[#A33400] text-xs font-bold font-mono">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-[#001514] font-semibold text-sm leading-snug group-hover:text-[#A33400] transition-colors duration-200">
            {item.question}
          </span>
        </div>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="shrink-0"
        >
          <ChevronDown
            size={18}
            className={`transition-colors duration-200 ${open ? "text-[#A33400]" : "text-[#6e6e73]"}`}
          />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 pt-0">
              <div className="h-px bg-[#f0f0f5] mb-4" />
              <p className="text-[#6e6e73] text-sm leading-relaxed">
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function ServiceFAQ({
  service,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  serviceIndex,
}: {
  service: (typeof SERVICES)[0];
  serviceIndex: number;
}) {
  const { SERVICES: services, SOLUTIONS_UI: ui } = useConstants();
  const s = service as Record<string, unknown>;
  const faqItems = Array.isArray(s.faq) ? (s.faq as FaqItem[]) : [];

  return (
    <motion.div
      key={`faq-${service.id}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="p-8 lg:p-12 h-full"
    >
      {/* Back link */}
      <Link
        href={`/soluciones/${service.slug}`}
        className="inline-flex items-center gap-2 text-[#6e6e73] hover:text-[#297373] text-sm font-medium mb-6 transition-colors duration-200 group"
      >
        <ArrowLeft
          size={14}
          className="group-hover:-translate-x-0.5 transition-transform duration-200"
        />
        {ui.backToService}
      </Link>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-mono text-[#6e6e73] bg-[#f5f5f7] px-3 py-1 rounded-full">
            {ui.serviceBadge} {String(serviceIndex + 1).padStart(2, "0")} /{" "}
            {String(services.length).padStart(2, "0")}
          </span>
          <span className="text-xs px-2.5 py-1 rounded-full bg-[#A33400]/10 text-[#A33400] font-medium border border-[#A33400]/20">
            FAQ
          </span>
        </div>
        <h2 className="text-2xl lg:text-3xl font-bold text-[#001514] leading-tight mb-1">
          {ui.faqHeading}
        </h2>
        <p className="text-[#6e6e73] text-sm">
          {service.title}
        </p>
      </div>

      {/* FAQ Cards */}
      <div className="space-y-3">
        {faqItems.map((item, i) => (
          <FaqCard key={item.id} item={item} index={i} />
        ))}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="mt-8 p-5 rounded-2xl bg-[#f5f5f7] border border-[#e5e5ea] flex items-start gap-4"
      >
        <div className="w-9 h-9 rounded-xl bg-[#297373] flex items-center justify-center shrink-0">
          <MessageCircle size={16} className="text-white" />
        </div>
        <div>
          <p className="text-[#001514] text-sm font-semibold mb-1">
            {ui.faqNotFound}
          </p>
          <p className="text-[#6e6e73] text-xs mb-3">
            {ui.faqContact}
          </p>
          <Link
            href="/#contacto"
            className="inline-flex items-center gap-2 bg-[#297373] hover:bg-[#0A1045] text-white px-4 py-2 rounded-xl font-semibold text-xs transition-colors duration-200"
          >
            {ui.faqConsult}
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}
