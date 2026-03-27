/**
 * Dashboard stat cards with smooth value transitions.
 */
export default function DashboardStats({ stats = [] }) {
  const trendColors = {
    up: 'text-success-600 bg-success-50',
    down: 'text-danger-600 bg-danger-50',
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {stats.map((stat) => (
        <article
          key={stat.id}
          className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow duration-300 animate-fade-in"
        >
          <div className="flex items-start justify-between mb-3">
            <span className="text-2xl" role="img" aria-label={stat.label}>
              {stat.icon}
            </span>
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                trendColors[stat.trend] || 'text-gray-600 bg-gray-50'
              }`}
            >
              {stat.trend === 'up' ? '↑' : '↓'} {stat.change}
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-900 tracking-tight transition-all duration-500">
            {stat.value}
          </p>
          <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
        </article>
      ))}
    </div>
  );
}
