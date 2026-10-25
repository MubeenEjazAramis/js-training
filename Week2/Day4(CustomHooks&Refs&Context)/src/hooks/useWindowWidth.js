import { useState, useEffect } from 'react';

// Custom hook to track the current browser window width
// Updates whenever the user resizes the window
// Cleans up the event listener when unmounting to avoid memory leaks
export function useWindowWidth() {
  // Store the initial window width
  const [width, setWidth] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth;
    }
    return 1024;
  });

  useEffect(() => {
    // Function to run on every window resize
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    // Attach resize listener to the window
    window.addEventListener('resize', handleResize);

    // Cleanup: Remove listener when component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty array means this effect only sets up once on mount

  return width;
}

export default useWindowWidth;
