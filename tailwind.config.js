/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  "#EFF6FF",
          100: "#DBEAFE",
          500: "#2563EB",
          600: "#1D4ED8",
          700: "#1E40AF",
          900: "#0F172A",
        },
        cyan: {
          brand: "#00D2FF",
          dark:  "#0099FF",
        },
        accent: {
          gold: "#FFB800",
          coral:"#FF5A5F",
        },
        dark: {
          900: "#0F172A",
          950: "#080D1A",
        }
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "'Inter'", "system-ui", "sans-serif"],
        heading: ["'Plus Jakarta Sans'", "sans-serif"],
      },
      boxShadow: {
        subtle: "0 2px 10px rgba(0,0,0,0.04)",
        glass:  "0 8px 32px 0 rgba(0, 0, 0, 0.12)",
        float:  "0 20px 40px -15px rgba(0, 102, 255, 0.25)",
        card:   "0 10px 30px -5px rgba(15, 23, 42, 0.08)",
      },
    },
  },
  plugins: [],
};
