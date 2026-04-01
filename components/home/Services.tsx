"use client";

import React from "react";
import Image from "next/image"; // Importar el componente Image de Next.js
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Shield,
  BarChart3,
  Search,
  Layers,
  Eye,
  FileText,
  ArrowRight,
} from "lucide-react";
import { StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SERVICES } from "@/lib/constants";

const iconMap: Record<string, React.ReactNode> = {
  Shield: <Shield size={28} />,
  BarChart3: <BarChart3 size={28} />,
  Search: <Search size={28} />,
  Layers: <Layers size={28} />,
  Eye: <Eye size={28} />,
  FileText: <FileText size={28} />,
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export function Services() {
  return (
    <section className="py-24 lg:py-32 bg-[#f5f5f7]" id="servicios">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <AnimatedSection variant="slideUp" className="text-center mb-16 lg:mb-20">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-[#297373]" />
            <span className="text-[#297373] text-sm font-medium tracking-widest uppercase">
              Lo que hacemos
            </span>
            <div className="h-px w-8 bg-[#297373]" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#001514] mb-6">
            Nuestros Servicios
          </h2>
          <p className="text-[#6e6e73] text-lg max-w-2xl mx-auto leading-relaxed">
            Soluciones especializadas en integridad industrial, diseñadas para
            maximizar la confiabilidad y seguridad de sus activos.
          </p>
        </AnimatedSection>

        {/* Services Grid */}
        <StaggerContainer
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          staggerDelay={0.08}
          initialDelay={0.1}
        >
          {SERVICES.map((service, index) => (
            <StaggerItem key={service.id}>
              <ServiceCard service={service} index={index} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Bottom CTA */}
        <AnimatedSection variant="slideUp" delay={0.3} className="text-center mt-16">
          <Link
            href="/soluciones"
            className="group inline-flex items-center gap-2 text-[#297373] font-semibold hover:gap-3 transition-all duration-200"
          >
            Ver todas las soluciones en detalle
            <ArrowRight
              size={18}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}

interface ServiceCardProps {
  service: (typeof SERVICES)[0];
  index: number;
}

function ServiceCard({ service }: ServiceCardProps) {
  return (
    <motion.div
      className="group bg-white rounded-2xl p-8 border border-[#d2d2d7]/50 hover:border-[#297373]/30 hover:shadow-xl hover:shadow-[#297373]/5 transition-all duration-300 cursor-pointer"
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={`/soluciones/${service.slug}`} className="block h-full">
        {/* Icon */}
        {/* Se agregó el componente Image para mostrar la imagen del servicio */}
        {service.imageSrc2 && (
          <div className="mb-8 w-full h-30 lg:h-40 rounded-2xl bg-[#f5f5f7] flex items-center justify-center relative overflow-hidden">
            <Image
              src={service.imageSrc2}
              alt={service.imageAlt}
              fill
              loading="lazy"
              className="object-contain rounded-2xl"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        )}
        <div className="w-14 h-14 rounded-xl bg-[#297373]/10 flex items-center justify-center text-[#297373] mb-6 group-hover:bg-[#297373] group-hover:text-white transition-all duration-300">
          {iconMap[service.icon]}
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-[#001514] mb-3 group-hover:text-[#297373] transition-colors duration-200">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-[#6e6e73] text-sm leading-relaxed mb-6">
          {service.shortDescription}
        </p>

        {/* CTA link */}
        <div className="flex items-center gap-2 text-[#297373] text-sm font-medium group/link">
          <span>Conocer más</span>
          <ArrowRight
            size={14}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </div>
      </Link>
    </motion.div>
  );
}

export default Services;
