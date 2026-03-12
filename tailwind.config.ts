import type { Config } from "tailwindcss";

/**
 * BLOOM Brand Theme
 *
 * All brand colors, fonts, and spacing tokens are centralized here.
 * To reskin the site, update these values — everything flows from this config.
 */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        /* Primary brand coral — drawn from the BLOOM logo mark */
        bloom: {
          50: "#FEF2EF",
          100: "#FDE1DA",
          200: "#FBC3B5",
          300: "#F49880",
          400: "#E8714F",
          500: "#D4573B", // primary
          600: "#B8432C",
          700: "#9A3524",
          800: "#7D2C20",
          900: "#68261E",
        },
        /* Dark maroon — used for headings and strong text */
        maroon: {
          50: "#F9F1F3",
          100: "#F0DDE2",
          200: "#E3BCC5",
          300: "#CF8F9F",
          400: "#B86478",
          500: "#9B4559",
          600: "#7E3347",
          700: "#6B2A3D", // primary dark
          800: "#572335",
          900: "#4A1F2F",
        },
      },
      fontFamily: {
        /* Swap these to change typography site-wide */
        sans: ['"Inter"', "system-ui", "-apple-system", "sans-serif"],
        display: ['"Inter"', "system-ui", "-apple-system", "sans-serif"],
      },
      maxWidth: {
        prose: "65ch",
      },
    },
  },
  plugins: [],
} satisfies Config;
