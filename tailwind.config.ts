import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core brand
        navy: "#001E3C",
        brand: {
          DEFAULT: "#0096FF",
          hover: "#007FDB",
        },
        // Neutrals
        canvas: "#F3F6FA",
        line: "#E1E7EE",
        muted: "#5B6B7D",
        // Status colours + pale tints
        status: {
          green: "#1F8A5F",
          "green-bg": "#E6F4EC",
          amber: "#B87A16",
          "amber-bg": "#FBF1DE",
          slate: "#5B6B7D",
          "slate-bg": "#EDF1F5",
          red: "#C4433C",
          "red-bg": "#F9E7E6",
          blue: "#0096FF",
          "blue-bg": "#E4F2FF",
        },
      },
      fontFamily: {
        heading: ["var(--font-inter)", "Inter", "-apple-system", "Segoe UI", "sans-serif"],
        sans: ["var(--font-figtree)", "Figtree", "-apple-system", "Segoe UI", "sans-serif"],
      },
      borderRadius: {
        card: "12px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(0, 30, 60, 0.04), 0 1px 3px rgba(0, 30, 60, 0.06)",
        raised: "0 4px 16px rgba(0, 30, 60, 0.10)",
      },
    },
  },
  plugins: [],
};

export default config;
