import type { Metadata } from "next";
import Link from "next/link";
import {
  Shield,
  BarChart3,
  Search,
  Layers,
  Eye,
  FileText,
  ArrowRight,
  Download,
} from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import { SERVICES } from "@/lib/constants";
import { SOLUCIONES_CONTENT } from "@/lib/content";

export const metadata: Metadata = {
  title: "Soluciones | SINTEC S.A.",
  description:
    "Conoce el portafolio completo de servicios de SINTEC S.A.: Integridad de Activos, RBI, Análisis de Falla, Control de Corrosión, Inspección y más.",
  openGraph: {
    type: "website",
    url: "https://sintecsa.com.ar/soluciones",
    title: "Soluciones | SINTEC S.A.",
    description:
      "Portafolio completo de servicios de ingeniería de integridad: RBI, análisis de falla, control de corrosión, inspección técnica y más.",
    images: [{ url: "/img/service1/RBI.jpg", width: 1200, height: 630, alt: "Soluciones SINTEC S.A." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Soluciones | SINTEC S.A.",
    description:
      "Portafolio completo de servicios de ingeniería de integridad: RBI, análisis de falla, control de corrosión, inspección técnica y más.",
    images: ["/img/service1/RBI.jpg"],
  },
  alternates: {
    canonical: "https://sintecsa.com.ar/soluciones",
  },
};

const iconMap: Record<string, React.ReactNode> = {
  Shield: <Shield size={28} />,
  BarChart3: <BarChart3 size={28} />,
  Search: <Search size={28} />,
  Layers: <Layers size={28} />,
  Eye: <Eye size={28} />,
  FileText: <FileText size={28} />,
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
                <Link
                  key={service.id}
                  href={`/soluciones/${service.slug}`}
                  className="px-4 py-2 rounded-full border border-white/20 hover:border-[#297373] hover:bg-[#297373] text-white/70 hover:text-white text-sm transition-all duration-200"
                >
                  {service.title}
                </Link>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection variant="slideUp" className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#001514] mb-4">
              {content.intro.title}
            </h2>
            <p className="text-[#6e6e73] text-lg max-w-3xl mx-auto leading-relaxed">
              {content.intro.text}
            </p>
          </AnimatedSection>

          {/* Services grid */}
          <StaggerContainer
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            staggerDelay={0.08}
            initialDelay={0.1}
          >
            {SERVICES.map((service, index) => (
              <StaggerItem key={service.id}>
                <Link
                  href={`/soluciones/${service.slug}`}
                  className="group block bg-white rounded-2xl p-8 border border-[#d2d2d7]/50 hover:border-[#297373]/30 hover:shadow-xl hover:shadow-[#297373]/5 transition-all duration-300 h-full"
                >
                  {/* Number */}
                  <span className="text-xs font-mono text-[#6e6e73] bg-[#f5f5f7] px-2.5 py-1 rounded-full mb-6 inline-block">
                    0{index + 1}
                  </span>

                  {/* Icon */}
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

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-[#297373] text-sm font-medium">
                    <span>Ver detalle</span>
                    <ArrowRight
                      size={14}
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Descarga catálogo */}
          <AnimatedSection variant="slideUp" delay={0.2} className="mt-12 text-center">
            <a
              href="./venta/colores.png"
              download
              className="inline-flex items-center gap-3 bg-[#A33400] hover:bg-[#1f5a5a] text-white px-8 py-4 rounded-xl font-semibold text-base transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-[#297373]/20"
            >
              <Download size={20} />
              Descargá nuestro catálogo completo de Soluciones
            </a>
          </AnimatedSection>
        </div>
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
