/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(90deg, #FFDEE9 0%, #B5FFFC 25%, #C8FFCA 50%, #FFD5FF 75%, #C5A3FF 100%)",
      },
    },
  },
  plugins: [],
};
