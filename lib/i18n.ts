export type Locale = "es" | "en";
export const locales: Locale[] = ["es", "en"];
export const defaultLocale: Locale = "es";

/** Use in generateStaticParams for [locale] pages */
export const localeParams = locales.map((locale) => ({ locale }));

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

/** Extract locale from Next.js pathname */
export function localeFromPath(pathname: string): Locale {
  if (pathname.startsWith("/en")) return "en";
  return "es";
}

/** Build a locale-prefixed path */
export function localePath(href: string, locale: Locale): string {
  return href === "/" ? `/${locale}` : `/${locale}${href}`;
}

/** Switch locale in a pathname (e.g. /es/quienes-somos → /en/quienes-somos) */
export function switchLocalePath(pathname: string, from: Locale, to: Locale): string {
  if (pathname.startsWith(`/${from}`)) {
    return `/${to}${pathname.slice(from.length + 1)}`;
  }
  return `/${to}`;
}

// ── Navbar i18n ───────────────────────────────────────────────────────────────

export const NAV_I18N = {
  es: {
    links: [
      { label: "Inicio", href: "/" },
      { label: "Quiénes Somos", href: "/quienes-somos" },
      { label: "Soluciones", href: "/soluciones" },
    ],
    contact: "Contactar",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    skipContent: "Saltar al contenido principal",
    switchLang: "Switch to English",
  },
  en: {
    links: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/quienes-somos" },
      { label: "Solutions", href: "/soluciones" },
    ],
    contact: "Contact",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    skipContent: "Skip to main content",
    switchLang: "Cambiar a Español",
  },
} satisfies Record<Locale, {
  links: { label: string; href: string }[];
  contact: string;
  openMenu: string;
  closeMenu: string;
  skipContent: string;
  switchLang: string;
}>;
