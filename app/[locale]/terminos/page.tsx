import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (locale === "en") {
    return {
      title: "Terms of Use | SINTEC S.A.",
      description: "Terms and conditions of use for the SINTEC S.A. website.",
      alternates: {
        canonical: "https://sintecsa.com.ar/en/terminos",
        languages: {
          es: "https://sintecsa.com.ar/es/terminos",
          en: "https://sintecsa.com.ar/en/terminos",
        },
      },
    };
  }

  return {
    title: "Términos de Uso | SINTEC S.A.",
    description: "Términos y condiciones de uso del sitio web de SINTEC S.A.",
    alternates: {
      canonical: "https://sintecsa.com.ar/es/terminos",
      languages: {
        es: "https://sintecsa.com.ar/es/terminos",
        en: "https://sintecsa.com.ar/en/terminos",
      },
    },
  };
}

export default async function LocaleTerminosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (locale === "en") {
    return (
      <main className="min-h-screen bg-white pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-[#1d1d1f] mb-2">Terms of Use</h1>
          <p className="text-sm text-[#6e6e73] mb-10">Last updated: April 2025</p>

          <div className="prose prose-sm max-w-none text-[#1d1d1f] space-y-8">
            <section>
              <h2 className="text-lg font-semibold mb-3">1. Acceptance</h2>
              <p className="text-[#6e6e73] leading-relaxed">
                By accessing and using the SINTEC S.A. website (hereinafter,
                &quot;the Site&quot;), you agree to be bound by these Terms of Use. If you
                do not agree with any of these terms, we ask that you do not use the Site.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">2. Use of the Site</h2>
              <p className="text-[#6e6e73] leading-relaxed mb-2">
                The Site has informational purposes about SINTEC S.A.&apos;s services.
                You agree to use it lawfully and not to:
              </p>
              <ul className="list-disc list-inside text-[#6e6e73] space-y-1">
                <li>Use the Site for illegal or unauthorized purposes</li>
                <li>Attempt to access systems or data without authorization</li>
                <li>Reproduce or distribute content without written authorization</li>
                <li>
                  Send false, misleading or spam information through the contact form
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">3. Intellectual Property</h2>
              <p className="text-[#6e6e73] leading-relaxed">
                All content on the Site — texts, images, logos, graphic design and code —
                is the property of SINTEC S.A. or its licensors, and is protected by
                intellectual property laws in force in the Argentine Republic. Total or
                partial reproduction without express written authorization is prohibited.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">4. Information and Content</h2>
              <p className="text-[#6e6e73] leading-relaxed">
                The information published on the Site is for guidance purposes only and
                does not constitute a contractual offer. SINTEC S.A. reserves the right
                to modify, update or remove content at any time without prior notice.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">5. Limitation of Liability</h2>
              <p className="text-[#6e6e73] leading-relaxed">
                SINTEC S.A. does not guarantee the continuous availability of the Site or
                the absence of errors. To the extent permitted by law, the Company shall
                not be liable for direct or indirect damages arising from the use or
                inability to use the Site.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">6. External Links</h2>
              <p className="text-[#6e6e73] leading-relaxed">
                The Site may contain links to third-party websites. SINTEC S.A. does not
                control and is not responsible for the content, privacy policies or
                practices of such sites.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">7. Applicable Law</h2>
              <p className="text-[#6e6e73] leading-relaxed">
                These terms are governed by the laws of the Argentine Republic. Any
                dispute arising from the use of the Site shall be submitted to the
                jurisdiction of the ordinary courts of the city of Mar del Plata,
                Buenos Aires.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">8. Contact</h2>
              <p className="text-[#6e6e73] leading-relaxed">
                For inquiries about these terms, you may write to us at{" "}
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

  return (
    <main className="min-h-screen bg-white pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-[#1d1d1f] mb-2">Términos de Uso</h1>
        <p className="text-sm text-[#6e6e73] mb-10">Última actualización: abril de 2025</p>

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
            <h2 className="text-lg font-semibold mb-3">2. Uso del sitio</h2>
            <p className="text-[#6e6e73] leading-relaxed mb-2">
              El Sitio tiene fines informativos sobre los servicios de SINTEC
              S.A. Usted se compromete a utilizarlo de forma lícita y a no:
            </p>
            <ul className="list-disc list-inside text-[#6e6e73] space-y-1">
              <li>Usar el Sitio para fines ilegales o contrarios a estos términos</li>
              <li>Intentar acceder a sistemas o datos sin autorización</li>
              <li>Reproducir o distribuir el contenido sin autorización escrita</li>
              <li>
                Enviar información falsa, engañosa o spam a través del formulario de contacto
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">3. Propiedad intelectual</h2>
            <p className="text-[#6e6e73] leading-relaxed">
              Todo el contenido del Sitio —textos, imágenes, logotipos, diseño
              gráfico y código— es propiedad de SINTEC S.A. o sus licenciantes,
              y está protegido por las leyes de propiedad intelectual vigentes
              en la República Argentina. Queda prohibida su reproducción total
              o parcial sin autorización expresa y por escrito.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">4. Información y contenido</h2>
            <p className="text-[#6e6e73] leading-relaxed">
              La información publicada en el Sitio tiene carácter orientativo y
              no constituye una oferta contractual. SINTEC S.A. se reserva el
              derecho de modificar, actualizar o eliminar contenido en cualquier
              momento sin previo aviso.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">5. Limitación de responsabilidad</h2>
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
            <h2 className="text-lg font-semibold mb-3">7. Legislación aplicable</h2>
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
