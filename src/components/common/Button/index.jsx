/**
 * Reusable Button component with loading, disabled, and variant states.
 */
export default function Button({
  children,
  type = 'button',
  variant = 'primary',
  loading = false,
  disabled = false,
  fullWidth = false,
  onClick,
  className = '',
  ...props
}) {
  const baseClasses =
    'inline-flex items-center justify-center gap-2 font-medium rounded-lg px-5 py-2.5 text-sm transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary:
      'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 focus-visible:outline-primary-500 shadow-sm',
    secondary:
      'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 active:bg-gray-100 focus-visible:outline-gray-400',
    danger:
      'bg-danger-500 text-white hover:bg-danger-600 active:bg-red-700 focus-visible:outline-danger-500',
    ghost:
      'bg-transparent text-gray-600 hover:bg-gray-100 active:bg-gray-200 focus-visible:outline-gray-400',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseClasses} ${variants[variant] || variants.primary} ${widthClass} ${className}`}
      {...props}
    >
      {loading && (
        <span
          className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"
          role="status"
          aria-label="Loading"
        />
      )}
      {children}
    </button>
  );
}
