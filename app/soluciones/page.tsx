import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ServiceTabs } from "@/components/soluciones/ServiceTabs";
import { SERVICES } from "@/lib/constants";
import { SOLUCIONES_CONTENT } from "@/lib/content";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Soluciones | SINTEC S.A.",
  description:
    "Conoce el portafolio completo de servicios de SINTEC S.A.: Integridad de Activos, RBI, Análisis de Falla, Control de Corrosión, Inspección y más.",
};

export default function SolucionesPage() {
  const content = SOLUCIONES_CONTENT;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-[#001514] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#001514] via-[#001514] to-[#0A1045]" />
        <div className="absolute inset-0 hero-grid-bg opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-[#297373]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection variant="slideUp">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 bg-[#A33400]" />
              <span className="text-[#A33400] text-sm font-medium tracking-widest uppercase">
                Servicios especializados
              </span>
              <div className="h-px w-8 bg-[#A33400]" />
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6">
              {content.hero.title}
            </h1>
            <p className="text-white/60 text-xl max-w-2xl mx-auto leading-relaxed">
              {content.hero.subtitle}
            </p>
          </AnimatedSection>

          {/* Quick nav pills */}
          <AnimatedSection variant="slideUp" delay={0.3} className="mt-12">
            <div className="flex flex-wrap justify-center gap-3">
              {SERVICES.map((service) => (
                <a
                  key={service.id}
                  href={`#${service.slug}`}
                  className="px-4 py-2 rounded-full border border-white/20 hover:border-[#297373] hover:bg-[#297373] text-white/70 hover:text-white text-sm transition-all duration-200"
                >
                  {service.title}
                </a>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Tab viewer */}
      <section className="bg-[#f5f5f7]">
        <Suspense>
          <ServiceTabs />
        </Suspense>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-[#297373] relative overflow-hidden">
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
              className="inline-flex items-center gap-3 bg-white text-[#297373] hover:bg-white/90 px-8 py-4 rounded-xl font-bold text-base transition-all duration-200 shadow-xl"
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
