import { useState } from 'react';

/**
 * VisualStatesGuide Component
 * 
 * Demonstrates the 5 distinct visual states described in React's official guide:
 * "Reacting to Input with State" (react.dev/learn/reacting-to-input-with-state)
 * 
 * 1. Empty (form is blank, submit is disabled)
 * 2. Typing (user is actively filling fields)
 * 3. Invalid / Error (field has blur error or missing requirements)
 * 4. Submitting (network request in flight, buttons disabled, spinner displayed)
 * 5. Success (submission confirmed, summary shown)
 */
export default function VisualStatesGuide() {
  const [activeState, setActiveState] = useState('empty');

  const states = [
    {
      id: 'empty',
      title: '1. Empty State',
      description: 'The initial pristine state when the user opens the page. Inputs are blank, no error messages are shown yet, and the submit button is disabled.',
      tag: 'Pristine',
      tagColor: 'neutral',
    },
    {
      id: 'typing',
      title: '2. Typing State',
      description: 'The user is actively entering information. As long as the user has not left a field (blurred), errors are withheld to prevent distracting red highlights.',
      tag: 'Interactive',
      tagColor: 'info',
    },
    {
      id: 'error',
      title: '3. Error / Invalid State',
      description: 'Triggered when a user leaves (blurs) an invalid input. Calculated error messages appear below each touched invalid field, and the submit button remains disabled.',
      tag: 'Invalid',
      tagColor: 'error',
    },
    {
      id: 'submitting',
      title: '4. Submitting State',
      description: 'The user clicks Submit on a valid form. The button displays a spinning loader and message ("Creating Account..."), inputs are disabled, and network latency is simulated.',
      tag: 'Pending',
      tagColor: 'warning',
    },
    {
      id: 'success',
      title: '5. Success State',
      description: 'The server has confirmed the registration. The form is replaced with a clear success confirmation card, registration summary, and an option to reset.',
      tag: 'Complete',
      tagColor: 'success',
    },
  ];

  const current = states.find((s) => s.id === activeState) || states[0];

  return (
    <div className="visual-states-card">
      <div className="guide-header">
        <div className="guide-badge">React Concepts</div>
        <h3 className="guide-title">Reacting to Input with State (Visual State Machine)</h3>
        <p className="guide-desc">
          Declarative UI in React works by describing what the UI should look like for each visual state, rather than imperatively manipulating DOM nodes.
        </p>
      </div>

      {/* State Selector Tabs */}
      <div className="state-tabs">
        {states.map((s) => (
          <button
            key={s.id}
            type="button"
            className={`state-tab-btn ${activeState === s.id ? 'is-active' : ''}`}
            onClick={() => setActiveState(s.id)}
          >
            {s.title}
          </button>
        ))}
      </div>

      {/* Selected State Description Card */}
      <div className="state-detail-box">
        <div className="state-detail-header">
          <h4 className="state-detail-title">{current.title}</h4>
          <span className={`state-tag tag-${current.tagColor}`}>{current.tag}</span>
        </div>
        <p className="state-detail-desc">{current.description}</p>

        {/* Live Preview of the state */}
        <div className="state-mini-preview">
          <div className="preview-label">Visual Simulation:</div>
          {activeState === 'empty' && (
            <div className="mock-preview">
              <input type="text" placeholder="Full Name" disabled className="mock-input" />
              <button disabled className="mock-btn is-disabled">Create Account (Disabled)</button>
            </div>
          )}
          {activeState === 'typing' && (
            <div className="mock-preview">
              <input type="text" value="Ahmad" readOnly className="mock-input is-typing" />
              <span className="mock-caption">Typing... No premature errors shown!</span>
            </div>
          )}
          {activeState === 'error' && (
            <div className="mock-preview">
              <input type="text" value="Ah" readOnly className="mock-input is-invalid" />
              <div className="mock-error-text">⚠️ Full name must be at least 3 characters.</div>
              <button disabled className="mock-btn is-disabled">Create Account (Disabled)</button>
            </div>
          )}
          {activeState === 'submitting' && (
            <div className="mock-preview">
              <button disabled className="mock-btn is-submitting">
                <span className="spinner" /> Creating Account (1.5s)...
              </button>
            </div>
          )}
          {activeState === 'success' && (
            <div className="mock-preview mock-success-box">
              <div className="mock-check">✓</div>
              <strong>Account Created Successfully!</strong>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
