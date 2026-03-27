import { Link } from 'react-router-dom';
import { useTheme } from '../../../hooks/useTheme';

/**
 * Centered card layout for authentication pages with dark mode.
 */
export default function AuthLayout({ children, title, subtitle }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="auth-bg min-h-screen bg-gray-50 dark:bg-[#0f172a] flex flex-col items-center justify-center px-4 py-12 transition-colors duration-300">
      {/* Theme toggle — floating top-right */}
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 p-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm transition-all cursor-pointer z-50"
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {isDark ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )}
      </button>

      {/* Logo */}
      <Link to="/login" className="flex items-center gap-2.5 mb-8 group">
        <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center shadow-sm group-hover:bg-primary-700 transition-colors">
          <span className="text-white font-bold text-lg">A</span>
        </div>
        <span className="text-xl font-semibold text-gray-900 dark:text-white tracking-tight">
          AppName
        </span>
      </Link>

      {/* Card */}
      <div className="w-full max-w-md">
        <div className="card-surface rounded-2xl p-8 sm:p-10 animate-fade-in-up">
          {title && (
            <div className="text-center mb-8">
              <h1 className="text-2xl sm:text-[1.7rem] font-bold text-gray-900 dark:text-white leading-tight">
                {title}
              </h1>
              {subtitle && (
                <p className="mt-2.5 text-sm text-gray-500 dark:text-dark-secondary">
                  {subtitle}
                </p>
              )}
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}
