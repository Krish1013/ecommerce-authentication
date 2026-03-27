import { useState, useEffect, useRef } from 'react';

/**
 * Dashboard stat cards with animated count-up and dark mode.
 */
export default function DashboardStats({ stats = [] }) {
  const trendColors = {
    up: 'text-success-600 bg-success-50 dark:bg-green-900/30 dark:text-green-400',
    down: 'text-danger-600 bg-danger-50 dark:bg-red-900/30 dark:text-red-400',
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {stats.map((stat, index) => (
        <article
          key={stat.id}
          className="card-surface rounded-xl p-6 transition-all duration-300 animate-fade-in-up"
          style={{ animationDelay: `${index * 80}ms` }}
        >
          <div className="flex items-start justify-between mb-4">
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
          <AnimatedValue value={stat.value} />
          <p className="text-sm text-gray-500 dark:text-dark-secondary mt-1.5">{stat.label}</p>
        </article>
      ))}
    </div>
  );
}

/**
 * Animated value display — counts up for numbers, fades for strings.
 */
function AnimatedValue({ value }) {
  const [displayValue, setDisplayValue] = useState(value);
  const prevValue = useRef(value);

  useEffect(() => {
    // If the value is a pure number, animate the count-up
    const numericCurrent = typeof value === 'number' ? value : parseFloat(String(value).replace(/[^0-9.]/g, ''));
    const numericPrev = typeof prevValue.current === 'number' ? prevValue.current : parseFloat(String(prevValue.current).replace(/[^0-9.]/g, ''));

    if (!isNaN(numericCurrent) && !isNaN(numericPrev) && typeof value === 'number') {
      const diff = numericCurrent - numericPrev;
      if (diff === 0) {
        setDisplayValue(value);
        prevValue.current = value;
        return;
      }

      const duration = 600;
      const steps = 30;
      const stepDuration = duration / steps;
      let step = 0;

      const interval = setInterval(() => {
        step++;
        const progress = step / steps;
        // Ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const currentVal = Math.round(numericPrev + diff * eased);
        setDisplayValue(currentVal);

        if (step >= steps) {
          clearInterval(interval);
          setDisplayValue(value);
        }
      }, stepDuration);

      prevValue.current = value;
      return () => clearInterval(interval);
    }

    // For string values (like "$48,200" or "3.2%"), just update with animation class
    setDisplayValue(value);
    prevValue.current = value;
  }, [value]);

  return (
    <p className="text-2xl sm:text-[1.75rem] font-bold text-gray-900 dark:text-white tracking-tight animate-count-up">
      {typeof displayValue === 'number' ? displayValue.toLocaleString() : displayValue}
    </p>
  );
}
