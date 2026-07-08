import React from 'react';
import { FiStar, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';

const FeedbackPanel = ({ score, strengths, weaknesses, suggestion }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 mt-6">
      <div className="flex items-center justify-between mb-6 pb-6 border-b dark:border-slate-800">
        <h3 className="text-xl font-bold text-slate-800 dark:text-white">AI Feedback</h3>
        <div className="flex items-center space-x-1 text-amber-500 bg-amber-50 dark:bg-amber-900/20 px-3 py-1.5 rounded-lg font-bold">
          <FiStar />
          <span>{score}/10</span>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <h4 className="flex items-center text-green-600 font-semibold mb-3">
            <FiCheckCircle className="mr-2" /> Strengths
          </h4>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
            {strengths?.map((item, i) => <li key={i} className="flex items-start"><span className="text-green-500 mr-2">•</span>{item}</li>)}
          </ul>
        </div>
        <div>
          <h4 className="flex items-center text-red-500 font-semibold mb-3">
            <FiAlertCircle className="mr-2" /> Areas to Improve
          </h4>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
            {weaknesses?.map((item, i) => <li key={i} className="flex items-start"><span className="text-red-400 mr-2">•</span>{item}</li>)}
          </ul>
        </div>
      </div>
      
      <div className="bg-primary/5 dark:bg-primary/10 rounded-xl p-4 border border-primary/20">
        <h4 className="text-sm font-semibold text-primary mb-2">Ideal Answer Approach</h4>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{suggestion}</p>
      </div>
    </div>
  );
};
export default FeedbackPanel;