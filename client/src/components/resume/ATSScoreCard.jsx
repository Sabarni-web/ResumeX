import React from 'react';

const ATSScoreCard = ({ score = 0 }) => {
  return (
    <div className="bg-gradient-to-br from-primary/10 to-accent-cyan/10 rounded-2xl p-6 border border-primary/20 text-center">
      <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">Resume Score</h3>
      <div className="flex items-end justify-center gap-1 mb-2">
        <span className="text-5xl font-black text-primary">{score}</span>
        <span className="text-xl text-slate-500 font-bold mb-1">/100</span>
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-400">
        {score > 80 ? 'Excellent resume!' : score > 60 ? 'Good, but needs work.' : 'Needs significant improvement.'}
      </p>
    </div>
  );
};
export default ATSScoreCard;