import type { Metadata } from "next";
import QuienesSomosPage from "@/app/quienes-somos/page";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (locale === "en") {
    return {
      title: "About Us | SINTEC S.A.",
      description:
        "Learn about the history, mission, vision and values of SINTEC S.A., Argentina's leading industrial integrity engineering consultancy since 2004.",
      openGraph: {
        type: "website",
        url: "https://sintecsa.com.ar/en/quienes-somos",
        title: "About Us | SINTEC S.A.",
        description:
          "Learn about the history, mission, vision and values of SINTEC S.A., Argentina's leading industrial integrity engineering consultancy since 2004.",
        images: [{ url: "/img/quienesSomos/integridadProfesional.jpeg", width: 1200, height: 630, alt: "SINTEC S.A. Team" }],
      },
      twitter: {
        card: "summary_large_image",
        title: "About Us | SINTEC S.A.",
        description: "Learn about the history, mission, vision and values of SINTEC S.A.",
        images: ["/img/quienesSomos/integridadProfesional.jpeg"],
      },
      alternates: {
        canonical: "https://sintecsa.com.ar/en/quienes-somos",
        languages: {
          es: "https://sintecsa.com.ar/es/quienes-somos",
          en: "https://sintecsa.com.ar/en/quienes-somos",
        },
      },
    };
  }

  return {
    title: "Quiénes Somos | SINTEC S.A.",
    description:
      "Conoce la historia, misión, visión y valores de SINTEC S.A., consultora argentina líder en ingeniería de integridad industrial desde 2004.",
    openGraph: {
      type: "website",
      url: "https://sintecsa.com.ar/es/quienes-somos",
      title: "Quiénes Somos | SINTEC S.A.",
      description:
        "Conoce la historia, misión, visión y valores de SINTEC S.A., consultora argentina líder en ingeniería de integridad industrial desde 2004.",
      images: [{ url: "/img/quienesSomos/integridadProfesional.jpeg", width: 1200, height: 630, alt: "Equipo SINTEC S.A." }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Quiénes Somos | SINTEC S.A.",
      description: "Conoce la historia, misión, visión y valores de SINTEC S.A.",
      images: ["/img/quienesSomos/integridadProfesional.jpeg"],
    },
    alternates: {
      canonical: "https://sintecsa.com.ar/es/quienes-somos",
      languages: {
        es: "https://sintecsa.com.ar/es/quienes-somos",
        en: "https://sintecsa.com.ar/en/quienes-somos",
      },
    },
  };
}

export default QuienesSomosPage;
