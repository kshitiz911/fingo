/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Fingo Design Tokens
        primary: {
          DEFAULT: "#0B6E6E",
          light: "#0E9090",
          dark: "#084F4F",
        },
        navy: {
          DEFAULT: "#0D2B45",
          light: "#1A3D5C",
          dark: "#071C2E",
        },
        positive: "#16A34A",
        negative: "#DC2626",
        warning:  "#D97706",
        surface:  "#EEF0F4",
        card:     "#FFFFFF",
        border:   "#E2E8F0",
        muted:    "#64748B",
        subtle:   "#94A3B8",
      },
      fontFamily: {
        sans:    ["'Inter'", "sans-serif"],
        display: ["'Denton'", "sans-serif"],
      },
      fontSize: {
        // Fingo type scale
        "kpi-value": ["1.5rem",   { lineHeight: "1.2", fontWeight: "700" }], // 24px bold
        "kpi-label": ["0.8125rem",{ lineHeight: "1.4", fontWeight: "500" }], // 13px medium
        "kpi-sub":   ["0.75rem",  { lineHeight: "1.4", fontWeight: "400" }], // 12px regular
        "delta":     ["0.75rem",  { lineHeight: "1",   fontWeight: "600" }], // 12px semibold
        "section":   ["1rem",     { lineHeight: "1.4", fontWeight: "600" }], // 16px semibold
        "page-title":["1.25rem",  { lineHeight: "1.3", fontWeight: "700" }], // 20px bold
      },
      borderRadius: {
        card: "16px",
        pill: "999px",
        icon: "10px", // icon container rounding
      },
      boxShadow: {
        card:       "0 0px 0px rgba(0,0,0,0.06), 0 0px 0px rgba(0,0,0,0.04)",
        "card-hover":"0 4px 16px rgba(0,0,0,0.10)",
      },
      spacing: {
        "sidebar": "220px",
        "topbar":  "64px",
      },
    },
  },
  plugins: [],
};
