"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { COMPANY_EMAIL, COMPANY_PHONE, COMPANY_ADDRESS } from "@/lib/constants";

interface FormState {
  name: string;
  email: string;
  company: string;
  phone: string;
  service: string;
  message: string;
}

const initialState: FormState = {
  name: "",
  email: "",
  company: "",
  phone: "",
  service: "",
  message: "",
};

const serviceOptions = [
  "Integridad de Activos",
  "Integridad de Riesgos (RBI)",
  "Análisis de Falla",
  "Control de Corrosión",
  "Inspección y Monitoreo",
  "Procedimientos Técnicos",
  "Otro / Consulta general",
];

type SubmitStatus = "idle" | "loading" | "success" | "error";

export function Contact() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errors, setErrors] = useState<Partial<FormState>>({});

  const validate = (): boolean => {
    const newErrors: Partial<FormState> = {};
    if (!form.name.trim()) newErrors.name = "El nombre es requerido";
    if (!form.email.trim()) {
      newErrors.email = "El email es requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Email inválido";
    }
    if (!form.message.trim()) newErrors.message = "El mensaje es requerido";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // In production, replace with actual API call:
    // const response = await fetch('/api/contact', { method: 'POST', body: JSON.stringify(form) });
    setStatus("success");
    setForm(initialState);
  };

  const inputClasses = (field: keyof FormState) =>
    `w-full px-4 py-3 bg-[#f5f5f7] border rounded-xl text-[#1d1d1f] placeholder-[#6e6e73] focus:outline-none focus:ring-2 focus:bg-white transition-all duration-200 text-sm ${
      errors[field]
        ? "border-red-400 focus:ring-red-200"
        : "border-[#d2d2d7] focus:ring-[#0066cc]/30 focus:border-[#0066cc]"
    }`;

  return (
    <section className="py-24 lg:py-32 bg-[#f5f5f7]" id="contacto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <AnimatedSection variant="slideUp" className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-[#0066cc]" />
            <span className="text-[#0066cc] text-sm font-medium tracking-widest uppercase">
              Contacto
            </span>
            <div className="h-px w-8 bg-[#0066cc]" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#1d1d1f] mb-4">
            Hablemos de su proyecto
          </h2>
          <p className="text-[#6e6e73] text-lg max-w-xl mx-auto">
            Cuéntenos sus necesidades y nuestros especialistas le responderán
            dentro de las 24 horas hábiles.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <AnimatedSection variant="slideRight" className="lg:col-span-1">
            <div className="space-y-6">
              {/* Contact cards */}
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
                  className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-[#d2d2d7]/50 hover:border-[#0066cc]/30 hover:shadow-md transition-all duration-200"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#0066cc]/10 flex items-center justify-center text-[#0066cc] shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-xs text-[#6e6e73] mb-1 font-medium uppercase tracking-wide">
                      {item.label}
                    </div>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-[#1d1d1f] font-medium hover:text-[#0066cc] transition-colors duration-200 text-sm"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-[#1d1d1f] font-medium text-sm">
                        {item.value}
                      </span>
                    )}
                  </div>
                </div>
              ))}

              {/* Response time note */}
              <div className="p-5 bg-[#0066cc]/5 rounded-2xl border border-[#0066cc]/20">
                <div className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-[#0066cc] shrink-0 mt-0.5" />
                  <p className="text-sm text-[#6e6e73]">
                    Respondemos todas las consultas dentro de las{" "}
                    <strong className="text-[#1d1d1f]">24 horas hábiles</strong>.
                    Para urgencias, contáctenos directamente por teléfono.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Contact Form */}
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
                    <h3 className="text-2xl font-bold text-[#1d1d1f] mb-3">
                      ¡Mensaje enviado!
                    </h3>
                    <p className="text-[#6e6e73] mb-8 max-w-sm">
                      Hemos recibido su consulta. Un especialista de SINTEC S.A.
                      se pondrá en contacto en breve.
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="text-[#0066cc] font-medium hover:underline"
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
                    className="space-y-5"
                  >
                    {/* Name + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-[#1d1d1f] mb-2">
                          Nombre y apellido <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Ej: Juan García"
                          className={inputClasses("name")}
                        />
                        {errors.name && (
                          <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                            <AlertCircle size={12} /> {errors.name}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#1d1d1f] mb-2">
                          Email corporativo <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="juan@empresa.com"
                          className={inputClasses("email")}
                        />
                        {errors.email && (
                          <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                            <AlertCircle size={12} /> {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Company + Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-[#1d1d1f] mb-2">
                          Empresa
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={form.company}
                          onChange={handleChange}
                          placeholder="Nombre de su empresa"
                          className={inputClasses("company")}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#1d1d1f] mb-2">
                          Teléfono
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+54 11 0000-0000"
                          className={inputClasses("phone")}
                        />
                      </div>
                    </div>

                    {/* Service */}
                    <div>
                      <label className="block text-sm font-medium text-[#1d1d1f] mb-2">
                        Servicio de interés
                      </label>
                      <select
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                        className={inputClasses("service")}
                      >
                        <option value="">Seleccione un servicio...</option>
                        {serviceOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-medium text-[#1d1d1f] mb-2">
                        Mensaje <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={5}
                        placeholder="Describa brevemente su consulta o proyecto..."
                        className={`${inputClasses("message")} resize-none`}
                      />
                      {errors.message && (
                        <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                          <AlertCircle size={12} /> {errors.message}
                        </p>
                      )}
                    </div>

                    {/* Submit */}
                    <div className="pt-2">
                      <motion.button
                        type="submit"
                        disabled={status === "loading"}
                        className="w-full flex items-center justify-center gap-3 bg-[#0066cc] hover:bg-[#004499] disabled:bg-[#0066cc]/50 text-white py-4 rounded-xl font-semibold text-base transition-all duration-200 cursor-pointer disabled:cursor-not-allowed"
                        whileHover={{ scale: status === "loading" ? 1 : 1.01 }}
                        whileTap={{ scale: status === "loading" ? 1 : 0.99 }}
                      >
                        {status === "loading" ? (
                          <>
                            <svg
                              className="animate-spin h-5 w-5"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                              />
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
                      Sus datos son confidenciales y nunca serán compartidos con
                      terceros.
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
