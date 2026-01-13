/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // Primary Brand Colors
        primary: '#ec3713',        // Primary brand color (Home Discovery)
        'primary-alt': '#FF385C',  // Alternate primary (Restaurant Menu)

        // Accent Color
        accent: '#FACC15',         // Ratings, badges, CTAs

        // Dark Theme Backgrounds
        'background-dark': '#221310',    // Global app background
        'surface-dark': '#1A1A1A',       // Cards, panels, containers
        'card-dark': '#161616',
        'border-dark': '#262626',

        // Light Theme (legacy support)
        'background-light': '#f8f6f6',

        // Text Color Hierarchy
        'text-primary': '#FFFFFF',       // Primary headings
        'text-body': '#E5E7EB',          // Body text
        'text-secondary': '#94A3B8',     // Secondary text
        'text-muted': '#64748B',         // Muted labels
        'text-placeholder': '#6B7280',   // Placeholder text

        // Semantic Colors
        'veg': '#22C55E',          // Vegetarian indicator
        'non-veg': '#EF4444',      // Non-vegetarian indicator
      },
      fontFamily: {
        sans: ['System'],
        serif: ['System'],
        display: ['Plus Jakarta Sans'],
      },
      backdropBlur: {
        xs: '2px',
      },
      borderRadius: {
        none: 0,
        sm: 8,
        DEFAULT: 16,
        md: 20,
        lg: 32,
        xl: 48,
        '2xl': 60,
        '3xl': 75,
        full: 9999,
      },
    },
  },
  plugins: [],
}
