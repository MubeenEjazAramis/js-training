import { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

// Task 4: useLocalStorage hook that works like useState, persists, and copes with invalid JSON
export default function Task4LocalStorageDemo() {
  // Use our custom hook to persist a username
  const [userName, setUserName] = useLocalStorage('trainee_username', 'Mubeen');
  const [statusMessage, setStatusMessage] = useState('');

  // Function to simulate corrupt/invalid JSON written to localStorage by an external script
  const simulateInvalidJSON = () => {
    try {
      window.localStorage.setItem('trainee_username', '<<<INVALID_JSON_CONTENT>>>');
      setStatusMessage('Injected invalid JSON into localStorage! Now refresh the page or click "Test Safe Recovery".');
    } catch (e) {
      console.error(e);
    }
  };

  const handleClear = () => {
    setUserName('');
    setStatusMessage('Cleared username.');
  };

  return (
    <div className="practice-card">
      <div className="practice-header">
        <span className="practice-badge">Task 4</span>
        <h3>useLocalStorage Hook (Safe JSON Parsing)</h3>
      </div>

      <p className="practice-desc">
        A custom hook that behaves like <code>useState</code>, but automatically saves updates
        to <code>window.localStorage</code> and safely catches invalid JSON using <code>try / catch</code>.
      </p>

      <div className="practice-demo">
        <div className="practice-input-group">
          <input
            type="text"
            className="practice-input"
            placeholder="Enter your name..."
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <button
            type="button"
            className="practice-btn secondary"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>

        <div className="practice-preview" style={{ marginTop: '0.75rem' }}>
          Current Stored Value: <strong>{userName || '(empty)'}</strong>
          <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            Try refreshing your browser tab! Your input will still be here.
          </span>
        </div>

        <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            className="practice-btn warning"
            onClick={simulateInvalidJSON}
          >
            Test Invalid JSON Resilience
          </button>
          <button
            type="button"
            className="practice-btn primary"
            onClick={() => setUserName('Mubeen')}
          >
            Reset to Default ("Mubeen")
          </button>
        </div>

        {statusMessage && (
          <div className="practice-alert warning" style={{ marginTop: '0.75rem' }}>
            {statusMessage}
          </div>
        )}
      </div>

      <div className="practice-explanation">
        <strong>Beginner Note:</strong> Calling <code>JSON.parse()</code> on invalid strings throws
        an uncaught exception that crashes React. By wrapping it in <code>try &#123; ... &#125; catch &#123; ... &#125;</code>,
        our hook gracefully falls back to the initial value instead.
      </div>
    </div>
  );
}
