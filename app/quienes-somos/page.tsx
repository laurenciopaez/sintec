import type { Metadata } from "next";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import { QUIENES_SOMOS_CONTENT } from "@/lib/content";
import { VALUES } from "@/lib/constants";
import {
  Award,
  Shield,
  Heart,
  Lightbulb,
  TrendingUp,
  Users,
  CheckCircle,
  Zap,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Quiénes Somos | SINTEC S.A.",
  description:
    "Conoce la historia, misión, visión y valores de SINTEC S.A., consultora argentina líder en ingeniería de integridad industrial desde 2004.",
  openGraph: {
    type: "website",
    url: "https://sintecsa.com.ar/quienes-somos",
    title: "Quiénes Somos | SINTEC S.A.",
    description:
      "Conoce la historia, misión, visión y valores de SINTEC S.A., consultora argentina líder en ingeniería de integridad industrial desde 2004.",
    images: [{ url: "/img/quienesSomos/integridadProfesional.jpeg", width: 1200, height: 630, alt: "Equipo SINTEC S.A." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Quiénes Somos | SINTEC S.A.",
    description:
      "Conoce la historia, misión, visión y valores de SINTEC S.A., consultora argentina líder en ingeniería de integridad industrial desde 2004.",
    images: ["/img/quienesSomos/integridadProfesional.jpeg"],
  },
};

const iconMap: Record<string, React.ReactNode> = {
  Award: <Award size={24} />,
  Shield: <Shield size={24} />,
  Heart: <Heart size={24} />,
  Lightbulb: <Lightbulb size={24} />,
  TrendingUp: <TrendingUp size={22} />,
  Users: <Users size={22} />,
  CheckCircle: <CheckCircle size={22} />,
  Zap: <Zap size={22} />,
  MapPin: <MapPin size={22} />,
};

export default function QuienesSomosPage() {
  const content = QUIENES_SOMOS_CONTENT;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-[#001514] overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#001514] via-[#001514] to-[#0A1045]" />
        <div className="absolute inset-0 hero-grid-bg opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-[#297373]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection variant="slideUp">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 bg-[#A33400]" />
              <span className="text-[#A33400] text-sm font-medium tracking-widest uppercase">
                La empresa
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
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <AnimatedSection variant="slideRight">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-[#297373]" />
                <span className="text-[#297373] text-sm font-medium tracking-widest uppercase">
                  Nuestra historia
                </span>
              </div>
              <h2 className="text-4xl font-bold text-[#001514] mb-8">
                {content.story.title}
              </h2>
              <div className="space-y-5">
                {content.story.paragraphs.map((paragraph, index) => (
                  <p key={index} className="text-[#6e6e73] text-base leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </AnimatedSection>

            {/* Visual */}
            <AnimatedSection variant="slideLeft" delay={0.1}>
              <div className="relative">
                {/* Timeline card */}
                <div className="bg-[#f5f5f7] rounded-3xl p-8">
                  <h3 className="text-lg font-semibold text-[#001514] mb-6">
                    Hitos de nuestra trayectoria
                  </h3>
                  <div className="space-y-6">
                    {[
                      {
                        year: "2004",
                        text: "Fundación de SINTEC S.A. en Buenos Aires",
                      },
                      {
                        year: "2008",
                        text: "Primeros proyectos de RBI en la industria oil & gas",
                      },
                      {
                        year: "2012",
                        text: "Expansión a proyectos en Patagonia y Neuquén",
                      },
                      {
                        year: "2016",
                        text: "Implementación de tecnologías END avanzadas (PA, TOFD)",
                      },
                      {
                        year: "2019",
                        text: "Ingreso a proyectos en Vaca Muerta",
                      },
                      {
                        year: "2024",
                        text: "+20 años y más de 150 proyectos exitosos",
                      },
                    ].map((item, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-10 h-10 rounded-full bg-[#297373] flex items-center justify-center shrink-0">
                            <span className="text-white text-xs font-bold">
                              {item.year.slice(2)}
                            </span>
                          </div>
                          {index < 5 && (
                            <div className="w-px flex-1 bg-[#d2d2d7] mt-2" />
                          )}
                        </div>
                        <div className="pb-6">
                          <span className="text-[#297373] text-sm font-semibold">
                            {item.year}
                          </span>
                          <p className="text-[#001514] text-sm mt-1">
                            {item.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Mission, Vision */}
      <section className="py-20 lg:py-28 bg-[#f5f5f7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection variant="slideUp" className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 bg-[#297373]" />
              <span className="text-[#297373] text-sm font-medium tracking-widest uppercase">
                Propósito
              </span>
              <div className="h-px w-8 bg-[#297373]" />
            </div>
            <h2 className="text-4xl font-bold text-[#001514]">
              Misión, Visión y Valores
            </h2>
          </AnimatedSection>

          {/* Mission + Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <AnimatedSection variant="slideUp" delay={0.1}>
              <div className="bg-white rounded-3xl p-8 border border-[#d2d2d7]/50 h-full">
                <div className="w-12 h-12 rounded-2xl bg-[#297373] flex items-center justify-center mb-6">
                  <span className="text-white font-bold text-lg">M</span>
                </div>
                <h3 className="text-xl font-bold text-[#001514] mb-4">
                  {content.mission.title}
                </h3>
                <p className="text-[#6e6e73] leading-relaxed">
                  {content.mission.text}
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection variant="slideUp" delay={0.2}>
              <div className="bg-[#001514] rounded-3xl p-8 h-full">
                <div className="w-12 h-12 rounded-2xl bg-[#297373] flex items-center justify-center mb-6">
                  <span className="text-white font-bold text-lg">V</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  {content.vision.title}
                </h3>
                <p className="text-white/60 leading-relaxed">
                  {content.vision.text}
                </p>
              </div>
            </AnimatedSection>
          </div>

          {/* Values */}
          <StaggerContainer
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            staggerDelay={0.08}
          >
            {VALUES.map((value) => (
              <StaggerItem key={value.title}>
                <div className="bg-white rounded-2xl p-6 border border-[#d2d2d7]/50 hover:border-[#297373]/30 hover:shadow-lg transition-all duration-300 h-full">
                  {value.image && (
                    <div className="mb-4 w-full h-36 rounded-xl bg-[#f5f5f7] relative overflow-hidden">
                      <Image
                        src={value.image}
                        alt={value.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    </div>
                  )}
                  <div className="w-11 h-11 rounded-xl bg-[#297373]/10 flex items-center justify-center text-[#297373] mb-4">
                    {iconMap[value.icon]}
                  </div>
                  <h4 className="font-semibold text-[#001514] mb-2">
                    {value.title}
                  </h4>
                  <p className="text-[#6e6e73] text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection variant="slideUp" className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 bg-[#297373]" />
              <span className="text-[#297373] text-sm font-medium tracking-widest uppercase">
                Diferencial
              </span>
              <div className="h-px w-8 bg-[#297373]" />
            </div>
            <h2 className="text-4xl font-bold text-[#001514] mb-4">
              {content.whyUs.title}
            </h2>
            <p className="text-[#6e6e73] text-lg max-w-2xl mx-auto">
              {content.whyUs.subtitle}
            </p>
          </AnimatedSection>

          <StaggerContainer
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            staggerDelay={0.08}
          >
            {content.whyUs.reasons.map((reason) => (
              <StaggerItem key={reason.title}>
                <div className="group p-6 rounded-2xl border border-[#d2d2d7]/50 hover:border-[#297373]/30 hover:bg-[#f5f5f7] transition-all duration-300 h-full">
                  <div className="w-10 h-10 rounded-xl bg-[#297373]/10 flex items-center justify-center text-[#297373] mb-4 group-hover:bg-[#297373] group-hover:text-white transition-all duration-300">
                    {iconMap[reason.icon]}
                  </div>
                  <h3 className="font-semibold text-[#001514] mb-2">
                    {reason.title}
                  </h3>
                  <p className="text-[#6e6e73] text-sm leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 lg:py-28 bg-[#001514]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection variant="slideUp" className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 bg-[#A33400]" />
              <span className="text-[#A33400] text-sm font-medium tracking-widest uppercase">
                Estándares
              </span>
              <div className="h-px w-8 bg-[#A33400]" />
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">
              {content.certifications.title}
            </h2>
            <p className="text-white/50 text-lg max-w-xl mx-auto">
              {content.certifications.subtitle}
            </p>
          </AnimatedSection>

          <StaggerContainer
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            staggerDelay={0.06}
          >
            {content.certifications.items.map((cert) => (
              <StaggerItem key={cert}>
                <div className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 hover:bg-white/10 hover:border-[#297373]/40 transition-all duration-200">
                  <div className="flex items-center gap-3">
                    <CheckCircle size={18} className="text-[#A33400] shrink-0" />
                    <span className="text-white/80 text-sm">{cert}</span>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection variant="scaleIn">
            <h2 className="text-4xl font-bold text-[#001514] mb-4">
              ¿Listo para trabajar con nosotros?
            </h2>
            <p className="text-[#6e6e73] text-lg mb-8">
              Contacte a nuestros especialistas y cuéntenos sobre su proyecto o
              necesidad.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#contacto"
                className="inline-flex items-center justify-center gap-2 bg-[#297373] hover:bg-[#0A1045] text-white px-8 py-4 rounded-xl font-semibold text-base transition-all duration-200"
              >
                Contactar ahora
              </Link>
              <Link
                href="/soluciones"
                className="inline-flex items-center justify-center gap-2 border border-[#d2d2d7] hover:border-[#297373] text-[#001514] hover:text-[#297373] px-8 py-4 rounded-xl font-semibold text-base transition-all duration-200"
              >
                Ver nuestras soluciones
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
