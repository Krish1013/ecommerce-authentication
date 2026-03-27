import { useState } from 'react';

/**
 * Reusable controlled Input with label, error display, accessibility, and dark mode.
 */
export default function Input({
  id,
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  placeholder = '',
  error = '',
  disabled = false,
  required = false,
  autoComplete,
  className = '',
  ...props
}) {
  const [focused, setFocused] = useState(false);
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
  const errorId = error ? `${inputId}-error` : undefined;

  const handleFocus = () => setFocused(true);
  const handleBlur = (e) => {
    setFocused(false);
    onBlur?.(e);
  };

  return (
    <div className={`mb-5 ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
        >
          {label}
          {required && <span className="text-danger-500 ml-0.5">*</span>}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        aria-describedby={errorId}
        className={`input-surface w-full px-3.5 py-3 text-sm rounded-lg border transition-all duration-200
          ${
            error
              ? 'border-danger-500 focus:ring-2 focus:ring-danger-500/20 focus:border-danger-500'
              : focused
                ? 'border-primary-500 ring-2 ring-primary-500/20'
                : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
          }
          ${disabled ? 'bg-gray-50 dark:bg-gray-800 text-gray-400 cursor-not-allowed' : 'bg-white dark:bg-[#0f172a] text-gray-900 dark:text-gray-100'}
          placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none`}
        {...props}
      />
      {error && (
        <p id={errorId} className="mt-1.5 text-xs text-danger-500 flex items-center gap-1" role="alert">
          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}
