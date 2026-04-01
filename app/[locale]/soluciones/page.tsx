import type { Metadata } from "next";
import SolucionesPage from "@/app/soluciones/page";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (locale === "en") {
    return {
      title: "Solutions | SINTEC S.A.",
      description:
        "Explore SINTEC S.A.'s full portfolio of services: Asset Integrity, RBI, Failure Analysis, Corrosion Control, Inspection and more.",
      openGraph: {
        type: "website",
        url: "https://sintecsa.com.ar/en/soluciones",
        title: "Solutions | SINTEC S.A.",
        description:
          "Full portfolio of integrity engineering services: RBI, failure analysis, corrosion control, technical inspection and more.",
        images: [{ url: "/img/service1/RBI.jpg", width: 1200, height: 630, alt: "SINTEC S.A. Solutions" }],
      },
      twitter: {
        card: "summary_large_image",
        title: "Solutions | SINTEC S.A.",
        description: "Full portfolio of integrity engineering services.",
        images: ["/img/service1/RBI.jpg"],
      },
      alternates: {
        canonical: "https://sintecsa.com.ar/en/soluciones",
        languages: {
          es: "https://sintecsa.com.ar/es/soluciones",
          en: "https://sintecsa.com.ar/en/soluciones",
        },
      },
    };
  }

  return {
    title: "Soluciones | SINTEC S.A.",
    description:
      "Conoce el portafolio completo de servicios de SINTEC S.A.: Integridad de Activos, RBI, Análisis de Falla, Control de Corrosión, Inspección y más.",
    openGraph: {
      type: "website",
      url: "https://sintecsa.com.ar/es/soluciones",
      title: "Soluciones | SINTEC S.A.",
      description:
        "Portafolio completo de servicios de ingeniería de integridad: RBI, análisis de falla, control de corrosión, inspección técnica y más.",
      images: [{ url: "/img/service1/RBI.jpg", width: 1200, height: 630, alt: "Soluciones SINTEC S.A." }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Soluciones | SINTEC S.A.",
      description: "Portafolio completo de servicios de ingeniería de integridad.",
      images: ["/img/service1/RBI.jpg"],
    },
    alternates: {
      canonical: "https://sintecsa.com.ar/es/soluciones",
      languages: {
        es: "https://sintecsa.com.ar/es/soluciones",
        en: "https://sintecsa.com.ar/en/soluciones",
      },
    },
  };
}

export default SolucionesPage;
