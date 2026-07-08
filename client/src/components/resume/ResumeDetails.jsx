import React from 'react';

const ResumeDetails = ({ details }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
      <h3 className="text-lg font-bold mb-4 text-slate-800 dark:text-white">Parsed Details</h3>
      <div className="space-y-4">
        <div>
          <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Contact</h4>
          <p className="text-slate-800 dark:text-slate-200 font-medium">{details?.email || 'Not found'}</p>
        </div>
        <div>
          <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Experience</h4>
          <p className="text-slate-800 dark:text-slate-200 font-medium">{details?.experienceYears || '0'} Years</p>
        </div>
        <div>
          <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Education</h4>
          <p className="text-slate-800 dark:text-slate-200 font-medium">{details?.education || 'Not found'}</p>
        </div>
      </div>
    </div>
  );
};
export default ResumeDetails;