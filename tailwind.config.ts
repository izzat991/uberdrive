import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta oficial estilo Uber Driver
        uberBg: "#0F0F0F",
        uberCard: "#111111",
        uberBtn: "#1F1F1F",
        uberSecondary: "#AFAFAF",
        uberBlue: "#276EF1",
        sheet: "#000000",
        sheetEdge: "#1b1f27",
        surgePink: "#f7d6e0",
        surgeBlue: "#276EF1",
        startBlue: "#276EF1",
        accentGreen: "#23c65a",
        accentRed: "#ff5a4d",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "var(--font-system)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
