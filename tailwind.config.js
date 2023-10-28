/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  daisyui: {
    themes: [
      "light",
      "dark",
      "cupcake",
      "winter",
      "retro",
      "aqua",
      "luxury",
      "coffee",
    ],
    // themes:false,
  },
  theme: {
    extend: {
      screens: {
        xsm: { max: "480px" },
        // @media (max-width:480px) {}
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        pattern: "url('/pattern.png')",
        "hero-bg": "url('/hero-bg.png')",
      },
      fontWeight: {
        "extra-bold": "800",
      },
      gridAutoRows: {
        "1fr": "minmax(250, 1fr)",
      },
    },
  },
  plugins: [require("daisyui")],
};
