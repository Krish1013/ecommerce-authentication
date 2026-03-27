import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../../components/common/Input';
import Button from '../../../components/common/Button';
import { useAuth } from '../../../hooks/useAuth';
import { useToast } from '../../../hooks/useToast';
import { validateEmail, validateRequired } from '../../../utils/validators';

/**
 * Login form with email/password validation and loading state.
 */
export default function Login() {
  const { login, loading, error, clearError } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validate = (field, value) => {
    if (field === 'email') return validateEmail(value);
    if (field === 'password') return validateRequired(value, 'Password');
    return '';
  };

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      setErrors((prev) => ({ ...prev, [field]: validate(field, value) }));
    }
    if (error) clearError();
  };

  const handleBlur = (field) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validate(field, form[field]) }));
  };

  const isValid =
    form.email && form.password && !errors.email && !errors.password;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {
      email: validate('email', form.email),
      password: validate('password', form.password),
    };
    setErrors(newErrors);
    setTouched({ email: true, password: true });

    if (newErrors.email || newErrors.password) return;

    try {
      await login(form.email, form.password);
      toast.success('Welcome back! Redirecting to dashboard...');
      navigate('/dashboard', { replace: true });
    } catch {
      // Error is handled by AuthContext
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {error && (
        <div className="mb-4 p-3 rounded-lg bg-danger-50 border border-red-200 text-sm text-red-700" role="alert">
          {error}
        </div>
      )}

      <Input
        label="Email address"
        type="email"
        value={form.email}
        onChange={handleChange('email')}
        onBlur={handleBlur('email')}
        error={touched.email ? errors.email : ''}
        placeholder="you@example.com"
        autoComplete="email"
        required
      />

      <Input
        label="Password"
        type="password"
        value={form.password}
        onChange={handleChange('password')}
        onBlur={handleBlur('password')}
        error={touched.password ? errors.password : ''}
        placeholder="Enter your password"
        autoComplete="current-password"
        required
      />

      <div className="flex items-center justify-between mb-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
          />
          <span className="text-sm text-gray-600">Remember me</span>
        </label>
        <Link
          to="/reset-password"
          className="text-sm font-medium text-primary-600 hover:text-primary-700"
        >
          Forgot password?
        </Link>
      </div>

      <Button
        type="submit"
        fullWidth
        loading={loading}
        disabled={!isValid}
      >
        Sign In
      </Button>

      <p className="mt-6 text-center text-sm text-gray-500">
        Don&apos;t have an account?{' '}
        <Link to="/signup" className="font-medium text-primary-600 hover:text-primary-700">
          Create one
        </Link>
      </p>
    </form>
  );
}
