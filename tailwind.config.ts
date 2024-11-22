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
        foreground: "var(--foreground)",
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        background: "var(--background)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        border: "var(--border)",
        gradientStart: "var(--background)",
        gradientEnd: "var(--background-end)",
        brandGold: "var(--brand-gold)",
        neutralDark: "var(--neutral-dark)",
        neutralLight: "var(--neutral-light)",
        chipGradientFrom: "var(--chip-gradient-from)",
        chipGradientVia: "var(--chip-gradient-via)",
        chipGradientTo: "var(--chip-gradient-to)",
        logoGradientFrom: "var(--logo-gradient-from)",
        logoGradientVia: "var(--logo-gradient-via)",
        logoGradientTo: "var(--logo-gradient-to)",
        logo: {
          line: "var(--logo-line)",
          mobile: "var(--logo-line-mobile)",
        },
        cardHover: "var(--card-hover)",
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
          hover: "var(--primary-hover)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        brand: "var(--brand)",
        input: "var(--input)",
        ring: "var(--ring)",
        chart: {
          "1": "var(--chart-1)",
          "2": "var(--chart-2)",
          "3": "var(--chart-3)",
          "4": "var(--chart-4)",
          "5": "var(--chart-5)",
        },
        sidebar: {
          DEFAULT: "var(--sidebar-background)",
          foreground: "var(--sidebar-foreground)",
          primary: "var(--sidebar-primary)",
          "primary-foreground": "var(--sidebar-primary-foreground)",
          accent: "var(--sidebar-accent)",
          "accent-foreground": "var(--sidebar-accent-foreground)",
          border: "var(--sidebar-border)",
          ring: "var(--sidebar-ring)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",

        cardHover: "var(--card-hover)",

        brand: "var(--brand)",
        accent: "var(--accent)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
  darkMode: "media",
};

export default config;
