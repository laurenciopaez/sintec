"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { analytics } from "@/lib/analytics";
import { COMPANY_EMAIL, COMPANY_PHONE, COMPANY_ADDRESS } from "@/lib/constants";
import {
  MSG_MAX,
  sanitizeText,
  validateForm,
  type FormState,
  type FormErrors,
  EMPTY_FORM,
} from "@/lib/contactFormUtils";

const SERVICE_OPTIONS = [
  "Integridad de Activos",
  "Integridad de Riesgos (RBI)",
  "Análisis de Falla",
  "Control de Corrosión",
  "Inspección y Monitoreo",
  "Procedimientos Técnicos",
  "Otro / Consulta general",
];

// ── Component ─────────────────────────────────────────────────────────────────

type SubmitStatus = "idle" | "loading" | "success" | "error";

export function Contact() {
  const [form, setForm]               = useState<FormState>(EMPTY_FORM);
  const [honeypot, setHoneypot]       = useState("");
  const [status, setStatus]           = useState<SubmitStatus>("idle");
  const [errors, setErrors]           = useState<FormErrors>({});
  const [serverError, setServerError] = useState("");
  const lastSubmitRef                 = useRef<number>(0);

  // Fields where HTML sanitization applies (not email/phone which have their own rules)
  const TEXT_FIELDS: (keyof FormState)[] = ["name", "company", "message"];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const clean = TEXT_FIELDS.includes(name as keyof FormState) ? sanitizeText(value) : value;
    setForm((prev) => ({ ...prev, [name]: clean }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");

    const validationErrors = validateForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Debounce: ignore duplicate submits within 3 s
    const now = Date.now();
    if (now - lastSubmitRef.current < 3000) return;
    lastSubmitRef.current = now;

    setStatus("loading");

    // ── Web3Forms — free static-site form service ──────────────────────────
    // Get your free access key at https://web3forms.com
    const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ;

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          // honeypot field — Web3Forms ignores submissions where this is filled
          botcheck: honeypot,
          // form fields
          name:    form.name,
          email:   form.email,
          subject: `Consulta SINTEC: ${form.service || "Consulta general"}`,
          message: [
            form.message,
            form.company ? `\nEmpresa: ${form.company}` : "",
            form.phone   ? `\nTeléfono: ${form.phone}`  : "",
          ]
            .filter(Boolean)
            .join(""),
        }),
      });

      const data = await res.json();
      console.log("[Web3Forms response]", res.status, data);

      if (data.success) {
        setStatus("success");
        setForm(EMPTY_FORM);
        setHoneypot("");
        analytics.contactFormSubmit();
      } else {
        setServerError(data.message ?? "Error al enviar. Intente nuevamente.");
        setStatus("error");
        analytics.contactFormError("server");
      }
    } catch {
      setServerError("Error de conexión. Verifique su internet e intente nuevamente.");
      setStatus("error");
      analytics.contactFormError("network");
    }
  };

  const inputCls = (field: keyof FormState) =>
    `w-full px-4 py-3 bg-[#f5f5f7] border rounded-xl text-[#001514] placeholder-[#6e6e73] focus:outline-none focus:ring-2 focus:bg-white transition-all duration-200 text-sm ${
      errors[field]
        ? "border-red-400 focus:ring-red-200"
        : "border-[#d2d2d7] focus:ring-[#297373]/30 focus:border-[#297373]"
    }`;

  const msgLen       = form.message.length;
  const msgNearLimit = msgLen > MSG_MAX * 0.85;

  return (
    <section
      className="py-24 lg:py-32 bg-[#f5f5f7] scroll-mt-20"
      id="contacto"
    >
      <div className="max-w-7xl mx-auto xp-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection variant="slideUp" className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-[#297373]" />
            <span className="text-[#297373] text-sm font-medium tracking-widest uppercase">
              Contacto
            </span>
            <div className="h-px w-8 bg-[#297373]" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#001514] mb-4">
            Hablemos de su proyecto
          </h2>
          <p className="text-[#6e6e73] text-lg max-w-xl mx-auto">
            Cuéntenos sus necesidades y nuestros especialistas le responderán
            dentro de las 24 horas hábiles.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact info */}
          <AnimatedSection variant="slideRight" className="lg:col-span-1">
            <div className="space-y-6">
              {[
                {
                  icon: <Mail size={22} />,
                  label: "Email",
                  value: COMPANY_EMAIL,
                  href: `mailto:${COMPANY_EMAIL}`,
                },
                {
                  icon: <Phone size={22} />,
                  label: "Teléfono",
                  value: COMPANY_PHONE,
                  href: `tel:${COMPANY_PHONE.replace(/\s/g, "")}`,
                },
                {
                  icon: <MapPin size={22} />,
                  label: "Ubicación",
                  value: COMPANY_ADDRESS,
                  href: null,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-[#d2d2d7]/50 hover:border-[#297373]/30 hover:shadow-md transition-all duration-200"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#297373]/10 flex items-center justify-center text-[#297373] shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-xs text-[#6e6e73] mb-1 font-medium uppercase tracking-wide">
                      {item.label}
                    </div>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-[#001514] font-medium hover:text-[#297373] transition-colors duration-200 text-sm"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-[#001514] font-medium text-sm">
                        {item.value}
                      </span>
                    )}
                  </div>
                </div>
              ))}

              <div className="p-5 bg-[#297373]/5 rounded-2xl border border-[#297373]/20">
                <div className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-[#297373] shrink-0 mt-0.5" />
                  <p className="text-sm text-[#6e6e73]">
                    Respondemos todas las consultas dentro de las{" "}
                    <strong className="text-[#001514]">24 horas hábiles</strong>.
                    Para urgencias, contáctenos directamente por teléfono.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Form */}
          <AnimatedSection variant="slideLeft" delay={0.1} className="lg:col-span-2">
            <div className="bg-white rounded-3xl border border-[#d2d2d7]/50 p-8 lg:p-10 shadow-sm">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center py-12"
                  >
                    <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mb-6">
                      <CheckCircle size={36} className="text-green-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#001514] mb-3">
                      ¡Mensaje enviado!
                    </h3>
                    <p className="text-[#6e6e73] mb-8 max-w-sm">
                      Hemos recibido su consulta. Un especialista de SINTEC S.A.
                      se pondrá en contacto en breve.
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="text-[#297373] font-medium hover:underline"
                    >
                      Enviar otra consulta
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={handleSubmit}
                    noValidate
                    className="space-y-5"
                  >
                    {/* Honeypot — off-screen, not display:none so bots see it */}
                    <div
                      aria-hidden="true"
                      style={{ position: "absolute", left: "-9999px", top: "-9999px" }}
                    >
                      <label htmlFor="hp-website">No completar este campo</label>
                      <input
                        id="hp-website"
                        type="text"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>

                    {/* Name + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-[#001514] mb-2">
                          Nombre y apellido <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Juan García"
                          maxLength={100}
                          autoComplete="name"
                          aria-required="true"
                          aria-invalid={!!errors.name}
                          className={inputCls("name")}
                        />
                        {errors.name && (
                          <p role="alert" className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                            <AlertCircle size={12} /> {errors.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#001514] mb-2">
                          Email corporativo <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="juan@empresa.com"
                          maxLength={254}
                          autoComplete="email"
                          aria-required="true"
                          aria-invalid={!!errors.email}
                          className={inputCls("email")}
                        />
                        {errors.email && (
                          <p role="alert" className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                            <AlertCircle size={12} /> {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Company + Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-[#001514] mb-2">
                          Empresa
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={form.company}
                          onChange={handleChange}
                          placeholder="Nombre de su empresa"
                          maxLength={150}
                          autoComplete="organization"
                          className={inputCls("company")}
                        />
                        {errors.company && (
                          <p role="alert" className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                            <AlertCircle size={12} /> {errors.company}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#001514] mb-2">
                          Teléfono
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+54 11 0000-0000"
                          maxLength={20}
                          autoComplete="tel"
                          className={inputCls("phone")}
                        />
                        {errors.phone && (
                          <p role="alert" className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                            <AlertCircle size={12} /> {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Service */}
                    <div>
                      <label className="block text-sm font-medium text-[#001514] mb-2">
                        Servicio de interés
                      </label>
                      <select
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                        className={inputCls("service")}
                      >
                        <option value="">Seleccione un servicio...</option>
                        {SERVICE_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm font-medium text-[#001514]">
                          Mensaje <span className="text-red-500">*</span>
                        </label>
                        <span
                          aria-live="polite"
                          className={`text-xs tabular-nums transition-colors duration-200 ${
                            msgLen > MSG_MAX
                              ? "text-red-500 font-semibold"
                              : msgNearLimit
                              ? "text-amber-500"
                              : "text-[#6e6e73]"
                          }`}
                        >
                          {msgLen} / {MSG_MAX}
                        </span>
                      </div>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={5}
                        placeholder="Describa brevemente su consulta o proyecto..."
                        maxLength={MSG_MAX}
                        aria-required="true"
                        aria-invalid={!!errors.message}
                        className={`${inputCls("message")} resize-none`}
                      />
                      {errors.message && (
                        <p role="alert" className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                          <AlertCircle size={12} /> {errors.message}
                        </p>
                      )}
                    </div>

                    {/* Server error banner */}
                    <AnimatePresence>
                      {serverError && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          role="alert"
                          className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700"
                        >
                          <AlertCircle size={16} className="shrink-0 mt-0.5" />
                          {serverError}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Submit */}
                    <div className="pt-2">
                      <motion.button
                        type="submit"
                        disabled={status === "loading"}
                        className="w-full flex items-center justify-center gap-3 bg-[#297373] hover:bg-[#0A1045] disabled:bg-[#297373]/50 text-white py-4 rounded-xl font-semibold text-base transition-all duration-200 cursor-pointer disabled:cursor-not-allowed"
                        whileHover={{ scale: status === "loading" ? 1 : 1.01 }}
                        whileTap={{ scale: status === "loading" ? 1 : 0.99 }}
                      >
                        {status === "loading" ? (
                          <>
                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            Enviando...
                          </>
                        ) : (
                          <>
                            <Send size={18} />
                            Enviar mensaje
                          </>
                        )}
                      </motion.button>
                    </div>

                    <p className="text-xs text-[#6e6e73] text-center">
                      Sus datos son confidenciales y nunca serán compartidos con terceros.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

export default Contact;
