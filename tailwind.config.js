/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Mariplex Design System - Cyan + Slate
        primary: {
          DEFAULT: '#0891B2',
          dark: '#0E7490',
          light: '#22D3EE',
          container: '#CCFBF1',
          'container-dark': '#164E63',
        },
        secondary: {
          DEFAULT: '#475569',
          light: '#94A3B8',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          variant: '#F1F5F9',
          dark: '#1E293B',
          'dark-variant': '#334155',
        },
        background: {
          light: '#F8FAFC',
          dark: '#0F172A',
        },
        // Status colors
        success: {
          DEFAULT: '#10B981',
          light: '#34D399',
        },
        danger: {
          DEFAULT: '#F43F5E',
          light: '#FB7185',
        },
        warning: {
          DEFAULT: '#F59E0B',
          light: '#FBBF24',
        },
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
      },
    },
  },
  plugins: [],
}
