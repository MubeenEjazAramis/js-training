/**
 * SuccessView Component
 * 
 * Rendered when the form is submitted successfully after the 1.5-second fake API call.
 * Displays submitted information summary and allows resetting to test again.
 */
export default function SuccessView({ formData, onReset }) {
  return (
    <div className="success-card" role="status" aria-live="polite">
      {/* Animated / styled checkmark header */}
      <div className="success-icon-wrapper">
        <svg
          className="success-checkmark"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      </div>

      <h2 className="success-title">Account Created Successfully!</h2>
      <p className="success-subtitle">
        Your registration details have been securely processed. Welcome aboard, <strong>{formData.fullName}</strong>!
      </p>

      {/* Summary box of submitted data */}
      <div className="summary-box">
        <h3 className="summary-heading">Registration Summary</h3>
        <div className="summary-row">
          <span className="summary-label">Full Name:</span>
          <span className="summary-value">{formData.fullName}</span>
        </div>
        <div className="summary-row">
          <span className="summary-label">Email Address:</span>
          <span className="summary-value">{formData.email}</span>
        </div>
        <div className="summary-row">
          <span className="summary-label">Country:</span>
          <span className="summary-value">{formData.country}</span>
        </div>
        <div className="summary-row">
          <span className="summary-label">Terms Accepted:</span>
          <span className="summary-value badge-success">✓ Yes (Verified)</span>
        </div>
        <div className="summary-row">
          <span className="summary-label">Account Status:</span>
          <span className="summary-value badge-active">Active</span>
        </div>
      </div>

      {/* Action button to reset form */}
      <div className="success-actions">
        <button
          type="button"
          onClick={onReset}
          className="btn-primary reset-btn"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="1 4 1 10 7 10" />
            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
          </svg>
          Register Another Account
        </button>
      </div>
    </div>
  );
}
