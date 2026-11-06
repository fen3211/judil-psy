/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: "#FBFBFA",
        paper: "#FFFFFF",
        linen: "#F5F5F2",
        ink: "#111111",
        graphite: "#222222",
        charcoal: "#3D3D3D",
        ash: "#6E6E6A",
        mist: "#E5E5E0",
        fog: "#CCCCCC",
        sage: {
          50: "#F4F6F4",
          100: "#E6EBE6",
          200: "#CDD7CE",
          500: "#5A6D5B",
          600: "#4A5D4C",
          700: "#3D4F3E",
        },
        terracotta: {
          50: "#FAF5F3",
          100: "#F4EAE6",
          200: "#E8D5CE",
          500: "#B8583E",
          600: "#A04A33",
          700: "#883D28",
        },
      },
      fontFamily: {
        serif: ["'Cormorant Garamond'", "Georgia", "serif"],
        sans: ["'Manrope'", "'Inter'", "-apple-system", "sans-serif"],
        mono: ["'JetBrains Mono'", "'Space Mono'", "ui-monospace", "monospace"],
      },
      boxShadow: {
        subtle: "0 1px 3px 0 rgba(0, 0, 0, 0.04)",
        card: "0 2px 8px -2px rgba(0, 0, 0, 0.06)",
        elevated: "0 12px 32px -8px rgba(0, 0, 0, 0.08)",
      },
      borderRadius: {
        'editorial': '2px',
        'subtle': '6px',
        'card': '12px',
        'pill': '9999px',
      },
      letterSpacing: {
        'tightest': '-0.04em',
        'tighter': '-0.02em',
        'widest': '0.12em',
      }
    },
  },
  plugins: [],
}
