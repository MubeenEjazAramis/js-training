import { useState, useEffect } from 'react';

// Custom hook to delay updating a value until after a specified pause
// Used for search inputs so we do not call the API on every single keystroke
export function useDebounce(value, delay = 500) {
  // State to hold the delayed value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set up a timer to update debouncedValue after the delay
    const timerId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup: cancel the timer if value or delay changes before the timer finishes
    // This happens every time the user keeps typing!
    return () => {
      clearTimeout(timerId);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
