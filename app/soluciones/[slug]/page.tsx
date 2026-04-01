import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SERVICES } from "@/lib/constants";
import { ServiceDetail } from "@/components/soluciones/ServiceDetail";
import { ServiceSidebarLayout } from "@/components/soluciones/ServiceSidebarLayout";
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
    alternates: {
      canonical: `https://sintecsa.com.ar/soluciones/${slug}`,
    },
    openGraph: {
      type: "website",
      url: `https://sintecsa.com.ar/soluciones/${slug}`,
      title: `${service.title} | SINTEC S.A.`,
      description: service.shortDescription,
      images: [{ url: "/img/service1/RBI.jpg", width: 1200, height: 630, alt: `${service.title} — SINTEC S.A.` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} | SINTEC S.A.`,
      description: service.shortDescription,
      images: ["/img/service1/RBI.jpg"],
    },
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
  const content = SOLUCIONES_CONTENT;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.shortDescription,
    url: `https://sintecsa.com.ar/soluciones/${slug}`,
    provider: {
      "@type": "Organization",
      name: "SINTEC S.A.",
      url: "https://sintecsa.com.ar",
    },
    areaServed: { "@type": "Country", name: "Argentina" },
  };

  return (
    <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
    />
    <div className="min-h-screen bg-white">
      {/* Mini hero */}
      <section className="relative pt-32 pb-10 lg:pt-36 lg:pb-12 bg-[#001514] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#001514] via-[#001514] to-[#0A1045]" />
        <div className="absolute inset-0 hero-grid-bg opacity-30" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection variant="slideUp">
            <Link
              href="/soluciones"
              className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-6 transition-colors duration-200"
            >
              <ArrowLeft size={14} />
              Volver a Soluciones
            </Link>

            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-8 bg-[#A33400]" />
              <span className="text-[#A33400] text-sm font-medium tracking-widest uppercase">
                Servicios especializados
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              {service.title}
            </h1>
          </AnimatedSection>
        </div>
      </section>

      {/* Sidebar + content */}
      <section className="bg-[#f5f5f7]">
        <ServiceSidebarLayout>
          <ServiceDetail service={service} serviceIndex={serviceIndex} />
        </ServiceSidebarLayout>
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
    </>
  );
}
