"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  BarChart3,
  Search,
  Layers,
  Eye,
  FileText,
  CheckCircle,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { SERVICES } from "@/lib/constants";

const iconMap: Record<string, React.ReactNode> = {
  Shield: <Shield size={22} />,
  BarChart3: <BarChart3 size={22} />,
  Search: <Search size={22} />,
  Layers: <Layers size={22} />,
  Eye: <Eye size={22} />,
  FileText: <FileText size={22} />,
};

const iconMapLarge: Record<string, React.ReactNode> = {
  Shield: <Shield size={36} />,
  BarChart3: <BarChart3 size={36} />,
  Search: <Search size={36} />,
  Layers: <Layers size={36} />,
  Eye: <Eye size={36} />,
  FileText: <FileText size={36} />,
};

const standardsByIndex: string[][] = [
  ["API 571", "ASME", "ISO 31000"],
  ["API 580", "API 581", "DNV RP-G101"],
  ["ASTM E45", "AWS D1.1", "ASME IX"],
  ["NACE SP0169", "ISO 15589", "NACE CIP"],
  ["ASNT SNT-TC-1A", "EN 9712", "API 650"],
  ["API 570", "ASME B31.3", "NACE RP0188"],
];

export function ServiceTabs({ initialSlug }: { initialSlug?: string }) {
  const [activeId, setActiveId] = useState(
    initialSlug || SERVICES[0].id
  );

  // Read URL hash on mount and on change
  useEffect(() => {
    const readHash = () => {
      const hash = window.location.hash.replace("#", "");
      const match = SERVICES.find((s) => s.slug === hash || s.id === hash);
      if (match) setActiveId(match.id);
    };
    readHash();
    window.addEventListener("hashchange", readHash);
    return () => window.removeEventListener("hashchange", readHash);
  }, []);

  const activeService = SERVICES.find((s) => s.id === activeId) ?? SERVICES[0];
  const activeIndex = SERVICES.findIndex((s) => s.id === activeId);

  const handleTabClick = (id: string, slug: string) => {
    setActiveId(id);
    history.replaceState(null, "", `#${slug}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <div className="flex flex-col lg:flex-row gap-0 rounded-3xl overflow-hidden shadow-2xl border border-[#d2d2d7]/40">

        {/* ── Tab Sidebar ── */}
        <div className="lg:w-72 xl:w-80 shrink-0 bg-[#001514] flex flex-col">

          {/* Sidebar header */}
          <div className="px-6 py-5 border-b border-white/10">
            <p className="text-white/40 text-xs font-semibold uppercase tracking-widest">
              Servicios
            </p>
          </div>

          {/* Mobile: horizontal scroll tabs */}
          <div className="flex lg:hidden overflow-x-auto gap-1 p-3 scrollbar-none">
            {SERVICES.map((service, index) => {
              const isActive = service.id === activeId;
              return (
                <button
                  key={service.id}
                  onClick={() => handleTabClick(service.id, service.slug)}
                  className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[#297373] text-white"
                      : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span className={isActive ? "text-white" : "text-white/50"}>
                    {iconMap[service.icon]}
                  </span>
                  <span className="whitespace-nowrap">{service.title}</span>
                </button>
              );
            })}
          </div>

          {/* Desktop: vertical tabs */}
          <div className="hidden lg:flex flex-col py-3 flex-1">
            {SERVICES.map((service, index) => {
              const isActive = service.id === activeId;
              return (
                <button
                  key={service.id}
                  onClick={() => handleTabClick(service.id, service.slug)}
                  className={`group relative flex items-center gap-3 px-5 py-4 text-left transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[#297373]/20 text-white"
                      : "text-white/50 hover:bg-white/5 hover:text-white/80"
                  }`}
                >
                  {/* Active indicator bar */}
                  <span
                    className={`absolute left-0 top-0 bottom-0 w-0.5 transition-all duration-200 ${
                      isActive ? "bg-[#A33400]" : "bg-transparent"
                    }`}
                  />

                  {/* Icon */}
                  <span
                    className={`shrink-0 transition-colors duration-200 ${
                      isActive ? "text-[#A33400]" : "text-white/30 group-hover:text-white/60"
                    }`}
                  >
                    {iconMap[service.icon]}
                  </span>

                  {/* Label */}
                  <div className="flex-1 min-w-0">
                    <span className="text-xs text-white/25 font-mono">
                      0{index + 1}
                    </span>
                    <p
                      className={`text-sm font-medium leading-tight mt-0.5 truncate ${
                        isActive ? "text-white" : ""
                      }`}
                    >
                      {service.title}
                    </p>
                  </div>

                  {/* Arrow */}
                  <ChevronRight
                    size={14}
                    className={`shrink-0 transition-all duration-200 ${
                      isActive
                        ? "text-white/60 translate-x-0.5"
                        : "text-white/20 group-hover:text-white/40"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Sidebar footer */}
          <div className="hidden lg:block px-5 py-4 border-t border-white/10 mt-auto">
            <Link
              href="/#contacto"
              className="flex items-center justify-center gap-2 w-full bg-[#A33400] hover:bg-[#8a2c00] text-white text-sm font-semibold py-3 rounded-xl transition-colors duration-200"
            >
              Consultar ahora
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* ── Content Panel ── */}
        <div className="flex-1 bg-white min-h-[520px] relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="p-8 lg:p-12 h-full"
            >
              {/* Service number badge */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs font-mono text-[#6e6e73] bg-[#f5f5f7] px-3 py-1 rounded-full">
                  Servicio 0{activeIndex + 1} / 06
                </span>
                <div className="flex gap-1.5">
                  {standardsByIndex[activeIndex].map((std) => (
                    <span
                      key={std}
                      className="text-xs px-2.5 py-1 rounded-full bg-[#297373]/10 text-[#297373] font-medium border border-[#297373]/20"
                    >
                      {std}
                    </span>
                  ))}
                </div>
              </div>

              {/* Title + icon */}
              <div className="flex items-start gap-5 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-[#001514] flex items-center justify-center text-white shrink-0">
                  {iconMapLarge[activeService.icon]}
                </div>
                <div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-[#001514] leading-tight">
                    {activeService.title}
                  </h2>
                  <p className="text-[#297373] text-sm font-medium mt-1">
                    {activeService.shortDescription}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-[#6e6e73] leading-relaxed text-base mb-8 max-w-2xl">
                {activeService.description}
              </p>

              {/* Features grid */}
              <div className="mb-8">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-[#6e6e73] mb-4">
                  Alcance del servicio
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeService.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-3 bg-[#f5f5f7] rounded-xl px-4 py-3"
                    >
                      <CheckCircle size={16} className="text-[#297373] shrink-0" />
                      <span className="text-[#001514] text-sm font-medium">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Image placeholder */}
              <div className="mb-8 w-full h-40 lg:h-52 rounded-2xl bg-[#f5f5f7] border-2 border-dashed border-[#d2d2d7] flex items-center justify-center">
                <p className="text-[#6e6e73] text-sm">
                  Imagen / {activeService.title}
                </p>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/#contacto"
                  className="inline-flex items-center justify-center gap-2 bg-[#297373] hover:bg-[#0A1045] text-white px-6 py-3 rounded-xl font-semibold text-sm transition-colors duration-200"
                >
                  Consultar sobre este servicio
                  <ArrowRight size={15} />
                </Link>
                <Link
                  href="/quienes-somos"
                  className="inline-flex items-center justify-center gap-2 border border-[#d2d2d7] hover:border-[#297373] text-[#001514] hover:text-[#297373] px-6 py-3 rounded-xl font-semibold text-sm transition-colors duration-200"
                >
                  Conocer el equipo
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
