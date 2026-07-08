import React from 'react';
import { FiXCircle } from 'react-icons/fi';

const MissingSkillsList = ({ skills }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
      <h3 className="text-lg font-bold mb-4 flex items-center text-slate-800 dark:text-white">
        <FiXCircle className="mr-2 text-red-500" /> Missing Keywords
      </h3>
      <p className="text-sm text-slate-500 mb-4">These important keywords were found in the job description but are missing from your resume.</p>
      
      <div className="flex flex-wrap gap-2">
        {skills?.map((skill, idx) => (
          <span key={idx} className="px-3 py-1.5 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 text-red-700 dark:text-red-400 rounded-lg text-sm font-medium">
            {skill}
          </span>
        ))}
        {(!skills || skills.length === 0) && (
          <span className="text-sm text-green-500 font-medium">No missing skills detected!</span>
        )}
      </div>
    </div>
  );
};
export default MissingSkillsList;