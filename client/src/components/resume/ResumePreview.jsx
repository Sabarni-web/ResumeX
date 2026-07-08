import React from 'react';
import { FiFileText } from 'react-icons/fi';

const ResumePreview = ({ resumeFile }) => {
  return (
    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-8 flex flex-col items-center justify-center min-h-[400px] border-2 border-dashed border-slate-200 dark:border-slate-700">
      <FiFileText size={64} className="text-slate-400 mb-4" />
      <h3 className="text-lg font-medium text-slate-700 dark:text-slate-300">
        {resumeFile?.name || 'No resume uploaded'}
      </h3>
      <p className="text-sm text-slate-500 mt-2 text-center max-w-sm">
        Your resume preview will appear here. The document is analyzed securely.
      </p>
    </div>
  );
};
export default ResumePreview;