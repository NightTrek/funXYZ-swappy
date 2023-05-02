/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
    '.src/templates/*.tsx',
  ],
  theme: {
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '14px',
      lg: '16px',
      xl: '18px',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.0rem',
      '5xl': '3rem',
      '6xl': '4rem',
    },
    extend: {
      backgroundImage: {
        'rocket-icon': "url('/rocketship.png')",
      },
      colors: {
        gray: {
          100: '#f7fafc',
          200: '#edf2f7',
          300: '#e2e8f0',
          400: '#cbd5e0',
          500: '#a0aec0',
          600: '#718096',
          700: '#4a5568',
          800: '#2d3748',
          900: '#1a202c',
        },
        blue: {
          100: '#ebf8ff',
          200: '#bee3f8',
          300: '#90cdf4',
          400: '#63b3ed',
          500: '#4299e1',
          600: '#3182ce',
          700: '#2b6cb0',
          800: '#2c5282',
          900: '#2a4365',
        },
        fun: {
          100: '#E4E7EC',
          200: '#2B2F43',
          300: '#F7C478',
        },
        funGrey: {
          100: '#F2F2F2',
          200: '#74777C',
        },
        funAlert: {
          100: '#238044',
          200: '#CE3838',
        },
        funButton: {
          100: '#E4E7EC',
          200: '#91949e',
          300: '#43588E',
          400: '#2B2F43',
        },
      },
    },
  },
  plugins: [],
};
