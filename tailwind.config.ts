import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0b1220",
        panel: "#111827",
        accent: "#00c2ff",
      }
    }
  },
  plugins: [],
};

export default config;
