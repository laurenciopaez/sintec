import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales, defaultLocale, type Locale } from "@/lib/i18n";

const PUBLIC_FILE = /\.(.*)$/; // archivos con extensión (.png, .ico, etc.)

function detectLocale(request: NextRequest): Locale {
  // 1) Cookie guardada por el selector de idioma
  const cookie = request.cookies.get("sintec-locale")?.value;
  if (cookie === "es" || cookie === "en") return cookie;

  // 2) Header Accept-Language del navegador
  const acceptLang = request.headers.get("accept-language") ?? "";
  const preferred = acceptLang.split(",")[0].trim().toLowerCase();
  if (preferred.startsWith("es")) return "es";
  if (preferred.startsWith("en")) return "en";

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ignorar archivos estáticos, _next, api
  if (
    PUBLIC_FILE.test(pathname) ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api")
  ) {
    return NextResponse.next();
  }

  // Si ya tiene un locale válido al inicio, dejar pasar
  const hasLocale = locales.some(
    (loc) => pathname === `/${loc}` || pathname.startsWith(`/${loc}/`)
  );
  if (hasLocale) return NextResponse.next();

  // Redirigir al locale detectado
  const locale = detectLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;

  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    // Aplica a todas las rutas excepto las internas de Next.js
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
