import type { Metadata } from "next";
import TerminosPage from "@/app/terminos/page";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (locale === "en") {
    return {
      title: "Terms of Use | SINTEC S.A.",
      description: "Terms and conditions of use for the SINTEC S.A. website.",
      alternates: {
        canonical: "https://sintecsa.com.ar/en/terminos",
        languages: {
          es: "https://sintecsa.com.ar/es/terminos",
          en: "https://sintecsa.com.ar/en/terminos",
        },
      },
    };
  }

  return {
    title: "Términos de Uso | SINTEC S.A.",
    description: "Términos y condiciones de uso del sitio web de SINTEC S.A.",
    alternates: {
      canonical: "https://sintecsa.com.ar/es/terminos",
      languages: {
        es: "https://sintecsa.com.ar/es/terminos",
        en: "https://sintecsa.com.ar/en/terminos",
      },
    },
  };
}

export default TerminosPage;
