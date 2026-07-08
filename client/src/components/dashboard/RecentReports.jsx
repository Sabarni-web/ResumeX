import React from 'react';
import { FiFileText, FiArrowRight } from 'react-icons/fi';

const RecentReports = () => {
  const reports = [
    { id: 1, title: 'Frontend Developer Match', date: '2 days ago', score: 85 },
    { id: 2, title: 'Full Stack Engineer Match', date: '5 days ago', score: 92 },
    { id: 3, title: 'UI/UX Designer Match', date: '1 week ago', score: 76 },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Recent Reports</h3>
        <button className="text-sm font-medium text-primary hover:text-primary-dark transition-colors flex items-center">
          View All <FiArrowRight className="ml-1" />
        </button>
      </div>
      <div className="space-y-4">
        {reports.map(report => (
          <div key={report.id} className="flex items-center p-4 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-primary/30 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all cursor-pointer">
            <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mr-4">
              <FiFileText size={20} />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-slate-800 dark:text-white">{report.title}</h4>
              <p className="text-xs text-slate-500">{report.date}</p>
            </div>
            <div className="text-right">
              <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${report.score >= 80 ? 'bg-green-100 text-green-700' : report.score >= 70 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                {report.score}% Match
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default RecentReports;