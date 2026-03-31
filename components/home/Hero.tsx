"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { COMPANY_TAGLINE } from "@/lib/constants";

const words = ["SINTEC", "S.A."];
const taglineWords = COMPANY_TAGLINE.split(" ");

export function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#001514]">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#001514] via-[#001514] to-[#0A1045]" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 hero-grid-bg opacity-40" />

      {/* Blue accent glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#297373]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#297373]/5 rounded-full blur-2xl pointer-events-none" />

      {/* Decorative lines */}
      <div className="absolute left-0 top-0 w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent" />
      <div className="absolute right-0 top-0 w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Tag line above */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <div className="h-px w-12 bg-[#297373]" />
          <span className="text-[#A33400] text-sm font-medium tracking-widest uppercase">
            Ingeniería de Integridad Industrial
          </span>
          <div className="h-px w-12 bg-[#297373]" />
        </motion.div>

        {/* Main Headline */}
        <div className="overflow-hidden mb-6">
          <h1 className="text-7xl sm:text-8xl md:text-9xl font-bold text-white leading-none tracking-tight">
            {words.map((word, wordIndex) => (
              <span key={wordIndex} className="inline-block overflow-hidden mr-4 last:mr-0">
                <motion.span
                  className={`inline-block ${wordIndex === 1 ? "text-[#297373]" : ""}`}
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  transition={{
                    duration: 0.8,
                    delay: 0.4 + wordIndex * 0.15,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>
        </div>

        {/* Tagline */}
        <div className="flex flex-wrap justify-center gap-x-2 gap-y-1 mb-12 max-w-3xl mx-auto">
          {taglineWords.map((word, index) => (
            <motion.span
              key={index}
              className="text-xl sm:text-2xl md:text-3xl text-white/70 font-light"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.9 + index * 0.05,
                ease: "easeOut",
              }}
            >
              {word}
            </motion.span>
          ))}
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <Link
            href="/soluciones"
            className="group inline-flex items-center gap-3 bg-[#297373] hover:bg-[#0A1045] text-white px-8 py-4 rounded-xl font-semibold text-base transition-all duration-300 shadow-lg shadow-[#297373]/20 hover:shadow-[#297373]/40"
          >
            Conocer Soluciones
            <ArrowRight
              size={18}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
          <a
            href="#contacto"
            className="group inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold text-base transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/40"
          >
            Contactar
          </a>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.7 }}
          className="flex flex-wrap justify-center gap-8 sm:gap-12"
        >
          {[
            { value: "+20", label: "Años de experiencia" },
            { value: "+1000", label: "Proyectos completados" },
            { value: "+10", label: "Clientes activos" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-white/50">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.6 }}
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Hero;
