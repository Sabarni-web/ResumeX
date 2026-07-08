import React from 'react';
import { FiCheckCircle } from 'react-icons/fi';

const StrengthAreas = ({ skills }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
      <h3 className="text-lg font-bold mb-4 flex items-center text-slate-800 dark:text-white">
        <FiCheckCircle className="mr-2 text-green-500" /> Matching Strengths
      </h3>
      <p className="text-sm text-slate-500 mb-4">Your resume successfully covers these required skills.</p>
      
      <div className="flex flex-wrap gap-2">
        {skills?.map((skill, idx) => (
          <span key={idx} className="px-3 py-1.5 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/50 text-green-700 dark:text-green-400 rounded-lg text-sm font-medium">
            {skill}
          </span>
        ))}
        {(!skills || skills.length === 0) && (
          <span className="text-sm text-slate-500">No matching strengths found yet.</span>
        )}
      </div>
    </div>
  );
};
export default StrengthAreas;