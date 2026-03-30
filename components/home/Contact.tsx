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
import { COMPANY_EMAIL, COMPANY_PHONE, COMPANY_ADDRESS } from "@/lib/constants";

// ── Client-side validation ────────────────────────────────────────────────────
// Kept inline to stay in the client bundle only.
// The server (app/api/contact/route.ts) runs the same rules independently.

const MSG_MAX = 2000;
const MSG_MIN = 10;
const EMAIL_RE = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
const PHONE_RE = /^[\d\s+\-().]*$/;

const SERVICE_OPTIONS = [
  "Integridad de Activos",
  "Integridad de Riesgos (RBI)",
  "Análisis de Falla",
  "Control de Corrosión",
  "Inspección y Monitoreo",
  "Procedimientos Técnicos",
  "Otro / Consulta general",
];

interface FormState {
  name:    string;
  email:   string;
  company: string;
  phone:   string;
  service: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormState, string>>;

function validateForm(f: FormState): FormErrors {
  const err: FormErrors = {};

  const name = f.name.trim();
  if (!name)                   err.name = "El nombre es requerido";
  else if (name.length < 2)    err.name = "Mínimo 2 caracteres";
  else if (name.length > 100)  err.name = "Máximo 100 caracteres";

  const email = f.email.trim();
  if (!email)                        err.email = "El email es requerido";
  else if (!EMAIL_RE.test(email))    err.email = "El formato del email es inválido";
  else if (email.length > 254)       err.email = "Email demasiado largo";

  if (f.company.trim().length > 150) err.company = "Máximo 150 caracteres";

  const phone = f.phone.trim();
  if (phone && !PHONE_RE.test(phone))      err.phone = "Solo números, espacios, +, - y ()";
  else if (phone && phone.length > 20)     err.phone = "Máximo 20 caracteres";

  const msg = f.message.trim();
  if (!msg)                err.message = "El mensaje es requerido";
  else if (msg.length < MSG_MIN) err.message = `Mínimo ${MSG_MIN} caracteres`;
  else if (msg.length > MSG_MAX) err.message = `Máximo ${MSG_MAX} caracteres`;

  return err;
}

// ── Component ─────────────────────────────────────────────────────────────────

type SubmitStatus = "idle" | "loading" | "success" | "error";

const EMPTY: FormState = {
  name: "", email: "", company: "", phone: "", service: "", message: "",
};

export function Contact() {
  const [form, setForm]               = useState<FormState>(EMPTY);
  const [honeypot, setHoneypot]       = useState("");
  const [status, setStatus]           = useState<SubmitStatus>("idle");
  const [errors, setErrors]           = useState<FormErrors>({});
  const [serverError, setServerError] = useState("");
  const lastSubmitRef                 = useRef<number>(0);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
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
    const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "TU_ACCESS_KEY_AQUI";

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
        setForm(EMPTY);
        setHoneypot("");
      } else {
        setServerError(data.message ?? "Error al enviar. Intente nuevamente.");
        setStatus("error");
      }
    } catch {
      setServerError("Error de conexión. Verifique su internet e intente nuevamente.");
      setStatus("error");
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
