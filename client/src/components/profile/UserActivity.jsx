import React from 'react';
import { FiFileText, FiTarget, FiMessageSquare } from 'react-icons/fi';

const UserActivity = () => {
  const activities = [
    { icon: <FiFileText />, title: 'Updated Resume', date: '2 days ago', color: 'text-blue-500 bg-blue-100 dark:bg-blue-900/30' },
    { icon: <FiTarget />, title: 'Checked Job Match', date: '5 days ago', color: 'text-primary bg-primary/10' },
    { icon: <FiMessageSquare />, title: 'Completed Interview Practice', date: '1 week ago', color: 'text-green-500 bg-green-100 dark:bg-green-900/30' },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
      <h3 className="text-lg font-bold mb-6 text-slate-800 dark:text-white">Recent Activity</h3>
      <div className="space-y-6">
        {activities.map((item, idx) => (
          <div key={idx} className="flex items-start">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${item.color}`}>
              {item.icon}
            </div>
            <div className="flex-1 border-b border-slate-100 dark:border-slate-800 pb-4">
              <h4 className="font-medium text-slate-800 dark:text-white">{item.title}</h4>
              <p className="text-xs text-slate-500 mt-1">{item.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default UserActivity;