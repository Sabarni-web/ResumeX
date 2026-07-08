import React from 'react';

const InterviewProgress = ({ currentQuestion, totalQuestions }) => {
  const progress = (currentQuestion / totalQuestions) * 100;
  
  return (
    <div className="mb-6">
      <div className="flex justify-between items-end mb-2">
        <span className="text-sm font-semibold text-slate-500">Question {currentQuestion} of {totalQuestions}</span>
        <span className="text-sm font-bold text-primary">{Math.round(progress)}% Complete</span>
      </div>
      <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-primary to-accent-cyan rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
export default InterviewProgress;