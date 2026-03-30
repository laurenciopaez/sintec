import { Hero } from "@/components/home/Hero";
import { Services } from "@/components/home/Services";
import { Stats } from "@/components/home/Stats";
import { Clients } from "@/components/home/Clients";
import { AboutTeaser } from "@/components/home/AboutTeaser";
import { Contact } from "@/components/home/Contact";

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
