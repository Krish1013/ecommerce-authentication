import { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../../../components/common/Input';
import Button from '../../../components/common/Button';
import { useToast } from '../../../hooks/useToast';
import { validateEmail } from '../../../utils/validators';
import { resetPassword as apiResetPassword } from '../../../services/api';

/**
 * Reset password form with success view and dark mode.
 */
export default function ResetPassword() {
  const toast = useToast();

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [touched, setTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (touched) {
      setEmailError(validateEmail(e.target.value));
    }
  };

  const handleBlur = () => {
    setTouched(true);
    setEmailError(validateEmail(email));
  };

  const isValid = email && !emailError;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched(true);
    const err = validateEmail(email);
    setEmailError(err);
    if (err) return;

    setLoading(true);
    try {
      await apiResetPassword(email);
      setSubmitted(true);
      toast.success('Reset link sent! Check your inbox.');
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center animate-fade-in">
        <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-success-50 dark:bg-green-900/30 flex items-center justify-center">
          <svg className="w-8 h-8 text-success-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Check your email</h2>
        <p className="text-sm text-gray-500 dark:text-dark-secondary mb-6">
          We&apos;ve sent a password reset link to{' '}
          <span className="font-medium text-gray-700 dark:text-gray-300">{email}</span>
        </p>
        <Button variant="secondary" fullWidth onClick={() => setSubmitted(false)}>
          Send again
        </Button>
        <p className="mt-5 text-sm text-gray-500 dark:text-dark-secondary">
          <Link to="/login" className="font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
            ← Back to sign in
          </Link>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <p className="text-sm text-gray-500 dark:text-dark-secondary mb-6 text-center">
        Enter your email and we&apos;ll send you a link to reset your password.
      </p>

      <Input
        label="Email address"
        type="email"
        value={email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched ? emailError : ''}
        placeholder="you@example.com"
        autoComplete="email"
        required
      />

      <Button
        type="submit"
        fullWidth
        loading={loading}
        disabled={!isValid}
        className="mt-2"
      >
        Send Reset Link
      </Button>

      <p className="mt-6 text-center text-sm text-gray-500 dark:text-dark-secondary">
        Remember your password?{' '}
        <Link to="/login" className="font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
          Sign in
        </Link>
      </p>
    </form>
  );
}
