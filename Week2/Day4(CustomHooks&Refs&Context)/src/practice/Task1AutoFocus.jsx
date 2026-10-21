import { useEffect, useRef, useState } from 'react';

// Task 1: Auto-focus search input on load with useRef
export default function Task1AutoFocus() {
  // Step 1: Create a ref object to hold the input DOM element
  const searchInputRef = useRef(null);
  const [query, setQuery] = useState('');

  // Step 2: Auto-focus the input as soon as the component mounts
  useEffect(() => {
    // When the component appears on screen, focus the input
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []); // Empty dependency array = runs only once on mount

  const handleManualFocus = () => {
    // We can also focus on command without querying the whole document
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  return (
    <div className="practice-card">
      <div className="practice-header">
        <span className="practice-badge">Task 1</span>
        <h3>Auto-Focus with useRef</h3>
      </div>

      <p className="practice-desc">
        Demonstrates using a React <code>useRef</code> to gain direct access to an HTML input element
        and call <code>.focus()</code> automatically when the component mounts.
      </p>

      <div className="practice-demo">
        <div className="practice-input-group">
          <input
            ref={searchInputRef}
            type="text"
            className="practice-input"
            placeholder="I automatically focused on load! Type here..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="button"
            className="practice-btn secondary"
            onClick={() => setQuery('')}
            disabled={!query}
          >
            Clear
          </button>
        </div>

        <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem' }}>
          <button
            type="button"
            className="practice-btn primary"
            onClick={handleManualFocus}
          >
            Click to Re-Focus Input
          </button>
        </div>

        {query && (
          <div className="practice-preview">
            You typed: <strong>{query}</strong>
          </div>
        )}
      </div>

      <div className="practice-explanation">
        <strong>Beginner Note:</strong> We use <code>useRef()</code> instead of{' '}
        <code>document.getElementById()</code> because React components should manage their own DOM
        references safely without polluting the global page scope.
      </div>
    </div>
  );
}
