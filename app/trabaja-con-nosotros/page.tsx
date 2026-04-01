import { Metadata } from "next";
import { Users } from "lucide-react";
import { JobApplicationForm } from "./JobApplicationForm";

export const metadata: Metadata = {
  title: "Trabaja con Nosotros | SINTEC S.A.",
  description:
    "Sumate al equipo de SINTEC S.A. Envianos tu CV y formá parte de nuestra empresa de ingeniería de integridad industrial.",
  alternates: {
    canonical: "https://sintecsa.com.ar/trabaja-con-nosotros",
  },
};

export default function TrabajaConNosotrosPage() {
  return (
    <main className="min-h-screen bg-[#f5f5f7] pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-[#297373]" />
            <span className="text-[#297373] text-sm font-medium tracking-widest uppercase">
              Recursos Humanos
            </span>
            <div className="h-px w-8 bg-[#297373]" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#001514] mb-4">
            Trabaja con nosotros
          </h1>
          <p className="text-[#6e6e73] text-lg max-w-xl mx-auto">
            Buscamos profesionales apasionados por la ingeniería industrial.
            Envianos tu CV y te contactaremos cuando surja una oportunidad que
            se ajuste a tu perfil.
          </p>
        </div>

        {/* Value props */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {[
            {
              title: "+20 años",
              desc: "de trayectoria en el mercado argentino e internacional",
            },
            {
              title: "Equipo técnico",
              desc: "especializado en integridad y confiabilidad industrial",
            },
            {
              title: "Proyectos reales",
              desc: "de impacto en empresas líderes del sector energético",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-2xl border border-[#d2d2d7]/50 p-6 text-center"
            >
              <p className="text-xl font-bold text-[#297373] mb-1">{item.title}</p>
              <p className="text-sm text-[#6e6e73]">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Form */}
        <JobApplicationForm />

        {/* Footer note */}
        <p className="text-center text-sm text-[#6e6e73] mt-8 flex items-center justify-center gap-2">
          <Users size={16} />
          Las postulaciones son revisadas por nuestro equipo de RRHH. Nos
          contactaremos ante vacantes disponibles.
        </p>
      </div>
    </main>
  );
}
