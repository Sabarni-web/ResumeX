import React from 'react';
import { FiCheckCircle, FiClock, FiTarget, FiMessageSquare } from 'react-icons/fi';
import Button from '../common/Button';

const SessionSummary = ({ duration, avgScore, totalQuestions, onFinish }) => {
  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800 overflow-hidden text-center p-8 md:p-12 mt-10">
      <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
        <FiCheckCircle size={40} />
      </div>
      <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">Session Complete!</h2>
      <p className="text-slate-500 mb-8">Great job practicing. Here's a quick summary of your performance.</p>
      
      <div className="grid grid-cols-3 gap-4 mb-10">
        <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
          <FiTarget className="mx-auto text-primary mb-2" size={24} />
          <p className="text-2xl font-bold text-slate-800 dark:text-white">{avgScore}/10</p>
          <p className="text-xs text-slate-500 uppercase tracking-wide">Avg Score</p>
        </div>
        <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
          <FiMessageSquare className="mx-auto text-accent-cyan mb-2" size={24} />
          <p className="text-2xl font-bold text-slate-800 dark:text-white">{totalQuestions}</p>
          <p className="text-xs text-slate-500 uppercase tracking-wide">Questions</p>
        </div>
        <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
          <FiClock className="mx-auto text-amber-500 mb-2" size={24} />
          <p className="text-2xl font-bold text-slate-800 dark:text-white">{duration}</p>
          <p className="text-xs text-slate-500 uppercase tracking-wide">Duration</p>
        </div>
      </div>
      
      <Button size="lg" fullWidth onClick={onFinish}>Return to Dashboard</Button>
    </div>
  );
};
export default SessionSummary;