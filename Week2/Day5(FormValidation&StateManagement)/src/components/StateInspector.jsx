import { useState } from 'react';

/**
 * StateInspector Component
 * 
 * An interactive, live debugger that mirrors React DevTools.
 * Proves the core architectural requirement:
 * - "Form state is one object; error messages are calculated, not stored."
 */
export default function StateInspector({
  formData = {},
  touched = {},
  errors = {},
  isValid = false,
  isSubmitting = false,
  isSubmitted = false,
  passwordStrength = { color: 'neutral', label: 'Empty', score: 0 },
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`state-inspector-card ${isOpen ? 'is-open' : 'is-collapsed'}`}>
      <div
        className="inspector-header"
        onClick={() => setIsOpen((prev) => !prev)}
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
      >
        <div className="inspector-title-group">
          <span className="inspector-badge">Live State Inspector</span>
          <span className="inspector-subtitle">React DevTools Simulation</span>
        </div>
        <div className="inspector-header-right">
          <span className={`status-pill ${isValid ? 'pill-valid' : 'pill-invalid'}`}>
            {isValid ? 'Form: Valid' : 'Form: Invalid'}
          </span>
          <button type="button" className="inspector-toggle-btn" aria-label="Toggle Inspector">
            {isOpen ? '▲ Hide' : '▼ Inspect State'}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="inspector-body">
          <p className="inspector-intro">
            💡 Notice how <strong>formData</strong> and <strong>touched</strong> are the only states stored in <code>useState</code>. The <strong>errors</strong> and <strong>isValid</strong> properties are <em>calculated during render</em>, eliminating state synchronization bugs.
          </p>

          <div className="inspector-grid">
            {/* Box 1: Stored State (formData) */}
            <div className="inspector-box">
              <div className="box-title">
                <span>Stored State: <code>formData</code></span>
                <span className="type-tag">useState(Object)</span>
              </div>
              <pre className="code-block">
                {JSON.stringify(formData, null, 2)}
              </pre>
            </div>

            {/* Box 2: Touched Tracking */}
            <div className="inspector-box">
              <div className="box-title">
                <span>Field Blur: <code>touched</code></span>
                <span className="type-tag">useState(Object)</span>
              </div>
              <pre className="code-block">
                {JSON.stringify(touched, null, 2)}
              </pre>
            </div>

            {/* Box 3: Derived State (Calculated Errors) */}
            <div className="inspector-box">
              <div className="box-title">
                <span>Derived State: <code>errors</code></span>
                <span className="type-tag highlight-tag">Calculated (Not Stored)</span>
              </div>
              <pre className="code-block">
                {Object.keys(errors).length === 0
                  ? '// No validation errors! Form is valid.'
                  : JSON.stringify(errors, null, 2)}
              </pre>
            </div>

            {/* Box 4: Computed Password & Submission Status */}
            <div className="inspector-box">
              <div className="box-title">
                <span>Computed Status & Flags</span>
                <span className="type-tag">Derived / Lifecycle</span>
              </div>
              <div className="inspector-status-list">
                <div className="status-item">
                  <span>isValid:</span>
                  <strong className={isValid ? 'val-true' : 'val-false'}>{String(isValid)}</strong>
                </div>
                <div className="status-item">
                  <span>isSubmitting:</span>
                  <strong className={isSubmitting ? 'val-true' : 'val-neutral'}>{String(isSubmitting)}</strong>
                </div>
                <div className="status-item">
                  <span>isSubmitted:</span>
                  <strong className={isSubmitted ? 'val-true' : 'val-neutral'}>{String(isSubmitted)}</strong>
                </div>
                <div className="status-item">
                  <span>Password Strength:</span>
                  <strong className={`val-${passwordStrength.color}`}>{passwordStrength.label} ({passwordStrength.score}/3)</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
