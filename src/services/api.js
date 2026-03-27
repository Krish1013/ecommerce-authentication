/**
 * Mock API Layer
 *
 * Simulates backend API calls with realistic delays.
 * Replace these with real API calls when backend is ready.
 */

const MOCK_DELAY = 1200;

const delay = (ms = MOCK_DELAY) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Mock user database
const MOCK_USERS = [
  {
    id: '1',
    name: 'John Doe',
    email: 'user@example.com',
    password: 'Password123!',
  },
];

/**
 * Simulate user login
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{user: object, token: string}>}
 */
export async function loginUser(email, password) {
  await delay();

  const user = MOCK_USERS.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    throw new Error('Invalid email or password. Please try again.');
  }

  const { password: _, ...safeUser } = user;
  return {
    user: safeUser,
    token: 'mock-jwt-token-' + Date.now(),
  };
}

/**
 * Simulate user registration
 * @param {string} name
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{user: object, token: string}>}
 */
export async function registerUser(name, email, password) {
  await delay();

  const exists = MOCK_USERS.find((u) => u.email === email);
  if (exists) {
    throw new Error('An account with this email already exists.');
  }

  const newUser = {
    id: String(MOCK_USERS.length + 1),
    name,
    email,
    password,
  };
  MOCK_USERS.push(newUser);

  const { password: _, ...safeUser } = newUser;
  return {
    user: safeUser,
    token: 'mock-jwt-token-' + Date.now(),
  };
}

/**
 * Simulate password reset
 * @param {string} email
 * @returns {Promise<{message: string}>}
 */
export async function resetPassword(email) {
  await delay();

  return {
    message: `Password reset link sent to ${email}. Please check your inbox.`,
  };
}

/**
 * Fetch dashboard statistics — returns slightly randomized data
 * to simulate real-time updates.
 * @returns {Promise<object>}
 */
export async function fetchDashboardData() {
  await delay(800);

  const randomDelta = (base, range) =>
    base + Math.floor(Math.random() * range);

  return {
    stats: [
      {
        id: 'users',
        label: 'Total Users',
        value: randomDelta(12480, 50),
        change: '+12.5%',
        trend: 'up',
        icon: '👥',
      },
      {
        id: 'revenue',
        label: 'Revenue',
        value: `$${randomDelta(48200, 500).toLocaleString()}`,
        change: '+8.2%',
        trend: 'up',
        icon: '💰',
      },
      {
        id: 'orders',
        label: 'Orders',
        value: randomDelta(1340, 30),
        change: '+5.1%',
        trend: 'up',
        icon: '📦',
      },
      {
        id: 'conversion',
        label: 'Conversion',
        value: `${(3.2 + Math.random() * 0.5).toFixed(1)}%`,
        change: '-0.3%',
        trend: 'down',
        icon: '📈',
      },
    ],
    activities: generateActivities(),
    weeklyData: generateWeeklyData(),
  };
}

function generateActivities() {
  const actions = [
    { user: 'Alice Chen', action: 'completed a purchase', time: 'Just now' },
    { user: 'Bob Smith', action: 'signed up for Pro plan', time: '2m ago' },
    { user: 'Carol White', action: 'submitted a support ticket', time: '5m ago' },
    { user: 'David Lee', action: 'updated billing info', time: '8m ago' },
    { user: 'Eva Martinez', action: 'left a 5-star review', time: '12m ago' },
    { user: 'Frank Wilson', action: 'upgraded subscription', time: '15m ago' },
    { user: 'Grace Kim', action: 'downloaded invoice #1042', time: '20m ago' },
    { user: 'Henry Brown', action: 'changed password', time: '25m ago' },
  ];

  // Return a random subset to simulate dynamic updates
  const count = 4 + Math.floor(Math.random() * 3);
  return actions.slice(0, count).map((a, i) => ({ ...a, id: `activity-${i}` }));
}

function generateWeeklyData() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return days.map((day) => ({
    day,
    value: 40 + Math.floor(Math.random() * 60),
  }));
}
