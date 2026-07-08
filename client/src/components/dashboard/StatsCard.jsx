import React from 'react';

const StatsCard = ({ title, value, icon, trend, trendUp }) => {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex items-center">
      <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mr-5">
        {icon}
      </div>
      <div>
        <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">{title}</h4>
        <div className="flex items-baseline space-x-2">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">{value}</h2>
          {trend && (
            <span className={`text-xs font-semibold ${trendUp ? 'text-green-500' : 'text-red-500'}`}>
              {trendUp ? '↑' : '↓'} {trend}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
export default StatsCard;