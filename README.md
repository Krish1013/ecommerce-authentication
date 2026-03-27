# React Frontend Application

A minimalistic, clean, and responsive web application with secure authentication flows, a real-time dashboard, and interactive forms.

## Tech Stack

- **React 18** — Functional components & hooks
- **Vite** — Dev server & build tooling
- **React Router v6** — Client-side routing with lazy loading
- **Tailwind CSS v4** — Utility-first styling
- **Context API** — Centralized auth state management

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

The dev server runs at `http://localhost:5173`.

## Project Structure

```
src/
├── components/
│   ├── common/         # Button, Input, Spinner, Toast, PrivateRoute
│   └── layout/         # Navbar, AppLayout, AuthLayout
├── context/            # AuthContext, ToastContext
├── features/
│   ├── auth/           # Login, Signup, ResetPassword
│   └── dashboard/      # DashboardStats, ActivityFeed, DashboardChart
├── hooks/              # useAuth, useToast
├── pages/              # LoginPage, SignupPage, ResetPasswordPage, DashboardPage
├── services/           # Mock API layer (api.js)
└── utils/              # Validators
```

## Routes

| Route              | Access     | Description            |
| ------------------ | ---------- | ---------------------- |
| `/login`           | Public     | Sign in form           |
| `/signup`          | Public     | Registration form      |
| `/reset-password`  | Public     | Password reset request |
| `/dashboard`       | Protected  | Main dashboard         |

## Mock Credentials

```
Email:    user@example.com
Password: Password123!
```

## Features

- **Authentication**: Login, Signup, Reset Password with form validation
- **Protected Routes**: Unauthenticated users are redirected to `/login`
- **Real-Time Dashboard**: Stats, activity feed, and charts update every 5 seconds
- **Toast Notifications**: Success/error/info messages with auto-dismiss
- **Responsive Design**: Mobile-first, works across all screen sizes
- **Accessibility**: Proper labels, ARIA attributes, keyboard navigation, focus states
- **Performance**: Lazy-loaded routes, minimal re-renders
