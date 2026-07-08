import React from 'react';
import { FiZap } from 'react-icons/fi';

const ImprovementSuggestions = ({ suggestions }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
      <h3 className="text-lg font-bold mb-4 flex items-center text-slate-800 dark:text-white">
        <FiZap className="mr-2 text-yellow-500" /> Actionable Improvements
      </h3>
      <ul className="space-y-4">
        {suggestions?.map((suggestion, idx) => (
          <li key={idx} className="flex p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-100 text-yellow-700 flex items-center justify-center text-sm font-bold mr-3">{idx + 1}</span>
            <p className="text-sm text-slate-700 dark:text-slate-300">{suggestion}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ImprovementSuggestions;