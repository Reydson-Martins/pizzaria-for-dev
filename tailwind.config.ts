import type { Config } from 'tailwindcss'

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {

      'white': '#ffffff',
      'background': '#121214',
      'transparent':'transparent',
      'input': '#202024',
      'subtitle': '#7c7c8a',
      'title': '#e1e1e6',
      'ciano-200':'#68b7cf',
      'ciano-500':'#41a4c3',
      'ciano-700':'#32859f',
      'green-900':'#3fffa3',
      'red-900':'#ff3f4b'
      },

      screens: {
        'sm': {'min': '300px', 'max': '576px'},
        // => @media (min-width: 576px) { ... }
  
        'md': {'min': '577px', 'max': '1023px'},
        // => @media (min-width: 960px) { ... }
  
        'lg': {'min': '1024px', 'max': '1279px'},
        // => @media (min-width: 1440px) { ... }
      },
  
    
    extend: {
      fontSize: {
        sm: '0.8rem',
        base: '1rem',
        xl: '1.625rem',
      },
    },
  },
  plugins: [],
} satisfies Config

