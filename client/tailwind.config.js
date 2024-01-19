/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    fontFamily: {
      sans: ["CircularStd", "sans-serif", "serif"],
    },
    extend: {
      minWidth: {
        44: "44px",
        14: "14px",
        200: "200px",
        240: "240px",
        320: "320px",
        640: "640px",
        1280: "1280px",
      },
      minHeight: {
        44: "44px",
        14: "14px",
        400: "400px",
        200: "200px",

        640: "640px",
      },
      maxHeight: {
        200: "200px",
        400: "400px",
        420: "420px",

        640: "640px",
      },

      width: {
        640: "640px",
        300: "300px",
        1280: "1280px",
        240: "240px",
        320: "320px",
      },
      height: {
        200: "200px",
        240: "240px",
        320: "320px",
        360: "360px",
        420: "420px",
        460: "460px",
        500: "500px",
      },
      margin: {
        560: "560px",
        580: "580px",
        640: "640px",
        720: "720px",
      },
    },
  },
  plugins: [],
};
