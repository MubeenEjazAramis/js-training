import { useState } from 'react';

// Custom hook that syncs state with browser localStorage
// It works just like useState, but saves the data on refresh
// Handles invalid JSON gracefully so the app does not crash
export function useLocalStorage(key, initialValue) {
  // Step 1: Read initial value from localStorage or fallback to initialValue
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      // If item exists in storage, parse it as JSON
      if (item !== null) {
        return JSON.parse(item);
      }
    } catch (error) {
      // If JSON is invalid or corrupted, show warning and return initialValue
      console.warn(`Error reading localStorage key "${key}":`, error);
    }
    // Return initialValue if nothing was stored or if parsing failed
    return initialValue;
  });

  // Step 2: Update state and save the new value to localStorage
  const setValue = (value) => {
    try {
      // Allow value to be a function (same as useState updater: prev => next)
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      // Update React state
      setStoredValue(valueToStore);

      // Save to localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn(`Error saving to localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;
