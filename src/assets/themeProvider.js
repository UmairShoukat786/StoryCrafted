/* eslint-disable prettier/prettier */
import React, { createContext, useContext, useState } from 'react';

// Create a context for the theme
const ThemeContext = createContext();

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Define the theme styles
  const theme = isDarkMode
    ? {
        backgroundColor: '#333', // Dark background color
        textColor: '#fff',       // Text color for dark theme
      }
    : {
        backgroundColor: '#fff', // Light background color
        textColor: '#333',       // Text color for light theme
      };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};
