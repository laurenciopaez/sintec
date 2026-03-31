import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SERVICES } from "@/lib/constants";
import { ServiceDetail } from "@/components/soluciones/ServiceDetail";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SOLUCIONES_CONTENT } from "@/lib/content";

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: `${service.title} | SINTEC S.A.`,
    description: service.shortDescription,
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();

  const serviceIndex = SERVICES.findIndex((s) => s.slug === slug);
  const prevService = serviceIndex > 0 ? SERVICES[serviceIndex - 1] : null;
  const nextService =
    serviceIndex < SERVICES.length - 1 ? SERVICES[serviceIndex + 1] : null;

  const content = SOLUCIONES_CONTENT;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 bg-[#001514] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#001514] via-[#001514] to-[#0A1045]" />
        <div className="absolute inset-0 hero-grid-bg opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-[#297373]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection variant="slideUp">
            <Link
              href="/soluciones"
              className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-8 transition-colors duration-200"
            >
              <ArrowLeft size={14} />
              Volver a Soluciones
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-[#A33400]" />
              <span className="text-[#A33400] text-sm font-medium tracking-widest uppercase">
                Servicio {String(serviceIndex + 1).padStart(2, "0")} /{" "}
                {String(SERVICES.length).padStart(2, "0")}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 max-w-3xl">
              {service.title}
            </h1>
            <p className="text-white/60 text-xl max-w-2xl leading-relaxed">
              {service.shortDescription}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Detail content */}
      <section className="bg-[#f5f5f7]">
        <ServiceDetail service={service} serviceIndex={serviceIndex} />
      </section>

      {/* Prev / Next navigation */}
      <section className="py-10 bg-white border-t border-[#d2d2d7]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between gap-4">
          {prevService ? (
            <Link
              href={`/soluciones/${prevService.slug}`}
              className="group flex items-center gap-3 text-[#001514] hover:text-[#297373] transition-colors duration-200"
            >
              <ArrowLeft
                size={18}
                className="group-hover:-translate-x-1 transition-transform duration-200"
              />
              <div>
                <p className="text-xs text-[#6e6e73] mb-0.5">Anterior</p>
                <p className="text-sm font-semibold">{prevService.title}</p>
              </div>
            </Link>
          ) : (
            <div />
          )}
          {nextService ? (
            <Link
              href={`/soluciones/${nextService.slug}`}
              className="group flex items-center gap-3 text-right text-[#001514] hover:text-[#297373] transition-colors duration-200"
            >
              <div>
                <p className="text-xs text-[#6e6e73] mb-0.5">Siguiente</p>
                <p className="text-sm font-semibold">{nextService.title}</p>
              </div>
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </Link>
          ) : (
            <div />
          )}
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
