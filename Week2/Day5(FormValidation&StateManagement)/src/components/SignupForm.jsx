import { useState } from 'react';
import FormField from './FormField';
import PasswordStrengthMeter from './PasswordStrengthMeter';
import SuccessView from './SuccessView';
import StateInspector from './StateInspector';
import { calculateErrors, calculatePasswordStrength, COUNTRIES } from '../utils/validation';

/**
 * Initial empty form state represented as a SINGLE object.
 * Adheres to: "Form state is one object; error messages are calculated, not stored."
 */
const INITIAL_FORM_DATA = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  country: '',
  acceptTerms: false,
};

/**
 * SignupForm Component
 * 
 * Demonstrates the core concepts of React Day 5:
 * 1. Form state stored in a single object.
 * 2. Validation errors calculated during render (derived state, not in useState).
 * 3. Blur-based error display: errors only appear after leaving a field (touched state).
 * 4. Password strength meter evaluating complexity.
 * 5. Submit disabled until valid; 1.5s fake API call before showing success screen.
 */
export default function SignupForm() {
  // 1. Single state object for all input fields
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  // 2. Touched tracking: remembers which fields the user has visited/blurred
  const [touched, setTouched] = useState({});

  // 3. Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // 4. CALCULATED / DERIVED STATE (NOT in useState!)
  // Error messages are computed synchronously during every render cycle.
  // This guarantees errors always reflect the latest formData snapshot.
  const errors = calculateErrors(formData);
  const isValid = Object.keys(errors).length === 0;

  // Compute password strength from current password value
  const passwordStrength = calculatePasswordStrength(formData.password);

  /**
   * Universal change handler for all input fields.
   * Handles text, select, and checkbox types cleanly using [name]: value.
   */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));
  };

  /**
   * Blur handler: marks a field as 'touched' when user leaves it.
   * This ensures error messages only show up AFTER the user has finished typing.
   */
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  /**
   * Form submission handler.
   * - Marks all fields as touched.
   * - If valid, triggers fake 1.5s async API call.
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    // Mark all fields as touched so any errors show up
    setTouched({
      fullName: true,
      email: true,
      password: true,
      confirmPassword: true,
      country: true,
      acceptTerms: true,
    });

    if (!isValid) return;

    setIsSubmitting(true);

    // Simulate 1.5 second API server request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  /**
   * Resets form to clean initial state.
   */
  const handleReset = () => {
    setFormData(INITIAL_FORM_DATA);
    setTouched({});
    setIsSubmitting(false);
    setIsSubmitted(false);
  };

  /**
   * Quick fill helper to test valid form submission conveniently.
   */
  const handleFillDemoData = () => {
    setFormData({
      fullName: 'Ahmad Khan',
      email: 'ahmad.khan@example.com',
      password: 'Password123!',
      confirmPassword: 'Password123!',
      country: 'Pakistan',
      acceptTerms: true,
    });
    setTouched({
      fullName: true,
      email: true,
      password: true,
      confirmPassword: true,
      country: true,
      acceptTerms: true,
    });
  };

  // If successfully submitted, render the SuccessView
  if (isSubmitted) {
    return (
      <div className="form-view-wrapper">
        <SuccessView formData={formData} onReset={handleReset} />
        <StateInspector
          formData={formData}
          touched={touched}
          errors={errors}
          isValid={isValid}
          isSubmitting={isSubmitting}
          isSubmitted={isSubmitted}
          passwordStrength={passwordStrength}
        />
      </div>
    );
  }

  return (
    <div className="form-view-wrapper">
      <div className="signup-card">
      <div className="form-header">
        <h2 className="form-title">Create Your Account</h2>
        <p className="form-subtitle">
          Complete the form below to get started. All fields marked with <span className="required-star">*</span> are required.
        </p>

        {/* Quick Demo Fill Helper */}
        <div className="demo-helper">
          <button
            type="button"
            onClick={handleFillDemoData}
            className="demo-fill-btn"
            title="Click to automatically populate valid test data"
          >
            ⚡ Autofill Valid Demo Data
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate className="form-body">
        {/* Field 1: Full Name */}
        <FormField
          id="fullName"
          name="fullName"
          label="Full Name"
          type="text"
          value={formData.fullName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.fullName}
          isTouched={touched.fullName}
          placeholder="e.g. John Doe"
          autoComplete="name"
          hint="Minimum 3 characters"
        />

        {/* Field 2: Email */}
        <FormField
          id="email"
          name="email"
          label="Email Address"
          type="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email}
          isTouched={touched.email}
          placeholder="e.g. john@example.com"
          autoComplete="email"
        />

        {/* Field 3: Password */}
        <FormField
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.password}
          isTouched={touched.password}
          placeholder="Enter a secure password"
          autoComplete="new-password"
          hint="8+ chars, 1 uppercase, 1 number"
        />

        {/* Password Strength Meter */}
        <PasswordStrengthMeter strength={passwordStrength} />

        {/* Field 4: Confirm Password */}
        <FormField
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.confirmPassword}
          isTouched={touched.confirmPassword}
          placeholder="Re-enter your password"
          autoComplete="new-password"
        />

        {/* Field 5: Country Dropdown */}
        <FormField
          id="country"
          name="country"
          label="Country"
          type="select"
          value={formData.country}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.country}
          isTouched={touched.country}
        >
          <option value="">Select your country...</option>
          {COUNTRIES.map((c) => (
            <option key={c.code} value={c.name}>
              {c.name}
            </option>
          ))}
        </FormField>

        {/* Field 6: Accept Terms Checkbox */}
        <div className={`form-checkbox-field ${touched.acceptTerms && errors.acceptTerms ? 'has-error' : ''}`}>
          <label className="checkbox-label" htmlFor="acceptTerms">
            <input
              id="acceptTerms"
              name="acceptTerms"
              type="checkbox"
              checked={formData.acceptTerms}
              onChange={handleChange}
              onBlur={handleBlur}
              className="checkbox-input"
              aria-invalid={Boolean(touched.acceptTerms && errors.acceptTerms)}
              aria-describedby={touched.acceptTerms && errors.acceptTerms ? 'terms-error' : undefined}
            />
            <span className="checkbox-text">
              I agree to the <a href="#terms" onClick={(e) => e.preventDefault()} className="link-inline">Terms of Service</a> and <a href="#privacy" onClick={(e) => e.preventDefault()} className="link-inline">Privacy Policy</a>.
              <span className="required-star" aria-hidden="true">*</span>
            </span>
          </label>

          {/* Terms Error message */}
          {touched.acceptTerms && errors.acceptTerms && (
            <div id="terms-error" className="field-error-message checkbox-error" role="alert">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>{errors.acceptTerms}</span>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="form-submit-row">
          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className={`submit-btn ${!isValid ? 'is-disabled' : ''} ${isSubmitting ? 'is-submitting' : ''}`}
            aria-disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="spinner" aria-hidden="true" />
                <span>Creating Account (1.5s)...</span>
              </>
            ) : (
              <>
                <span>Create Account</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </>
            )}
          </button>
        </div>

        {/* Status notice */}
        <p className="form-footer-note">
          {!isValid ? (
            <span className="note-invalid">
              ⚠️ Please complete all required fields correctly to enable submission.
            </span>
          ) : (
            <span className="note-valid">
              ✓ All fields look good! Ready to submit.
            </span>
          )}
        </p>
      </form>
    </div>

    {/* State & React DevTools Inspector */}
    <StateInspector
      formData={formData}
      touched={touched}
      errors={errors}
      isValid={isValid}
      isSubmitting={isSubmitting}
      isSubmitted={isSubmitted}
      passwordStrength={passwordStrength}
    />
  </div>
  );
}
