import React, { createContext, useContext, useEffect, useState, useLayoutEffect } from 'react';
import { themes, DEFAULT_THEME, getThemeColors } from '../data/themes';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  // Initialize theme mode (light/dark) synchronously to prevent flash
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light';
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // Initialize current theme name
  const [currentTheme, setCurrentTheme] = useState(() => {
    if (typeof window === 'undefined') return DEFAULT_THEME;
    
    const savedCurrentTheme = localStorage.getItem('currentTheme');
    return savedCurrentTheme || DEFAULT_THEME;
  });

  // Apply CSS variables dynamically based on current theme and mode
  const applyThemeVariables = (themeName, mode) => {
    const root = document.documentElement;
    const themeColors = getThemeColors(themeName, mode);
    
    // Apply each CSS variable
    Object.entries(themeColors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
  };

  // Use useLayoutEffect for synchronous DOM updates before paint
  useLayoutEffect(() => {
    const root = document.documentElement;
    
    // Instantly apply theme without transitions during switch
    root.style.setProperty('--theme-transition', 'none');
    
    // Remove previous theme class and add new one atomically
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    
    // Apply theme variables for current theme and mode
    applyThemeVariables(currentTheme, theme);
    
    // Save to localStorage
    localStorage.setItem('theme', theme);
    localStorage.setItem('currentTheme', currentTheme);
    
    // Re-enable transitions after a frame
    requestAnimationFrame(() => {
      root.style.setProperty('--theme-transition', 'all 0.15s ease-in-out');
    });
  }, [theme, currentTheme]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const changeTheme = (themeName) => {
    if (themes[themeName]) {
      setCurrentTheme(themeName);
    }
  };

  const value = {
    theme,
    currentTheme,
    toggleTheme,
    setTheme,
    changeTheme,
    availableThemes: themes
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};