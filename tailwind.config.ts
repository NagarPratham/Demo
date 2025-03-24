import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Add these new color definitions
        'white/90': 'rgba(255, 255, 255, 0.9)',
        'black/85': 'rgba(0, 0, 0, 0.85)'
      },
    },
  },
  plugins: [],
};
export default config;