"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CLIENT_1, CLIENT_2, CLIENT_3, CLIENT_4, CLIENT_5, CLIENT_6, CLIENT_7 } from "@/lib/images/index";

const LOGOS = [
  { src: CLIENT_1, alt: "YPF" },
  { src: CLIENT_2, alt: "Pan American Energy" },
  { src: CLIENT_3, alt: "Hokchi Energy" },
  { src: CLIENT_4, alt: "Termap" },
  { src: CLIENT_5, alt: "Tecpetrol" },
  { src: CLIENT_6, alt: "Oldelval" },
  { src: CLIENT_7, alt: "Pluspetrol" },
];

// Duplicamos para el loop infinito
const LOGOS_DOUBLED = [...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS,...LOGOS, ...LOGOS];

export function Clients() {
  return (
    <section className="py-8 lg:py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-[#d2d2d7]/60" />
          <span className="text-[#6e6e73] text-sm font-medium tracking-widest uppercase whitespace-nowrap">
            Empresas que confían en nosotros
          </span>
          <div className="h-px flex-1 bg-[#d2d2d7]/60" />
        </div>
      </div>

      {/* Marquee */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 h-full w-24 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />
        <div className="absolute right-0 top-0 h-full w-24 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />

        <motion.div
          className="flex gap-14 items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 150,
            ease: "linear",
            repeat: Infinity,
          }}
          style={{ width: "max-content" }}
        >
          {LOGOS_DOUBLED.map((logo, i) => (
            <div
              key={i}
              className="flex-shrink-0 h-50 w-36 relative grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                fill
                className="object-contain"
                sizes="144px"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
