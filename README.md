# React Frontend Application

A minimalistic, clean, and responsive web application with secure authentication flows, a real-time dashboard, interactive forms, and dark mode — built for production-quality delivery.

## ✨ Features

- **Authentication** — Login, Signup, Reset Password with real-time form validation
- **Protected Routes** — Unauthenticated users redirected to `/login`
- **Real-Time Dashboard** — Stats, activity feed, and charts update every 5 seconds
- **Count-Up Animations** — Numeric stats animate smoothly on value changes
- **Dark Mode** — System-preference aware toggle with localStorage persistence
- **Toast Notifications** — Success/error/info messages with auto-dismiss
- **Responsive Design** — Mobile-first, works across all screen sizes
- **Accessibility** — Proper labels, ARIA attributes, keyboard navigation, focus states
- **Performance** — Lazy-loaded routes, minimal re-renders

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 (functional components) |
| Build Tool | Vite |
| Routing | React Router v6 |
| State | Context API (Auth, Toast, Theme) |
| Styling | Tailwind CSS v4 |
| API | Mock/stub layer (ready for backend swap) |

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Dev server: `http://localhost:5173`

## 🔐 Mock Credentials

```
Email:    user@example.com
Password: Password123!
```

## 📁 Project Structure

```
src/
├── components/
│   ├── common/         → Button, Input, Spinner, Toast, PrivateRoute
│   └── layout/         → Navbar, AppLayout, AuthLayout
├── context/            → AuthContext, ToastContext, ThemeContext
├── features/
│   ├── auth/           → Login, Signup, ResetPassword
│   └── dashboard/      → DashboardStats, ActivityFeed, DashboardChart
├── hooks/              → useAuth, useToast, useTheme
├── pages/              → Page-level components (composition layer)
├── services/           → Mock API layer (api.js)
└── utils/              → Form validators
```

## 🗺 Routes

| Route | Access | Description |
|-------|--------|-------------|
| `/login` | Public | Sign in form |
| `/signup` | Public | Registration form |
| `/reset-password` | Public | Password reset request |
| `/dashboard` | Protected | Main dashboard |

## 🔌 Mock API Layer

All API stubs live in `src/services/api.js`. Each function returns a Promise with a simulated delay:

- `loginUser(email, password)` — Validates against in-memory users
- `registerUser(name, email, password)` — Adds to in-memory store
- `resetPassword(email)` — Returns success message
- `fetchDashboardData()` — Returns randomized stats/activities/chart data

**To integrate a real backend:** Replace the function bodies with `fetch`/`axios` calls. The component layer remains unchanged.

## 🌙 Dark Mode

Toggle via the sun/moon icon in the navbar or auth pages. Persisted to `localStorage` and respects system `prefers-color-scheme` on first visit.

## ♿ Accessibility

- All inputs have associated `<label>` with `htmlFor`
- `aria-invalid` and `aria-describedby` on form inputs with errors
- `role="alert"` on error/success messages
- `aria-label` on icon buttons
- `aria-live="polite"` on toast container
- Visible focus states via `:focus-visible` outline
- Full keyboard navigation support
