import { createContext, useContext, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

// 1. Create the Context object
export const ThemeContext = createContext(null);

// 2. Provider component that wraps the app and holds theme state
export function ThemeProvider({ children }) {
  // Use our custom useLocalStorage hook so theme choice is remembered across reloads
  const [theme, setTheme] = useLocalStorage('recipe_app_theme', 'light');

  // Apply data-theme attribute on <html> element whenever theme changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Function to switch between 'light' and 'dark'
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const value = {
    theme,
    toggleTheme,
    isDark: theme === 'dark',
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Custom hook for simple consumption in components without importing useContext and ThemeContext everywhere
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export default ThemeContext;
