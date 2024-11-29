import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check system preference
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(isDarkMode);
    
    // Apply theme class to body
    document.body.classList.toggle('dark', isDarkMode);
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark');
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);