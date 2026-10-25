import { useState } from 'react';
import { useWindowWidth } from '../hooks/useWindowWidth';

// Child component that actually mounts the hook
function WidthWatcher() {
  const windowWidth = useWindowWidth();

  // Simple beginner logic to determine screen size category
  let deviceType = 'Desktop';
  let badgeColor = '#10b981'; // Green

  if (windowWidth < 640) {
    deviceType = 'Mobile Screen';
    badgeColor = '#ef4444'; // Red
  } else if (windowWidth < 1024) {
    deviceType = 'Tablet Screen';
    badgeColor = '#f59e0b'; // Amber
  }

  return (
    <div style={{ textAlign: 'center', padding: '1rem', background: 'var(--bg-card-subtle)', borderRadius: '8px' }}>
      <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-primary)' }}>
        {windowWidth} <span style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--text-muted)' }}>px</span>
      </div>

      <div style={{ marginTop: '0.5rem' }}>
        <span
          style={{
            display: 'inline-block',
            padding: '0.25rem 0.75rem',
            borderRadius: '9999px',
            backgroundColor: badgeColor,
            color: '#ffffff',
            fontWeight: 600,
            fontSize: '0.85rem',
          }}
        >
          {deviceType}
        </span>
      </div>

      <p style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
        Resize your browser window and watch this number update in real time!
      </p>
    </div>
  );
}

// Task 5: useWindowWidth() updating on resize and removing listener on unmount
export default function Task5WindowWidthDemo() {
  const [isMounted, setIsMounted] = useState(true);

  return (
    <div className="practice-card">
      <div className="practice-header">
        <span className="practice-badge">Task 5</span>
        <h3>useWindowWidth Custom Hook</h3>
      </div>

      <p className="practice-desc">
        A custom hook that attaches a <code>window.addEventListener('resize')</code> listener
        and safely cleans it up when unmounted.
      </p>

      <div className="practice-demo">
        <div style={{ marginBottom: '1rem' }}>
          <button
            type="button"
            className="practice-btn secondary"
            onClick={() => setIsMounted((prev) => !prev)}
          >
            {isMounted ? 'Unmount Hook (Test Cleanup)' : 'Remount Hook'}
          </button>
        </div>

        {isMounted ? (
          <WidthWatcher />
        ) : (
          <div className="practice-alert warning">
            Hook is unmounted. <code>window.removeEventListener('resize')</code> has been executed. No memory leaks!
          </div>
        )}
      </div>

      <div className="practice-explanation">
        <strong>Beginner Note:</strong> Always return a cleanup function <code>return () =&gt; window.removeEventListener(...)</code>{' '}
        from your <code>useEffect</code>. Otherwise, every time the component re-renders or unmounts,
        old zombie listeners will stay in memory.
      </div>
    </div>
  );
}
