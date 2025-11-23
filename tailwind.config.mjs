/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: 'var(--color-navy)',
          navyDark: 'var(--color-navy-dark)',
          orange: 'var(--color-orange)',
          orangeDark: 'var(--color-orange-dark)',
          slate: 'var(--color-slate)',
          light: 'var(--color-light)',
          border: 'var(--color-border)',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        display: ['var(--font-display)'],
      },
      fontSize: {
        'h1': 'var(--font-size-h1)',
        'h2': 'var(--font-size-h2)',
        'h3': 'var(--font-size-h3)',
        'h4': 'var(--font-size-h4)',
        'h5': 'var(--font-size-h5)',
        'h6': 'var(--font-size-h6)',
        'body': 'var(--font-size-body)',
        'small': 'var(--font-size-small)',
      },
      spacing: {
        'xs': 'var(--spacing-xs)',
        'sm': 'var(--spacing-sm)',
        'md': 'var(--spacing-md)',
        'lg': 'var(--spacing-lg)',
        'xl': 'var(--spacing-xl)',
        '2xl': 'var(--spacing-2xl)',
        '3xl': 'var(--spacing-3xl)',
      },
      borderRadius: {
        'sm': 'var(--radius-sm)',
        'md': 'var(--radius-md)',
        'lg': 'var(--radius-lg)',
        'xl': 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
      },
      boxShadow: {
        'sm': 'var(--shadow-sm)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
        'xl': 'var(--shadow-xl)',
        '2xl': 'var(--shadow-2xl)',
      },
    },
  },
  plugins: [],
};
