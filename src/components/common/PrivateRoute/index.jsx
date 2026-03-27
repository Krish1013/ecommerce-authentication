import { Navigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import Spinner from '../Spinner';

/**
 * Route guard component — redirects unauthenticated users to /login.
 */
export default function PrivateRoute({ children }) {
  const { isAuthenticated, initializing } = useAuth();

  // Show spinner while checking existing session
  if (initializing) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
