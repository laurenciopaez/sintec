import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad | SINTEC S.A.",
  description:
    "Política de privacidad de SINTEC S.A. Información sobre el tratamiento de datos personales.",
};

export default function PrivacidadPage() {
  return (
    <main className="min-h-screen bg-white pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-[#1d1d1f] mb-2">
          Política de Privacidad
        </h1>
        <p className="text-sm text-[#6e6e73] mb-10">
          Última actualización: abril de 2025
        </p>

        <div className="prose prose-sm max-w-none text-[#1d1d1f] space-y-8">
          <section>
            <h2 className="text-lg font-semibold mb-3">1. Responsable del tratamiento</h2>
            <p className="text-[#6e6e73] leading-relaxed">
              SINTEC S.A. (en adelante, &quot;la Empresa&quot;), con domicilio en Mar del
              Plata, Buenos Aires, Argentina, es responsable del tratamiento de
              los datos personales recopilados a través del sitio web{" "}
              <span className="text-[#1d1d1f]">sintecsa.com.ar</span>.
            </p>
            <p className="text-[#6e6e73] leading-relaxed mt-2">
              Contacto:{" "}
              <a
                href="mailto:jprossi@sintecsa.com.ar"
                className="text-[#0066cc] hover:underline"
              >
                jprossi@sintecsa.com.ar
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">
              2. Datos que recopilamos
            </h2>
            <p className="text-[#6e6e73] leading-relaxed mb-2">
              Recopilamos únicamente los datos que usted nos proporciona
              voluntariamente a través del formulario de contacto:
            </p>
            <ul className="list-disc list-inside text-[#6e6e73] space-y-1">
              <li>Nombre y apellido</li>
              <li>Dirección de correo electrónico</li>
              <li>Número de teléfono (opcional)</li>
              <li>Empresa u organización (opcional)</li>
              <li>Mensaje o consulta</li>
            </ul>
            <p className="text-[#6e6e73] leading-relaxed mt-3">
              No recopilamos datos de navegación, cookies de seguimiento ni
              información de terceros.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">
              3. Finalidad del tratamiento
            </h2>
            <p className="text-[#6e6e73] leading-relaxed">
              Los datos recopilados se utilizan exclusivamente para responder a
              su consulta o solicitud de información, y para el envío de
              presupuestos o propuestas técnicas cuando así se solicite. No
              utilizamos sus datos para envíos de publicidad no solicitada
              (spam) ni los cedemos a terceros.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">
              4. Base legal del tratamiento
            </h2>
            <p className="text-[#6e6e73] leading-relaxed">
              El tratamiento se basa en el consentimiento del titular, otorgado
              al completar y enviar el formulario de contacto, conforme a lo
              establecido por la Ley N° 25.326 de Protección de los Datos
              Personales de la República Argentina.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">
              5. Conservación de datos
            </h2>
            <p className="text-[#6e6e73] leading-relaxed">
              Los datos se conservan durante el tiempo necesario para gestionar
              su consulta y, en caso de establecerse una relación comercial, por
              el período que exijan las obligaciones legales y contractuales
              aplicables.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">6. Sus derechos</h2>
            <p className="text-[#6e6e73] leading-relaxed mb-2">
              De acuerdo con la Ley N° 25.326, usted tiene derecho a:
            </p>
            <ul className="list-disc list-inside text-[#6e6e73] space-y-1">
              <li>Acceder a sus datos personales</li>
              <li>Rectificar datos inexactos o incompletos</li>
              <li>Solicitar la supresión de sus datos</li>
              <li>Oponerse al tratamiento de sus datos</li>
            </ul>
            <p className="text-[#6e6e73] leading-relaxed mt-3">
              Para ejercer estos derechos, puede escribirnos a{" "}
              <a
                href="mailto:jprossi@sintecsa.com.ar"
                className="text-[#0066cc] hover:underline"
              >
                jprossi@sintecsa.com.ar
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">7. Seguridad</h2>
            <p className="text-[#6e6e73] leading-relaxed">
              Adoptamos medidas técnicas y organizativas razonables para
              proteger sus datos personales contra accesos no autorizados,
              pérdida o alteración.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">
              8. Cambios a esta política
            </h2>
            <p className="text-[#6e6e73] leading-relaxed">
              Podemos actualizar esta política ocasionalmente. La versión
              vigente estará siempre disponible en esta página con la fecha de
              última actualización.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
