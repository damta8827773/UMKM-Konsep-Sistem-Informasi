import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./modules/**/*.{ts,tsx}",
    "./common/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "hsl(var(--bg))",
        surface: "hsl(var(--surface))",
        "surface-2": "hsl(var(--surface-2))",
        border: "hsl(var(--border))",
        track: "hsl(var(--track))",
        text: "hsl(var(--text))",
        muted: "hsl(var(--muted))",
        faint: "hsl(var(--faint))",
        brand: "hsl(var(--brand))",
        "brand-soft": "hsl(var(--brand-soft))",
        danger: "hsl(var(--danger))",
        "danger-soft": "hsl(var(--danger-soft))",
        warn: "hsl(var(--warn))",
        "warn-soft": "hsl(var(--warn-soft))",
        safe: "hsl(var(--safe))",
        "safe-soft": "hsl(var(--safe-soft))",
      },
      fontFamily: { sans: ["var(--font-inter)", "system-ui", "sans-serif"] },
      borderRadius: { xl: "16px" },
      boxShadow: { card: "0 1px 2px rgba(20,25,50,.04), 0 1px 3px rgba(20,25,50,.06)" },
      keyframes: {
        "fade-up": { "0%": { opacity: "0", transform: "translateY(8px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
      },
      animation: { "fade-up": "fade-up .4s ease both" },
    },
  },
  plugins: [],
};

export default config;
