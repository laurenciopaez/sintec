import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Linkedin, ArrowRight, Users } from "lucide-react";
import {
  COMPANY_NAME,
  COMPANY_SHORT_NAME,
  COMPANY_EMAIL,
  COMPANY_PHONE,
  COMPANY_ADDRESS,
  NAV_LINKS,
  SERVICES,
} from "@/lib/constants";

const currentYear = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="bg-[#001514] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <div className="flex items-center">
                <span className="text-2xl font-bold text-white">
                  {COMPANY_SHORT_NAME}
                </span>
                <span className="text-2xl font-light text-[#A33400] ml-0.5">
                  S.A.
                </span>
              </div>
            </Link>
            <p className="text-[#6e6e73] text-sm leading-relaxed mb-6 max-w-xs">
              Consultoría argentina especializada en ingeniería de integridad
              industrial. Más de 20 años de experiencia a su servicio.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              <a
                href="https://www.linkedin.com/company/sintec-s-a/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#6e6e73] hover:text-white hover:bg-[#297373] hover:border-[#297373] transition-all duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">
              Navegación
            </h3>
            <nav aria-label="Páginas del sitio">
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#6e6e73] hover:text-white text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <ArrowRight
                      size={14}
                      className="opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-x-1 group-hover:translate-x-0"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/#contacto"
                  className="text-[#6e6e73] hover:text-white text-sm transition-colors duration-200 flex items-center gap-2 group"
                >
                  <ArrowRight
                    size={14}
                    className="opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-x-1 group-hover:translate-x-0"
                  />
                  Contacto
                </Link>
              </li>
            </ul>
            </nav>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">
              Servicios
            </h3>
            <nav aria-label="Servicios">
            <ul className="space-y-3">
              {SERVICES.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/soluciones/${service.slug}`}
                    className="text-[#6e6e73] hover:text-white text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <ArrowRight
                      size={14}
                      className="opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-x-1 group-hover:translate-x-0 shrink-0"
                    />
                    <span>{service.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
            </nav>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">
              Contacto
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href={`mailto:${COMPANY_EMAIL}`}
                  className="flex items-start gap-3 text-[#6e6e73] hover:text-white transition-colors duration-200 group"
                >
                  <span className="w-8 h-8 rounded-lg bg-[#297373]/10 flex items-center justify-center shrink-0 group-hover:bg-[#297373]/20 transition-colors duration-200">
                    <Mail size={15} className="text-[#A33400]" />
                  </span>
                  <div>
                    <p className="text-xs text-[#6e6e73] mb-0.5">Email</p>
                    <span className="text-sm">{COMPANY_EMAIL}</span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${COMPANY_PHONE.replace(/\s/g, "")}`}
                  className="flex items-start gap-3 text-[#6e6e73] hover:text-white transition-colors duration-200 group"
                >
                  <span className="w-8 h-8 rounded-lg bg-[#297373]/10 flex items-center justify-center shrink-0 group-hover:bg-[#297373]/20 transition-colors duration-200">
                    <Phone size={15} className="text-[#A33400]" />
                  </span>
                  <div>
                    <p className="text-xs text-[#6e6e73] mb-0.5">Teléfono</p>
                    <span className="text-sm">{COMPANY_PHONE}</span>
                  </div>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-[#6e6e73]">
                  <span className="w-8 h-8 rounded-lg bg-[#297373]/10 flex items-center justify-center shrink-0">
                    <MapPin size={15} className="text-[#A33400]" />
                  </span>
                  <div>
                    <p className="text-xs text-[#6e6e73] mb-0.5">Ubicación</p>
                    <span className="text-sm">{COMPANY_ADDRESS}</span>
                  </div>
                </div>
              </li>
              <li>
                <Link
                  href="/trabaja-con-nosotros"
                  className="flex items-start gap-3 text-[#6e6e73] hover:text-white transition-colors duration-200 group"
                >
                  <span className="w-8 h-8 rounded-lg bg-[#297373]/10 flex items-center justify-center shrink-0 group-hover:bg-[#297373]/20 transition-colors duration-200">
                    <Users size={15} className="text-[#A33400]" />
                  </span>
                  <div>
                    <p className="text-xs text-[#6e6e73] mb-0.5">RRHH</p>
                    <span className="text-sm">Trabaja con nosotros</span>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[#6e6e73] text-sm">
              &copy; {currentYear} {COMPANY_NAME}. Todos los derechos
              reservados.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/privacidad"
                className="text-[#6e6e73] hover:text-white text-xs transition-colors duration-200"
              >
                Política de Privacidad
              </Link>
              <Link
                href="/terminos"
                className="text-[#6e6e73] hover:text-white text-xs transition-colors duration-200"
              >
                Términos de Uso
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
