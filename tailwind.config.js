module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'insubria': {
          50: '#D9EAE7',
          200: '#99C6C0',
          300: '#4C9C90',
          600: '#007161',
          700: '#006052',
        },
        'neutral': {
          100: '#E5E7EB',
          500: '#64748B',
          900: '#0F172A',
        },
        'newspaper': {
          'yellow': '#FEEB99',
          'gold': '#FFD700',
          'blue': '#0056B3',
          'orange': '#FF4500',
          'red': '#FF0000',
          'light-blue': '#ADD8E6',
          'dark-green': '#006400',
        }
      },
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'newspaper': ['Georgia', 'serif'],
      },
      borderRadius: {
        '2xl': '1rem',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'newspaper': '0 4px 8px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
      },
      backgroundImage: {
        'newspaper-texture': 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23f3f4f6\' fill-opacity=\'0.1\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'1\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        'halftone': 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.15) 1px, transparent 0)',
      }
    },
  },
  plugins: [],
}
