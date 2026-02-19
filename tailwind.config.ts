import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        raia: {
          red: '#C8102E',
          darkred: '#9B0B22',
          teal: '#00758D',
          light: '#F5F5F5',
        }
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui'],
      }
    },
  },
  plugins: [],
}
export default config
