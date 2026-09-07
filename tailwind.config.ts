import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F6F1E4",
        "paper-dark": "#EDE4D0",
        ink: "#20241F",
        clay: "#B4472B",
        "clay-dark": "#8F3620",
        sage: "#5F6B4F",
        graphite: "#6E6858",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-public-sans)", "sans-serif"],
      },
      maxWidth: {
        prose: "68ch",
      },
      backgroundImage: {
        grain: "url('/grain.svg')",
      },
    },
  },
  plugins: [],
};

export default config;
