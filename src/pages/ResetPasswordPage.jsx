import AuthLayout from '../components/layout/AuthLayout';
import ResetPassword from '../features/auth/ResetPassword';

export default function ResetPasswordPage() {
  return (
    <AuthLayout title="Reset password" subtitle="Enter your email to receive a reset link">
      <ResetPassword />
    </AuthLayout>
  );
}
