/**
 * PasswordStrengthMeter Component
 * 
 * Renders an accessible, visual password strength meter with:
 * - 3-stage colored bar (Weak / Medium / Strong)
 * - Status badge
 * - Live checklist showing which requirements are met
 */
export default function PasswordStrengthMeter({ strength }) {
  const { score, label, color, checks } = strength;

  if (score === 0) {
    return null; // Don't show meter if password is empty
  }

  return (
    <div className="password-strength-container" aria-live="polite">
      {/* Header with label and score badge */}
      <div className="strength-header">
        <span className="strength-title">Password Strength</span>
        <span className={`strength-badge strength-${color}`}>
          {label}
        </span>
      </div>

      {/* 3-segment visual meter */}
      <div className="strength-bars" aria-label={`Password strength is ${label}`}>
        <div className={`bar-segment ${score >= 1 ? `filled fill-${color}` : ''}`} />
        <div className={`bar-segment ${score >= 2 ? `filled fill-${color}` : ''}`} />
        <div className={`bar-segment ${score >= 3 ? `filled fill-${color}` : ''}`} />
      </div>

      {/* Requirements checklist */}
      <ul className="strength-checklist">
        <li className={`check-item ${checks.hasMinLength ? 'is-met' : ''}`}>
          <span className="check-icon" aria-hidden="true">
            {checks.hasMinLength ? '✓' : '•'}
          </span>
          <span>At least 8 characters</span>
        </li>
        <li className={`check-item ${checks.hasUppercase ? 'is-met' : ''}`}>
          <span className="check-icon" aria-hidden="true">
            {checks.hasUppercase ? '✓' : '•'}
          </span>
          <span>At least one uppercase letter (A-Z)</span>
        </li>
        <li className={`check-item ${checks.hasNumber ? 'is-met' : ''}`}>
          <span className="check-icon" aria-hidden="true">
            {checks.hasNumber ? '✓' : '•'}
          </span>
          <span>At least one number (0-9)</span>
        </li>
      </ul>
    </div>
  );
}
