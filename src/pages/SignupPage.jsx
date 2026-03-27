import AuthLayout from '../components/layout/AuthLayout';
import Signup from '../features/auth/Signup';

export default function SignupPage() {
  return (
    <AuthLayout title="Create an account" subtitle="Get started with your free account">
      <Signup />
    </AuthLayout>
  );
}
