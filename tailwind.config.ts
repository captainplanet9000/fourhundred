import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gilded: {
          50: '#fdf7e8',
          100: '#f7e9c1',
          200: '#f1d58c',
          300: '#e8bd57',
          400: '#dca336',
          500: '#c7871e',
          600: '#a36a16',
          700: '#7d4f12',
          800: '#5f3f10',
          900: '#4d3410'
        }
      },
      backgroundImage: {
        'velvet': 'radial-gradient(1200px 600px at 10% 10%, rgba(212,175,55,0.18), rgba(0,0,0,0)), radial-gradient(1200px 600px at 90% 90%, rgba(212,175,55,0.10), rgba(0,0,0,0))',
      },
    },
  },
  plugins: [],
}
export default config
