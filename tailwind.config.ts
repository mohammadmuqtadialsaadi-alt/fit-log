import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: { lime: '#ccff00' },
      fontFamily: { display: ['Arial Narrow', 'Impact', 'sans-serif'] }
    }
  },
  plugins: []
};
export default config;
