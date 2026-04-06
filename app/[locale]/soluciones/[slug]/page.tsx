import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import * as esConstants from "@/lib/constants";
import * as enConstants from "@/lib/constants-en";
import * as esContent from "@/lib/content";
import * as enContent from "@/lib/content-en";
import { ServiceDetail } from "@/components/soluciones/ServiceDetail";
import { ServiceSidebarLayout } from "@/components/soluciones/ServiceSidebarLayout";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const { SERVICES } = esConstants; // used only for generateStaticParams (slugs are locale-agnostic)

function getLocaleData(locale: string) {
  return locale === "en"
    ? { c: enConstants, content: enContent }
    : { c: esConstants, content: esContent };
}

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const { c } = getLocaleData(locale);
  const service = c.SERVICES.find((s) => s.slug === slug);
  if (!service) return {};

  const base = `https://sintecsa.com.ar/${locale}/soluciones/${slug}`;
  const alt = `https://sintecsa.com.ar/${locale === "en" ? "es" : "en"}/soluciones/${slug}`;

  return {
    title: `${service.title} | SINTEC S.A.`,
    description: service.shortDescription,
    alternates: {
      canonical: base,
      languages: {
        es: `https://sintecsa.com.ar/es/soluciones/${slug}`,
        en: `https://sintecsa.com.ar/en/soluciones/${slug}`,
      },
    },
    openGraph: {
      type: "website",
      url: base,
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

export default async function LocaleServicePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const { c, content: pageContent } = getLocaleData(locale);
  const service = c.SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();

  const serviceIndex = c.SERVICES.findIndex((s) => s.slug === slug);
  const content = pageContent.SOLUCIONES_CONTENT;

  const ui = c.SOLUTIONS_UI;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.shortDescription,
    url: `https://sintecsa.com.ar/${locale}/soluciones/${slug}`,
    provider: { "@type": "Organization", name: "SINTEC S.A.", url: "https://sintecsa.com.ar" },
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
                href={`/${locale}/soluciones`}
                className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-6 transition-colors duration-200"
              >
                <ArrowLeft size={14} />
                {ui.backToSolutions}
              </Link>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-px w-8 bg-[#A33400]" />
                <span className="text-[#A33400] text-sm font-medium tracking-widest uppercase">
                  {ui.solucionesHeroTag}
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
                href={`/${locale}#contacto`}
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
