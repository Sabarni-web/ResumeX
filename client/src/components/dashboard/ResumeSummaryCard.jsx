import React from 'react';
import { FiCheckCircle } from 'react-icons/fi';

const ResumeSummaryCard = () => {
  return (
    <div className="bg-gradient-to-br from-primary to-accent-cyan p-6 rounded-2xl shadow-md text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-10 -mt-10 blur-xl"></div>
      <h3 className="text-lg font-medium opacity-90 mb-1">Active Resume</h3>
      <h2 className="text-2xl font-bold mb-4">Senior_Frontend_Dev_2026.pdf</h2>
      <div className="flex items-center space-x-4 mb-6">
        <div className="flex items-center">
          <FiCheckCircle className="mr-1.5" />
          <span className="text-sm">Parsed successfully</span>
        </div>
        <div className="px-2 py-1 bg-white/20 rounded text-xs font-medium backdrop-blur-sm">
          Updated 2d ago
        </div>
      </div>
      <button className="bg-white text-primary font-medium px-4 py-2 rounded-lg text-sm hover:bg-slate-50 transition-colors shadow-sm">
        Update Resume
      </button>
    </div>
  );
};
export default ResumeSummaryCard;