import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["forest",]
  },
  variants: {
    extend: {
      // 👇 Enable custom group variants
      textColor: ['group-hover'], // required
      dropShadow: ['group-hover'], // if you're using drop-shadow
    },
  },
}