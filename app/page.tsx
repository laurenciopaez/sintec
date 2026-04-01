import dynamic from "next/dynamic";
import { Hero } from "@/components/home/Hero";

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
