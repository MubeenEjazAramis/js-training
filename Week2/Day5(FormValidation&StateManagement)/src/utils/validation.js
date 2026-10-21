/**
 * validation.js
 * 
 * Pure utility functions for form validation and password strength calculation.
 * In accordance with React best practices ("Choosing the State Structure"),
 * validation errors are calculated on-the-fly during render rather than stored
 * in component state. This guarantees error state never falls out of sync.
 */

// Email regex pattern checking standard user@domain.extension format
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Calculates form errors based on the current formData object.
 * Returns an object containing error messages for invalid fields.
 * If all fields are valid, returns an empty object {}.
 * 
 * @param {Object} formData - The current single form state object
 * @returns {Object} errors - Key-value map of field errors { [fieldName]: string }
 */
export function calculateErrors(formData) {
  const errors = {};

  // 1. Full Name: Required, minimum 3 characters
  const trimmedName = formData.fullName ? formData.fullName.trim() : '';
  if (!trimmedName) {
    errors.fullName = 'Full name is required.';
  } else if (trimmedName.length < 3) {
    errors.fullName = 'Full name must be at least 3 characters.';
  }

  // 2. Email: Required, valid format
  const trimmedEmail = formData.email ? formData.email.trim() : '';
  if (!trimmedEmail) {
    errors.email = 'Email address is required.';
  } else if (!EMAIL_REGEX.test(trimmedEmail)) {
    errors.email = 'Please enter a valid email address (e.g. name@example.com).';
  }

  // 3. Password: Required, 8+ characters, at least 1 uppercase letter and 1 number
  const pwd = formData.password || '';
  if (!pwd) {
    errors.password = 'Password is required.';
  } else if (pwd.length < 8) {
    errors.password = 'Password must be at least 8 characters long.';
  } else if (!/[A-Z]/.test(pwd)) {
    errors.password = 'Password must include at least one uppercase letter (A-Z).';
  } else if (!/[0-9]/.test(pwd)) {
    errors.password = 'Password must include at least one number (0-9).';
  }

  // 4. Confirm Password: Required, must match password
  const confirmPwd = formData.confirmPassword || '';
  if (!confirmPwd) {
    errors.confirmPassword = 'Please confirm your password.';
  } else if (confirmPwd !== pwd) {
    errors.confirmPassword = 'Passwords do not match.';
  }

  // 5. Country: Required selection
  if (!formData.country) {
    errors.country = 'Please select your country of residence.';
  }

  // 6. Terms: Required checkbox tick
  if (!formData.acceptTerms) {
    errors.acceptTerms = 'You must accept the terms and conditions to continue.';
  }

  return errors;
}

/**
 * Evaluates password strength based on multiple criteria.
 * Returns score (0-3), human-readable label ("Weak", "Medium", "Strong"),
 * meter percentage, and individual checklist items.
 * 
 * @param {string} password 
 * @returns {Object} strength assessment
 */
export function calculatePasswordStrength(password = '') {
  if (!password) {
    return {
      score: 0,
      label: 'Empty',
      color: 'neutral',
      percent: 0,
      checks: {
        hasMinLength: false,
        hasUppercase: false,
        hasNumber: false,
        hasSpecial: false,
      },
    };
  }

  // Individual rule checks
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);
  const isLonger = password.length >= 12;

  // Compute criteria count
  let passedCount = 0;
  if (hasMinLength) passedCount++;
  if (hasUppercase) passedCount++;
  if (hasNumber) passedCount++;
  if (hasSpecial) passedCount++;
  if (isLonger) passedCount++;

  // Determine strength category
  // Weak: Doesn't meet the baseline requirements (< 8 chars, or missing uppercase/number)
  // Medium: Meets baseline (8+ chars, uppercase, number)
  // Strong: Meets baseline + extra length or special characters
  let label = 'Weak';
  let score = 1;
  let color = 'weak';
  let percent = 33;

  if (hasMinLength && hasUppercase && hasNumber) {
    if (passedCount >= 4) {
      label = 'Strong';
      score = 3;
      color = 'strong';
      percent = 100;
    } else {
      label = 'Medium';
      score = 2;
      color = 'medium';
      percent = 66;
    }
  }

  return {
    score,
    label,
    color,
    percent,
    checks: {
      hasMinLength,
      hasUppercase,
      hasNumber,
      hasSpecial,
    },
  };
}

/**
 * Supported countries for the country select dropdown.
 */
export const COUNTRIES = [
  { code: 'PK', name: 'Pakistan' },
  { code: 'US', name: 'United States' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'CA', name: 'Canada' },
  { code: 'AU', name: 'Australia' },
  { code: 'DE', name: 'Germany' },
  { code: 'AE', name: 'United Arab Emirates' },
  { code: 'SA', name: 'Saudi Arabia' },
  { code: 'SG', name: 'Singapore' },
  { code: 'MY', name: 'Malaysia' },
  { code: 'IN', name: 'India' },
];
