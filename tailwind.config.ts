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
    hex: "#e7e7e9",
    rgb: "rgb(231, 231, 233)",
    token: "black-1",
  },
  {
    hex: "#c5c6c9",
    rgb: "rgb(197, 198, 201)",
    token: "black-2",
  },
  {
    hex: "#97999e",
    rgb: "rgb(151, 153, 158)",
    token: "black-3",
  },
  {
    hex: "#666971",
    rgb: "rgb(102, 105, 113)",
    token: "black-4",
  },
  {
    hex: "#383c47",
    rgb: "rgb(56, 60, 71)",
    token: "black-5",
  },
  {
    hex: "#0c111e",
    rgb: "rgb(12, 17, 30)",
    token: "black-6",
  },
  {
    hex: "#0a0e1a",
    rgb: "rgb(10, 14, 26)",
    token: "black-7",
  },
  {
    hex: "#090c15",
    rgb: "rgb(9, 12, 21)",
    token: "black-8",
  },
  {
    hex: "#070a11",
    rgb: "rgb(7, 10, 17)",
    token: "black-9",
  },
  {
    hex: "#05080d",
    rgb: "rgb(5, 8, 13)",
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
const electricBlue = [
  {
    hex: "#e8f0fc",
    rgb: "rgb(232, 240, 252)",
    token: "blue-1",
  },
  {
    hex: "#c9daf8",
    rgb: "rgb(201, 218, 248)",
    token: "blue-2",
  },
  {
    hex: "#9dbdf2",
    rgb: "rgb(157, 189, 242)",
    token: "blue-3",
  },
  {
    hex: "#709fec",
    rgb: "rgb(112, 159, 236)",
    token: "blue-4",
  },
  {
    hex: "#4582e6",
    rgb: "rgb(69, 130, 230)",
    token: "blue-5",
  },
  {
    hex: "#1c66e1",
    rgb: "rgb(28, 102, 225)",
    token: "blue-6",
  },
  {
    hex: "#1857bf",
    rgb: "rgb(24, 87, 191)",
    token: "blue-7",
  },
  {
    hex: "#1448a0",
    rgb: "rgb(20, 72, 160)",
    token: "blue-8",
  },
  {
    hex: "#103a80",
    rgb: "rgb(16, 58, 128)",
    token: "blue-9",
  },
  {
    hex: "#0d2e65",
    rgb: "rgb(13, 46, 101)",
    token: "blue-10",
  },
];

export default config;
