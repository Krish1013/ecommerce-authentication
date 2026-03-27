/**
 * Activity feed showing recent user actions with dark mode.
 */
export default function ActivityFeed({ activities = [] }) {
  return (
    <div className="card-surface rounded-xl p-6 h-full">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base font-semibold text-gray-900 dark:text-white">Recent Activity</h2>
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 px-2.5 py-1 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse-subtle" />
          Live
        </span>
      </div>

      {activities.length === 0 ? (
        <p className="text-sm text-gray-400 dark:text-dark-muted text-center py-8">No recent activity</p>
      ) : (
        <ul className="space-y-1" role="list">
          {activities.map((activity, index) => (
            <li
              key={activity.id}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 flex items-center justify-center flex-shrink-0 text-xs font-semibold">
                {activity.user.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900 dark:text-gray-100">
                  <span className="font-medium">{activity.user}</span>{' '}
                  <span className="text-gray-600 dark:text-dark-secondary">{activity.action}</span>
                </p>
                <p className="text-xs text-gray-400 dark:text-dark-muted mt-0.5">{activity.time}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
