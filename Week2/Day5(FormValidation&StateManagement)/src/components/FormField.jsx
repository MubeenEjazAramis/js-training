import { useState } from 'react';

/**
 * FormField Component
 * 
 * A reusable, accessible form input component supporting text, email, password,
 * and select dropdowns.
 * 
 * Key behavior:
 * - Shows validation error ONLY after the user has left the field (isTouched === true).
 * - Avoids premature error messages while typing for the first time.
 */
export default function FormField({
  id,
  name,
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  isTouched,
  placeholder,
  required = true,
  children, // used for <select> options
  hint,
  autoComplete,
}) {
  const [showPassword, setShowPassword] = useState(false);

  // An error is only visible to the user if the field has been touched (left/blurred)
  const showError = Boolean(isTouched && error);

  // A field is marked as valid if touched and there are no errors
  const isValid = Boolean(isTouched && !error && value && value.toString().trim() !== '');

  const isPasswordField = type === 'password';
  const effectiveType = isPasswordField && showPassword ? 'text' : type;

  return (
    <div className={`form-field ${showError ? 'has-error' : ''} ${isValid ? 'is-valid' : ''}`}>
      {/* Label and optional hint */}
      <div className="field-label-row">
        <label htmlFor={id} className="field-label">
          {label}
          {required && <span className="required-star" aria-hidden="true">*</span>}
        </label>
        {hint && <span className="field-hint">{hint}</span>}
      </div>

      {/* Input container */}
      <div className="input-wrapper">
        {type === 'select' ? (
          <select
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            className="form-input form-select"
            aria-invalid={showError}
            aria-describedby={showError ? `${id}-error` : undefined}
          >
            {children}
          </select>
        ) : (
          <input
            id={id}
            name={name}
            type={effectiveType}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            autoComplete={autoComplete}
            className="form-input"
            aria-invalid={showError}
            aria-describedby={showError ? `${id}-error` : undefined}
          />
        )}

        {/* Toggle password visibility button */}
        {isPasswordField && (
          <button
            type="button"
            className="password-toggle-btn"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            tabIndex={-1}
          >
            {showPassword ? (
              // Eye-off icon
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            ) : (
              // Eye icon
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        )}

        {/* Success checkmark indicator */}
        {isValid && !isPasswordField && (
          <span className="field-status-icon is-success" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </span>
        )}
      </div>

      {/* Error message (rendered only when field has been touched and has error) */}
      {showError && (
        <div id={`${id}-error`} className="field-error-message" role="alert">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
