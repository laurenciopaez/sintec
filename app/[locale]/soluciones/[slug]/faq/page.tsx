import type { Metadata } from "next";
import { notFound } from "next/navigation";
import * as esConstants from "@/lib/constants";
import * as enConstants from "@/lib/constants-en";

const { SERVICES } = esConstants; // slugs are locale-agnostic — used only for generateStaticParams
import { ServiceFAQ } from "@/components/soluciones/ServiceFAQ";
import { ServiceSidebarLayout } from "@/components/soluciones/ServiceSidebarLayout";

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const localeServices = locale === "en" ? enConstants.SERVICES : esConstants.SERVICES;
  const service = localeServices.find((s) => s.slug === slug);
  if (!service) return {};

  const description =
    locale === "en"
      ? `Frequently asked questions about ${service.title}. Detailed technical answers from our industrial integrity specialists.`
      : `Preguntas frecuentes sobre ${service.title}. Respuestas técnicas detalladas de nuestros especialistas en integridad industrial.`;

  return {
    title: locale === "en"
      ? `FAQ — ${service.title} | SINTEC S.A.`
      : `FAQ — ${service.title} | SINTEC S.A.`,
    description,
    alternates: {
      canonical: `https://sintecsa.com.ar/${locale}/soluciones/${slug}/faq`,
      languages: {
        es: `https://sintecsa.com.ar/es/soluciones/${slug}/faq`,
        en: `https://sintecsa.com.ar/en/soluciones/${slug}/faq`,
      },
    },
    openGraph: {
      type: "website",
      url: `https://sintecsa.com.ar/${locale}/soluciones/${slug}/faq`,
      title: `FAQ — ${service.title} | SINTEC S.A.`,
      description,
      images: [{ url: "/img/service1/RBI.jpg", width: 1200, height: 630, alt: `FAQ ${service.title} — SINTEC S.A.` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `FAQ — ${service.title} | SINTEC S.A.`,
      description,
      images: ["/img/service1/RBI.jpg"],
    },
  };
}

export default async function LocaleServiceFAQPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const localeServices = locale === "en" ? enConstants.SERVICES : esConstants.SERVICES;
  const serviceIndex = localeServices.findIndex((s) => s.slug === slug);
  const service = localeServices[serviceIndex];
  if (!service) notFound();

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <ServiceSidebarLayout>
        <ServiceFAQ service={service} serviceIndex={serviceIndex} />
      </ServiceSidebarLayout>
    </div>
  );
}
