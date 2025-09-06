/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        sidebarTop:  "#3b3bb1",
        sidebarBot:  "#7b2ea6",
        brandBlue:   "#2563eb",
        brandText:   "#0f172a",
      },
      boxShadow: { card: "0 8px 30px rgba(0,0,0,.08)" }
    },
  },
  plugins: [],
}
