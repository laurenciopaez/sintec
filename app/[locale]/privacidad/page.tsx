import type { Metadata } from "next";
import PrivacidadPage from "@/app/privacidad/page";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (locale === "en") {
    return {
      title: "Privacy Policy | SINTEC S.A.",
      description: "Privacy policy of SINTEC S.A. Information about the processing of personal data.",
      alternates: {
        canonical: "https://sintecsa.com.ar/en/privacidad",
        languages: {
          es: "https://sintecsa.com.ar/es/privacidad",
          en: "https://sintecsa.com.ar/en/privacidad",
        },
      },
    };
  }

  return {
    title: "Política de Privacidad | SINTEC S.A.",
    description: "Política de privacidad de SINTEC S.A. Información sobre el tratamiento de datos personales.",
    alternates: {
      canonical: "https://sintecsa.com.ar/es/privacidad",
      languages: {
        es: "https://sintecsa.com.ar/es/privacidad",
        en: "https://sintecsa.com.ar/en/privacidad",
      },
    },
  };
}

export default PrivacidadPage;
