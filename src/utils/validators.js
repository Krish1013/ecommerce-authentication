/**
 * Form Validation Utilities
 */

export function validateEmail(email) {
  if (!email || !email.trim()) {
    return 'Email is required';
  }
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!pattern.test(email)) {
    return 'Please enter a valid email address';
  }
  return '';
}

export function validatePassword(password) {
  if (!password) {
    return 'Password is required';
  }
  if (password.length < 8) {
    return 'Password must be at least 8 characters';
  }
  if (!/[A-Z]/.test(password)) {
    return 'Password must contain at least one uppercase letter';
  }
  if (!/[a-z]/.test(password)) {
    return 'Password must contain at least one lowercase letter';
  }
  if (!/[0-9]/.test(password)) {
    return 'Password must contain at least one number';
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return 'Password must contain at least one special character';
  }
  return '';
}

export function validateRequired(value, fieldName = 'This field') {
  if (!value || !value.trim()) {
    return `${fieldName} is required`;
  }
  return '';
}
