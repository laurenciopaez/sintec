import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Hero } from "@/components/home/Hero";

const Services  = dynamic(() => import("@/components/home/Services").then((m) => m.Services));
const Stats     = dynamic(() => import("@/components/home/Stats").then((m) => m.Stats));
const Clients   = dynamic(() => import("@/components/home/Clients").then((m) => m.Clients));
const AboutTeaser = dynamic(() => import("@/components/home/AboutTeaser").then((m) => m.AboutTeaser));
const Contact   = dynamic(() => import("@/components/home/Contact").then((m) => m.Contact));

const META: Record<string, Metadata> = {
  es: {
    title: "SINTEC S.A. | Ingeniería de Integridad Industrial",
    description:
      "Consultora argentina especializada en gestión de integridad de activos industriales. Más de 20 años de experiencia en RBI, análisis de falla, control de corrosión e inspección para oil & gas, petroquímica y energía.",
    openGraph: {
      type: "website",
      url: "https://sintecsa.com.ar/es",
      title: "SINTEC S.A. | Ingeniería de Integridad Industrial",
      description:
        "Consultora argentina especializada en gestión de integridad de activos industriales.",
      images: [{ url: "img/logos/SINTECSA_logo.jpg", width: 1200, height: 630, alt: "SINTEC S.A. — Ingeniería de Integridad" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "SINTEC S.A. | Ingeniería de Integridad Industrial",
      description: "Consultora argentina especializada en gestión de integridad de activos industriales.",
      images: ["https://sintecsa.com.ar/img/logos/SINTECSA_logo.jpg"],
    },
    alternates: {
      canonical: "https://sintecsa.com.ar/es",
      languages: {
        es: "https://sintecsa.com.ar/es",
        en: "https://sintecsa.com.ar/en",
        "x-default": "https://sintecsa.com.ar",
      },
    },
  },
  en: {
    title: "SINTEC S.A. | Industrial Integrity Engineering",
    description:
      "Argentine consultancy specializing in industrial asset integrity management. Over 20 years of experience in RBI, failure analysis, corrosion control and inspection for oil & gas, petrochemical and energy sectors.",
    openGraph: {
      type: "website",
      url: "https://sintecsa.com.ar/en",
      title: "SINTEC S.A. | Industrial Integrity Engineering",
      description:
        "Argentine consultancy specializing in industrial asset integrity management.",
      images: [{ url: "img/logos/SINTECSA_logo.jpg", width: 1200, height: 630, alt: "SINTEC S.A. — Integrity Engineering" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "SINTEC S.A. | Industrial Integrity Engineering",
      description: "Argentine consultancy specializing in industrial asset integrity management.",
      images: ["https://sintecsa.com.ar/img/logos/SINTECSA_logo.jpg"],
    },
    alternates: {
      canonical: "https://sintecsa.com.ar/en",
      languages: {
        es: "https://sintecsa.com.ar/es",
        en: "https://sintecsa.com.ar/en",
        "x-default": "https://sintecsa.com.ar",
      },
    },
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return META[locale] ?? META.es;
}

export default function LocaleHomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Stats />
      <Clients />
      <AboutTeaser />
      <Contact />
    </>
  );
}
