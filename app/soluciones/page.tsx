import type { Metadata } from "next";
import Link from "next/link";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/AnimatedSection";
import { SERVICES } from "@/lib/constants";
import { SOLUCIONES_CONTENT } from "@/lib/content";
import {
  Shield,
  BarChart3,
  Search,
  Layers,
  Eye,
  FileText,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Soluciones | SINTEC S.A.",
  description:
    "Conoce el portafolio completo de servicios de SINTEC S.A.: Integridad de Activos, RBI, Análisis de Falla, Control de Corrosión, Inspección y más.",
};

const iconMap: Record<string, React.ReactNode> = {
  Shield: <Shield size={32} />,
  BarChart3: <BarChart3 size={32} />,
  Search: <Search size={32} />,
  Layers: <Layers size={32} />,
  Eye: <Eye size={32} />,
  FileText: <FileText size={32} />,
};

export default function SolucionesPage() {
  const content = SOLUCIONES_CONTENT;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-[#1d1d1f] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#000000] via-[#1d1d1f] to-[#0a1628]" />
        <div className="absolute inset-0 hero-grid-bg opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-[#0066cc]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection variant="slideUp">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 bg-[#3399ff]" />
              <span className="text-[#3399ff] text-sm font-medium tracking-widest uppercase">
                Servicios especializados
              </span>
              <div className="h-px w-8 bg-[#3399ff]" />
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6">
              {content.hero.title}
            </h1>
            <p className="text-white/60 text-xl max-w-2xl mx-auto leading-relaxed">
              {content.hero.subtitle}
            </p>
          </AnimatedSection>

          {/* Quick nav */}
          <AnimatedSection variant="slideUp" delay={0.3} className="mt-12">
            <div className="flex flex-wrap justify-center gap-3">
              {SERVICES.map((service) => (
                <a
                  key={service.id}
                  href={`#${service.slug}`}
                  className="px-4 py-2 rounded-full border border-white/20 hover:border-[#0066cc] hover:bg-[#0066cc] text-white/70 hover:text-white text-sm transition-all duration-200"
                >
                  {service.title}
                </a>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection variant="slideUp">
            <h2 className="text-3xl font-bold text-[#1d1d1f] mb-4">
              {content.intro.title}
            </h2>
            <p className="text-[#6e6e73] text-lg leading-relaxed">
              {content.intro.text}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Services Detailed */}
      <section className="pb-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {SERVICES.map((service, index) => {
              const isEven = index % 2 === 0;

              return (
                <AnimatedSection
                  key={service.id}
                  id={service.slug}
                  variant={isEven ? "slideRight" : "slideLeft"}
                  delay={0.1}
                  className="scroll-mt-20"
                >
                  <div
                    className={`grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden border border-[#d2d2d7]/50 shadow-sm hover:shadow-lg transition-shadow duration-300 ${
                      isEven ? "" : ""
                    }`}
                  >
                    {/* Content Panel */}
                    <div
                      className={`p-8 lg:p-12 bg-white ${
                        isEven ? "order-1" : "order-1 lg:order-2"
                      }`}
                    >
                      {/* Service number + icon */}
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 rounded-2xl bg-[#0066cc] flex items-center justify-center text-white">
                          {iconMap[service.icon]}
                        </div>
                        <div>
                          <span className="text-xs text-[#6e6e73] uppercase tracking-widest font-medium">
                            Servicio 0{index + 1}
                          </span>
                          <h2 className="text-2xl font-bold text-[#1d1d1f] mt-0.5">
                            {service.title}
                          </h2>
                        </div>
                      </div>

                      <p className="text-[#6e6e73] leading-relaxed mb-6">
                        {service.description}
                      </p>

                      {/* Features */}
                      <div className="space-y-2.5 mb-8">
                        {service.features.map((feature) => (
                          <div
                            key={feature}
                            className="flex items-center gap-3"
                          >
                            <CheckCircle
                              size={18}
                              className="text-[#0066cc] shrink-0"
                            />
                            <span className="text-[#1d1d1f] text-sm">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* CTA */}
                      <Link
                        href="/#contacto"
                        className="group inline-flex items-center gap-2 text-[#0066cc] font-semibold hover:gap-3 transition-all duration-200"
                      >
                        Consultar sobre este servicio
                        <ArrowRight
                          size={16}
                          className="transition-transform duration-200 group-hover:translate-x-1"
                        />
                      </Link>
                    </div>

                    {/* Visual Panel */}
                    <div
                      className={`${
                        isEven ? "order-2" : "order-2 lg:order-1"
                      } bg-gradient-to-br from-[#1d1d1f] to-[#0a1628] p-8 lg:p-12 flex flex-col justify-center min-h-[300px] lg:min-h-0 relative overflow-hidden`}
                    >
                      {/* Background decoration */}
                      <div className="absolute inset-0 hero-grid-bg opacity-20" />
                      <div className="absolute top-0 right-0 w-64 h-64 bg-[#0066cc]/10 rounded-full blur-3xl" />

                      <div className="relative">
                        {/* Large icon backdrop */}
                        <div className="w-24 h-24 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-white/20 mb-6">
                          <div className="scale-150">
                            {iconMap[service.icon]}
                          </div>
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-3">
                          {service.title}
                        </h3>
                        <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-sm">
                          {service.shortDescription}
                        </p>

                        {/* Standards tags */}
                        <div className="flex flex-wrap gap-2">
                          {[
                            index === 0
                              ? ["API 571", "ASME", "ISO 31000"]
                              : index === 1
                              ? ["API 580", "API 581", "DNV RP-G101"]
                              : index === 2
                              ? ["ASTM E45", "AWS D1.1", "ASME IX"]
                              : index === 3
                              ? ["NACE SP0169", "ISO 15589", "NACE CIP"]
                              : index === 4
                              ? ["ASNT SNT-TC-1A", "EN 9712", "API 650"]
                              : ["API 570", "ASME B31.3", "NACE RP0188"],
                          ]
                            .flat()
                            .map((std) => (
                              <span
                                key={std}
                                className="px-3 py-1 rounded-full bg-white/10 text-white/60 text-xs border border-white/10"
                              >
                                {std}
                              </span>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-[#0066cc] relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 hero-grid-bg opacity-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-white/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection variant="scaleIn">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              {content.cta.title}
            </h2>
            <p className="text-white/80 text-xl mb-10 max-w-2xl mx-auto">
              {content.cta.subtitle}
            </p>
            <Link
              href="/#contacto"
              className="inline-flex items-center gap-3 bg-white text-[#0066cc] hover:bg-white/90 px-8 py-4 rounded-xl font-bold text-base transition-all duration-200 shadow-xl"
            >
              {content.cta.button}
              <ArrowRight size={18} />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
