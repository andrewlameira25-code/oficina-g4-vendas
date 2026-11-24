/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        g4: {
          orange: "#FF6B00",
          orangeHover: "#E55F00",
          dark: "#09090B",
          surface: "#121216",
          card: "#18181D",
        },
      },
      fontFamily: {
        display: ["Oswald", "Impact", "sans-serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
