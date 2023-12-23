/** @type {import('tailwindcss').Config} */
module.exports = {
  //content: ["./src/**/*.{html,js}"],
  content: [
    './pages/**/*.jsx',
    './pages/**/*.js',
    './src/**/*.jsx',
    './src/**/*.js',
    './components/**/*.jsx',
    './components/**/*.js',
    './public/**/*.html',
  ],
  
  plugins: [require("daisyui","@tailwindcss/forms")],

  daisyui: {
    styled: true,
    themes: ["light"],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "light",
  },
}
