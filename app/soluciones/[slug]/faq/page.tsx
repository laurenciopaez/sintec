import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SERVICES } from "@/lib/constants";
import { ServiceFAQ } from "@/components/soluciones/ServiceFAQ";
import { ServiceSidebarLayout } from "@/components/soluciones/ServiceSidebarLayout";

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
    title: `FAQ — ${service.title} | SINTEC S.A.`,
    description: `Preguntas frecuentes sobre ${service.title}. Respuestas técnicas detalladas de nuestros especialistas en integridad industrial.`,
  };
}

export default async function ServiceFAQPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();

  const serviceIndex = SERVICES.findIndex((s) => s.slug === slug);

  return (
    <div className="min-h-screen bg-white">
      {/* Mini hero */}
      <section className="relative pt-32 pb-10 lg:pt-36 lg:pb-12 bg-[#001514] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#001514] via-[#001514] to-[#0A1045]" />
        <div className="absolute inset-0 hero-grid-bg opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-[#A33400]" />
            <span className="text-[#A33400] text-sm font-medium tracking-widest uppercase">
              Preguntas Frecuentes
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            {service.title}
          </h1>
        </div>
      </section>

      {/* Sidebar + FAQ content */}
      <section className="bg-[#f5f5f7]">
        <ServiceSidebarLayout>
          <ServiceFAQ service={service} serviceIndex={serviceIndex} />
        </ServiceSidebarLayout>
      </section>
    </div>
  );
}
