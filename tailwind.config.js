module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#60A5FA', // blue-400
          dark: '#3B82F6',  // blue-500
        },
        background: {
          light: '#FFFFFF',
          dark: '#1F2937',  // gray-800
        },
        surface: {
          light: '#F3F4F6',  // gray-100
          dark: '#374151',   // gray-700
        },
        text: {
          light: '#1F2937',  // gray-800
          dark: '#F9FAFB',   // gray-50
        }
      }
    },
  },
  plugins: [],
};