// ── Contact form — sanitization & validation ─────────────────────────────────
// Used by components/home/Contact.tsx (client) and app/api/contact/route.ts (server).

export const MSG_MAX = 2000;
export const MSG_MIN = 10;

const EMAIL_RE = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
const PHONE_RE = /^[\d\s+\-().]*$/;

// ── Sanitization ──────────────────────────────────────────────────────────────

/** Strips HTML tags, script injections and dangerous URI schemes from any text field. */
export function sanitizeText(value: string): string {
  return value
    .replace(/<[^>]*>/g, "")          // strip HTML tags
    .replace(/javascript\s*:/gi, "")  // strip javascript: URIs
    .replace(/on\w+\s*=/gi, "")       // strip inline event handlers (onclick=…)
    .replace(/[<>]/g, "");            // strip stray angle brackets
}

// Common Spanish/Argentine profanity and offensive terms
const BLOCKED_WORDS: string[] = [
  "puta", "puto", "putos", "putas",
  "mierda", "mierdas",
  "coño", "cono",
  "cabrón", "cabron", "cabrona",
  "joder",
  "hostia",
  "gilipollas",
  "imbécil", "imbecil",
  "idiota", "idiotas",
  "estúpido", "estupido", "estúpida", "estupida",
  "pendejo", "pendeja", "pendejos", "pendejas",
  "pelotudo", "pelotuda",
  "boludo", "boluda", "boludos",
  "carajo",
  "concha",
  "culero", "culera",
  "chingar", "chingada", "chingado",
  "verga",
  "pija",
  "culo", "culos",
  "maricón", "maricon",
  "hdp", "hdpm",
  "forro", "forros",
  "mogólico", "mogolico",
  "tarado", "tarada",
];

/**
 * Returns true if the text contains any blocked word as a whole word.
 * Uses a boundary check compatible with Spanish accented characters.
 */
export function containsBlockedWord(text: string): boolean {
  const lower = text.toLowerCase();
  return BLOCKED_WORDS.some((word) => {
    const re = new RegExp(`(?<![a-záéíóúüñ])${word}(?![a-záéíóúüñ])`, "i");
    return re.test(lower);
  });
}

// Patterns for sensitive data that should not be submitted through this form
const SENSITIVE_PATTERNS: { re: RegExp; label: string }[] = [
  { re: /\b\d{4}[\s\-]?\d{4}[\s\-]?\d{4}[\s\-]?\d{4}\b/, label: "número de tarjeta de crédito" },
  { re: /\b\d{3}[\s\-]?\d{2}[\s\-]?\d{4}\b/,              label: "número de seguro social" },
  { re: /password\s*[:=]/i,                                 label: "contraseña" },
  { re: /contraseña\s*[:=]/i,                               label: "contraseña" },
  { re: /clave\s*[:=]/i,                                    label: "clave" },
];

/** Returns the label of the first sensitive pattern found, or null. */
export function containsSensitiveData(text: string): string | null {
  for (const { re, label } of SENSITIVE_PATTERNS) {
    if (re.test(text)) return label;
  }
  return null;
}

// ── Form types ────────────────────────────────────────────────────────────────

export interface FormState {
  name:    string;
  email:   string;
  company: string;
  phone:   string;
  service: string;
  message: string;
}

export type FormErrors = Partial<Record<keyof FormState, string>>;

export const EMPTY_FORM: FormState = {
  name: "", email: "", company: "", phone: "", service: "", message: "",
};

// ── Validation ────────────────────────────────────────────────────────────────

export function validateForm(f: FormState): FormErrors {
  const err: FormErrors = {};

  const name = f.name.trim();
  if (!name)                          err.name = "El nombre es requerido";
  else if (name.length < 2)           err.name = "Mínimo 2 caracteres";
  else if (name.length > 100)         err.name = "Máximo 100 caracteres";
  else if (containsBlockedWord(name)) err.name = "El nombre contiene lenguaje inapropiado";

  const email = f.email.trim();
  if (!email)                      err.email = "El email es requerido";
  else if (!EMAIL_RE.test(email))  err.email = "El formato del email es inválido";
  else if (email.length > 254)     err.email = "Email demasiado largo";

  const company = f.company.trim();
  if (company.length > 150)              err.company = "Máximo 150 caracteres";
  else if (containsBlockedWord(company)) err.company = "El campo contiene lenguaje inapropiado";

  const phone = f.phone.trim();
  if (phone && !PHONE_RE.test(phone))  err.phone = "Solo números, espacios, +, - y ()";
  else if (phone && phone.length > 20) err.phone = "Máximo 20 caracteres";

  const msg = f.message.trim();
  if (!msg)                          err.message = "El mensaje es requerido";
  else if (msg.length < MSG_MIN)     err.message = `Mínimo ${MSG_MIN} caracteres`;
  else if (msg.length > MSG_MAX)     err.message = `Máximo ${MSG_MAX} caracteres`;
  else if (containsBlockedWord(msg)) err.message = "El mensaje contiene lenguaje inapropiado";
  else {
    const sensitiveLabel = containsSensitiveData(msg);
    if (sensitiveLabel) err.message = `Por su seguridad, no incluya ${sensitiveLabel} en el mensaje`;
  }

  return err;
}
