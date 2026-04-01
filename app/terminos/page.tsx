import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos de Uso | SINTEC S.A.",
  description:
    "Términos y condiciones de uso del sitio web de SINTEC S.A.",
};

export default function TerminosPage() {
  return (
    <main className="min-h-screen bg-white pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-[#1d1d1f] mb-2">
          Términos de Uso
        </h1>
        <p className="text-sm text-[#6e6e73] mb-10">
          Última actualización: abril de 2025
        </p>

        <div className="prose prose-sm max-w-none text-[#1d1d1f] space-y-8">
          <section>
            <h2 className="text-lg font-semibold mb-3">1. Aceptación</h2>
            <p className="text-[#6e6e73] leading-relaxed">
              Al acceder y utilizar el sitio web de SINTEC S.A. (en adelante,
              &quot;el Sitio&quot;), usted acepta quedar vinculado por estos Términos de
              Uso. Si no está de acuerdo con alguno de estos términos, le
              pedimos que no utilice el Sitio.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">
              2. Uso del sitio
            </h2>
            <p className="text-[#6e6e73] leading-relaxed mb-2">
              El Sitio tiene fines informativos sobre los servicios de SINTEC
              S.A. Usted se compromete a utilizarlo de forma lícita y a no:
            </p>
            <ul className="list-disc list-inside text-[#6e6e73] space-y-1">
              <li>
                Usar el Sitio para fines ilegales o contrarios a estos términos
              </li>
              <li>
                Intentar acceder a sistemas o datos sin autorización
              </li>
              <li>
                Reproducir o distribuir el contenido sin autorización escrita
              </li>
              <li>
                Enviar información falsa, engañosa o spam a través del
                formulario de contacto
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">
              3. Propiedad intelectual
            </h2>
            <p className="text-[#6e6e73] leading-relaxed">
              Todo el contenido del Sitio —textos, imágenes, logotipos, diseño
              gráfico y código— es propiedad de SINTEC S.A. o sus licenciantes,
              y está protegido por las leyes de propiedad intelectual vigentes
              en la República Argentina. Queda prohibida su reproducción total
              o parcial sin autorización expresa y por escrito.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">
              4. Información y contenido
            </h2>
            <p className="text-[#6e6e73] leading-relaxed">
              La información publicada en el Sitio tiene carácter orientativo y
              no constituye una oferta contractual. SINTEC S.A. se reserva el
              derecho de modificar, actualizar o eliminar contenido en cualquier
              momento sin previo aviso.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">
              5. Limitación de responsabilidad
            </h2>
            <p className="text-[#6e6e73] leading-relaxed">
              SINTEC S.A. no garantiza la disponibilidad continua del Sitio ni
              la ausencia de errores. En la medida permitida por la ley, la
              Empresa no será responsable por daños directos o indirectos
              derivados del uso o la imposibilidad de uso del Sitio.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">6. Links externos</h2>
            <p className="text-[#6e6e73] leading-relaxed">
              El Sitio puede contener enlaces a sitios de terceros. SINTEC S.A.
              no controla ni se responsabiliza por el contenido, políticas de
              privacidad o prácticas de dichos sitios.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">
              7. Legislación aplicable
            </h2>
            <p className="text-[#6e6e73] leading-relaxed">
              Estos términos se rigen por las leyes de la República Argentina.
              Cualquier controversia derivada del uso del Sitio será sometida a
              la jurisdicción de los tribunales ordinarios de la ciudad de Mar
              del Plata, Buenos Aires.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">8. Contacto</h2>
            <p className="text-[#6e6e73] leading-relaxed">
              Para consultas sobre estos términos, puede escribirnos a{" "}
              <a
                href="mailto:jprossi@sintecsa.com.ar"
                className="text-[#0066cc] hover:underline"
              >
                jprossi@sintecsa.com.ar
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
