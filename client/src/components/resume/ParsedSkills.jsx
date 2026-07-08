import React from 'react';

const ParsedSkills = ({ skills }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
      <h3 className="text-lg font-bold mb-4 text-slate-800 dark:text-white">Detected Skills</h3>
      <div className="flex flex-wrap gap-2">
        {skills?.map((skill, idx) => (
          <span key={idx} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium border border-slate-200 dark:border-slate-700">
            {skill}
          </span>
        ))}
        {(!skills || skills.length === 0) && <p className="text-sm text-slate-500">No skills detected.</p>}
      </div>
    </div>
  );
};
export default ParsedSkills;