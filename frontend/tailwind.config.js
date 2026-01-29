/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#f97316',
        'primary-dark': '#ea580c',
        dark: '#0f172a',
        'dark-light': '#1e293b',
      },
    },
  },
  plugins: [],
};
