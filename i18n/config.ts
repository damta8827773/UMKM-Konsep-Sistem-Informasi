// Active locales = those with a complete message file in /messages.
// Add a language by: 1) creating messages/<code>.ts  2) registering it here.
// The switcher only shows ACTIVE locales, so users never see half-translated UI.
export const LOCALES = [
  { code: "id", label: "Indonesia", flag: "🇮🇩" },
  { code: "en", label: "English", flag: "🇬🇧" },
] as const;

export type LocaleCode = (typeof LOCALES)[number]["code"];
export const DEFAULT_LOCALE: LocaleCode = "id";
export const STORAGE_KEY = "warung-locale";

// Roadmap toward 25 languages (enable each once its message file exists):
// id, en, jv (Jawa), su (Sunda), ms, ar, zh, ja, ko, hi, th, vi, fr, es, de,
// pt, ru, tr, nl, it, fil, bn, ta, ur, fa
export const PLANNED_LOCALES = [
  "jv", "su", "ms", "ar", "zh", "ja", "ko", "hi", "th", "vi",
  "fr", "es", "de", "pt", "ru", "tr", "nl", "it", "fil", "bn",
  "ta", "ur", "fa",
] as const;
