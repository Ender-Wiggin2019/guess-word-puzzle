/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Noto Sans SC"', 'system-ui', 'sans-serif'],
        serif: ['"Noto Serif SC"', 'serif'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) + 2px)',
        sm: 'var(--radius)'
      },
      colors: {
        background: 'rgb(var(--background) / <alpha-value>)',
        foreground: 'rgb(var(--foreground) / <alpha-value>)',
        card: {
          DEFAULT: 'rgb(var(--card) / <alpha-value>)',
          foreground: 'rgb(var(--card-foreground) / <alpha-value>)'
        },
        popover: {
          DEFAULT: 'rgb(var(--popover) / <alpha-value>)',
          foreground: 'rgb(var(--popover-foreground) / <alpha-value>)'
        },
        primary: {
          DEFAULT: 'rgb(var(--primary) / <alpha-value>)',
          foreground: 'rgb(var(--primary-foreground) / <alpha-value>)'
        },
        secondary: {
          DEFAULT: 'rgb(var(--secondary) / <alpha-value>)',
          foreground: 'rgb(var(--secondary-foreground) / <alpha-value>)'
        },
        muted: {
          DEFAULT: 'rgb(var(--muted) / <alpha-value>)',
          foreground: 'rgb(var(--muted-foreground) / <alpha-value>)'
        },
        accent: {
          DEFAULT: 'rgb(var(--accent) / <alpha-value>)',
          foreground: 'rgb(var(--accent-foreground) / <alpha-value>)'
        },
        destructive: {
          DEFAULT: 'rgb(var(--destructive) / <alpha-value>)',
          foreground: 'rgb(var(--destructive-foreground) / <alpha-value>)'
        },
        border: 'rgb(var(--border) / <alpha-value>)',
        input: 'rgb(var(--input) / <alpha-value>)',
        ring: 'rgb(var(--ring) / <alpha-value>)',
        ink: {
          dark: 'rgb(var(--ink-dark) / <alpha-value>)',
          medium: 'rgb(var(--ink-medium) / <alpha-value>)',
          light: 'rgb(var(--ink-light) / <alpha-value>)',
        },
        paper: {
          DEFAULT: 'rgb(var(--paper) / <alpha-value>)',
          rice: 'rgb(var(--rice-white) / <alpha-value>)',
          ivory: 'rgb(var(--ivory) / <alpha-value>)',
        },
        success: 'rgb(var(--green) / <alpha-value>)',
        vermilion: 'rgb(var(--vermilion) / <alpha-value>)',
        indigo: 'rgb(var(--indigo) / <alpha-value>)',
        gold: 'rgb(var(--gold) / <alpha-value>)',
        cyan: {
          DEFAULT: 'rgb(var(--cyan) / <alpha-value>)',
          light: 'rgb(var(--cyan-light) / <alpha-value>)',
        },
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      transitionTimingFunction: {
        'brush': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    }
  },
  plugins: [require("tailwindcss-animate")],
}
