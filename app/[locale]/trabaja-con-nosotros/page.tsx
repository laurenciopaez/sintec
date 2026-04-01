import type { Metadata } from "next";
import TrabajaConNosotrosPage from "@/app/trabaja-con-nosotros/page";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (locale === "en") {
    return {
      title: "Work With Us | SINTEC S.A.",
      description:
        "Join the SINTEC S.A. team. Send us your CV and become part of our industrial integrity engineering company.",
      alternates: {
        canonical: "https://sintecsa.com.ar/en/trabaja-con-nosotros",
        languages: {
          es: "https://sintecsa.com.ar/es/trabaja-con-nosotros",
          en: "https://sintecsa.com.ar/en/trabaja-con-nosotros",
        },
      },
    };
  }

  return {
    title: "Trabaja con Nosotros | SINTEC S.A.",
    description:
      "Sumate al equipo de SINTEC S.A. Envianos tu CV y formá parte de nuestra empresa de ingeniería de integridad industrial.",
    alternates: {
      canonical: "https://sintecsa.com.ar/es/trabaja-con-nosotros",
      languages: {
        es: "https://sintecsa.com.ar/es/trabaja-con-nosotros",
        en: "https://sintecsa.com.ar/en/trabaja-con-nosotros",
      },
    },
  };
}

export default TrabajaConNosotrosPage;
