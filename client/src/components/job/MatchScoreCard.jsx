import React from 'react';

const MatchScoreCard = ({ score = 0 }) => {
  let colorClass = 'text-green-500';
  let strokeClass = 'stroke-green-500';
  let bgClass = 'bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-800/30';
  
  if (score < 70) {
    colorClass = 'text-yellow-500';
    strokeClass = 'stroke-yellow-500';
    bgClass = 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-100 dark:border-yellow-800/30';
  }
  if (score < 50) {
    colorClass = 'text-red-500';
    strokeClass = 'stroke-red-500';
    bgClass = 'bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-800/30';
  }

  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className={`rounded-2xl p-8 flex flex-col items-center justify-center border ${bgClass}`}>
      <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-6">Overall ATS Match</h3>
      
      <div className="relative w-40 h-40 flex items-center justify-center">
        <svg className="transform -rotate-90 w-full h-full" viewBox="0 0 140 140">
          <circle cx="70" cy="70" r={radius} className="stroke-slate-200 dark:stroke-slate-700/50" strokeWidth="12" fill="none" />
          <circle 
            cx="70" cy="70" r={radius} 
            className={`${strokeClass} transition-all duration-1000 ease-out`} 
            strokeWidth="12" fill="none" strokeLinecap="round"
            style={{ strokeDasharray: circumference, strokeDashoffset }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-4xl font-bold ${colorClass}`}>{score}%</span>
        </div>
      </div>
      
      <p className="mt-6 text-sm text-center text-slate-600 dark:text-slate-400 font-medium">
        {score >= 80 ? 'Great match! Your resume is optimized.' : score >= 60 ? 'Good match. Some tweaks could help.' : 'Low match. Consider adding keywords.'}
      </p>
    </div>
  );
};
export default MatchScoreCard;