/**
 * CSS bar chart with dark mode and smooth height transitions.
 */
export default function DashboardChart({ data = [] }) {
  const maxValue = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="card-surface rounded-xl p-6 h-full">
      <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-5">Weekly Overview</h2>

      <div className="flex items-end gap-2 sm:gap-3 h-48">
        {data.map((item, index) => {
          const heightPercent = (item.value / maxValue) * 100;
          return (
            <div
              key={item.day}
              className="flex-1 flex flex-col items-center gap-2 animate-fade-in"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <span className="text-xs text-gray-500 dark:text-dark-secondary font-medium tabular-nums">
                {item.value}
              </span>
              <div className="w-full relative flex-1 flex items-end">
                <div
                  className="w-full rounded-t-lg bg-primary-500 hover:bg-primary-400 dark:bg-primary-600 dark:hover:bg-primary-500 transition-all duration-500 ease-out cursor-default"
                  style={{
                    height: `${heightPercent}%`,
                    minHeight: '4px',
                    transition: 'height 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  }}
                  title={`${item.day}: ${item.value}`}
                />
              </div>
              <span className="text-xs text-gray-400 dark:text-dark-muted font-medium">{item.day}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
