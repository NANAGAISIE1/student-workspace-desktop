/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
        heading: ["var(--font-geist)"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: {
          DEFAULT: "hsl(var(--background))",
          light: "hsl(var(--background-light))",
          lighter: "hsl(var(--background-lighter))",
          dark: "hsl(var(--background-dark))",
          darker: "hsl(var(--background-darker))",
        },
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // New color categories
        danger: {
          DEFAULT: "hsl(var(--danger))",
          foreground: "hsl(var(--danger-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        vibrant: {
          blue: "hsl(var(--vibrant-blue))",
          purple: "hsl(var(--vibrant-purple))",
          pink: "hsl(var(--vibrant-pink))",
          red: "hsl(var(--vibrant-red))",
          orange: "hsl(var(--vibrant-orange))",
          yellow: "hsl(var(--vibrant-yellow))",
          green: "hsl(var(--vibrant-green))",
          teal: "hsl(var(--vibrant-teal))",
        },

        // Pastel colors
        pastel: {
          blue: "hsl(var(--pastel-blue))",
          purple: "hsl(var(--pastel-purple))",
          pink: "hsl(var(--pastel-pink))",
          red: "hsl(var(--pastel-red))",
          orange: "hsl(var(--pastel-orange))",
          yellow: "hsl(var(--pastel-yellow))",
          green: "hsl(var(--pastel-green))",
          teal: "hsl(var(--pastel-teal))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
