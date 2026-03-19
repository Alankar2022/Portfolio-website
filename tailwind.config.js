/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './lib/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        night: '#06070f',
        slateGlow: '#0c1223',
        accent: '#8a7dff',
        cyan: '#59e3ff',
      },
      boxShadow: {
        glass: '0 20px 45px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.14)',
      },
      backgroundImage: {
        'hero-mesh':
          'radial-gradient(circle at 12% 12%, rgba(138,125,255,0.26), transparent 30%), radial-gradient(circle at 84% 8%, rgba(89,227,255,0.2), transparent 30%), linear-gradient(165deg, #06070f, #0b1222 50%, #060811)',
      },
    },
  },
  plugins: [],
}
