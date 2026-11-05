/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        champagne: '#FBF7F0',
        sand: '#F4EBDC',
        gold: { DEFAULT: '#C2955A', light: '#E0B878', deep: '#A07840' },
        espresso: '#2B2520',
        taupe: '#8A7F72',
        hairline: '#E9E0D2',
        // Dark theme surfaces (home page)
        ink: { DEFAULT: '#161618', soft: '#1D1D20', card: '#242428', line: '#2F2F34' },
      },
      fontFamily: {
        logo: ['var(--font-logo)', 'Georgia', 'serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: { luxe: '0.12em', label: '0.25em', wide3: '0.3em' },
      maxWidth: { content: '1280px', prose: '560px' },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg,#E0B878 0%,#C2955A 50%,#A07840 100%)',
        'gold-gradient-deep': 'linear-gradient(135deg,#C2955A 0%,#A07840 60%,#8A6534 100%)',
      },
      boxShadow: {
        soft: '0 10px 30px rgba(160,120,64,0.08)',
        lift: '0 24px 60px -28px rgba(43,37,32,0.35)',
      },
      keyframes: {
        // One pulse at the start of each 6s cycle.
        'gold-pulse': {
          '0%': { boxShadow: '0 0 0 0 rgba(194,149,90,0.55)' },
          '25%, 100%': { boxShadow: '0 0 0 18px rgba(194,149,90,0)' },
        },
        'scrollcue-x': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        },
        ring: {
          '0%, 100%': { transform: 'rotate(0deg) scale(1)' },
          '15%': { transform: 'rotate(-14deg) scale(1.12)' },
          '30%': { transform: 'rotate(12deg) scale(1.12)' },
          '45%': { transform: 'rotate(-8deg) scale(1.08)' },
          '60%': { transform: 'rotate(5deg) scale(1.04)' },
          '75%': { transform: 'rotate(-2deg)' },
        },
        'cookie-in': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        settle: {
          '0%': { transform: 'scale(1.08)' },
          '100%': { transform: 'scale(1)' },
        },
        scrollcue: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(200%)' },
        },
      },
      animation: {
        'gold-pulse': 'gold-pulse 6s ease-out 3',
        ring: 'ring 0.8s ease-in-out',
      },
    },
  },
  plugins: [],
};
