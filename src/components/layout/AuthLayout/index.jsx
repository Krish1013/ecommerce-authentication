import { Link } from 'react-router-dom';

/**
 * Centered card layout for authentication pages.
 */
export default function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-12">
      {/* Logo */}
      <Link to="/login" className="flex items-center gap-2.5 mb-8 group">
        <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center shadow-sm group-hover:bg-primary-700 transition-colors">
          <span className="text-white font-bold text-lg">A</span>
        </div>
        <span className="text-xl font-semibold text-gray-900 tracking-tight">
          AppName
        </span>
      </Link>

      {/* Card */}
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 animate-fade-in">
          {title && (
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
              {subtitle && (
                <p className="mt-2 text-sm text-gray-500">{subtitle}</p>
              )}
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}
