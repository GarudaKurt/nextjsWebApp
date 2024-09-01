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
      fontFamily: {
        'sans': ['Poppins', 'ui-sans-serif', 'system-ui'],
        'serif': ['ui-serif', 'Georgia'],
        'mono': ['ui-monospace', 'SFMono-Regular'],
        'display': ['Oswald'],
        'body': ['"Open Sans"'],
      },
      fontSize: {
        sm: ['14px', '20px'],
        base: ['16px', '24px'],
        lg: ['20px', '28px'],
        xl: ['24px', '32px'],
      },
      textColor: {
      },
      colors: {
        foreground: 'rgb(20, 90, 90)',
        backgroundStart: 'rgb(245, 245, 245)',
        backgroundEnd: 'rgb(245, 245, 245)',
        pinkRed: "#FF5C83",
        yellowOrange: "#E6A676",
        forestGreen: "#9CCFCE",
        clearGreen: "#1A946F",
        offWhite: "#F3F3F3",
        darkBlack: "#2C2C2C",
        offBlue: "#007AFF",
      },
      backgroundImage:{
        'customGradient': 'linear-gradient(rgb(20, 90, 90), rgb(245, 245, 245), rgb(245, 245, 245))',
      },
    },
  },
  variants: {
    extend: {
      textTransform: ['hover', 'focus'],
    },
  },
  plugins: [require('daisyui')],
};
