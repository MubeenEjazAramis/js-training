import { useState, useRef, useEffect } from 'react';

// Task 2: Stopwatch storing interval ID in a ref
export default function Task2Stopwatch() {
  const [centiseconds, setCentiseconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // We store the interval ID inside a ref instead of state.
  // Why? Updating intervalRef.current does NOT cause a re-render!
  const timerRef = useRef(null);

  // Start the timer
  const handleStart = () => {
    if (isRunning) return; // Already running

    setIsRunning(true);
    timerRef.current = setInterval(() => {
      setCentiseconds((prev) => prev + 1);
    }, 10); // Update every 10ms for stopwatch feel
  };

  // Stop/Pause the timer
  const handleStop = () => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsRunning(false);
  };

  // Reset the timer back to zero
  const handleReset = () => {
    handleStop();
    setCentiseconds(0);
  };

  // Cleanup: clear the interval if the user leaves this page
  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // Format centiseconds into MM:SS.CS
  const minutes = Math.floor(centiseconds / 6000);
  const seconds = Math.floor((centiseconds % 6000) / 100);
  const cs = centiseconds % 100;

  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(
    seconds
  ).padStart(2, '0')}.${String(cs).padStart(2, '0')}`;

  return (
    <div className="practice-card">
      <div className="practice-header">
        <span className="practice-badge">Task 2</span>
        <h3>Stopwatch (Interval ID in useRef)</h3>
      </div>

      <p className="practice-desc">
        Demonstrates using <code>useRef</code> to hold the mutable interval ID across renders.
        Because ref mutations don't trigger re-renders, the interval ID stays intact without extra renders.
      </p>

      <div className="practice-demo">
        <div className="stopwatch-display">
          {formattedTime}
        </div>

        <div className="stopwatch-controls">
          <button
            type="button"
            className="practice-btn primary"
            onClick={handleStart}
            disabled={isRunning}
          >
            Start
          </button>
          <button
            type="button"
            className="practice-btn warning"
            onClick={handleStop}
            disabled={!isRunning}
          >
            Stop
          </button>
          <button
            type="button"
            className="practice-btn secondary"
            onClick={handleReset}
            disabled={centiseconds === 0 && !isRunning}
          >
            Reset
          </button>
        </div>
      </div>

      <div className="practice-explanation">
        <strong>Beginner Note:</strong> If we stored the interval ID in <code>useState</code>,
        calling <code>setIntervalId(...)</code> would cause a re-render. With <code>useRef</code>,
        we can remember the ID quietly between clicks.
      </div>
    </div>
  );
}
