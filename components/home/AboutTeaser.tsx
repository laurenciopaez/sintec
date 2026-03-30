"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Award, Users, Globe } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const highlights = [
  {
    icon: <Award size={20} />,
    title: "Certificaciones Internacionales",
    description: "API, NACE, ASME y más estándares de clase mundial",
  },
  {
    icon: <Users size={20} />,
    title: "Equipo Especializado",
    description: "Ingenieros con certificaciones y experiencia comprobada",
  },
  {
    icon: <Globe size={20} />,
    title: "Cobertura Nacional",
    description: "Proyectos en todo el territorio argentino",
  },
];

const keyPoints = [
  "Más de 20 años de trayectoria en la industria",
  "Metodologías internacionales API, ASME y NACE",
  "Equipo certificado en END/NDT y RBI",
  "Enfoque integral desde evaluación hasta solución",
];

export function AboutTeaser() {
  return (
    <section className="py-24 lg:py-32 bg-white overflow-hidden" id="nosotros">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Visual element */}
          <AnimatedSection variant="slideRight" className="relative order-2 lg:order-1">
            {/* Main card */}
            <div className="relative">
              {/* Background decoration */}
              <div className="absolute -top-4 -left-4 w-full h-full bg-[#0066cc]/5 rounded-3xl" />
              <div className="absolute -bottom-4 -right-4 w-full h-full bg-[#f5f5f7] rounded-3xl" />

              {/* Main content block */}
              <div className="relative bg-[#1d1d1f] rounded-3xl p-8 lg:p-10">
                <div className="text-[#3399ff] text-sm font-medium tracking-widest uppercase mb-6">
                  Quiénes somos
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Expertos en Integridad Industrial
                </h3>
                <p className="text-white/60 text-sm leading-relaxed mb-8">
                  Fundada en 2004, SINTEC S.A. es una consultora argentina de
                  referencia en ingeniería de integridad. Trabajamos con las
                  principales empresas de oil & gas, petroquímica y energía del
                  país.
                </p>

                {/* Stats mini */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
                  {[
                    { value: "2004", label: "Fundada" },
                    { value: "+20", label: "Años" },
                    { value: "+150", label: "Proyectos" },
                  ].map((item) => (
                    <div key={item.label} className="text-center">
                      <div className="text-2xl font-bold text-white mb-1">
                        {item.value}
                      </div>
                      <div className="text-xs text-white/40">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating highlight cards */}
              {highlights.map((item, index) => (
                <motion.div
                  key={index}
                  className={`absolute ${
                    index === 0
                      ? "-top-6 -right-6"
                      : index === 1
                      ? "-bottom-6 -left-6"
                      : "bottom-20 -right-8"
                  } bg-white rounded-2xl p-4 shadow-xl border border-[#d2d2d7]/50 max-w-48`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.15, duration: 0.5 }}
                  viewport={{ once: true }}
                  animate={{
                    y: [0, index % 2 === 0 ? -6 : 6, 0],
                  }}
                  style={{
                    animationDuration: `${3 + index}s`,
                    animationIterationCount: "infinite",
                    animationTimingFunction: "ease-in-out",
                  }}
                >
                  <div className="w-8 h-8 rounded-lg bg-[#0066cc]/10 flex items-center justify-center text-[#0066cc] mb-2">
                    {item.icon}
                  </div>
                  <div className="text-xs font-semibold text-[#1d1d1f] mb-1">
                    {item.title}
                  </div>
                  <div className="text-xs text-[#6e6e73]">
                    {item.description}
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>

          {/* Right: Text content */}
          <AnimatedSection variant="slideLeft" className="order-1 lg:order-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-[#0066cc]" />
              <span className="text-[#0066cc] text-sm font-medium tracking-widest uppercase">
                Sobre nosotros
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-bold text-[#1d1d1f] mb-6 leading-tight">
              Ingeniería con propósito y precisión
            </h2>

            <p className="text-[#6e6e73] text-lg leading-relaxed mb-8">
              En SINTEC S.A. combinamos experiencia técnica, metodologías
              internacionales y un equipo de ingenieros apasionados para ofrecer
              soluciones de integridad que protegen personas, activos e
              inversiones.
            </p>

            {/* Key points */}
            <div className="space-y-3 mb-10">
              {keyPoints.map((point, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <CheckCircle
                    size={20}
                    className="text-[#0066cc] shrink-0 mt-0.5"
                  />
                  <span className="text-[#1d1d1f] text-base">{point}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <Link
              href="/quienes-somos"
              className="group inline-flex items-center gap-3 bg-[#0066cc] hover:bg-[#004499] text-white px-7 py-3.5 rounded-xl font-semibold text-base transition-all duration-200"
            >
              Conocer más sobre nosotros
              <ArrowRight
                size={18}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

export default AboutTeaser;
