/**
 * Simple CSS-based bar chart for weekly data visualization.
 * No external chart library needed.
 */
export default function DashboardChart({ data = [] }) {
  const maxValue = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h2 className="text-base font-semibold text-gray-900 mb-4">Weekly Overview</h2>

      <div className="flex items-end gap-2 sm:gap-3 h-44">
        {data.map((item, index) => {
          const heightPercent = (item.value / maxValue) * 100;
          return (
            <div
              key={item.day}
              className="flex-1 flex flex-col items-center gap-2"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <span className="text-xs text-gray-500 font-medium">{item.value}</span>
              <div className="w-full relative flex-1 flex items-end">
                <div
                  className="w-full rounded-t-md bg-primary-500 hover:bg-primary-600 transition-all duration-500 ease-out"
                  style={{
                    height: `${heightPercent}%`,
                    minHeight: '4px',
                    transition: 'height 0.5s ease-out',
                  }}
                />
              </div>
              <span className="text-xs text-gray-400 font-medium">{item.day}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
