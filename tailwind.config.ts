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
        customGreen: '#a8b49e', // You can name it anything, like 'customGreen'
        bggreen:'#d9ded4',
        cafnoir: '#48290Fff',
        black: '#000000ff',
        black2: '#000000ff',
        persianorange: '#E7975Eff',
        tangerine: '#EA8A23ff',

      },
    },
  },
  plugins: [],
};
export default config;


