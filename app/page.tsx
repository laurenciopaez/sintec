import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Hero } from "@/components/home/Hero";

export const metadata: Metadata = {
  title: "SINTEC S.A. | Ingeniería de Integridad Industrial",
  description:
    "Consultora argentina especializada en gestión de integridad de activos industriales. Más de 20 años de experiencia en RBI, análisis de falla, control de corrosión e inspección para oil & gas, petroquímica y energía.",
  openGraph: {
    type: "website",
    url: "https://sintecsa.com.ar",
    title: "SINTEC S.A. | Ingeniería de Integridad Industrial",
    description:
      "Consultora argentina especializada en gestión de integridad de activos industriales. Más de 20 años de experiencia en RBI, análisis de falla, control de corrosión e inspección.",
    images: [{ url: "/img/service1/RBI.jpg", width: 1200, height: 630, alt: "SINTEC S.A. — Ingeniería de Integridad" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SINTEC S.A. | Ingeniería de Integridad Industrial",
    description:
      "Consultora argentina especializada en gestión de integridad de activos industriales.",
    images: ["/img/service1/RBI.jpg"],
  },
};

const Services = dynamic(() => import("@/components/home/Services").then(m => m.Services));
const Stats = dynamic(() => import("@/components/home/Stats").then(m => m.Stats));
const Clients = dynamic(() => import("@/components/home/Clients").then(m => m.Clients));
const AboutTeaser = dynamic(() => import("@/components/home/AboutTeaser").then(m => m.AboutTeaser));
const Contact = dynamic(() => import("@/components/home/Contact").then(m => m.Contact));

export default function HomePage() {
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
