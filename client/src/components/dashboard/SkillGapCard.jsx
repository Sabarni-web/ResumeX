import React from 'react';
import { FiAlertTriangle } from 'react-icons/fi';

const SkillGapCard = () => {
  const missingSkills = ['Docker', 'AWS', 'GraphQL'];
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
      <div className="flex items-center mb-4 text-amber-500">
        <FiAlertTriangle size={20} className="mr-2" />
        <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Top Skill Gaps</h3>
      </div>
      <p className="text-sm text-slate-500 mb-4">Based on your recent job matches, consider learning these skills:</p>
      <div className="flex flex-wrap gap-2">
        {missingSkills.map(skill => (
          <span key={skill} className="px-3 py-1.5 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 text-sm rounded-lg font-medium border border-amber-200 dark:border-amber-800/50">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};
export default SkillGapCard;