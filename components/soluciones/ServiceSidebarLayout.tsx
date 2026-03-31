"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Shield,
  BarChart3,
  Search,
  Layers,
  Eye,
  FileText,
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

export function ServiceSidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const activeSlug = pathname.split("/").pop() ?? "";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <div className="flex flex-col lg:flex-row gap-0 rounded-3xl overflow-hidden shadow-2xl border border-[#d2d2d7]/40">

        {/* ── Sidebar ── */}
        <div className="lg:w-72 xl:w-80 shrink-0 bg-[#001514] flex flex-col">

          {/* Header */}
          <div className="px-6 py-5 border-b border-white/10">
            <p className="text-white/40 text-xs font-semibold uppercase tracking-widest">
              Servicios
            </p>
          </div>

          {/* Mobile: horizontal scroll */}
          <div className="flex lg:hidden overflow-x-auto gap-1 p-3 scrollbar-none">
            {SERVICES.map((service) => {
              const isActive = service.slug === activeSlug;
              return (
                <Link
                  key={service.id}
                  href={`/soluciones/${service.slug}`}
                  className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-[#297373] text-white"
                      : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span className={isActive ? "text-white" : "text-white/50"}>
                    {iconMap[service.icon]}
                  </span>
                  <span className="whitespace-nowrap">{service.title}</span>
                </Link>
              );
            })}
          </div>

          {/* Desktop: vertical list */}
          <div className="hidden lg:flex flex-col py-3 flex-1">
            {SERVICES.map((service, index) => {
              const isActive = service.slug === activeSlug;
              return (
                <Link
                  key={service.id}
                  href={`/soluciones/${service.slug}`}
                  className={`group relative flex items-center gap-3 px-5 py-4 transition-all duration-200 ${
                    isActive
                      ? "bg-[#297373]/20 text-white"
                      : "text-white/50 hover:bg-white/5 hover:text-white/80"
                  }`}
                >
                  {/* Active bar */}
                  <span
                    className={`absolute left-0 top-0 bottom-0 w-0.5 transition-all duration-200 ${
                      isActive ? "bg-[#A33400]" : "bg-transparent"
                    }`}
                  />

                  {/* Icon */}
                  <span
                    className={`shrink-0 transition-colors duration-200 ${
                      isActive
                        ? "text-[#A33400]"
                        : "text-white/30 group-hover:text-white/60"
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
                </Link>
              );
            })}
          </div>

          {/* Footer CTA */}
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

        {/* ── Content panel ── */}
        <div className="flex-1 bg-white min-h-[520px] overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
