import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChatBot } from "@/components/chatbot/ChatBot";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "SINTEC S.A. | Ingeniería de Integridad",
  description:
    "SINTEC S.A. es una consultora argentina de ingeniería especializada en la gestión de integridad de activos industriales, fundada en 2004 y con más de dos décadas de trayectoria en los sectores de oil & gas, petroquímica, refinación y energía. La empresa desarrolla e implementa Planes de Gestión de Integridad alineados con normativas internacionales (API, ASME, NACE/AMPP, ISO), abarcando desde el diagnóstico situacional y el análisis de mecanismos de daño hasta la Inspección Basada en Riesgo (RBI) según API 580/581. Su enfoque permite cuantificar probabilidad y consecuencia de falla para jerarquizar activos críticos, optimizar intervalos de inspección y reducir costos operativos sin comprometer la seguridad del personal ni el medio ambiente. El portafolio técnico de SINTEC S.A. cubre seis áreas de especialidad: integridad de activos, inspección basada en riesgo, análisis de falla (RCA, fractografía y metalografía), control de corrosión (protección catódica, recubrimientos y monitoreo), monitoreo electroquímico industrial con celdas de 3 y 5 electrodos para medición de velocidades de corrosión en tiempo real, e ingeniería de procedimientos y normatividad técnica. Con presencia en todo el territorio argentino —incluyendo proyectos en Vaca Muerta, Patagonia, Buenos Aires y Mendoza— y un equipo certificado en API 510/570/653, NACE CIP y ASNT NDT, la empresa se posiciona como socio técnico de confianza para empresas que operan infraestructura crítica bajo exigentes estándares de seguridad operativa.",
  keywords: [
    "integridad de activos",
    "gestion de integridad de activos",
    "asset integrity management",
    "ingeniería de integridad",
    "integrity engineering",
    "RBI",
    "análisis de riesgo basado en la inspección",
    "análisis de falla",
    "failure analysis",
    "control de corrosión",
    "corrosion control",
    "inspección industrial",
    "industrial inspection",
    "consultoría de integridad",
    "integrity consulting",
    "sintec sa",
    "sintec argentina",
    "sintec",
    "RBI API 580",
    "RBI API 581",
    "consultoria oil & gas argentina",
    "integridad de ductos",
    "pipeline integrity",
    "integridad de equipos estaticos",
    "static equipment integrity",
    "integridad de tanques",
    "tank integrity",
    "integridad de estructuras",
    "structural integrity",
    "mantenimiento basado en riesgo",
    "risk-based maintenance",
    "analisis de mecanismos de daño API 571",
    "API 571 damage mechanisms analysis",
    "corrosion management oil and gas",
    "control de corrosion industrial",
    "monitoreo de corrosion en tiempo real",
    "real-time corrosion monitoring",
    "celdas electroquimicas 3 electrodos",
    "3-electrode electrochemical cells",
    "corrosion coupons",
    "corrosion coupons monitoring",
    "celdas electroquimicas 5 electrodos",
    "5-electrode electrochemical cells",
    "medicion de velocidades de corrosion",
    "corrosion rate measurement",
    "proteccion catodica diseño e implementacion",
    "cathodic protection design and implementation",
    "inspeccion de recipientes API 510",
    "API 510 pressure vessel inspection",
    "inspeccion de tanques API 653",
    "API 653 tank inspection",
    "inspeccion de estructuras API 570",
    "API 570 piping inspection",
    "analisis de falla metalografico",
    "metallographic failure analysis",
    "fractografia industrial",
    "industrial fractography",
    "root cause analysis ingenieria",
    "engineering root cause analysis",
    "RBI software implementation",
    "integridad en vaca muerta",
    "integridad oil & gas argentina",
    "integridad petroquimica",
    "integridad en refinerias",
    "integridad en plantas de energia",
    "gestion de integridad upstream midstream downstream",
    "integridad de oleoductos",
    "integridad de gasoductos",
    "consultoria ingenieria argentina",
    "integridad de activos argentina",
    "rbi argentina",
    "corrosion industrial argentina",
    "ingenieria oil & gas buenos aires",
    "integridad industrial neuquen",
    "servicios ingenieria mendoza oil & gas",
    "integridad vaca muerta consultora",
    "como implementar RBI API 580 paso a paso",
    "que es la integridad de activos industriales",
    "como reducir costos con inspeccion basada en riesgo",
    "mejores practicas control de corrosion oil & gas",
    "monitoreo de corrosion online en ductos",
    "analisis de falla en equipos industriales causas comunes",
    "diferencias entre API 580 y API 581",
    "gestion de integridad en ductos enterrados",
    "asset integrity management services",
    "risk-based inspection services",
    "pipeline integrity management",
    "corrosion monitoring systems",
    "cathodic protection engineering",
    "failure analysis engineering services",
    "oil and gas integrity consulting",
    "industrial corrosion control services",
    "machine learning for asset integrity",
    "AI for asset integrity management",
    "predictive maintenance for industrial assets",
  ],
  authors: [{ name: "SINTEC S.A." }],
  creator: "SINTEC S.A.",
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://sintecsa.com.ar",
    siteName: "SINTEC S.A.",
    title: "SINTEC S.A. | Ingeniería de Integridad",
    description:
      "Consultora argentina especializada en ingeniería de integridad industrial. Más de 20 años de experiencia.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SINTEC S.A. | Ingeniería de Integridad",
    description:
      "Consultora argentina especializada en ingeniería de integridad industrial.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="font-sans antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <ChatBot />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "SINTEC S.A.",
              alternateName: "SINTEC",
              url: "https://sintecsa.com.ar",
              email: "jprossi@sintecsa.com.ar",
              telephone: "+54 223 373-0283",
              foundingDate: "2004",
              description:
                "Consultora argentina especializada en ingeniería de integridad, gestión de riesgos y confiabilidad de activos industriales para los sectores oil & gas, petroquímica, refinación y energía.",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Mar del Plata",
                addressRegion: "Buenos Aires",
                addressCountry: "AR",
              },
              areaServed: {
                "@type": "Country",
                name: "Argentina",
              },
              knowsAbout: [
                "Integridad de activos industriales",
                "Inspección Basada en Riesgo (RBI)",
                "Análisis de falla",
                "Control de corrosión",
                "Protección catódica",
                "Monitoreo electroquímico",
                "Normativas API, ASME, NACE, ISO",
              ],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Servicios de Ingeniería de Integridad",
                itemListElement: [
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Integridad de Activos" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Inspección Basada en Riesgo (RBI)" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Análisis de Falla" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Control de Corrosión" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Inspección Técnica" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Procedimientos e Ingeniería Normativa" } },
                ],
              },
            }),
          }}
        />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
        {process.env.NEXT_PUBLIC_CLARITY_ID && (
          <Script id="microsoft-clarity" strategy="afterInteractive">
            {`(function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window,document,"clarity","script","${process.env.NEXT_PUBLIC_CLARITY_ID}");`}
          </Script>
        )}
      </body>
    </html>
  );
}
