import { useState } from 'react';

// Custom hook to easily switch between true and false
// Returns the current boolean value and a toggle function
export function useToggle(initialValue = false) {
  // Store the boolean value in state
  const [value, setValue] = useState(initialValue);

  // Toggle function flips true to false, or false to true
  // Can also accept an explicit true/false value if passed
  const toggle = (newValue) => {
    if (typeof newValue === 'boolean') {
      setValue(newValue);
    } else {
      setValue((prevValue) => !prevValue);
    }
  };

  return [value, toggle];
}

export default useToggle;
