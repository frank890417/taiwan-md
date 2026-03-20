/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#1A3C34',
          50: '#E8F0EE',
          100: '#D1E1DC',
          200: '#A3C3BA',
          300: '#759F93',
          400: '#3D6B5F',
          500: '#1A3C34',
          600: '#15312B',
          700: '#102621',
          800: '#0B1A17',
          900: '#060F0D',
        },
        teal: {
          DEFAULT: '#006D77',
          50: '#E6F5F7',
          100: '#CCEBEF',
          200: '#99D7DF',
          300: '#66C3CF',
          400: '#33AFBF',
          500: '#006D77',
          600: '#005A63',
          700: '#00474E',
          800: '#00343A',
          900: '#002126',
        },
        terracotta: {
          DEFAULT: '#C17D5E',
          50: '#F8F0EB',
          100: '#F1E1D8',
          200: '#E3C3B1',
          300: '#D5A58A',
          400: '#C17D5E',
          500: '#A8634A',
          600: '#864F3B',
          700: '#653B2C',
          800: '#43271D',
          900: '#22140F',
        },
        cream: {
          DEFAULT: '#F8F1E9',
          50: '#FFFEFA',
          100: '#FDF9F4',
          200: '#FAF4ED',
          300: '#F8F1E9',
          400: '#EADCC8',
          500: '#DCC7A8',
          600: '#C4A87F',
          700: '#A98A5A',
          800: '#7E6743',
          900: '#53442D',
        },
      },
      fontFamily: {
        sans: ['Satoshi', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Noto Serif TC"', 'Georgia', 'serif'],
      },
      lineHeight: {
        'heading': '1.2',
        'body-en': '1.7',
        'body-zh': '1.85',
      },
      spacing: {
        '18': '4.5rem',
      },
      maxWidth: {
        prose: '72ch',
        container: '1200px',
        wide: '1400px',
      },
      boxShadow: {
        'card': '0 4px 24px rgba(26, 60, 52, 0.06)',
        'card-hover': '0 12px 40px rgba(26, 60, 52, 0.12)',
        'glow': '0 0 20px rgba(0, 109, 119, 0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'slide-in': 'slideIn 0.3s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-10px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};
