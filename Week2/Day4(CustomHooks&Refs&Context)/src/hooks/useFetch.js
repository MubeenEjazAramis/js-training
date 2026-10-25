import { useState, useEffect, useCallback } from 'react';

// Custom hook to fetch data from any URL
// Returns { data, loading, error, refetch }
// Handles loading states, network errors, cleanup, and cancellation
export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(Boolean(url));
  const [error, setError] = useState(null);
  // Counter state to trigger a manual reload when refetch() is called
  const [reloadTrigger, setReloadTrigger] = useState(0);

  // Manual refetch function that components can call (e.g., Retry button)
  const refetch = useCallback(() => {
    setReloadTrigger((prev) => prev + 1);
  }, []);

  useEffect(() => {
    // If no URL is provided, do not attempt to fetch
    if (!url) {
      setData(null);
      setLoading(false);
      setError(null);
      return;
    }

    // Flag to ignore stale responses if the component unmounts or URL changes
    let isCancelled = false;
    const controller = new AbortController();

    async function loadData() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url, { signal: controller.signal });

        if (!response.ok) {
          throw new Error(`Failed to fetch data (Status: ${response.status})`);
        }

        const result = await response.json();

        // Only update state if this effect is still the active one
        if (!isCancelled) {
          setData(result);
          setLoading(false);
        }
      } catch (err) {
        // If aborted by cleanup, don't treat it as an error
        if (err.name === 'AbortError') {
          return;
        }

        if (!isCancelled) {
          setError(err.message || 'Something went wrong while fetching data.');
          setLoading(false);
        }
      }
    }

    loadData();

    // Cleanup: cancel pending request and ignore response
    return () => {
      isCancelled = true;
      controller.abort();
    };
  }, [url, reloadTrigger]);

  return { data, loading, error, refetch };
}

export default useFetch;
