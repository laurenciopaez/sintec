// Shared validation and sanitization — safe to use in both client and server

export const FIELD_LIMITS = {
  name:    { min: 2,  max: 100  },
  email:   { min: 5,  max: 254  },
  company: { min: 0,  max: 150  },
  phone:   { min: 0,  max: 20   },
  service: { min: 0,  max: 100  },
  message: { min: 10, max: 2000 },
} as const;

export const ALLOWED_SERVICES = [
  "",
  "Integridad de Activos",
  "Integridad de Riesgos (RBI)",
  "Análisis de Falla",
  "Control de Corrosión",
  "Inspección y Monitoreo",
  "Procedimientos Técnicos",
  "Otro / Consulta general",
] as const;

// Strict email regex — rejects common injection patterns
const EMAIL_REGEX = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

// Phone: only digits, spaces, +, -, (, )
const PHONE_REGEX = /^[\d\s+\-().]*$/;

export interface ContactFormData {
  name:    string;
  email:   string;
  company: string;
  phone:   string;
  service: string;
  message: string;
}

export type FormErrors = Partial<Record<keyof ContactFormData, string>>;

/** Client and server-side field validation */
export function validateContactForm(data: ContactFormData): FormErrors {
  const errors: FormErrors = {};

  // ── Name ──────────────────────────────────────────────
  const name = data.name.trim();
  if (!name) {
    errors.name = "El nombre es requerido";
  } else if (name.length < FIELD_LIMITS.name.min) {
    errors.name = `Mínimo ${FIELD_LIMITS.name.min} caracteres`;
  } else if (name.length > FIELD_LIMITS.name.max) {
    errors.name = `Máximo ${FIELD_LIMITS.name.max} caracteres`;
  }

  // ── Email ─────────────────────────────────────────────
  const email = data.email.trim();
  if (!email) {
    errors.email = "El email es requerido";
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = "El formato del email es inválido";
  } else if (email.length > FIELD_LIMITS.email.max) {
    errors.email = `El email no puede superar ${FIELD_LIMITS.email.max} caracteres`;
  }

  // ── Company (optional) ────────────────────────────────
  if (data.company.trim().length > FIELD_LIMITS.company.max) {
    errors.company = `Máximo ${FIELD_LIMITS.company.max} caracteres`;
  }

  // ── Phone (optional) ──────────────────────────────────
  const phone = data.phone.trim();
  if (phone) {
    if (!PHONE_REGEX.test(phone)) {
      errors.phone = "Solo números, espacios, +, - y ()";
    } else if (phone.length > FIELD_LIMITS.phone.max) {
      errors.phone = `Máximo ${FIELD_LIMITS.phone.max} dígitos`;
    }
  }

  // ── Service (optional, whitelist) ─────────────────────
  if (data.service && !(ALLOWED_SERVICES as readonly string[]).includes(data.service)) {
    errors.service = "Opción no válida";
  }

  // ── Message ───────────────────────────────────────────
  const message = data.message.trim();
  if (!message) {
    errors.message = "El mensaje es requerido";
  } else if (message.length < FIELD_LIMITS.message.min) {
    errors.message = `Mínimo ${FIELD_LIMITS.message.min} caracteres`;
  } else if (message.length > FIELD_LIMITS.message.max) {
    errors.message = `Máximo ${FIELD_LIMITS.message.max} caracteres`;
  }

  return errors;
}

/**
 * Escape HTML entities — prevents XSS when content is stored or
 * later rendered in an HTML context (emails, admin panels, logs).
 * React JSX already escapes on render, but this protects backend output.
 */
export function sanitizeString(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .trim();
}
