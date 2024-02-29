import type { Config } from "tailwindcss";
const { fontFamily } = require("tailwindcss/defaultTheme");

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Brand Palette
        brand: {
          1: "rgb(231, 231, 233)",
          2: "rgb(197, 198, 201)",
          3: "rgb(151, 153, 158)",
          4: "rgb(102, 105, 113)",
          5: "rgb(56, 60, 71)",
          6: "rgb(12, 17, 30)",
          7: "rgb(10, 14, 26)",
          8: "rgb(9, 12, 21)",
          9: "rgb(7, 10, 17)",
          10: "rgb(5, 8, 13)",
        },
        main: {
          1: "rgb(233, 240, 255)",
          2: "rgb(201, 219, 255)",
          3: "rgb(158, 191, 255)",
          4: "rgb(113, 161, 255)",
          5: "rgb(71, 132, 255)",
          6: "rgb(30, 105, 255)",
          7: "rgb(26, 89, 217)",
          8: "rgb(21, 75, 181)",
          9: "rgb(17, 60, 145)",
          10: "rgb(13, 47, 115)",
        },
        base: {
          1: "rgb(247, 247, 248)",
          2: "rgb(236, 236, 238)",
          3: "rgb(221, 221, 224)",
          4: "rgb(205, 205, 210)",
          5: "rgb(190, 190, 197)",
          6: "rgb(176, 176, 184)",
          7: "rgb(150, 150, 156)",
          8: "rgb(125, 125, 131)",
          9: "rgb(100, 100, 105)",
          10: "rgb(79, 79, 83)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
