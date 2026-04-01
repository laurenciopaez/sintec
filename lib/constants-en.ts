/**
 * constants-en.ts — English version of constants.ts
 *
 * HOW TO TRANSLATE:
 * 1. For re-exported large objects (SERVICES, STATS, etc.), copy the original
 *    from constants.ts, paste it below, comment out the re-export, and
 *    replace all Spanish text strings with English.
 * 2. Simple strings below are already translated — review and adjust as needed.
 */

// ── Non-translatable (same in all languages) ──────────────────────────────────
export {
  COMPANY_NAME,
  COMPANY_SHORT_NAME,
  COMPANY_EMAIL,
  COMPANY_PHONE,
  COMPANY_ADDRESS,
  COMPANY_FOUNDED,
} from "./constants";

// ── Translatable strings ──────────────────────────────────────────────────────

export const COMPANY_TAGLINE =
  "Engineering Integrity. Precision. Trust.";

export const COMPANY_DESCRIPTION =
  "Argentine consultancy specializing in integrity engineering, risk management and industrial asset reliability.";

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/quienes-somos" },
  { label: "Solutions", href: "/soluciones" },
];

// ── Large objects — re-exported until translated ──────────────────────────────
// To translate each one:
//   1. Comment out the re-export line below
//   2. Copy the full object from constants.ts
//   3. Replace all Spanish text with English

export {
  SERVICES,    // TODO: translate titles, descriptions, features, faq, alcance, valorAgregado
  STATS,       // TODO: translate label, description fields
  VALUES,      // TODO: translate title, description fields
  FAQ_TREE,    // TODO: translate question/answer text and CTA labels
  FAQ_ITEMS,   // TODO: translate question, answer, cta.label fields
} from "./constants";

export type { FaqTreeNode } from "./constants";
