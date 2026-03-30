"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, COMPANY_SHORT_NAME } from "@/lib/constants";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const navBg =
    scrolled || !isHome
      ? "bg-white/95 backdrop-blur-md border-b border-[#d2d2d7]/50 shadow-sm"
      : "bg-transparent";

  const logoColor =
    scrolled || !isHome ? "text-[#1d1d1f]" : "text-white";
  const linkColor =
    scrolled || !isHome
      ? "text-[#1d1d1f] hover:text-[#0066cc]"
      : "text-white/90 hover:text-white";
  const ctaBg =
    scrolled || !isHome
      ? "bg-[#0066cc] text-white hover:bg-[#004499]"
      : "bg-white text-[#1d1d1f] hover:bg-white/90";
  const menuIconColor =
    scrolled || !isHome ? "text-[#1d1d1f]" : "text-white";

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex items-center">
                <span
                  className={`text-2xl font-bold tracking-tight transition-colors duration-300 ${logoColor}`}
                >
                  {COMPANY_SHORT_NAME}
                </span>
                <span
                  className={`text-2xl font-light tracking-tight transition-colors duration-300 ml-0.5 ${
                    scrolled || !isHome
                      ? "text-[#0066cc]"
                      : "text-[#60aaff]"
                  }`}
                >
                  S.A.
                </span>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-sm font-medium transition-all duration-200 relative py-1 group ${linkColor} ${
                      isActive
                        ? scrolled || !isHome
                          ? "text-[#0066cc]"
                          : "text-white"
                        : ""
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute bottom-0 left-0 h-0.5 bg-[#0066cc] transition-all duration-200 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      } ${
                        !scrolled && isHome
                          ? "bg-white"
                          : "bg-[#0066cc]"
                      }`}
                    />
                  </Link>
                );
              })}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-4">
              <Link
                href="/#contacto"
                className={`text-sm font-semibold px-5 py-2.5 rounded-lg transition-all duration-200 ${ctaBg}`}
              >
                Contactar
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors duration-200 ${menuIconColor}`}
              aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
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
                href="/"
                onClick={() => setMobileOpen(false)}
                className="flex items-center"
              >
                <span className="text-2xl font-bold text-[#1d1d1f]">
                  {COMPANY_SHORT_NAME}
                </span>
                <span className="text-2xl font-light text-[#0066cc] ml-0.5">
                  S.A.
                </span>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 text-[#1d1d1f]"
                aria-label="Cerrar menú"
              >
                <X size={24} />
              </button>
            </div>

            {/* Mobile Nav Links */}
            <div className="flex flex-col px-4 pt-8 gap-2">
              {NAV_LINKS.map((link, index) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.07 + 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`block text-2xl font-medium py-3 border-b border-[#d2d2d7]/30 transition-colors duration-200 ${
                        isActive
                          ? "text-[#0066cc]"
                          : "text-[#1d1d1f] hover:text-[#0066cc]"
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
                transition={{ delay: NAV_LINKS.length * 0.07 + 0.1 }}
                className="mt-8"
              >
                <Link
                  href="/#contacto"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full text-center bg-[#0066cc] text-white text-lg font-semibold py-4 rounded-xl hover:bg-[#004499] transition-colors duration-200"
                >
                  Contactar
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
