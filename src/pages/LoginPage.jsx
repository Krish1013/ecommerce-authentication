import AuthLayout from '../components/layout/AuthLayout';
import Login from '../features/auth/Login';

export default function LoginPage() {
  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to your account to continue">
      <Login />
    </AuthLayout>
  );
}
