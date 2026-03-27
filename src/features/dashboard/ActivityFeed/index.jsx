/**
 * Activity feed showing recent user actions.
 */
export default function ActivityFeed({ activities = [] }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-gray-900">Recent Activity</h2>
        <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded-full">
          Live
        </span>
      </div>

      {activities.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-8">No recent activity</p>
      ) : (
        <ul className="space-y-3" role="list">
          {activities.map((activity, index) => (
            <li
              key={activity.id}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center flex-shrink-0 text-xs font-semibold">
                {activity.user.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">
                  <span className="font-medium">{activity.user}</span>{' '}
                  <span className="text-gray-600">{activity.action}</span>
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{activity.time}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
