import { useState, useEffect, useCallback } from 'react';
import AppLayout from '../components/layout/AppLayout';
import DashboardStats from '../features/dashboard/DashboardStats';
import ActivityFeed from '../features/dashboard/ActivityFeed';
import DashboardChart from '../features/dashboard/DashboardChart';
import Spinner from '../components/common/Spinner';
import { useAuth } from '../hooks/useAuth';
import { fetchDashboardData } from '../services/api';

const POLL_INTERVAL = 5000;

/**
 * Main dashboard page with real-time data polling and last-updated indicator.
 */
export default function DashboardPage() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  const loadData = useCallback(async (isInitial = false) => {
    try {
      if (isInitial) setLoading(true);
      const result = await fetchDashboardData();
      setData(result);
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
    } finally {
      if (isInitial) setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData(true);
    const interval = setInterval(() => loadData(false), POLL_INTERVAL);
    return () => clearInterval(interval);
  }, [loadData]);

  const formatTime = (date) => {
    if (!date) return '';
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  return (
    <AppLayout>
      {/* Welcome header */}
      <div className="mb-8 sm:mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          Welcome back, {user?.name?.split(' ')[0] || 'User'} 👋
        </h1>
        <p className="text-gray-500 dark:text-dark-secondary mt-1.5 text-sm sm:text-base">
          Here&apos;s what&apos;s happening with your business today.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <Spinner size="lg" />
        </div>
      ) : (
        <div className="space-y-6 sm:space-y-8">
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

          {/* Live polling indicator */}
          <div className="flex items-center justify-center gap-3 text-xs text-gray-400 dark:text-dark-muted pt-2 pb-4">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-success-500 animate-pulse-subtle" />
              Live
            </span>
            <span className="text-gray-300 dark:text-gray-600">•</span>
            <span>Refreshes every {POLL_INTERVAL / 1000}s</span>
            {lastUpdated && (
              <>
                <span className="text-gray-300 dark:text-gray-600">•</span>
                <span>Last update: {formatTime(lastUpdated)}</span>
              </>
            )}
          </div>
        </div>
      )}
    </AppLayout>
  );
}
