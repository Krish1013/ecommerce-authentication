import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../../components/common/Input';
import Button from '../../../components/common/Button';
import { useAuth } from '../../../hooks/useAuth';
import { useToast } from '../../../hooks/useToast';
import { validateEmail, validatePassword, validateRequired } from '../../../utils/validators';

/**
 * Signup form with strong password validation, strength meter, and dark mode.
 */
export default function Signup() {
  const { signup, loading, error, clearError } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validate = (field, value) => {
    if (field === 'name') return validateRequired(value, 'Name');
    if (field === 'email') return validateEmail(value);
    if (field === 'password') return validatePassword(value);
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
    form.name &&
    form.email &&
    form.password &&
    !errors.name &&
    !errors.email &&
    !errors.password;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      name: validate('name', form.name),
      email: validate('email', form.email),
      password: validate('password', form.password),
    };
    setErrors(newErrors);
    setTouched({ name: true, email: true, password: true });

    if (newErrors.name || newErrors.email || newErrors.password) return;

    try {
      await signup(form.name, form.email, form.password);
      toast.success('Account created successfully! Welcome aboard.');
      navigate('/dashboard', { replace: true });
    } catch {
      // Error handled by AuthContext
    }
  };

  // Password strength indicator
  const getPasswordStrength = () => {
    const { password } = form;
    if (!password) return { level: 0, label: '', color: '' };
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;

    if (score <= 2) return { level: score, label: 'Weak', color: 'bg-danger-500' };
    if (score <= 3) return { level: score, label: 'Fair', color: 'bg-warning-500' };
    if (score <= 4) return { level: score, label: 'Good', color: 'bg-primary-500' };
    return { level: score, label: 'Strong', color: 'bg-success-500' };
  };

  const strength = getPasswordStrength();

  return (
    <form onSubmit={handleSubmit} noValidate>
      {error && (
        <div className="mb-5 p-3.5 rounded-lg bg-danger-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-sm text-red-700 dark:text-red-300" role="alert">
          {error}
        </div>
      )}

      <Input
        label="Full name"
        type="text"
        value={form.name}
        onChange={handleChange('name')}
        onBlur={handleBlur('name')}
        error={touched.name ? errors.name : ''}
        placeholder="John Doe"
        autoComplete="name"
        required
      />

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
        placeholder="Create a strong password"
        autoComplete="new-password"
        required
      />

      {/* Password strength meter */}
      {form.password && (
        <div className="mb-5 -mt-3">
          <div className="flex gap-1 mb-1.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                  i <= strength.level ? strength.color : 'bg-gray-200 dark:bg-gray-600'
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-gray-500 dark:text-dark-secondary">
            Password strength: <span className="font-medium">{strength.label}</span>
          </p>
        </div>
      )}

      <Button
        type="submit"
        fullWidth
        loading={loading}
        disabled={!isValid}
      >
        Create Account
      </Button>

      <p className="mt-6 text-center text-sm text-gray-500 dark:text-dark-secondary">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
          Sign in
        </Link>
      </p>
    </form>
  );
}
