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
  FolderOpen,
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
    setCurrent(0);
  }, [images]);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [images]);

  if (!images || images.length === 0) {
    return (
      <div className="mb-8 w-full h-60 lg:h-80 rounded-2xl bg-[#f5f5f7] flex items-center justify-center">
        <span className="text-[#6e6e73] text-sm">Imagen no disponible</span>
      </div>
    );
  }

  const currentImage = images[current];

  return (
    <div className="mb-8">
      <div className="w-full h-60 lg:h-80 rounded-2xl bg-[#f5f5f7] relative overflow-hidden">
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
              sizes="(max-width: 768px) 100vw, 60vw"
              priority={current === 0}
            />
          </motion.div>
        </AnimatePresence>
        {images.length > 1 && (
          <>
            <button
              onClick={() =>
                setCurrent((prev) => (prev - 1 + images.length) % images.length)
              }
              aria-label="Imagen anterior"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#297373]"
            >
              <ChevronLeft size={18} className="text-[#297373]" />
            </button>
            <button
              onClick={() => setCurrent((prev) => (prev + 1) % images.length)}
              aria-label="Imagen siguiente"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#297373]"
            >
              <ChevronRight size={18} className="text-[#297373]" />
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Ver imagen ${i + 1}`}
                  aria-current={i === current ? "true" : undefined}
                  className={`h-1.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#297373] ${
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
    <motion.div
      key={service.id}
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="p-8 lg:p-12 h-full relative"
    >
      {/* FAQ file tab */}
      <motion.div
        className="absolute top-0 right-8"
        initial={{ y: -4, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.18, duration: 0.25 }}
      >
        <Link
          href={`/soluciones/${service.slug}/faq`}
          className="group flex items-center gap-1.5 bg-[#A33400] hover:bg-[#8a2c00] text-white px-3.5 py-2 text-xs font-semibold transition-colors duration-200 rounded-b-xl shadow-md"
          style={{ borderTop: "none" }}
        >
          <FolderOpen
            size={13}
            className="group-hover:scale-110 transition-transform duration-200"
          />
          FAQ
        </Link>
      </motion.div>

      {/* Badge row */}
      <div className="flex items-center gap-3 mb-6">
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

      {/* Title + icon */}
      <div className="flex items-start gap-5 mb-6">
        <div className="w-16 h-16 rounded-2xl bg-[#001514] flex items-center justify-center text-white shrink-0">
          {iconMapLarge[service.icon]}
        </div>
        <div>
          <h2 className="text-3xl lg:text-4xl font-bold text-[#001514] leading-tight">
            {service.title}
          </h2>
          <p className="text-[#297373] text-sm font-medium mt-1">
            {service.shortDescription}
          </p>
        </div>
      </div>

      {/* Description */}
      <p
        className={`text-[#6e6e73] leading-relaxed text-base max-w-2xl ${
          alcanceList || valorAgregadoList ? "mb-4" : "mb-8"
        }`}
      >
        {service.description}
      </p>

      {alcanceList && (
        <div className={valorAgregadoList ? "mb-4" : "mb-8"}>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#6e6e73] mb-2">
            Alcance
          </p>
          <ul className="space-y-1">
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
          <p className="text-xs font-semibold uppercase tracking-widest text-[#6e6e73] mb-2">
            Valor Agregado
          </p>
          <ul className="space-y-1">
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
    </motion.div>
  );
}
