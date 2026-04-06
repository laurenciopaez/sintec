"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Upload, X } from "lucide-react";
import { sanitizeText, containsBlockedWord } from "@/lib/contactFormUtils";
import { TRABAJA_CON_NOSOTROS as esT } from "@/lib/constants";

// ── Types ─────────────────────────────────────────────────────────────────────

type FormT = typeof esT.form;

interface FormState {
  nombre:       string;
  email:        string;
  edad:         string;
  estudios:     string;
  area:         string;
  presentacion: string;
}

type FormErrors = Partial<Record<keyof FormState | "cv", string>>;

const EMPTY_FORM: FormState = {
  nombre: "", email: "", edad: "", estudios: "", area: "", presentacion: "",
};

const EMAIL_RE = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
const CV_MAX_MB = 5;
const CV_ALLOWED_EXT = [".pdf", ".doc", ".docx"];

// ── Validation ────────────────────────────────────────────────────────────────

function validate(f: FormState, cvFile: File | null, t: FormT): FormErrors {
  const err: FormErrors = {};

  const nombre = f.nombre.trim();
  if (!nombre)                          err.nombre = t.errNombreRequired;
  else if (nombre.length < 2)           err.nombre = t.errNombreMin;
  else if (nombre.length > 100)         err.nombre = t.errNombreMax;
  else if (containsBlockedWord(nombre)) err.nombre = t.errBlocked;

  const email = f.email.trim();
  if (!email)                     err.email = t.errEmailRequired;
  else if (!EMAIL_RE.test(email)) err.email = t.errEmailInvalid;
  else if (email.length > 254)    err.email = t.errEmailMax;

  const edad = parseInt(f.edad, 10);
  if (!f.edad.trim())                    err.edad = t.errEdadRequired;
  else if (isNaN(edad) || edad < 16 || edad > 80) err.edad = t.errEdadInvalid;

  const estudios = f.estudios.trim();
  if (!estudios)                           err.estudios = t.errEstudiosRequired;
  else if (estudios.length < 5)            err.estudios = t.errEstudiosMin;
  else if (estudios.length > 200)          err.estudios = t.errEstudiosMax;
  else if (containsBlockedWord(estudios))  err.estudios = t.errBlocked;

  if (!f.area) err.area = t.errAreaRequired;

  if (!cvFile) {
    err.cv = t.errCvRequired;
  } else {
    const ext = cvFile.name.toLowerCase().slice(cvFile.name.lastIndexOf("."));
    if (!CV_ALLOWED_EXT.includes(ext))
      err.cv = t.errCvExt;
    else if (cvFile.size > CV_MAX_MB * 1024 * 1024)
      err.cv = t.errCvSize;
  }

  const presentacion = f.presentacion.trim();
  if (presentacion.length > 1000)
    err.presentacion = t.errPresentacionMax;
  else if (presentacion && containsBlockedWord(presentacion))
    err.presentacion = t.errBlocked;

  return err;
}

// ── Component ─────────────────────────────────────────────────────────────────

type SubmitStatus = "idle" | "loading" | "success" | "error";

interface Props {
  t: typeof esT;
}

