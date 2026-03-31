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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import { SERVICES } from "@/lib/constants";

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

type ServiceImage = { src: string; description: string };

function ServiceImageCarousel({
  images,
  alt,
}: {
  images: ServiceImage[];
  alt: string;
}) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [images]);

  if (!images || images.length === 0) {
    return (
      <div className="mb-8 w-full h-60 lg:h-90 rounded-2xl bg-[#f5f5f7] flex items-center justify-center">
        <span className="text-[#6e6e73] text-sm">Imagen no disponible</span>
      </div>
    );
  }

  const currentImage = images[current];

  return (
    <div className="mb-8">
      <div className="w-full h-60 lg:h-90 rounded-2xl bg-[#f5f5f7] relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            <Image
              src={currentImage.src}
              alt={alt}
              fill
              className="object-contain rounded-2xl"
              sizes="(max-width: 768px) 100vw, 70vw"
            />
          </motion.div>
        </AnimatePresence>
        {images.length > 1 && (
          <>
            <button
              onClick={() =>
                setCurrent((prev) => (prev - 1 + images.length) % images.length)
              }
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow transition-all duration-200"
            >
              <ChevronLeft size={18} className="text-[#297373]" />
            </button>
            <button
              onClick={() => setCurrent((prev) => (prev + 1) % images.length)}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow transition-all duration-200"
            >
              <ChevronRight size={18} className="text-[#297373]" />
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === current
                      ? "bg-[#297373] w-4"
                      : "bg-[#297373]/30 w-1.5"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      {currentImage.description && (
        <AnimatePresence mode="wait">
          <motion.p
            key={current}
            className="mt-2 text-center text-xs text-[#6e6e73] italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {currentImage.description}
          </motion.p>
        </AnimatePresence>
      )}
    </div>
  );
}

export function ServiceDetail({
  service,
  serviceIndex,
}: {
  service: (typeof SERVICES)[0];
  serviceIndex: number;
}) {
  const s = service as Record<string, unknown>;
  const alcanceList = Array.isArray(s.alcance)
    ? (s.alcance as string[])
    : undefined;
  const valorAgregadoList = Array.isArray(s.valorAgregado)
    ? (s.valorAgregado as string[])
    : undefined;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <div className="bg-white rounded-3xl shadow-2xl border border-[#d2d2d7]/40 p-8 lg:p-12">
        {/* Badge row */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="text-xs font-mono text-[#6e6e73] bg-[#f5f5f7] px-3 py-1 rounded-full">
            Servicio {String(serviceIndex + 1).padStart(2, "0")} /{" "}
            {String(SERVICES.length).padStart(2, "0")}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {standardsByIndex[serviceIndex]?.map((std) => (
              <span
                key={std}
                className="text-xs px-2.5 py-1 rounded-full bg-[#297373]/10 text-[#297373] font-medium border border-[#297373]/20"
              >
                {std}
              </span>
            ))}
          </div>
        </div>

        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl bg-[#001514] flex items-center justify-center text-white mb-6">
          {iconMapLarge[service.icon]}
        </div>

        {/* Description */}
        <p
          className={`text-[#6e6e73] leading-relaxed text-base max-w-3xl ${
            alcanceList || valorAgregadoList ? "mb-4" : "mb-8"
          }`}
        >
          {service.description}
        </p>

        {alcanceList && (
          <div className={valorAgregadoList ? "mb-4" : "mb-8"}>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#6e6e73] mb-3">
              Alcance
            </p>
            <ul className="space-y-1.5">
              {alcanceList.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-[#6e6e73] text-sm"
                >
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#297373] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {valorAgregadoList && (
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#6e6e73] mb-3">
              Valor Agregado
            </p>
            <ul className="space-y-1.5">
              {valorAgregadoList.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-[#6e6e73] text-sm"
                >
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#A33400] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Features grid */}
        <div className="mb-8">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-[#6e6e73] mb-4">
            Alcance del servicio
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {service.features.map((feature) => (
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

        {/* Image carousel */}
        <ServiceImageCarousel
          images={service.imageSrc as ServiceImage[]}
          alt={service.imageAlt}
        />

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/#contacto"
            className="inline-flex items-center justify-center gap-2 bg-[#297373] hover:bg-[#0A1045] text-white px-6 py-3 rounded-xl font-semibold text-sm transition-colors duration-200"
          >
            Consultar sobre este servicio
            <ArrowRight size={15} />
          </Link>
          <Link
            href="/soluciones"
            className="inline-flex items-center justify-center gap-2 border border-[#d2d2d7] hover:border-[#297373] text-[#001514] hover:text-[#297373] px-6 py-3 rounded-xl font-semibold text-sm transition-colors duration-200"
          >
            Ver todos los servicios
          </Link>
        </div>
      </div>
    </div>
  );
}
