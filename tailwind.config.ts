import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        foreground: "var(--foreground-color)",
        secondary: "var(--secondary-text)",
        background: "var(--background-start-color)",
        card: "var(--card-color)",
        border: "var(--border-color)",
        gradientStart: "var(--background-start-color)",
        gradientEnd: "var(--background-end-color)",
        brandGold: "var(--brand-gold)",
        chipGradientFrom: "var(--chip-gradient-from)",
        chipGradientVia: "var(--chip-gradient-via)",
        chipGradientTo: "var(--chip-gradient-to)",
        logoGradientFrom: "var(--logo-gradient-from)",
        logoGradientVia: "var(--logo-gradient-via)",
        logoGradientTo: "var(--logo-gradient-to)",
        cardHover: "var(--card-hover)",
      },
    },
  },
  plugins: [],
  darkMode: "media",
};

export default config;
