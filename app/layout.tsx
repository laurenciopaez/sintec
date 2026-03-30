import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChatBot } from "@/components/chatbot/ChatBot";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "SINTEC S.A. | Ingeniería de Integridad",
  description:
    "Consultora argentina especializada en ingeniería de integridad industrial. Servicios de RBI, análisis de falla, control de corrosión, inspección y más. Más de 20 años de experiencia.",
  keywords: [
    "ingeniería de integridad",
    "RBI",
    "inspección basada en riesgo",
    "análisis de falla",
    "control de corrosión",
    "inspección industrial",
    "Argentina",
    "oil and gas",
    "SINTEC",
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
      </body>
    </html>
  );
}
