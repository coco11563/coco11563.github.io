/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // 单一强调色：青色（teal），呼应 AI x 生命科学的主题
        accent: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        // 暖灰中性色（stone），配合纸感底色
        paper: {
          light: '#faf9f7',
          dark: '#0f0e0d',
        },
      },
      fontFamily: {
        sans: ['Inter Variable', 'Noto Sans SC', 'system-ui', 'sans-serif'],
        serif: ['Newsreader Variable', 'Noto Serif SC', 'Georgia', 'serif'],
      },
      maxWidth: {
        page: '72rem',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
