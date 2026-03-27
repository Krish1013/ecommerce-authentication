import { useState, useEffect, useCallback } from 'react';
import AppLayout from '../components/layout/AppLayout';
import DashboardStats from '../features/dashboard/DashboardStats';
import ActivityFeed from '../features/dashboard/ActivityFeed';
import DashboardChart from '../features/dashboard/DashboardChart';
import Spinner from '../components/common/Spinner';
import { useAuth } from '../hooks/useAuth';
import { fetchDashboardData } from '../services/api';

const POLL_INTERVAL = 5000; // 5 seconds

/**
 * Main dashboard page with real-time data polling.
 */
export default function DashboardPage() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async (isInitial = false) => {
    try {
      if (isInitial) setLoading(true);
      const result = await fetchDashboardData();
      setData(result);
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
    } finally {
      if (isInitial) setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData(true);

    // Simulate real-time updates via polling
    const interval = setInterval(() => loadData(false), POLL_INTERVAL);
    return () => clearInterval(interval);
  }, [loadData]);

  return (
    <AppLayout>
      {/* Welcome header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {user?.name?.split(' ')[0] || 'User'} 👋
        </h1>
        <p className="text-gray-500 mt-1">
          Here&apos;s what&apos;s happening with your business today.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <Spinner size="lg" />
        </div>
      ) : (
        <div className="space-y-6">
          {/* Stat cards */}
          <DashboardStats stats={data?.stats || []} />

          {/* Chart + Activity grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <DashboardChart data={data?.weeklyData || []} />
            </div>
            <div>
              <ActivityFeed activities={data?.activities || []} />
            </div>
          </div>

          {/* Polling indicator */}
          <div className="flex items-center justify-center gap-2 text-xs text-gray-400 pt-4">
            <span className="w-2 h-2 rounded-full bg-success-500 animate-pulse-subtle" />
            Data refreshes every {POLL_INTERVAL / 1000}s
          </div>
        </div>
      )}
    </AppLayout>
  );
}
