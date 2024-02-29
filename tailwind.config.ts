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

const blue = [
  {
    hex: "#e9f0ff",
    rgb: "rgb(233, 240, 255)",
    token: "blue-1",
  },
  {
    hex: "#c9dbff",
    rgb: "rgb(201, 219, 255)",
    token: "blue-2",
  },
  {
    hex: "#9ebfff",
    rgb: "rgb(158, 191, 255)",
    token: "blue-3",
  },
  {
    hex: "#71a1ff",
    rgb: "rgb(113, 161, 255)",
    token: "blue-4",
  },
  {
    hex: "#4784ff",
    rgb: "rgb(71, 132, 255)",
    token: "blue-5",
  },
  {
    hex: "#1e69ff",
    rgb: "rgb(30, 105, 255)",
    token: "blue-6",
  },
  {
    hex: "#1a59d9",
    rgb: "rgb(26, 89, 217)",
    token: "blue-7",
  },
  {
    hex: "#154bb5",
    rgb: "rgb(21, 75, 181)",
    token: "blue-8",
  },
  {
    hex: "#113c91",
    rgb: "rgb(17, 60, 145)",
    token: "blue-9",
  },
  {
    hex: "#0d2f73",
    rgb: "rgb(13, 47, 115)",
    token: "blue-10",
  },
];
const black = [
  {
    hex: "#e9e9ea",
    rgb: "rgb(233, 233, 234)",
    token: "black-1",
  },
  {
    hex: "#cacbcc",
    rgb: "rgb(202, 203, 204)",
    token: "black-2",
  },
  {
    hex: "#a1a1a3",
    rgb: "rgb(161, 161, 163)",
    token: "black-3",
  },
  {
    hex: "#757678",
    rgb: "rgb(117, 118, 120)",
    token: "black-4",
  },
  {
    hex: "#4b4c50",
    rgb: "rgb(75, 76, 80)",
    token: "black-5",
  },
  {
    hex: "#242529",
    rgb: "rgb(36, 37, 41)",
    token: "black-6",
  },
  {
    hex: "#1f1f23",
    rgb: "rgb(31, 31, 35)",
    token: "black-7",
  },
  {
    hex: "#1a1a1d",
    rgb: "rgb(26, 26, 29)",
    token: "black-8",
  },
  {
    hex: "#151517",
    rgb: "rgb(21, 21, 23)",
    token: "black-9",
  },
  {
    hex: "#101112",
    rgb: "rgb(16, 17, 18)",
    token: "black-10",
  },
];
const grey = [
  {
    hex: "#f7f7f8",
    rgb: "rgb(247, 247, 248)",
    token: "grey-1",
  },
  {
    hex: "#ececee",
    rgb: "rgb(236, 236, 238)",
    token: "grey-2",
  },
  {
    hex: "#dddde0",
    rgb: "rgb(221, 221, 224)",
    token: "grey-3",
  },
  {
    hex: "#cdcdd2",
    rgb: "rgb(205, 205, 210)",
    token: "grey-4",
  },
  {
    hex: "#bebec5",
    rgb: "rgb(190, 190, 197)",
    token: "grey-5",
  },
  {
    hex: "#b0b0b8",
    rgb: "rgb(176, 176, 184)",
    token: "grey-6",
  },
  {
    hex: "#96969c",
    rgb: "rgb(150, 150, 156)",
    token: "grey-7",
  },
  {
    hex: "#7d7d83",
    rgb: "rgb(125, 125, 131)",
    token: "grey-8",
  },
  {
    hex: "#646469",
    rgb: "rgb(100, 100, 105)",
    token: "grey-9",
  },
  {
    hex: "#4f4f53",
    rgb: "rgb(79, 79, 83)",
    token: "grey-10",
  },
];

export default config;
