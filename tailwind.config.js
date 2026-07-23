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
        ocean: {
          50:  "#e6f4fb",
          100: "#b3d9f4",
          200: "#80bfed",
          300: "#4da4e6",
          400: "#1a89df",
          500: "#0077B6",
          600: "#005f91",
          700: "#00476d",
          800: "#003048",
          900: "#001824",
          950: "#03045E",
        },
        teal: {
          DEFAULT: "#00B4D8",
          light: "#90E0EF",
          lighter: "#CAF0F8",
        },
        sand: {
          DEFAULT: "#F4A261",
          light: "#FFD9B3",
          dark: "#E08040",
        },
        coral: {
          DEFAULT: "#E76F51",
          dark: "#C95330",
        },
        pearl: "#F8F9FA",
        navy: "#03045E",
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "Manrope", "system-ui", "sans-serif"],
        display: ["var(--font-manrope)", "Manrope", "sans-serif"],
      },
      animation: {
        "wave": "wave 8s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
        "fade-up": "fadeUp 0.6s ease forwards",
      },
      keyframes: {
        wave: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      backgroundImage: {
        "ocean-gradient": "linear-gradient(135deg, #03045E 0%, #0077B6 50%, #00B4D8 100%)",
        "beach-gradient": "linear-gradient(180deg, #00B4D8 0%, #0077B6 40%, #03045E 100%)",
        "sunset-gradient": "linear-gradient(135deg, #E76F51 0%, #F4A261 50%, #FFD166 100%)",
        "glass": "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
      },
      boxShadow: {
        "ocean": "0 4px 30px rgba(0, 119, 182, 0.3)",
        "coral": "0 4px 30px rgba(231, 111, 81, 0.3)",
        "glass": "0 8px 32px rgba(0, 119, 182, 0.15)",
        "card": "0 20px 60px rgba(3, 4, 94, 0.12)",
      },
    },
  },
  plugins: [],
};
