/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        xs: "475px",
      },
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui"],
        serif: ["ui-serif", "Georgia"],
        mono: ["ui-monospace", "SFMono-Regular"],
        display: ["Oswald"],
        body: ['"Open Sans"'],
        yesteryear: ["Yesteryear", "cursive"],
      },
      fontSize: {
        sm: ["14px", "20px"],
        base: ["16px", "24px"],
        lg: ["20px", "28px"],
        xl: ["24px", "32px"],
      },
      textColor: {},
      colors: {
        foreground: "rgb(20, 90, 90)",
        backgroundStart: "rgb(245, 245, 245)",
        backgroundEnd: "rgb(245, 245, 245)",
        pinkRed: "#FF5C83",
        yellowOrange: "#E6A676",
        forestGreen: "#9CCFCE",
        clearGreen: "#1A946F",
        offGreen: "#5DB075",
        relaxGreen: "#4B9460",
        offWhite: "#F3F3F3",
        offBlue: "#007AFF",
        relaxBlack: "#2C2C2C",
        offBlack: "#1D1D1F",
        pendingYellow: "#DCB900",
        successGreen: "#0F7B13",
        cancelRed: "#CA0404",
      },
      steps: {
        color: "#007AFF",
      },
      button: {
        fGreen: "#9CCFCE",
      },
      backgroundImage: {
        customGradient:
          "linear-gradient(rgb(20, 90, 90), rgb(245, 245, 245), rgb(245, 245, 245))",
      },
    },
  },
  variants: {
    extend: {
      textTransform: ["hover", "focus"],
    },
  },
  plugins: [require("daisyui")],
};
