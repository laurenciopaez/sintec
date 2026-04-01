"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";
import { COMPANY_SHORT_NAME } from "@/lib/constants";
import {
  NAV_I18N,
  localeFromPath,
  localePath,
  switchLocalePath,
  type Locale,
} from "@/lib/i18n";

export function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router   = useRouter();

  const locale: Locale = localeFromPath(pathname);
  const nav            = NAV_I18N[locale];

  // "/" is home only when using old non-locale routes; locale home is "/{locale}"
  const isHome =
    pathname === `/${locale}` ||
    pathname === "/" ||
    pathname === "/es" ||
    pathname === "/en";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleSwitchLocale = () => {
    const newLocale: Locale = locale === "es" ? "en" : "es";
    const newPath = switchLocalePath(pathname, locale, newLocale);
    try { localStorage.setItem("sintec-locale", newLocale); } catch {}
    router.push(newPath);
  };

  const navBg =
    scrolled || !isHome
      ? "bg-white/95 backdrop-blur-md border-b border-[#d2d2d7]/50 shadow-sm"
      : "bg-transparent";

  const logoColor   = scrolled || !isHome ? "text-[#001514]" : "text-white";
  const linkColor   = scrolled || !isHome ? "text-[#001514] hover:text-[#297373]" : "text-white/90 hover:text-white";
  const ctaBg       = scrolled || !isHome ? "bg-[#297373] text-white hover:bg-[#0A1045]" : "bg-white text-[#001514] hover:bg-white/90";
  const menuIconColor = scrolled || !isHome ? "text-[#001514]" : "text-white";
  const langBtnColor  = scrolled || !isHome ? "text-[#6e6e73] hover:text-[#297373]" : "text-white/70 hover:text-white";

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <nav aria-label="Navegación principal" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href={localePath("/", locale)} className="flex items-center gap-2 group">
              <div className="flex items-center">
                <span className={`text-2xl font-bold tracking-tight transition-colors duration-300 ${logoColor}`}>
                  {COMPANY_SHORT_NAME}
                </span>
                <span
                  className={`text-2xl font-light tracking-tight transition-colors duration-300 ml-0.5 ${
                    scrolled || !isHome ? "text-[#297373]" : "text-[#5aacac]"
                  }`}
                >
                  S.A.
                </span>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              {nav.links.map((link) => {
                const href = localePath(link.href, locale);
                const isActive =
                  pathname === href ||
                  (link.href !== "/" && pathname.startsWith(href));
                return (
                  <Link
                    key={link.href}
                    href={href}
                    className={`text-sm font-medium transition-all duration-200 relative py-1 group ${linkColor} ${
                      isActive
                        ? scrolled || !isHome ? "text-[#297373]" : "text-white"
                        : ""
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute bottom-0 left-0 h-0.5 transition-all duration-200 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      } ${!scrolled && isHome ? "bg-white" : "bg-[#297373]"}`}
                    />
                  </Link>
                );
              })}
            </div>

            {/* Desktop right: lang switcher + CTA */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={handleSwitchLocale}
                title={nav.switchLang}
                className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg border transition-all duration-200 ${
                  scrolled || !isHome
                    ? "border-[#d2d2d7] text-[#6e6e73] hover:text-[#297373] hover:border-[#297373]"
                    : "border-white/30 text-white/70 hover:text-white hover:border-white/60"
                }`}
              >
                <Globe size={13} />
                {locale === "es" ? "EN" : "ES"}
              </button>

              <Link
                href={`${localePath("/", locale)}#contacto`}
                className={`text-sm font-semibold px-5 py-2.5 rounded-lg transition-all duration-200 ${ctaBg}`}
              >
                {nav.contact}
              </Link>
            </div>

            {/* Mobile: lang switcher + menu button */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={handleSwitchLocale}
                title={nav.switchLang}
                className={`flex items-center gap-1 text-xs font-semibold px-2 py-1.5 rounded-lg transition-colors duration-200 ${langBtnColor}`}
              >
                <Globe size={12} />
                {locale === "es" ? "EN" : "ES"}
              </button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`p-2 rounded-lg transition-colors duration-200 ${menuIconColor}`}
                aria-label={mobileOpen ? nav.closeMenu : nav.openMenu}
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-white md:hidden"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between px-4 h-16 border-b border-[#d2d2d7]/50">
              <Link
                href={localePath("/", locale)}
                onClick={() => setMobileOpen(false)}
                className="flex items-center"
              >
                <span className="text-2xl font-bold text-[#001514]">{COMPANY_SHORT_NAME}</span>
                <span className="text-2xl font-light text-[#297373] ml-0.5">S.A.</span>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 text-[#001514]"
                aria-label={nav.closeMenu}
              >
                <X size={24} />
              </button>
            </div>

            {/* Mobile Nav Links */}
            <div className="flex flex-col px-4 pt-8 gap-2">
              {nav.links.map((link, index) => {
                const href = localePath(link.href, locale);
                const isActive =
                  pathname === href ||
                  (link.href !== "/" && pathname.startsWith(href));
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.07 + 0.1 }}
                  >
                    <Link
                      href={href}
                      onClick={() => setMobileOpen(false)}
                      className={`block text-2xl font-medium py-3 border-b border-[#d2d2d7]/30 transition-colors duration-200 ${
                        isActive ? "text-[#297373]" : "text-[#001514] hover:text-[#297373]"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: nav.links.length * 0.07 + 0.1 }}
                className="mt-8"
              >
                <Link
                  href={`${localePath("/", locale)}#contacto`}
                  onClick={() => setMobileOpen(false)}
                  className="block w-full text-center bg-[#297373] text-white text-lg font-semibold py-4 rounded-xl hover:bg-[#0A1045] transition-colors duration-200"
                >
                  {nav.contact}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
