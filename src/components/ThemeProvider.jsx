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
      // Apply immediately to prevent flash
      document.documentElement.classList.add(savedTheme);
      return savedTheme;
    }
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    document.documentElement.classList.add(systemTheme);
    return systemTheme;
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

    // Set data-theme attribute for scoped styling
    root.setAttribute('data-theme', themeName);
  };

  // Use useLayoutEffect for synchronous DOM updates before paint
  useLayoutEffect(() => {
    const root = document.documentElement;

    // Check if View Transitions API is supported
    if (typeof document.startViewTransition === 'function') {
      // Add active class to disable other transitions
      root.classList.add('view-transition-active');

      // Use View Transitions API for smooth circular animation
      const transition = document.startViewTransition(() => {
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
        applyThemeVariables(currentTheme, theme);
      });

      // Remove active class after transition
      transition.finished.finally(() => {
        root.classList.remove('view-transition-active');
      });
    } else {
      // Fallback: instant change
      root.classList.remove('light', 'dark');
      root.classList.add(theme);
      applyThemeVariables(currentTheme, theme);
    }

    // Save to localStorage
    localStorage.setItem('theme', theme);
    localStorage.setItem('currentTheme', currentTheme);
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

  const toggleTheme = (event) => {
    // Store click position for animation
    if (event?.clientX && event?.clientY) {
      const x = event.clientX;
      const y = event.clientY;
      document.documentElement.style.setProperty('--x', `${x}px`);
      document.documentElement.style.setProperty('--y', `${y}px`);
    } else {
      // Default to center if no click event
      document.documentElement.style.setProperty('--x', '50%');
      document.documentElement.style.setProperty('--y', '50%');
    }

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