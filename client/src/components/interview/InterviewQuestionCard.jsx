import React from 'react';
import { FiMessageSquare } from 'react-icons/fi';

const InterviewQuestionCard = ({ question, category }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 md:p-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
        <FiMessageSquare size={120} />
      </div>
      
      <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full mb-4">
        {category}
      </div>
      <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white leading-tight mb-2">
        {question}
      </h2>
    </div>
  );
};
export default InterviewQuestionCard;