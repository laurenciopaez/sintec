"use client";

import { useLocale } from "./locale-context";
import * as es from "./constants";
import * as en from "./constants-en";

/**
 * Returns the constants set matching the current locale.
 * Use this instead of importing directly from constants.ts.
 */
export function useConstants() {
  const locale = useLocale();
  return locale === "en" ? en : es;
}
