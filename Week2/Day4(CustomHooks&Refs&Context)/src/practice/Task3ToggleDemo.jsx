import { useToggle } from '../hooks/useToggle';

// Task 3: useToggle(initial) returning [value, toggle]
export default function Task3ToggleDemo() {
  // Use our custom hook! Initial value is false (hidden)
  const [isOpen, toggleOpen] = useToggle(false);
  const [isNotificationsOn, toggleNotifications] = useToggle(true);

  return (
    <div className="practice-card">
      <div className="practice-header">
        <span className="practice-badge">Task 3</span>
        <h3>useToggle Custom Hook</h3>
      </div>

      <p className="practice-desc">
        Demonstrates extracting boolean state logic into a custom reusable hook:{' '}
        <code>const [value, toggle] = useToggle(initial)</code>.
      </p>

      <div className="practice-demo">
        <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <button
            type="button"
            className="practice-btn primary"
            onClick={() => toggleOpen()}
          >
            {isOpen ? 'Hide Secret Tip' : 'Show Secret Tip'}
          </button>

          <button
            type="button"
            className="practice-btn secondary"
            onClick={() => toggleNotifications()}
          >
            Notifications: <strong>{isNotificationsOn ? 'ON' : 'OFF'}</strong>
          </button>
        </div>

        {isOpen && (
          <div className="practice-alert success">
            🎉 <strong>Pro Tip for Beginners:</strong> Whenever you find yourself writing{' '}
            <code>setValue(prev =&gt; !prev)</code> in multiple components, that is the exact moment
            to extract it into a <code>useToggle()</code> custom hook!
          </div>
        )}
      </div>

      <div className="practice-explanation">
        <strong>Beginner Note:</strong> Custom hooks allow us to share stateful <em>logic</em>{' '}
        (not the state itself) across different components with zero code duplication.
      </div>
    </div>
  );
}