export function JobApplicationForm({ t }: Props) {
  const [form, setForm]           = useState<FormState>(EMPTY_FORM);
  const [cvFile, setCvFile]       = useState<File | null>(null);
  const [honeypot, setHoneypot]   = useState("");
  const [status, setStatus]       = useState<SubmitStatus>("idle");
  const [errors, setErrors]       = useState<FormErrors>({});
  const [serverError, setServerError] = useState("");
  const lastSubmitRef             = useRef<number>(0);
  const fileInputRef              = useRef<HTMLInputElement>(null);

  const TEXT_FIELDS: (keyof FormState)[] = ["nombre", "estudios", "presentacion"];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const clean = TEXT_FIELDS.includes(name as keyof FormState)
      ? sanitizeText(value)
      : value;
    setForm((prev) => ({ ...prev, [name]: clean }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setCvFile(file);
    if (errors.cv) setErrors((prev) => ({ ...prev, cv: undefined }));
  };

  const removeFile = () => {
    setCvFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");

    const validationErrors = validate(form, cvFile, t.form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const now = Date.now();
    if (now - lastSubmitRef.current < 3000) return;
    lastSubmitRef.current = now;

    setStatus("loading");

    const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

    try {
      const formData = new FormData();
      formData.append("access_key", WEB3FORMS_KEY ?? "");
      formData.append("botcheck", honeypot);
      formData.append("name",  form.nombre);
      formData.append("email", form.email);
      formData.append(
        "subject",
        `${t.form.subjectPrefix} — ${form.nombre} | ${form.area}`
      );
      formData.append(
        "message",
        [
          `Nombre:          ${form.nombre}`,
          `Email:           ${form.email}`,
          `Edad:            ${form.edad} ${t.form.msgEdadSuffix}`,
          `Estudios:        ${form.estudios}`,
          `Área de interés: ${form.area}`,
          form.presentacion
            ? `\n${t.form.msgPresentacionLabel}\n${form.presentacion}`
            : "",
        ]
          .filter(Boolean)
          .join("\n")
      );
      if (cvFile) formData.append("attachment", cvFile);

      const res  = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body:   formData,
      });
      const data = await res.json();

      if (data.success) {
        setStatus("success");
        setForm(EMPTY_FORM);
        setCvFile(null);
        setHoneypot("");
        if (fileInputRef.current) fileInputRef.current.value = "";
      } else {
        setServerError(data.message ?? t.form.errDefault);
        setStatus("error");
      }
    } catch {
      setServerError(t.form.errNetwork);
      setStatus("error");
    }
  };

  const inputCls = (field: keyof FormErrors) =>
    `w-full px-4 py-3 bg-[#f5f5f7] border rounded-xl text-[#001514] placeholder-[#6e6e73] focus:outline-none focus:ring-2 focus:bg-white transition-all duration-200 text-sm ${
      errors[field]
        ? "border-red-400 focus:ring-red-200"
        : "border-[#d2d2d7] focus:ring-[#297373]/30 focus:border-[#297373]"
    }`;

  return (
    <div className="bg-white rounded-3xl border border-[#d2d2d7]/50 p-8 lg:p-10 shadow-sm max-w-2xl mx-auto">
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
              {t.form.successTitle}
            </h3>
            <p className="text-[#6e6e73] mb-8 max-w-sm">
              {t.form.successBody}
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="text-[#297373] font-medium hover:underline"
            >
              {t.form.successReset}
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
            {/* Honeypot */}
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

            {/* Nombre + Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-[#001514] mb-2">
                  {t.form.labelNombre} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  placeholder={t.form.placeholderNombre}
                  maxLength={100}
                  autoComplete="name"
                  aria-required="true"
                  aria-invalid={!!errors.nombre}
                  className={inputCls("nombre")}
                />
                {errors.nombre && (
                  <p role="alert" className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.nombre}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#001514] mb-2">
                  {t.form.labelEmail} <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder={t.form.placeholderEmail}
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

            {/* Edad + Área */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-[#001514] mb-2">
                  {t.form.labelEdad} <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="edad"
                  value={form.edad}
                  onChange={handleChange}
                  placeholder={t.form.placeholderEdad}
                  min={16}
                  max={80}
                  aria-required="true"
                  aria-invalid={!!errors.edad}
                  className={inputCls("edad")}
                />
                {errors.edad && (
                  <p role="alert" className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.edad}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#001514] mb-2">
                  {t.form.labelArea} <span className="text-red-500">*</span>
                </label>
                <select
                  name="area"
                  value={form.area}
                  onChange={handleChange}
                  aria-required="true"
                  aria-invalid={!!errors.area}
                  className={inputCls("area")}
                >
                  <option value="">{t.form.placeholderArea}</option>
                  {t.areas.map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
                {errors.area && (
                  <p role="alert" className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.area}
                  </p>
                )}
              </div>
            </div>

            {/* Estudios */}
            <div>
              <label className="block text-sm font-medium text-[#001514] mb-2">
                {t.form.labelEstudios} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="estudios"
                value={form.estudios}
                onChange={handleChange}
                placeholder={t.form.placeholderEstudios}
                maxLength={200}
                aria-required="true"
                aria-invalid={!!errors.estudios}
                className={inputCls("estudios")}
              />
              {errors.estudios && (
                <p role="alert" className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle size={12} /> {errors.estudios}
                </p>
              )}
            </div>

            {/* CV Upload */}
            <div>
              <label className="block text-sm font-medium text-[#001514] mb-2">
                {t.form.labelCv} <span className="text-red-500">*</span>
                <span className="text-[#6e6e73] font-normal ml-1">{t.form.cvHint}</span>
              </label>

              {cvFile ? (
                <div className="flex items-center gap-3 px-4 py-3 bg-[#297373]/5 border border-[#297373]/30 rounded-xl">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#001514] truncate">{cvFile.name}</p>
                    <p className="text-xs text-[#6e6e73]">
                      {(cvFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={removeFile}
                    className="shrink-0 w-7 h-7 rounded-lg bg-[#6e6e73]/10 hover:bg-red-100 hover:text-red-500 flex items-center justify-center transition-colors duration-200"
                    aria-label={t.form.cvRemoveLabel}
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <label
                  className={`flex flex-col items-center justify-center gap-2 px-4 py-6 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200 ${
                    errors.cv
                      ? "border-red-400 bg-red-50"
                      : "border-[#d2d2d7] hover:border-[#297373] hover:bg-[#297373]/5 bg-[#f5f5f7]"
                  }`}
                >
                  <Upload size={22} className={errors.cv ? "text-red-400" : "text-[#6e6e73]"} />
                  <span className="text-sm text-[#6e6e73]">
                    {t.form.cvUploadText}
                  </span>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="sr-only"
                    aria-required="true"
                    aria-invalid={!!errors.cv}
                  />
                </label>
              )}

              {errors.cv && (
                <p role="alert" className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle size={12} /> {errors.cv}
                </p>
              )}
            </div>

            {/* Carta de presentación */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-[#001514]">
                  {t.form.labelPresentacion}{" "}
                  <span className="text-[#6e6e73] font-normal">{t.form.presentacionOptional}</span>
                </label>
                <span className="text-xs text-[#6e6e73] tabular-nums">
                  {form.presentacion.length} / 1000
                </span>
              </div>
              <textarea
                name="presentacion"
                value={form.presentacion}
                onChange={handleChange}
                rows={4}
                maxLength={1000}
                placeholder={t.form.placeholderPresentacion}
                aria-invalid={!!errors.presentacion}
                className={`${inputCls("presentacion")} resize-none`}
              />
              {errors.presentacion && (
                <p role="alert" className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle size={12} /> {errors.presentacion}
                </p>
              )}
            </div>

            {/* Server error */}
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
                    {t.form.sending}
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    {t.form.submit}
                  </>
                )}
              </motion.button>
            </div>

            <p className="text-xs text-[#6e6e73] text-center">
              {t.form.privacy}
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
