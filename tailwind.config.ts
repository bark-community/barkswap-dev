module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        foreground: 'rgb(var(--foreground-rgb))',
        backgroundStart: 'rgb(var(--background-start-rgb))',
        backgroundEnd: 'rgb(var(--background-end-rgb))',
      },
    },
  },
  plugins: [],
};
