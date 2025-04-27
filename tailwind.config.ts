/** @type {import('tailwindcss').Config} */
import flowbite from "flowbite/plugin";

module.exports = {
  darkMode: "media",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite-react/lib/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#7C3AED",
          50: "#F3EBFF",
          100: "#E9DEFF",
          200: "#D4BDFF",
          300: "#B794FF",
          400: "#9B6FFA",
          500: "#7C3AED",
          600: "#6D2AE8",
          700: "#5A1BC7",
          800: "#4C15A8",
          900: "#3B0F89",
        },
        secondary: {
          DEFAULT: "#FFB800",
          50: "#FFF9E6",
          100: "#FFF3CC",
          200: "#FFE799",
          300: "#FFDB66",
          400: "#FFC933",
          500: "#FFB800",
          600: "#E6A600",
          700: "#B38200",
          800: "#805D00",
          900: "#4D3800",
        },
      },
      container: {
        screens: {
          DEFAULT: "1500px",
        },
        center: true,
      },
      keyframes: {
        shimmer: {
          "100%": {
            transform: "translateX(100%)",
          },
        },
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
    },
  },
  plugins: [flowbite],
};
